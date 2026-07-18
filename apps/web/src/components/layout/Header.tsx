"use client";

import Link from "next/link";
import Image from "next/image";
import * as React from "react";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

const components: { title: string; href: string; description: string }[] = [
  {
    title: "About Us",
    href: "/about",
    description: "Learn about the history, vision, and mission of Paradise English School.",
  },
  {
    title: "Academics",
    href: "/academics",
    description: "Explore our curriculum, methodology, and evaluation process.",
  },
  {
    title: "Facilities",
    href: "/facilities",
    description: "Discover our state-of-the-art campus, library, and sports facilities.",
  },
  {
    title: "Faculty",
    href: "/faculty",
    description: "Meet our experienced and dedicated teaching staff.",
  },
  {
    title: "Gallery",
    href: "/gallery",
    description: "Browse photos of campus life, events, and activities.",
  },
  {
    title: "Testimonials",
    href: "/testimonials",
    description: "Read what parents and students say about their experience.",
  },
  {
    title: "FAQ",
    href: "/faq",
    description: "Find answers to frequently asked questions.",
  },
  {
    title: "Tender Kidz",
    href: "/tender-kidz",
    description: "Our dedicated pre-school branch for early childhood education.",
  },
];

export function Header() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b backdrop-blur-md bg-white/80 supports-[backdrop-filter]:bg-white/60 shadow-sm">
      <div className="container flex h-16 md:h-20 items-center justify-between">
        
        {/* Logo */}
        <div className="flex items-center gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/logo.png"
              alt="Paradise English School Logo"
              width={48}
              height={48}
              className="h-10 md:h-12 w-auto"
            />
            <div className="hidden sm:flex flex-col">
              <span className="inline-block font-heading font-bold text-lg leading-tight text-school-red">
                Paradise English School
              </span>
              <span className="inline-block text-[10px] uppercase tracking-wider text-slate-500 font-medium">
                Learn with Love
              </span>
            </div>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex flex-1 items-center justify-center">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link href="/" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Home
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Discover</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    {components.map((component) => (
                      <ListItem
                        key={component.title}
                        title={component.title}
                        href={component.href}
                      >
                        {component.description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/admissions" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Admissions
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/student-life" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Student Life
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/notices" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Notices
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/contact" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Contact
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* CTA Button and Mobile Menu */}
        <div className="flex items-center gap-4">
          <Link
            href="/admissions"
            className="hidden sm:inline-flex h-9 md:h-10 items-center justify-center rounded-full bg-school-red px-5 md:px-6 py-2 text-sm font-bold text-white shadow-sm transition-all hover:scale-105 hover:bg-school-red/90"
          >
            Enquire Now
          </Link>
          
          {/* Mobile Menu Toggle */}
          <div className="lg:hidden flex items-center">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <button className="p-2 rounded-md text-slate-600 hover:bg-slate-100 transition-colors">
                  <Menu className="h-6 w-6" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[85vw] max-w-[400px] overflow-y-auto">
                <SheetHeader className="mb-6">
                  <SheetTitle className="text-left font-heading font-bold text-school-red text-xl">Menu</SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col space-y-2">
                  <Link href="/" onClick={() => setIsOpen(false)} className="block py-4 text-xl font-bold text-slate-800 hover:text-school-red border-b border-slate-100">Home</Link>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="discover" className="border-b-0">
                      <AccordionTrigger className="text-xl font-bold text-slate-800 hover:text-school-red py-4 hover:no-underline border-b border-slate-100">Discover</AccordionTrigger>
                      <AccordionContent className="pt-2 pb-0">
                        <ul className="flex flex-col">
                          {components.map((component) => (
                            <li key={component.title}>
                              <Link href={component.href} onClick={() => setIsOpen(false)} className="block py-3 pl-4 text-lg text-slate-600 hover:text-school-blue border-l-2 border-slate-100">
                                {component.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                  <Link href="/admissions" onClick={() => setIsOpen(false)} className="block py-4 text-xl font-bold text-slate-800 hover:text-school-red border-b border-slate-100">Admissions</Link>
                  <Link href="/student-life" onClick={() => setIsOpen(false)} className="block py-4 text-xl font-bold text-slate-800 hover:text-school-red border-b border-slate-100">Student Life</Link>
                  <Link href="/notices" onClick={() => setIsOpen(false)} className="block py-4 text-xl font-bold text-slate-800 hover:text-school-red border-b border-slate-100">Notices</Link>
                  <Link href="/contact" onClick={() => setIsOpen(false)} className="block py-4 text-xl font-bold text-slate-800 hover:text-school-red border-b border-slate-100">Contact</Link>
                  
                  <div className="pt-8">
                    <Link
                      href="/admissions"
                      onClick={() => setIsOpen(false)}
                      className="flex h-14 w-full items-center justify-center rounded-full bg-school-red text-lg font-bold text-white shadow-sm transition-all hover:bg-school-red/90"
                    >
                      Enquire Now
                    </Link>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-slate-100 hover:text-slate-900 focus:bg-slate-100 focus:text-slate-900 group",
            className
          )}
          {...props}
        >
          <div className="text-sm font-bold leading-none text-school-blue group-hover:text-school-red transition-colors">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-slate-500">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
