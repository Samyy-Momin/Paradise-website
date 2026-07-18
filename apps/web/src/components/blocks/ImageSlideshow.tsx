"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ImageSlideshow({
  images,
  className,
  hideDots,
  priority = false,
}: {
  images: { url: string; altText?: string }[];
  className?: string;
  hideDots?: boolean;
  priority?: boolean;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!images || images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images]);

  if (!images || images.length === 0) {
    return (
      <div className="w-full aspect-video bg-slate-100 rounded-3xl flex items-center justify-center text-slate-400">
        [No images available]
      </div>
    );
  }

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  return (
    <div
      className={`relative w-full bg-slate-200 overflow-hidden group ${className || "aspect-video rounded-3xl"}`}
    >
      {images.map((image, idx) => (
        <div
          key={idx}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            idx === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <Image
            src={image.url}
            alt={image.altText || `Slide ${idx + 1}`}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            priority={priority && idx === 0}
            className="object-cover"
            unoptimized
          />
        </div>
      ))}

      {images.length > 1 && (
        <>
          <div className="absolute inset-0 z-20 flex items-center justify-between p-4 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              variant="secondary"
              size="icon"
              className="rounded-full bg-white/80 hover:bg-white text-slate-800 shadow-md backdrop-blur-sm"
              onClick={handlePrev}
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              className="rounded-full bg-white/80 hover:bg-white text-slate-800 shadow-md backdrop-blur-sm"
              onClick={handleNext}
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </div>
          {!hideDots && (
            <div className="absolute bottom-4 left-0 right-0 z-20 flex justify-center gap-2">
              {images.map((_, idx) => (
                <button
                  key={idx}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    idx === currentIndex
                      ? "bg-white scale-125 shadow-sm"
                      : "bg-white/50 hover:bg-white/80"
                  }`}
                  onClick={() => setCurrentIndex(idx)}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
