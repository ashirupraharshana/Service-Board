"use client";

import Link from "next/link";

import { useEffect, useState } from "react";

export default function Navbar() {

  const [user, setUser] = useState(null);

  useEffect(() => {

    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

  }, []);

  const logout = () => {

    localStorage.removeItem("token");

    localStorage.removeItem("user");

    window.location.href = "/login";
  };

  return (

    <nav className="bg-black text-white p-4">

      <div className="max-w-6xl mx-auto flex justify-between items-center">

        <Link
          href="/"
          className="text-xl font-bold"
        >
          Service Board
        </Link>

        <div className="flex gap-4 items-center">

          <Link href="/">
            Home
          </Link>

          <Link href="/jobs/new">
            New Job
          </Link>

          {!user ? (
            <>
              <Link href="/login">
                Login
              </Link>

              <Link href="/register">
                Register
              </Link>
            </>
          ) : (
            <>
              <span>
                {user.name}
              </span>

              <button
                onClick={logout}
                className="bg-red-600 px-3 py-1 rounded"
              >
                Logout
              </button>
            </>
          )}

        </div>
      </div>
    </nav>
  );
}