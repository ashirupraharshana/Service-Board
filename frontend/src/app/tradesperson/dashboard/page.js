"use client";

import { useEffect, useState } from "react";

import TradespersonNavbar from "@/components/TradespersonNavbar";

import TradespersonJobCard from "@/components/TradespersonJobCard";

import { getJobs } from "@/services/api";

export default function TradespersonDashboard() {

  const [jobs, setJobs] = useState([]);

  const [filteredJobs, setFilteredJobs] = useState([]);

  const [statusFilter, setStatusFilter] = useState("Open");

  const [categoryFilter, setCategoryFilter] = useState("");

  const [search, setSearch] = useState("");


  useEffect(() => {

    fetchJobs();

  }, []);


  useEffect(() => {

    filterJobs();

  }, [jobs, statusFilter, categoryFilter]);


  const fetchJobs = async () => {

    try {

      const data = await getJobs();

      setJobs(data);

    } catch (error) {

      console.log(error);
    }
  };


  const filterJobs = () => {

    let filtered = [...jobs];


    // STATUS FILTER
    if (statusFilter !== "All") {

      filtered = filtered.filter(
        (job) => job.status === statusFilter
      );
    }


    // CATEGORY FILTER
    if (categoryFilter !== "") {

      filtered = filtered.filter(
        (job) => job.category === categoryFilter
      );
    }

    setFilteredJobs(filtered);
  };


  // SEARCH
  const handleSearch = () => {

    let filtered = [...jobs];


    if (statusFilter !== "All") {

      filtered = filtered.filter(
        (job) => job.status === statusFilter
      );
    }


    if (categoryFilter !== "") {

      filtered = filtered.filter(
        (job) => job.category === categoryFilter
      );
    }


    if (search !== "") {

      filtered = filtered.filter((job) =>
        job.title.toLowerCase().includes(
          search.toLowerCase()
        )
      );
    }

    setFilteredJobs(filtered);
  };


  return (

    <div className="min-h-screen bg-gray-100">

      <TradespersonNavbar />

      <div className="max-w-6xl mx-auto p-6 pt-28">

        <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between mb-6">

          <h1 className="text-4xl font-bold">
            Tradesperson Dashboard
          </h1>


          <div className="flex flex-col md:flex-row gap-3">


            {/* STATUS FILTER */}
            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value)
              }
              className="border p-3 rounded"
            >

              <option value="Open">
                Open Jobs
              </option>

              <option value="In Progress">
                In Progress
              </option>

              <option value="Closed">
                Closed
              </option>

              <option value="All">
                All Jobs
              </option>

            </select>


            {/* CATEGORY FILTER */}
            <select
              value={categoryFilter}
              onChange={(e) =>
                setCategoryFilter(e.target.value)
              }
              className="border p-3 rounded"
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


            {/* SEARCH */}
            <input
              type="text"
              placeholder="Search job title..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="border p-3 rounded"
            />


            <button
              onClick={handleSearch}
              className="bg-green-700 text-white px-5 py-3 rounded"
            >
              Search
            </button>

          </div>

        </div>


        {/* JOB LIST */}

        {filteredJobs.length === 0 ? (

          <div className="bg-white p-10 rounded-lg shadow text-center">

            <p className="text-2xl font-semibold text-gray-500">
              No Any Available Jobs Found
            </p>

          </div>

        ) : (

          <div className="grid gap-4">

            {filteredJobs.map((job) => (

              <TradespersonJobCard
                key={job._id}
                job={job}
              />

            ))}

          </div>
        )}

      </div>

    </div>
  );
}