import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Paradise English School & Tender Kidz",
  description: "Empowering students for a brighter future through quality education in Bhiwandi.",
};

async function getSettings() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api"}/settings`, {
      cache: "no-store",
    });
    if (!res.ok) return null;
    return res.json();
  } catch (err: any) { if (err?.digest === 'DYNAMIC_SERVER_USAGE') throw err;
    return null;
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSettings();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: "Paradise English School & Tender Kidz Pre-School",
    url: "https://www.paradiseenglishschool.com",
    address: settings?.address || "Bhandari Compound, Waghbil, Balaji Nagar, Narpoli Gaon, Bhiwandi, Thane, Maharashtra 421302",
    telephone: settings?.phones ? (Array.isArray(settings.phones) ? settings.phones[0] : JSON.parse(settings.phones)[0]) : "+91 9607177889",
    sameAs: [
      settings?.facebookUrl,
      settings?.instagramUrl,
      settings?.threadsUrl,
    ].filter(Boolean),
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${inter.variable} ${outfit.variable} antialiased min-h-screen flex flex-col font-sans`}
      >
        {children}
      </body>
    </html>
  );
}
