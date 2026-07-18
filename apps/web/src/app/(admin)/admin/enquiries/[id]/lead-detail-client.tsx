"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  User,
  Phone,
  MapPin,
  Calendar,
  Clock,
  Send,
  Info,
  FileText,
  Loader2,
} from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";

type EnquiryStatus =
  "NEW" | "CONTACTED" | "VISIT_SCHEDULED" | "ADMITTED" | "LOST";

interface Note {
  id: string;
  note: string;
  createdAt: string;
  author: {
    name: string;
  };
}

interface Enquiry {
  id: string;
  parentName: string;
  phone: string;
  childAge: string | null;
  branch: string;
  message: string | null;
  status: EnquiryStatus;
  source: string | null;
  createdAt: string;
  notes: Note[];
}

const STAGES: { id: EnquiryStatus; label: string }[] = [
  { id: "NEW", label: "New Lead" },
  { id: "CONTACTED", label: "Contacted" },
  { id: "VISIT_SCHEDULED", label: "Visit Scheduled" },
  { id: "ADMITTED", label: "Admitted / Won" },
  { id: "LOST", label: "Lost" },
];

export default function LeadDetailClient({ id }: { id: string }) {
  const queryClient = useQueryClient();
  const [newNote, setNewNote] = useState("");

  const { data: enquiry, isLoading, isError } = useQuery<Enquiry>({
    queryKey: ["enquiry", id],
    queryFn: async () => {
      const res = await apiClient.get(`/enquiries/${id}`);
      return res.data;
    },
  });

  const statusMutation = useMutation({
    mutationFn: async (status: EnquiryStatus) => {
      await apiClient.patch(`/enquiries/${id}/status`, { status });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["enquiry", id] });
    },
    onError: () => {
      alert("Error updating status.");
    },
  });

  const noteMutation = useMutation({
    mutationFn: async (note: string) => {
      await apiClient.post(`/enquiries/${id}/notes`, { note });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["enquiry", id] });
      setNewNote("");
    },
    onError: () => {
      alert("Error adding note.");
    },
  });

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value as EnquiryStatus;
    statusMutation.mutate(newStatus);
  };

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim()) return;
    noteMutation.mutate(newNote);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-school-blue" />
      </div>
    );
  }

  if (isError || !enquiry) {
    return <div className="text-red-500">Failed to load enquiry details.</div>;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left Column - Details */}
      <div className="lg:col-span-1 space-y-6">
        {/* Status Card */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
          <h3 className="text-sm font-semibold text-slate-800 mb-3 flex items-center">
            <Info className="w-4 h-4 mr-2 text-school-blue" />
            Lead Status
          </h3>
          <select
            value={enquiry.status}
            onChange={handleStatusChange}
            disabled={statusMutation.isPending}
            className="w-full bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-school-blue focus:border-school-blue block p-2.5"
          >
            {STAGES.map((s) => (
              <option key={s.id} value={s.id}>
                {s.label}
              </option>
            ))}
          </select>
          {statusMutation.isPending && (
            <p className="text-xs text-slate-500 mt-2">Updating...</p>
          )}
        </div>

        {/* Info Card */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
          <h3 className="text-sm font-semibold text-slate-800 mb-4 flex items-center">
            <User className="w-4 h-4 mr-2 text-school-blue" />
            Person Information
          </h3>
          <div className="space-y-4">
            <div>
              <p className="text-xs text-slate-500 mb-1">Parent Name</p>
              <p className="text-sm font-medium text-slate-900">
                {enquiry.parentName}
              </p>
            </div>
            <div>
              <p className="text-xs text-slate-500 mb-1">Phone Number</p>
              <a
                href={`tel:${enquiry.phone}`}
                className="text-sm font-medium text-school-blue hover:underline flex items-center"
              >
                <Phone className="w-3.5 h-3.5 mr-1" />
                {enquiry.phone}
              </a>
            </div>
            {enquiry.childAge && (
              <div>
                <p className="text-xs text-slate-500 mb-1">Child's Age</p>
                <p className="text-sm font-medium text-slate-900">
                  {enquiry.childAge}
                </p>
              </div>
            )}
            <div>
              <p className="text-xs text-slate-500 mb-1">Interested Branch</p>
              <p className="text-sm font-medium text-slate-900 flex items-center">
                <MapPin className="w-3.5 h-3.5 mr-1 text-slate-400" />
                {enquiry.branch.replace(/_/g, " ")}
              </p>
            </div>
            <div>
              <p className="text-xs text-slate-500 mb-1">Enquired At</p>
              <p className="text-sm font-medium text-slate-900 flex items-center">
                <Calendar className="w-3.5 h-3.5 mr-1 text-slate-400" />
                {new Date(enquiry.createdAt).toLocaleString()}
              </p>
            </div>
            {enquiry.source && (
              <div>
                <p className="text-xs text-slate-500 mb-1">Source</p>
                <span className="inline-block px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-md border border-slate-200">
                  {enquiry.source}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Initial Message */}
        {enquiry.message && (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
            <h3 className="text-sm font-semibold text-slate-800 mb-3 flex items-center">
              <FileText className="w-4 h-4 mr-2 text-school-blue" />
              Initial Message
            </h3>
            <p className="text-sm text-slate-600 italic border-l-2 border-slate-200 pl-3 py-1">
              "{enquiry.message}"
            </p>
          </div>
        )}
      </div>

      {/* Right Column - Notes / Timeline */}
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col h-[calc(100vh-140px)]">
          {/* Header */}
          <div className="px-5 py-4 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-slate-800">
              Activity Timeline & Notes
            </h3>
            <span className="text-xs font-medium bg-school-yellow/20 text-school-yellow-dark px-2 py-1 rounded-full">
              {enquiry.notes.length} Notes
            </span>
          </div>

          {/* Notes List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-6">
            {enquiry.notes.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-3">
                  <FileText className="w-8 h-8 text-slate-300" />
                </div>
                <p className="text-slate-500 font-medium">No notes yet.</p>
                <p className="text-slate-400 text-sm mt-1">
                  Add a note below to keep track of conversations.
                </p>
              </div>
            ) : (
              <div className="relative border-l border-slate-200 ml-3 space-y-8">
                {enquiry.notes.map((note) => (
                  <div key={note.id} className="relative pl-6">
                    <span className="absolute -left-1.5 top-1 w-3 h-3 rounded-full bg-school-blue ring-4 ring-white"></span>
                    <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-xs font-semibold text-slate-700">
                          {note.author.name}
                        </span>
                        <span className="text-[10px] text-slate-400 flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          {new Date(note.createdAt).toLocaleString()}
                        </span>
                      </div>
                      <p className="text-sm text-slate-600 whitespace-pre-wrap">
                        {note.note}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Add Note Input */}
          <div className="p-4 border-t border-slate-200 bg-white">
            <form onSubmit={handleAddNote} className="flex flex-col gap-3">
              <textarea
                rows={3}
                className="w-full bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-school-blue focus:border-school-blue p-3 resize-none"
                placeholder="Write a follow-up note..."
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                disabled={noteMutation.isPending}
              ></textarea>
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={!newNote.trim() || noteMutation.isPending}
                  className="inline-flex items-center px-4 py-2 bg-school-blue text-white text-sm font-medium rounded-lg hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Send className="w-4 h-4 mr-2" />
                  {noteMutation.isPending ? "Saving..." : "Add Note"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
