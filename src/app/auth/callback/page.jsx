import { cookies } from 'next/headers';

export default async function AuthCallback({ searchParams }) {
  const { code, state } = await searchParams;
  const cookieStore = await cookies();
  const codeVerifier = cookieStore.get("code_verifier")?.value;


  const shopId = process.env.NEXT_PUBLIC_SHOPIFY_SHOP_ID;
  const clientId = process.env.NEXT_PUBLIC_SHOPIFY_CLIENT_ID;
  const redirectUri = process.env.NEXT_PUBLIC_SHOPIFY_REDIRECT_URI;

  
  // For debugging - verify values before sending
  console.log("Client ID:", clientId);
  console.log("Redirect URI:", redirectUri);
  console.log("Code Verifier:", codeVerifier);

  
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
    body: bodyParams.toString()
    })
  ;

  const data = await response.json();
  console.log("Token Response:", data);


  // Now you can use `code` and `state` as needed
  return (
    <div>
      <div>Code: {code}</div>
    </div>
    
  )
}

