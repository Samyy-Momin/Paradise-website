import type { Metadata } from "next";
import { GalleryClient } from "../../gallery/GalleryClient";

export const metadata: Metadata = {
  title: "Photo Gallery | Paradise English School",
  description:
    "Browse moments from our campus, events, and activities at Paradise English School and Tender Kidz Pre-School.",
};

async function getGalleryData() {
  try {
    const [itemsRes, catsRes] = await Promise.all([
      fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api"}/gallery`,
        {
          cache: "no-store",
        },
      ),
      fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api"}/gallery-categories`,
        {
          cache: "no-store",
        },
      ),
    ]);

    return {
      items: itemsRes.ok ? await itemsRes.json() : [],
      categories: catsRes.ok ? await catsRes.json() : [],
    };
  } catch (error: any) {
    if (error?.digest === "DYNAMIC_SERVER_USAGE") throw error;
    console.error("Failed to fetch gallery:", error);
    return { items: [], categories: [] };
  }
}

export default async function GalleryPage() {
  const { items, categories } = await getGalleryData();

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      {/* Hero Section */}
      <div className="bg-school-blue/10 py-16 md:py-24">
        <div className="container text-center">
          <h1 className="text-4xl md:text-5xl font-heading font-extrabold text-slate-900 mb-4">
            Our Gallery
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            A glimpse into the vibrant life, events, and campus of Paradise
            English School.
          </p>
        </div>
      </div>

      <div className="container py-16">
        <GalleryClient items={items} categories={categories} />
      </div>
    </div>
  );
}
