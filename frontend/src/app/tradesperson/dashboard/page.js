"use client";

import { useEffect, useState } from "react";

import { getJobs } from "@/services/api";

import JobCard from "@/components/JobCard";

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

    <div>

      <h1 className="text-3xl font-bold mb-6">
        Tradesperson Dashboard
      </h1>

      <div className="grid gap-4">

        {jobs.map((job) => (

          <JobCard
            key={job._id}
            job={job}
          />
        ))}

      </div>

    </div>
  );
}