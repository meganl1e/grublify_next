import Link from "next/link";
import { Calendar, User, ArrowRight } from "lucide-react";
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
    <Link href={`/blogs/${blog.slug}`}  className="flex-1 h-full group">
      <article className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden h-full border border-gray-100 hover:border-primary/20 hover:scale-[1.02]">
        <div className="p-4 flex flex-col gap-4 h-full">
          <div className="relative overflow-hidden rounded-md">
            <img
              src={blog.coverImage?.formats?.medium?.url || blog.coverImage?.formats?.small?.url || fallbackImage}
              alt={blog.title}
              className="w-full h-40 object-cover rounded-md group-hover:scale-105 transition-transform duration-300"
            />
          </div>
            <div className="flex flex-col gap-1 flex-grow">
              <div ref={containerRef} className="h-8 overflow-hidden">
                <div ref={categoriesRef} className="flex flex-wrap gap-2 mb-2">
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
            <h3 className="text-lg font-semibold text-secondary mb-2 group-hover:text-primary transition-colors leading-tight line-clamp-2">
              {blog.title}
            </h3>

            {/* Excerpt */}
            {/* {blog.excerpt && (
              <p className="text-gray-600 text-sm mb-3 leading-relaxed flex-grow line-clamp-2">
                {blog.excerpt}
              </p>
            )} */}

            {/* Meta Information */}
            <div className="mt-auto pt-3 border-t border-gray-100">
              <div className="flex items-center justify-between text-xs text-gray-500">
                <div className="flex items-center gap-1">
                  <User className="w-3 h-3" />
                  <span className="font-medium">
                    {blog.author?.name || "Grublify Team"}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  <time dateTime={blog.publishedDate}>
                    {new Date(blog.publishedDate).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
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
