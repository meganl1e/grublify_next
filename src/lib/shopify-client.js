// import {createStorefrontClient} from '@shopify/hydrogen-react';
import { createStorefrontClient } from '@shopify/hydrogen-react/storefront-client';


export const client = createStorefrontClient({
  storeDomain: process.env.NEXT_PUBLIC_PUBLIC_SHOPIFY_DOMAIN,
  publicStorefrontToken: process.env.NEXT_PUBLIC_PUBLIC_STOREFRONT_API_TOKEN,
  privateStorefrontToken: process.env.PRIVATE_STOREFRONT_API_TOKEN,
});

export async function shopifyFetch({query, variables = {}}) {

  const response = await fetch(client.getStorefrontApiUrl(), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...client.getPrivateTokenHeaders(),
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });
  const json = await response.json();
  if (json.errors) {
    console.error(json.errors);
    throw new Error('Shopify API error');
  }
  return json.data;
}