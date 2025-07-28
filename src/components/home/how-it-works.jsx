"use client";
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";


import { LuPawPrint, LuChefHat, LuDog } from "react-icons/lu";

export default function HowItWorks({ data, loading }) {

  const stepIcons = [LuPawPrint, LuChefHat, LuDog];

  // Show loading state
  if (loading) {
    return <section className="bg-primary-light py-16 min-h-screen"></section>;
  }

  // Guard: If there's an error or no data after loading
  if (!loading && !data) {
    console.error("No data provided to HowItWorks!");
    return <div>No how it works data found</div>;
  }

  // Defensive: Check if steps exist and are an array
  if (!Array.isArray(data.howItWorksSteps) || data.howItWorksSteps.length === 0) {
    console.error("howItWorksSteps is missing or not an array:", data.howItWorksSteps);
    return <div>No steps to show.</div>;
  }

  return (
    <section className="bg-primary-light py-16">
      <div className="md:max-w-5xl mx-auto px-4">
        <div className="flex flex-col items-center justify-between gap-4 mb-10">
          <h2 className="md:text-5xl text-3xl font-bold text-center text-secondary">
            {data.howItWorksTitle || "How It Works"}
          </h2>
          <p className="text-foreground text-lg md:text-xl px-4">
            {data.howItWorksSubtitle || "Making nutritionally complete homemade dog food has never been easier"}
          </p>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between md:space-x-8 space-y-8 md:space-y-0">
          {data.howItWorksSteps.map((step, idx) => {
            if (!step) {
              console.error(`Step at index ${idx} is undefined:`, step);
              return <div key={idx}>Step missing</div>;
            }
            const Icon = stepIcons[idx] || null;
            if (!Icon) {
              console.warn(`No icon for step index ${idx}`);
            }
            return (
              <Card 
                key={step.id || idx} 
                className="bg-white rounded-2xl shadow-0 border-0 max-w-md p-8 flex flex-col items-center text-center hover:scale-105 transition-transform duration-300" 
              >
                <CardTitle className="bg-primary rounded-xl w-16 h-16 flex items-center justify-center">
                  {Icon ? <Icon className="h-8 w-8 text-white" /> : <span>?</span>}
                </CardTitle>
                <div className="flex flex-col gap-1 ">
                  <div className="text-primary font-bold text-md tracking-widest">{`STEP ${String(idx + 1)}`}</div>
                  <p className="text-2xl font-extrabold text-secondary">{step.step || "Missing step title"}</p>
                </div>
                <CardContent className="p-0">
                  <p className="text-secondary text-base text-center">{step.description || "No description provided."}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}




// <Card key={step.id || idx} className="bg-white rounded-2xl shadow-0 border-0 max-w-md p-8 flex flex-col items-center text-center">
// <div className="bg-primary rounded-xl w-16 h-16 flex items-center justify-center mb-4">
  {/* {Icon ? <Icon className="h-8 w-8 text-white" /> : <span>?</span>} */}
{/* </div>
<CardTitle className="flex flex-col gap-2 ">
  <div className="text-primary font-bold text-md tracking-widest">{`STEP ${String(idx + 1)}`}</div>
  <p className="text-xl font-extrabold text-secondary">{step.step || "Missing step title"}</p>
</CardTitle>
<CardContent className="p-0">
  <p className="text-secondary text-base text-center">{step.description || "No description provided."}</p>
</CardContent>
</Card> */}