import { Link } from "react-router-dom";

export default function Cancel() {
  return (
    <div className="flex flex-col items-center justify-center text-center py-60 px-4">
      <h1 className="font-serif text-4xl sm:text-5xl text-ink mb-4">
        Checkout canceled
      </h1>
      <p className="text-muted max-w-md mb-8">
        Your checkout was canceled and you haven't been charged. If you have any
        questions, feel free to contact support.
      </p>
      <Link
        to={"/"}
        className="bg-clay hover:bg-clay-dark transition-colors text-white px-8 py-3 rounded-full">
        Back to homepage
      </Link>
    </div>
  );
}
