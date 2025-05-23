"use client";
import RecipeListItem from "./recipe-list-item";
import { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";


const RecipeListItemSkeleton = () => (
  <div className="rounded-md w-full h-72">
    <Skeleton height="100%" width="100%" />
  </div>
);

const RecipeList = () => {

  const [recipes, setRecipes] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/recipes?fields=name&fields=slug&populate=coverImage&populate=tags`)
    // fetch('http://localhost:1337/api/recipes?fields=name&fields=slug&populate=coverImage&populate=tags')
      .then(res => res.json())
      .then(data => {
        setRecipes(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);


  // Guard: If there's an error or no data after loading
  if (!loading && !recipes) {
    return <div>No recipes data found</div>;
  }


  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
        {loading ? (
          <>
            <RecipeListItemSkeleton className="block" />
            <RecipeListItemSkeleton className="hidden md:block" />
            <RecipeListItemSkeleton className="hidden lg:block" />
          </>
        ) : (
          <>
            {recipes.data.map((recipe) => {


              const tags = Array.isArray(recipe.tags)
                ? recipe.tags.map(tag => tag.name)
                : [];

              // TESTING ONLY
              // const imageUrl =
              //   recipe.coverImage?.formats?.thumbnail?.url
              //     ? `http://localhost:1337${recipe.coverImage.formats.small.url}`
              //     : recipe.coverImage?.url
              //       ? `http://localhost:1337${recipe.coverImage.url}`
              //       : "";

              const imageUrl =
                recipe.coverImage?.formats?.thumbnail?.url
                  ? `${recipe.coverImage.formats.small.url}`
                  : recipe.coverImage?.url
                    ? `${recipe.coverImage.url}`
                    : "";
    
              return (
                <RecipeListItem
                  key={recipe.id}
                  title={recipe.name}
                  slug={recipe.slug}
                  img={imageUrl}
                  tags={tags}
                />
              );
            })}

            <RecipeListItem 
                img={`${process.env.NEXT_PUBLIC_STRAPI_MEDIA_URL}/still_life_pet_food_arrangement_45d067c3f8.jpg`} 
                title="Transition Guide"
                slug="transition-guide"
                tags={["Guide"]}
              />
          </>
        )}
    </div>
  )
}  

export default RecipeList;