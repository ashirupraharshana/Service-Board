"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import HomeownerNavbar from "@/components/HomeownerNavbar";

import { createJob } from "@/services/api";

export default function NewJobPage() {

  const router = useRouter();

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

    await createJob(formData);

    router.push("/homeowner/dashboard");
  };

  return (
    <>
    <HomeownerNavbar />
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow">
      <h1 className="text-3xl font-bold mb-6">
        Create New Job
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          type="text"
          name="title"
          placeholder="Title"
          required
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <textarea
          name="description"
          placeholder="Description"
          required
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <select
  name="category"
  onChange={handleChange}
  className="w-full border p-3 rounded"
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

</select>

        <input
          type="text"
          name="location"
          placeholder="Location"
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <input
          type="text"
          name="contactName"
          placeholder="Contact Name"
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <input
          type="email"
          name="contactEmail"
          placeholder="Contact Email"
          required
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <input
  type="text"
  name="contactNumber"
  placeholder="Contact Number"
  onChange={handleChange}
  className="w-full border p-3 rounded"
/>

        <button
          type="submit"
          className="bg-black text-white px-6 py-3 rounded"
        >
          Create Job
        </button>

      </form>
    </div>
    </>
  );
}