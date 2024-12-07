import { headers } from "next/headers";
import Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/db/prisma";
import { subscriptionPlans } from "@/config/constants";
import { logsnag } from "@/lib/log-snag";
import { invalidateSubscriptionCache } from "@/lib/redis";
import { OrderPhase, PaymentChannelType } from '@/db/type';

export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get("Stripe-Signature") as string;
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET_SUBSCRIPTION!
    );
  } catch (error) {
    return new Response(`Webhook Error: ${error.message}`, { status: 400 });
  }
  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        
        if (session.mode === 'subscription' && session.metadata?.userId) {
          const plan = subscriptionPlans.find(
            p => p.stripePriceIds.monthly === session.metadata?.priceId || 
                p.stripePriceIds.yearly === session.metadata?.priceId
          );

          if (!session.subscription || !session.customer) {
            throw new Error("Missing subscription or customer data");
          }

          const subscription = await stripe.subscriptions.retrieve(
            session.subscription as string
          );

          await prisma.subscription.create({
            data: {
              userId: session.metadata.userId,
              stripeSubscriptionId: session.subscription as string,
              stripePriceId: session.metadata.priceId || '',
              stripeCustomerId: session.customer as string,
              planId: plan?.id || 'starter',
              status: 'active',
              credits: plan?.credits || 0,
              currentPeriodStart: new Date(subscription.current_period_start * 1000),
              currentPeriodEnd: new Date(subscription.current_period_end * 1000),
            },
          });

          const userCredit = await prisma.userCredit.findFirst({
            where: { userId: session.metadata.userId }
          });

          if (userCredit) {
            await prisma.userCredit.update({
              where: { id: userCredit.id },
              data: { credit: plan?.credits || 0 },
            });
          }

          await prisma.userCreditTransaction.create({
            data: {
              userId: session.metadata.userId,
              credit: plan?.credits || 0,
              balance: plan?.credits || 0,
              type: 'SubscriptionCredit',
            },
          });

          await logsnag.track({
            channel: "subscriptions",
            event: "Nueva Suscripción",
            user_id: session.metadata.userId,
            description: `Nuevo suscriptor al plan ${plan?.name}`,
            icon: "🎉",
            tags: {
              plan: plan?.name || 'starter',
              interval: session.metadata.priceId?.includes('monthly') ? 'mensual' : 'anual',
            },
          });
        }
        break;
      }

      case "invoice.payment_succeeded": {
        const session = event.data.object as Stripe.Invoice;
        if (session.subscription) {
          const subscription = await prisma.subscription.findFirst({
            where: { stripeSubscriptionId: session.subscription as string },
          });
          if (subscription) {
            const plan = subscriptionPlans.find(
              p => p.id === subscription.planId
            );

            const userCredit = await prisma.userCredit.findFirst({
              where: { userId: subscription.userId }
            });

            if (!userCredit) {
              throw new Error("User credit not found");
            }

            await prisma.$transaction([
              prisma.subscription.update({
                where: { id: subscription.id },
                data: {
                  credits: plan?.credits || subscription.credits,
                  currentPeriodStart: new Date(session.period_start * 1000),
                  currentPeriodEnd: new Date(session.period_end * 1000),
                },
              }),
              prisma.userCredit.update({
                where: { id: userCredit.id },
                data: { credit: plan?.credits || 0 },
              }),
              prisma.userCreditTransaction.create({
                data: {
                  userId: subscription.userId,
                  credit: plan?.credits || 0,
                  balance: plan?.credits || 0,
                  type: 'SubscriptionCredit',
                },
              }),
              prisma.chargeOrder.create({
                data: {
                  userId: subscription.userId,
                  userInfo: {
                    email: session.customer_email || null,
                    name: session.customer_name || null,
                    customerId: session.customer?.toString() || null,
                  },
                  amount: session.amount_due,
                  phase: OrderPhase.Paid,
                  credit: 0,
                  channel: PaymentChannelType.Stripe,
                  currency: session.currency,
                  paymentAt: new Date(session.status_transitions?.paid_at ? session.status_transitions.paid_at * 1000 : Date.now()),
                  result: {
                    invoiceId: session.id,
                    paymentIntent: session.payment_intent,
                    chargeId: session.charge,
                  },
                },
              }),
            ]);

            await invalidateSubscriptionCache(subscription.userId);
            
            await logsnag.track({
              channel: "subscriptions",
              event: "Renovación Exitosa",
              user_id: subscription.userId,
              description: `Renovación del plan ${plan?.name}`,
              icon: "✅",
              tags: {
                plan: plan?.name || 'starter',
              },
            });
          }
        }
        break;
      }

      case "invoice.payment_failed": {
        const session = event.data.object as Stripe.Invoice;
        if (session.subscription) {
          const subscription = await prisma.subscription.findFirst({
            where: { stripeSubscriptionId: session.subscription as string },
          });

          if (subscription) {
            await prisma.subscription.update({
              where: { id: subscription.id },
              data: { status: "past_due" },
            });

            await logsnag.track({
              channel: "subscriptions",
              event: "Pago Fallido",
              user_id: subscription.userId,
              description: "Fallo en el pago de la suscripción",
              icon: "❌",
              tags: {
                plan: subscription.planId,
              },
            });
          }
        }
        break;
      }

      case "customer.subscription.deleted": {
        const session = event.data.object as Stripe.Subscription;
        const subscription = await prisma.subscription.findFirst({
          where: { stripeSubscriptionId: session.id },
        });

        if (subscription) {
          await prisma.subscription.update({
            where: { id: subscription.id },
            data: { status: "canceled" },
          });

          await logsnag.track({
            channel: "subscriptions",
            event: "Suscripción Cancelada",
            user_id: subscription.userId,
            description: "Suscripción cancelada",
            icon: "🚫",
            tags: {
              plan: subscription.planId,
            },
          });
        }
        break;
      }

      case "customer.subscription.updated": {
        const session = event.data.object as Stripe.Subscription;
        const subscription = await prisma.subscription.findFirst({
          where: { stripeSubscriptionId: session.id },
        });
        if (subscription) {
          const newPriceId = session.items.data[0].price.id;
          const plan = subscriptionPlans.find(
            p => p.stripePriceIds.monthly === newPriceId || 
                p.stripePriceIds.yearly === newPriceId
          );

          const userCredit = await prisma.userCredit.findFirst({
            where: { userId: subscription.userId }
          });

          if (!userCredit) {
            throw new Error("User credit not found");
          }

          await prisma.$transaction([
            prisma.subscription.update({
              where: { id: subscription.id },
              data: { 
                status: session.status,
                stripePriceId: newPriceId,
                planId: plan?.id || subscription.planId,
                credits: plan?.credits || subscription.credits,
              },
            }),
            prisma.userCredit.update({
              where: { id: userCredit.id },
              data: { credit: plan?.credits || 0 },
            }),
            prisma.userCreditTransaction.create({
              data: {
                userId: subscription.userId,
                credit: plan?.credits || 0,
                balance: plan?.credits || 0,
                type: 'SubscriptionCredit',
              },
            }),
            prisma.chargeOrder.create({
              data: {
                userId: subscription.userId,
                userInfo: {
                  customerId: session.customer?.toString() || null,
                  subscriptionId: session.id || null,
                },
                amount: Math.round((session.items.data[0].price.unit_amount || 0) * (session.items.data[0].quantity || 1)),
                credit: 0,
                phase: OrderPhase.Paid,
                channel: PaymentChannelType.Stripe,
                currency: session.currency || 'eur',
                paymentAt: new Date(),
                result: {
                  subscriptionId: session.id,
                  invoiceId: session.latest_invoice?.toString() || null,
                  priceId: session.items.data[0].price.id,
                },
              },
            }),
          ]);

          if (plan) {
            await logsnag.track({
              channel: "subscriptions",
              event: "Cambio de Plan",
              user_id: subscription.userId,
              description: `Cambio al plan ${plan?.name}`,
              icon: "🔄",
              tags: {
                plan: plan?.name || 'starter',
              },
            });
          }
        }
        break;
      }
    }
  } catch (error) {
    console.error('Error en el webhook de Stripe:', error);
  }
}