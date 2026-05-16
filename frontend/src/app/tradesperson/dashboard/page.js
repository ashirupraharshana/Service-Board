"use client";

import { useEffect, useState } from "react";

import TradespersonNavbar from "@/components/TradespersonNavbar";

import TradespersonJobCard from "@/components/TradespersonJobCard";

import { getJobs } from "@/services/api";

export default function TradespersonDashboard() {

  const [jobs, setJobs] = useState([]);

  useEffect(() => {

    fetchJobs();

  }, []);

  const fetchJobs = async () => {

    const data = await getJobs();

    setJobs(data);
  };

  return (

    <div className="min-h-screen bg-gray-100">

      <TradespersonNavbar />

      <div className="max-w-6xl mx-auto p-6">

        <h1 className="text-4xl font-bold mb-6">
          Tradesperson Dashboard
        </h1>

        <div className="grid gap-4">

          {jobs.map((job) => (

            <TradespersonJobCard
  key={job._id}
  job={job}
/>

          ))}

        </div>

      </div>

    </div>
  );
}