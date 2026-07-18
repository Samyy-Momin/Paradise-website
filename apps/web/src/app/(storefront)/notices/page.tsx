import type { Metadata } from "next";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { format } from "date-fns";
import Link from "next/link";
import { CalendarDays, ChevronRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Notices & Announcements | Paradise English School",
  description: "Stay up to date with the latest news, notices, and events at Paradise English School and Tender Kidz Pre-School.",
};

export const revalidate = 60;

async function getNotices() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api"}/notices`, {
      cache: "no-store",
    });
    if (!res.ok) return [];
    return res.json();
  } catch (error: any) { if (error?.digest === 'DYNAMIC_SERVER_USAGE') throw error;
    console.error("Failed to fetch notices:", error);
    return [];
  }
}

export default async function NoticesPage() {
  const noticesResponse = await getNotices();
  const notices = noticesResponse.data || [];

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      {/* Hero Section */}
      <div className="bg-school-yellow/20 py-16 md:py-24">
        <div className="container text-center">
          <h1 className="text-4xl md:text-5xl font-heading font-extrabold text-slate-900 mb-4">
            Notices & Announcements
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Stay informed with the latest updates from our campus.
          </p>
        </div>
      </div>

      <div className="container py-16 max-w-4xl">
        {notices.length === 0 ? (
          <div className="text-center py-24 text-slate-500 bg-white rounded-3xl shadow-sm border border-slate-100">
            No notices available at the moment.
          </div>
        ) : (
          <div className="space-y-6">
            {notices.map((notice: any, idx: number) => (
              <ScrollReveal key={notice.id} delay={idx * 0.05}>
                <Link href={`/notices/${notice.slug}`}>
                  <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md hover:border-school-blue transition-all group flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer">
                    <div className="flex-1 space-y-2">
                      <h2 className="text-xl font-heading font-bold text-slate-900 group-hover:text-school-blue transition-colors">
                        {notice.title}
                      </h2>
                      <div className="flex items-center text-slate-500 text-sm">
                        <CalendarDays className="w-4 h-4 mr-2" />
                        {notice.publishAt ? format(new Date(notice.publishAt), "MMMM d, yyyy") : "No date"}
                      </div>
                      <p className="text-slate-600 line-clamp-2">
                        {notice.body}
                      </p>
                    </div>
                    <div className="shrink-0">
                      <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-school-blue/10 transition-colors">
                        <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-school-blue transition-colors" />
                      </div>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
