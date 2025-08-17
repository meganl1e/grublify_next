import StarRating from '../ui/star-rating';

// Individual review component
function ReviewItem({ review }) {
  const { attributes } = review;
  const rating = attributes.rating || 0;
  const title = attributes.title || '';
  const content = attributes.content || '';
  const author = attributes.author || 'Anonymous';
  const date = attributes.created_at ? new Date(attributes.created_at).toLocaleDateString() : '';

  return (
    <div className="border-b border-gray-200 pb-4 mb-4 last:border-b-0">
      <div className="flex items-center justify-between mb-2">
        <StarRating rating={rating} size="text-lg" />
        <span className="text-sm text-gray-500">{date}</span>
      </div>
      {title && (
        <h4 className="font-semibold text-gray-900 mb-1">{title}</h4>
      )}
      <p className="text-gray-700 text-sm leading-relaxed">{content}</p>
      <p className="text-xs text-gray-500 mt-2">- {author}</p>
    </div>
  );
}

export default function ProductReviews({ reviews = [], averageRating = 0 }) {
  const publishedReviews = reviews.filter(
    (review) => review.attributes.status?.value === 'published'
  );

  if (publishedReviews.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="text-gray-400 text-6xl mb-4">★</div>
        <h3 className="text-lg font-semibold text-secondary mb-2">No Reviews Yet</h3>
        <p className="text-gray-600">Be the first to review this product!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Reviews Header */}
      <div className="border-b border-gray-200 pb-4">
        <h3 className="text-2xl font-semibold text-secondary mb-2">Customer Reviews</h3>
        <div className="flex items-center space-x-4">
          <StarRating rating={averageRating} size="text-2xl" />
          <span className="text-gray-600">
            Based on {publishedReviews.length} review{publishedReviews.length !== 1 ? 's' : ''}
          </span>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {publishedReviews.map((review, index) => (
          <ReviewItem key={review.id || index} review={review} />
        ))}
      </div>
    </div>
  );
}
