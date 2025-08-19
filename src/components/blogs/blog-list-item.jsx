import Link from "next/link";
import { Calendar, User, ArrowRight } from "lucide-react";

const BlogListItem = ({ blog }) => {
  return (
    <Link href={`/blogs/${blog.slug}`} className="group">
      <article className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden h-full border border-gray-100 hover:border-gray-200">
        {/* Image Container */}
        <div className="relative overflow-hidden">
          <img
            src={blog.coverImage.formats.medium.url}
            alt={blog.title}
            className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-200"
          />
          
          {/* Read More Arrow */}
          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full p-1.5 opacity-0 group-hover:opacity-100 transform translate-x-1 group-hover:translate-x-0 transition-all duration-200">
            <ArrowRight className="w-3 h-3 text-primary" />
          </div>
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col h-full">
          {/* Categories */}
          <div className="flex flex-wrap gap-1 mb-3">
            {blog.categories.slice(0, 2).map((category, index) => (
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
          {blog.excerpt && (
            <p className="text-gray-600 text-sm mb-3 leading-relaxed flex-grow line-clamp-2">
              {blog.excerpt}
            </p>
          )}

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
      </article>
    </Link>
  );
};

export default BlogListItem;
