"use client";
import React from "react";
import { useState, useEffect } from "react";

export default function HowItWorks({ data, loading }) {
  
    // Show loading state
    if (loading) {
      return <section className="bg-primary/50 py-16 min-h-screen"></section>;
    }
  
    // Guard: If there's an error or no data after loading
    if (!loading && !data) {
      return <div>No how it works data found</div>;
    }

  return (
    <section className="bg-primary/50 py-16">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="md:text-5xl text-3xl font-bold text-center mb-10 text-secondary">
          {data.howItWorksTitle}
        </h2>
        <div className="flex flex-col md:flex-row items-center justify-between md:space-x-16 space-y-8 md:space-y-0">
          {data.howItWorksSteps.map((step, idx) => (
            <div key={step.id} className="flex-1 flex flex-col items-center text-center relative">
              <div className="flex flex-col items-center" style={{ minHeight: "150px" }}>
                <img
                  src={step.image.formats.thumbnail.url}
                  alt={step.alternativeText}
                  className="h-24 object-cover mb-4"
                />
                <h3 className="mt-4 text-2xl font-bold text-secondary">{step.step}</h3>
              </div>
              <p className="mt-2 text-lg font-medium text-secondary">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
