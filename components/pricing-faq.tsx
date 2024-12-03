import { useTranslations } from "next-intl";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { HeaderSection } from "./shared/header-section";

const pricingFaqData = [
  {
    id: "item-1",
    question: "item1.question",
    answer: "item1.answer",
  },
  {
    id: "item-2",
    question: "item2.question",
    answer: "item2.answer",
  },
  {
    id: "item-3",
    question: "item3.question",
    answer: "item3.answer",
  },
  {
    id: "item-4",
    question: "item4.question",
    answer: "item4.answer",
  },
  {
    id: "item-5",
    question: "item5.question",
    answer: "item5.answer",
  },
  {
    id: "item-6",
    question: "item6.question",
    answer: "item6.answer",
  },
];

export function PricingFaq() {
  const t = useTranslations("PricingPage");

  return (
    <section className="container max-w-xl py-2">
      <HeaderSection
        title={t("faq.title")}
      />

      <Accordion type="single" collapsible className="my-12 w-full">
        {pricingFaqData.map((faqItem) => (
          <AccordionItem key={faqItem.id} value={faqItem.id}>
            <AccordionTrigger>{t(`faq.${faqItem.question}`)}</AccordionTrigger>
            <AccordionContent className="text-[12px] text-muted-foreground sm:text-[15px]">
              {t(`faq.${faqItem.answer}`)}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
