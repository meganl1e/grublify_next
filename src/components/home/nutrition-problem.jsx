"use client";
import React from "react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import Link from "next/link";
import { AlertTriangle, CheckCircle, BookOpen, Award, ArrowRight, Shield, Users } from "lucide-react";

export default function NutritionProblem() {
  return (
    <section className="py-16 md:py-20 bg-gradient-to-b from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Main Title with 95% */}
        <div className="text-center mb-16">
          <div className="text-7xl md:text-8xl font-bold text-secondary mb-4">
            95%
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">
            of homemade dog meals are nutritionally incomplete
          </h2>
          <p className="text-lg text-gray-500 italic">
            UC Davis School of Veterinary Medicine, 2013
          </p>
        </div>

        {/* Problem vs Solution */}
        <div className="grid lg:grid-cols-2 gap-12 ">
          {/* Problem Side */}
          <div className="space-y-6">
            <div className="text-center lg:text-left">
              <h3 className="text-2xl md:text-3xl font-bold text-secondary mb-4">
                The Problem
              </h3>
              <p className="text-base text-gray-600 mb-6">
                Most homemade recipes lack the scientific precision needed for complete nutrition.
              </p>
            </div>

            {/* Problem Points */}
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-secondary mb-1">Missing Essential Nutrients</h4>
                  <p className="text-base text-gray-600">Lack proper vitamin and mineral balance</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-secondary mb-1">Incorrect Ratios</h4>
                  <p className="text-base text-gray-600">Don't meet AAFCO standards</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-secondary mb-1">Health Risks</h4>
                  <p className="text-base text-gray-600">Can lead to nutritional deficiencies</p>
                </div>
              </div>
            </div>
          </div>

          {/* Solution Side */}
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-200">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-light to-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-secondary mb-4">
                The <span className="text-primary">Grublify</span> Solution
              </h3>
              <p className="text-lg text-gray-600">
                Nutritionist-formulated recipes + complete nutrition packs for balanced meals.
              </p>
            </div>

            {/* Solution Points */}
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                <span className="text-base font-semibold text-secondary">Meets AAFCO Standards</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                <span className="text-base font-semibold text-secondary">Nutritionist Formulated</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                <span className="text-base font-semibold text-secondary">Easy to Follow</span>
              </div>
            </div>

            <Link href="/products/nutrition-pack-essentials">
              <Button 
                variant="enhanced" 
                size="lg"
                className="w-full"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  See How We Solve This
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </span>
              </Button>
            </Link>
          </div>
        </div>

        {/* Bottom Trust Indicators */}
        {/* <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-200">
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-bold text-secondary mb-4">
              Backed by Science
            </h3>
            <p className="text-lg text-gray-600">
              Based on veterinary nutrition research and AAFCO guidelines
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                <BookOpen className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="text-lg font-bold text-secondary mb-2">Research-Based</h4>
              <p className="text-base text-gray-600">UC Davis veterinary studies</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Award className="w-6 h-6 text-green-600" />
              </div>
              <h4 className="text-lg font-bold text-secondary mb-2">AAFCO Compliant</h4>
              <p className="text-base text-gray-600">Meets nutritional standards</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Shield className="w-6 h-6 text-purple-600" />
              </div>
              <h4 className="text-lg font-bold text-secondary mb-2">Complete Nutrition</h4>
              <p className="text-base text-gray-600">All essential nutrients</p>
            </div>
          </div>
        </div> */}
      </div>
    </section>
  );
}
