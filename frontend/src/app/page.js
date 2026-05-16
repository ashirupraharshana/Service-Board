"use client";

import Link from "next/link";

import { useEffect, useState } from "react";

import JobCard from "@/components/JobCard";

import { getJobs } from "@/services/api";

export default function HomePage() {

  const [jobs, setJobs] = useState([]);

  const [category, setCategory] = useState("");

  const [search, setSearch] = useState("");


  useEffect(() => {

    fetchJobs();

  }, [category]);


  const fetchJobs = async () => {

    const data = await getJobs(
      category,
      search
    );

    setJobs(data);
  };


  const handleSearch = async () => {

    const data = await getJobs(
      category,
      search
    );

    setJobs(data);
  };


  return (

    <div className="min-h-screen bg-gray-100">

      {/* NAVBAR */}
      <nav className="bg-black text-white p-4">

        <div className="max-w-6xl mx-auto flex justify-between items-center">

          <h1 className="text-2xl font-bold">
            Service Board
          </h1>

          <div className="flex gap-4">

            <Link href="/">
              Home
            </Link>

            <Link href="/login">
              Login
            </Link>

            <Link href="/register">
              Register
            </Link>

          </div>

        </div>

      </nav>


      {/* PAGE CONTENT */}
      <div className="max-w-6xl mx-auto p-6">

        <h1 className="text-4xl font-bold mb-6">
          Available Service Requests
        </h1>


        {/* FILTERS */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border p-3 rounded bg-white"
          >

            <option value="">
              All Categories
            </option>

            <option value="Plumbing">
              Plumbing
            </option>

            <option value="Electrical">
              Electrical
            </option>

            <option value="Painting">
              Painting
            </option>

            <option value="Joinery">
              Joinery
            </option>

          </select>


          <input
            type="text"
            placeholder="Search by title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border p-3 rounded flex-1 bg-white"
          />


          <button
            onClick={handleSearch}
            className="bg-black text-white px-6 py-3 rounded"
          >
            Search
          </button>

        </div>


        {/* JOB LIST */}
        <div className="grid gap-4">

          {jobs.length > 0 ? (

            jobs.map((job) => (

              <JobCard
                key={job._id}
                job={job}
              />
            ))

          ) : (

            <p className="text-gray-600">
              No jobs found.
            </p>

          )}

        </div>

      </div>

    </div>
  );
}