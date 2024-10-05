import { Link } from "react-router-dom";

export default function Cancel() {
  return (
    <div className="flex flex-col items-center justify-center py-60">
      <h1 className="text-4xl font-bold mb-4 text-red-500">
        Checkout Canceled
      </h1>
      <p className="text-lg mb-4">
        Your checkout process has been canceled. If you have any questions, feel
        free to contact support.
      </p>
      <Link to={"/"} className="text-blue-500 hover:underline">
        Go back to Homepage
      </Link>
    </div>
  );
}
