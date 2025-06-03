import { shopifyFetch } from '../../../lib/shopify-client';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';

const PRODUCT_QUERY = `
  query getProduct($handle: String!) {
    product(handle: $handle) {
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
            quantityAvailable
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
      metafields(first: 10) {
        edges {
          node {
            namespace
            key
            value
            type
          }
        }
      }
    }
  }
`;

export default async function ProductPage({ params }) {
  const { handle } = params;
  
  try {
    const data = await shopifyFetch({ 
      query: PRODUCT_QUERY, 
      variables: { handle } 
    });
    
    const product = data?.product;
    
    if (!product) {
      notFound();
    }

    const images = product.images?.edges?.map(edge => edge.node) || [];
    const variants = product.variants?.edges?.map(edge => edge.node) || [];
    const mainVariant = variants[0];
    const price = mainVariant?.price;
    const compareAtPrice = mainVariant?.compareAtPrice;

    return (
      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-blue-600">Home</Link>
            <span>/</span>
            <Link href="/products" className="hover:text-blue-600">Products</Link>
            <span>/</span>
            <span className="text-gray-900">{product.title}</span>
          </div>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            {images.length > 0 ? (
              <div className="aspect-square relative bg-gray-100 rounded-lg overflow-hidden">
                <Image
                  src={images[0].url}
                  alt={images[0].altText || product.title}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            ) : (
              <div className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center">
                <span className="text-gray-400">No Image Available</span>
              </div>
            )}
            
            {/* Thumbnail Images */}
            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {images.slice(1, 5).map((image, index) => (
                  <div key={index} className="aspect-square relative bg-gray-100 rounded overflow-hidden">
                    <Image
                      src={image.url}
                      alt={image.altText || `${product.title} ${index + 2}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 25vw, 12.5vw"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            {/* Title and Price */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.title}</h1>
              
              <div className="flex items-center space-x-4 mb-4">
                {price && (
                  <span className="text-3xl font-bold text-gray-900">
                    ${parseFloat(price.amount).toFixed(2)} {price.currencyCode}
                  </span>
                )}
                {compareAtPrice && parseFloat(compareAtPrice.amount) > parseFloat(price?.amount || 0) && (
                  <span className="text-xl text-gray-500 line-through">
                    ${parseFloat(compareAtPrice.amount).toFixed(2)}
                  </span>
                )}
              </div>

              {/* Availability */}
              <div className="flex items-center space-x-2">
                {mainVariant?.availableForSale ? (
                  <>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-green-600 font-medium">In Stock</span>
                    {mainVariant.quantityAvailable && (
                      <span className="text-gray-600">
                        ({mainVariant.quantityAvailable} available)
                      </span>
                    )}
                  </>
                ) : (
                  <>
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span className="text-red-600 font-medium">Out of Stock</span>
                  </>
                )}
              </div>
            </div>

            {/* Description */}
            {product.description && (
              <div className="prose prose-gray max-w-none">
                <h3 className="text-lg font-semibold mb-2">Description</h3>
                <div 
                  dangerouslySetInnerHTML={{ __html: product.descriptionHtml || product.description }}
                  className="text-gray-600"
                />
              </div>
            )}

            {/* AAFCO Compliance Badge for Dog Food */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-3">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-green-800">AAFCO Compliant</h4>
                  <p className="text-sm text-green-600">Meets all nutritional standards for complete and balanced dog food</p>
                </div>
              </div>
            </div>

            {/* Variants/Options */}
            {variants.length > 1 && (
              <div>
                <h3 className="text-lg font-semibold mb-3">Available Options</h3>
                <div className="space-y-2">
                  {variants.map((variant, index) => (
                    <div key={variant.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                      <div>
                        <span className="font-medium">{variant.title}</span>
                        {variant.selectedOptions.map(option => (
                          <span key={option.name} className="text-sm text-gray-600 ml-2">
                            {option.name}: {option.value}
                          </span>
                        ))}
                      </div>
                      <div className="text-right">
                        <span className="font-semibold">
                          ${parseFloat(variant.price.amount).toFixed(2)}
                        </span>
                        {!variant.availableForSale && (
                          <div className="text-sm text-red-600">Out of Stock</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Add to Cart Button */}
            <div className="space-y-4">
              <button 
                className={`w-full py-3 px-6 rounded-lg font-semibold text-lg transition-colors ${
                  mainVariant?.availableForSale 
                    ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
                disabled={!mainVariant?.availableForSale}
              >
                {mainVariant?.availableForSale ? 'Add to Cart' : 'Out of Stock'}
              </button>
              
              <button className="w-full py-3 px-6 border-2 border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                Learn More About Nutrition
              </button>
            </div>

            {/* Tags */}
            {product.tags && product.tags.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-3">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {product.tags.map((tag, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Back to Products */}
        <div className="mt-12 text-center">
          <Link 
            href="/products"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to All Products
          </Link>
        </div>
      </main>
    );
  } catch (error) {
    console.error('Error fetching product:', error);
    notFound();
  }
}

// Generate metadata for SEO
export async function generateMetadata({ params }) {
  const { handle } = params;
  
  try {
    const data = await shopifyFetch({ 
      query: PRODUCT_QUERY, 
      variables: { handle } 
    });
    
    const product = data?.product;
    
    if (!product) {
      return {
        title: 'Product Not Found',
      };
    }

    return {
      title: product.title,
      description: product.description?.replace(/<[^>]*>/g, '').substring(0, 160) || `Buy ${product.title}`,
      openGraph: {
        title: product.title,
        description: product.description?.replace(/<[^>]*>/g, '').substring(0, 160),
        images: product.images?.edges?.[0]?.node?.url ? [product.images.edges[0].node.url] : [],
      },
    };
  } catch (error) {
    return {
      title: 'Product Not Found',
    };
  }
}

// "use client";
// import {ProductProvider, useProduct} from '@shopify/hydrogen-react';
// // import {useParams} from 'react-router-dom';
// import { shopifyFetch, client } from '../../../lib/shopify-client';
// import {useState, useEffect} from 'react';

// const PRODUCT_QUERY = `
//   query getProduct($id: ID!) {
//     product(id: $id) {
//       id
//       title
//       description
//       handle
//       featuredImage {
//         url
//         altText
//       }
//       priceRange {
//         minVariantPrice {
//           amount
//           currencyCode
//         }
//       }
//       variants(first: 10) {
//         edges {
//           node {
//             id
//             title
//             selectedOptions {
//               name
//               value
//             }
//           }
//         }
//       }
//     }
//   }
// `;



// export default function Product() {
//   // const { handle } = useParams();
//   const id = "gid://shopify/Product/14719423152498";
//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);

 

//   useEffect(() => {
//     async function fetchProduct() {
//       const response = await fetch(client.getStorefrontApiUrl(), {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           ...client.getPublicTokenHeaders(),
//         },
//         body: JSON.stringify({
//           query: PRODUCT_QUERY,
//           variables: { id },
//         }),
//       });
//       const json = await response.json();
//       console.log("data:", json);
//       setProduct(json.data.product);
//       setLoading(false);
//     }
//     if (id) {
//       fetchProduct();
//     }
//   }, [id]);


//   if (loading) return <div>Loading...</div>;
//   if (!product) return <div>Product not found.</div>;

//   // Get the first variant's ID as initialVariantId
//   const initialVariantId = product.variants?.edges[0]?.node.id;

//   return (
//     <ProductProvider data={product} initialVariantId={initialVariantId}>
//       <UsingProduct />
//     </ProductProvider>
//   );
// }

// function UsingProduct() {
//   const {product, variants = [], setSelectedVariant} = useProduct();

//   // Flatten variants if needed
//   const flattenedVariants = variants?.edges
//     ? variants.edges.map(edge => edge.node)
//     : variants;

//   return (
//     <>
//       <h1 className='text-3xl'>{product?.title}</h1>
//       <img
//         src={product.featuredImage?.url}
//         alt={product.featuredImage?.altText || product.title}
//         width={400}
//       />
//       {flattenedVariants.map((variant) => (
//         <button onClick={() => setSelectedVariant(variant)} key={variant?.id}>
//           {variant?.title}
//         </button>
//       ))}
//     </>
//   );
// }
