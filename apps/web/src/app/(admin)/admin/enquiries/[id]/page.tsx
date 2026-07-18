import LeadDetailClient from "./lead-detail-client";

export default function LeadDetailPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Lead Details</h1>
        <p className="text-slate-500">
          View and manage information for this admission lead.
        </p>
      </div>

      <LeadDetailClient id={params.id} />
    </div>
  );
}
