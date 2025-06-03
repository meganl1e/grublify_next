
import { shopifyFetch } from '../../lib/shopify-client';

const PRODUCTS_QUERY = `
  {
    products(first: 5) {
      edges {
        node {
          id
          title
          handle
          description
          images(first: 1) {
            edges {
              node {
                url
                altText
              }
            }
          }
          variants(first: 1) {
            edges {
              node {
                price {
                  amount
                  currencyCode
                }
                availableForSale
              }
            }
          }
        }
      }
    }
  }
`;

export default async function ProductsPage() {
  // Fetch data from Shopify on the server
  const data = await shopifyFetch({ query: PRODUCTS_QUERY });
  const products = data.products.edges.map(edge => edge.node);

  return (
    <main>
      <h1>Our Products</h1>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            <p>title: {product.title}</p>
            <p>handle: {product.handle}</p>
            <p>desc: {product.description}</p>
            <p></p>
          </li>
        ))}
      </ul>
    </main>
  );
}