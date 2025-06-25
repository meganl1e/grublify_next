"use client";
import { useAuth } from '@/hooks/useAuth';
import pkceChallenge from "pkce-challenge";
import { CiUser } from "react-icons/ci";
import { CiLogout } from "react-icons/ci";

export default function ProfileButton() {
  const { isAuthenticated, user, loading, logout } = useAuth();

  const handleLogin = async () => {
    const shopId = process.env.NEXT_PUBLIC_SHOPIFY_SHOP_ID;
    const clientId = process.env.NEXT_PUBLIC_SHOPIFY_CLIENT_ID;
    let redirectUri = process.env.NEXT_PUBLIC_SHOPIFY_REDIRECT_URI; // need to change to grublify domain later
    const scope = 'openid email customer-account-api:full';
    const state = crypto.randomUUID();
    const nonce = crypto.randomUUID();
    const { code_challenge, code_verifier } = await pkceChallenge();

    // Set code_verifier cookie server-side
    await fetch('/api/auth/set-code-verifier', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code_verifier }),
    });

    // Store the current URL in a cookie (return_to)
    await fetch('/api/auth/set-return-to', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ return_to: window.location.pathname + window.location.search }),
    });

    const url = new URL(`https://shopify.com/authentication/${shopId}/oauth/authorize`);
    url.searchParams.append('scope', scope);
    url.searchParams.append('client_id', clientId);
    url.searchParams.append('response_type', 'code');
    url.searchParams.append('redirect_uri', redirectUri);
    url.searchParams.append('state', state);
    url.searchParams.append('nonce', nonce);
    url.searchParams.append('code_challenge', code_challenge);
    url.searchParams.append('code_challenge_method', 'S256');

    console.log('[handleLogin] url:', url.toString());

    window.location.href = url.toString();
  };

  if (loading) {
    return (
      <div className="w-8 h-8 animate-pulse bg-white/20 rounded-full"></div>
    );
  }

  // if user is authenticated and has a user object
  if (isAuthenticated && user) {
    return (
      <div className="relative group">
        <button className="flex items-center space-x-2 text-white/90 hover:text-white transition-colors">
          <CiUser className="w-8 h-8" />
          <span className="hidden md:block text-sm">{user.firstName || user.email}</span>
        </button>
        
        {/* Dropdown menu */}
        <div className="absolute right-0 mt-2 w-48 bg-secondary border border-white/20 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
          <div className="py-2">
            <div className="px-4 py-2 text-sm text-white/70 border-b border-white/10">
              {user.email}
            </div>
            <button
              onClick={logout}
              className="w-full text-left px-4 py-2 text-sm text-white/90 hover:text-white hover:bg-white/10 transition-colors flex items-center space-x-2"
            >
              <CiLogout className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // if user is not authenticated
  return (
    <button onClick={handleLogin}>
      <CiUser className="w-8 h-8 text-white/90 hover:text-white transition-colors cursor-pointer" />
    </button>
  );
}


