import { notFound } from "next/navigation";
import { format } from "date-fns";
import { CalendarDays, ArrowLeft, FileText, Download } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const revalidate = 60;

async function getNotice(id: string) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api"}/notices/${id}`, {
      cache: "no-store",
    });
    if (!res.ok) return null;
    return res.json();
  } catch (error: any) { if (error?.digest === 'DYNAMIC_SERVER_USAGE') throw error;
    console.error("Failed to fetch notice:", error);
    return null;
  }
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const notice = await getNotice(params.slug);
  if (!notice) {
    return { title: "Notice Not Found" };
  }
  return {
    title: `${notice.title} | Paradise English School`,
    description: notice.body.substring(0, 150) + "...",
  };
}

export default async function NoticeDetailPage({ params }: { params: { slug: string } }) {
  const notice = await getNotice(params.slug);

  if (!notice) {
    notFound();
  }

  const attachmentUrl = notice.attachmentUrl as string | null;
  
  const isImageOrPdf = attachmentUrl?.match(/\.(pdf|jpg|jpeg|png|webp|gif)(\?.*)?$/i);
  const isDoc = attachmentUrl?.match(/\.(doc|docx)(\?.*)?$/i);

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 pt-24 pb-16">
      <div className="container max-w-4xl">
        <Link href="/notices" className="inline-flex items-center text-school-blue hover:underline mb-8 font-medium">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to all notices
        </Link>

        <article className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-8 md:p-12">
            <div className="flex items-center text-slate-500 text-sm font-medium mb-4">
              <CalendarDays className="w-5 h-5 mr-2 text-school-blue" />
              {notice.publishAt ? format(new Date(notice.publishAt), "MMMM d, yyyy") : "No date"}
            </div>
            
            <h1 className="text-3xl md:text-4xl font-heading font-extrabold text-slate-900 mb-8 leading-tight">
              {notice.title}
            </h1>

            {notice.imageUrl && (
              <div className="mb-8 rounded-2xl overflow-hidden shadow-sm border border-slate-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={notice.imageUrl} alt={notice.title} className="w-full h-auto max-h-[500px] object-cover" />
              </div>
            )}

            <div className="prose prose-slate prose-lg max-w-none mb-12 whitespace-pre-wrap">
              {notice.body}
            </div>

            {attachmentUrl && (
              <div className="mt-8 pt-8 border-t border-slate-100">
                <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center">
                  <FileText className="w-5 h-5 mr-2 text-school-blue" />
                  Attached Document
                </h3>
                
                {isImageOrPdf ? (
                  <div className="w-full aspect-video rounded-xl overflow-hidden border border-slate-200 bg-slate-50">
                    <iframe src={`${attachmentUrl}#toolbar=0`} className="w-full h-full" title="Document Preview" />
                  </div>
                ) : (
                  <a
                    href={attachmentUrl}
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center p-4 rounded-xl border border-slate-200 hover:border-school-blue hover:bg-blue-50/50 transition-colors group"
                  >
                    <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mr-4">
                      <span className="font-bold text-sm">DOC</span>
                    </div>
                    <div className="flex flex-col flex-1 mr-6">
                      <span className="text-slate-900 font-medium group-hover:text-school-blue">Download Document</span>
                      <span className="text-slate-500 text-sm">Word Document</span>
                    </div>
                    <Button variant="default" size="sm" className="shrink-0 bg-school-blue hover:bg-school-blue/90">
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </a>
                )}
              </div>
            )}
          </div>
        </article>
      </div>
    </div>
  );
}
