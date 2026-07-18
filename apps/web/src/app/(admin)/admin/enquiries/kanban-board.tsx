"use client";

import React, { useState, useEffect } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import Link from "next/link";
import {
  Calendar,
  Phone,
  MapPin,
  User as UserIcon,
  Search,
  Filter,
  Loader2,
} from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";

type EnquiryStatus =
  "NEW" | "CONTACTED" | "VISIT_SCHEDULED" | "ADMITTED" | "LOST";

interface Enquiry {
  id: string;
  parentName: string;
  phone: string;
  childAge: string | null;
  branch: string;
  message: string | null;
  status: EnquiryStatus;
  createdAt: string;
}

const STAGES: { id: EnquiryStatus; label: string; color: string }[] = [
  {
    id: "NEW",
    label: "New Lead",
    color: "bg-blue-100 border-blue-200 text-blue-800",
  },
  {
    id: "CONTACTED",
    label: "Contacted",
    color: "bg-yellow-100 border-yellow-200 text-yellow-800",
  },
  {
    id: "VISIT_SCHEDULED",
    label: "Visit Scheduled",
    color: "bg-purple-100 border-purple-200 text-purple-800",
  },
  {
    id: "ADMITTED",
    label: "Admitted / Won",
    color: "bg-green-100 border-green-200 text-green-800",
  },
  {
    id: "LOST",
    label: "Lost",
    color: "bg-red-100 border-red-200 text-red-800",
  },
];

export default function KanbanBoard() {
  const queryClient = useQueryClient();
  const [isBrowser, setIsBrowser] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [branchFilter, setBranchFilter] = useState<string>("ALL");
  const [dateFilter, setDateFilter] = useState<string>("ALL");
  const [customStartDate, setCustomStartDate] = useState<string>("");
  const [customEndDate, setCustomEndDate] = useState<string>("");

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const { data: enquiries = [], isLoading } = useQuery<Enquiry[]>({
    queryKey: ["enquiries"],
    queryFn: async () => {
      const res = await apiClient.get("/enquiries");
      return res.data?.data || [];
    },
  });

  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: EnquiryStatus }) => {
      const res = await apiClient.patch(`/enquiries/${id}/status`, { status });
      return res.data;
    },
    onMutate: async ({ id, status }) => {
      await queryClient.cancelQueries({ queryKey: ["enquiries"] });
      const previousEnquiries = queryClient.getQueryData<Enquiry[]>(["enquiries"]);
      queryClient.setQueryData<Enquiry[]>(["enquiries"], (old) =>
        old?.map((enq) => (enq.id === id ? { ...enq, status } : enq))
      );
      return { previousEnquiries };
    },
    onError: (err, variables, context) => {
      if (context?.previousEnquiries) {
        queryClient.setQueryData(["enquiries"], context.previousEnquiries);
      }
      alert("Error updating lead status.");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["enquiries"] });
    },
  });

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const newStatus = destination.droppableId as EnquiryStatus;
    updateStatusMutation.mutate({ id: draggableId, status: newStatus });
  };

  const getLeadsByStatus = (status: EnquiryStatus) => {
    return enquiries.filter((e) => {
      if (e.status !== status) return false;
      if (branchFilter !== "ALL" && e.branch !== branchFilter) return false;

      // Date Filtering
      if (dateFilter !== "ALL") {
        const createdAt = new Date(e.createdAt);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (dateFilter === "TODAY") {
          if (createdAt < today) return false;
        } else if (dateFilter === "WEEK") {
          const lastWeek = new Date(today);
          lastWeek.setDate(lastWeek.getDate() - 7);
          if (createdAt < lastWeek) return false;
        } else if (dateFilter === "MONTH") {
          const lastMonth = new Date(today);
          lastMonth.setMonth(lastMonth.getMonth() - 1);
          if (createdAt < lastMonth) return false;
        } else if (dateFilter === "CUSTOM") {
          if (customStartDate) {
            const start = new Date(customStartDate);
            start.setHours(0, 0, 0, 0);
            if (createdAt < start) return false;
          }
          if (customEndDate) {
            const end = new Date(customEndDate);
            end.setHours(23, 59, 59, 999);
            if (createdAt > end) return false;
          }
        }
      }

      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          e.parentName.toLowerCase().includes(query) || e.phone.includes(query)
        );
      }
      return true;
    });
  };

  if (!isBrowser) {
    return null; // Prevent hydration mismatch with dnd
  }

  return (
    <div className="flex flex-col h-full space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-white p-4 rounded-lg shadow-sm border border-slate-200">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search name or phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-school-blue/50"
          />
        </div>
        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-slate-400" />
          <select
            value={branchFilter}
            onChange={(e) => setBranchFilter(e.target.value)}
            className="py-2 px-3 bg-slate-50 border border-slate-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-school-blue/50"
          >
            <option value="ALL">All Branches</option>
            <option value="TENDER_KIDZ_PRE_SCHOOL">Tender Kidz</option>
            <option value="PARADISE_ENGLISH_SCHOOL">Paradise English</option>
          </select>
          <select
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="py-2 px-3 bg-slate-50 border border-slate-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-school-blue/50"
          >
            <option value="ALL">All Time</option>
            <option value="TODAY">Today</option>
            <option value="WEEK">Last 7 Days</option>
            <option value="MONTH">Last 30 Days</option>
            <option value="CUSTOM">Custom Range</option>
          </select>
          {dateFilter === "CUSTOM" && (
            <div className="flex items-center gap-2">
              <input
                type="date"
                value={customStartDate}
                onChange={(e) => setCustomStartDate(e.target.value)}
                className="py-2 px-3 bg-slate-50 border border-slate-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-school-blue/50"
              />
              <span className="text-slate-400 text-sm">to</span>
              <input
                type="date"
                value={customEndDate}
                onChange={(e) => setCustomEndDate(e.target.value)}
                className="py-2 px-3 bg-slate-50 border border-slate-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-school-blue/50"
              />
            </div>
          )}
        </div>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex gap-3 pb-4 h-[calc(100vh-280px)] w-full">
          {STAGES.map((stage) => {
            const stageLeads = getLeadsByStatus(stage.id);

            return (
              <div
                key={stage.id}
                className="flex-1 min-w-0 bg-slate-100 rounded-lg flex flex-col shadow-sm border border-slate-200 overflow-hidden"
              >
                {/* Stage Header */}
                <div
                  className={`px-4 py-3 border-b flex justify-between items-center ${stage.color}`}
                >
                  <h3 className="font-semibold text-sm">{stage.label}</h3>
                  <span className="bg-white/50 px-2 py-0.5 rounded-full text-xs font-bold">
                    {stageLeads.length}
                  </span>
                </div>

                {/* Droppable Area */}
                <Droppable droppableId={stage.id}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className={`flex-1 p-3 overflow-y-auto min-h-[150px] transition-colors ${
                        snapshot.isDraggingOver ? "bg-slate-200" : ""
                      }`}
                    >
                      {stageLeads.map((lead, index) => (
                        <Draggable
                          key={lead.id}
                          draggableId={lead.id}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={`mb-3 bg-white border border-slate-200 rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow cursor-grab active:cursor-grabbing ${
                                snapshot.isDragging
                                  ? "shadow-lg ring-2 ring-school-blue ring-opacity-50"
                                  : ""
                              }`}
                              style={{ ...provided.draggableProps.style }}
                            >
                              <Link
                                href={`/admin/enquiries/${lead.id}`}
                                className="block"
                              >
                                <div className="flex justify-between items-start mb-2">
                                  <h4 className="font-semibold text-slate-800 text-sm truncate pr-2">
                                    {lead.parentName}
                                  </h4>
                                  <span className="text-xs text-slate-400 shrink-0">
                                    {new Date(
                                      lead.createdAt,
                                    ).toLocaleDateString()}
                                  </span>
                                </div>

                                <div className="space-y-1.5 mt-3">
                                  <div className="flex items-center text-xs text-slate-600">
                                    <Phone className="w-3.5 h-3.5 mr-2 text-slate-400" />
                                    {lead.phone}
                                  </div>
                                  {lead.childAge && (
                                    <div className="flex items-center text-xs text-slate-600">
                                      <UserIcon className="w-3.5 h-3.5 mr-2 text-slate-400" />
                                      Age: {lead.childAge}
                                    </div>
                                  )}
                                  <div className="flex items-center text-xs text-slate-600">
                                    <MapPin className="w-3.5 h-3.5 mr-2 text-slate-400" />
                                    {lead.branch.replace(/_/g, " ")}
                                  </div>
                                </div>
                              </Link>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            );
          })}
        </div>
      </DragDropContext>
    </div>
  );
}
