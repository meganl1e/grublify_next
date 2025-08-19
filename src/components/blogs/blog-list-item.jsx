import Link from "next/link";
import { Calendar, User, ArrowRight } from "lucide-react";

const BlogListItem = ({ blog }) => {
  const fallbackImage = "https://grublify.com/_next/static/media/grublify_logo_simple.6f7f635f.png"; // fallback image URL
  
  return (
    <Link href={`/blogs/${blog.slug}`} onClick={() => window.scrollTo(0, 0)} className="flex-1 h-full group">
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
            <div className="flex flex-wrap gap-2 mb-2">
              {blog.categories.map((category, index) => (
                <span
                  key={index}
                  className="inline-block bg-primary/10 text-primary font-medium px-2 py-1 rounded text-xs"
                >
                  {category.name}
                </span>
              ))}
              {blog.categories.length > 2 && (
                <span className="inline-block bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                  +{blog.categories.length - 2}
                </span>
              )}
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
