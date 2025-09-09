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
    name: "Chicken & Rice Delight",
    slug: "chicken-rice-delight",
    image: "/about_hero.jpg", // Using existing image from your public folder
    tags: ["Beginner", "High Protein"],
    prepTime: "15 min",
    servings: "2-3 meals",
    description: "A classic recipe that's perfect for dogs transitioning to homemade food",
    difficulty: "Easy"
  },
  {
    id: 2,
    name: "Beef & Sweet Potato",
    slug: "beef-sweet-potato",
    image: "/about_mission.jpg", // Using existing image from your public folder
    tags: ["High Protein", "Grain-Free"],
    prepTime: "20 min",
    servings: "3-4 meals",
    description: "Rich in protein and antioxidants, perfect for active dogs",
    difficulty: "Medium"
  },
  {
    id: 3,
    name: "Salmon & Quinoa",
    slug: "salmon-quinoa",
    image: "/about_family.png", // Using existing image from your public folder
    tags: ["Omega-3", "Grain-Free"],
    prepTime: "25 min",
    servings: "2-3 meals",
    description: "Packed with omega-3 fatty acids for healthy skin and coat",
    difficulty: "Medium"
  }
];

function RecipeCard({ recipe }) {
  const getDifficultyColor = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Link href={`/recipes/${recipe.slug}`} className="group">
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
        {/* Image */}
        <div className="relative h-48 overflow-hidden">
          <Image
            src={recipe.image}
            alt={recipe.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-4 right-4">
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(recipe.difficulty)}`}>
              {recipe.difficulty}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xl font-semibold text-secondary group-hover:text-primary transition-colors">
              {recipe.name}
            </h3>
            <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-primary group-hover:translate-x-1 transition-all" />
          </div>

          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {recipe.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {recipe.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Meta info */}
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{recipe.prepTime}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              <span>{recipe.servings}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function FeaturedRecipes() {
  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-secondary mb-4">
            Featured Recipes
          </h2>
          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Start with these popular recipes that dogs love. Each one is nutritionally complete when paired with our nutrition packs.
          </p>
        </div>

        {/* Recipes Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <div className="bg-slate-50 rounded-2xl p-8 md:p-12">
            <h3 className="text-2xl md:text-3xl font-bold text-secondary mb-4">
              Explore Our Full Recipe Collection
            </h3>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Discover 50+ recipes for every dog's taste and dietary needs. From puppy-friendly meals to senior dog nutrition.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/recipes">
                <Button 
                  variant="secondary" 
                  size="lg"
                  className="cursor-pointer group relative text-lg px-10 py-6 bg-gradient-to-r from-secondary to-secondary/90 text-white font-semibold border-2 border-secondary rounded-2xl hover:from-secondary/90 hover:to-secondary transition-all duration-300 ease-out shadow-lg hover:shadow-xl transform hover:scale-105 hover:-translate-y-1"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    View All Recipes
                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </span>
                </Button>
              </Link>
              
              <Link href="/recipes/portion-calculator">
                <Button 
                  variant="outline" 
                  size="lg"
                  className="cursor-pointer group relative text-lg px-10 py-6 bg-white/80 backdrop-blur-sm border-2 border-secondary/80 text-secondary font-semibold rounded-2xl hover:bg-white hover:border-secondary hover:text-secondary transition-all duration-300 ease-out transform hover:scale-105 hover:-translate-y-1"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Portion Calculator
                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
