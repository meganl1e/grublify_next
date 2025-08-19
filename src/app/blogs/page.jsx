import NotFound from "../not-found";
import { fetchBlogs, fetchBlogCategories } from "@/lib/strapi-client";
import Script from "next/script";
import BlogsClient from "../../components/blogs/blogs-client";

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
  try {
    // console.log('Fetching blogs...');
    const blogs = await fetchBlogs();
    const blogCategories = await fetchBlogCategories();
    // console.log(blogCategories)
    // console.log('Blogs fetched:', blogs);
    
    if (!blogs || blogs.length === 0) {
      console.log('No blogs found or blogs array is empty');
      return (
        <div className="flex-1 flex items-center justify-center py-20">
          <div className="text-center">
            <div className="text-gray-400 text-6xl mb-4">📝</div>
            <h1 className="text-3xl font-bold text-secondary mb-4">No Blog Posts Yet</h1>
            <p className="text-gray-600 mb-8">
              We haven't published any blog posts yet. Check back soon!
            </p>
          </div>
        </div>
      );
    }

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
        <BlogsClient initialBlogs={blogs} blogCategories={blogCategories}/>
      </>
    );
  } catch (error) {
    console.error('Error in Blogs page:', error);
    return (
      <div className="flex-1 flex items-center justify-center py-20">
        <div className="text-center">
          <div className="text-red-400 text-6xl mb-4">⚠️</div>
          <h1 className="text-3xl font-bold text-secondary mb-4">Error Loading Blogs</h1>
          <p className="text-gray-600 mb-8">
            Something went wrong while loading the blog posts. Please try again later.
          </p>
          <p className="text-sm text-gray-500">
            Error: {error.message}
          </p>
        </div>
      </div>
    );
  }
}
