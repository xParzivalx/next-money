import { unstable_setRequestLocale } from "next-intl/server";

import { Screens } from "@/components/sections/screens";
import { SectionOne } from "@/components/sections/section-one";
import { SectionTwo } from "@/components/sections/section-two";
import { SectionThree } from "@/components/sections/section-three";
import { SectionFour } from "@/components/sections/section-four";
import { SectionFive } from "@/components/sections/section-five";
import { SectionSeven } from "@/components/sections/section-seven";
import { SectionVideo } from "@/components/sections/section-video";
import { Hero } from "@/components/sections/new-hero"
import { Ticker } from "@/components/ticker";
import { FooterCTA } from "@/components/footer-cta";
import Features from "@/components/sections/features";
import HeroLanding from "@/components/sections/hero-landing";
import PricingCard from "@/components/sections/pricing-card";
import { infos } from "@/config/landing";

type Props = {
  params: { locale: string };
};

export default function IndexPage({ params: { locale } }: Props) {
  // Enable static rendering
  unstable_setRequestLocale(locale);

  return (
    <>
      <Hero />
      {/* <Powered />
      {/* <BentoGrid /> */}
      {/* <InfoLanding data={infos[0]} reverse={true} /> */}
      {/* <InfoLanding data={infos[1]} /> */}
      {/* <Screens /> */}
      {/*<Features />*/}
      <SectionOne />
      <SectionTwo />
      <SectionThree />
      <SectionFour />
      <SectionFive />
      <SectionSeven />
      <SectionVideo />
      <Ticker />
      <FooterCTA />
    </>
  );
}
