import type { Metadata } from "next";
import { FAQSection } from "@/components/blocks/FAQSection";

export const metadata: Metadata = {
  title: "Frequently Asked Questions | Paradise English School",
  description:
    "Find answers to common questions about admissions, campus life, and academics at Paradise English School.",
};

async function getFaqs() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api"}/faq`,
      {
        cache: "no-store",
      },
    );
    if (!res.ok) return [];
    return res.json();
  } catch (error: any) {
    if (error?.digest === "DYNAMIC_SERVER_USAGE") throw error;
    console.error("Failed to fetch FAQs:", error);
    return [];
  }
}

export default async function FaqPage() {
  const items = await getFaqs();

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 pt-24 pb-16">
      <div className="container">
        {items.length > 0 ? (
          <FAQSection items={items} />
        ) : (
          <div className="text-center py-24 text-slate-500">
            <h1 className="text-3xl font-heading font-bold text-slate-900 mb-4">
              FAQ
            </h1>
            <p>Check back later for common questions and answers.</p>
          </div>
        )}
      </div>
    </div>
  );
}
