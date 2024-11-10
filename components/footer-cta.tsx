"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function FooterCTA() {
  const pathname = usePathname();

  if (pathname.includes("pitch")) {
    return null;
  }

  return (
    <div className="border border-border md:container text-center px-10 py-14 mx-4 md:mx-auto md:px-24 md:py-20 mb-32 mt-24 flex items-center flex-col bg-white dark:bg-[#121212]">
      <span className="text-4xl md:text-8xl font-medium text-gray-900 dark:text-white">
        Empresas x NotasAI.
      </span>
      <p className="text-gray-600 dark:text-[#878787] mt-6">
        Una herramienta todo-en-uno para freelancers, trabajadores, consultores, startups y
        <br />
        empresas para optimizar su productividad, mejorar y avanzar resultados.
      </p>

      <div className="mt-10 md:mb-8">
        <div className="flex items-center space-x-4">
          <Link href="mailto:sales@notas.ai">
            <Button
              variant="outline"
              className="border border-primary h-12 px-6 border-gray-900 dark:border-white text-gray-900 dark:text-white hidden md:block hover:bg-gray-100 dark:hover:bg-white/10"
            >
              Contactar
            </Button>
          </Link>

          <a href="https://notas.ai/pricing">
            <Button className="h-12 px-5 bg-gray-900 text-white dark:bg-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-white/90">
              Empezar
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}