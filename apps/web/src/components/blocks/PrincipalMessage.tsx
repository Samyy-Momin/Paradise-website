import Image from "next/image";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Quote } from "lucide-react";

interface PrincipalMessageProps {
  name: string;
  message: string;
  image?: string;
}

export function PrincipalMessage({ name, message, image }: PrincipalMessageProps) {
  if (!name && !message) return null;

  return (
    <section className="py-20 bg-slate-50 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-school-blue/5 skew-x-12 -mr-16"></div>
      
      <div className="container relative z-10">
        <ScrollReveal>
          <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row">
            {/* Image side */}
            <div className="md:w-2/5 relative min-h-[300px] md:min-h-full bg-slate-200">
              {image ? (
                <Image
                  src={image}
                  alt={name}
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-cover object-top"
                  unoptimized
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-slate-400">
                  <span className="text-xl font-medium">No Image</span>
                </div>
              )}
              {/* Decorative gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 md:hidden"></div>
              
              {/* Mobile name tag (overlay on image) */}
              <div className="absolute bottom-6 left-6 md:hidden">
                <h3 className="text-2xl font-bold text-white mb-1">{name}</h3>
                <p className="text-white/90 text-sm font-medium uppercase tracking-wider">Principal</p>
              </div>
            </div>

            {/* Content side */}
            <div className="md:w-3/5 p-8 md:p-12 flex flex-col justify-center">
              <Quote className="w-12 h-12 text-school-blue/20 mb-6 hidden md:block" />
              
              <div className="prose prose-lg text-slate-700 leading-relaxed mb-8">
                {message.split("\n").map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>
              
              {/* Desktop name tag */}
              <div className="hidden md:block border-t border-slate-100 pt-6 mt-auto">
                <h3 className="text-2xl font-bold text-school-blue mb-1">{name}</h3>
                <p className="text-slate-500 font-medium uppercase tracking-wider text-sm">Principal, Paradise English School</p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
