import { Button } from "../ui/button";
import Link from "next/link";

export default function CallToAction() {
  return (

    <section className="py-16 md:py-24 bg-primary-dark">
      {/* CTA Section */}
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center ">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">
            Ready to Transform Your Dog's Meals?
          </h2>
          <p className="text-xl mb-8 text-white opacity-90">
            Make every meal fresh, simple, and wholesome with Grublify.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/products/nutrition-pack-essentials">

              <Button className="bg-white border-2 text-primary-dark hover:bg-gray-100 px-8 py-6 rounded-xl text-lg font-medium cursor-pointer">
                Try Grublify Now
              </Button>
            </Link>
            <Link href="/recipes">
              <Button
                className="border-white border-2 bg-transparent text-white hover:bg-primary px-8 py-6 rounded-xl text-lg font-medium cursor-pointer"
              >
                Explore Recipes
              </Button>
            </Link>
          </div>
          <p className="mt-8 text-sm opacity-80 text-white">
            Free shipping on orders over $30 • 30-day money-back guarantee • Made in the USA
          </p>
        </div>
      </div>
    </section>

  )
}
