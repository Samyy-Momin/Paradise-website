"use client";

import { useState, useEffect } from "react";
import { Loader2, Plus, Trash2 } from "lucide-react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FileUploadField } from "@/components/admin/FileUploadField";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const settingsSchema = z.object({
  address: z.string().optional(),
  phones: z.array(z.object({ value: z.string() })).optional(),
  hours: z.string().optional(),
  instagramUrl: z
    .string()
    .url("Must be a valid URL")
    .optional()
    .or(z.literal("")),
  facebookUrl: z
    .string()
    .url("Must be a valid URL")
    .optional()
    .or(z.literal("")),
  threadsUrl: z
    .string()
    .url("Must be a valid URL")
    .optional()
    .or(z.literal("")),
  principalName: z.string().optional(),
  principalMessage: z.string().optional(),
  principalImage: z.string().optional(),
  marqueeText: z.string().optional(),
  heroImages: z.array(z.object({ value: z.string() })).optional(),
  aboutImages: z.array(z.object({ value: z.string() })).optional(),
  parentInvolvementImage: z.string().optional(),
  instagramReels: z.array(z.object({ value: z.string() })).optional(),
  extracurricularImage: z.string().optional(),
  eventsImage: z.string().optional(),
});
type SettingsFormValues = z.infer<typeof settingsSchema>;

export default function SettingsAdminPage() {
  const [loading, setLoading] = useState(true);

  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      address: "",
      phones: [],
      hours: "",
      instagramUrl: "",
      facebookUrl: "",
      threadsUrl: "",
      principalName: "",
      principalMessage: "",
      principalImage: "",
      marqueeText: "",
      heroImages: [],
      aboutImages: [],
      parentInvolvementImage: "",
      instagramReels: [],
      extracurricularImage: "",
      eventsImage: "",
    },
  });

  const {
    fields: phoneFields,
    append: appendPhone,
    remove: removePhone,
  } = useFieldArray({
    control: form.control,
    name: "phones",
  });

  const {
    fields: heroFields,
    append: appendHero,
    remove: removeHero,
  } = useFieldArray({
    control: form.control,
    name: "heroImages",
  });

  const {
    fields: aboutFields,
    append: appendAbout,
    remove: removeAbout,
  } = useFieldArray({
    control: form.control,
    name: "aboutImages",
  });

  const {
    fields: reelFields,
    append: appendReel,
    remove: removeReel,
  } = useFieldArray({
    control: form.control,
    name: "instagramReels",
  });

  useEffect(() => {
    async function fetchSettings() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api"}/settings`,
          {
            credentials: "omit",
          },
        );
        if (res.ok) {
          const data = await res.json();
          form.reset({
            address: data.address || "",
            phones: data.phones
              ? data.phones.map((p: string) => ({ value: p }))
              : [],
            hours: data.hours || "",
            instagramUrl: data.instagramUrl || "",
            facebookUrl: data.facebookUrl || "",
            threadsUrl: data.threadsUrl || "",
            principalName: data.principalName || "",
            principalMessage: data.principalMessage || "",
            principalImage: data.principalImage || "",
            marqueeText: data.marqueeText || "",
            heroImages: data.heroImages
              ? data.heroImages.map((p: string) => ({ value: p }))
              : [],
            aboutImages: data.aboutImages
              ? data.aboutImages.map((p: string) => ({ value: p }))
              : [],
            parentInvolvementImage: data.parentInvolvementImage || "",
            instagramReels: data.instagramReels
              ? data.instagramReels.map((p: string) => ({ value: p }))
              : [],
            extracurricularImage: data.extracurricularImage || "",
            eventsImage: data.eventsImage || "",
          });
        }
      } catch (err: any) {
        if (err?.digest === "DYNAMIC_SERVER_USAGE") throw err;
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchSettings();
  }, [form]);

  const onSubmit = async (data: SettingsFormValues) => {
    try {
      const payload = {
        ...data,
        phones: data.phones
          ? data.phones.map((p) => p.value).filter(Boolean)
          : [],
        heroImages: data.heroImages
          ? data.heroImages.map((p) => p.value).filter(Boolean)
          : [],
        aboutImages: data.aboutImages
          ? data.aboutImages.map((p) => p.value).filter(Boolean)
          : [],
        instagramReels: data.instagramReels
          ? data.instagramReels.map((p) => p.value).filter(Boolean)
          : [],
      };

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api"}/settings`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(payload),
        },
      );

      if (!res.ok) throw new Error("Failed to save settings");
      alert("Settings saved successfully!");
    } catch (err: any) {
      if (err?.digest === "DYNAMIC_SERVER_USAGE") throw err;
      console.error(err);
      alert("Error saving settings");
    }
  };

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-slate-400" />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-3xl font-heading font-bold text-slate-900">
          Site Settings
        </h1>
        <p className="text-slate-500">
          Manage global site information and configurations.
        </p>
      </div>

      <div className="bg-white rounded-lg shadow border border-slate-200 p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <Tabs defaultValue="general" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="general">General</TabsTrigger>
                <TabsTrigger value="homepage">Home Page</TabsTrigger>
                <TabsTrigger value="aboutpage">About Page</TabsTrigger>
                <TabsTrigger value="studentlife">Student Life</TabsTrigger>
                <TabsTrigger value="social">Social & Contact</TabsTrigger>
              </TabsList>

              <TabsContent value="general" className="space-y-6">
                <h2 className="text-xl font-bold border-b pb-2">
                  Global Settings
                </h2>
                <FormField
                  control={form.control}
                  name="marqueeText"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Top Banner Marquee Text</FormLabel>
                      <FormControl>
                        <Input placeholder="Admissions Open..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TabsContent>

              <TabsContent value="homepage" className="space-y-6">
                <h2 className="text-xl font-bold border-b pb-2">
                  Home Page Configuration
                </h2>

                <div className="space-y-4">
                  <div className="text-sm font-medium leading-none mb-2">
                    Hero Section Slideshow Images
                  </div>
                  <p className="text-sm text-slate-500">
                    Add 3-5 images to display in the main hero slider.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {heroFields.map((field, index) => (
                      <div
                        key={field.id}
                        className="relative p-4 border rounded-xl bg-slate-50"
                      >
                        <FormField
                          control={form.control}
                          name={`heroImages.${index}.value`}
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <FileUploadField
                                  value={field.value || ""}
                                  onChange={field.onChange}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          className="absolute -top-3 -right-3 h-8 w-8 rounded-full"
                          onClick={() => removeHero(index)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => appendHero({ value: "" })}
                  >
                    <Plus className="h-4 w-4 mr-2" /> Add Hero Image
                  </Button>
                </div>

                <div className="space-y-4 pt-6 border-t">
                  <div className="text-sm font-medium leading-none mb-2">
                    Welcome Snapshot Images (About Section)
                  </div>
                  <p className="text-sm text-slate-500">
                    Images for the "Welcome to Paradise" section slideshow.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {aboutFields.map((field, index) => (
                      <div
                        key={field.id}
                        className="relative p-4 border rounded-xl bg-slate-50"
                      >
                        <FormField
                          control={form.control}
                          name={`aboutImages.${index}.value`}
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <FileUploadField
                                  value={field.value || ""}
                                  onChange={field.onChange}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          className="absolute -top-3 -right-3 h-8 w-8 rounded-full"
                          onClick={() => removeAbout(index)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => appendAbout({ value: "" })}
                  >
                    <Plus className="h-4 w-4 mr-2" /> Add Snapshot Image
                  </Button>
                </div>

                <div className="space-y-4 pt-6 border-t">
                  <FormField
                    control={form.control}
                    name="parentInvolvementImage"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Partnering with Parents Image</FormLabel>
                        <FormControl>
                          <FileUploadField
                            value={field.value || ""}
                            onChange={field.onChange}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="space-y-4 pt-6 border-t">
                  <div className="text-sm font-medium leading-none mb-2">
                    Instagram Reels Links
                  </div>
                  <p className="text-sm text-slate-500">
                    Add Instagram Reel links to display in the new Reels
                    section.
                  </p>
                  <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-md my-4">
                    <p className="text-sm text-blue-700 font-medium">
                      💡 To achieve the exact looping, UI-less reel experience
                      without the "View Profile" header, you must upload raw
                      video files (.mp4)! Instagram's official iframe embeds
                      strictly prohibit developers from hiding the header,
                      removing comments, or autoplaying the videos. Use the
                      Upload Image tab in the field below to upload an MP4 file.
                    </p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {reelFields.map((field, index) => (
                      <div
                        key={field.id}
                        className="relative p-4 border rounded-xl bg-slate-50"
                      >
                        <FormField
                          control={form.control}
                          name={`instagramReels.${index}.value`}
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <FileUploadField
                                  value={field.value || ""}
                                  onChange={field.onChange}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          className="absolute -top-3 -right-3 h-8 w-8 rounded-full"
                          onClick={() => removeReel(index)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => appendReel({ value: "" })}
                  >
                    <Plus className="h-4 w-4 mr-2" /> Add Reel / Video
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="aboutpage" className="space-y-6">
                <h2 className="text-xl font-bold border-b pb-2">
                  Principal/Founder Profile
                </h2>
                <FormField
                  control={form.control}
                  name="principalName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Principal Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Jane Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="principalImage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Principal Image</FormLabel>
                      <FormControl>
                        <FileUploadField
                          value={field.value || ""}
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="principalMessage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Principal Message</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Welcome message from the principal..."
                          className="min-h-[150px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TabsContent>

              <TabsContent value="studentlife" className="space-y-6">
                <h2 className="text-xl font-bold border-b pb-2">
                  Student Life Images
                </h2>
                <FormField
                  control={form.control}
                  name="extracurricularImage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Extracurricular Activities Image</FormLabel>
                      <FormControl>
                        <FileUploadField
                          value={field.value || ""}
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="eventsImage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Events & Highlights Image</FormLabel>
                      <FormControl>
                        <FileUploadField
                          value={field.value || ""}
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TabsContent>

              <TabsContent value="social" className="space-y-6">
                <h2 className="text-xl font-bold border-b pb-2">
                  Contact Information
                </h2>
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Textarea placeholder="School address..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="space-y-4">
                  <div className="text-sm font-medium leading-none mb-2">
                    Phone Numbers
                  </div>
                  <div className="flex flex-col gap-3">
                    {phoneFields.map((field, index) => (
                      <div key={field.id} className="flex items-center gap-2">
                        <FormField
                          control={form.control}
                          name={`phones.${index}.value`}
                          render={({ field }) => (
                            <FormItem className="flex-1">
                              <FormControl>
                                <Input
                                  placeholder="+91 98765 43210"
                                  {...field}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          onClick={() => removePhone(index)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      className="w-fit"
                      onClick={() => appendPhone({ value: "" })}
                    >
                      <Plus className="h-4 w-4 mr-2" /> Add Phone Number
                    </Button>
                  </div>
                </div>

                <FormField
                  control={form.control}
                  name="hours"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Hours of Operation</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Mon-Sat: 10:00 Am - 5:00 Pm"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <h2 className="text-xl font-bold border-b pb-2 pt-6">
                  Social Links
                </h2>
                <FormField
                  control={form.control}
                  name="instagramUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Instagram URL</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://instagram.com/..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="facebookUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Facebook URL</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://facebook.com/..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="threadsUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Threads URL</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://threads.net/..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TabsContent>
            </Tabs>

            <div className="pt-6 border-t flex justify-end">
              <Button
                type="submit"
                disabled={form.formState.isSubmitting}
                size="lg"
              >
                {form.formState.isSubmitting && (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                )}
                Save All Settings
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
