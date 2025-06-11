import { shopifyFetch } from '../../lib/shopify-client';
import Link from 'next/link';
import Image from 'next/image';

const PRODUCTS_QUERY = `
  {
    products(first: 12) {
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
                width
                height
              }
            }
          }
          variants(first: 1) {
            edges {
              node {
                id
                price {
                  amount
                  currencyCode
                }
                compareAtPrice {
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

  const data = await shopifyFetch({ query: PRODUCTS_QUERY });
  // console.log('Products data:', data);
  const products = data?.products?.edges?.map(edge => edge.node) || [];


  if (products.length === 0) {
    return (
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Our Products</h1>
        <div className="text-center">
          <p className="text-secondary text-lg">No products available at the moment.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-secondary mb-4">Shop</h1>
        <p className="text-lg text-secondary">
          Discover our collection of AAFCO-compliant, nutritious homemade dog food products
          designed to keep your furry friends healthy and happy.
        </p>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map(product => {
          const image = product.images?.edges?.[0]?.node;
          const variant = product.variants?.edges?.[0]?.node;
          const price = variant?.price;
          const compareAtPrice = variant?.compareAtPrice;

          return (
            <Link
              key={product.id}
              href={`/products/${product.handle}`}
              className="group bg-white transition-all duration-300 overflow-hidden flex flex-col"
            >
              {/* Product Image */}
              <div className="relative aspect-square">
                {image?.url ? (
                  <Image
                    src={image.url}
                    alt={image.altText || product.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    priority={false}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-200">
                    <span className="text-secondary text-sm">No Image Available</span>
                  </div>
                )}

                {/* Sale Badge */}
                {compareAtPrice && parseFloat(compareAtPrice.amount) > parseFloat(price?.amount || 0) && (
                  <span className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 text-xs font-semibold rounded shadow">
                    Sale
                  </span>
                )}

                {/* Sold Out Badge */}
                {!variant?.availableForSale && (
                  <span className="absolute top-2 right-2 bg-gray-700 text-white px-2 py-1 text-xs font-semibold rounded shadow">
                    Sold Out
                  </span>
                )}
              </div>

              {/* Product Info */}
              <div className="flex-1 flex flex-col p-4">
                <h3 className="font-semibold text-secondary mb-1 text-xl line-clamp-2 justify-center flex">
                  {product.title}
                </h3>
                {/* {product.description && (
                  <p className="text-secondary text-xs mb-2 line-clamp-2">
                    {product.description.replace(/<[^>]*>/g, '').substring(0, 100)}
                    {product.description.length > 100 ? '...' : ''}
                  </p>
                )} */}

                {/* Price Row */}
                <div className="mt-auto flex flex-col items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {price && (
                      <span className="text-md text-secondary">
                        From ${parseFloat(price.amount).toFixed(2)}
                      </span>
                    )}
                    {compareAtPrice && parseFloat(compareAtPrice.amount) > parseFloat(price?.amount || 0) && (
                      <span className="text-sm secondary line-through">
                        ${parseFloat(compareAtPrice.amount).toFixed(2)}
                      </span>
                    )}
                  </div>
                  {/* {variant?.availableForSale ? (
                    <span className="text-primary text-xs font-medium">In Stock</span>
                  ) : (
                    <span className="text-red-600 text-xs font-medium">Out of Stock</span>
                  )} */}
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Call to Action */}
      {/* <div className="text-center mt-12">
        <p className="text-gray-600 mb-4">
          Have questions about our products? We're here to help!
        </p>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
          Contact Us
        </button>
      </div> */}
    </main>
  );
}