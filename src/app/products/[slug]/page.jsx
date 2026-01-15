import { fetchProductByHandle } from '../../../lib/shopify-client';
import { notFound } from 'next/navigation';
import ProductPageClient from '@/components/product/product-page-client';
import { getReviewsByProductId } from '@/lib/klaviyo-client';

// Helper function to calculate average rating
function calculateAverageRating(reviews) {
  const publishedReviews = reviews.filter(
    (review) => review.attributes.status?.value === 'published' && 
    typeof review.attributes.rating === 'number'
  );
  if (publishedReviews.length === 0) return 0;

  const total = publishedReviews.reduce((sum, review) => sum + review.attributes.rating, 0);
  return total / publishedReviews.length;
}

export default async function ProductPage({ params }) {
  const { slug } = await params;

  try {
    const product = await fetchProductByHandle({ handle: slug });

    if (!product) {
      notFound();
    }

    // Extract Shopify product ID for reviews
    const shopifyProductId = product.id.replace('gid://shopify/Product/', '');
    
    // Fetch reviews server-side
    let reviews = [];
    let averageRating = 0;
    
    try {
      reviews = await getReviewsByProductId(shopifyProductId) || [];
      averageRating = calculateAverageRating(reviews);
    } catch (error) {
      console.error('Error fetching reviews:', error);
      // Continue without reviews if there's an error
    }

    return (
      <ProductPageClient 
        product={product} 
        reviews={reviews} 
        averageRating={averageRating} 
      />
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
//     return {
//       title: 'Product Not Found',
//     };
//   }

//   return {
//     title: product.title,
//     description: product.description?.replace(/<[^>]*>/g, '').substring(0, 160) || `Buy ${product.title}`,
//     openGraph: {
//       title: product.title,
//       description: product.description?.replace(/<[^>]*>/g, '').substring(0, 160),
//       images: product.images?.edges?.[0]?.node?.url ? [product.images.edges[0].node.url] : [],
//     },
//   };
// } catch (error) {
//   return {
//     title: 'Product Not Found',
//   };
// }
// }



