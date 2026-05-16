"use client";

import { useEffect, useState } from "react";

import { getJobs } from "@/services/api";

import JobCard from "@/components/JobCard";

import HomeownerNavbar from "@/components/HomeownerNavbar";

export default function HomeownerDashboard() {

  const [jobs, setJobs] = useState([]);

  useEffect(() => {

    fetchJobs();

  }, []);

  const fetchJobs = async () => {

    const data = await getJobs();

    const user = JSON.parse(
      localStorage.getItem("user")
    );

    const filtered = data.filter(
      (job) => job.createdBy === user._id
    );

    setJobs(filtered);
  };

  return (

    <div>
          <HomeownerNavbar />

      <h1 className="text-3xl font-bold mb-6">
        Homeowner Dashboard
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