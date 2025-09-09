import Hero from "../components/home/hero";
import ScrollShowcase from "../components/home/scroll-showcase";
import HowItWorks from "../components/home/how-it-works";
import NutritionProblem from "@/components/home/nutrition-problem";
import ProductPreview from "@/components/home/product-preview";
import KeyBenefits from "@/components/home/key-benefits";
import CustomerReviews from "@/components/home/customer-reviews";
import FeaturedRecipes from "@/components/home/featured-recipes";
import HomepageFaq from "@/components/home/homepage-faq";
import CallToAction from "@/components/home/call-to-action";
import NotFound from "./not-found";
import { fetchHome } from "@/lib/strapi-client";
import { getReviewsByProductId } from "@/lib/klaviyo-client";


// Helper function to calculate average rating (same as product page)
function calculateAverageRating(reviews) {
  const publishedReviews = reviews.filter(
    (review) => review.attributes.status?.value === 'published' && 
    typeof review.attributes.rating === 'number'
  );
  if (publishedReviews.length === 0) return 0;

  const total = publishedReviews.reduce((sum, review) => sum + review.attributes.rating, 0);
  return total / publishedReviews.length;
}

export default async function Home() {

  const home = await fetchHome();
  if (!home) return <NotFound />;

  // Fetch reviews server-side (same as product page)
  let reviews = [];
  let averageRating = 0;
  
  try {
    reviews = await getReviewsByProductId("14719423152498") || [];
    averageRating = calculateAverageRating(reviews);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    // Continue without reviews if there's an error
  }

  return (
    <div>
      <div className="flex flex-col min-h-screen">
        <Hero data={home} />
        {/* <ScrollShowcase /> */}
        <HowItWorks data={home} />
        <NutritionProblem />
        <ProductPreview />
        {/* <KeyBenefits /> */}
        <FeaturedRecipes />
        <CustomerReviews reviews={reviews} averageRating={averageRating} />
        
        {/* <HomepageFaq /> */}
        <CallToAction />
      </div>
    </div>
  );
}