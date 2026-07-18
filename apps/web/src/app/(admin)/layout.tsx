"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  Image as ImageIcon,
  MessageSquare,
  Users,
  FolderOpen,
  HelpCircle,
  Settings,
  ClipboardList,
  LogOut,
} from "lucide-react";

const sidebarLinks = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/enquiries", label: "Enquiries", icon: ClipboardList },
  { href: "/admin/notices", label: "Notices", icon: FileText },
  { href: "/admin/gallery", label: "Gallery", icon: ImageIcon },
  { href: "/admin/gallery-categories", label: "Categories", icon: FolderOpen },
  { href: "/admin/testimonials", label: "Testimonials", icon: MessageSquare },
  { href: "/admin/faculty", label: "Faculty", icon: Users },
  { href: "/admin/faq", label: "FAQ", icon: HelpCircle },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      {!pathname.includes("/admin/login") && (
        <aside className="w-64 bg-slate-900 text-white flex flex-col fixed inset-y-0 left-0 z-40">
          {/* Logo */}
          <div className="p-5 border-b border-slate-800">
            <Link href="/admin/dashboard" className="flex items-center space-x-3">
              <Image src="/logo.png" alt="Logo" width={36} height={36} className="h-9 w-auto" />
              <div>
                <div className="font-heading font-bold text-sm leading-tight">Paradise School</div>
                <div className="text-[10px] text-slate-400 tracking-wider uppercase">Admin Panel</div>
              </div>
            </Link>
          </div>

          {/* Nav */}
          <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
            {sidebarLinks.map((link) => {
              const isActive = pathname === link.href || pathname.startsWith(link.href + "/");
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center space-x-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${
                    isActive
                      ? "bg-school-blue text-white shadow-md"
                      : "text-slate-400 hover:bg-slate-800 hover:text-white"
                  }`}
                >
                  <link.icon className="h-4 w-4 shrink-0" />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Bottom */}
          <div className="p-3 border-t border-slate-800">
            <Link
              href="/"
              className="flex items-center space-x-3 rounded-lg px-3 py-2.5 text-sm text-slate-400 hover:bg-slate-800 hover:text-white transition-all"
            >
              <LogOut className="h-4 w-4" />
              <span>Back to Site</span>
            </Link>
          </div>
        </aside>
      )}

      {/* Main Content */}
      <main className={`flex-1 ${!pathname.includes("/admin/login") ? "ml-64" : ""} bg-slate-50 min-h-screen`}>
        <div className={!pathname.includes("/admin/login") ? "p-8" : "h-screen"}>
          <div className={!pathname.includes("/admin/login") ? "max-w-6xl mx-auto" : "h-full"}>
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
