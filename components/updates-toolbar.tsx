"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from '@/lib/utils'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Icons } from "@/components/shared/icons";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { usePathname } from "next/navigation";
import { Twitter } from "lucide-react";
import { CopyInput } from "./copy-input";

interface UpdatesToolbarProps {
  posts: any[]; // Define el tipo de los posts según tu estructura
  currentIndex: number; // Índice del post actual
  onNavigate: (index: number) => void; // Función para manejar la navegación
}

const popupCenter = ({ url, title, w, h }) => {
  const dualScreenLeft =
    window.screenLeft !== undefined ? window.screenLeft : window.screenX;
  const dualScreenTop =
    window.screenTop !== undefined ? window.screenTop : window.screenY;

  const width = window.innerWidth
    ? window.innerWidth
    : document.documentElement.clientWidth
      ? document.documentElement.clientWidth
      : screen.width;
  const height = window.innerHeight
    ? window.innerHeight
    : document.documentElement.clientHeight
      ? document.documentElement.clientHeight
      : screen.height;

  const systemZoom = width / window.screen.availWidth;
  const left = (width - w) / 2 / systemZoom + dualScreenLeft;
  const top = (height - h) / 2 / systemZoom + dualScreenTop;
  const newWindow = window.open(
    url,
    title,
    `
      scrollbars=yes,
      width=${w / systemZoom}, 
      height=${h / systemZoom}, 
      top=${top}, 
      left=${left}
      `,
  );

  return newWindow;
};

export const UpdatesToolbar: React.FC<UpdatesToolbarProps> = ({ posts, currentIndex, onNavigate }) => {
  const pathname = usePathname();

  const handlePrev = () => {
    if (currentIndex > 0) {
      onNavigate(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex !== posts.length - 1) {
      onNavigate(currentIndex + 1);
    }
  };

  const handleOnShare = () => {
    const popup = popupCenter({
      url: `https://twitter.com/intent/tweet?text=${posts[currentIndex].title} https://app.notas.ai/updates/${posts[currentIndex].slug}`,
      title: posts[currentIndex].title,
      w: 800,
      h: 400,
    });

    popup?.focus();
  };

  return (
    <Dialog>
      <div className="fixed right-6 bottom-0 top-0 flex-col items-center justify-center hidden md:flex">
        <TooltipProvider delayDuration={20}>
          <div className="flex flex-col items-center backdrop-filter backdrop-blur-lg dark:bg-[#1A1A1A]/80 p-2 border dark:border-[#2C2C2C] bg-white space-y-4 rounded-full">
            <Tooltip>
              <TooltipTrigger>
                <DialogTrigger asChild>
                  <Icons.Share size={18} className="text-[#606060] -mt-[1px]" />
                </DialogTrigger>
              </TooltipTrigger>
              <TooltipContent
                className="py-1 px-3 rounded-sm"
                sideOffset={25}
                side="right"
              >
                <span className="text-xs">Compartir</span>
              </TooltipContent>
            </Tooltip>

            <div className="flex flex-col items-center border-t-[1px] border-border space-y-2 pt-2">
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    type="button"
                    className={cn(currentIndex === 0 && "opacity-50")}
                    onClick={handlePrev}
                  >
                    <Icons.ChevronUp className="h-6 w-6" />
                  </button>
                </TooltipTrigger>
                <TooltipContent
                  className="py-1 px-3 rounded-sm"
                  sideOffset={25}
                  side="right"
                >
                  <span className="text-xs">Previo</span>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    type="button"
                    className={cn(
                      currentIndex === posts.length - 1 && "opacity-50",
                    )}
                    onClick={handleNext}
                  >
                    <Icons.ChevronDown className="h-6 w-6" />
                  </button>
                </TooltipTrigger>
                <TooltipContent
                  className="py-1 px-3 rounded-sm"
                  sideOffset={25}
                  side="right"
                >
                  <span className="text-xs">Siguiente</span>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
        </TooltipProvider>
      </div>

      <DialogContent className="sm:max-w-[425px]">
        <div className="p-6">
          <DialogHeader>
            <DialogTitle>Share</DialogTitle>
          </DialogHeader>

          <div className="grid gap-6 py-4">
            <CopyInput value={`https://midday.ai${pathname}`} />
            <Button
              className="w-full flex items-center space-x-2 h-10"
              onClick={handleOnShare}
            >
              <span>Share on</span>
              <Twitter />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}