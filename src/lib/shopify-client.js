// import {createStorefrontClient} from '@shopify/hydrogen-react';
import { createStorefrontClient } from '@shopify/hydrogen-react/storefront-client';


export const client = createStorefrontClient({
  storeDomain: process.env.NEXT_PUBLIC_PUBLIC_SHOPIFY_DOMAIN,
  publicStorefrontToken: process.env.NEXT_PUBLIC_PUBLIC_STOREFRONT_API_TOKEN,
  privateStorefrontToken: process.env.PRIVATE_STOREFRONT_API_TOKEN,
});

export async function shopifyFetch({ query, variables = {} }) {

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

const PRODUCT_PREVIEW_QUERY = `
  query ProductByHandle($handle: String!) {
    productByHandle(handle: $handle) {
      id
      handle
      title
      images(first: 5) {
        edges {
          node {
            url
            altText
            width
            height
          }
        }
      }
    }
  }
  `

export default async function fetchProductPreview({ handle }) {

  // console.log(handle)

  const data = await shopifyFetch({
    query: PRODUCT_PREVIEW_QUERY,
    variables: { handle },
  });

  return data.productByHandle;

}

const PRODUCT_BY_HANDLE_QUERY = `
  query ProductByHandle($handle: String!) {
    productByHandle(handle: $handle) {
      id
      title
      handle
      description
      descriptionHtml
      tags
      images(first: 10) {
        edges {
          node {
            url
            altText
            width
            height
          }
        }
      }
          # Subscription-related fields
      requiresSellingPlan
      sellingPlanGroups(first: 5) {
        edges {
          node {
            name
            options {
              name
              values
            }
            sellingPlans(first: 10) {
              edges {
                node {
                  id
                  name
                  description
                  recurringDeliveries
                  options {
                    name
                    value
                  }
                }
              }
            }
          }
        }
      }
      variants(first: 10) {
        edges {
          node {
            id
            title
            price {
              amount
              currencyCode
            }
            compareAtPrice {
              amount
              currencyCode
            }
            availableForSale
            selectedOptions {
              name
              value
            }
          }
        }
      }
      options {
        name
        values
      }
    }
  }
`

export async function fetchProductByHandle({ handle }) {
  const data = await shopifyFetch({
    query: PRODUCT_BY_HANDLE_QUERY,
    variables: { handle },
  });

  // console.log(data.productByHandle);

  return data.productByHandle;
}