"use client";

import { useEffect, useMemo, useState } from "react";

import TradespersonNavbar from "@/components/TradespersonNavbar";
import TradespersonJobCard from "@/components/TradespersonJobCard";

import { getJobs } from "@/services/api";

export default function TradespersonMyJobsPage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [statusFilter, setStatusFilter] = useState("All");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchMyJobs();
  }, []);

  const fetchMyJobs = async () => {
    try {
      setLoading(true);

      const user = JSON.parse(localStorage.getItem("user"));

      const data = await getJobs();

      const myJobs = data.filter((job) => {
        const assignedId =
          typeof job.assignedTradesperson === "object"
            ? job.assignedTradesperson?._id
            : job.assignedTradesperson;

        return String(assignedId) === String(user?._id);
      });

      setJobs(myJobs);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const displayedJobs = useMemo(() => {
    let filtered = [...jobs];

    if (statusFilter !== "All") {
      filtered = filtered.filter(
        (job) => job.status === statusFilter
      );
    }

    if (search.trim()) {
      filtered = filtered.filter((job) =>
        job.title
          .toLowerCase()
          .includes(search.toLowerCase().trim())
      );
    }

    return filtered;
  }, [jobs, statusFilter, search]);

  return (
    <div className="min-h-screen bg-gray-100">
      <TradespersonNavbar />

      <main className="max-w-7xl mx-auto px-6 pt-28 pb-10">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                My Jobs
              </h1>

              <p className="text-gray-500 mt-1">
                Jobs accepted by you are displayed here.
              </p>
            </div>

            <div className="bg-green-700 text-white px-4 py-2 rounded-lg w-fit">
              Total My Jobs: {jobs.length}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-gray-300 p-3 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-black"
            >
              <option value="All">All My Jobs</option>
              <option value="In Progress">In Progress</option>
              <option value="Closed">Closed</option>
            </select>

            <input
              type="text"
              placeholder="Search my jobs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border border-gray-300 p-3 rounded-lg md:col-span-2 focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
        </div>

        {loading ? (
          <div className="bg-white p-10 rounded-2xl shadow-sm text-center">
            <p className="text-gray-500">
              Loading my jobs...
            </p>
          </div>
        ) : displayedJobs.length === 0 ? (
          <div className="bg-white p-10 rounded-2xl shadow-sm text-center">
            <p className="text-xl font-semibold text-gray-500">
              No accepted jobs found
            </p>
          </div>
        ) : (
          <div className="grid gap-5">
            {displayedJobs.map((job) => (
              <TradespersonJobCard
                key={job._id}
                job={job}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}