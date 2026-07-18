import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export default function AdmissionsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <div className="bg-school-blue/10 py-16 md:py-24">
        <div className="container text-center">
          <h1 className="text-4xl md:text-5xl font-heading font-extrabold text-slate-900 mb-4">
            Admissions Process
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Take the first step towards a bright future. Follow our simple
            admissions process to enroll your child at Paradise English School.
          </p>
        </div>
      </div>

      <div className="container py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <ScrollReveal delay={0.1}>
            <div className="space-y-12">
              <div>
                <h2 className="text-3xl font-heading font-bold text-slate-900 mb-8">
                  How to Apply
                </h2>
                <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
                  {/* Step 1 */}
                  <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-school-blue text-white font-bold shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                      1
                    </div>
                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-slate-200 bg-white shadow-sm">
                      <div className="font-heading font-bold text-lg mb-1 text-slate-900">
                        Submit Enquiry
                      </div>
                      <div className="text-slate-600 text-sm">
                        Fill out the form on this page to express your interest
                        and tell us about your child.
                      </div>
                    </div>
                  </div>
                  {/* Step 2 */}
                  <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-school-yellow text-school-black font-bold shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                      2
                    </div>
                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-slate-200 bg-white shadow-sm">
                      <div className="font-heading font-bold text-lg mb-1 text-slate-900">
                        School Visit
                      </div>
                      <div className="text-slate-600 text-sm">
                        Our admissions team will contact you to schedule a
                        personalized campus tour.
                      </div>
                    </div>
                  </div>
                  {/* Step 3 */}
                  <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-school-red text-white font-bold shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                      3
                    </div>
                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-slate-200 bg-white shadow-sm">
                      <div className="font-heading font-bold text-lg mb-1 text-slate-900">
                        Confirmation
                      </div>
                      <div className="text-slate-600 text-sm">
                        Submit the required documents and fee to secure your
                        child's admission.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-slate-100">
              <h2 className="text-3xl font-heading font-bold text-slate-900 mb-6 text-center">
                Admissions Enquiry
              </h2>
              <EnquiryForm />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
}
