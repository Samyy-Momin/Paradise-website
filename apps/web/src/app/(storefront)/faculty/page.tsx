import type { Metadata } from "next";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { UserRound } from "lucide-react";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Our Faculty | Paradise English School",
  description:
    "Meet the dedicated, experienced, and passionate educators at Paradise English School and Tender Kidz Pre-School.",
};

export const revalidate = 60; // revalidate every 60 seconds

async function getFaculty() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api"}/faculty`,
      {
        cache: "no-store",
      },
    );
    if (!res.ok) return [];
    return res.json();
  } catch (error: any) {
    if (error?.digest === "DYNAMIC_SERVER_USAGE") throw error;
    console.error("Failed to fetch faculty:", error);
    return [];
  }
}

export default async function FacultyPage() {
  const faculty = await getFaculty();

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      {/* Hero Section */}
      <div className="bg-school-red/10 py-16 md:py-24">
        <div className="container text-center">
          <h1 className="text-4xl md:text-5xl font-heading font-extrabold text-slate-900 mb-4">
            Our Educators
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            The heart of our school. Meet the passionate individuals who
            dedicate their lives to shaping the future of your children.
          </p>
        </div>
      </div>

      <div className="container py-16 md:py-24">
        {faculty.length === 0 ? (
          <div className="text-center text-slate-500 py-12">
            No faculty members listed yet. Check back soon!
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {faculty.map((member: any, idx: number) => (
              <ScrollReveal key={member.id} delay={idx * 0.05}>
                <div className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow border border-slate-100 group">
                  <div className="aspect-[4/5] bg-slate-200 relative overflow-hidden flex items-center justify-center text-slate-400">
                    {member.photoUrl ? (
                      <Image
                        src={member.photoUrl}
                        alt={member.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        unoptimized
                      />
                    ) : (
                      <UserRound className="w-16 h-16 opacity-50" />
                    )}
                  </div>
                  <div className="p-6 text-center">
                    <h3 className="text-xl font-heading font-bold text-slate-900 mb-1">
                      {member.name}
                    </h3>
                    <p className="text-school-red font-medium text-sm mb-3">
                      {member.subjectOrGrade}
                    </p>
                    <p className="text-slate-500 text-sm border-t border-slate-100 pt-3">
                      {member.qualification}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
