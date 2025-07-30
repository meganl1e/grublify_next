import Hero from "../components/home/hero";
import HowItWorks from "../components/home/how-it-works";
import NotFound from "./not-found";
import CallToAction from "@/components/home/call-to-action";
import { fetchHome } from "@/lib/strapi-client";

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
    </div>
  );
}