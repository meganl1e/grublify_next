import RecipeListItem from "./recipe-list-item";

function RecipeList({ recipes, transitionGuideImage, portionCalculatorImage }) {
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