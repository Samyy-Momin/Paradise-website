import type { Metadata } from "next";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import {
  Book,
  MonitorPlay,
  Bus,
  ShieldCheck,
  Gamepad2,
  FlaskConical,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Campus Facilities | Paradise English School",
  description:
    "Discover the state-of-the-art facilities at Paradise English School ensuring a safe and enriching learning environment.",
};

const facilities = [
  {
    icon: <MonitorPlay className="w-10 h-10 text-school-blue" />,
    title: "Smart Classrooms",
    description:
      "Digitally equipped classrooms with interactive boards to make learning visual, engaging, and highly effective.",
  },
  {
    icon: <Gamepad2 className="w-10 h-10 text-school-red" />,
    title: "Play Area & Sports",
    description:
      "Dedicated safe zones for pre-schoolers and sports grounds for primary/secondary students to foster physical health.",
  },
  {
    icon: <ShieldCheck className="w-10 h-10 text-school-yellow" />,
    title: "Safety & Security",
    description:
      "24/7 CCTV surveillance and restricted campus access to ensure maximum safety for all our students.",
  },
  {
    icon: <Book className="w-10 h-10 text-school-blue" />,
    title: "Library",
    description:
      "A well-stocked library filled with age-appropriate books, encyclopedias, and digital resources to build reading habits.",
  },
  {
    icon: <FlaskConical className="w-10 h-10 text-school-red" />,
    title: "Science & Computer Labs",
    description:
      "Modern laboratories allowing students to practically apply theoretical concepts in science and technology.",
  },
  {
    icon: <Bus className="w-10 h-10 text-school-yellow" />,
    title: "Transport Facility",
    description:
      "Safe, reliable, and supervised transport covering key routes across Bhiwandi for easy daily commutes.",
  },
];

export default function FacilitiesPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-school-blue/10 py-16 md:py-24">
        <div className="container text-center">
          <h1 className="text-4xl md:text-5xl font-heading font-extrabold text-slate-900 mb-4">
            Campus Facilities
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            A safe, modern, and stimulating campus designed to support our
            students in every aspect of their holistic growth.
          </p>
        </div>
      </div>

      <div className="container py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {facilities.map((fac, idx) => (
            <ScrollReveal key={idx} delay={idx * 0.1}>
              <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-shadow h-full flex flex-col items-center text-center group">
                <div className="bg-white w-20 h-20 rounded-full flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform duration-300">
                  {fac.icon}
                </div>
                <h3 className="text-xl font-heading font-bold text-slate-900 mb-3">
                  {fac.title}
                </h3>
                <p className="text-slate-600">{fac.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  );
}
