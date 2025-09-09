"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Clock, Users, ArrowRight } from "lucide-react";
import { Button } from "../ui/button";

// Sample featured recipes data - in production, this would come from your CMS/API
const featuredRecipes = [
  {
    id: 1,
    name: "Chicken & Rice",
    slug: "chicken-and-rice",
    image: "/chicken-and-rice-1.jpeg", // Using existing image from your public folder
    tags: ["Easy to Make", "Delicious"],
    prepTime: "10 min prep",
    servings: "2-3 meals",
    description: "A classic recipe that's perfect for dogs transitioning to homemade food",
    difficulty: "Easy"
  }
];



export default function FeaturedRecipes() {
  const recipe = featuredRecipes[0]; // Get the single recipe

  return (
    <section className="py-16 md:py-20 bg-primary-light">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-secondary mb-6">
            Easy Recipes Anyone Can Make
          </h2>
          <p className="text-lg md:text-xl text-slate-700 max-w-3xl mx-auto">
            Free, healthy recipes with step-by-step guides
          </p>
        </div>

        {/* Hero Recipe Card */}
        <div className="relative">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border-4 border-secondary">
            <div className="grid lg:grid-cols-2 gap-0">
              {/* Image Side */}
              <div className="relative h-80 lg:h-96">
                  <Image
                    src={recipe.image}
                    alt={recipe.name}
                    fill
                    className="object-cover"
                  />

                {/* Floating Badges */}
                {/* <div className="absolute top-6 left-6">
                  <span className="bg-white/90 backdrop-blur-sm text-primary px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                    {recipe.difficulty}
                  </span>
                </div> */}

                {/* <div className="absolute bottom-6 left-6 right-6">
                  <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4">
                    <div className="flex items-center justify-between text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Clock className="w-5 h-5 text-primary" />
                        <span className="font-semibold">{recipe.prepTime}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-5 h-5 text-primary" />
                        <span className="font-semibold">{recipe.servings}</span>
                      </div>
                    </div>
                  </div>
                </div> */}
              </div>

              {/* Content Side */}
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <div className="mb-6">
                  <h3 className="text-3xl lg:text-4xl font-bold text-secondary mb-4">
                    {recipe.name}
                  </h3>
                  <p className="text-lg text-slate-700 leading-relaxed mb-6">
                    {recipe.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {recipe.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-sm text-primary font-bold bg-white px-3 py-1 rounded-full shadow-sm border-2 border-primary whitespace-normal break-words"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href={`/recipes/${recipe.slug}`} className="flex-1">
                    <Button
                      variant="secondary"
                      size="lg"
                      className="w-full cursor-pointer group relative text-lg px-8 py-6 bg-gradient-to-r from-secondary to-secondary/90 text-white font-semibold border-2 border-secondary rounded-2xl hover:from-secondary/90 hover:to-secondary transition-all duration-300 ease-out shadow-lg hover:shadow-xl transform hover:scale-105 hover:-translate-y-1"
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        View Full Recipe
                        <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </Button>
                  </Link>

                  <Link href="/recipes/portion-calculator" className="flex-1">
                    <Button
                      variant="outline"
                      size="lg"
                      className="w-full cursor-pointer group relative text-lg px-8 py-6 bg-white border-2 border-secondary text-secondary font-semibold rounded-2xl hover:bg-secondary hover:text-white transition-all duration-300 ease-out transform hover:scale-105 hover:-translate-y-1"
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        How Much to Feed
                        <svg className="w-5 h-5 transition-transform group-hover:rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                      </span>
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>


        </div>

        {/* Bottom CTA */}
        {/* <div className="text-center mt-16">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-orange-200/50 shadow-xl">
            <h3 className="text-2xl md:text-3xl font-bold text-slate-800 mb-4">
              Ready to Cook for Your Dog?
            </h3>
            <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
              Join thousands of pet parents who've discovered the joy of making fresh, nutritious meals at home.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/recipes">
                <Button 
                  variant="secondary" 
                  size="lg"
                  className="cursor-pointer group relative text-lg px-10 py-6 bg-gradient-to-r from-secondary to-secondary/90 text-white font-semibold border-2 border-secondary rounded-2xl hover:from-secondary/90 hover:to-secondary transition-all duration-300 ease-out shadow-lg hover:shadow-xl transform hover:scale-105 hover:-translate-y-1"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Browse All Recipes
                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Button>
              </Link>
              
              <Link href="/products/nutrition-pack-essentials">
                <Button 
                  variant="outline" 
                  size="lg"
                  className="cursor-pointer group relative text-lg px-10 py-6 bg-white/80 backdrop-blur-sm border-2 border-orange-200 text-orange-700 font-semibold rounded-2xl hover:bg-white hover:border-orange-300 hover:text-orange-800 transition-all duration-300 ease-out transform hover:scale-105 hover:-translate-y-1"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Get Nutrition Packs
                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </span>
                </Button>
              </Link>
            </div>
          </div>
        </div> */}
      </div>
    </section>
  );
}
