"use client";
import { useState } from "react";
import Link from "next/link";
import { Button } from "../ui/button";

const RecipeCard = ({ recipe }) => {
  const [selectedMethod, setSelectedMethod] = useState(0)
  const [unit, setUnit] = useState("metric")

  const handlePrint = () => {
    // Create a new window for printing
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>Print Recipe - ${recipe.name}</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; line-height: 1.4; }
            .header { text-align: center; margin-bottom: 20px; border-bottom: 1px solid #ccc; padding-bottom: 10px; }
            .title { font-size: 24px; font-weight: bold; margin-bottom: 5px; }
            .subtitle { font-size: 12px; color: #666; }
            .recipe-info { display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 10px; padding: 10px; background: #f5f5f5; margin-bottom: 20px; font-size: 12px; }
            .two-column { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px; }
            .ingredients ul { list-style: disc; margin: 0; padding-left: 20px; }
            .ingredients li { margin-bottom: 5px; font-size: 12px; }
            .instructions ol { list-style: decimal; margin: 0; padding-left: 20px; }
            .instructions li { margin-bottom: 8px; font-size: 12px; }
            .section-title { font-size: 16px; font-weight: bold; margin-bottom: 10px; }
            .image { text-align: center; margin: 10px 0; }
            .image img { max-width: 150px; height: auto; }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="title">${recipe.name}</div>
            <div class="subtitle">Grublify Recipe • ${new Date().toLocaleDateString()}</div>
          </div>
          
          <div class="image">
            <img src="${recipe.coverImage.formats.medium.url}" alt="${recipe.name}" />
          </div>
          
          <div class="recipe-info">
            <div><strong>Prep:</strong> ${recipe.cookingMethods[selectedMethod].prepTime}</div>
            <div><strong>Cook:</strong> ${recipe.cookingMethods[selectedMethod].cookTime}</div>
            <div><strong>Total:</strong> ${recipe.cookingMethods[selectedMethod].totalTime}</div>
            <div><strong>Method:</strong> ${recipe.cookingMethods[selectedMethod].methodType}</div>
          </div>
          
          <div class="two-column">
            <div class="ingredients">
              <div class="section-title">Ingredients</div>
              <ul>
                ${recipe.ingredients.map(ingredient => `
                  <li><strong>${ingredient.metric?.amount} ${ingredient.metric?.unit} 
                    ${ingredient.imperial?.amount && ingredient.imperial?.unit ?
        `(${ingredient.imperial.amount} ${ingredient.imperial.unit})` : ''}
                  </strong> ${ingredient.name}
                  ${ingredient.notes ? ` - ${ingredient.notes}` : ''}</li>
                `).join('')}
              </ul>
            </div>
            
            <div>
              ${recipe.consumptionAndStorage ? `
                <div class="section-title">Storage & Consumption</div>
                <p style="font-size: 12px; margin: 0 0 15px 0;">${recipe.consumptionAndStorage}</p>
              ` : ''}
              
              ${recipe.nutritionalInfo ? `
                <div class="section-title">Nutritional Info</div>
                <p style="font-size: 12px; margin: 0;">${recipe.nutritionalInfo}</p>
              ` : ''}
            </div>
          </div>
          
          <div class="instructions">
            <div class="section-title">Instructions</div>
            <ol>
              ${recipe.cookingMethods[selectedMethod].instructions.map(step => `
                <li>${step.text.map(paragraph =>
          paragraph.children.map(child => child.text).join('')
        ).join(' ')}</li>
              `).join('')}
            </ol>
          </div>
        </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.focus();

    // Wait for content to load then print
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 500);
  };

  return (
    <div className="bg-primary/40 min-h-screen p-6 rounded-lg">

      <div className="max-w-4xl p-6 bg-white rounded-lg overflow-hidden">

        {/* Title and Print Button */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-secondary">{recipe.name}</h1>
          <Button
            onClick={handlePrint}
            className="bg-secondary  text-white print:hidden"
          >
            🖨️ Print Recipe
          </Button>
        </div>

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
              {recipe.servings ? (
                <p>{recipe.servings}</p>
              ) : (

                <Button
                  variant="default"
                  size="sm"
                >
                  <Link
                    aria-label="Open portion calculator in a new tab"
                    href="/recipes/portion-calculator"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Portion Calculator
                  </Link>

                </Button>

              )}


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
                className={`px-3 py-1 rounded-l-lg font-semibold border border-secondary transition-colors duration-150 cursor-pointer
                  ${unit === "imperial" ? "bg-secondary text-white" : "bg-white text-secondary"}`}
                onClick={() => setUnit("imperial")}
              >
                Imperial
              </button>
              <button
                className={`px-3 py-1 rounded-r-lg font-semibold border border-secondary border-l-0 transition-colors duration-150 cursor-pointer
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
                className={`px-4 py-2 rounded-lg font-semibold border border-secondary border-l transition-transform duration-200 ease-in-out cursor-pointer ${selectedMethod === index
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
