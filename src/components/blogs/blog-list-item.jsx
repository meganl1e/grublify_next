"use client";
import Link from "next/link";
import { Calendar, User } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import CategoryTag from "../ui/category-tag";

const BlogListItem = ({ blog }) => {
  const fallbackImage = "https://grublify.com/_next/static/media/grublify_logo_simple.6f7f635f.png"; // fallback image URL
  const [visibleCategories, setVisibleCategories] = useState(blog.categories);
  const [showMoreIndicator, setShowMoreIndicator] = useState(false);
  const containerRef = useRef(null);
  const categoriesRef = useRef(null);

  useEffect(() => {
    const checkOverflow = () => {
      if (!containerRef.current || !categoriesRef.current) return;

      // Simple approach: if more than 2 categories, show only 2 and add "+X more"
      if (blog.categories && blog.categories.length > 2) {
        setVisibleCategories(blog.categories.slice(0, 2));
        setShowMoreIndicator(true);
      } else {
        setVisibleCategories(blog.categories || []);
        setShowMoreIndicator(false);
      }
    };

    // Check overflow after component mounts
    setTimeout(checkOverflow, 100);
    
    // Recheck on window resize
    window.addEventListener('resize', checkOverflow);
    return () => window.removeEventListener('resize', checkOverflow);
  }, [blog.categories]);

  return (
    <Link href={`/blogs/${blog.slug}`} className="group">
      <article className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden h-full hover:shadow-lg hover:border-gray-200 transition-all duration-300 group-hover:-translate-y-1">
        <div className="flex flex-col h-full">
          {/* Image */}
          <div className="relative overflow-hidden aspect-[4/3]">
            <img
              src={blog.coverImage?.formats?.medium?.url || blog.coverImage?.formats?.small?.url || fallbackImage}
              alt={blog.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          
          {/* Content */}
          <div className="p-6 flex flex-col gap-4 flex-grow">
            {/* Categories */}
            <div ref={containerRef} className="overflow-hidden">
              <div ref={categoriesRef} className="flex flex-wrap gap-2">
                {visibleCategories.map((category, index) => (
                  <CategoryTag
                    key={index}
                    name={category.name}
                    variant="default"
                    size="sm"
                  />
                ))}
                {showMoreIndicator && (
                  <CategoryTag
                    name={`+${blog.categories.length - visibleCategories.length} more`}
                    variant="more"
                    size="sm"
                  />
                )}
              </div>
            </div>

            {/* Title */}
            <h3 className="text-xl font-bold text-secondary group-hover:text-primary transition-colors leading-tight line-clamp-3">
              {blog.title}
            </h3>

            {/* Excerpt */}
            {blog.excerpt && (
              <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
                {blog.excerpt}
              </p>
            )}

            {/* Meta Information */}
            <div className="mt-auto pt-2">
              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span className="font-medium">
                    {blog.author?.name || "Grublify Team"}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <time dateTime={blog.publishedDate}>
                    {new Date(blog.publishedDate).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </time>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default BlogListItem;
