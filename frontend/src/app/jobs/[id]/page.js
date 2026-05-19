"use client";

import { useEffect, useState } from "react";

import { useParams, useRouter } from "next/navigation";

import HomeownerNavbar from "@/components/HomeownerNavbar";

import {
  getJobById,
  updateJobStatus,
  deleteJob
} from "@/services/api";

export default function JobDetailsPage() {

  const params = useParams();

  const router = useRouter();

  const [job, setJob] = useState(null);

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

      await deleteJob(params.id);

      router.push("/homeowner/dashboard");

    } catch (error) {

      console.log(error);

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
    <>
    <HomeownerNavbar />

    <div className="bg-white p-6 rounded-lg shadow max-w-3xl mx-auto">

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

  

      {job.status !== "In Progress" && (
  <button
    onClick={handleDelete}
    className="bg-red-600 text-white px-5 py-2 rounded hover:bg-red-700"
  >
    Delete Job
  </button>
)}

    </div>
    </>
  );
}