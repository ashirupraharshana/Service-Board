"use client";

import { useEffect, useState } from "react";

import TradespersonNavbar from "@/components/TradespersonNavbar";

import TradespersonJobCard from "@/components/TradespersonJobCard";

import { getJobs } from "@/services/api";

export default function TradespersonDashboard() {

  const [jobs, setJobs] = useState([]);

  const [filteredJobs, setFilteredJobs] = useState([]);

  const [filter, setFilter] = useState("Open");


  useEffect(() => {

    fetchJobs();

  }, []);


  useEffect(() => {

    handleFilter(filter);

  }, [jobs, filter]);


  const fetchJobs = async () => {

    try {

      const data = await getJobs();

      setJobs(data);

    } catch (error) {

      console.log(error);
    }
  };


  const handleFilter = (status) => {

    setFilter(status);

    if (status === "All") {

      setFilteredJobs(jobs);

    } else {

      const filtered = jobs.filter(
        (job) => job.status === status
      );

      setFilteredJobs(filtered);
    }
  };


  return (

    <div className="min-h-screen bg-gray-100">

      <TradespersonNavbar />

      <div className="max-w-6xl mx-auto p-6 pt-28">

        <div className="flex justify-between items-center mb-6">

          <h1 className="text-4xl font-bold">
            Tradesperson Dashboard
          </h1>


          {/* FILTER */}

          <select
            value={filter}
            onChange={(e) =>
              handleFilter(e.target.value)
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