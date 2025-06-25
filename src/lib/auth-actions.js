"use server";
import { cookies } from 'next/headers';

// server side functions aka actions that manage auth related cookies and user state

// set code verifier cookie used for pkce in oauth
// this is before redirecting to shopify for login
export async function setCodeVerifier(value) {
  cookies().set({
    name: 'code_verifier',
    value: value,
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'lax',
    path: '/auth/callback',
    maxAge: 300 // 5 minutes
  });
}

// sets customer token after successful auth
// used to identify the logged in user
// https only, secure, lasts 1 week
export async function saveCustomerToken(value) {
  cookies().set('customer_token', value, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 1 week
  });
}

// deletes customer token cookie
// logs out user
export async function clearCustomerToken() {
  cookies().delete('customer_token');
}

// deletes code verifier cookie
// cleanup after login flow
export async function clearCodeVerifier() {
  cookies().delete('code_verifier');
}

// reads and returns customer token cookie
export async function getCustomerToken() {
  const cookieStore = await cookies();
  return cookieStore.get('customer_token')?.value;
}

// logs out user
export async function logout() {
  try {
    clearCustomerToken();
    return { success: true };
  } catch (error) {
    console.error('Logout error:', error);
    return { error: 'Logout failed' };
  }
}

// reads customer token cookie
// if success, fetch current user profile from shopify
export async function getCurrentUser() {
  try {
    console.log('[getCurrentUser] Called');
    const customerToken = await getCustomerToken();
    console.log('[getCurrentUser] customer_token:', customerToken);

    if (!customerToken) {
      console.log('[getCurrentUser] No customer_token found');
      return null;
    }

    // Verify token with Shopify Customer Account API
    const response = await fetch('https://shopify.com/89415844210/account/customer/api/2025-04/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${customerToken}`,
      },
      body: JSON.stringify({
        query: `
          query {
            customer {
              emailAddress { 
                emailAddress
              }
              id
              firstName
              lastName
            }
          }
        `
      })
    });

    console.log('[getCurrentUser] Shopify API response status:', response.status);
    console.log('[getCurrentUser] Response headers:', Object.fromEntries(response.headers.entries()));

    if (!response.ok) {
      const errorText = await response.text();
      console.log('[getCurrentUser] Shopify API error response:', errorText);
      return null;
    }

    const data = await response.json();
    if (data.errors || !data.data?.customer) {
      console.log('[getCurrentUser] Shopify API GraphQL errors:', data.errors);
      return null;
    }
    console.log('[getCurrentUser] Shopify API GraphQL data:', data.data.customer);
    return data.data.customer;

  } catch (error) {
    console.error('[getCurrentUser] Auth check error:', error);
    return null;
  }
} 