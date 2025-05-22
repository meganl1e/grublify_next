"use client";
import { useState, useEffect } from "react";
import Hero from "../components/hero";
import Benefits from "../components/benefits";
import HowItWorks from "../components/how-it-works";

export default function Home() {

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    const query = `?populate[howItWorksSteps][populate]=image&populate=heroImage`;
  
    useEffect(() => {
      fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/homepage${query}`)
        .then(res => res.json())
        .then(data => {
          setData(data.data);
          setLoading(false);
        })
        .catch(err => {
          console.error(err);
          setLoading(false);
        });
    }, []);

  return (
    <div>
      <Hero data={data} loading={loading}/>
      <HowItWorks data={data} loading={loading} />
      <Benefits />
    </div>
  );
}