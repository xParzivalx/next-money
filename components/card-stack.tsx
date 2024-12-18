"use client";

import { useMediaQuery } from "@/hooks/use-media-query";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { cn } from "@/lib/utils";

type Card = {
  id: number;
  content: React.ReactNode;
  name: string;
};

export const CardStack = ({
  items,
  offset,
  scaleFactor,
}: {
  items: Card[];
  offset?: number;
  scaleFactor?: number;
}) => {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const CARD_OFFSET = isDesktop ? 10 : 5;
  const SCALE_FACTOR = scaleFactor || 0.06;
  const [cards, setCards] = useState<Card[]>([items[0] || items[0]]);
  const [isAnimating, setIsAnimating] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    startFlipping();
    setCards(items);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [items]);

  const startFlipping = () => {
    if (isAnimating) return;
    
    intervalRef.current = setInterval(() => {
      setCards((prevCards: Card[]) => {
        const newArray = [...prevCards];
        newArray.unshift(newArray.pop()!);
        return newArray;
      });
    }, 5000);
  };

  const onChangeCardByIndex = (index: number) => {
    const item = cards[index];
    if (!item) return;

    setCards([item, ...cards.slice(0, index), ...cards.slice(index + 1)]);
  };

  const onChangeCard = (item) => {
    const index = cards.findIndex((card) => card.id === item.id);
    setCards([item, ...cards.slice(0, index), ...cards.slice(index + 1)]);
  };

  return (
    <div
      className="relative h-[200px] md:h-[520px] w-[300px] md:w-[800px] z-10"
      onMouseEnter={() => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      }}
      onMouseLeave={() => !isAnimating && startFlipping()}
    >
      {cards.map((card, index) => {
        return (
          <motion.div
            key={card.id}
            className="absolute h-[200px] md:h-[520px] w-[300px] md:w-[800px] flex flex-col justify-between"
            style={{
              transformOrigin: "top center",
              display: index > 2 ? "none" : "block",
            }}
            whileHover={{
              top: index > 0 ? index * -CARD_OFFSET - 30 : 0,
              transition: { duration: 0.3 },
            }}
            animate={{
              top: index * -CARD_OFFSET,
              scale: 1 - index * SCALE_FACTOR,
              zIndex: cards.length - index,
            }}
            onMouseEnter={() => {
              if (intervalRef.current) {
                clearInterval(intervalRef.current);
              }
            }}
          >
            <TooltipProvider delayDuration={0}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <motion.div
                    className={cn(
                      "absolute left-0 top-0 h-full w-full cursor-pointer",
                      "overflow-hidden",
                      "shadow-lg hover:shadow-xl",
                      "transition-shadow duration-200"
                    )}
                    style={{
                      transform: `scale(${1 - SCALE_FACTOR * index}) translateY(${
                        index * CARD_OFFSET
                      }px)`,
                      zIndex: cards.length - index,
                      display: index > 2 ? "none" : "block",
                    }}
                    whileHover={{
                      top: index > 0 ? -30 : 0,
                      transition: { duration: 0.3 },
                    }}
                    onClick={() => onChangeCard(card)}
                  >
                    {card.content}
                  </motion.div>
                </TooltipTrigger>
                <TooltipContent
                  side="right"
                  className="rounded-sm px-3 py-1"
                  sideOffset={8}
                >
                  <p className="text-xs">{card.name}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <div 
              onClick={() => onChangeCardByIndex(index)}
              className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-200"
            >
              {card.content}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};