"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const formSchema = z.object({
  parentName: z.string().min(2, "Name must be at least 2 characters."),
  phone: z.string().regex(/^\+91 \d{10}$/, "Please enter a valid 10-digit phone number."),
  childAge: z.string().optional(),
  branch: z.enum(["PARADISE_ENGLISH_SCHOOL", "TENDER_KIDZ_PRE_SCHOOL"], {
    message: "Please select a branch.",
  }),
  message: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export function EnquiryForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      parentName: "",
      phone: "+91 ",
      childAge: "",
      message: "",
    },
  });

  const childAgeValue = form.watch("childAge");

  const getAgeHint = (ageStr: string | undefined) => {
    if (!ageStr) return null;
    const age = parseInt(ageStr, 10);
    if (isNaN(age)) return null;
    if (age <= 2) return "Too young for standard admission, but contact us!";
    if (age === 3) return "Nursery";
    if (age === 4) return "Junior KG";
    if (age === 5) return "Senior KG";
    if (age === 6) return "1st Standard";
    if (age > 6 && age <= 15) return `${age - 5}th Standard (Approx)`;
    return "Higher Secondary / Other";
  };

  const ageHint = getAgeHint(childAgeValue);

  async function onSubmit(data: FormValues) {
    setIsSubmitting(true);
    setError(null);
    setSuccess(false);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";
      const res = await fetch(`${apiUrl}/enquiries`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          childAge: data.childAge ? parseInt(data.childAge, 10) : undefined,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to submit enquiry. Please try again.");
      }

      setSuccess(true);
      form.reset();
    } catch (err: any) { if (err?.digest === 'DYNAMIC_SERVER_USAGE') throw err;
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (success) {
    return (
      <Alert className="border-school-blue bg-school-blue/10">
        <AlertTitle className="text-school-blue font-bold">Success!</AlertTitle>
        <AlertDescription className="text-slate-700">
          Thank you for your enquiry. Our team will contact you shortly to guide you through the next steps.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {error && (
          <Alert variant="destructive">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <FormField
          control={form.control}
          name="branch"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Which branch are you interested in?</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem>
                    <FormControl>
                      <RadioGroupItem value="TENDER_KIDZ_PRE_SCHOOL" className="peer sr-only" />
                    </FormControl>
                    <FormLabel className="flex flex-col items-center justify-between rounded-md border-2 border-slate-200 bg-white p-4 font-bold hover:bg-slate-50 hover:text-slate-900 peer-data-[state=checked]:border-school-blue peer-data-[state=checked]:bg-school-blue/5 cursor-pointer">
                      🧸 Tender Kidz (Pre-Primary)
                    </FormLabel>
                  </FormItem>
                  <FormItem>
                    <FormControl>
                      <RadioGroupItem value="PARADISE_ENGLISH_SCHOOL" className="peer sr-only" />
                    </FormControl>
                    <FormLabel className="flex flex-col items-center justify-between rounded-md border-2 border-slate-200 bg-white p-4 font-bold hover:bg-slate-50 hover:text-slate-900 peer-data-[state=checked]:border-school-blue peer-data-[state=checked]:bg-school-blue/5 cursor-pointer">
                      📚 Paradise English (Primary)
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="parentName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Parent/Guardian Name</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. John Doe" className="text-[16px] w-full" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="+91 9876543210" 
                    className="text-[16px] w-full"
                    {...field} 
                    onChange={(e) => {
                      let val = e.target.value;
                      if (!val.startsWith("+91 ")) {
                        val = "+91 ";
                      }
                      const digits = val.substring(4).replace(/\D/g, "").slice(0, 10);
                      field.onChange(`+91 ${digits}`);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="childAge"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Child's Age (Optional)</FormLabel>
              <FormControl>
                <Input type="number" placeholder="e.g. 4" className="text-[16px] w-full" {...field} />
              </FormControl>
              {ageHint && (
                <FormDescription className="text-school-blue font-medium">
                  Hint: {ageHint}
                </FormDescription>
              )}
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message / Questions (Optional)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="How can we help you?"
                  className="resize-none text-[16px] w-full"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="sticky bottom-0 bg-white pt-4 pb-4 md:static md:p-0 md:bg-transparent z-10">
          <Button
            type="submit"
            className="w-full h-12 md:h-10 bg-school-red hover:bg-school-red/90 text-white font-bold"
            disabled={isSubmitting}
          >
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Submit Enquiry
          </Button>
        </div>
      </form>
    </Form>
  );
}
