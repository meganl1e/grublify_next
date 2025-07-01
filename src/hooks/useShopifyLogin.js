"use client";
import pkceChallenge from 'pkce-challenge';

export function useShopifyLogin() {
  return async function login() {
    const shopId = process.env.NEXT_PUBLIC_SHOPIFY_SHOP_ID;
    const clientId = process.env.NEXT_PUBLIC_SHOPIFY_CLIENT_ID;
    const redirectUri = process.env.NEXT_PUBLIC_SHOPIFY_REDIRECT_URI;
    const scope = 'openid email customer-account-api:full';
    const timestamp = Date.now().toString();
    const randomString = Math.random().toString(36).substring(2);
    const state = timestamp + randomString;
    const nonce = crypto.randomUUID();
    const { code_challenge, code_verifier } = await pkceChallenge();

    await fetch('/api/auth/set-code-verifier', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code_verifier }),
    });
    
    await fetch('/api/auth/set-state', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ state }),
    });

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

    window.location.href = url.toString();
  };
}