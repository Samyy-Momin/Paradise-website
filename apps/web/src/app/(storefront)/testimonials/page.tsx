import { Metadata } from "next";
import TestimonialsClient from "./testimonials-client";

export const metadata: Metadata = {
  title: "Parent Reviews & Testimonials | Paradise English School",
  description:
    "Read what parents have to say about their children's experience at Paradise English School and Tender Kidz.",
};

export const revalidate = 60;

export default async function TestimonialsPage() {
  let initialTestimonials = [];
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api"}/testimonials`,
      {
        cache: "no-store",
      },
    );
    if (res.ok) {
      initialTestimonials = await res.json();
    }
  } catch (error: any) {
    if (error?.digest === "DYNAMIC_SERVER_USAGE") throw error;
    console.error("Failed to fetch testimonials:", error);
  }

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 pt-24 pb-16">
      <div className="container max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-heading font-extrabold text-slate-900 mb-4">
            Parent Reviews
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Read real experiences from our community, or leave a review to share
            your own story.
          </p>
        </div>

        <TestimonialsClient initialTestimonials={initialTestimonials} />
      </div>
    </div>
  );
}
