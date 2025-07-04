"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import BlogListItem from "../../components/blog-list-item";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Blogs = () => {
  const { slug } = useParams();
  const [blogs, setBlogs] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const query = `?fields=slug,title&populate=coverImage&populate=categories`;

  // useEffect(() => {
  //   fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/blogs${query}`)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       if (data?.data?.length > 0) {
  //         setBlogs(data.data);
  //       }
  //       setLoading(false);
  //     })
  //     .catch((err) => {
  //       console.error("Error fetching blogs:", err);
  //       setLoading(false);
  //     });
  // }, [slug]);

    useEffect(() => {
    async function fetchBlogs() {
      setLoading(true);
      setError(false);
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/blogs${query}`);
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setBlogs(data.data);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchBlogs();
  }, []);

  

  return (
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

      {loading ? (
        <section className="py-10 px-6">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-secondary">Latest Posts</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(3)].map((_, index) => (
                <div key={index} className="p-4 border rounded-lg shadow-sm flex flex-col gap-4 bg-white">
                  <Skeleton height={160} className="w-full rounded-md" />
                  <div>
                    <div className="flex flex-wrap gap-2 mb-2">
                      <Skeleton width={80} height={24} className="rounded-full" />
                      <Skeleton width={80} height={24} className="rounded-full" />
                    </div>
                    <Skeleton height={24} width="60%" />
                    <Skeleton height={16} width="80%" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : error ? (
        <section className="p-8 bg-red-50 rounded text-center mt-8">
          <h2 className="text-xl text-secondary font-bold mb-2">Blogs Unavailable</h2>
          <p className="text-red-600">Sorry, blogs can’t load right now. Please try again later.</p>
        </section>
      ) : (
        <section className="py-10 px-6">
          {/* Blog Posts Section */}
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-secondary">Latest Posts</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogs.map((blog) => (
                <BlogListItem key={blog.id} blog={blog} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Blogs;