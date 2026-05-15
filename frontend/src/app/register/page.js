"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import { registerUser } from "@/services/api";

export default function RegisterPage() {

  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "homeowner"
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    const data = await registerUser(formData);

    localStorage.setItem("token", data.token);

    localStorage.setItem(
      "user",
      JSON.stringify(data)
    );

    router.push("/");
  };

  return (

    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">

      <h1 className="text-3xl font-bold mb-6">
        Register
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >

        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={handleChange}
          required
          className="w-full border p-3 rounded"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
          className="w-full border p-3 rounded"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
          className="w-full border p-3 rounded"
        />

        <select
          name="role"
          onChange={handleChange}
          className="w-full border p-3 rounded"
        >
          <option value="homeowner">
            Homeowner
          </option>

          <option value="tradesperson">
            Tradesperson
          </option>
        </select>

        <button
          type="submit"
          className="bg-black text-white px-5 py-3 rounded"
        >
          Register
        </button>

      </form>

    </div>
  );
}