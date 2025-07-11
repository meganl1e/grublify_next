import Hero from "../components/home/hero";
import Benefits from "../components/home/benefits";
import HowItWorks from "../components/home/how-it-works";
import NotFound from "./not-found";

// 1. Helper to fetch blog post from Strapi
async function fetchHome() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/homepage?populate[howItWorksSteps][populate]=image&populate[benefits][populate]=image&populate=heroImage`,
    { cache: 'no-store' }
  );
  const data = await res.json();
  // console.log('Home data:', data);
  return data?.data || null;
}

export default async function Home() { 
  const home = await fetchHome();
  if (!home) return <NotFound />;

  return (
    <div className="flex flex-col min-h-screen">
      <Hero data={home} />
      <HowItWorks data={home} />
      <Benefits data={home}/>
    </div>
  );
}