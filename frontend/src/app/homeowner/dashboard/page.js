"use client";

import { useEffect, useMemo, useState } from "react";

import { getJobs } from "@/services/api";
import HomeownerJobCard from "@/components/HomeownerJobCard";
import HomeownerNavbar from "@/components/HomeownerNavbar";

export default function HomeownerDashboard() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      setLoading(true);

      const data = await getJobs();
      const user = JSON.parse(localStorage.getItem("user"));

      const filtered = data.filter((job) => {
  const createdById =
    typeof job.createdBy === "object"
      ? job.createdBy?._id
      : job.createdBy;

  return String(createdById) === String(user?._id);
});

      setJobs(filtered);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const displayedJobs = useMemo(() => {
    if (!search.trim()) return jobs;

    return jobs.filter((job) =>
      job.title.toLowerCase().includes(search.toLowerCase().trim())
    );
  }, [jobs, search]);

  return (
    <div className="min-h-screen bg-gray-100">
      <HomeownerNavbar />

      <main className="max-w-7xl mx-auto px-6 pt-28 pb-10">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                Homeowner Dashboard
              </h1>
              <p className="text-gray-500 mt-1">
                Track your requests and manage your jobs.
              </p>
            </div>

            <div className="bg-black text-white px-4 py-2 rounded-lg w-fit">
              Total Jobs: {jobs.length}
            </div>
          </div>

          <div className="mt-6">
            <input
              type="text"
              placeholder="Search your jobs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full md:w-96 border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
        </div>

        {loading ? (
          <div className="bg-white p-10 rounded-2xl shadow-sm text-center">
            <p className="text-gray-500">Loading jobs...</p>
          </div>
        ) : displayedJobs.length === 0 ? (
          <div className="bg-white p-10 rounded-2xl shadow-sm text-center">
            <p className="text-xl font-semibold text-gray-500">
              No jobs found
            </p>
          </div>
        ) : (
          <div className="grid gap-5">
            {displayedJobs.map((job) => (
              <HomeownerJobCard key={job._id} job={job} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}