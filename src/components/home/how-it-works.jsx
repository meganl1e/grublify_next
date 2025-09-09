"use client";
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import Link from "next/link";
import { LuPawPrint, LuChefHat, LuDog } from "react-icons/lu";

export default function HowItWorks({ data, loading }) {

  const stepIcons = [LuPawPrint, LuChefHat, LuDog];

  // Show loading state
  if (loading) {
    return <section className="bg-white py-16 min-h-screen"></section>;
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
    <section className="bg-white py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-secondary mb-4">
            {data.howItWorksTitle || "Cook Your Dog's Perfect Meal"}
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            {data.howItWorksSubtitle || "Making nutritionally complete homemade dog food has never been easier"}
          </p>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-center gap-8">
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
                className="bg-gradient-to-br from-white to-primary-light/40 rounded-2xl shadow-lg border border-primary w-full max-w-sm p-8 flex flex-col items-center text-center hover:scale-105 hover:shadow-xl transition-all duration-300 group" 
              >
                <CardTitle className="bg-gradient-to-br from-primary-light to-primary rounded-xl w-16 h-16 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                  {Icon ? <Icon className="h-8 w-8 text-secondary" /> : <span>?</span>}
                </CardTitle>
                <div className="flex flex-col gap-1 ">
                  <div className="text-primary font-bold text-md tracking-widest">{`STEP ${String(idx + 1)}`}</div>
                  <p className="text-2xl font-extrabold text-secondary group-hover:text-primary transition-colors duration-300">{step.step || "Missing step title"}</p>
                </div>
                <CardContent className="p-0">
                  <p className="text-secondary/80 text-base text-center">{step.description || "No description provided."}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
        
        {/* Enhanced CTA */}
        <div className="text-center mt-12">
          <Link href="/products/nutrition-pack-essentials">
            <Button 
              variant="enhanced" 
              size="lg"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Try Grublify Now
                <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </Button>
          </Link>
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
