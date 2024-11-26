import { auth } from "@clerk/nextjs/server";
import { PricingCards } from "@/components/pricing-cards";
import { PricingFaq } from "@/components/pricing-faq";
import { getChargeProduct } from "@/db/queries/charge-product";
import { subscriptionPlans } from "@/config/subscription-plans";

type Props = {
  locale: string;
};

export default async function PricingCard(props: Props) {
  const { userId } = auth();
  const { data: chargeProduct } = await getChargeProduct(props.locale);

  return (
    <div className="flex w-full flex-col gap-16 py-8 md:py-8">
      <PricingCards 
        chargeProduct={chargeProduct as any[]} 
        subscriptionPlans={subscriptionPlans}
        userId={userId}
      />
      <hr className="container" />
      <PricingFaq />
    </div>
  );
}
