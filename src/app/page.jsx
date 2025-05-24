import Hero from "../components/hero";
import Benefits from "../components/benefits";
import HowItWorks from "../components/how-it-works";

// 1. Helper to fetch blog post from Strapi
async function fetchHome() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/homepage?populate[howItWorksSteps][populate]=image&populate=heroImage`,
    { cache: 'no-store' }
  );
  const data = await res.json();
  return data?.data || null;
}

export default async function Home() { 
  const home = await fetchHome();
  if (!home) return <div>Not found</div>;

  return (
    <div>
      <Hero data={home} />
      <HowItWorks data={home} />
      <Benefits />
    </div>
  );
}