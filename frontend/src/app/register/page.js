"use client";

import { useState } from "react";

import Link from "next/link";

import { useRouter } from "next/navigation";

import { registerUser } from "@/services/api";

export default function RegisterPage() {

  const router = useRouter();

  const [error, setError] = useState("");

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

    setError("");

    const data = await registerUser(formData);

    if (!data.token) {

      setError(
        data.message || "Registration failed"
      );

      return;
    }

    localStorage.setItem("token", data.token);

    localStorage.setItem(
      "user",
      JSON.stringify(data)
    );

    // ROLE BASED REDIRECT
    if (data.role === "homeowner") {

      router.push("/homeowner/dashboard");

    } else {

      router.push("/tradesperson/dashboard");
    }
  };

  return (

    <div className="min-h-screen bg-gray-100 flex items-center justify-center">

      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">

        <h1 className="text-4xl font-bold text-center mb-6">
          Create Account
        </h1>

        {error && (

          <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
            {error}
          </div>

        )}

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
            required
            className="w-full border p-3 rounded-lg"
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            onChange={handleChange}
            required
            className="w-full border p-3 rounded-lg"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
            className="w-full border p-3 rounded-lg"
          />

          <select
            name="role"
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
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
            className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800"
          >
            Register
          </button>

        </form>

        <p className="text-center mt-5">

          Already have an account?

          <Link
            href="/login"
            className="text-blue-600 ml-2"
          >
            Login
          </Link>

        </p>

      </div>

    </div>
  );
}