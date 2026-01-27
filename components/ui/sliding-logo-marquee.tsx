"use client";

import React, { useRef, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Pause, Play } from "lucide-react";

export interface SlidingLogoMarqueeItem {
  id: string;
  content: React.ReactNode;
  href?: string;
}

export interface SlidingLogoMarqueeProps {
  items: SlidingLogoMarqueeItem[];
  speed?: number;
  pauseOnHover?: boolean;
  blurEdges?: boolean;
  blurWidth?: string;
  showControls?: boolean;
  className?: string;
  itemClassName?: string;
}

const SlidingLogoMarquee: React.FC<SlidingLogoMarqueeProps> = ({
  items,
  speed = 50,
  pauseOnHover = true,
  blurEdges = true,
  blurWidth = "100px",
  showControls = false,
  className,
  itemClassName,
}) => {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (marqueeRef.current) {
      const marquee = marqueeRef.current;
      marquee.style.setProperty("--speed", `${speed}s`);
      marquee.style.setProperty("--blur-width", blurWidth);
    }
  }, [speed, blurWidth]);

  const handlePause = () => setIsPaused(true);
  const handlePlay = () => setIsPaused(false);
  const togglePause = () => setIsPaused((prev) => !prev);

  const duplicatedItems = [...items, ...items]; // Duplicate items for seamless looping

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden group",
        { "blur-edges": blurEdges },
        className
      )}
      ref={marqueeRef}
      onMouseEnter={pauseOnHover && !isPaused ? handlePause : undefined}
      onMouseLeave={pauseOnHover && isPaused ? handlePlay : undefined}
    >
      <div
        className={cn("flex animate-marquee", { "paused": isPaused })}
        style={{ animationPlayState: isPaused ? "paused" : "running" }}
      >
        {duplicatedItems.map((item, index) => (
          <div
            key={`${item.id}-${index}`}
            className={cn(
              "flex-shrink-0 mx-4 flex items-center justify-center",
              itemClassName
            )}
          >
            {item.href ? (
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                {item.content}
              </a>
            ) : (
              item.content
            )}
          </div>
        ))}
      </div>
      {showControls && (
        <button
          onClick={togglePause}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 p-2 bg-white/70 dark:bg-black/70 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
        >
          {isPaused ? <Play size={20} /> : <Pause size={20} />}
        </button>
      )}
      <style jsx>{`
        .blur-edges::before,
        .blur-edges::after {
          content: "";
          position: absolute;
          top: 0;
          bottom: 0;
          width: var(--blur-width);
          z-index: 2;
          pointer-events: none;
        }
        .blur-edges::before {
          left: 0;
          background: linear-gradient(
            to right,
            var(--background-start),
            transparent
          );
        }
        .blur-edges::after {
          right: 0;
          background: linear-gradient(
            to left,
            var(--background-end),
            transparent
          );
        }
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee var(--speed) linear infinite;
        }
        .paused {
          animation-play-state: paused;
        }
        :root {
          --background-start: #050816;
          --background-end: #050816;
        }
        @media (prefers-color-scheme: dark) {
          :root {
            --background-start: #050816;
            --background-end: #050816;
          }
        }
        [data-theme="dark"] {
           --background-start: #050816;
           --background-end: #050816;
        }
        [data-theme="light"] {
           --background-start: white;
           --background-end: white;
        }
      `}</style>
    </div>
  );
};

export default SlidingLogoMarquee;
