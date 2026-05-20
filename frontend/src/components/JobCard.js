"use client";

import { useRouter } from "next/navigation";

export default function JobCard({ job }) {
  const router = useRouter();

  const handleViewDetails = () => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    if (!token || !user) {
      alert("Please login first to view job details");
      router.push("/login");
      return;
    }

    const parsedUser = JSON.parse(user);

    if (parsedUser.role === "homeowner") {
      router.push(`/jobs/${job._id}`);
    } else if (parsedUser.role === "tradesperson") {
      router.push(`/tradesperson/jobs/${job._id}`);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition duration-300">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div className="flex-1">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
            <h2 className="text-2xl font-bold text-gray-800">
              {job.title}
            </h2>

            <span
              className={`px-4 py-1 rounded-full text-sm font-semibold w-fit
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

          <p className="text-gray-600 leading-relaxed mb-5">
            {job.description}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="bg-gray-50 p-3 rounded-xl">
              <p className="text-gray-500 mb-1">Category</p>
              <p className="font-semibold text-gray-800">
                {job.category}
              </p>
            </div>

            <div className="bg-gray-50 p-3 rounded-xl">
              <p className="text-gray-500 mb-1">Location</p>
              <p className="font-semibold text-gray-800">
                {job.location}
              </p>
            </div>

            <div className="bg-gray-50 p-3 rounded-xl">
              <p className="text-gray-500 mb-1">Contact</p>
              <p className="font-semibold text-gray-800">
                {job.contactName}
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={handleViewDetails}
          className="bg-black hover:bg-gray-800 text-white px-6 py-3 rounded-xl text-center font-medium transition"
        >
          View Details
        </button>
      </div>
    </div>
  );
}