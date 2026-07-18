"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api"}/dashboard/stats`,
          {
            credentials: "include",
          },
        );
        if (res.ok) {
          const data = await res.json();
          setStats(data);
        }
      } catch (error: any) {
        if (error?.digest === "DYNAMIC_SERVER_USAGE") throw error;
        console.error("Failed to fetch dashboard stats", error);
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-heading font-bold text-slate-900">
          Dashboard
        </h1>
        <p className="text-slate-500 mt-1">
          Welcome to the Paradise English School admin panel.
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-48">
          <Loader2 className="w-8 h-8 animate-spin text-school-blue" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 relative overflow-hidden group">
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-school-blue/5 rounded-full group-hover:scale-150 transition-transform duration-500" />
            <div className="relative z-10">
              <div className="text-sm font-medium text-slate-500 mb-1">
                Total Enquiries
              </div>
              <div className="text-4xl font-heading font-bold text-slate-900">
                {stats?.totalEnquiries || 0}
              </div>
              <div className="text-xs text-school-blue font-medium mt-2">
                +{stats?.enquiriesThisMonth || 0} this month
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 relative overflow-hidden group">
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-school-yellow/10 rounded-full group-hover:scale-150 transition-transform duration-500" />
            <div className="relative z-10">
              <div className="text-sm font-medium text-slate-500 mb-1">
                Published Notices
              </div>
              <div className="text-4xl font-heading font-bold text-slate-900">
                {stats?.noticesCount || 0}
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 relative overflow-hidden group">
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-school-red/5 rounded-full group-hover:scale-150 transition-transform duration-500" />
            <div className="relative z-10">
              <div className="text-sm font-medium text-slate-500 mb-1">
                Gallery Items
              </div>
              <div className="text-4xl font-heading font-bold text-slate-900">
                {stats?.galleryCount || 0}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Additional Stats Section */}
      {!loading && stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <h3 className="font-bold text-slate-900 mb-4">
              Enquiries by Stage
            </h3>
            <div className="space-y-3">
              {Object.entries(stats.conversionRateByStage || {}).map(
                ([stage, count]) => (
                  <div
                    key={stage}
                    className="flex justify-between items-center text-sm border-b border-slate-50 pb-2 last:border-0 last:pb-0"
                  >
                    <span className="text-slate-600 font-medium">{stage}</span>
                    <span className="font-bold text-slate-900 bg-slate-100 px-3 py-1 rounded-full">
                      {count as number}
                    </span>
                  </div>
                ),
              )}
              {Object.keys(stats.conversionRateByStage || {}).length === 0 && (
                <div className="text-sm text-slate-400">
                  No enquiries found.
                </div>
              )}
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <h3 className="font-bold text-slate-900 mb-4">
              Enquiries by Branch
            </h3>
            <div className="space-y-3">
              {Object.entries(stats.enquiriesByBranch || {}).map(
                ([branch, count]) => (
                  <div
                    key={branch}
                    className="flex justify-between items-center text-sm border-b border-slate-50 pb-2 last:border-0 last:pb-0"
                  >
                    <span className="text-slate-600 font-medium">
                      {branch === "PARADISE_ENGLISH_SCHOOL"
                        ? "Paradise English School"
                        : "Tender Kidz Pre-School"}
                    </span>
                    <span className="font-bold text-slate-900 bg-slate-100 px-3 py-1 rounded-full">
                      {count as number}
                    </span>
                  </div>
                ),
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
