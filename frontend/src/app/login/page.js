"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import Link from "next/link";

import { loginUser } from "@/services/api";

export default function LoginPage() {

  const router = useRouter();

  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    email: "",
    password: ""
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

    const data = await loginUser(formData);

    // LOGIN FAILED
    if (!data.token) {

      setError(
        data.message || "Invalid email or password"
      );

      return;
    }

    // SAVE LOGIN
    localStorage.setItem("token", data.token);

    localStorage.setItem(
      "user",
      JSON.stringify(data)
    );

    // ROLE BASED REDIRECT
    if (data.role === "homeowner") {

      router.push("/homeowner/dashboard");

    } else if (data.role === "tradesperson") {

      router.push("/tradesperson/dashboard");

    } else {

      setError("Invalid user role");
    }
  };

  return (

    <div className="min-h-screen bg-gray-100 flex items-center justify-center">

      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow">

        <h1 className="text-3xl font-bold mb-6 text-center">
          Login
        </h1>

        {/* ERROR MESSAGE */}
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

          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded"
          >
            Login
          </button>

        </form>

        <p className="mt-4 text-center">

          Don't have an account?

          <Link
            href="/register"
            className="text-blue-600 ml-2"
          >
            Register
          </Link>

        </p>

      </div>

    </div>
  );
}