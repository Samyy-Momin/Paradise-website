import type { Metadata } from "next";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { Palette, Music, Puzzle, HeartHandshake } from "lucide-react";

export const metadata: Metadata = {
  title: "Tender Kidz Pre-School in Bhiwandi | Top Nursery & KG",
  description:
    "Tender Kidz Pre-School in Narpoli Gaon, Bhiwandi. Offering Playgroup, Nursery, Junior KG, and Senior KG with modern play-way learning methods.",
};

export default function TenderKidzPage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      {/* Hero Section */}
      <div className="bg-school-red/10 py-16 md:py-24 relative overflow-hidden">
        {/* Playful background blobs */}
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-school-yellow rounded-full mix-blend-multiply filter blur-2xl opacity-40 animate-blob" />
        <div className="absolute top-0 -right-10 w-40 h-40 bg-school-blue rounded-full mix-blend-multiply filter blur-2xl opacity-40 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-10 left-20 w-40 h-40 bg-school-red rounded-full mix-blend-multiply filter blur-2xl opacity-40 animate-blob animation-delay-4000" />

        <div className="container relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left space-y-6">
            <h1 className="text-4xl md:text-6xl font-heading font-extrabold text-slate-900 leading-tight">
              Welcome to{" "}
              <span className="text-school-red block mt-2">Tender Kidz</span>{" "}
              Pre-School
            </h1>
            <p className="text-lg text-slate-600 max-w-lg mx-auto lg:mx-0">
              The top-rated pre-school in Bhiwandi. We provide a magical, safe,
              and stimulating environment where your child's early years are
              filled with joy, discovery, and growth.
            </p>
          </div>
          <div className="bg-white p-8 rounded-3xl shadow-xl border-4 border-school-yellow">
            <h3 className="text-2xl font-heading font-bold text-center mb-6">
              Pre-School Enquiry
            </h3>
            {/* The Enquiry form component will automatically pick the Tender Kidz branch if user interacts with it normally, though we don't have a default prop for it right now. It's fine for now, they can select the radio button. */}
            <EnquiryForm />
          </div>
        </div>
      </div>

      <div className="container py-16 md:py-24 space-y-24">
        {/* Programs */}
        <section className="space-y-12">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl font-heading font-bold text-slate-900 mb-4">
                Our Programs
              </h2>
              <p className="text-slate-600 text-lg">
                Carefully crafted curriculums tailored to the specific
                developmental milestones of early childhood.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Playgroup",
                age: "2 - 3 Years",
                color: "bg-school-red",
              },
              {
                title: "Nursery",
                age: "3 - 4 Years",
                color: "bg-school-yellow text-slate-900",
              },
              {
                title: "Junior KG",
                age: "4 - 5 Years",
                color: "bg-school-blue",
              },
              {
                title: "Senior KG",
                age: "5 - 6 Years",
                color: "bg-school-orange text-white",
              },
            ].map((prog, i) => (
              <ScrollReveal key={prog.title} delay={i * 0.1}>
                <div
                  className={`${prog.color} ${prog.color.includes("text-slate-900") ? "" : "text-white"} p-8 rounded-3xl text-center shadow-lg transform hover:-translate-y-2 transition-transform`}
                >
                  <h3 className="text-2xl font-heading font-bold mb-2">
                    {prog.title}
                  </h3>
                  <p className="font-medium opacity-90">{prog.age}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* Why Tender Kidz */}
        <section className="bg-white rounded-3xl p-8 md:p-16 border border-slate-100 shadow-sm">
          <ScrollReveal>
            <h2 className="text-3xl font-heading font-bold text-slate-900 mb-12 text-center">
              Why Tender Kidz?
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <ScrollReveal delay={0.1}>
              <div className="flex items-start space-x-4">
                <div className="bg-school-red/10 p-4 rounded-2xl shrink-0">
                  <Palette className="w-8 h-8 text-school-red" />
                </div>
                <div>
                  <h4 className="text-xl font-heading font-bold mb-2">
                    Play-way Methodology
                  </h4>
                  <p className="text-slate-600">
                    Learning through arts, crafts, and imaginative play,
                    ensuring children stay engaged and excited to learn every
                    day.
                  </p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="flex items-start space-x-4">
                <div className="bg-school-blue/10 p-4 rounded-2xl shrink-0">
                  <HeartHandshake className="w-8 h-8 text-school-blue" />
                </div>
                <div>
                  <h4 className="text-xl font-heading font-bold mb-2">
                    Nurturing Educators
                  </h4>
                  <p className="text-slate-600">
                    Our teachers are specially trained in early childhood care,
                    providing a motherly touch that makes kids feel right at
                    home.
                  </p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <div className="flex items-start space-x-4">
                <div className="bg-school-yellow/20 p-4 rounded-2xl shrink-0">
                  <Music className="w-8 h-8 text-yellow-600" />
                </div>
                <div>
                  <h4 className="text-xl font-heading font-bold mb-2">
                    Music & Movement
                  </h4>
                  <p className="text-slate-600">
                    Integrating rhymes, music, and physical activities to
                    develop motor skills and rhythm from an early age.
                  </p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.4}>
              <div className="flex items-start space-x-4">
                <div className="bg-slate-100 p-4 rounded-2xl shrink-0">
                  <Puzzle className="w-8 h-8 text-slate-700" />
                </div>
                <div>
                  <h4 className="text-xl font-heading font-bold mb-2">
                    Sensory Development
                  </h4>
                  <p className="text-slate-600">
                    Equipped with specialized toys and sensory areas that
                    stimulate cognitive growth and spatial awareness.
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </div>
    </div>
  );
}
