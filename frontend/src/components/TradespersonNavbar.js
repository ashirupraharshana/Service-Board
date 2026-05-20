"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function TradespersonNavbar() {
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      window.location.href = "/login";
    }
  }, []);

const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");

  document.cookie =
    "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";

  window.location.href = "/";
};

  return (
    <nav className="fixed top-0 left-0 w-full bg-white/95 backdrop-blur border-b border-gray-200 shadow-sm z-50">
      <div className="w-full px-6 md:px-8 py-4 flex justify-between items-center">
        <div className="flex items-center gap-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Tradesperson Panel
            </h1>
            <p className="text-sm text-gray-500">
              Manage service requests
            </p>
          </div>

          <div className="hidden md:flex items-center gap-5 text-sm font-medium">
            <Link
              href="/tradesperson/dashboard"
              className="text-gray-700 hover:text-black transition"
            >
              Dashboard
            </Link>

            <Link
              href="/tradesperson/my-jobs"
              className="text-gray-700 hover:text-black transition"
            >
              My Jobs
            </Link>
          </div>
        </div>

        <button
          onClick={logout}
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}