import { useState } from "react";

const RecipeCard = ({ recipe }) => {
  const [selectedMethod, setSelectedMethod] = useState(0)
  const [unit, setUnit] = useState("metric")

  return (
    <div className="bg-primary/40 min-h-screen p-6 rounded-lg">
      
      <div className="max-w-4xl p-6 bg-white rounded-lg overflow-hidden">

        {/* Title */}
        <h1 className="text-3xl font-bold text-secondary">{recipe.name}</h1>

        {/* Recipe Information */}
        <div className="mb-6">
            
          {/* Content */}
          <div className="grid grid-cols-2 gap-4 p-2 text-gray-800">
            {/* Prep Time */}
            <div>
              <p className="font-semibold">Prep Time:</p>
              <p>{recipe.cookingMethods[selectedMethod].prepTime}</p>
            </div>

            {/* Cook Time */}
            <div>
              <p className="font-semibold">Cook Time:</p>
              <p>{recipe.cookingMethods[selectedMethod].cookTime}</p>
            </div>

            {/* Total Time */}
            <div>
              <p className="font-semibold">Total Time:</p>
              <p>{recipe.cookingMethods[selectedMethod].totalTime}</p>
            </div>

            {/* Servings */}
            <div>
              <p className="font-semibold">Servings:</p>
              <p>XX</p>
            </div>
          </div>
        </div>

        {/* Ingredients */}
        <section className="mb-6">
          <div className="flex flex-col md:gap-4 md:flex-row">
            <h3 className="text-2xl text-secondary font-semibold mb-4">Ingredients</h3>
            {/* Unit Switcher */}
            <div className="flex items-center mb-4">
              <button
                className={`px-3 py-1 rounded-l-lg font-semibold border border-secondary transition-colors duration-150
                  ${unit === "imperial" ? "bg-secondary text-white" : "bg-white text-secondary"}`}
                onClick={() => setUnit("imperial")}
              >
                Imperial
              </button>
              <button
                className={`px-3 py-1 rounded-r-lg font-semibold border border-secondary border-l-0 transition-colors duration-150
                  ${unit === "metric" ? "bg-secondary text-white" : "bg-white text-secondary"}`}
                onClick={() => setUnit("metric")}
              >
                Metric
              </button>
            </div>
          </div>
          <ul className="list-disc list-inside text-secondary space-y-2">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index}>
                {/* Safely access the nested component */}
                {ingredient[unit]?.amount}{" "}
                {ingredient[unit]?.unit}{" "}
                {ingredient.name}
                {ingredient.notes && (
                  <span> - {ingredient.notes}</span>
                )}
              </li>
            ))}
          </ul>
        </section>

        {/* Cooking Method Selector */}
        <div className="mb-6">
          <h3 className="text-2xl font-semibold text-secondary mb-4">Select Cooking Method:</h3>
          <div className="flex flex-col gap-4 sm:flex-row sm:gap-4 sm:justify-center sm:items-center w-fit justify-center">
            {recipe.cookingMethods.map((method, index) => (
              <button
                key={index}
                className={`px-4 py-2 rounded-lg font-semibold border border-secondary border-l transition-transform duration-200 ease-in-out ${
                  selectedMethod === index
                    ? "bg-secondary text-white scale-105"
                    : "bg-white text-secondary hover:bg-secondary hover:text-white"
                }`}
                onClick={() => setSelectedMethod(index)}
              >
                {method.methodType}
              </button>
            ))}
          </div>
        </div>


        {/* Instructions */}
        <section className="mb-6">
          <h3 className="text-2xl text-secondary font-semibold mb-2">Instructions</h3>
          <ol className="list-decimal list-inside text-secondary space-y-2">
            {recipe.cookingMethods[selectedMethod].instructions.map((step, index) => (
              <li key={index}>
                {step.text.map((paragraph, pIndex) =>
                  paragraph.children.map((child, cIndex) => (
                    <span key={`${pIndex}-${cIndex}`}>{child.text}</span>
                  ))
                )}
              </li>
            ))}
          </ol>
        </section>

        {/* Consumption and Storage */}
        <section className="mb-6">
          <h3 className="text-2xl text-secondary font-semibold mb-w">Consumption and Storage</h3>
          <p className="text-secondary mb-2">{recipe.consumptionAndStorage ?? "Not available"}</p>
        </section>

        {/* Nutritional Info */}
        <section className="">
          <h3 className="text-2xl text-secondary font-semibold mb-2">Nutritional Info</h3>
          <p className="text-secondary mb-2">{recipe.nutritionalInfo ?? "Not available"}</p>
        </section>



      </div>
    </div>
  );
};

export default RecipeCard;
