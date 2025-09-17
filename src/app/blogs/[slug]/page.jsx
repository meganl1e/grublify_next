
import StrapiBlocksRenderer from "@/components/ui/blocks/strapi-blocks-renderer";
import Link from "next/link";
import NotFound from "@/app/not-found";
import { fetchBlogBySlug } from "@/lib/strapi-client";
import Script from "next/script";

// 2. Dynamic metadata for SEO/social sharing
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const blog = await fetchBlogBySlug(slug);
  if (!blog) return {};

  const title = blog.title;
  const description = blog.excerpt || blog.summary || "";
  const image = blog.coverImage?.formats?.large?.url
    ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${blog.coverImage.formats.large.url}`
    : "https://grublify.com/_next/static/media/grublify_logo_simple.6f7f635f.png";
  const categories = blog.categories?.map(cat => cat.name) || [];
  const publishedDate = blog.publishedDate;
  const author = blog.author?.name || "Grublify Team";

  return {
    title: `${title} | Grublify Blog`,
    description,
    keywords: [...categories, "dog food", "pet nutrition", "homemade dog food", "dog health"].join(", "),
    authors: [{ name: author }],
    openGraph: {
      title: `${title} | Grublify Blog`,
      description,
      url: `https://grublify.com/blogs/${blog.slug}`,
      siteName: "Grublify",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      type: "article",
      tags: categories,
      publishedTime: publishedDate,
      authors: [author],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | Grublify Blog`,
      description,
      images: [image],
    },
    alternates: {
      canonical: `https://grublify.com/blogs/${blog.slug}`,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}



async function BlogPage({ params }) {
  const { slug } = await params; 

  let blog;
  try {
    blog = await fetchBlogBySlug(slug);
  } catch (error) {
    // console.error("Error fetching blog:", error);
    return <NotFound />;
  }
  if (!blog) return <NotFound />;

  // Generate structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": blog.title,
    "description": blog.excerpt || blog.summary || "",
    "image": blog.coverImage?.formats?.large?.url
      ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${blog.coverImage.formats.large.url}`
      : "https://grublify.com/og-image-default.png",
    "author": {
      "@type": "Person",
      "name": blog.author?.name || "Grublify Team"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Grublify",
      "logo": {
        "@type": "ImageObject",
        "url": "https://grublify.com/grublify_logo.png"
      }
    },
    "datePublished": blog.publishedDate,
    "dateModified": blog.updatedAt || blog.publishedDate,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://grublify.com/blogs/${blog.slug}`
    },
    "articleSection": blog.categories?.map(cat => cat.name).join(", ") || "Pet Nutrition",
    "keywords": [...(blog.categories?.map(cat => cat.name) || []), "dog food", "pet nutrition", "homemade dog food", "dog health"].join(", ")
  };

  return (
    <>
      <Script
        id="blog-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="flex-1 px-6 py-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-secondary text-sm mb-4 flex flex-row gap-1">
            <Link href='/blogs' className="hover:underline">Blogs</Link> 
            <p>/</p>

            <Link href={`/blogs/${blog.slug}`} className="font-semibold hover:underline">{blog.title}</Link>
          </div>
          <img
            src={blog?.coverImage?.formats?.large?.url || blog?.coverImage?.formats?.medium?.url || blog?.coverImage?.formats?.small?.url}
            alt={blog.title}
            className="w-full max-w-3xl rounded-lg mb-4 object-cover max-h-96"
          />
          
          <div className="prose max-w-2xl text-secondary">

            {/* categories */}
            <div className="flex flex-wrap gap-3 md:gap-4 mb-4"> {/* Increased gap and margin-bottom */}
              {blog.categories.map(category => (
                <span
                  key={category.id}
                  className="inline-block bg-primary/10 text-primary font-bold border-2 border-primary shadow-md text-sm px-2 md:px-3 py-1 rounded-full"
                >
                  {category.name}
                </span>
              ))}
            </div>

              {/* blog title */}
              <h1 className="text-5xl font-bold mb-4 text-secondary">{blog.title}</h1> {/* Increased margin-bottom */}
              
              {/* published date */}
              <div className="text-sm text-gray-500 mb-4 sm:mb-2"> {/* Increased margin-bottom */}
                Published on {" "}
                <time dateTime={blog.publishedDate}>
                  {new Date(blog.publishedDate).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </time>
              </div>


            {/* content */}
            <div className="mt-6">
              <StrapiBlocksRenderer content={blog.content} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BlogPage;


