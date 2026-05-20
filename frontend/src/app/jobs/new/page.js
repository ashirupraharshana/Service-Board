"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import HomeownerNavbar from "@/components/HomeownerNavbar";
import { createJob } from "@/services/api";

export default function NewJobPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    location: "",
    contactName: "",
    contactEmail: "",
    contactNumber: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validateForm = () => {
    if (!formData.title.trim()) {
      return "Job title is required";
    }

    if (!formData.description.trim()) {
      return "Job description is required";
    }

    if (!formData.category) {
      return "Please select a job category";
    }

    if (!formData.location.trim()) {
      return "Location is required";
    }

    if (!formData.contactName.trim()) {
      return "Contact name is required";
    }

    if (!formData.contactEmail.trim()) {
      return "Contact email is required";
    }

    if (!/^\S+@\S+\.\S+$/.test(formData.contactEmail)) {
      return "Please enter a valid email address";
    }

    if (!formData.contactNumber.trim()) {
      return "Contact number is required";
    }

    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    const validationError = validateForm();

    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setLoading(true);

      await createJob(formData);

      alert("Job created successfully");

      router.push("/homeowner/dashboard");
    } catch (error) {
      console.log(error);

      setError(
        error.message || "Failed to create job. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <HomeownerNavbar />

      <div className="max-w-2xl mx-auto px-6 pt-28 pb-10">
        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-200">
          <h1 className="text-3xl font-bold mb-2 text-gray-900">
            Create New Job
          </h1>

          <p className="text-gray-500 mb-6">
            Add a service request for tradespeople to view and accept.
          </p>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block mb-2 font-medium text-gray-700">
                Job Title
              </label>

              <input
                type="text"
                name="title"
                placeholder="Example: Need a plumber for leaking tap"
                value={formData.title}
                onChange={handleChange}
                className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium text-gray-700">
                Description
              </label>

              <textarea
                name="description"
                placeholder="Describe the service request..."
                value={formData.description}
                onChange={handleChange}
                rows={5}
                className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium text-gray-700">
                Category
              </label>

              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full border border-gray-300 p-3 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-black"
              >
                <option value="">Select Category</option>
                <option value="Plumbing">Plumbing</option>
                <option value="Electrical">Electrical</option>
                <option value="Painting">Painting</option>
                <option value="Joinery">Joinery</option>
                <option value="Cleaning">Cleaning</option>
                <option value="Gardening">Gardening</option>
              </select>
            </div>

            <div>
              <label className="block mb-2 font-medium text-gray-700">
                Location
              </label>

              <input
                type="text"
                name="location"
                placeholder="Example: Glasgow"
                value={formData.location}
                onChange={handleChange}
                className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium text-gray-700">
                Contact Name
              </label>

              <input
                type="text"
                name="contactName"
                placeholder="Enter contact name"
                value={formData.contactName}
                onChange={handleChange}
                className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium text-gray-700">
                Contact Email
              </label>

              <input
                type="email"
                name="contactEmail"
                placeholder="Enter contact email"
                value={formData.contactEmail}
                onChange={handleChange}
                className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium text-gray-700">
                Contact Number
              </label>

              <input
                type="text"
                name="contactNumber"
                placeholder="Enter contact number"
                value={formData.contactNumber}
                onChange={handleChange}
                className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            <div className="flex gap-3 pt-3">
              <button
                type="submit"
                disabled={loading}
                className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition disabled:opacity-50"
              >
                {loading ? "Creating..." : "Create Job"}
              </button>

              <button
                type="button"
                onClick={() => router.push("/homeowner/dashboard")}
                className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition"
              >
                Back
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}