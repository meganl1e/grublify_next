"use client";
import React, { useState } from 'react';

const transitionSteps = [
  {
    days: "Days 1-2:",
    newFood: 25,
    oldFood: 75,
  },
  {
    days: "Days 3-4:",
    newFood: 50,
    oldFood: 50,
  },
  {
    days: "Days 5-6:",
    newFood: 75,
    oldFood: 25,
  },
  {
    days: "Days 7 and onward:",
    newFood: 100,
    oldFood: 0,
  },
];

function PieChart({ newFood, oldFood }) {
  // Helper to get coordinates for a given angle and radius
  const getCoords = (angle, radius = 30) => {
    const rad = ((angle - 90) * Math.PI) / 180;
    return {
      x: 50 + radius * Math.cos(rad),
      y: 50 + radius * Math.sin(rad),
    };
  };

  // Special cases: 100% or 0%
  if (newFood === 100) {
    return (
      <svg width="120" height="120" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="50" fill="#ff9900" />
        <text
          x="50"
          y="50"
          textAnchor="middle"
          fontSize="24"
          fontWeight="bold"
          fill="#fff"
          dy=".35em"
        >
          100%
        </text>
      </svg>
    );
  }
  if (newFood === 0) {
    return (
      <svg width="120" height="120" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="50" fill="#6fceb8" />
        <text
          x="50"
          y="50"
          textAnchor="middle"
          fontSize="24"
          fontWeight="bold"
          fill="#fff"
          dy=".35em"
        >
          100%
        </text>
      </svg>
    );
  }

  // The rest of your pie chart code...
  const angle = (newFood / 100) * 360;
  const largeArc = angle > 180 ? 1 : 0;
  const radians = ((angle - 90) * Math.PI) / 180;
  const x = 50 + 50 * Math.cos(radians);
  const y = 50 + 50 * Math.sin(radians);

  // For label positions: find the center angle of each slice
  const newFoodAngle = angle / 2;
  const oldFoodAngle = angle + (360 - angle) / 2;

  const newFoodLabel = getCoords(newFoodAngle, 30);
  const oldFoodLabel = getCoords(oldFoodAngle, 30);

  return (
    <svg width="120" height="120" viewBox="0 0 100 100">
      {/* Old food background */}
      <circle cx="50" cy="50" r="50" fill="#6fceb8" />
      {/* New food pie slice */}
      <path
        d={`
          M50,50
          L50,0
          A50,50 0 ${largeArc} 1 ${x},${y}
          Z
        `}
        fill="#ff9900"
      />
      {/* New food percentage label */}
      <text
        x={newFoodLabel.x}
        y={newFoodLabel.y}
        textAnchor="middle"
        fontSize="15"
        fontWeight="bold"
        fill="#fff"
        dy=".35em"
        style={{ pointerEvents: "none" }}
      >
        {newFood}%
      </text>
      {/* Old food percentage label */}
      <text
        x={oldFoodLabel.x}
        y={oldFoodLabel.y}
        textAnchor="middle"
        fontSize="15"
        fontWeight="bold"
        fill="#fff"
        dy=".35em"
        style={{ pointerEvents: "none" }}
      >
        {oldFood}%
      </text>
    </svg>
  );
}

export default function TransitionGuide() {
  const [amounts, setAmounts] = useState({
    oldFoodAmount: "",
    newFoodAmount: "",
    oldFoodUnit: "grams",
    newFoodUnit: "grams",
  });

  const [calculatedSteps, setCalculatedSteps] = useState(transitionSteps);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setAmounts((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleCalculate = () => {
    const oldFoodTotal = parseFloat(amounts.oldFoodAmount || 0);
    const newFoodTotal = parseFloat(amounts.newFoodAmount || 0);

    const updatedSteps = transitionSteps.map((step) => ({
      ...step,
      newFoodAmount: ((step.newFood / 100) * newFoodTotal).toFixed(2),
      oldFoodAmount: ((step.oldFood / 100) * oldFoodTotal).toFixed(2),
    }));

    setCalculatedSteps(updatedSteps);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-6xl font-bold text-primary mb-4">Transition Guide</h1>
      <p className="mb-4 text-secondary">
        Gradually switching your dog’s food helps their digestive system adjust to new ingredients, making the transition smoother and more comfortable. A week-long transition is recommended when switching your dog to new food.
      </p>

      {/* INSTRUCTIONS */}
      <h3 className="font-bold text-xl mb-2 text-secondary">Instructions:</h3>
      <ol className="list-decimal list-inside mb-8 space-y-1">
        <li className="text-secondary">
          Record the date you started introducing your dog to the new food, so you can keep track of what day you're on.
        </li>
        <li className="text-secondary">
          Use the schedule below to gradually mix the new food with your dog’s old food.
        </li>
        <li className="text-secondary">
          <span className="font-bold">
            If your dog experiences any issues, such as an upset stomach or changes in behavior, please contact Grublify Inc. immediately.
          </span>
        </li>
      </ol>

      <div className="max-w-xl mx-auto bg-gray-100 shadow rounded-lg p-6 mb-8">
        <div className="flex flex-col sm:flex-row items-center justify-between sm:gap-6 gap-4 mb-6">
          {/* Old Food Amount */}
          <div className="w-full sm:w-1/2">
            <label htmlFor="oldFoodAmount" className="block text-secondary mb-2 font-semibold">
              Old food amount:
            </label>
            <div className="flex items-center gap-2 w-full">
              <input
                type="number"
                id="oldFoodAmount"
                value={amounts.oldFoodAmount}
                onChange={handleInputChange}
                className="bg-gray-50 border border-gray-300 text-secondary text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full p-2.5 h-[42px]"
                placeholder="Enter a number"
              />
              <select
                id="oldFoodUnit"
                className="bg-gray-50 border border-gray-300 text-secondary text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 p-2.5 h-[42px]"
                // defaultValue="grams"
                value={amounts.oldFoodUnit}
                onChange={handleInputChange}
              >
                <option value="grams">g</option>
                <option value="cups">cups</option>
                <option value="oz">oz</option>
              </select>
            </div>
          </div>

          {/* New Food Amount */}
          <div className="w-full sm:w-1/2">
            <label htmlFor="newFoodAmount" className="block text-secondary mb-2 font-semibold">
              New food amount:
            </label>
            <div className="flex items-center gap-2 w-full">
              <input
                type="number"
                id="newFoodAmount"
                value={amounts.newFoodAmount}
                onChange={handleInputChange}
                className="bg-gray-50 border border-gray-300 text-secondary text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full p-2.5 h-[42px]"
                placeholder="Enter a number"
              />
              <select
                id="newFoodUnit"
                value={amounts.newFoodUnit}
                onChange={handleInputChange}
                className="bg-gray-50 border border-gray-300 text-secondary text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 p-2.5 h-[42px]"
                // defaultValue="grams"
              >
                <option value="grams">g</option>
                <option value="cups">cups</option>
                <option value="oz">oz</option>
              </select>
            </div>
          </div>
        </div>

        <button
          onClick={handleCalculate}
          className="w-full bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded transition"
        >
          Calculate
        </button>
      </div>

      {/* VISUALS */}
      <div className="space-y-8">
        {calculatedSteps.map((step, idx) => (
          <div key={step.days} className="flex flex-col md:flex-row md:items-center md:gap-8">
            <div className="flex-1">
              <div
                className={`text-2xl md:text-3xl font-extrabold mb-1 ${
                  idx === 3 ? "text-secondary" : "text-secondary"
                }`}
              >
                {step.days}
              </div>
              <div className="text-lg text-secondary">
                {step.newFood < 100 ? (
                  <>
                    Mix <span className="font-bold text-[#ff9900]">{step.newFood}%</span>{" "}
                    <span className="font-bold text-[#ff9900]">new food</span>{" "}
                    {step.newFoodAmount && (
                      <span className="font-bold text-[#ff9900]">
                        ({step.newFoodAmount} {amounts.newFoodUnit})
                      </span>
                    )}{" "}
                    with <span className="font-bold text-primary">{step.oldFood}%</span>{" "}
                    <span className="font-bold text-primary">old food</span>{" "}
                    {step.oldFoodAmount && (
                      <span className="font-bold text-primary">
                        ({step.oldFoodAmount} {amounts.oldFoodUnit})
                      </span>
                    )}{" "}
                    for each meal.
                  </>
                ) : (
                  <>
                    Your meal should now be{" "}
                    <span className="font-bold text-[#ff9900]">{step.newFood}%</span>{" "}
                    <span className="font-bold text-[#ff9900]">new food</span>{" "}
                    {step.newFoodAmount && (
                      <span className="font-bold text-[#ff9900]">
                        ({step.newFoodAmount} {amounts.newFoodUnit})
                      </span>
                    )}.
                  </>
                )}
              </div>
            </div>
            <div className="flex justify-center mt-4 md:mt-0">
              <PieChart newFood={step.newFood} oldFood={step.oldFood} />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 flex items-center gap-4">
        <span className="font-bold text-secondary">Key:</span>
        <span className="text-[#ff9900] font-semibold">Orange: new food</span>
        <span className="text-primary font-semibold">Green: old food</span>
      </div>
    </div>
  );
}
