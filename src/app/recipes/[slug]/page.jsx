import React from "react";
import RecipeCard from "../../../components/recipes/recipe-card.jsx";
import RecipeDetailedInstructions from "../../../components/recipes/recipe-detailed-instructions.jsx";
import "react-loading-skeleton/dist/skeleton.css";
import NotFound from "@/app/not-found.jsx";
import { fetchRecipeBySlug } from "@/lib/strapi-client.js";

// // 1. Helper to fetch recipe from Strapi
// async function fetchRecipe(slug) {

//   const query = `?filters[slug][$eq]=${slug}` +
//   `&populate[ingredients][populate]=true` + // all ingredients
//   `&populate[ingredients][populate]=imperial` + // imperial measurements for each ingredient
//   `&populate[ingredients][populate]=metric` + // metric measurements for each ingredient
//   `&populate[cookingMethods][populate]=instructions` + // recipe card cooking methods
//   `&populate[detailedInstructions][populate]=images` + // detailed instruction images
//   `&populate[coverImage][populate]=true` // cover image for some reason idk

//   const res = await fetch(
//     `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/recipes${query}`,
//     { cache: 'no-store' }
//   );
//   const data = await res.json();
//   return data?.data?.[0] || null;
// }

// 2. Dynamic metadata for SEO/social sharing
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const recipe = await fetchRecipeBySlug(slug);
  if (!recipe) return {};

  const title = recipe.name || recipe.title || "Recipe";
  const description = recipe.excerpt || recipe.summary || `Learn how to make ${title} for your dog with Grublify's healthy recipe.`;
  const image = recipe.coverImage?.formats?.large?.url
    ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${recipe.coverImage.formats.large.url}`
    : "https://grublify.com/og-image-default.png";
  const tags = recipe.tags?.map(tag => tag.name) || [];

  return {
    title: `${title} | Grublify Recipes`,
    description,
    openGraph: {
      title: `${title} | Grublify Recipes`,
      description,
      url: `https://grublify.com/recipes/${recipe.slug}`,
      siteName: "Grublify",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      type: "article",
      tags: tags,
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | Grublify Recipes`,
      description,
      images: [image],
    },
    alternates: {
      canonical: `https://grublify.com/recipes/${recipe.slug}`,
    },
  };
}


async function Recipe({ params }) {
  const { slug } = await params; 

  let recipe;
  try {
    recipe = await fetchRecipeBySlug(slug);
  } catch (error) {
    // console.error("Error fetching recipe:", error);
    return <NotFound />;
  }

  if (!recipe) return <NotFound />;

  return (
    <div className="min-h-screen p-4 sm:p-8">

      {/* Main content area */}
      <div className="container mx-auto max-w-6xl">

        {/* Main content */}
        <main className="w-full lg:w-1/2 lg:mx-auto pt-4 lg:pt-6 space-y-6">
          <div className="flex flex-col gap-1">
            {/* recipe title */}
            <h3 className="text-lg font-bold text-secondary/80">RECIPE</h3>
            <h2 className="text-6xl lg:text-6xl font-bold text-primary">{recipe.name}</h2>
          </div>
          
          {/* Recipe image */}
          <img
            src={recipe.coverImage.formats.medium.url}
            alt={recipe.name}
            className="rounded-2xl object-cover h-[400px]"
          />

          {/* Recipe Card */}
          <RecipeCard recipe={recipe} />
            

          {/* Detailed Instructions */}
          <RecipeDetailedInstructions data={recipe.detailedInstructions} />
        </main>
      </div>
    </div>
  );
};

export default Recipe;
