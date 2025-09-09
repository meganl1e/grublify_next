"use client";
import React from "react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import Link from "next/link";
import { 
  Heart, 
  Shield, 
  Clock, 
  DollarSign, 
  CheckCircle, 
  Users,
  Award,
  Leaf
} from "lucide-react";

const benefits = [
  {
    icon: Shield,
    title: "Meets AAFCO Standards",
    description: "Complete and balanced nutrition that meets veterinary standards"
  },
  {
    icon: Heart,
    title: "Pet Nutritionist Formulated",
    description: "Crafted by certified pet nutritionists for optimal health"
  },
  {
    icon: Clock,
    title: "Ready in 15 Minutes",
    description: "Simple recipes with fresh ingredients from any grocery store"
  },
  {
    icon: CheckCircle,
    title: "30-Day Guarantee",
    description: "Try risk-free with our money-back guarantee"
  }
];

function BenefitCard({ benefit, index }) {
  const Icon = benefit.icon;
  
  return (
    <div className="group relative bg-gradient-to-br from-white to-green-50/50 rounded-2xl p-8 border border-green-200 hover:border-green-300 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
      {/* Icon */}
      <div className="w-16 h-16 bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl flex items-center justify-center mb-6 group-hover:from-primary/20 group-hover:to-accent/20 transition-all duration-300 shadow-md">
        <Icon className="w-8 h-8 text-primary group-hover:text-accent transition-colors duration-300" />
      </div>
      
      {/* Content */}
      <div className="space-y-3">
        <h3 className="text-xl font-semibold text-secondary group-hover:text-primary transition-colors duration-300">
          {benefit.title}
        </h3>
        
        <p className="text-secondary/80 leading-relaxed">
          {benefit.description}
        </p>
      </div>
      
      {/* Decorative element */}
      <div className="absolute top-4 right-4 w-2 h-2 bg-primary/30 rounded-full group-hover:bg-accent/50 transition-colors duration-300"></div>
    </div>
  );
}

export default function KeyBenefits() {
  return (
    <section className="py-16 md:py-20 bg-primary">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-slate-800 mb-6">
            Your Dog Deserves Better
          </h2>
          <p className="text-lg md:text-xl text-slate-700 max-w-3xl mx-auto">
            Nutritionist-formulated recipes and complete nutrition packs. Fresh, healthy, and made with love.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {benefits.map((benefit, index) => (
            <BenefitCard key={index} benefit={benefit} index={index} />
          ))}
        </div>

        {/* Enhanced CTA */}
        <div className="text-center mt-12">
          <Link href="/products/nutrition-pack-essentials">
            <Button 
              variant="secondary" 
              size="lg"
              className="cursor-pointer group relative text-lg px-10 py-6 bg-gradient-to-r from-secondary to-secondary/90 text-white font-semibold border-2 border-secondary rounded-2xl hover:from-secondary/90 hover:to-secondary transition-all duration-300 ease-out shadow-lg hover:shadow-xl transform hover:scale-105 hover:-translate-y-1"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Shop Now
                <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
