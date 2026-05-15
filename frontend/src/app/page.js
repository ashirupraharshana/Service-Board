"use client";

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
    try {
      const data = await getJobs(category, search);
      setJobs(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>

      <div className="flex flex-col md:flex-row gap-4 justify-between mb-6">

        <h1 className="text-3xl font-bold">
          Service Requests
        </h1>

        <div className="flex gap-3">

          <input
            type="text"
            placeholder="Search by title"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border p-2 rounded"
          />

          <button
            onClick={fetchJobs}
            className="bg-black text-white px-4 rounded"
          >
            Search
          </button>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="">All Categories</option>
            <option value="Plumbing">Plumbing</option>
            <option value="Electrical">Electrical</option>
            <option value="Painting">Painting</option>
            <option value="Joinery">Joinery</option>
          </select>

        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

        {jobs.map((job) => (
          <JobCard key={job._id} job={job} />
        ))}

      </div>
    </div>
  );
}