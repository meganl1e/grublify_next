import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');
    const state = searchParams.get('state');

    const cookieStore = await cookies();
    const codeVerifier = cookieStore.get('code_verifier')?.value;
    const returnTo = cookieStore.get('return_to')?.value || '/';

    const shopId = process.env.NEXT_PUBLIC_SHOPIFY_SHOP_ID;
    const clientId = process.env.NEXT_PUBLIC_SHOPIFY_CLIENT_ID;
    const redirectUri = process.env.NEXT_PUBLIC_SHOPIFY_REDIRECT_URI;

    // Debug logging
    console.log('[Shopify Auth Callback] code:', code);
    console.log('[Shopify Auth Callback] code_verifier:', codeVerifier);
    console.log('[Shopify Auth Callback] redirect_uri:', redirectUri);
    console.log('[Shopify Auth Callback] return_to:', returnTo);

    const bodyParams = new URLSearchParams();
    bodyParams.append('grant_type', 'authorization_code');
    bodyParams.append('client_id', clientId);
    bodyParams.append('redirect_uri', redirectUri);
    bodyParams.append('code', code);
    bodyParams.append('code_verifier', codeVerifier);

    const response = await fetch(`https://shopify.com/authentication/${shopId}/oauth/token`, {
      method: 'POST',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      body: bodyParams.toString(),
    });

    const data = await response.json();

    if (data.access_token) {
      await cookieStore.set('customer_token', data.access_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // 1 week
      });
      await cookieStore.delete('code_verifier');
      await cookieStore.delete('return_to');
      
      // Always use the ngrok URL as the base
      const ngrokUrl = 'https://b833-2600-1700-2806-e010-9179-632e-9857-3bba.ngrok-free.app/auth/callback';
      const redirectUrl = new URL(returnTo, ngrokUrl);
      console.log('[Shopify Auth Callback] Final redirect URL:', redirectUrl.toString());
      return NextResponse.redirect(redirectUrl.toString());
    } else {
      // Show a debug error page
      return new NextResponse(
        `<!DOCTYPE html><html><body style="font-family:sans-serif;text-align:center;padding:2rem;">
          <h1 style="color:#e11d48;">Authentication Failed</h1>
          <p><b>Reason:</b> ${data.error_description || data.error || 'Unknown error'}</p>
          <pre style="background:#f3f4f6;padding:1rem;border-radius:8px;overflow-x:auto;">code: ${code}\ncode_verifier: ${codeVerifier}\nredirect_uri: ${redirectUri}</pre>
          <a href="/" style="color:#2563eb;">Return to Home</a>
        </body></html>`,
        { status: 401, headers: { 'content-type': 'text/html' } }
      );
    }
  } catch (err) {
    console.error('[Shopify Auth Callback] Unexpected error:', err);
    return new NextResponse(
      `<!DOCTYPE html><html><body style="font-family:sans-serif;text-align:center;padding:2rem;">
        <h1 style="color:#e11d48;">Unexpected Error</h1>
        <p>${err.message || err.toString()}</p>
        <a href="/" style="color:#2563eb;">Return to Home</a>
      </body></html>`,
      { status: 500, headers: { 'content-type': 'text/html' } }
    );
  }
} 