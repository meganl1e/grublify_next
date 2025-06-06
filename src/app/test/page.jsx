import { shopifyFetch } from '../../lib/shopify-client';

const PRODUCT_QUERY = `
  query getProduct($id: ID!) {
    product(id: $id) {
      id
      title
      handle
      description
      # ...other fields you need
    }
  }
`;

export default async function ProductPage({ params }) {
  const id = "gid://shopify/Product/14719423152498"; // Replace with actual ID from product list query

  let product = null;
  let errorMessage = null;

  try {
    const data = await shopifyFetch({
      query: PRODUCT_QUERY,
      variables: { id }
    });

    // Log the full response for debugging
    console.log('Shopify product response:', data);

    // Defensive: Check for product
    product = data && data.product ? data.product : null;

    if (!product) {
      errorMessage = 'Product not found or invalid product ID.';
    }
  } catch (error) {
    console.error('Error fetching product:', error);
    errorMessage = 'There was an error fetching the product.';
  }

  // UI rendering
  return (
    <main className="container mx-auto px-4 py-8">
      {errorMessage ? (
        <div className="text-red-500">{errorMessage}</div>
      ) : product ? (
        <>
          <h1 className="text-2xl font-bold">{product.title}</h1>
          <p>{product.description}</p>
          {/* Add more product fields here */}
        </>
      ) : (
        <div>Loading...</div>
      )}
    </main>
  );
}
