"use client";
import React from "react";
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
    title: "AAFCO Certified Nutrition",
    description: "Every recipe meets or exceeds AAFCO standards for complete and balanced nutrition",
    highlight: "No guesswork"
  },
  {
    icon: Heart,
    title: "Veterinarian Approved",
    description: "Formulated by certified pet nutritionists and trusted by veterinarians nationwide",
    highlight: "Expert-backed"
  },
  {
    icon: Clock,
    title: "Ready in 15 Minutes",
    description: "Simple recipes with fresh ingredients you can find at any grocery store",
    highlight: "Quick & easy"
  },
  {
    icon: DollarSign,
    title: "Save Up to 50%",
    description: "Cost-effective compared to premium kibble while providing superior nutrition",
    highlight: "Budget-friendly"
  },
  {
    icon: CheckCircle,
    title: "30-Day Guarantee",
    description: "Try risk-free with our money-back guarantee if your dog doesn't love it",
    highlight: "Risk-free"
  },
  {
    icon: Leaf,
    title: "All Natural Ingredients",
    description: "No artificial preservatives, colors, or fillers - just wholesome, real food",
    highlight: "Pure & natural"
  }
];

function BenefitCard({ benefit, index }) {
  const Icon = benefit.icon;
  
  return (
    <div className="group relative bg-white rounded-2xl p-8 border border-gray-200 hover:border-primary/30 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      {/* Icon */}
      <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors duration-300">
        <Icon className="w-8 h-8 text-primary" />
      </div>
      
      {/* Content */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <h3 className="text-xl font-semibold text-secondary">
            {benefit.title}
          </h3>
          <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
            {benefit.highlight}
          </span>
        </div>
        
        <p className="text-gray-600 leading-relaxed">
          {benefit.description}
        </p>
      </div>
      
      {/* Decorative element */}
      <div className="absolute top-4 right-4 w-2 h-2 bg-primary/20 rounded-full group-hover:bg-primary/40 transition-colors duration-300"></div>
    </div>
  );
}

export default function KeyBenefits() {
  return (
    <section className="py-16 md:py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-secondary mb-6">
            Why Choose Grublify?
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            We make homemade dog food simple, safe, and affordable. Here's what sets us apart from the competition.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {benefits.map((benefit, index) => (
            <BenefitCard key={index} benefit={benefit} index={index} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="bg-white rounded-2xl p-8 md:p-12 text-center border border-gray-200">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold text-secondary mb-4">
              Ready to Give Your Dog the Nutrition They Deserve?
            </h3>
            <p className="text-lg text-gray-600 mb-8">
              Join thousands of pet parents who've made the switch to healthier, homemade meals.
            </p>
            
            {/* Trust indicators */}
            <div className="flex flex-wrap justify-center items-center gap-8 mb-8">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium text-secondary">10,000+ Happy Dogs</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium text-secondary">AAFCO Certified</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium text-secondary">30-Day Guarantee</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
