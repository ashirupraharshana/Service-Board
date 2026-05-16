"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import { loginUser } from "@/services/api";

export default function LoginPage() {

  const router = useRouter();

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

    const data = await loginUser(formData);

    localStorage.setItem("token", data.token);

    localStorage.setItem(
      "user",
      JSON.stringify(data)
    );

    if (data.role === "homeowner") {

  router.push("/homeowner/dashboard");

} else {

  router.push("/tradesperson/dashboard");
}
  };

  return (

    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">

      <h1 className="text-3xl font-bold mb-6">
        Login
      </h1>

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
          className="bg-black text-white px-5 py-3 rounded"
        >
          Login
        </button>

      </form>

    </div>
  );
}