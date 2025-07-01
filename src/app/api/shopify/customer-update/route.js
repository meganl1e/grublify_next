import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request) {
  const { firstName, lastName } = await request.json();

  // replace with get customer token cookie code somewhere
  const cookieStore = await cookies();
  const customerToken = cookieStore.get('customer_token')?.value;
  const shopId = process.env.NEXT_PUBLIC_SHOPIFY_SHOP_ID;

  if (!customerToken) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  const mutation = `
    mutation customerUpdate($input: CustomerUpdateInput!) {
      customerUpdate(input: $input) {
        userErrors {
          field
          message
        }
        customer {
          id
          firstName
          lastName
        }
      }
    }
  `;

  const variables = {
    input: {
      firstName: firstName,
      lastName: lastName,
    },
  };

  const response = await fetch(`https://shopify.com/${shopId}/account/customer/api/2025-04/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': customerToken, // No Bearer!
    },
    body: JSON.stringify({ query: mutation, variables }),
  });

  const data = await response.json();

  if (data.errors || data.data?.customerUpdate?.userErrors?.length) {
    return NextResponse.json({ error: data.errors || data.data.customerUpdate.userErrors }, { status: 400 });
  }

  return NextResponse.json({ customer: data.data.customerUpdate.customer });
}