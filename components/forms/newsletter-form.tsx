"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import va from "@vercel/analytics";
import { TiltedSendIcon } from "@/assets";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { useReward } from "react-rewards";
import { z } from "zod";

const formId = "5108903";

export const newsletterFormSchema = z.object({
  email: z.string().email({ message: "email invalid" }).nonempty(),
  formId: z.string().nonempty(),
});
export type NewsletterForm = z.infer<typeof newsletterFormSchema>;

export default function Newsletter({ subCount }: { subCount?: string }) {
  const t = useTranslations("NewsLetter");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<NewsletterForm>({
    defaultValues: { formId },
    resolver: zodResolver(newsletterFormSchema),
  });
  const [isSubscribed, setIsSubscribed] = React.useState(false);
  const { reward } = useReward("newsletter-rewards", "emoji", {
    position: "absolute",
    emoji: ["🤓", "😊", "🥳", "🤩", "🤪", "🤯", "🥰", "😎", "🤑", "🤗", "😇"],
    elementCount: 32,
  });
  const onSubmit = React.useCallback(
    async (data: NewsletterForm) => {
      try {
        if (isSubmitting) return;

        va.track("Newsletter:Subscribe");

        const response = await fetch("/api/newsletter", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ data }),
        });
        if (response.ok) {
          reset();
          reward();
          setIsSubscribed(true);
        }
      } catch (error) {
        console.error(error);
      }
    },
    [isSubmitting, reset, reward],
  );

  React.useEffect(() => {
    if (isSubscribed) {
      setTimeout(() => setIsSubscribed(false), 60000);
    }
  }, [isSubscribed]);

  return (
    <form
      className={cn(
        "w-full relative rounded-2xl border border-zinc-100 p-3 transition-opacity dark:border-zinc-700/40",
        isSubmitting && "pointer-events-none opacity-70",
      )}
      onSubmit={handleSubmit(onSubmit)}
    >
      <input type="hidden" className="hidden" {...register("formId")} />
      <h2 className="flex items-center text-sm font-semibold text-zinc-900 dark:text-zinc-100">
        <TiltedSendIcon className="h-5 w-5 flex-none" />
        <span className="ml-2">{t("title")}</span>
      </h2>
      <p className="mt-2 text-xs text-zinc-600 dark:text-zinc-400 md:text-sm">
        <span>{t("subtitle")} 🫶</span>
        <br />
        {subCount && (
          <span>
            加入其他 <span className="font-medium">{subCount}</span> 位订阅者，
          </span>
        )}
      </p>
      <AnimatePresence mode="wait">
        {!isSubscribed ? (
          <motion.div
            className="mt-6 flex flex-col space-y-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit="initial"
          >
            <input
              type="email"
              placeholder={t("form.placeholder")}
              aria-label={t("form.aria_label")}
              required
              className="min-w-0 flex-auto appearance-none rounded-lg border border-zinc-900/10 bg-white px-3 py-[calc(theme(spacing.2)-1px)] placeholder:text-zinc-400 focus:border-lime-500 focus:outline-none focus:ring-4 focus:ring-lime-500/10 dark:border-zinc-700 dark:bg-zinc-700/[0.15] dark:text-zinc-200 dark:placeholder:text-zinc-500 dark:focus:border-lime-400/50 dark:focus:ring-lime-400/5 sm:text-sm"
              {...register("email")}
            />
            <Button type="submit" className="flex-1" disabled={isSubmitting}>
              {t("form.button")}
            </Button>
          </motion.div>
        ) : (
          <motion.p
            className="mt-6 h-10 text-center text-lg text-zinc-700 dark:text-zinc-300"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit="initial"
          >
            {t("form.confirm")} 🥳
          </motion.p>
        )}
      </AnimatePresence>
      <span id="newsletter-rewards" className="relative h-0 w-0" />
      {errors.email && (
        <p className="mt-2 text-xs font-medium text-red-600 dark:text-red-400">
          {errors.email.message}
        </p>
      )}
    </form>
  );
}
