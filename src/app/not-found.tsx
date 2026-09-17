import Link from "next/link";

export const metadata = {
  title: "Page Not Found | WUD Memecoin",
  description: "The page you're looking for does not exist. Navigate back to the WUD Memecoin homepage.",
  robots: "noindex, follow",
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white p-4">
      <h1 className="text-4xl md:text-6xl font-bold text-[#ff2e70] mb-4">404</h1>
      <h2 className="text-2xl md:text-3xl font-bold mb-6">Page Not Found</h2>
      <p className="text-lg text-gray-300 mb-8 text-center max-w-md">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="bg-[#ff2e70] hover:bg-[#ff2e70]/80 text-white font-bold px-8 py-3 rounded-lg text-lg transform hover:scale-105 transition-transform shadow-lg shadow-[#ff2e70]/20"
      >
        Back to Homepage
      </Link>
    </div>
  );
} 