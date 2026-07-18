import type { Metadata } from "next";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { PrincipalMessage } from "@/components/blocks/PrincipalMessage";
import { ImageSlideshow } from "@/components/blocks/ImageSlideshow";

export const metadata: Metadata = {
  title: "About Us | Paradise English School",
  description:
    "Learn about the history, vision, and mission of Paradise English School and Aariyan's Academy Trust.",
};

async function getSettings() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api"}/settings`,
      {
        cache: "no-store",
      },
    );
    if (!res.ok) return null;
    return res.json();
  } catch (error: any) {
    if (error?.digest === "DYNAMIC_SERVER_USAGE") throw error;
    console.error("Failed to fetch settings:", error);
    return null;
  }
}

export default async function AboutPage() {
  const settings = await getSettings();

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      {/* Hero Section */}
      <div className="bg-school-blue/10 py-16 md:py-24">
        <div className="container text-center">
          <h1 className="text-4xl md:text-5xl font-heading font-extrabold text-slate-900 mb-4">
            About Paradise English School
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Managed by Aariyan's Academy Trust, we are committed to providing
            holistic education that empowers young minds.
          </p>
        </div>
      </div>

      <PrincipalMessage
        name={settings?.principalName || ""}
        message={settings?.principalMessage || ""}
        image={settings?.principalImage || ""}
      />

      {/* Main Content */}
      <div className="container py-16 space-y-24">
        {/* Our Story */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <ScrollReveal delay={0.1}>
            <div className="space-y-6">
              <h2 className="text-3xl font-heading font-bold text-slate-900">
                Our Story
              </h2>
              <p className="text-slate-600 leading-relaxed text-lg">
                Paradise English School was established with a singular goal: to
                create a nurturing educational environment where children can
                thrive intellectually, emotionally, and socially. Over the
                years, we have grown into a cornerstone of the Bhiwandi
                community, educating thousands of bright young minds.
              </p>
              <p className="text-slate-600 leading-relaxed text-lg">
                Together with our foundational wing,{" "}
                <strong>Tender Kidz Pre-School</strong>, we offer a seamless
                educational journey from the very first days of preschool
                through primary and secondary education.
              </p>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.3}>
            {settings?.aboutImages && settings.aboutImages.length > 0 ? (
              <ImageSlideshow
                images={settings.aboutImages.map((url: string, i: number) => ({
                  id: `about-${i}`,
                  url,
                }))}
              />
            ) : (
              <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-video bg-slate-200">
                <div className="absolute inset-0 bg-gradient-to-tr from-school-blue/20 to-school-yellow/20" />
                <div className="w-full h-full flex items-center justify-center text-slate-400">
                  [Campus Image Placeholder]
                </div>
              </div>
            )}
          </ScrollReveal>
        </section>

        {/* Vision & Mission */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ScrollReveal delay={0.1}>
            <div className="bg-white p-8 md:p-10 rounded-3xl shadow-lg border border-slate-100 h-full">
              <div className="w-12 h-12 bg-school-yellow/20 rounded-full flex items-center justify-center mb-6">
                <span className="text-2xl">👁️</span>
              </div>
              <h3 className="text-2xl font-heading font-bold text-slate-900 mb-4">
                Our Vision
              </h3>
              <p className="text-slate-600 leading-relaxed">
                To be a center of excellence that shapes global citizens rooted
                in traditional values, equipped with modern knowledge, and
                driven by a sense of social responsibility.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="bg-white p-8 md:p-10 rounded-3xl shadow-lg border border-slate-100 h-full">
              <div className="w-12 h-12 bg-school-red/10 rounded-full flex items-center justify-center mb-6">
                <span className="text-2xl">🚀</span>
              </div>
              <h3 className="text-2xl font-heading font-bold text-slate-900 mb-4">
                Our Mission
              </h3>
              <p className="text-slate-600 leading-relaxed">
                We strive to foster a safe, inclusive, and stimulating learning
                environment. By combining innovative teaching methodologies with
                a strong emphasis on character building, we ensure every child
                reaches their maximum potential.
              </p>
            </div>
          </ScrollReveal>
        </section>

        {/* Aariyan's Academy Trust */}
        <section className="bg-slate-900 text-white rounded-3xl p-8 md:p-16 relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-school-blue rounded-full opacity-20 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-school-yellow rounded-full opacity-20 blur-3xl" />

          <ScrollReveal>
            <div className="relative z-10 max-w-3xl mx-auto text-center space-y-6">
              <h2 className="text-3xl font-heading font-bold">
                Managed by Aariyan's Academy Trust
              </h2>
              <p className="text-slate-300 leading-relaxed text-lg">
                Aariyan's Academy Trust is the driving force behind Paradise
                English School and Tender Kidz Pre-School. Founded by passionate
                educators and community leaders, the Trust is dedicated to
                elevating the standard of education in Maharashtra. Our
                leadership ensures that the school stays true to its motto:{" "}
                <em>"Join the Fun, Learn with Love."</em>
              </p>
            </div>
          </ScrollReveal>
        </section>

        {/* Key Features */}
        <section className="space-y-8">
          <ScrollReveal>
            <h2 className="text-3xl font-heading font-bold text-slate-900 text-center">
              Key Features
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <ScrollReveal
              delay={0.1}
              className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex gap-4"
            >
              <div className="text-3xl">👩‍🏫</div>
              <div>
                <h3 className="font-bold text-slate-900 mb-2">
                  Experienced Faculty
                </h3>
                <p className="text-slate-600">
                  Highly qualified and trained teachers dedicated to nurturing
                  each child's potential.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal
              delay={0.2}
              className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex gap-4"
            >
              <div className="text-3xl">📚</div>
              <div>
                <h3 className="font-bold text-slate-900 mb-2">
                  Well-rounded Curriculum
                </h3>
                <p className="text-slate-600">
                  A balanced approach integrating academics, arts, and physical
                  education.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal
              delay={0.3}
              className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex gap-4"
            >
              <div className="text-3xl">💻</div>
              <div>
                <h3 className="font-bold text-slate-900 mb-2">
                  Technology Integration
                </h3>
                <p className="text-slate-600">
                  Smart classes, computer labs, and interactive whiteboards for
                  modern learning.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal
              delay={0.4}
              className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex gap-4"
            >
              <div className="text-3xl">🛡️</div>
              <div>
                <h3 className="font-bold text-slate-900 mb-2">
                  Safety & Security
                </h3>
                <p className="text-slate-600">
                  24/7 CCTV surveillance, secured boundaries, and trained
                  security personnel.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Academic Programs */}
        <section className="bg-slate-50 py-12 rounded-3xl border border-slate-100 px-6 md:px-12">
          <ScrollReveal>
            <h2 className="text-3xl font-heading font-bold text-slate-900 text-center mb-12">
              Academic Structure
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <ScrollReveal delay={0.1} className="space-y-4">
              <h3 className="text-2xl font-bold text-school-yellow">
                Tender Kidz Pre-School
              </h3>
              <p className="text-slate-600">
                Our early childhood program is designed to foster curiosity and
                foundational skills through play-based learning.
              </p>
              <ul className="space-y-2 text-slate-700 font-medium">
                <li>• Playgroup (Ages 2-3)</li>
                <li>• Nursery (Ages 3-4)</li>
                <li>• Junior KG (Ages 4-5)</li>
                <li>• Senior KG (Ages 5-6)</li>
              </ul>
            </ScrollReveal>
            <ScrollReveal delay={0.2} className="space-y-4">
              <h3 className="text-2xl font-bold text-school-blue">
                Paradise English School
              </h3>
              <p className="text-slate-600">
                Our primary education framework builds on early concepts,
                introducing structured learning in core subjects while
                maintaining a focus on holistic development.
              </p>
              <ul className="space-y-2 text-slate-700 font-medium">
                <li>• Lower Primary (Grades 1-2)</li>
                <li>• Upper Primary (Grades 3-5)</li>
                <li>• Secondary (Grades 6+)</li>
              </ul>
            </ScrollReveal>
          </div>
        </section>

        {/* Parent Involvement */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <ScrollReveal>
            {settings?.parentInvolvementImage ? (
              <div className="relative aspect-square rounded-3xl overflow-hidden shadow-xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={settings.parentInvolvementImage}
                  alt="Parent Involvement"
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="relative aspect-square rounded-3xl overflow-hidden bg-slate-200">
                <div className="absolute inset-0 bg-school-yellow/10"></div>
                <div className="w-full h-full flex items-center justify-center text-slate-400">
                  [PTM Image Placeholder]
                </div>
              </div>
            )}
          </ScrollReveal>
          <ScrollReveal delay={0.2} className="space-y-6">
            <h2 className="text-3xl font-heading font-bold text-slate-900">
              Parent Involvement
            </h2>
            <p className="text-slate-600 leading-relaxed text-lg">
              Education is a partnership. We encourage active parent
              participation through regular Parent-Teacher Meetings, volunteer
              programs, and family events. We believe that when parents and
              teachers work together, students achieve their highest potential.
            </p>
          </ScrollReveal>
        </section>
      </div>
    </div>
  );
}
