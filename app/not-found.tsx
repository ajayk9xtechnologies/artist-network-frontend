"use client"; // Error components must be Client Components

import Link from "next/link";
 
export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center text-[#1a103c]">
            <h1 className="text-6xl md:text-9xl font-header text-[#0d6efd] mb-4">
                404
            </h1>
            <h2 className="text-2xl md:text-4xl text-foreground">
                Page Not Found
            </h2>
            <p className="text-[#86b7fe] mb-8 font-medium text-center max-w-md px-4">
                Oops! The page you are looking for does not exist or has been moved.
            </p>

            <Link
                href="/"
                className="px-8 py-3 bg-[#0d6efd] text-white font-bold rounded-full hover:bg-[#86b7fe] transition-colors shadow-lg font-subheader tracking-wider"
            >
                Go Back Home
            </Link>
        </div>
    );
}
