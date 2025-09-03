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
    <section className="py-8 md:py-16 bg-slate-50">
      <div className="max-w-7xl mx-auto px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-5xl font-bold text-secondary mb-4">Nutrition You Can Count On. No Guesswork.</h2>
          <p className="text-lg md:text-xl text-gray-600">Expert-formulated packs and simple feeding guides for every dog. Nutritional quality you can trust, made affordable for all.</p>
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
                  <p className="text-gray-600">
                    Essential vitamins, minerals, and supplements formulated by pet nutritionists, which meet AAFCO pet food standards.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <ChefHat className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-secondary mb-2">Easy Recipes</h3>
                  <p className="text-gray-600">
                    Step-by-step guides using fresh, whole ingredients you can find at any grocery store.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <LuDollarSign className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-secondary mb-2">As Low as $0.13/Day*</h3>
                  <p className="text-gray-600">Feed your dog real nutrition without the hefty price tag. Because every dog deserve balanced meals that are healthy and delicious.</p>
                </div>
              </div>
            </div>

            <Button
              variant="secondary"
              size="lg"
              className="cursor-pointer group relative w-full md:w-auto text-lg px-10 py-6 bg-gradient-to-r from-secondary to-secondary/90 text-white font-semibold border-2 border-secondary rounded-2xl hover:from-secondary/90 hover:to-secondary transition-all duration-300 ease-out shadow-lg hover:shadow-xl transform hover:scale-105 hover:-translate-y-1"
            >
              <Link href={`/products/nutrition-pack-essentials`}>

                Shop Nutrition Packs
              </Link>
            </Button>
          </div>

          <div className="relative">
            <div className="bg-primary rounded-2xl p-6 max-w-md w-full mx-auto">
              <Image
                src={coverImage.url}
                alt="Grublify nutrition packs and ingredients"
                width={coverImage.width}
                height={coverImage.height}
                className="rounded-xl object-cover w-full"
                sizes="(max-width: 768px) 90vw, 50vw"
              />
            </div>
            <div className="max-w-md  mx-auto mt-2">
              <p className="text-xs text-gray-500 ">
                *Cost based on a small dog with 10-pack and first order discount. Actual daily cost varies by dog and product selection.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

  );
}
