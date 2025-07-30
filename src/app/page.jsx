import Hero from "../components/home/hero";
import HowItWorks from "../components/home/how-it-works";
import NotFound from "./not-found";
import CallToAction from "@/components/home/call-to-action";
import { fetchHome } from "@/lib/strapi-client";
import EmailSignup from "@/components/popups/EmailSignup";

// // 1. Helper to fetch blog post from Strapi
// async function fetchHome() {
//   const res = await fetch(
//     `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/homepage?populate[howItWorksSteps][populate]=image&populate=heroImage`,
//     { cache: 'no-store' }
//   );
//   const data = await res.json();
//   // console.log('Home data:', data);
//   return data?.data || null;
// }

export default async function Home() {
  // throw new Error("Test error to trigger Global Error Boundary");

  const home = await fetchHome();
  if (!home) return <NotFound />;

  return (
    <div>
      <div className="flex flex-col min-h-screen">
        <Hero data={home} />
        <HowItWorks data={home} />
        <CallToAction />
      </div>
      <EmailSignup />
    </div>
  );
}