import { Link } from "react-router-dom";

export default function NotFound({ message }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-60 px-4">
      <h1 className="font-serif text-6xl text-clay">404</h1>
      <h2 className="font-serif text-2xl text-ink mt-4">Page not found</h2>
      <p className="mt-2 text-muted">
        {message ?? "Sorry, the page you are looking for does not exist."}
      </p>
      <Link
        to={"/"}
        className="mt-6 bg-clay hover:bg-clay-dark transition-colors text-white px-8 py-3 rounded-full">
        Back to homepage
      </Link>
    </div>
  );
}
