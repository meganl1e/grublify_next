"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { BlocksRenderer } from '@strapi/blocks-react-renderer';
import NotFound from "../../not-found";

const customBlocks = {
  heading: ({ children, level }) => {
    const HeadingTag = `h${level}`;
    // Example: Tailwind classes for different heading levels
    const classes = {
      1: "text-3xl font-semibold",
      2: "text-2xl font-semibold",
      3: "text-xl font-semibold",
    };
    return <HeadingTag className={classes[level] || "text-xl font-bold "}>{children}</HeadingTag>; // Adjusted spacing
  },
  paragraph: ({ children }) => (
    <p className="text-base leading-relaxed ">{children}</p> // Added margin-bottom for spacing
  ),
  list: ({ children, format }) =>
    format === "ordered" ? (
      <ol className="list-decimal ml-6">{children}</ol>
    ) : (
      <ul className="list-disc ml-6">{children}</ul>
    ),
  // Add more overrides as needed (quote, code, image, etc.)
};

export default function Policy() {

  const { slug } = useParams();
  const [policy, setPolicy] = useState(null);
  const [loading, setLoading] = useState(true);

  const query = `?filters[slug][$eq]=${slug}`

      useEffect(() => {
      fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/policies${query}`)
        .then(res => res.json())
        .then(data => {
          if (data?.data?.length > 0) {
            setPolicy(data.data[0]);
            console.log("Fetched policy data:", data.data);
          }
          setLoading(false);
        })
        .catch(err => {
          console.error("Error fetching policy:", err);
          setLoading(false);
        });
    }, [slug]);

    if (loading) {
      return (
        <div className="flex-1 flex items-center justify-center">
          <p className="text-lg text-secondary">Loading...</p>
        </div>
      );
    }

    if (!policy && !loading) {
      return (
        <NotFound />
      )
    }

  return (
    <div className="flex-1 px-6 py-12">
      <div className="max-w-4xl mx-auto text-secondary">
        <div className="text-center mb-8 text-5xl font-semibold">
            {policy.title}
        </div>
        <BlocksRenderer content={policy?.content || []} blocks={customBlocks}/>
      </div>   
    </div>
  )
}