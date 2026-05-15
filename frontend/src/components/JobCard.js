import Link from "next/link";

export default function JobCard({ job }) {
  return (
    <div className="border rounded-lg p-4 shadow bg-white">
      <h2 className="text-xl font-bold mb-2">{job.title}</h2>

      <p className="text-gray-600 mb-2">
        {job.description}
      </p>

      <div className="space-y-1 text-sm mb-4">
        <p><strong>Category:</strong> {job.category}</p>
        <p><strong>Location:</strong> {job.location}</p>
        <p><strong>Status:</strong> {job.status}</p>
      </div>

      <Link
        href={`/jobs/${job._id}`}
        className="bg-black text-white px-4 py-2 rounded"
      >
        View Details
      </Link>
    </div>
  );
}