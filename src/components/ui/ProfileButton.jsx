"use client";
import { useAuth } from '@/hooks/useAuth';
import pkceChallenge from "pkce-challenge";
import { CiUser } from "react-icons/ci";
import React from "react";
import { useEffect, useRef } from "react";
import AuthErrorModal from "./AuthErrorModal";
import ProfileDropdown from "./ProfileDropdown";
import { useShopifyLogin } from '@/hooks/useShopifyLogin';

export default function ProfileButton() {
  const { isAuthenticated, user, loading, logout, error } = useAuth();
  const [showError, setShowError] = React.useState(true);
  const [showDropdown, setShowDropdown] = React.useState(false);
  const buttonRef = useRef(null);
  const dropdownRef = useRef(null);
  const closeTimeout = useRef(null);

  // Handle outside click to close dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setShowDropdown(false);
      }
    }
    if (showDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showDropdown]);

  // Delayed close on mouse leave
  const handleMouseLeave = () => {
    closeTimeout.current = setTimeout(() => setShowDropdown(false), 200);
  };
  const handleMouseEnter = () => {
    if (closeTimeout.current) {
      clearTimeout(closeTimeout.current);
      closeTimeout.current = null;
    }
    setShowDropdown(true);
  };

  const login = useShopifyLogin();

  // const handleLogin = async () => {
  //   const shopId = process.env.NEXT_PUBLIC_SHOPIFY_SHOP_ID;
  //   const clientId = process.env.NEXT_PUBLIC_SHOPIFY_CLIENT_ID;
  //   let redirectUri = process.env.NEXT_PUBLIC_SHOPIFY_REDIRECT_URI;
  //   const scope = 'openid email customer-account-api:full';
  //   const timestamp = Date.now().toString();
  //   const randomString = Math.random().toString(36).substring(2);
  //   const state = timestamp + randomString;
  //   const nonce = crypto.randomUUID();
  //   const { code_challenge, code_verifier } = await pkceChallenge();

  //   // Set code_verifier cookie server-side
  //   await fetch('/api/auth/set-code-verifier', {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({ code_verifier }),
  //   });

  //   // Set state cookie server-side
  //   await fetch('/api/auth/set-state', {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({ state }),
  //   });

  //   // Store the current URL in a cookie (return_to)
  //   await fetch('/api/auth/set-return-to', {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({ return_to: window.location.pathname + window.location.search }),
  //   });

  //   const url = new URL(`https://shopify.com/authentication/${shopId}/oauth/authorize`);
  //   url.searchParams.append('scope', scope);
  //   url.searchParams.append('client_id', clientId);
  //   url.searchParams.append('response_type', 'code');
  //   url.searchParams.append('redirect_uri', redirectUri);
  //   url.searchParams.append('state', state);
  //   url.searchParams.append('nonce', nonce);
  //   url.searchParams.append('code_challenge', code_challenge);
  //   url.searchParams.append('code_challenge_method', 'S256');

  //   console.log('[handleLogin] url:', url.toString());

  //   window.location.href = url.toString();
  // };

  if (loading) {
    return (
      <div className="w-8 h-8 animate-pulse bg-white/20 rounded-full"></div>
    );
  }

  // Show error modal if there is an authentication error
  if (error && showError) {
    return (
      <AuthErrorModal
        error={error}
        onLogout={() => { logout(); setShowError(false); }}
        open={showError}
      />
    );
  }

  // Always show dropdown button, regardless of authentication status
  return (
    <a
      href="https://account.grublify.com"
      className="flex items-center text-white/90 hover:text-white transition-colors"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Account"
    >
      <CiUser className="w-8 h-8" />
    </a>
  );
}


