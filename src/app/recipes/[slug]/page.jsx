"use client";
import React from "react";
import RecipeCard from "../../../components/recipe-card.jsx";
import RecipeDetailedInstructions from "../../../components/recipe-detailed-instructions.jsx";
import { useParams } from 'next/navigation';
import { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Recipe = () => {

  const { slug } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  const query = `?filters[slug][$eq]=${slug}` +
  `&populate[ingredients][populate]=true` + // all ingredients
  `&populate[ingredients][populate]=imperial` + // imperial measurements for each ingredient
  `&populate[ingredients][populate]=metric` + // metric measurements for each ingredient
  `&populate[cookingMethods][populate]=instructions` + // recipe card cooking methods
  `&populate[detailedInstructions][populate]=images` + // detailed instruction images
  `&populate[coverImage][populate]=true` // cover image for some reason idk

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/recipes${query}`)
      .then(res => res.json())
      .then(data => {
        if (data?.data?.length > 0) {
          setRecipe(data.data[0]);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching recipe:", err);
        setLoading(false);
      });
  }, [slug]);

  // useEffect(() => {
  //   if (recipe) {
  //     console.log("Recipe updated:", recipe);
  //     // Additional logic can be added here if needed
  //   }
  // }, [recipe]);

  // // if (loading) {
  // //   return <div>Loading...</div>;
  // // }

  // // Debug: Log and display the recipe object
  // console.log("Fetched recipe:", recipe);

  return (
    <div className="min-h-screen p-4 sm:p-8">

      {/* Main content area */}
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-full lg:max-w-6xl">

        {/* Main content */}
        <main className="w-full lg:col-span-6 lg:col-start-3 pt-4 lg:pt-6 space-y-6">
          <div className="flex flex-col gap-1">
            {/* recipe title */}
            <h3 className="text-lg font-bold text-secondary/80">
              {loading ? <Skeleton width={64} /> : "RECIPE"}</h3>
            <h2 className="text-6xl lg:text-6xl font-bold text-primary">
              {loading
                ? <Skeleton width={350} height={60} />
                : recipe.name || "Error: recipe name not found"
              }
            </h2>
          </div>
          
          {/* Recipe image */}
          {loading ? (
            <Skeleton height={400} width={400} className="rounded-2xl" />
          ) : (
          <img
            src={recipe.coverImage.formats.medium.url}
            alt={recipe.name}
            className="rounded-2xl object-cover h-[400px]"
          />
          )}

          {/* Recipe Card */}
          {loading ? (
            <Skeleton
              height={200}           
              width="100%"           
              borderRadius={8}      
            />  
          ) : (
            <RecipeCard recipe={recipe} />
            
          )}

          {/* Detailed Instructions */}
          {!loading && (
            <RecipeDetailedInstructions data={recipe.detailedInstructions} />
          )}
        </main>
        
        {/* Sidebar (hidden on mobile) */}
        <aside className="hidden lg:block p-6"></aside>
      </div>
    </div>
  );
};

export default Recipe;
