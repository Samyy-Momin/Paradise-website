import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import LeadDetailClient from "./lead-detail-client";

export const dynamic = "force-dynamic";

export default async function LeadDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const cookieStore = cookies();
  const sessionToken =
    cookieStore.get("better-auth.session_token") ||
    cookieStore.get("__Secure-better-auth.session_token");

  if (!sessionToken) {
    redirect("/admin/login");
  }

  const apiUrl = process.env.BACKEND_API_URL || "http://localhost:4000/api";

  const res = await fetch(`${apiUrl}/enquiries/${params.id}`, {
    headers: {
      Cookie: `better-auth.session_token=${sessionToken.value}`,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    if (res.status === 401) {
      redirect("/admin/login");
    }
    if (res.status === 404) {
      return <div className="p-4 text-slate-500">Enquiry not found.</div>;
    }
    return (
      <div className="p-4 text-red-500">
        Failed to fetch enquiry details. Please try again.
      </div>
    );
  }

  const enquiry = await res.json();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Lead Details</h1>
        <p className="text-slate-500">
          View and manage information for this admission lead.
        </p>
      </div>

      <LeadDetailClient enquiry={enquiry} />
    </div>
  );
}
