"use client";

import { useEffect, useState } from "react";

import TradespersonNavbar from "@/components/TradespersonNavbar";

import TradespersonJobCard from "@/components/TradespersonJobCard";

import { getJobs } from "@/services/api";

export default function MyJobsPage() {

  const [jobs, setJobs] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    fetchMyJobs();

  }, []);


  const fetchMyJobs = async () => {

    try {

      const user = JSON.parse(
        localStorage.getItem("user")
      );

      const data = await getJobs();

      // ONLY MY COMPLETED JOBS
      const myJobs = data.filter(
        (job) =>
          job.status === "Closed" &&
          job.assignedTradesperson &&
          job.assignedTradesperson._id === user._id
      );

      setJobs(myJobs);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);
    }
  };


  if (loading) {

    return (
      <p className="text-center mt-10">
        Loading...
      </p>
    );
  }


  return (

    <div className="min-h-screen bg-gray-100">

      <TradespersonNavbar />

      <div className="max-w-6xl mx-auto p-6 pt-28">

        <h1 className="text-4xl font-bold mb-6">
          My Completed Jobs
        </h1>


        {jobs.length === 0 ? (

          <div className="bg-white p-10 rounded-lg shadow text-center">

            <p className="text-2xl text-gray-500">
              No completed jobs found
            </p>

          </div>

        ) : (

          <div className="grid gap-4">

            {jobs.map((job) => (

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