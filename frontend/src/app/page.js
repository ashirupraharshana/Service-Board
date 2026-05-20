"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import JobCard from "@/components/JobCard";
import { getJobs } from "@/services/api";

export default function HomePage() {
  const [jobs, setJobs] = useState([]);
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchJobs();
  }, [category]);

  const fetchJobs = async () => {
    try {
      setLoading(true);

      const data = await getJobs(category, search);

      setJobs(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    fetchJobs();
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* NAVBAR */}
      <nav className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Service Board
            </h1>
            <p className="text-sm text-gray-500">
              Find and manage local service requests
            </p>
          </div>

          <div className="flex items-center gap-5 text-sm font-medium">
            <Link
              href="/"
              className="text-gray-700 hover:text-black transition"
            >
              Home
            </Link>

            <Link
              href="/login"
              className="text-gray-700 hover:text-black transition"
            >
              Login
            </Link>

            <Link
              href="/register"
              className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition"
            >
              Register
            </Link>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="bg-black text-white">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Local Service Requests
          </h2>

          <p className="text-gray-300 max-w-2xl text-lg">
            Homeowners can post service requests and tradespeople can browse,
            accept, and complete jobs.
          </p>

          <div className="flex gap-4 mt-8">
            <Link
              href="/register"
              className="bg-white text-black px-6 py-3 rounded-lg font-medium hover:bg-gray-200 transition"
            >
              Get Started
            </Link>

            <Link
              href="/login"
              className="border border-white text-white px-6 py-3 rounded-lg font-medium hover:bg-white hover:text-black transition"
            >
              Login
            </Link>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <main className="max-w-7xl mx-auto px-6 py-10">
        {/* FILTER CARD */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-5">
            <div>
              <h3 className="text-2xl font-bold text-gray-900">
                Available Service Requests
              </h3>
              <p className="text-gray-500 mt-1">
                Browse current jobs posted by homeowners.
              </p>
            </div>

            <div className="bg-gray-100 px-4 py-2 rounded-lg text-gray-700">
              {jobs.length} jobs found
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
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
              placeholder="Search by title..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border border-gray-300 p-3 rounded-lg md:col-span-2 focus:outline-none focus:ring-2 focus:ring-black"
            />

            <button
              onClick={handleSearch}
              className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition"
            >
              Search
            </button>
          </div>
        </div>

        {/* JOB LIST */}
        {loading ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-10 text-center">
            <p className="text-gray-500">Loading jobs...</p>
          </div>
        ) : jobs.length > 0 ? (
          <div className="grid gap-5">
            {jobs.map((job) => (
              <JobCard
                key={job._id}
                job={job}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-10 text-center">
            <p className="text-xl font-semibold text-gray-500">
              No jobs found
            </p>
          </div>
        )}
      </main>
    </div>
  );
}