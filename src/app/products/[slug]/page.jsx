import { shopifyFetch } from '../../../lib/shopify-client';
import { notFound } from 'next/navigation';
import ProductPageClient from '@/components/product/product-page-client';

// query to fetch id from handle (slug)
const ID_QUERY = `
    {
      products(first: 100) {
        edges {
          node {
            id
            handle
          }
        }
      }
    }
  `;

//query to fetch product details by id
const PRODUCT_QUERY = `
  query getProduct($id: ID!) {
    product(id: $id) {
      id
      title
      handle
      description
      descriptionHtml
      tags
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
`;

export default async function ProductPage({ params }) {

  // const { slug } = await params;

  // fetch products using helper
  // const product = await getProduct(slug);
  // console.log('Product data:', product);

  // fetch id from handle (slug)
  const { slug } = await params;
  const allProductsData = await shopifyFetch({ query: ID_QUERY });
  const product = allProductsData.products.edges.find(
    edge => edge.node.handle === slug
  );
  const productId = product?.node?.id;

  // if no product id, return not found
  if (!productId) {
    notFound();
  }

  // fetch product details by id
  try {
    const data = await shopifyFetch({
      query: PRODUCT_QUERY,
      variables: { id: productId }
    });

    const product = data?.product;

    if (!product) {
      notFound();
    }

    return (
      <ProductPageClient product={product} />
    );
  } catch (error) {
    console.error('Error fetching product:', error);
    notFound();
  }
}

// // Generate metadata for SEO
// export async function generateMetadata({ params }) {
//   const { handle } = params;

//   try {
//     const data = await shopifyFetch({ 
//       query: PRODUCT_QUERY, 
//       variables: { handle } 
//     });

//     const product = data?.product;

//     if (!product) {
//       return {
//         title: 'Product Not Found',
//       };
//     }

//     return {
//       title: product.title,
//       description: product.description?.replace(/<[^>]*>/g, '').substring(0, 160) || `Buy ${product.title}`,
//       openGraph: {
//         title: product.title,
//         description: product.description?.replace(/<[^>]*>/g, '').substring(0, 160),
//         images: product.images?.edges?.[0]?.node?.url ? [product.images.edges[0].node.url] : [],
//       },
//     };
//   } catch (error) {
//     return {
//       title: 'Product Not Found',
//     };
//   }
// }



