"use client";

import { useEffect, useState } from "react";

import { useParams } from "next/navigation";

import TradespersonNavbar from "@/components/TradespersonNavbar";

import {
  getJobById,
  updateJobStatus
} from "@/services/api";

export default function TradespersonJobDetailsPage() {

  const params = useParams();

  const [job, setJob] = useState(null);

  useEffect(() => {

    fetchJob();

  }, []);

  const fetchJob = async () => {

    const data = await getJobById(
      params.id
    );

    setJob(data);
  };

  const handleStatusChange = async (e) => {

    const updated = await updateJobStatus(
      params.id,
      e.target.value
    );

    setJob((prev) => ({
      ...prev,
      status: updated.status
    }));
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

        <div className="space-y-2 mb-6">

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

        </div>

        <div>

          <label className="font-semibold mr-3">
            Change Status:
          </label>

          <select
            value={job.status}
            onChange={handleStatusChange}
            className="border p-2 rounded"
          >

            <option value="Open">
              Open
            </option>

            <option value="In Progress">
              In Progress
            </option>

            <option value="Closed">
              Closed
            </option>

          </select>

        </div>

      </div>

    </div>
  );
}