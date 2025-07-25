export default function NotFound() {

  return (
    <div className="flex-1 w-full h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md mx-4 shadow-lg bg-white rounded-lg p-10 flex flex-col items-center">
        <h1 className="text-3xl font-bold text-secondary mb-2">404 - Not Found</h1>
        <p className="text-base text-gray-600 text-center mb-6">
          Sorry, we couldn't find that page.<br />
          Try checking the URL or return to the homepage.
        </p>
        <a
          href="/"
          className="inline-block px-4 py-2 rounded bg-secondary text-white font-semibold hover:bg-secondary/90 transition"
        >
          Go to Homepage
        </a>
      </div>
    </div>
  );
}

