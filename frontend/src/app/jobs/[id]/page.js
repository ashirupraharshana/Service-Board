"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import HomeownerNavbar from "@/components/HomeownerNavbar";

import {
  getJobById,
  deleteJob,
  updateJob
} from "@/services/api";

export default function JobDetailsPage() {
  const params = useParams();
  const router = useRouter();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(false);

  const [editMode, setEditMode] = useState(false);

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

  const handleDelete = async () => {
    try {
      setLoading(true);

      await deleteJob(params.id);

      router.push("/homeowner/dashboard");
    } catch (error) {
      console.log(error);
      alert(error.message || "Failed to delete job");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {

  try {

    setLoading(true);

    await updateJob(params.id, job);

    alert("Job updated successfully");

    setEditMode(false);

  } catch (error) {

    console.log(error);

    alert(
      error.response?.data?.message ||
      "Failed to update job"
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

  const isInProgress = job.status === "In Progress";
  const isClosed = job.status === "Closed";

  return (
    <div className="min-h-screen bg-gray-100">
      <HomeownerNavbar />

      <div className="max-w-4xl mx-auto px-6 pt-28 pb-10">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
            <div>
              {editMode ? (
  <input
    type="text"
    value={job.title}
    onChange={(e) =>
      setJob({
        ...job,
        title: e.target.value
      })
    }
    className="w-full border p-3 rounded text-2xl font-bold"
  />
) : (
  <h1 className="text-3xl font-bold text-gray-900">
    {job.title}
  </h1>
)}
              <p className="text-gray-500 mt-1">
                Job request details
              </p>
            </div>

            <span
              className={`px-4 py-2 rounded-full text-sm font-semibold w-fit
              ${
                job.status === "Open"
                  ? "bg-green-100 text-green-700"
                  : job.status === "In Progress"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {job.status}
            </span>
          </div>

          {editMode ? (
  <textarea
    value={job.description}
    onChange={(e) =>
      setJob({
        ...job,
        description: e.target.value
      })
    }
    rows={5}
    className="w-full border p-3 rounded mb-6"
  />
) : (
  <p className="text-gray-700 mb-6 leading-relaxed">
    {job.description}
  </p>
)}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-50 p-4 rounded-xl">
              <p className="text-sm text-gray-500 mb-1">Category</p>
              {editMode ? (
  <input
    type="text"
    value={job.category}
    onChange={(e) =>
      setJob({
        ...job,
        category: e.target.value
      })
    }
    className="w-full border p-2 rounded"
  />
) : (
  <p className="font-semibold text-gray-900">
    {job.category}
  </p>
)}
            </div>

            <div className="bg-gray-50 p-4 rounded-xl">
              <p className="text-sm text-gray-500 mb-1">Location</p>
              {editMode ? (
  <input
    type="text"
    value={job.location}
    onChange={(e) =>
      setJob({
        ...job,
        location: e.target.value
      })
    }
    className="w-full border p-2 rounded"
  />
) : (
  <p className="font-semibold text-gray-900">
    {job.location}
  </p>
)}
            </div>

            <div className="bg-gray-50 p-4 rounded-xl">
              <p className="text-sm text-gray-500 mb-1">Contact Name</p>
              {editMode ? (
  <input
    type="text"
    value={job.contactName}
    onChange={(e) =>
      setJob({
        ...job,
        contactName: e.target.value
      })
    }
    className="w-full border p-2 rounded"
  />
) : (
  <p className="font-semibold text-gray-900">
    {job.contactName}
  </p>
)}
            </div>

            <div className="bg-gray-50 p-4 rounded-xl">
              <p className="text-sm text-gray-500 mb-1">Contact Number</p>
              {editMode ? (
  <input
    type="text"
    value={job.contactNumber}
    onChange={(e) =>
      setJob({
        ...job,
        contactNumber: e.target.value
      })
    }
    className="w-full border p-2 rounded"
  />
) : (
  <p className="font-semibold text-gray-900">
    {job.contactNumber}
  </p>
)}
            </div>

            <div className="bg-gray-50 p-4 rounded-xl md:col-span-2">
              <p className="text-sm text-gray-500 mb-1">Contact Email</p>
              {editMode ? (
  <input
    type="email"
    value={job.contactEmail}
    onChange={(e) =>
      setJob({
        ...job,
        contactEmail: e.target.value
      })
    }
    className="w-full border p-2 rounded"
  />
) : (
  <p className="font-semibold text-gray-900">
    {job.contactEmail}
  </p>
)}
            </div>
          </div>

          {job.assignedTradesperson ? (
            <div className="bg-green-50 border border-green-200 p-4 rounded-xl mb-6">
              <p className="font-semibold text-green-700 mb-2">
                Assigned Tradesperson
              </p>
              <p className="text-gray-700">
                <strong>Name:</strong> {job.assignedTradesperson.name}
              </p>
              <p className="text-gray-700">
                <strong>Email:</strong> {job.assignedTradesperson.email}
              </p>
            </div>
          ) : (
            <div className="bg-blue-50 border border-blue-200 p-4 rounded-xl mb-6">
              <p className="text-blue-700 font-medium">
                No tradesperson has accepted this job yet.
              </p>
            </div>
          )}

          {isClosed && (
            <div className="bg-gray-100 border border-gray-200 p-4 rounded-xl mb-6">
              <p className="font-semibold text-gray-700">
                This job has been completed.
              </p>
            </div>
          )}

          {!isInProgress && !isClosed && (

  <div className="flex gap-3">

    {editMode ? (

      <button
        onClick={handleUpdate}
        disabled={loading}
        className="bg-green-600 text-white px-5 py-3 rounded-lg hover:bg-green-700"
      >
        {loading ? "Saving..." : "Save Changes"}
      </button>

    ) : (

      <button
        onClick={() => setEditMode(true)}
        className="bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700"
      >
        Edit Job
      </button>

    )}

    <button
      onClick={handleDelete}
      disabled={loading}
      className="bg-red-600 text-white px-5 py-3 rounded-lg hover:bg-red-700 transition disabled:opacity-50"
    >
      {loading ? "Deleting..." : "Delete Job"}
    </button>

  </div>
)}

          <button
            onClick={() => router.push("/homeowner/dashboard")}
            className="ml-3 border border-gray-300 text-gray-700 px-5 py-3 rounded-lg hover:bg-gray-50 transition"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}