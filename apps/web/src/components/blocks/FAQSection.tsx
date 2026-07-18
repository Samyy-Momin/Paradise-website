import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

interface FAQItemProps {
  id: string;
  question: string;
  answer: string;
}

export function FAQSection({ items }: { items: FAQItemProps[] }) {
  if (!items || items.length === 0) return null;

  return (
    <div className="w-full max-w-3xl mx-auto my-12">
      <ScrollReveal>
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-slate-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-600 text-lg">
            Find answers to common questions about admissions, campus life, and
            academics.
          </p>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.1}>
        <Accordion type="single" collapsible className="w-full space-y-4">
          {items.map((item) => (
            <AccordionItem
              key={item.id}
              value={item.id}
              className="bg-white border border-slate-200 rounded-xl shadow-sm data-[state=open]:border-school-blue/50 data-[state=open]:ring-2 data-[state=open]:ring-school-blue/20 transition-all duration-200"
            >
              <AccordionTrigger className="text-lg font-medium text-slate-800 hover:text-school-blue text-left hover:no-underline px-6 py-4">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-slate-600 leading-relaxed px-6 pb-4 pt-0 text-base">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </ScrollReveal>
    </div>
  );
}
