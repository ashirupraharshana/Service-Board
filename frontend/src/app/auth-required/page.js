export default function AuthRequiredPage() {

  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-10 rounded-xl shadow text-center">

        <h1 className="text-3xl font-bold text-red-600 mb-4">
          Authentication Required
        </h1>

        <p className="text-gray-600 mb-6">
          You must login to access this page.
        </p>

        <a
          href="/login"
          className="bg-black text-white px-6 py-3 rounded-lg"
        >
          Go to Login
        </a>

      </div>

    </div>
  );
}