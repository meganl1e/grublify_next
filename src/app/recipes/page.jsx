import RecipeList from "../../components/recipes/recipe-list";
import PageHeader from "../../components/ui/page-header";
import { fetchRecipes, fetchStrapiImageById } from "@/lib/strapi-client";

export default async function Recipes() {

  const recipes = await fetchRecipes();

  // later, these will not be hardcoded lolol
  // i just don't have anywhere to put the transition guide and portion calculator rn
  const transitionGuideImage = await fetchStrapiImageById(12);
  const portionCalculatorImage = await fetchStrapiImageById(44);

  if (!recipes) return <div>Not found</div>;

  return (
    <div className="flex-1">
      <PageHeader
        title="Recipes"
        subtitle="Explore our collection of healthy and nutritious recipes tailored for your furry friend!"
        variant="default"
      />
      
      <section className="py-12 px-4 md:py-16 md:px-6">
        <div className="max-w-4xl md:max-w-5xl mx-auto">
          <RecipeList 
            recipes={recipes}
            transitionGuideImage={transitionGuideImage}
            portionCalculatorImage={portionCalculatorImage}
          />
        </div>
      </section>
    </div>
  );
}