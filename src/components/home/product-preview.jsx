import { ChefHat, Heart, Shield, Star, CheckCircle, ArrowRight, Users, Award, Truck } from "lucide-react";
import { LuDollarSign } from "react-icons/lu";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import fetchProductPreview from "@/lib/shopify-client";

export default async function ProductPreview() {

  const data = await fetchProductPreview({ handle: "nutrition-pack-essentials" });
  if (!data) return null;
  // console.log(data)

  const images = data.images?.edges?.map(edge => edge.node) || [];
  const coverImage = images[0] || null;

  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-5xl font-bold text-secondary mb-4">Nutrition You Can Count On</h2>
          <p className="text-lg md:text-xl text-gray-600">Expert-formulated packs and simple feeding guides for every dog.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Shield className="w-6 h-6 text-teal-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-secondary mb-2">Premium Nutrition Packs</h3>
                  <p className="text-base text-gray-600">
                    Essential vitamins and minerals that meet AAFCO standards.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <ChefHat className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-secondary mb-2">Easy Recipes</h3>
                  <p className="text-base text-gray-600">
                    Step-by-step guides with fresh ingredients from any grocery store.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <LuDollarSign className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-secondary mb-2">As Low as $0.13/Day*</h3>
                  <p className="text-base text-gray-600">Affordable nutrition that every dog deserves.</p>
                </div>
              </div>
            </div>

            {/* <Button
              variant="secondary"
              size="lg"
              className="cursor-pointer group relative w-full md:w-auto text-lg px-10 py-6 bg-gradient-to-r from-secondary to-secondary/90 text-white font-semibold border-2 border-secondary rounded-2xl hover:from-secondary/90 hover:to-secondary transition-all duration-300 ease-out shadow-lg hover:shadow-xl transform hover:scale-105 hover:-translate-y-1"
            >
              <Link href={`/products/nutrition-pack-essentials`}>

                Shop Nutrition Packs
              </Link>
            </Button> */}
          </div>

           <div className="flex flex-col justify-center items-center">
            <div className="max-w-sm w-full">
              <Image
                src={coverImage.url}
                alt="Grublify nutrition packs and ingredients"
                width={400}
                height={400}
                className="rounded-xl object-cover w-full h-auto"
                sizes="(max-width: 768px) 80vw, 400px"
              />
            </div>
            <div className="max-w-sm  mx-auto mt-2">
              <p className="text-xs text-gray-500 ">
                *Cost based on a small dog with 10-pack and first order discount. Actual daily cost varies by dog and product selection.
              </p>
            </div>
          </div>
        </div>

        {/* Enhanced CTA */}
        <div className="text-center mt-8">
          <Link href="/products/nutrition-pack-essentials">
            <Button 
              variant="secondary" 
              size="lg"
              className="cursor-pointer group relative text-lg px-10 py-6 bg-gradient-to-r from-secondary to-secondary/90 text-white font-semibold border-2 border-secondary rounded-2xl hover:from-secondary/90 hover:to-secondary transition-all duration-300 ease-out shadow-lg hover:shadow-xl transform hover:scale-105 hover:-translate-y-1"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Shop Nutrition Packs
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
