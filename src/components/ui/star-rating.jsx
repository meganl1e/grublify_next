import React from 'react';

export default function StarRating({ 
  rating, 
  maxRating = 5, 
  size = "text-xl", 
  showScore = true, 
  className = "" 
}) {
  const fullStars = Math.floor(rating);
  const halfStar = rating - fullStars >= 0.5;
  const emptyStars = maxRating - fullStars - (halfStar ? 1 : 0);

  return (
    <div className={`${size} text-primary flex items-center ${className}`}>
      {'★'.repeat(fullStars)}
      {halfStar && '☆'}
      {'☆'.repeat(emptyStars)}
      {showScore && (
        <span className='text-sm ml-2 text-gray-600'>({rating.toFixed(1)})</span>
      )}
    </div>
  );
}

// Compact version for headers
export function CompactStarRating({ rating, maxRating = 5, className = "" }) {
  const fullStars = Math.floor(rating);
  const halfStar = rating - fullStars >= 0.5;
  const emptyStars = maxRating - fullStars - (halfStar ? 1 : 0);

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <div className="text-primary text-2xl">
        {'★'.repeat(fullStars)}
        {halfStar && '☆'}
        {'☆'.repeat(emptyStars)}
      </div>
      <span className="text-sm text-gray-600">({rating.toFixed(1)})</span>
    </div>
  );
}

// Interactive star rating for forms (if you want to add review functionality later)
export function InteractiveStarRating({ 
  rating, 
  onRatingChange, 
  maxRating = 5, 
  size = "text-2xl",
  className = "" 
}) {
  const handleStarClick = (starIndex) => {
    if (onRatingChange) {
      onRatingChange(starIndex + 1);
    }
  };

  return (
    <div className={`flex items-center space-x-1 ${className}`}>
      {Array.from({ length: maxRating }, (_, index) => (
        <button
          key={index}
          type="button"
          onClick={() => handleStarClick(index)}
          className={`${size} transition-colors duration-200 ${
            index < rating ? 'text-primary' : 'text-gray-300'
          } hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary rounded`}
        >
          ★
        </button>
      ))}
    </div>
  );
}
