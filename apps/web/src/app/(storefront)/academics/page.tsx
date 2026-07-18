import type { Metadata } from "next";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { BookOpen, Puzzle, GraduationCap, Microscope } from "lucide-react";

export const metadata: Metadata = {
  title: "Academics & Curriculum | Paradise English School",
  description:
    "Explore our comprehensive curriculum across Tender Kidz Pre-School and Paradise English School.",
};

export default function AcademicsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      {/* Hero Section */}
      <div className="bg-school-yellow/20 py-16 md:py-24">
        <div className="container text-center">
          <h1 className="text-4xl md:text-5xl font-heading font-extrabold text-slate-900 mb-4">
            Academic Excellence
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            A curriculum designed to inspire curiosity, foster critical
            thinking, and build a strong foundation for lifelong learning.
          </p>
        </div>
      </div>

      <div className="container py-16 space-y-24">
        {/* Structure Section */}
        <section className="space-y-12">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl font-heading font-bold text-slate-900 mb-4">
                Our Grade Structure
              </h2>
              <p className="text-slate-600 text-lg">
                We provide a continuous, seamless educational journey divided
                into two dedicated phases to cater to the unique developmental
                needs of every age group.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ScrollReveal delay={0.1}>
              <div className="bg-white rounded-3xl p-8 border-t-8 border-t-school-red shadow-lg h-full transition-transform hover:-translate-y-1">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="bg-school-red/10 p-3 rounded-full text-school-red">
                    <Puzzle className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-heading font-bold">
                    Tender Kidz Pre-School
                  </h3>
                </div>
                <ul className="space-y-4 text-slate-600">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-school-red rounded-full mr-3" />
                    <strong>Playgroup:</strong> Ages 2 - 3
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-school-red rounded-full mr-3" />
                    <strong>Nursery:</strong> Ages 3 - 4
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-school-red rounded-full mr-3" />
                    <strong>Junior KG:</strong> Ages 4 - 5
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-school-red rounded-full mr-3" />
                    <strong>Senior KG:</strong> Ages 5 - 6
                  </li>
                </ul>
                <p className="mt-6 text-sm text-slate-500 italic">
                  Focuses on sensory development, play-way learning, and motor
                  skills in a deeply nurturing environment.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="bg-white rounded-3xl p-8 border-t-8 border-t-school-blue shadow-lg h-full transition-transform hover:-translate-y-1">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="bg-school-blue/10 p-3 rounded-full text-school-blue">
                    <GraduationCap className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-heading font-bold">
                    Paradise English School
                  </h3>
                </div>
                <ul className="space-y-4 text-slate-600">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-school-blue rounded-full mr-3" />
                    <strong>Primary Section:</strong> Grades I to IV
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-school-blue rounded-full mr-3" />
                    <strong>Secondary Section:</strong> Grades V to X
                  </li>
                </ul>
                <p className="mt-6 text-sm text-slate-500 italic">
                  English medium instruction focusing on comprehensive academic
                  rigour, sciences, arts, and character building.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Methodology */}
        <section className="bg-school-blue text-white rounded-3xl p-8 md:p-16">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl font-heading font-bold mb-4">
                Teaching Methodology
              </h2>
              <p className="text-blue-100 text-lg">
                Education goes beyond textbooks. We integrate modern technology
                and experiential learning into daily lessons.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              <div className="bg-white/10 p-6 rounded-2xl backdrop-blur-sm border border-white/20">
                <Microscope className="w-10 h-10 mb-4 text-school-yellow" />
                <h4 className="font-heading font-bold text-xl mb-2">
                  Experiential Learning
                </h4>
                <p className="text-blue-100 text-sm">
                  Learning by doing. Practical experiments and real-world
                  projects over rote memorization.
                </p>
              </div>
              <div className="bg-white/10 p-6 rounded-2xl backdrop-blur-sm border border-white/20">
                <BookOpen className="w-10 h-10 mb-4 text-school-yellow" />
                <h4 className="font-heading font-bold text-xl mb-2">
                  Smart Classrooms
                </h4>
                <p className="text-blue-100 text-sm">
                  Interactive digital boards and multimedia resources to make
                  complex concepts visually clear.
                </p>
              </div>
              <div className="bg-white/10 p-6 rounded-2xl backdrop-blur-sm border border-white/20">
                <Puzzle className="w-10 h-10 mb-4 text-school-yellow" />
                <h4 className="font-heading font-bold text-xl mb-2">
                  Holistic Assessment
                </h4>
                <p className="text-blue-100 text-sm">
                  Continuous evaluation mapping cognitive, emotional, and social
                  development.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </section>
      </div>
    </div>
  );
}
