"use client";

import Link from "next/link";

export default function HomeownerJobCard({ job }) {

  return (

    <div className="bg-white p-5 rounded-lg shadow border">

      <div className="flex justify-between items-start">

        <div>

          <h2 className="text-2xl font-bold mb-2">
            {job.title}
          </h2>

          <p className="text-gray-600 mb-3">
            {job.description}
          </p>

          <div className="space-y-1 text-sm">

            <p>
              <strong>Category:</strong> {job.category}
            </p>

            <p>
              <strong>Location:</strong> {job.location}
            </p>

            <p>
              <strong>Status:</strong> {job.status}
            </p>

          </div>

        </div>

        <Link
          href={`/jobs/${job._id}`}
          className="bg-black text-white px-4 py-2 rounded"
        >
          View Details
        </Link>

      </div>

    </div>
  );
}