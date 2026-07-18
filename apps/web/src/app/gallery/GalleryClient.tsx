"use client";

import { useState } from "react";
import Image from "next/image";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

export function GalleryClient({ items, categories }: { items: any[], categories: any[] }) {
  const [filter, setFilter] = useState<string>("ALL");
  const [selectedImage, setSelectedImage] = useState<any | null>(null);

  const filterOptions = [
    { label: "All", value: "ALL" },
    ...categories.map(c => ({ label: c.name, value: c.id }))
  ];

  const filteredItems = filter === "ALL" ? items : items.filter((item) => item.categoryId === filter);

  return (
    <>
      {/* Filters */}
      <div className="flex overflow-x-auto whitespace-nowrap justify-start md:flex-wrap md:justify-center gap-2 mb-12 pb-2">
        {filterOptions.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setFilter(cat.value)}
            className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
              filter === cat.value
                ? "bg-school-blue text-white shadow-md scale-105"
                : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      {filteredItems.length === 0 ? (
        <div className="text-center py-24 text-slate-500">
          No photos found for this category.
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {filteredItems.map((item, idx) => (
            <ScrollReveal key={item.id} delay={idx * 0.05}>
              <div
                className="group relative aspect-square bg-slate-200 rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all"
                onClick={() => setSelectedImage(item)}
              >
                <Image
                  src={item.url}
                  alt={item.altText || "Gallery image"}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  unoptimized
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-end justify-center pb-4 opacity-0 group-hover:opacity-100">
                  <span className="text-white text-sm font-medium bg-black/50 px-3 py-1 rounded-full backdrop-blur-sm">
                    View
                  </span>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      )}

      {/* Lightbox Modal */}
      <Dialog open={!!selectedImage} onOpenChange={(open) => !open && setSelectedImage(null)}>
        <DialogContent className="max-w-[90vw] max-h-[90vh] p-0 overflow-hidden bg-transparent border-none shadow-none flex items-center justify-center">
          <VisuallyHidden>
            <DialogTitle>Image View</DialogTitle>
            <DialogDescription>Viewing full size image</DialogDescription>
          </VisuallyHidden>
          
          {selectedImage && (
            <div className="relative w-full h-[85vh] bg-black/20 rounded-xl overflow-hidden flex items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={selectedImage.url}
                alt={selectedImage.altText || "Gallery image"}
                className="max-w-full max-h-full object-contain drop-shadow-2xl"
              />
              {selectedImage.altText && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 text-white px-4 py-2 rounded-full text-sm backdrop-blur-md whitespace-nowrap max-w-[90%] truncate">
                  {selectedImage.altText}
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
