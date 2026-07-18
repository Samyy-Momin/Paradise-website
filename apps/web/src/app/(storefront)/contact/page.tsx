import { MapPin, Phone, MessageCircle } from "lucide-react";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Card, CardContent } from "@/components/ui/card";

export default function ContactPage() {
  const address = "Opp. Jay Jalaram Medical, Bhandari Compound, Balaji Nagar, Bhiwandi, Thane 421302";
  const phone = "+91 96071 77889";
  const phoneLink = phone.replace(/[^\d+]/g, "");
  
  const whatsappNumber = "919607177889"; // Extracted from phone number
  const whatsappMessage = encodeURIComponent("Hello Paradise English School, I would like to know more about admissions.");

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header Section */}
      <div className="bg-school-yellow/20 py-16">
        <div className="container text-center">
          <h1 className="text-4xl md:text-5xl font-heading font-extrabold text-slate-900 mb-4">
            Get in Touch
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            We would love to hear from you. Visit our campus or reach out to us directly!
          </p>
        </div>
      </div>

      <div className="container py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Information & Map */}
          <div className="space-y-8">
            <ScrollReveal delay={0.1}>
              <div className="space-y-6">
                <h2 className="text-3xl font-heading font-bold text-slate-900">
                  Contact Information
                </h2>
                <div className="grid gap-6">
                  <Card className="border-none shadow-md bg-slate-50">
                    <CardContent className="p-6 flex items-start space-x-4">
                      <div className="bg-school-blue/10 p-3 rounded-full shrink-0">
                        <MapPin className="w-6 h-6 text-school-blue" />
                      </div>
                      <div>
                        <h3 className="font-heading font-bold text-lg text-slate-900 mb-1">Our Campus</h3>
                        <p className="text-slate-600 leading-relaxed">{address}</p>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <a href={`tel:${phoneLink}`} className="block h-full group">
                      <Card className="border-none shadow-md bg-slate-50 hover:bg-school-red hover:text-white transition-colors h-full">
                        <CardContent className="p-6 flex flex-col items-center justify-center text-center space-y-3 h-full">
                          <Phone className="w-8 h-8 text-school-red group-hover:text-white transition-colors" />
                          <div>
                            <h3 className="font-heading font-bold text-lg mb-1">Call Us</h3>
                            <p className="font-medium">{phone}</p>
                          </div>
                        </CardContent>
                      </Card>
                    </a>

                    <a 
                      href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="block h-full group"
                    >
                      <Card className="border-none shadow-md bg-slate-50 hover:bg-[#25D366] hover:text-white transition-colors h-full">
                        <CardContent className="p-6 flex flex-col items-center justify-center text-center space-y-3 h-full">
                          <MessageCircle className="w-8 h-8 text-[#25D366] group-hover:text-white transition-colors" />
                          <div>
                            <h3 className="font-heading font-bold text-lg mb-1">WhatsApp</h3>
                            <p className="font-medium">Chat with us</p>
                          </div>
                        </CardContent>
                      </Card>
                    </a>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="rounded-3xl overflow-hidden shadow-lg h-[400px] border border-slate-200">
                <iframe
                  title="Paradise English School Map"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                  src="https://www.google.com/maps?q=Paradise+English+School+Bhandari+Compound+Bhiwandi&output=embed"
                />
              </div>
            </ScrollReveal>
          </div>

          {/* Enquiry Form */}
          <ScrollReveal delay={0.3}>
            <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-slate-100">
              <h2 className="text-3xl font-heading font-bold text-slate-900 mb-2 text-center">
                Send a Message
              </h2>
              <p className="text-center text-slate-500 mb-8">
                Have any questions? Drop us a message and we'll get back to you!
              </p>
              <EnquiryForm />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
}
