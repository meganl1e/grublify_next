"use client";

export default function GlobalError({ error, reset }) {
  return (
    <div className="flex-1 w-full min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md mx-auto shadow-lg bg-white rounded-lg p-10 flex flex-col items-center">
        <h1 className="text-3xl font-bold text-secondary mb-4">Something went wrong</h1>
        <p className="text-base text-red-600 text-center mb-6">
          {error?.message || "An unexpected error occurred."}
        </p>
        <button
          onClick={() => reset()}
          className="inline-block px-6 py-3 rounded bg-secondary text-white font-semibold hover:bg-secondary/90 transition cursor-pointer"
          type="button"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
