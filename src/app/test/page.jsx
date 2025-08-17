// Import your getReviewsByProductId function
import { getReviewsByProductId } from '@/lib/klaviyo-client';

// Helper function to calculate average rating
function calculateAverageRating(reviews) {
  const publishedReviews = reviews.filter(
    (review) => review.attributes.status.value === 'published' && typeof review.attributes.rating === 'number'
  );
  if (publishedReviews.length === 0) return 0;

  const total = publishedReviews.reduce((sum, review) => sum + review.attributes.rating, 0);
  return total / publishedReviews.length;
}

// Simple star rating display component (can be used inside server components)
function StarRating({ rating, maxRating = 5 }) {
  const fullStars = Math.floor(rating);
  const halfStar = rating - fullStars >= 0.5;
  const emptyStars = maxRating - fullStars - (halfStar ? 1 : 0);

  return (
    <div className='text-primary text-xl'>
      {'★'.repeat(fullStars)}
      {halfStar && '☆'}
      {'☆'.repeat(emptyStars)}
      <span className='text-lg ml-2 text-secondary'>({rating.toFixed(1)})</span>
    </div>
  );
}

export default async function TestPage() {
  const productNumber = '14719423152498';
  const data = await getReviewsByProductId(productNumber);

  // Your data might be wrapped inside a `data` property
  // Adjust this according to actual API response shape
  const reviews = data || [];

  const averageRating = calculateAverageRating(reviews);

  return (
    <div>
      <h1>Test Reviews (server component)</h1>
      <StarRating rating={averageRating} />
      <pre>{JSON.stringify(reviews, null, 2)}</pre>
    </div>
  );
}
