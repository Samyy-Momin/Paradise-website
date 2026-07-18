"use client";

import { useState } from "react";
import { format } from "date-fns";
import { Star, MessageSquareQuote, Loader2, Send } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";


const testimonialSchema = z.object({
  parentName: z.string().min(2, "Name must be at least 2 characters"),
  content: z.string().min(10, "Please provide a bit more detail in your review"),
  rating: z.number().min(1, "Please select a rating").max(5),
});

type TestimonialFormValues = z.infer<typeof testimonialSchema>;

export default function TestimonialsClient({ initialTestimonials }: { initialTestimonials: any[] }) {
  const [testimonials, setTestimonials] = useState(initialTestimonials);
  const [sortBy, setSortBy] = useState<"newest" | "highest" | "lowest">("newest");
  const [showForm, setShowForm] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const form = useForm<TestimonialFormValues>({
    resolver: zodResolver(testimonialSchema),
    defaultValues: {
      parentName: "",
      content: "",
      rating: 5,
    },
  });

  const sortedTestimonials = [...testimonials].sort((a, b) => {
    if (sortBy === "highest") return b.rating - a.rating;
    if (sortBy === "lowest") return a.rating - b.rating;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(); // newest
  });

  const onSubmit = async (data: TestimonialFormValues) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api"}/testimonials`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed to submit review");
      
      setSubmitSuccess(true);
      setShowForm(false);
      form.reset();
      
      // Auto-hide success message after 5 seconds
      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (err: any) { if (err?.digest === 'DYNAMIC_SERVER_USAGE') throw err;
      console.error(err);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="space-y-8">
      {/* Write a Review Section */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8">
        {!showForm ? (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-1">Have something to share?</h2>
              <p className="text-slate-500 text-sm">We'd love to hear your feedback about our school.</p>
            </div>
            <Button 
              onClick={() => setShowForm(true)}
              className="bg-school-blue hover:bg-school-blue/90 text-white rounded-full px-6"
            >
              <MessageSquareQuote className="w-4 h-4 mr-2" />
              Write a Review
            </Button>
          </div>
        ) : (
          <div className="animate-in fade-in slide-in-from-top-4 duration-300">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 border-b pb-4">Write a Review</h2>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="parentName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-700">Your Name</FormLabel>
                        <FormControl>
                          <Input placeholder="E.g., Sarah Johnson" className="bg-slate-50" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="rating"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-700">Rating</FormLabel>
                        <FormControl>
                          <select
                            className="flex h-10 w-full items-center justify-between rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm ring-offset-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-school-blue focus:ring-offset-2"
                            value={field.value}
                            onChange={(e) => field.onChange(Number(e.target.value))}
                          >
                            <option value="5">⭐⭐⭐⭐⭐ (5/5)</option>
                            <option value="4">⭐⭐⭐⭐ (4/5)</option>
                            <option value="3">⭐⭐⭐ (3/5)</option>
                            <option value="2">⭐⭐ (2/5)</option>
                            <option value="1">⭐ (1/5)</option>
                          </select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-700">Your Review</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Tell us about your experience..." 
                          className="min-h-[120px] bg-slate-50 resize-none" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex items-center justify-end gap-3 pt-4 border-t">
                  <Button 
                    type="button" 
                    variant="ghost" 
                    onClick={() => setShowForm(false)}
                    className="text-slate-500 hover:text-slate-700 rounded-full"
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit" 
                    disabled={form.formState.isSubmitting}
                    className="bg-school-blue hover:bg-school-blue/90 text-white rounded-full px-8"
                  >
                    {form.formState.isSubmitting ? (
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    ) : (
                      <Send className="w-4 h-4 mr-2" />
                    )}
                    Submit Review
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        )}
      </div>

      {submitSuccess && (
        <div className="bg-green-50 border border-green-200 text-green-800 rounded-xl p-4 flex items-center animate-in fade-in slide-in-from-top-2">
          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3 shrink-0">
            <span className="text-lg">🎉</span>
          </div>
          <div>
            <p className="font-medium text-sm">Thank you for your review!</p>
            <p className="text-xs text-green-700 opacity-80 mt-0.5">Your review has been submitted and is waiting for approval by our team before it appears publicly.</p>
          </div>
        </div>
      )}

      {/* Sorting & List */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <h3 className="text-xl font-bold text-slate-900">
            {sortedTestimonials.length} Reviews
          </h3>
          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-500">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e: any) => setSortBy(e.target.value)}
              className="flex h-9 w-[140px] items-center justify-between rounded-md border border-slate-200 bg-white px-3 py-1 text-sm ring-offset-white focus:outline-none focus:ring-2 focus:ring-school-blue focus:ring-offset-2"
            >
              <option value="newest">Newest First</option>
              <option value="highest">Highest Rating</option>
              <option value="lowest">Lowest Rating</option>
            </select>
          </div>
        </div>

        {sortedTestimonials.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-slate-100 shadow-sm">
            <MessageSquareQuote className="w-12 h-12 mx-auto text-slate-300 mb-4" />
            <p className="text-slate-500 font-medium">No reviews found.</p>
            <p className="text-slate-400 text-sm mt-1">Be the first to share your experience!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {sortedTestimonials.map((t, idx) => (
              <ScrollReveal key={t.id} delay={idx * 0.05}>
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 md:p-8">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 border-b border-slate-50 pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-school-blue/10 text-school-blue rounded-full flex items-center justify-center font-bold text-lg">
                        {t.parentName.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900">{t.parentName}</h4>
                        <p className="text-xs text-slate-400">
                          {format(new Date(t.createdAt), "MMMM d, yyyy")}
                        </p>
                      </div>
                    </div>
                    <div className="flex text-school-yellow text-lg shrink-0">
                      {"★".repeat(t.rating)}
                      <span className="text-slate-200">{"★".repeat(5 - t.rating)}</span>
                    </div>
                  </div>
                  <p className="text-slate-700 leading-relaxed whitespace-pre-wrap text-sm md:text-base">
                    {t.content}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
