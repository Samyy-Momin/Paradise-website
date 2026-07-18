import Link from "next/link";
import Image from "next/image";
import { FaFacebook, FaInstagram, FaPhoneAlt as Phone } from "react-icons/fa";

export async function Footer() {
  let settings = null;
  try {
    // Determine the API URL from environment variables, fallback to local
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';
    
    // Using fetch with cache control (e.g. revalidate every hour or no-cache for dynamic)
    const res = await fetch(`${apiUrl}/settings`, { 
      cache: "no-store",
    });
    
    if (res.ok) {
      settings = await res.json();
    }
  } catch (err: any) { if (err?.digest === 'DYNAMIC_SERVER_USAGE') throw err;
    console.error("Failed to fetch settings for Footer:", err);
  }

  // Assuming phones is an array of strings, address is string, etc.
  const phoneLinks = settings?.phones?.map((p: string) => p.replace(/[^\d+]/g, '')) || [];
  const address = settings?.address || "Paradise English School, 123 Education Lane";
  const hours = settings?.hours || "Mon-Fri, 8am-4pm";

  return (
    <footer className="border-t bg-muted/40">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1 flex flex-col items-start space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src="/logo.png"
                alt="Paradise English School Logo"
                width={40}
                height={40}
                className="h-10 w-auto"
              />
              <span className="font-heading font-bold text-school-red">Paradise English School</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Empowering students for a brighter future through quality education.
            </p>
          </div>
          
          <div>
            <h3 className="font-heading font-semibold text-foreground mb-4">Contact</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex flex-col">
                <span className="font-medium text-foreground">Address</span>
                <span>{address}</span>
              </li>
              {settings?.phones?.length > 0 ? (
                <li className="flex flex-col">
                  <span className="font-medium text-foreground">Phone</span>
                  <div className="flex flex-col space-y-1 mt-1">
                    {settings.phones.map((phone: string, i: number) => (
                      <a key={i} href={`tel:${phoneLinks[i]}`} className="hover:text-school-blue transition-colors flex items-center">
                        <Phone className="h-3 w-3 mr-2" />
                        {phone}
                      </a>
                    ))}
                  </div>
                </li>
              ) : null}
            </ul>
          </div>
          
          <div>
            <h3 className="font-heading font-semibold text-foreground mb-4">Hours</h3>
            <p className="text-sm text-muted-foreground">{hours}</p>
          </div>
          
          <div>
            <h3 className="font-heading font-semibold text-foreground mb-4">Connect</h3>
            <div className="flex space-x-4">
              {settings?.facebookUrl && (
                <a href={settings.facebookUrl} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-school-blue transition-colors">
                  <span className="sr-only">Facebook</span>
                  <FaFacebook className="h-5 w-5" />
                </a>
              )}
              {settings?.instagramUrl && (
                <a href={settings.instagramUrl} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-school-red transition-colors">
                  <span className="sr-only">Instagram</span>
                  <FaInstagram className="h-5 w-5" />
                </a>
              )}
              {settings?.threadsUrl && (
                <a href={settings.threadsUrl} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors flex items-center justify-center font-bold text-xl leading-none">
                  <span className="sr-only">Threads</span>
                  @
                </a>
              )}
            </div>
          </div>
        </div>
        
        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground flex flex-col md:flex-row justify-between items-center">
          <p>© {new Date().getFullYear()} Paradise English School. All rights reserved.</p>
          <div className="mt-4 md:mt-0 flex space-x-4">
            <Link href="/privacy" className="hover:underline hover:text-foreground">Privacy Policy</Link>
            <Link href="/terms" className="hover:underline hover:text-foreground">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
