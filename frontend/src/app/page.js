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

      const data = await getJobs(
        category,
        search
      );

      setJobs(data);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);
    }
  };


  const handleSearch = async () => {

    fetchJobs();
  };


  return (

    <div className="min-h-screen bg-gray-100">

      {/* NAVBAR */}
      <nav className="bg-white shadow-sm border-b">

        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">

          <div>

            <h1 className="text-2xl font-bold text-black">
              Service Board
            </h1>

            <p className="text-sm text-gray-500">
              Find trusted service requests
            </p>

          </div>

          <div className="flex items-center gap-6 text-sm font-medium">

            <Link
              href="/"
              className="hover:text-gray-600 transition"
            >
              Home
            </Link>

            <Link
              href="/login"
              className="hover:text-gray-600 transition"
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


      {/* HERO SECTION */}
      <div className="bg-black text-white">

        <div className="max-w-6xl mx-auto px-6 py-16">

          <h1 className="text-5xl font-bold mb-4">
            Service Request Board
          </h1>

          <p className="text-lg text-gray-300 max-w-2xl">
            Homeowners can post jobs and tradespeople can
            accept and complete service requests easily.
          </p>

        </div>

      </div>


      {/* CONTENT */}
      <div className="max-w-6xl mx-auto px-6 py-10">

        {/* FILTERS */}
        <div className="bg-white p-5 rounded-xl shadow-sm mb-8">

          <div className="flex flex-col md:flex-row gap-4">

            {/* CATEGORY */}
            <select
              value={category}
              onChange={(e) =>
                setCategory(e.target.value)
              }
              className="border border-gray-300 p-3 rounded-lg bg-white"
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

              <option value="Cleaning">
                Cleaning
              </option>

              <option value="Gardening">
                Gardening
              </option>

            </select>


            {/* SEARCH */}
            <input
              type="text"
              placeholder="Search by title..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="border border-gray-300 p-3 rounded-lg flex-1"
            />


            {/* BUTTON */}
            <button
              onClick={handleSearch}
              className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition"
            >
              Search
            </button>

          </div>

        </div>


        {/* JOBS */}
        <div>

          <div className="flex justify-between items-center mb-6">

            <h2 className="text-2xl font-bold">
              Available Jobs
            </h2>

            <p className="text-gray-500">
              {jobs.length} Jobs Found
            </p>

          </div>


          {loading ? (

            <div className="bg-white p-10 rounded-xl text-center shadow-sm">

              <p className="text-gray-500">
                Loading jobs...
              </p>

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

            <div className="bg-white p-10 rounded-xl text-center shadow-sm">

              <p className="text-gray-600 text-lg">
                No jobs found
              </p>

            </div>

          )}

        </div>

      </div>

    </div>
  );
}