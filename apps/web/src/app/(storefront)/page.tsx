import Link from "next/link";
import Image from "next/image";
import { ShieldCheck, Wifi, Music } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Section } from "@/components/layout/Section";
import { PrincipalMessage } from "@/components/blocks/PrincipalMessage";
import { FAQSection } from "@/components/blocks/FAQSection";
import { ImageSlideshow } from "@/components/blocks/ImageSlideshow";
import { InstagramReelsCarousel } from "@/components/blocks/InstagramReelsCarousel";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const dynamic = "force-dynamic";

async function getNotices() {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";
    const res = await fetch(`${apiUrl}/notices?limit=3`, { cache: "no-store" });
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data) ? data : (data.data || []);
  } catch (error: any) { if (error?.digest === 'DYNAMIC_SERVER_USAGE') throw error;
    return [];
  }
}

async function getTestimonials() {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";
    const res = await fetch(`${apiUrl}/testimonials`, { cache: "no-store" });
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data) ? data : (data.data || []);
  } catch (error: any) { if (error?.digest === 'DYNAMIC_SERVER_USAGE') throw error;
    return [];
  }
}

async function getSettings() {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";
    const res = await fetch(`${apiUrl}/settings`, { cache: "no-store" });
    if (!res.ok) return null;
    return await res.json();
  } catch (error: any) { if (error?.digest === 'DYNAMIC_SERVER_USAGE') throw error;
    return null;
  }
}

async function getFaqs() {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";
    const res = await fetch(`${apiUrl}/faq`, { cache: "no-store" });
    if (!res.ok) return [];
    return await res.json();
  } catch (error: any) { if (error?.digest === 'DYNAMIC_SERVER_USAGE') throw error;
    return [];
  }
}

async function getGalleryItems() {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";
    const res = await fetch(`${apiUrl}/gallery?limit=6`, { cache: "no-store" });
    if (!res.ok) {
      console.error("Gallery fetch failed with status:", res.status);
      return [];
    }
    const data = await res.json();
    return Array.isArray(data) ? data : (data.data || []);
  } catch (error: any) { if (error?.digest === 'DYNAMIC_SERVER_USAGE') throw error;
    console.error("Error fetching gallery items:", error);
    return [];
  }
}

export default async function Home() {
  const notices = await getNotices();
  const testimonials = await getTestimonials();
  const settings = await getSettings();
  const faqs = await getFaqs();
  const galleryItems = await getGalleryItems();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Top Banner - Marquee Effect */}
      <div className="bg-school-yellow overflow-hidden py-2 relative flex items-center justify-center">
        <div className="animate-[marquee_20s_linear_infinite] whitespace-nowrap text-school-black font-semibold text-xs sm:text-sm md:text-base px-4">
          {settings?.marqueeText || "Admissions Open 2026-27 | Free School Books & Bags 🎒"} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {settings?.marqueeText || "Admissions Open 2026-27 | Free School Books & Bags 🎒"}
        </div>
      </div>

      {/* Hero Section */}
      <Section className="relative overflow-hidden bg-white pt-16 md:pt-24 lg:pt-32">
        <div className="container relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <ScrollReveal delay={0.1}>
            <div className="flex flex-col space-y-6 max-w-xl">
              <h1 className="font-heading font-extrabold tracking-tight text-slate-900">
                Join the Fun, <span className="text-school-blue">Learn with Love</span>
              </h1>
              <p className="text-lg md:text-xl text-slate-600 font-sans">
                Where every child's potential is nurtured with care, creativity, and a structured curriculum designed for the future.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link
                  href="/admissions"
                  className="inline-flex w-full sm:w-auto h-12 items-center justify-center rounded-full bg-school-red px-8 font-bold text-white shadow-lg transition-transform hover:scale-105 hover:bg-school-red/90"
                >
                  Enquire Now
                </Link>
                <Link
                  href="/gallery"
                  className="inline-flex w-full sm:w-auto h-12 items-center justify-center rounded-full border-2 border-slate-200 bg-white px-8 font-bold text-slate-700 shadow-sm transition-colors hover:bg-slate-50 hover:text-slate-900"
                >
                  View Gallery
                </Link>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <div className="relative mx-auto aspect-video w-full max-w-lg lg:max-w-none lg:w-[600px] rounded-3xl border-4 border-school-red shadow-2xl overflow-hidden">
              {settings?.heroImages && settings.heroImages.length > 0 ? (
                <ImageSlideshow 
                  images={settings.heroImages.map((url: string, i: number) => ({ id: `hero-${i}`, url }))} 
                  className="w-full h-full"
                  hideDots={true}
                  priority={true}
                />
              ) : (
                <div className="w-full h-full relative">
                  <Image
                    src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800&auto=format&fit=crop"
                    alt="Happy students learning"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority={true}
                    className="object-cover"
                  />
                </div>
              )}
            </div>
          </ScrollReveal>
        </div>
        
        {/* Subtle decorative background shapes */}
        <div className="absolute top-1/4 right-0 -mr-32 w-64 h-64 rounded-full bg-school-yellow/10 blur-3xl -z-10" />
        <div className="absolute bottom-0 left-0 -ml-32 w-80 h-80 rounded-full bg-school-blue/10 blur-3xl -z-10" />
      </Section>

      {/* Instagram Reels Section */}
      <InstagramReelsCarousel reels={settings?.instagramReels || []} />

      {/* Feature Grid (Why Us) */}
      <Section className="bg-slate-50">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-slate-900 mb-4">Why Choose Us?</h2>
            <div className="h-1 w-20 bg-school-yellow mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <ScrollReveal delay={0.1}>
              <Card className="border-none shadow-md hover:shadow-xl transition-shadow bg-white text-center h-full">
                <CardHeader>
                  <div className="mx-auto w-16 h-16 rounded-2xl bg-school-red/10 flex items-center justify-center mb-4">
                    <Music className="w-8 h-8 text-school-red" />
                  </div>
                  <CardTitle className="font-heading text-xl">Holistic Growth</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600">
                    We focus on extracurriculars like Karate, Music, and Arts alongside academics to nurture a well-rounded personality.
                  </p>
                </CardContent>
              </Card>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <Card className="border-none shadow-md hover:shadow-xl transition-shadow bg-white text-center h-full">
                <CardHeader>
                  <div className="mx-auto w-16 h-16 rounded-2xl bg-school-blue/10 flex items-center justify-center mb-4">
                    <Wifi className="w-8 h-8 text-school-blue" />
                  </div>
                  <CardTitle className="font-heading text-xl">Smart Learning</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600">
                    Equipped with modern computer labs and interactive digital whiteboards to make learning engaging and future-ready.
                  </p>
                </CardContent>
              </Card>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <Card className="border-none shadow-md hover:shadow-xl transition-shadow bg-white text-center h-full">
                <CardHeader>
                  <div className="mx-auto w-16 h-16 rounded-2xl bg-school-yellow/20 flex items-center justify-center mb-4">
                    <ShieldCheck className="w-8 h-8 text-school-orange" />
                  </div>
                  <CardTitle className="font-heading text-xl">Safety First</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600">
                    24/7 CCTV surveillance and secure campus boundaries ensuring your child's complete safety at all times.
                  </p>
                </CardContent>
              </Card>
            </ScrollReveal>
          </div>
        </div>
      </Section>

      {/* About Snapshot */}
      <Section className="bg-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal delay={0.1}>
              <div className="relative aspect-video rounded-3xl overflow-hidden bg-slate-100 shadow-xl">
                {settings?.aboutImages && settings.aboutImages.length > 0 ? (
                  <ImageSlideshow images={settings.aboutImages.map((url: string, i: number) => ({ id: `about-${i}`, url }))} />
                ) : (
                  <Image
                    src="https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=800&auto=format&fit=crop"
                    alt="School Campus"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                )}
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <div className="space-y-6">
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-slate-900">
                  Welcome to <span className="text-school-red">Paradise</span>
                </h2>
                <div className="h-1 w-20 bg-school-blue rounded-full" />
                <p className="text-lg text-slate-600 leading-relaxed">
                  Established with a singular goal to create a nurturing educational environment, Paradise English School and Tender Kidz Pre-School empower young minds to thrive intellectually, emotionally, and socially.
                </p>
                <Link
                  href="/about"
                  className="inline-flex h-12 items-center justify-center rounded-full bg-slate-900 px-8 font-bold text-white shadow-md transition-colors hover:bg-slate-800"
                >
                  More About Us &rarr;
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </Section>

      {/* Academic Programs */}
      <Section className="bg-slate-50">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-slate-900 mb-4">Academic Programs</h2>
            <div className="h-1 w-20 bg-school-yellow mx-auto rounded-full" />
            <p className="mt-6 text-lg text-slate-600">A seamless educational journey from the very first days of preschool through primary education.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <ScrollReveal delay={0.1}>
              <Link href="/tender-kidz" className="block group h-full">
                <div className="bg-white rounded-3xl p-8 border-2 border-transparent group-hover:border-school-yellow transition-all shadow-md group-hover:shadow-xl h-full flex flex-col">
                  <div className="w-16 h-16 bg-school-yellow/20 rounded-2xl flex items-center justify-center mb-6 text-3xl">🧸</div>
                  <h3 className="text-2xl font-heading font-bold text-slate-900 mb-4 group-hover:text-school-yellow transition-colors">Tender Kidz Pre-School</h3>
                  <p className="text-slate-600 mb-6 flex-1">Playgroup, Nursery, and Kindergarten. A vibrant, play-based environment focusing on early childhood development and foundational learning.</p>
                  <div className="font-bold text-school-yellow flex items-center gap-2">Explore Tender Kidz &rarr;</div>
                </div>
              </Link>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <Link href="/academics" className="block group h-full">
                <div className="bg-white rounded-3xl p-8 border-2 border-transparent group-hover:border-school-blue transition-all shadow-md group-hover:shadow-xl h-full flex flex-col">
                  <div className="w-16 h-16 bg-school-blue/10 rounded-2xl flex items-center justify-center mb-6 text-3xl">📚</div>
                  <h3 className="text-2xl font-heading font-bold text-slate-900 mb-4 group-hover:text-school-blue transition-colors">Paradise English School</h3>
                  <p className="text-slate-600 mb-6 flex-1">Primary and beyond. A structured curriculum blending traditional values with modern educational methodologies.</p>
                  <div className="font-bold text-school-blue flex items-center gap-2">Explore Primary &rarr;</div>
                </div>
              </Link>
            </ScrollReveal>
          </div>
        </div>
      </Section>

      {/* Extracurricular Activities Strip */}
      <Section className="bg-school-blue text-white overflow-hidden">
        <div className="container relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
            <div className="max-w-md">
              <h2 className="text-2xl md:text-3xl font-heading font-bold mb-4">Beyond the Classroom</h2>
              <p className="text-blue-100">Fostering creativity, teamwork, and physical fitness.</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:flex md:flex-wrap justify-center gap-6 md:gap-10">
              <div className="flex flex-col items-center gap-2">
                <div className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center text-2xl">⚽</div>
                <span className="text-sm font-medium">Sports</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center text-2xl">🎨</div>
                <span className="text-sm font-medium">Art & Craft</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center text-2xl">🎵</div>
                <span className="text-sm font-medium">Music & Dance</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center text-2xl">🗣️</div>
                <span className="text-sm font-medium">Debate</span>
              </div>
              <div className="flex flex-col items-center gap-2 col-span-2 sm:col-span-1 md:col-auto">
                <div className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center text-2xl">🔬</div>
                <span className="text-sm font-medium">Science Club</span>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Principal Message */}
      <PrincipalMessage 
        name={settings?.principalName || ""} 
        message={settings?.principalMessage || ""}
        image={settings?.principalImage || ""}
      />

      {/* Parent Involvement */}
      <Section className="bg-slate-50">
        <div className="container">
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-md border border-slate-100 flex flex-col lg:flex-row gap-10 items-center">
            <div className="lg:w-1/3 flex justify-center">
              {settings?.parentInvolvementImage ? (
                <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-school-yellow/20">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={settings.parentInvolvementImage} alt="Parent Involvement" className="w-full h-full object-cover" />
                </div>
              ) : (
                <div className="w-48 h-48 bg-school-yellow/20 rounded-full flex items-center justify-center">
                  <span className="text-7xl">🤝</span>
                </div>
              )}
            </div>
            <div className="lg:w-2/3 space-y-4 text-center lg:text-left">
              <h2 className="text-3xl font-heading font-bold text-slate-900">Partnering with Parents</h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                We believe education is a collaborative journey. Regular Parent-Teacher Meetings (PTMs), interactive workshops, and family events ensure that parents are actively engaged in their child's holistic development.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* Notices Section */}
      <Section className="bg-white">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-slate-900 mb-4">Latest Notices</h2>
              <div className="h-1 w-20 bg-school-blue rounded-full" />
            </div>
            <Link href="/notices" className="text-school-blue font-medium hover:underline mt-4 md:mt-0">
              View All Notices &rarr;
            </Link>
          </div>

          {notices.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {notices.map((notice: any, idx: number) => (
                <ScrollReveal delay={idx * 0.1} key={notice.id}>
                  <Link href={`/notices/${notice.slug}`} className="block h-full">
                    <Card className="h-full border-l-4 border-l-school-blue hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                          {new Date(notice.publishAt || notice.createdAt).toLocaleDateString()}
                        </div>
                        <CardTitle className="font-heading text-lg leading-tight group-hover:text-school-blue transition-colors">{notice.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-slate-600 text-sm line-clamp-3">{notice.body}</p>
                      </CardContent>
                    </Card>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          ) : (
            <p className="text-slate-500 text-center py-10">No recent notices available.</p>
          )}
        </div>
      </Section>

      {/* Testimonials */}
      <Section className="bg-slate-900 text-white relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-school-blue/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-school-red/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />
        
        <div className="container relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">What Parents Say</h2>
            <div className="h-1 w-20 bg-school-red mx-auto rounded-full" />
          </div>

          {testimonials.length > 0 ? (
            <div className="max-w-4xl mx-auto px-12">
              <Carousel
                opts={{
                  align: "start",
                  loop: true,
                }}
                className="w-full"
              >
                <CarouselContent>
                  {testimonials.map((t: any) => (
                    <CarouselItem key={t.id} className="basis-full md:basis-1/2 lg:basis-1/2">
                      <div className="p-2 h-full">
                        <Card className="bg-slate-800 border-none text-white h-full">
                          <CardContent className="p-6 flex flex-col justify-between h-full">
                            <div className="mb-6 text-school-yellow text-xl">
                              {"★".repeat(t.rating)}{"☆".repeat(5 - t.rating)}
                            </div>
                            <p className="text-slate-300 italic mb-6">"{t.content}"</p>
                            <div className="font-heading font-semibold text-school-blue">
                              — {t.parentName}
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="bg-slate-800 border-slate-700 text-white hover:bg-slate-700 hover:text-white" />
                <CarouselNext className="bg-slate-800 border-slate-700 text-white hover:bg-slate-700 hover:text-white" />
              </Carousel>
            </div>
          ) : (
             <p className="text-slate-400 text-center">Reviews are currently unavailable.</p>
          )}

          <div className="text-center mt-12 relative z-10">
            <Link 
              href="/testimonials" 
              className="inline-flex h-12 items-center justify-center rounded-full bg-white text-slate-900 px-8 font-bold shadow-lg transition-transform hover:scale-105"
            >
              Read All Reviews &rarr;
            </Link>
          </div>
        </div>
      </Section>

      {/* Gallery Preview */}
      <Section className="bg-white">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-slate-900 mb-4">Campus Highlights</h2>
              <div className="h-1 w-20 bg-school-yellow rounded-full" />
            </div>
            <Link href="/gallery" className="text-school-blue font-medium hover:underline mt-4 md:mt-0">
              View Full Gallery &rarr;
            </Link>
          </div>

          {galleryItems.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {galleryItems.slice(0, 4).map((item: any, idx: number) => (
                <ScrollReveal delay={idx * 0.05} key={item.id}>
                  <div className="relative aspect-square rounded-2xl overflow-hidden bg-slate-100 group">
                    <Image
                      src={item.url}
                      alt={item.altText || "Gallery image"}
                      fill
                      unoptimized
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                </ScrollReveal>
              ))}
            </div>
          ) : (
            <p className="text-slate-500 text-center py-10">No recent photos available.</p>
          )}
        </div>
      </Section>

      {/* FAQ Preview */}
      {faqs && faqs.length > 0 && (
        <Section className="bg-slate-50">
          <div className="container">
            <div className="max-w-3xl mx-auto mb-8">
              <FAQSection items={faqs.slice(0, 4)} />
            </div>

            <div className="text-center">
              <Link href="/faq" className="inline-flex h-12 items-center justify-center rounded-full bg-white border border-slate-200 px-8 font-bold text-slate-700 shadow-sm transition-colors hover:bg-slate-50">
                View All FAQs
              </Link>
            </div>
          </div>
        </Section>
      )}

    </div>
  );
}
