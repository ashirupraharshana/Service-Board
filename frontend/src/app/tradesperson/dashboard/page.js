"use client";

import { useEffect, useMemo, useState } from "react";

import TradespersonNavbar from "@/components/TradespersonNavbar";
import TradespersonJobCard from "@/components/TradespersonJobCard";
import { getJobs } from "@/services/api";

export default function TradespersonDashboard() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [statusFilter, setStatusFilter] = useState("Open");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const data = await getJobs();
      setJobs(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const filteredJobs = useMemo(() => {
    let filtered = [...jobs];

    if (statusFilter !== "All") {
      filtered = filtered.filter((job) => job.status === statusFilter);
    }

    if (categoryFilter) {
      filtered = filtered.filter((job) => job.category === categoryFilter);
    }

    if (search.trim()) {
      filtered = filtered.filter((job) =>
        job.title.toLowerCase().includes(search.toLowerCase().trim())
      );
    }

    return filtered;
  }, [jobs, statusFilter, categoryFilter, search]);

  return (
    <div className="min-h-screen bg-gray-100">
      <TradespersonNavbar />

      <main className="max-w-7xl mx-auto px-6 pt-28 pb-10">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                Tradesperson Dashboard
              </h1>
              <p className="text-gray-500 mt-1">
                Browse open requests, filter by category, and manage your work.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="bg-green-50 text-green-700 px-4 py-2 rounded-lg border border-green-200">
                Open: {jobs.filter((j) => j.status === "Open").length}
              </div>
              <div className="bg-yellow-50 text-yellow-700 px-4 py-2 rounded-lg border border-yellow-200">
                In Progress: {jobs.filter((j) => j.status === "In Progress").length}
              </div>
              <div className="bg-gray-50 text-gray-700 px-4 py-2 rounded-lg border border-gray-200">
                Total: {jobs.length}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-gray-300 p-3 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-black"
            >
              <option value="Open">Open Jobs</option>
              <option value="In Progress">In Progress</option>
              <option value="Closed">Closed</option>
              <option value="All">All Jobs</option>
            </select>

            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="border border-gray-300 p-3 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-black"
            >
              <option value="">All Categories</option>
              <option value="Plumbing">Plumbing</option>
              <option value="Electrical">Electrical</option>
              <option value="Painting">Painting</option>
              <option value="Joinery">Joinery</option>
              <option value="Cleaning">Cleaning</option>
              <option value="Gardening">Gardening</option>
            </select>

            <input
              type="text"
              placeholder="Search by job title..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-black md:col-span-2"
            />
          </div>
        </div>

        {loading ? (
          <div className="bg-white p-10 rounded-2xl shadow-sm text-center">
            <p className="text-gray-500">Loading jobs...</p>
          </div>
        ) : filteredJobs.length === 0 ? (
          <div className="bg-white p-10 rounded-2xl shadow-sm text-center">
            <p className="text-xl font-semibold text-gray-500">
              No any available jobs found
            </p>
          </div>
        ) : (
          <div className="grid gap-5">
            {filteredJobs.map((job) => (
              <TradespersonJobCard key={job._id} job={job} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}