import Link from "next/link";

const NotFound = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center  px-4 text-center">
      <h1 className="text-8xl font-extrabold text-red-600 md:text-9xl">
        404
      </h1>

      <h2 className="mt-4 text-2xl font-bold text-gray-800 md:text-3xl">
        Oops! Page Not Found
      </h2>

      <p className="mt-3 max-w-md text-gray-600">
        দুঃখিত! তুমি যে পেজটি খুঁজছো, সেটি খুঁজে পাওয়া যায়নি।
        The page you are looking for doesn't exist.
      </p>

      <Link
        href="/"
        className="btn mt-6 border-none bg-red-600 px-8 text-white hover:bg-red-700"
      >
        ← Back to Home
      </Link>
    </div>
  );
};

export default NotFound;