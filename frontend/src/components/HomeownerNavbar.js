"use client";

import Link from "next/link";

import { useRouter } from "next/navigation";

import { useEffect } from "react";

export default function HomeownerNavbar() {

  const router = useRouter();

  useEffect(() => {

    const token = localStorage.getItem("token");

    if (!token) {

      router.push("/login");
    }

  }, [router]);

  const handleLogout = () => {

    localStorage.removeItem("token");

    localStorage.removeItem("user");

    router.push("/login");
  };

  return (

    <nav className="w-full bg-black text-white">

      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        <h1 className="text-2xl font-bold">
          Homeowner Panel
        </h1>

        <div className="flex items-center gap-6">

          <Link href="/homeowner/dashboard">
            Dashboard
          </Link>

          <Link href="/jobs/new">
            Add Job
          </Link>

          <button
            onClick={handleLogout}
            className="bg-red-600 px-4 py-2 rounded"
          >
            Logout
          </button>

        </div>

      </div>

    </nav>
  );
}