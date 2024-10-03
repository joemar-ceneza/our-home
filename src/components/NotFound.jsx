import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-60">
      <h1 className="text-6xl font-bold text-red-500">404</h1>
      <h2 className="text-2xl mt-4">Page Not Found</h2>
      <p className="mt-2 text-gray-700">
        Sorry, the page you are looking for does not exist.
      </p>
      <Link to={"/"} className="mt-4 text-blue-500 hover:underline">
        Go back to Homepage
      </Link>
    </div>
  );
}
