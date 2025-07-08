import RecipeListItem from "./recipe-list-item";
import { fetchStrapiImage } from "@/lib/strapi-client";


// fetch recipes from strapi
async function fetchRecipes() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/recipes?fields=name&fields=slug&populate=coverImage&populate=tags`,
    { cache: 'no-store' }
  );
  const data = await res.json();
  return data?.data || null;
}




async function RecipeList() {
  const recipes = await fetchRecipes();
  const transitionGuideImage = await fetchStrapiImage(12);
  const portionCalculatorImage = await fetchStrapiImage(44);


  if (!recipes) return <div>Not found</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
      {recipes.map((recipe) => {


        const tags = Array.isArray(recipe.tags)
          ? recipe.tags.map(tag => tag.name)
          : [];

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
          img={transitionGuideImage.url} 
          title="Transition Guide"
          slug="transition-guide"
          tags={["Guide"]}
        />
        <RecipeListItem 
          img={portionCalculatorImage.url} 
          title="Portion Calculator"
          slug="portion-calculator"
          tags={["Guide", "Calculator"]}
        />
    </div>
  )
}  

export default RecipeList;