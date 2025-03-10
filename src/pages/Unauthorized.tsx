import { Link } from "react-router-dom";
import { FaLock } from "react-icons/fa";

const Unauthorized = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center p-6">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md">
        <FaLock className="text-red-500 text-6xl mb-4" />
        <h1 className="text-3xl font-bold text-gray-800">Access Denied</h1>
        <p className="text-gray-600 mt-2">
          You do not have permission to view this page.
        </p>
        <Link
          to="/"
          className="mt-6 inline-block bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full transition"
        >
          Go to Homepage
        </Link>
      </div>
    </div>
  );
};

export default Unauthorized;
