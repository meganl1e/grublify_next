"use client";
import React from "react";
import StarRating from "../ui/star-rating";
import { Card, CardContent } from "../ui/card";

// Sample reviews for when no real reviews are available
const sampleReviews = [
  {
    id: 1,
    rating: 5,
    content: "These packs have been great for my senior pup! He was having some constipation issues and it has been much better since using Grublify. I notice he has more energy and overall much more excited for meal time.",
    author: "Irisa"
  },
  {
    id: 2,
    rating: 5,
    content: "Our picky eater Yorkie, Luna, has been eating the chicken and rice with the Grublify Nutrient Pack for a couple of months now—and she absolutely loves it! The food is super easy to make.",
    author: "Josephine S."
  },
  {
    id: 3,
    rating: 5,
    content: "My dog Lava is a big fan of this nutrition pack and recipe! She always scarfs up her food, so much better than any kibble and easy to make. Highly recommend :)",
    author: "Este M."
  }
];

function ReviewCard({ review }) {
  return (
    <a href="/products/nutrition-pack-essentials" className="block">
        <Card className="bg-primary-light/50 border border-slate-200 rounded-xl p-6 h-full hover:shadow-lg hover:border-primary/40 transition-all duration-300 group cursor-pointer">
          <CardContent className="p-0">
            <div className="mb-2 text-center flex items-center justify-center">
              <StarRating rating={review.rating} size="text-2xl" showScore={false} />
            </div>
            
            <p className="text-slate-700 text-md leading-relaxed mb-4">
              "{review.content}"
            </p>
            
            <div className="flex items-center justify-start">
              <p className="font-semibold text-slate-600 text-lg">- {review.author}</p>
            </div>
          </CardContent>
        </Card>
    </a>
  );
}

export default function CustomerReviews({ reviews = [], averageRating = 0 }) {
  // Transform Klaviyo reviews to our format (same as product page)
  const transformedReviews = reviews
    .filter(review => review.attributes.status?.value === 'published')
    .slice(0, 3) // Take only first 3
    .map((review, index) => ({
      id: review.id || index + 1,
      rating: review.attributes.rating || 5,
      content: review.attributes.content || 'Love this!',
      author: review.attributes.author || 'Anonymous'
    }));

  // Use real reviews if available, otherwise fall back to sample reviews
  const displayReviews = transformedReviews.length > 0 ? transformedReviews : sampleReviews;
  const displayAverageRating = transformedReviews.length > 0 ? averageRating : sampleReviews.reduce((sum, review) => sum + review.rating, 0) / sampleReviews.length;
  const totalReviews = displayReviews.length;

  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-secondary mb-4">
            Loved by Dogs & Their Humans
          </h2>
          <p className="text-lg md:text-xl text-gray-600 mb-6">
            See what our early customers are saying about their dog's nutrition transformation
          </p>
          
          {/* Overall Rating */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="flex items-center gap-3">
              <div className="text-4xl font-bold text-secondary">
                {displayAverageRating.toFixed(1)}
              </div>
              <div className="flex flex-col text-secondary">
                <StarRating rating={displayAverageRating} size="text-3xl" showScore={false} />
                <p className="text-sm text-slate-600 mt-1">
                  Based on {totalReviews}+ reviews
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {displayReviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>


      </div>
    </section>
  );
}
