import RecipeList from "../../components/recipe-list";

export default function Recipes() {
  return (
    <div className="flex-1">
      <section className="relative py-12 px-4 md:py-16 md:px-6 bg-secondary">
        <div className="max-w-4xl md:max-w-5xl mx-auto text-left">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Recipes
          </h1>
          <p className="text-lg text-white">
            Explore our collection of healthy and nutritious recipes tailored for your furry friend!
          </p>
        </div>
      </section>
      
      <section className="py-12 px-4 md:py-16 md:px-6">
        <div className="max-w-4xl md:max-w-5xl mx-auto">
          <RecipeList />
        </div>
      </section>
    </div>
  );
}