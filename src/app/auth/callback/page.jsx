import { redirect } from 'next/navigation';

// this is the page that is shown after the user is redirected from shopify

export default async function AuthCallback({ searchParams }) {
  const params = await searchParams;
  const code = params.code;
  const state = params.state;

  if (code) {
    // Redirect to the API route to handle the token exchange and cookie
    redirect(`/api/auth/callback?code=${encodeURIComponent(code)}&state=${encodeURIComponent(state || '')}`);
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-primary mb-4">Redirecting...</h1>
        <p className="text-gray-600 mb-4">Please wait while we log you in.</p>
      </div>
    </div>
  );
}

