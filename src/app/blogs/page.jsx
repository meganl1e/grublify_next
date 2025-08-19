import BlogListItem from "../../components/blogs/blog-list-item";
import NotFound from "../not-found";
import { fetchBlogs } from "@/lib/strapi-client";
import Script from "next/script";
import BlogFilters from "../../components/blogs/blog-filters";
import FeaturedBlog from "../../components/blogs/featured-blog";

// Add metadata for SEO
export const metadata = {
  title: "Blog | Grublify - Dog Food Recipes & Nutrition Tips",
  description: "Discover expert tips, homemade dog food recipes, and nutrition advice from Grublify. Learn how to make healthy, balanced meals for your furry friend.",
  keywords: "dog food recipes, homemade dog food, dog nutrition, pet health, dog food tips",
  openGraph: {
    title: "Blog | Grublify - Dog Food Recipes & Nutrition Tips",
    description: "Discover expert tips, homemade dog food recipes, and nutrition advice from Grublify. Learn how to make healthy, balanced meals for your furry friend.",
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

  // Get featured blog (most recent)
  const featuredBlog = blogs[0];
  const recentBlogs = blogs.slice(1, 7);
  const remainingBlogs = blogs.slice(7);

  // Extract unique categories
  const categories = [...new Set(blogs.flatMap(blog => 
    blog.categories.map(cat => cat.name)
  ))];

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
        "url": "https://grublify.com/grublify_logo.png"
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

        {/* Search and Filter Section */}
        <BlogFilters categories={categories} totalPosts={blogs.length} />

        {/* Featured Blog Post - Smaller and more compact */}
        {featuredBlog && (
          <section className="py-8 px-6">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-2xl font-bold text-secondary mb-6">
                Featured Post
              </h2>
              <FeaturedBlog blog={featuredBlog} />
            </div>
          </section>
        )}

        {/* Recent Posts - Main content area */}
        <section className="py-8 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-secondary">
                Recent Posts
              </h2>
              <div className="text-sm text-gray-500">
                {recentBlogs.length} posts
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentBlogs.map((blog) => (
                <BlogListItem key={blog.id} blog={blog} />
              ))}
            </div>
          </div>
        </section>

        {/* All Posts - If there are more */}
        {remainingBlogs.length > 0 && (
          <section className="py-8 px-6 bg-gray-50">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-secondary">
                  All Posts
                </h2>
                <div className="text-sm text-gray-500">
                  {remainingBlogs.length} more posts
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {remainingBlogs.map((blog) => (
                  <BlogListItem key={blog.id} blog={blog} />
                ))}
              </div>
            </div>
          </section>
        )}
      </div>
    </>
  );
}
