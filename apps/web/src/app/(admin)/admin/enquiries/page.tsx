import KanbanBoard from "./kanban-board";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function EnquiriesPage() {
  const cookieStore = cookies();
  const sessionToken = cookieStore.get("better-auth.session_token");

  if (!sessionToken) {
    redirect("/admin/login");
  }

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

  const res = await fetch(`${apiUrl}/enquiries`, {
    headers: {
      Cookie: `better-auth.session_token=${sessionToken.value}`,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    // If unauthorized, redirect to login
    if (res.status === 401) {
      redirect("/admin/login");
    }
    return (
      <div className="p-4 text-red-500">
        Failed to fetch enquiries. Please try again.
      </div>
    );
  }

  const responseBody = await res.json();
  const enquiries = responseBody.data || [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Enquiries CRM</h1>
        <p className="text-slate-500">Manage admissions pipeline using the Kanban board.</p>
      </div>

      <KanbanBoard initialEnquiries={enquiries} />
    </div>
  );
}
