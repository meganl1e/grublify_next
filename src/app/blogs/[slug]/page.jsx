import StrapiBlocksRenderer from "@/components/strapi-blocks-renderer";
import Link from "next/link";
import NotFound from "@/app/not-found";


// 1. Helper to fetch blog post from Strapi
async function fetchBlog(slug) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/blogs?filters[slug][$eq]=${slug}&populate=coverImage&populate=categories`,
    { cache: 'no-store' }
  );
  const data = await res.json();
  return data?.data?.[0] || null;
}

// 2. Dynamic metadata for SEO/social sharing
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const blog = await fetchBlog(slug);
  if (!blog) return {};

  const title = blog.title;
  const description = blog.excerpt || blog.summary || "";
  const image = blog.coverImage?.formats?.large?.url
    ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${blog.coverImage.formats.large.url}`
    : "https://grublify.com/og-image-default.png";
  const categories = blog.categories?.map(cat => cat.name) || [];

  return {
    title,
    description,
    openGraph: {
      title,
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
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
    alternates: {
      canonical: `https://grublify.com/blogs/${blog.slug}`,
    },
  };
}



async function BlogPage({ params }) {
  const { slug } = await params; 

  let blog;
  try {
    blog = await fetchBlog(slug);
  } catch (error) {
    console.error("Error fetching blog:", error);
    return <NotFound />;
  }
  if (!blog) return <NotFound />;



  return (
    <div className="flex-1 px-6 py-10">
      <div className="max-w-4xl mx-auto">
        <div className="text-secondary text-sm mb-4 flex flex-row gap-1">
          <Link href='/blogs' className="hover:underline">Blogs</Link> 
          <p>/</p>
          <Link href={`/blogs/${blog.slug}`} className="font-semibold hover:underline">{blog.title}</Link>
        </div>
        <img
          src={blog.coverImage.formats.large.url}
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
  );
};

export default BlogPage;


