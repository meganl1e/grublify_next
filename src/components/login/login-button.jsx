"use client";
import pkceChallenge from "pkce-challenge";
import { setCodeVerifier } from "./login-cookies";

export default function LoginButton() {
  const handleLogin = async () => {
    const shopId = process.env.NEXT_PUBLIC_SHOPIFY_SHOP_ID;
    const clientId = process.env.NEXT_PUBLIC_SHOPIFY_CLIENT_ID;
    const redirectUri = process.env.NEXT_PUBLIC_SHOPIFY_REDIRECT_URI;
    const scope = 'openid email customer-account-api:full' // Only valid scopes
    const state = crypto.randomUUID();
    const nonce = crypto.randomUUID();
    const { code_challenge, code_verifier } = await pkceChallenge();
    await setCodeVerifier(code_verifier);

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

  return <button onClick={handleLogin}>Login with Shopify</button>;
}
