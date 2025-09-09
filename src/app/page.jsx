import Hero from "../components/home/hero";
import HowItWorks from "../components/home/how-it-works";
import ProductPreview from "@/components/home/product-preview";
import KeyBenefits from "@/components/home/key-benefits";
import CustomerReviews from "@/components/home/customer-reviews";
import FeaturedRecipes from "@/components/home/featured-recipes";
import HomepageFaq from "@/components/home/homepage-faq";
import CallToAction from "@/components/home/call-to-action";
import NotFound from "./not-found";
import { fetchHome } from "@/lib/strapi-client";


export default async function Home() {

  const home = await fetchHome();
  if (!home) return <NotFound />;

  return (
    <div>
      <div className="flex flex-col min-h-screen">
        <Hero data={home} />
        <HowItWorks data={home} />
        <ProductPreview />
        <KeyBenefits />
        <CustomerReviews />
        <FeaturedRecipes />
        <HomepageFaq />
        <CallToAction />
      </div>
    </div>
  );
}