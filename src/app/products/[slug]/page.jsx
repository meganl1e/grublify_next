import { shopifyFetch } from '../../../lib/shopify-client';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ProductImages from '@/components/product/ProductImages';
import ProductDetails from '@/components/product/ProductDetails';

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

    // rendering logic
    const images = product.images?.edges?.map(edge => edge.node) || [];
    // const variants = product.variants?.edges?.map(edge => edge.node) || [];
    // const mainVariant = variants[0];
    // const price = mainVariant?.price;
    // const compareAtPrice = mainVariant?.compareAtPrice;

    return (
      <main className="container mx-auto px-4 py-8 max-w-7xl">
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
          <ProductImages images={images} />

          <ProductDetails product={product}/>
        </div>
      </main>
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



{/* AAFCO Compliance Badge for Dog Food */ }
{/* <div className="bg-green-50 border border-green-200 rounded-lg p-4">
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
</div> */}


{/* Product Details */}
          // <div className="space-y-4">
          //   {/* Availability */}
          //   <div className="flex items-center space-x-2">
          //     {mainVariant?.availableForSale ? (
          //       <>
          //         <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          //         <span className="text-green-600 font-medium">In Stock</span>
          //         {mainVariant.quantityAvailable && (
          //           <span className="text-gray-600">
          //             ({mainVariant.quantityAvailable} available)
          //           </span>
          //         )}
          //       </>
          //     ) : (
          //       <>
          //         <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          //         <span className="text-red-600 font-medium">Out of Stock</span>
          //       </>
          //     )}
          //   </div>

          //   {/* Title and Price */}
          //   <div>
          //     <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.title}</h1>

          //     <div className="flex items-center space-x-4 mb-4">
          //       {price && (
          //         <span className="text-2xl font-bold text-gray-900">
          //           ${parseFloat(price.amount).toFixed(2)} {price.currencyCode}
          //         </span>
          //       )}
          //       {compareAtPrice && parseFloat(compareAtPrice.amount) > parseFloat(price?.amount || 0) && (
          //         <span className="text-xl text-gray-500 line-through">
          //           ${parseFloat(compareAtPrice.amount).toFixed(2)}
          //         </span>
          //       )}
          //     </div>

          //   </div>

          //   {/* Variants */}
          //   <ProductVariants variants={variants} />

          //   {/* Add to Cart Button */}
          //   <button
          //     className="w-full max-w-sm mx-auto py-3 px-6 bg-primary text-white font-semibold rounded-md shadow-sm hover:bg-primary/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary cursor-pointer"
          //     disabled={!mainVariant?.availableForSale}
          //   >
          //     Add to Cart
          //   </button>


          //   {/* Description */}
          //   <ProductDescription descriptionHtml={product.descriptionHtml} description={product.description} />

          //   {/* Tags */}
          //   {product.tags && product.tags.length > 0 && (
          //     <div>
          //       <h3 className="text-lg font-semibold mb-3">Tags</h3>
          //       <div className="flex flex-wrap gap-2">
          //         {product.tags.map((tag, index) => (
          //           <span
          //             key={index}
          //             className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
          //           >
          //             {tag}
          //           </span>
          //         ))}
          //       </div>
          //     </div>
          //   )}
          // </div>