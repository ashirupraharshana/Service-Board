import Link from "next/link";

export default function AuthRequiredPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-6">
      <div className="bg-white max-w-md w-full p-8 rounded-2xl shadow-sm border border-gray-200 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Authentication Required
        </h1>

        <p className="text-gray-600 mb-6">
          You need to login before accessing this page.
        </p>

        <div className="flex gap-3 justify-center">
          <Link
            href="/login"
            className="bg-black text-white px-5 py-3 rounded-lg hover:bg-gray-800"
          >
            Login
          </Link>

          <Link
            href="/"
            className="border border-gray-300 text-gray-700 px-5 py-3 rounded-lg hover:bg-gray-50"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}