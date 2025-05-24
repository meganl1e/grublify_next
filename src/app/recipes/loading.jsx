import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";


const RecipeListItemSkeleton = () => (
  <div className="rounded-md w-full h-72">
    <Skeleton height="100%" width="100%" />
  </div>
);

const RecipeList = () => {


  return (
    <div>
      <section className="relative py-12 px-4 md:py-16 md:px-6 bg-secondary">
        <div className="max-w-4xl md:max-w-5xl mx-auto text-left">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Recipes
          </h1>
          <p className="text-lg text-white">
            Explore our collection of healthy and nutritious recipes tailored for your dog!
          </p>
        </div>
      </section>
      <section className="py-12 px-4 md:py-16 md:px-6">
        <div className="max-w-4xl md:max-w-5xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            <RecipeListItemSkeleton className="block" />
            <RecipeListItemSkeleton className="hidden md:block" />
            <RecipeListItemSkeleton className="hidden lg:block" />
          </div>
        </div>
      </section>

    </div>
  )
}

export default RecipeList;