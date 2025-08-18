import BlogListItem from "../../components/blogs/blog-list-item";
import NotFound from "../not-found";
import { fetchBlogs } from "@/lib/strapi-client";
import Script from "next/script";

// Add metadata for SEO
export const metadata = {
  title: "Blog | Grublify - Dog Food Recipes & Nutrition Tips",
  description: "Discover expert tips, homemade dog food recipes, and nutrition advice from Grublify. Learn how to make healthy, balanced meals for your dog.",
  keywords: "dog food recipes, homemade dog food, dog nutrition, pet health, dog food tips",
  openGraph: {
    title: "Blog | Grublify - Dog Food Recipes & Nutrition Tips",
    description: "Discover expert tips, homemade dog food recipes, and nutrition advice from Grublify. Learn how to make healthy, balanced meals for your dog.",
    url: "https://grublify.com/blogs",
    siteName: "Grublify",
    images: [
      {
        url: "https://grublify.com/og-image-blog.png",
        width: 1200,
        height: 630,
        alt: "Grublify Blog - Dog Food Recipes & Nutrition Tips",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | Grublify - Dog Food Recipes & Nutrition Tips",
    description: "Discover expert tips, homemade dog food recipes, and nutrition advice from Grublify.",
    images: ["https://grublify.com/og-image-blog.png"],
  },
  alternates: {
    canonical: "https://grublify.com/blogs",
  },
};

export default async function Blogs() {
  const blogs = await fetchBlogs();
  
  if (!blogs) return <NotFound />;

  // Generate structured data for blog listing
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Grublify Blog",
    "description": "Discover expert tips, homemade dog food recipes, and nutrition advice from Grublify. Learn how to make healthy, balanced meals for your furry friend.",
    "url": "https://grublify.com/blogs",
    "publisher": {
      "@type": "Organization",
      "name": "Grublify",
      "logo": {
        "@type": "ImageObject",
        "url": "https://grublify.com/_next/static/media/grublify_logo_simple.6f7f635f.png"
      }
    },
    "mainEntity": {
      "@type": "ItemList",
      "numberOfItems": blogs.length,
      "itemListElement": blogs.map((blog, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "BlogPosting",
          "headline": blog.title,
          "description": blog.excerpt || blog.summary || "",
          "url": `https://grublify.com/blogs/${blog.slug}`,
          "datePublished": blog.publishedDate,
          "author": {
            "@type": "Person",
            "name": blog.author?.name || "Grublify Team"
          }
        }
      }))
    }
  };

  return (
    <>
      <Script
        id="blog-listing-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 px-6 bg-secondary text-center flex items-center justify-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-white mb-4">Welcome to Our Blog!</h1>
            <p className="text-lg text-primary/80 font-semibold">
              Discover the latest updates, tips, and stories from our team.
            </p>
          </div>
        </section>
        {/* Blog Posts Section */}
        <section className="py-10 px-6">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-secondary">Latest Posts</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogs.map((blog) => (
                <BlogListItem
                  key={blog.id}
                  blog={blog}
                />
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
