import { headers } from "next/headers";
import Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/db/prisma";
import { subscriptionPlans } from "@/config/subscription-plans";
import { logsnag } from "@/lib/log-snag";
import { invalidateSubscriptionCache } from "@/lib/redis";

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
          const priceId = session.metadata.priceId;
          
          if (!priceId) {
            throw new Error("Missing priceId in session metadata");
          }

          const plan = subscriptionPlans.find(
            p => p.price.toString() === priceId
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
              stripePriceId: priceId,
              stripeCustomerId: session.customer as string,
              planId: plan?.id || 'starter',
              status: 'active',
              credits: plan?.credits || 0,
              currentPeriodStart: new Date(subscription.current_period_start * 1000),
              currentPeriodEnd: new Date(subscription.current_period_end * 1000),
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
              interval: 'mensual',
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

            await prisma.subscription.update({
              where: { id: subscription.id },
              data: {
                credits: plan?.credits || subscription.credits,
                currentPeriodStart: new Date(session.period_start * 1000),
                currentPeriodEnd: new Date(session.period_end * 1000),
              },
            });

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
            p => p.price.monthly === newPriceId || 
                p.price.yearly === newPriceId
          );

          await prisma.subscription.update({
            where: { id: subscription.id },
            data: { 
              status: session.status,
              stripePriceId: newPriceId,
              planId: plan?.id || subscription.planId,
              credits: plan?.credits || subscription.credits,
            },
          });

          if (plan) {
            await logsnag.track({
              channel: "subscriptions",
              event: "Cambio de Plan",
              user_id: subscription.userId,
              description: `Actualización de plan ${subscription.planId} a ${plan.name}`,
              icon: "🔄",
              tags: {
                plan_type: plan.name,
                status: session.status,
                subscription_id: session.id
              },
            });
          }
        }
        break;
      }
    }
  } catch (error) {
    console.error("Error processing subscription webhook:", error);
    return new Response("Webhook handler failed", { status: 500 });
  }

  return new Response(null, { status: 200 });
} 