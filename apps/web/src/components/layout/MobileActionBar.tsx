import Link from "next/link";
import { Phone, MessageCircle, ClipboardList } from "lucide-react";

export function MobileActionBar() {
  return (
    <div className="md:hidden fixed bottom-0 left-0 w-full z-50 bg-white border-t shadow-[0_-2px_10px_rgba(0,0,0,0.05)] pb-[env(safe-area-inset-bottom)]">
      <div className="flex h-16 divide-x divide-slate-100">
        <a
          href="tel:+919876543210"
          className="flex-1 flex flex-col items-center justify-center text-slate-600 hover:text-school-red hover:bg-slate-50 transition-colors"
        >
          <Phone className="w-5 h-5 mb-1" />
          <span className="text-[10px] font-bold uppercase tracking-wider">
            Call
          </span>
        </a>
        <a
          href="https://wa.me/919876543210?text=Hello%20Paradise%20English%20School,%20I%20would%20like%20to%20enquire%20about%20admissions."
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex flex-col items-center justify-center text-green-600 hover:bg-green-50 transition-colors"
        >
          <MessageCircle className="w-5 h-5 mb-1" />
          <span className="text-[10px] font-bold uppercase tracking-wider">
            WhatsApp
          </span>
        </a>
        <Link
          href="/admissions"
          className="flex-1 flex flex-col items-center justify-center bg-school-red text-white hover:bg-school-red/90 transition-colors"
        >
          <ClipboardList className="w-5 h-5 mb-1" />
          <span className="text-[10px] font-bold uppercase tracking-wider">
            Enquire
          </span>
        </Link>
      </div>
    </div>
  );
}
