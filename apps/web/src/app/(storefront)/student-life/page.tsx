import type { Metadata } from "next";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { ImageSlideshow } from "@/components/blocks/ImageSlideshow";
import { Clock, ShieldCheck, Heart, Users } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";

export const metadata: Metadata = {
  title: "Student Life | Paradise English School",
  description: "Discover a day in the life of our students. Explore our extracurricular activities, events, and focus on student well-being.",
};

async function getSettings() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api"}/settings`, { cache: "no-store" });
    if (!res.ok) return null;
    return res.json();
  } catch (error: any) { if (error?.digest === 'DYNAMIC_SERVER_USAGE') throw error;
    return null;
  }
}

async function getGalleryData() {
  try {
    const [itemsRes, catsRes] = await Promise.all([
      fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api"}/gallery`, { cache: "no-store" }),
      fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api"}/gallery-categories`, { cache: "no-store" })
    ]);
    const items = itemsRes.ok ? await itemsRes.json() : [];
    const categories = catsRes.ok ? await catsRes.json() : [];
    return { items, categories };
  } catch (error: any) { if (error?.digest === 'DYNAMIC_SERVER_USAGE') throw error;
    return { items: [], categories: [] };
  }
}

async function getNotices() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api"}/notices`, { cache: "no-store" });
    if (!res.ok) return [];
    const data = await res.json();
    return data.data || [];
  } catch (error: any) { if (error?.digest === 'DYNAMIC_SERVER_USAGE') throw error;
    return [];
  }
}

export default async function StudentLifePage() {
  const settings = await getSettings();
  const { items: galleryItems, categories } = await getGalleryData();
  const notices = await getNotices();

  // Get categories for activities and events
  const activitiesCat = categories.find((c: any) => c.slug.toLowerCase().includes("activities") || c.name.toLowerCase().includes("activities"));
  const eventsCat = categories.find((c: any) => c.slug.toLowerCase().includes("events") || c.name.toLowerCase().includes("events"));

  const activityImages = activitiesCat ? galleryItems.filter((i: any) => i.categoryId === activitiesCat.id) : [];
  const eventImages = eventsCat ? galleryItems.filter((i: any) => i.categoryId === eventsCat.id) : [];
  
  // Also get some general campus images for the intro if needed
  const campusCat = categories.find((c: any) => c.slug.toLowerCase().includes("campus") || c.name.toLowerCase().includes("campus"));
  const campusImages = campusCat ? galleryItems.filter((i: any) => i.categoryId === campusCat.id) : [];

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      {/* Hero Section */}
      <div className="bg-school-blue/10 py-16 md:py-24">
        <div className="container text-center">
          <h1 className="text-4xl md:text-5xl font-heading font-extrabold text-slate-900 mb-4">
            Student Life
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            A vibrant, safe, and engaging environment where every child discovers their passions.
          </p>
        </div>
      </div>

      <div className="container py-16 space-y-24">
        
        {/* Day in the Life Narrative */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <ScrollReveal>
            <div className="space-y-6">
              <h2 className="text-3xl font-heading font-bold text-slate-900 flex items-center gap-3">
                <Clock className="text-school-blue w-8 h-8" />
                A Day in the Life
              </h2>
              <p className="text-slate-600 leading-relaxed text-lg">
                From the moment students walk through our gates, they are greeted by a nurturing atmosphere designed to inspire curiosity. A typical day balances rigorous academics with creative play, collaborative projects, and physical activities.
              </p>
              <p className="text-slate-600 leading-relaxed text-lg">
                Whether it's engaging in interactive classroom discussions, exploring the library, or participating in hands-on science experiments, every moment at Paradise English School is an opportunity to grow.
              </p>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <ImageSlideshow images={campusImages.length > 0 ? campusImages : galleryItems.slice(0, 5)} />
          </ScrollReveal>
        </section>

        {/* Extracurricular Activities */}
        <section>
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl font-heading font-bold text-slate-900 mb-4">
                Extracurricular Activities
              </h2>
              <p className="text-slate-600 text-lg">
                Education goes beyond textbooks. Our diverse extracurricular programs help students develop new skills, build confidence, and discover lifelong interests.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mt-12">
            <ScrollReveal delay={0.1} className="order-2 lg:order-1 h-full min-h-[400px] relative">
              {settings?.extracurricularImage ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img 
                  src={settings.extracurricularImage} 
                  alt="Extracurricular Activities" 
                  className="w-full h-full object-cover rounded-3xl shadow-sm border border-slate-200 absolute inset-0"
                />
              ) : (
                <ImageSlideshow images={activityImages} />
              )}
            </ScrollReveal>
            <ScrollReveal delay={0.2} className="order-1 lg:order-2 space-y-6">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex gap-4">
                <div className="bg-school-yellow/20 p-3 rounded-full h-fit">🎨</div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Arts & Crafts</h3>
                  <p className="text-slate-600">Encouraging creativity and self-expression through various artistic mediums and collaborative projects.</p>
                </div>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex gap-4">
                <div className="bg-school-red/10 p-3 rounded-full h-fit">⚽</div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Sports & Physical Ed</h3>
                  <p className="text-slate-600">Building teamwork, discipline, and physical fitness through structured sports programs and free play.</p>
                </div>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex gap-4">
                <div className="bg-school-blue/10 p-3 rounded-full h-fit">🎵</div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Music & Performance</h3>
                  <p className="text-slate-600">Fostering confidence and rhythm through musical activities, choir, and annual stage performances.</p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Events Highlights */}
        <section className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-200">
          <ScrollReveal>
            <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-10">
              <div className="max-w-2xl">
                <h2 className="text-3xl font-heading font-bold text-slate-900 mb-4">
                  Events & Highlights
                </h2>
                <p className="text-slate-600 text-lg">
                  We regularly host events that bring our community together and celebrate student achievements.
                </p>
              </div>
              <Link href="/notices" className="text-school-blue font-medium hover:underline whitespace-nowrap">
                View All Notices →
              </Link>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Event Slideshow or Image */}
            <ScrollReveal className="lg:col-span-2 h-full min-h-[400px] relative">
              {settings?.eventsImage ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img 
                  src={settings.eventsImage} 
                  alt="Events and Highlights" 
                  className="w-full h-full object-cover rounded-3xl shadow-sm border border-slate-200 absolute inset-0"
                />
              ) : (
                <ImageSlideshow images={eventImages} />
              )}
            </ScrollReveal>

            {/* Recent Notices */}
            <ScrollReveal delay={0.2} className="flex flex-col gap-4">
              <h3 className="font-bold text-slate-900 uppercase tracking-wider text-sm mb-2">Recent Announcements</h3>
              {notices.slice(0, 3).map((notice: any) => (
                <Link key={notice.id} href={`/notices/${notice.slug}`} className="block group">
                  <div className="p-5 rounded-xl border border-slate-100 bg-slate-50 hover:bg-school-blue/5 hover:border-school-blue/20 transition-all">
                    <p className="text-xs text-school-red font-medium mb-2">
                      {format(new Date(notice.publishAt || notice.createdAt), "MMMM d, yyyy")}
                    </p>
                    <h4 className="font-bold text-slate-900 group-hover:text-school-blue line-clamp-2">
                      {notice.title}
                    </h4>
                  </div>
                </Link>
              ))}
              {notices.length === 0 && (
                <div className="text-slate-500 italic p-4 bg-slate-50 rounded-xl">No recent events found.</div>
              )}
            </ScrollReveal>
          </div>
        </section>

        {/* Safety, Well-being & Hours */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ScrollReveal>
            <div className="bg-school-blue text-white rounded-3xl p-8 md:p-10 h-full relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <ShieldCheck className="w-32 h-32" />
              </div>
              <div className="relative z-10">
                <h2 className="text-2xl font-heading font-bold mb-6 flex items-center gap-3">
                  <Heart className="w-6 h-6 text-school-yellow" />
                  Safety & Well-being
                </h2>
                <p className="text-blue-50 leading-relaxed mb-6">
                  The safety, security, and emotional well-being of our students is our absolute top priority. Our campus is fully secured with monitored access, and our staff are trained to provide a supportive, inclusive environment.
                </p>
                <ul className="space-y-3 text-blue-100">
                  <li className="flex items-center gap-3">
                    <span className="bg-white/20 p-1 rounded-full"><Users className="w-4 h-4" /></span>
                    Dedicated counseling and pastoral care
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="bg-white/20 p-1 rounded-full"><ShieldCheck className="w-4 h-4" /></span>
                    Secure campus with restricted entry
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="bg-white/20 p-1 rounded-full"><Heart className="w-4 h-4" /></span>
                    Strict anti-bullying policies
                  </li>
                </ul>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="bg-slate-900 text-white rounded-3xl p-8 md:p-10 h-full relative overflow-hidden flex flex-col justify-center">
              <div className="absolute bottom-0 right-0 p-8 opacity-10">
                <Clock className="w-32 h-32" />
              </div>
              <div className="relative z-10">
                <h2 className="text-2xl font-heading font-bold mb-6">Hours of Operation</h2>
                <div className="space-y-4">
                  <p className="text-slate-300 leading-relaxed">
                    The establishment is functional during the following hours:
                  </p>
                  
                  {settings?.hours ? (
                    <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700">
                      <p className="whitespace-pre-line text-lg font-medium text-white font-mono">
                        {settings.hours}
                      </p>
                    </div>
                  ) : (
                    <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700 space-y-2">
                      <div className="flex justify-between border-b border-slate-700 pb-2">
                        <span className="text-slate-400">Monday - Saturday</span>
                        <span className="font-medium text-white">10:00 Am - 5:00 Pm</span>
                      </div>
                      <div className="flex justify-between pt-2">
                        <span className="text-slate-400">Sunday</span>
                        <span className="font-medium text-school-red">Closed</span>
                      </div>
                    </div>
                  )}
                  
                  <div className="pt-4 flex gap-4">
                    <Link href="/contact" className="inline-block bg-school-yellow text-slate-900 px-6 py-2 rounded-full font-bold hover:bg-school-yellow/90 transition-colors">
                      Contact Us
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* Gallery Preview Section */}
        <section className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-200">
          <div className="flex justify-between items-end mb-8">
            <h2 className="text-3xl font-heading font-bold text-slate-900">
              Campus Gallery
            </h2>
            <Link href="/gallery" className="text-school-blue font-medium hover:underline">
              View Full Gallery →
            </Link>
          </div>
          
          {galleryItems.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {galleryItems.slice(0, 4).map((item: any) => (
                <div key={item.id} className="relative aspect-square rounded-2xl overflow-hidden group">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.url}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    <p className="text-white font-medium text-sm truncate">{item.title}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-slate-500">
              No photos available in the gallery.
            </div>
          )}
        </section>

      </div>
    </div>
  );
}
