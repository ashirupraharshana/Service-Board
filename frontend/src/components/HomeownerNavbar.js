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
    document.cookie =
      "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    router.push("/login");
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-white/95 backdrop-blur border-b border-gray-200 shadow-sm z-50">
      <div className="w-full px-6 md:px-8 py-4 flex justify-between items-center">
        <div className="flex items-center gap-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Homeowner Panel
            </h1>
            <p className="text-sm text-gray-500">
              Manage your service requests
            </p>
          </div>

          <div className="hidden md:flex items-center gap-5 text-sm font-medium">
            <Link
              href="/homeowner/dashboard"
              className="text-gray-700 hover:text-black transition"
            >
              Dashboard
            </Link>

            <Link
              href="/jobs/new"
              className="text-gray-700 hover:text-black transition"
            >
              Add Job
            </Link>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}