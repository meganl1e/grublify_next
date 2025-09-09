"use client";
import React from "react";
import StarRating from "../ui/star-rating";
import { Card, CardContent } from "../ui/card";

// Sample reviews data - in production, this would come from your CMS/API
const sampleReviews = [
  {
    id: 1,
    rating: 5,
    title: "My dog loves it!",
    content: "Switched to Grublify 3 months ago and my dog's energy levels have improved dramatically. The recipes are easy to follow and the nutrition packs make everything so convenient.",
    author: "Sarah M.",
    location: "California",
    dogBreed: "Golden Retriever"
  },
  {
    id: 2,
    rating: 5,
    title: "Finally, peace of mind",
    content: "As a veterinarian, I was skeptical about homemade dog food. But Grublify's nutrition packs are formulated to meet AAFCO standards, so I know my patients are getting complete nutrition.",
    author: "Dr. Jennifer L.",
    location: "Texas",
    dogBreed: "Mixed Breed"
  },
  {
    id: 3,
    rating: 5,
    title: "Cost-effective and healthy",
    content: "I was spending $80/month on premium kibble. Now I spend $45/month making fresh meals with Grublify. My dog is healthier and I'm saving money!",
    author: "Mike R.",
    location: "New York",
    dogBreed: "Labrador"
  },
  {
    id: 4,
    rating: 4,
    title: "Great quality ingredients",
    content: "The nutrition packs are high quality and the recipes use ingredients I can find at any grocery store. My picky eater actually finishes his meals now!",
    author: "Lisa K.",
    location: "Florida",
    dogBreed: "French Bulldog"
  },
  {
    id: 5,
    rating: 5,
    title: "Easy transition",
    content: "The transition guide was incredibly helpful. My senior dog switched from kibble to fresh food without any digestive issues. Highly recommend!",
    author: "Robert T.",
    location: "Washington",
    dogBreed: "German Shepherd"
  },
  {
    id: 6,
    rating: 5,
    title: "Best decision ever",
    content: "My dog's coat is shinier, his breath is better, and he's more active than ever. The portion calculator makes feeding so easy. Worth every penny!",
    author: "Amanda C.",
    location: "Oregon",
    dogBreed: "Border Collie"
  }
];

function ReviewCard({ review }) {
  return (
    <Card className="bg-white border border-gray-200 rounded-xl p-6 h-full hover:shadow-lg transition-shadow duration-300">
      <CardContent className="p-0">
        <div className="flex items-center justify-between mb-3">
          <StarRating rating={review.rating} size="text-lg" showScore={false} />
          <span className="text-sm text-gray-500">{review.location}</span>
        </div>
        
        <h4 className="font-semibold text-secondary mb-2 text-lg">{review.title}</h4>
        
        <p className="text-gray-700 text-sm leading-relaxed mb-4 line-clamp-4">
          "{review.content}"
        </p>
        
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium text-secondary text-sm">- {review.author}</p>
            <p className="text-xs text-gray-500">{review.dogBreed}</p>
          </div>
          <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
            <span className="text-primary text-sm font-bold">
              {review.author.charAt(0)}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function CustomerReviews() {
  const averageRating = sampleReviews.reduce((sum, review) => sum + review.rating, 0) / sampleReviews.length;
  const totalReviews = sampleReviews.length;

  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-secondary mb-4">
            Loved by Dogs & Their Humans
          </h2>
          <p className="text-lg md:text-xl text-gray-600 mb-6">
            Join thousands of happy customers who've transformed their dog's nutrition
          </p>
          
          {/* Overall Rating */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-secondary mb-1">
                {averageRating.toFixed(1)}
              </div>
              <StarRating rating={averageRating} size="text-2xl" showScore={false} />
              <p className="text-sm text-gray-600 mt-1">
                Based on {totalReviews}+ reviews
              </p>
            </div>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {sampleReviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="bg-slate-50 rounded-2xl p-8 text-center">
          <h3 className="text-xl font-semibold text-secondary mb-6">
            Trusted by Pet Parents Nationwide
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">10,000+</div>
              <div className="text-sm text-gray-600">Happy Dogs</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">50+</div>
              <div className="text-sm text-gray-600">Recipes Available</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">99%</div>
              <div className="text-sm text-gray-600">Customer Satisfaction</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">30-Day</div>
              <div className="text-sm text-gray-600">Money-Back Guarantee</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
