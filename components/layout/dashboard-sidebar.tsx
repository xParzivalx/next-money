"use client";

import { Fragment, useEffect, useState } from "react";

import { Menu, PanelLeftClose, PanelRightClose, ExternalLink } from "lucide-react";
import { useTranslations } from "next-intl";

import { UpgradeCard } from "@/components/upgrade-card"
import { Icons } from "@/components/shared/icons";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { siteConfig } from "@/config/site";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Link, usePathname } from "@/lib/navigation";
import { cn } from "@/lib/utils";
import { NavItem, SidebarNavItem } from "@/types";

import { NavBar, NavbarLogo } from "./navbar";
import { motion, AnimatePresence } from "framer-motion";

interface DashboardSidebarProps {
  links: SidebarNavItem[];
}

export function DashboardSidebar({ links }: DashboardSidebarProps) {
  const path = usePathname();
  const t = useTranslations("AppNavigation");
  // Inicializa el estado de expansión de la barra lateral
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = window.localStorage.getItem("sidebarExpanded");
      return saved !== null ? JSON.parse(saved) : true;
    }
    return true;
  });

  // Guarda el estado de expansión en el almacenamiento local cuando cambia
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(
        "sidebarExpanded",
        JSON.stringify(isSidebarExpanded),
      );
    }
  }, [isSidebarExpanded]);

  const { isTablet } = useMediaQuery();

  useEffect(() => {
    setIsSidebarExpanded(!isTablet);
  }, [isTablet]);

  const toggleSidebar = () => {
    setIsSidebarExpanded(!isSidebarExpanded);
  };

  return (
    <TooltipProvider delayDuration={0}>
      <div className="sticky top-0 h-full">
        <ScrollArea className="h-full overflow-y-auto border-r">
          <motion.aside
            initial={false}
            animate={{
              width: isSidebarExpanded ? "220px" : "68px",
              transition: { duration: 0.3, ease: "easeInOut" }
            }}
            className={cn(
              "hidden h-screen md:block",
            )}
          >
            <div className="flex h-full max-h-screen flex-1 flex-col gap-2">
              <div className="flex h-14 items-center p-4 lg:h-[60px]">
                {isSidebarExpanded ? <NavbarLogo size="md" /> : null}

                <Button
                  variant="ghost"
                  size="icon"
                  className="ml-auto size-9 lg:size-8"
                  onClick={toggleSidebar}
                >
                  {isSidebarExpanded ? (
                    <PanelLeftClose
                      size={18}
                      className="stroke-muted-foreground"
                    />
                  ) : (
                    <PanelRightClose
                      size={18}
                      className="stroke-muted-foreground"
                    />
                  )}
                  <span className="sr-only">Toggle</span>
                </Button>
              </div>

              <nav className="flex flex-1 flex-col gap-8 px-2.5 pt-4">
                {links.map((section) => (
                  <section
                    key={section.title}
                    className="flex flex-col gap-0.5"
                  >
                    {isSidebarExpanded ? (
                      <p className="text-xs text-black dark:text-white">
                        {section.title}
                      </p>
                    ) : (
                      <div className="h-4" />
                    )}
                    {section?.items?.map((item) => {
                      const Icon = Icons[item.icon || "arrowRight"];
                      const RightIcon = item.rightIcon ? Icons[item.rightIcon] : null;
                      return (
                        item.href && (
                          <Fragment key={`link-fragment-${item.title}`}>
                            {isSidebarExpanded ? (
                              <Link
                                key={`link-${item.title}`}
                                href={item.disabled ? "#" : item.href}
                                target={item.external ? "_blank" : undefined}
                                rel={item.external ? "noopener noreferrer" : undefined}
                                className={cn(
                                  "flex items-center gap-3 p-2 text-sm font-medium hover:bg-muted",
                                  path === item.href
                                    ? "bg-muted border border-[rgba(27, 27, 27, 0.18)] dark:border-[rgba(185, 185, 185, 0.17)] bg-[#ececec] dark:bg-[#1b1b1b]"
                                    : "text-black dark:text-white hover:text-accent-foreground",
                                  item.disabled &&
                                    "cursor-not-allowed opacity-80 hover:bg-transparent hover:text-black hover:dark:text-white",
                                )}
                              >
                                <Icon className="size-5" />
                                <span className="flex-grow">
                                  {t(item.title, { fallback: item.title })}
                                </span>
                                {item.badge && (
                                  <Badge className="ml-auto flex size-5 shrink-0 items-center justify-center rounded-full">
                                    {item.badge}
                                  </Badge>
                                )}
                                {item.external && <Icons.externalLink className="size-4 ml-2" />}
                              </Link>
                            ) : (
                              <Tooltip key={`tooltip-${item.title}`}>
                                <TooltipTrigger asChild>
                                  <Link
                                    key={`link-tooltip-${item.title}`}
                                    href={item.disabled ? "#" : item.href}
                                    target={item.external ? "_blank" : undefined}
                                    rel={item.external ? "noopener noreferrer" : undefined}
                                    className={cn(
                                      "flex items-center gap-3 py-3 text-sm font-medium hover:bg-[#ececec] border hover:border border-transparent dark:hover:bg-[#1b1b1b] dark:hover:border-[rgba(185, 185, 185, 0.17)]",
                                      path === item.href
                                        ? "border-[rgba(27, 27, 27, 0.18)] dark:border-[rgba(185, 185, 185, 0.17)] bg-[#ececec] dark:bg-[#1b1b1b]"
                                        : "text-black dark:text-white hover:text-accent-foreground",
                                      item.disabled &&
                                        "cursor-not-allowed opacity-80 hover:bg-transparent hover:text-black hover:dark:text-white",
                                    )}
                                  >
                                    <span className="flex size-full items-center justify-center">
                                      <Icon className="size-5" />
                                    </span>
                                  </Link>
                                </TooltipTrigger>
                                <TooltipContent side="right">
                                  {t(item.title)}
                                </TooltipContent>
                              </Tooltip>
                            )}
                          </Fragment>
                        )
                      );
                    })}
                  </section>
                ))}
              </nav>

              <div className="mt-auto xl:p-4">
                {isSidebarExpanded ? <UpgradeCard /> : null}
              </div>
            </div>
          </motion.aside>
        </ScrollArea>
      </div>
    </TooltipProvider>
  );
}

export function MobileSheetSidebar({ links }: DashboardSidebarProps) {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const { isSm, isMobile } = useMediaQuery();
  const t = useTranslations("AppNavigation");

  if (isSm || isMobile) {
    return (
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="size-9 shrink-0 md:hidden"
          >
            <Menu className="size-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <AnimatePresence>
          {open && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 bg-black z-[55]"
                onClick={() => setOpen(false)}
              />
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ type: "spring", damping: 20, stiffness: 100 }}
                className="fixed inset-y-0 left-0 w-full max-w-xs bg-background p-6 shadow-lg z-[60]"
              >
                <ScrollArea className="h-full overflow-y-auto -mx-6">
                  <div className="flex h-screen flex-col px-6">
                    <nav className="flex flex-1 flex-col gap-y-8 text-lg font-medium">
                      <NavBar />
                      {links.map((section) => (
                        <section
                          key={section.title}
                          className="flex flex-col gap-0.5"
                        >
                          <p className="text-xs text-black dark:text-white">
                            {section.title}
                          </p>

                          {section?.items?.map((item) => {
                            const Icon = Icons[item.icon || "arrowRight"];
                            return (
                              item.href && (
                                <Fragment key={`link-fragment-${item.title}`}>
                                  <Link
                                    key={item.title}
                                    href={item.disabled ? "#" : item.href}
                                    className={cn(
                                      "flex items-center gap-3 rounded-md p-2 text-sm font-medium hover:bg-muted",
                                      path === item.href
                                        ? "bg-muted"
                                        : "text-black dark:text-white hover:text-accent-foreground",
                                      item.disabled &&
                                        "cursor-not-allowed opacity-80 hover:bg-transparent hover:text-black hover:dark:text-white",
                                    )}
                                  >
                                    <Icon className="size-5" />
                                    {t(item.title)}
                                    {item.badge && (
                                      <Badge className="ml-auto flex size-5 shrink-0 items-center justify-center rounded-full">
                                        {item.badge}
                                      </Badge>
                                    )}
                                  </Link>
                                </Fragment>
                              )
                            );
                          })}
                        </section>
                      ))}
                      <div className="mt-auto"><UpgradeCard /></div>
                    </nav>
                  </div>
                </ScrollArea>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </Sheet>
    );
  }

  return (
    <div className="flex size-9 animate-pulse rounded-lg bg-muted md:hidden" />
  );
}
