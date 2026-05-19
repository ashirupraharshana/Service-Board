"use client";

import Link from "next/link";

export default function TradespersonNavbar() {
  const logout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  localStorage.removeItem("token");

localStorage.removeItem("user");

document.cookie =
  "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";

router.push("/login");
  return (
    <nav className="fixed top-0 left-0 w-full bg-green-700 text-white shadow z-50">
      <div className="w-full flex justify-between items-center px-8 py-4">
        
        <div className="flex gap-6 items-center">
          <h1 className="text-2xl font-bold">
            Tradesperson Panel
          </h1>

          <Link href="/tradesperson/dashboard">
            Dashboard
          </Link>
        </div>

        <button
          onClick={logout}
          className="bg-red-600 px-4 py-2 rounded"
        >
          Logout
        </button>

      </div>
    </nav>
  );
}