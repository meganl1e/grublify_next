import { NextResponse } from 'next/server';
import { getIdToken } from '@/lib/auth-actions';
import { cookies } from 'next/headers';

export async function GET(request) {
  const cookieStore = await cookies();
  const idToken = await getIdToken();
  const shopId = process.env.NEXT_PUBLIC_SHOPIFY_SHOP_ID;

  // Use the same 'return_to' cookie as login
  const rawReturnTo = cookieStore.get('return_to')?.value || '/';
  const returnTo = decodeURIComponent(rawReturnTo);
  const ngrokUrl = 'https://b833-2600-1700-2806-e010-9179-632e-9857-3bba.ngrok-free.app/auth/callback';
  const redirectUrl = new URL(returnTo, ngrokUrl);
  // const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  // const absoluteRedirectUrl = `${baseUrl}${returnTo.startsWith('/') ? returnTo : '/' + returnTo}`;
  // const postLogoutRedirectUri = encodeURIComponent(absoluteRedirectUrl);
  console.log("link to redirect", redirectUrl);

  // Clear cookies
  await cookieStore.delete('customer_token');
  await cookieStore.delete('id_token');
  await cookieStore.delete('return_to');

  if (!idToken) {
    return NextResponse.redirect(redirectUrl.toString());
  }

  const logoutUrl = `https://shopify.com/authentication/${shopId}/logout?id_token_hint=${idToken}&post_logout_redirect_uri=${redirectUrl}`;
  return NextResponse.redirect(logoutUrl);
}