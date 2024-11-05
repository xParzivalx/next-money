import { unstable_setRequestLocale } from "next-intl/server";

import Screens from "@/components/sections/screens";
import Features from "@/components/sections/features";
import HeroLanding from "@/components/sections/hero-landing";
import PricingCard from "@/components/sections/pricing-card";
import TwitterList from "@/components/sections/twitter-list";
import SchnellIntro from "@/components/sections/schnell-intro";
import { infos } from "@/config/landing";

type Props = {
  params: { locale: string };
};

export default function IndexPage({ params: { locale } }: Props) {
  // Enable static rendering
  unstable_setRequestLocale(locale);

  return (
    <>
      <HeroLanding />
      {/* <Powered />
      {/* <BentoGrid /> */}
      {/* <InfoLanding data={infos[0]} reverse={true} /> */}
      {/* <InfoLanding data={infos[1]} /> */}
      <Features />
      <Screens />
      <SchnellIntro />
      <PricingCard locale={locale} />
      {process.env.NODE_ENV === "production" && <TwitterList />}
    </>
  );
}
