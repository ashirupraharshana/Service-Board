"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import TradespersonNavbar from "@/components/TradespersonNavbar";

import {
  getJobById,
  updateJobStatus,
  acceptJob
} from "@/services/api";

export default function TradespersonJobDetailsPage() {
  const params = useParams();
  const router = useRouter();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchJob();
  }, []);

  const fetchJob = async () => {
    try {
      const data = await getJobById(params.id);
      setJob(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAcceptJob = async () => {
    try {
      setLoading(true);

      const updated = await acceptJob(params.id);
      setJob(updated);
    } catch (error) {
      console.log(error);
      alert(error.message || "Failed to accept job");
    } finally {
      setLoading(false);
    }
  };

  const handleCloseJob = async () => {
    try {
      setLoading(true);

      const updated = await updateJobStatus(params.id, "Closed");
      setJob(updated);
    } catch (error) {
      console.log(error);
      alert(error.message || "Failed to close job");
    } finally {
      setLoading(false);
    }
  };

  const handleCancelJob = async () => {
    try {
      setLoading(true);

      const updated = await updateJobStatus(params.id, "Open");
      setJob(updated);
    } catch (error) {
      console.log(error);
      alert(error.message || "Failed to cancel job");
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

  const isOpen = job.status === "Open";
  const isInProgress = job.status === "In Progress";
  const isClosed = job.status === "Closed";

  return (
    <div className="min-h-screen bg-gray-100">
      <TradespersonNavbar />

      <div className="max-w-4xl mx-auto pt-28 px-6 pb-10">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {job.title}
              </h1>
              <p className="text-gray-500 mt-1">
                Service request details
              </p>
            </div>

            <span
              className={`px-4 py-2 rounded-full text-sm font-semibold w-fit
              ${
                isOpen
                  ? "bg-green-100 text-green-700"
                  : isInProgress
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {job.status}
            </span>
          </div>

          <p className="text-gray-700 mb-6 leading-relaxed">
            {job.description}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-50 p-4 rounded-xl">
              <p className="text-sm text-gray-500 mb-1">Category</p>
              <p className="font-semibold text-gray-900">{job.category}</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-xl">
              <p className="text-sm text-gray-500 mb-1">Location</p>
              <p className="font-semibold text-gray-900">{job.location}</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-xl">
              <p className="text-sm text-gray-500 mb-1">Contact Name</p>
              <p className="font-semibold text-gray-900">{job.contactName}</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-xl">
              <p className="text-sm text-gray-500 mb-1">Contact Number</p>
              <p className="font-semibold text-gray-900">{job.contactNumber}</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-xl md:col-span-2">
              <p className="text-sm text-gray-500 mb-1">Contact Email</p>
              <p className="font-semibold text-gray-900">{job.contactEmail}</p>
            </div>
          </div>

          {job.assignedTradesperson ? (
            <div className="bg-green-50 border border-green-200 p-4 rounded-xl mb-6">
              <p className="font-semibold text-green-700 mb-2">
                Job Accepted
              </p>
              <p className="text-gray-700">
                <strong>Tradesperson:</strong> {job.assignedTradesperson.name}
              </p>
              <p className="text-gray-700">
                <strong>Email:</strong> {job.assignedTradesperson.email}
              </p>
            </div>
          ) : (
            <div className="bg-blue-50 border border-blue-200 p-4 rounded-xl mb-6">
              <p className="text-blue-700 font-medium">
                This job is still waiting for confirmation.
              </p>
            </div>
          )}

          <div className="flex flex-wrap gap-3">
            {isOpen && !job.assignedTradesperson && (
              <>
                <button
                  onClick={handleAcceptJob}
                  disabled={loading}
                  className="bg-green-600 text-white px-5 py-3 rounded-lg hover:bg-green-700 transition disabled:opacity-50"
                >
                  {loading ? "Working..." : "Confirm Job"}
                </button>

                <button
                  onClick={handleCancelJob}
                  disabled={loading}
                  className="bg-red-600 text-white px-5 py-3 rounded-lg hover:bg-red-700 transition disabled:opacity-50"
                >
                  {loading ? "Working..." : "Cancel"}
                </button>
              </>
            )}

            {isInProgress && (
              <button
                onClick={handleCloseJob}
                disabled={loading}
                className="bg-black text-white px-5 py-3 rounded-lg hover:bg-gray-800 transition disabled:opacity-50"
              >
                {loading ? "Updating..." : "Done"}
              </button>
            )}

            {isClosed && (
              <div className="bg-green-100 text-green-700 px-4 py-3 rounded-lg font-medium">
                Job completed successfully
              </div>
            )}

            <button
              onClick={() => router.push("/tradesperson/dashboard")}
              className="border border-gray-300 text-gray-700 px-5 py-3 rounded-lg hover:bg-gray-50 transition"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}