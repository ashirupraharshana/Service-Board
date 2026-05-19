"use client";

import { useEffect, useState } from "react";

import { useParams } from "next/navigation";

import TradespersonNavbar from "@/components/TradespersonNavbar";

import {
  getJobById,
  updateJobStatus,
  acceptJob
} from "@/services/api";

export default function TradespersonJobDetailsPage() {

  const params = useParams();

  const [job, setJob] = useState(null);

  const [loading, setLoading] = useState(false);

  useEffect(() => {

    fetchJob();

  }, []);

  const fetchJob = async () => {

    try {

      const data = await getJobById(
        params.id
      );

      setJob(data);

    } catch (error) {

      console.log(error);
    }
  };


const handleAcceptJob = async () => {

  try {

    const updated = await acceptJob(
      params.id
    );

    console.log(updated);

    setJob((prev) => ({
  ...prev,
  ...updated
}));

  } catch (error) {

    console.log(error);

    alert("Failed to accept job");
  }
};


  // CLOSE JOB
  const handleCloseJob = async () => {

    try {

      setLoading(true);

      const updated = await updateJobStatus(
        params.id,
        "Closed"
      );

      setJob((prev) => ({
        ...prev,
        status: updated.status
      }));

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message ||
        "Failed to close job"
      );

    } finally {

      setLoading(false);
    }
  };


  // CANCEL JOB => BACK TO OPEN
  const handleCancelJob = async () => {

    try {

      setLoading(true);

      const updated = await updateJobStatus(
        params.id,
        "Open"
      );

      setJob((prev) => ({
        ...prev,
        status: updated.status
      }));

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message ||
        "Failed to cancel job"
      );

    } finally {

      setLoading(false);
    }
  };


  if (!job) {

    return (
      <p className="text-center mt-10">
        Loading...
      </p>
    );
  }

  return (

    <div className="min-h-screen bg-gray-100">

      <TradespersonNavbar />

      <div className="max-w-3xl mx-auto mt-8 bg-white p-6 rounded-lg shadow">

        <h1 className="text-3xl font-bold mb-4">
          {job.title}
        </h1>

        <p className="mb-4 text-gray-700">
          {job.description}
        </p>

        <div className="space-y-3 mb-6">

          <p>
            <strong>Category:</strong> {job.category}
          </p>

          <p>
            <strong>Location:</strong> {job.location}
          </p>

          <p>
            <strong>Contact Name:</strong> {job.contactName}
          </p>

          <p>
            <strong>Contact Number:</strong> {job.contactNumber}
          </p>

          <p>
            <strong>Email:</strong> {job.contactEmail}
          </p>

          <p>
            <strong>Status:</strong> {job.status}
          </p>

          {job.assignedTradesperson && (

            <div className="bg-green-100 p-4 rounded">

              <p className="font-semibold text-green-700">
                Job Accepted
              </p>

              <p>
                <strong>Tradesperson:</strong>{" "}
                {job.assignedTradesperson.name}
              </p>

              <p>
                <strong>Email:</strong>{" "}
                {job.assignedTradesperson.email}
              </p>

            </div>
          )}

        </div>


       

<div className="mt-6">

  {job.status === "Open" && !job.assignedTradesperson && (

    <div className="flex gap-4">

      <button
        onClick={handleAcceptJob}
        className="bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700"
      >
        Confirm Job
      </button>

      <button
        onClick={handleCancelJob}
        className="bg-red-600 text-white px-5 py-2 rounded hover:bg-red-700"
      >
        Cancel
      </button>

    </div>
  )}


  {job.status === "In Progress" && (

    <div className="bg-yellow-100 p-4 rounded">

      <p className="font-semibold text-yellow-700 mb-4">
        Job In Progress
      </p>

      <button
        onClick={handleCloseJob}
        disabled={loading}
        className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
      >
        {loading ? "Updating..." : "Done"}
      </button>

    </div>
  )}


  {job.status === "Closed" && (

    <div className="bg-green-100 p-4 rounded">

      <p className="font-semibold text-green-700">
        Job Completed Successfully
      </p>

    </div>
  )}

</div>
<button
  onClick={() => window.history.back()}
  className="mt-6 bg-gray-700 text-white px-5 py-2 rounded hover:bg-gray-800"
>
  Back to Dashboard
</button>

      </div>

    </div>
  );
}