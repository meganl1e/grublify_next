"use client";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { BlocksRenderer } from '@strapi/blocks-react-renderer';

const customBlocks = {
  heading: ({ children, level }) => {
    const HeadingTag = `h${level}`;
    // Example: Tailwind classes for different heading levels
    const classes = {
      1: "text-4xl font-semibold mt-8 mb-4",
      2: "text-3xl font-semibold mt-6 mb-4",
      3: "text-2xl font-semibold mt-4 mb-4",
    };
    return <HeadingTag className={classes[level] || "text-xl font-bold mt-6 mb-4"}>{children}</HeadingTag>; // Adjusted spacing
  },
  paragraph: ({ children }) => (
    <p className="text-base leading-relaxed mb-4">{children}</p> // Added margin-bottom for spacing
  ),
  list: ({ children, format }) =>
    format === "ordered" ? (
      <ol className="list-decimal ml-6">{children}</ol>
    ) : (
      <ul className="list-disc ml-6">{children}</ul>
    ),
  // Add more overrides as needed (quote, code, image, etc.)
};

const Blog = () => {
  
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

    const query = `?filters[slug][$eq]=${slug}&populate=coverImage&populate=categories`
  
    useEffect(() => {
      fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/blogs${query}`)
        .then(res => res.json())
        .then(data => {
          if (data?.data?.length > 0) {
            setBlog(data.data[0]);
          }
          setLoading(false);
        })
        .catch(err => {
          console.error("Error fetching blog:", err);
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


  return (
    <div className="flex-1 px-6 py-10">
      <div className="max-w-4xl mx-auto">
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
          <div className="mt-6"> {/* Increased margin-top */}
            <BlocksRenderer content={blog.content} blocks={customBlocks}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;


//test