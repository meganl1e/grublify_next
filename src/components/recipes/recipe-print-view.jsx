// src/components/recipes/recipe-print-view.jsx
"use client";

const RecipePrintView = ({ recipe, selectedMethod = 0, selectedUnit = "metric" }) => {
  return (
    <>
      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden;
          }
          .print-only, .print-only * {
            visibility: visible;
          }
        }
      `}</style>
      <div className="print-only print:block hidden">
        {/* Print Content */}
        <div className="max-w-4xl mx-auto bg-white p-2 rounded print:max-w-none print:p-1 print:absolute print:top-0 print:left-0 print:w-full">
          {/* Header */}
          <div className="text-center mb-2 pb-1 border-b border-gray-300">
            <h1 className="text-lg font-bold text-gray-700 mb-0.5">{recipe.name}</h1>
            <p className="text-xs text-gray-500">Grublify Recipe • {new Date().toLocaleDateString()}</p>
          </div>

          {/* Recipe Image */}
          <div className="text-center mt-1.5">
            <img
              src={recipe.coverImage.formats.medium.url}
              alt={recipe.name}
              className="max-w-32 h-auto mx-auto"
            />
          </div>

          {/* Recipe Info - Compact */}
          <div className="grid grid-cols-4 gap-1.5 p-1 text-gray-700 text-xs mb-1.5 bg-gray-50 rounded">
            <div><span className="font-semibold">Prep:</span> {recipe.cookingMethods[selectedMethod].prepTime}</div>
            <div><span className="font-semibold">Cook:</span> {recipe.cookingMethods[selectedMethod].cookTime}</div>
            <div><span className="font-semibold">Total:</span> {recipe.cookingMethods[selectedMethod].totalTime}</div>
            <div><span className="font-semibold">Method:</span> {recipe.cookingMethods[selectedMethod].methodType}</div>
          </div>

          {/* Two Column Layout - Ingredients + Image on left, Storage & Nutrition on right */}
          <div className="grid grid-cols-2 gap-3 mb-2">

            {/* Left Column - Ingredients */}
            <div className="mb-2">
              <h2 className="text-sm font-semibold text-gray-700 mb-1">Ingredients</h2>
              <ul className="list-disc list-inside text-gray-700 leading-tight text-xs mb-2 p-0">
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index} className="mb-0.5">
                    <strong>
                      {ingredient.metric?.amount} {ingredient.metric?.unit}
                      {ingredient.imperial?.amount && ingredient.imperial?.unit && (
                        <span> ({ingredient.imperial.amount} {ingredient.imperial.unit})</span>
                      )}
                    </strong> {ingredient.name}
                    {ingredient.notes && <span> - {ingredient.notes}</span>}
                  </li>
                ))}
              </ul>
            </div>

            {/* Right Column - Storage & Nutrition */}
            <div>
              {/* Storage */}
              {recipe.consumptionAndStorage && (
                <div className="mb-2">
                  <h2 className="text-sm font-semibold text-gray-700 mb-1">Storage & Consumption</h2>
                  <p className="text-gray-700 leading-tight text-xs m-0">{recipe.consumptionAndStorage}</p>
                </div>
              )}

              {/* Nutrition */}
              {recipe.nutritionalInfo && (
                <div>
                  <h2 className="text-sm font-semibold text-gray-700 mb-1">Nutritional Info</h2>
                  <p className="text-gray-700 leading-tight text-xs m-0">{recipe.nutritionalInfo}</p>
                </div>
              )}
            </div>
          </div>

          {/* Full Width Instructions */}
          <div className="mb-2">
            <h2 className="text-sm font-semibold text-gray-700 mb-1">Instructions</h2>
            <ol className="list-decimal list-inside text-gray-700 leading-tight text-xs m-0 p-0">
              {recipe.cookingMethods[selectedMethod].instructions.map((step, index) => (
                <li key={index} className="mb-1">
                  {step.text.map((paragraph, pIndex) =>
                    paragraph.children.map((child, cIndex) => (
                      <span key={`${pIndex}-${cIndex}`}>{child.text}</span>
                    ))
                  )}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
      </>
  );
};

export default RecipePrintView;