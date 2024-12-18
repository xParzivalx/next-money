import React from 'react';
import { useTranslations } from "next-intl";

import { HeaderSection } from "@/components/shared/header-section";
import { Icons } from "@/components/shared/icons";
import MaxWidthWrapper from "@/components/shared/max-width-wrapper";
import { Button } from "@/components/ui/button";
import { features } from "@/config/landing";
import { Link } from "@/lib/navigation";

export default function Features() {
  const t = useTranslations("IndexPage");
  return (
    <section>
      <div className="pb-6 pt-4">
        <MaxWidthWrapper>
          <HeaderSection
            title={t("features.title")}
            subtitle={t("features.description")}
          />

          <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div
                className="group relative overflow-hidden  border bg-background p-5 md:p-8"
                key={t(`features.${feature.title}`)}
              >
                <div className="relative">
                  <h3 className="text-lg font-semibold mb-4">{t(`features.${feature.title}`)}</h3>
                  <div className="relative flex size-12  border border-border shadow-sm *:relative *:m-auto *:size-6">
                    {React.createElement(Icons[feature.icon as keyof typeof Icons])}
                  </div>

                  <p className="mt-6 pb-6 text-muted-foreground">
                    {t(`features.${feature.description}`)}
                  </p>

                  <div className="-mb-5 flex gap-3 border-t border-muted py-4 md:-mb-7">
                    <Button
                      variant="secondary"
                      size="sm"
                      className="rounded-xl px-4"
                    >
                      <Link
                        href={feature.link}
                        className="flex items-center gap-2"
                      >
                        <span>{t("features.action.visit")}</span>
                        <Icons.arrowUpRight className="size-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </MaxWidthWrapper>
      </div>
    </section>
  );
}
