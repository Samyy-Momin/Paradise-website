"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function InstagramReelsCarousel({ reels }: { reels: string[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  if (!reels || reels.length === 0) {
    return null;
  }

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  // Extract shortcode from typical Instagram reel URLs
  const getReelEmbedUrl = (url: string) => {
    try {
      const parsedUrl = new URL(url);
      const pathParts = parsedUrl.pathname.split("/").filter(Boolean);
      if (
        pathParts.length >= 2 &&
        (pathParts[0] === "reel" || pathParts[0] === "p")
      ) {
        const shortcode = pathParts[1];
        // add /embed/ to the reel shortcode
        return `https://www.instagram.com/p/${shortcode}/embed/`;
      }
      return url;
    } catch {
      return url;
    }
  };

  return (
    <div className="relative w-full max-w-7xl mx-auto pb-8 pt-4">
      <div className="flex items-center justify-between mb-8 px-4">
        <h2 className="text-3xl font-bold text-school-blue">
          Life at Paradise
        </h2>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full"
            onClick={scrollLeft}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full"
            onClick={scrollRight}
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex overflow-x-auto gap-6 px-4 pb-8 snap-x snap-mandatory hide-scrollbar"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {reels.map((url, idx) => {
          const isDirectVideo =
            url.match(/\.(mp4|webm)(\?.*)?$/i) || url.startsWith("/uploads/");
          const embedUrl = isDirectVideo ? url : getReelEmbedUrl(url);

          return (
            <div
              key={idx}
              className="relative flex-shrink-0 w-[280px] h-[480px] sm:w-[320px] sm:h-[550px] bg-slate-100 rounded-[32px] overflow-hidden snap-center group shadow-sm hover:shadow-xl transition-all border-4 border-white"
            >
              {isDirectVideo ? (
                <video
                  src={embedUrl}
                  className="w-full h-full object-cover"
                  autoPlay
                  loop
                  muted
                  playsInline
                />
              ) : (
                /* Instagram Embed iframe */
                <iframe
                  src={embedUrl}
                  className="w-[calc(100%+2px)] h-[calc(100%+2px)] -m-[1px]"
                  frameBorder="0"
                  scrolling="no"
                />
              )}

              {/* Transparent Overlay to capture clicks and hover effects */}
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute inset-0 z-10 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center cursor-pointer"
              >
                <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                  <Volume2 className="h-5 w-5 text-white" />
                </div>
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
}
