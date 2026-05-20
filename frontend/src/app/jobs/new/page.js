"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import HomeownerNavbar from "@/components/HomeownerNavbar";

import { createJob } from "@/services/api";

export default function NewJobPage() {

  const router = useRouter();

  const [loading, setLoading] = useState(false);

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

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      await createJob(formData);

      alert("Job created successfully");

      router.push("/homeowner/dashboard");

    } catch (error) {

      console.log(error);

      alert(error.message);

    } finally {

      setLoading(false);
    }
  };

  return (

    <div className="min-h-screen bg-gray-100">

      <HomeownerNavbar />

      <div className="max-w-2xl mx-auto mt-10 bg-white p-8 rounded-2xl shadow-lg">

        <h1 className="text-4xl font-bold mb-2 text-center">
          Create New Job
        </h1>

        <p className="text-gray-500 text-center mb-8">
          Add a new service request for tradespeople
        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          {/* TITLE */}
          <div>

            <label className="block mb-2 font-semibold">
              Job Title
            </label>

            <input
              type="text"
              name="title"
              placeholder="Enter job title"
              required
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />

          </div>

          {/* DESCRIPTION */}
          <div>

            <label className="block mb-2 font-semibold">
              Description
            </label>

            <textarea
              name="description"
              placeholder="Describe the job..."
              required
              rows={5}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />

          </div>

          {/* CATEGORY */}
          <div>

            <label className="block mb-2 font-semibold">
              Category
            </label>

            <select
              name="category"
              required
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            >

              <option value="">
                Select Category
              </option>

              <option value="Plumbing">
                Plumbing
              </option>

              <option value="Electrical">
                Electrical
              </option>

              <option value="Painting">
                Painting
              </option>

              <option value="Joinery">
                Joinery
              </option>

              <option value="Cleaning">
                Cleaning
              </option>

              <option value="Gardening">
                Gardening
              </option>

            </select>

          </div>

          {/* LOCATION */}
          <div>

            <label className="block mb-2 font-semibold">
              Location
            </label>

            <input
              type="text"
              name="location"
              placeholder="Enter location"
              required
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />

          </div>

          {/* CONTACT NAME */}
          <div>

            <label className="block mb-2 font-semibold">
              Contact Name
            </label>

            <input
              type="text"
              name="contactName"
              placeholder="Enter contact name"
              required
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />

          </div>

          {/* CONTACT EMAIL */}
          <div>

            <label className="block mb-2 font-semibold">
              Contact Email
            </label>

            <input
              type="email"
              name="contactEmail"
              placeholder="Enter contact email"
              required
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />

          </div>

          {/* CONTACT NUMBER */}
          <div>

            <label className="block mb-2 font-semibold">
              Contact Number
            </label>

            <input
              type="text"
              name="contactNumber"
              placeholder="Enter contact number"
              required
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />

          </div>

          {/* BUTTONS */}
          <div className="flex gap-4 pt-4">

            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition"
            >
              {loading
                ? "Creating..."
                : "Create Job"}
            </button>

            <button
              type="button"
              onClick={() =>
                router.push("/homeowner/dashboard")
              }
              className="flex-1 border border-gray-400 py-3 rounded-lg hover:bg-gray-100 transition"
            >
              Back
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}