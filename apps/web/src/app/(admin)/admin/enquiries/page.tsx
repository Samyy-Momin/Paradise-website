import KanbanBoard from "./kanban-board";

export default function EnquiriesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Enquiries CRM</h1>
        <p className="text-slate-500">
          Manage admissions pipeline using the Kanban board.
        </p>
      </div>
      <KanbanBoard />
    </div>
  );
}
