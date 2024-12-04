"use client";

import { Icons } from "@/components/shared/icons";
import { motion } from "framer-motion";
import { useState } from "react";

type Props = {
  slug: string;
};

export function PostCopyURL({ slug }: Props) {
  const [isCopied, setCopied] = useState(false);

  const handleClipboard = async () => {
    try {
      setCopied(true);

      await navigator.clipboard.writeText(window.location.href);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch {}
  };

  return (
    <button
      type="button"
      onClick={handleClipboard}
      className="relative flex space-x-2 items-center"
    >
      <motion.div
        className="absolute -left-4 top-0.3"
        initial={{ opacity: 1, scale: 1 }}
        animate={{ opacity: isCopied ? 0 : 1, scale: isCopied ? 0 : 1 }}
      >
        <Icons.copy />
      </motion.div>

      <motion.div
        className="absolute -left-[24px] top-0.3"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: isCopied ? 1 : 0, scale: isCopied ? 1 : 0 }}
      >
        <Icons.Check />
      </motion.div>

      <span className="text-xs">Copy link</span>
    </button>
  );
}