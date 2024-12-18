"use client";

import { Button } from "@/components/ui/button";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Icons } from "@/components/shared/icons";
import { motion } from "framer-motion";
import { useRef, useState } from "react";

interface VideoPlayer extends HTMLVideoElement {
  play: () => Promise<void>;
  pause: () => void;
}

export function SectionVideo() {
  const playerRef = useRef<VideoPlayer>(null);
  const timer = useRef<NodeJS.Timeout>();
  const [isPlaying, setPlaying] = useState<boolean>(false);
  const [isMuted, setMuted] = useState(true);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const togglePlay = () => {
    if (isPlaying) {
      playerRef.current?.pause();
    } else {
      playerRef.current?.play();
    }
    setPlaying(!isPlaying);
  };

  const toggleMute = () => {
    setMuted(!isMuted);
  };

  return (
    <motion.div
      className="flex flex-col justify-center container pb-20"
      onViewportEnter={() => {
        if (!isPlaying && isDesktop) {
          timer.current = setTimeout(() => {
            playerRef.current?.play();
            setPlaying(true);
          }, 4000);
        }
      }}
      onViewportLeave={() => {
        playerRef.current?.pause();
        setPlaying(false);
        if (timer.current) {
          clearTimeout(timer.current);
        }
      }}
    >
      <div className="relative">
        {isPlaying && (
          <div className="absolute md:top-12 md:right-12 top-4 right-4 space-x-4 items-center justify-center z-30 transition-all">
            <Button
              size="icon"
              className="rounded-full size-10 md:size-14 transition ease-in-out hover:scale-110"
              onClick={toggleMute}
            >
              {isMuted ? <Icons.mute size={24} /> : <Icons.unmute size={24} />}
            </Button>
          </div>
        )}

        {!isPlaying && (
          <div className="absolute md:top-12 md:right-12 top-4 right-4 space-x-4 items-center justify-center z-30 transition-all">
            <Button
              size="icon"
              className="rounded-full size-10 md:size-14 transition ease-in-out hover:scale-110"
              onClick={togglePlay}
            >
              <Icons.play size={24} />
            </Button>
          </div>
        )}

        <video
          ref={playerRef}
          onClick={togglePlay}
          onEnded={() => {
            playerRef.current?.load();
            setPlaying(false);
          }}
          src="https://notas.ai/e:acc.mp4"
          poster="https://pbs.twimg.com/media/F1TM4rNakAAyoQa?format=png&name=4096x4096"
          className="w-full cursor-pointer"
          muted={isMuted}
          playsInline
        />
      </div>
    </motion.div>
  );
}