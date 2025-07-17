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

// Helper to fetch policy from Strapi
async function fetchPolicy(slug) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/policies?filters[slug][$eq]=${slug}`,
    { cache: 'no-store' }
  );
  const data = await res.json();
  return data?.data?.[0] || null;
}

export default async function Policy({ params }) {
  const { slug } = await params;
  const policy = await fetchPolicy(slug);
  
  if (!policy) return <NotFound />;

  return (
    <div className="flex-1 px-6 py-12">
      <div className="max-w-4xl mx-auto text-secondary">
        <div className="text-center mb-8 text-5xl font-semibold">
            {policy.attributes?.title || policy.title}
        </div>
        <BlocksRenderer content={policy.attributes?.content || policy.content || []} blocks={customBlocks}/>
      </div>   
    </div>
  );
}