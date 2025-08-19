import Link from "next/link";
import Image from "next/image";
import { Calendar, User, ArrowRight } from "lucide-react";

const FeaturedBlog = ({ blog }) => {
  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-100 overflow-hidden">
      <div className="grid md:grid-cols-3 gap-0">
        <div className="relative h-32 md:h-48">
          <Image
            src={blog.coverImage.formats.medium.url}
            alt={blog.title}
            fill
            className="object-cover h-full"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          <div className="absolute top-3 left-3">
            <span className="bg-primary text-white px-2 py-1 rounded-full text-xs font-semibold">
              Featured
            </span>
          </div>
        </div>
        
        {/* Content - More compact */}
        <div className="md:col-span-2 p-6 flex flex-col justify-center">
          <div className="flex items-center gap-4 mb-3 text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              <time dateTime={blog.publishedDate}>
                {new Date(blog.publishedDate).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </time>
            </div>
            <div className="flex items-center gap-1">
              <User className="w-3 h-3" />
              <span>{blog.author?.name || "Grublify Team"}</span>
            </div>
          </div>
          
          {/* Categories */}
          <div className="flex flex-wrap gap-1 mb-3">
            {blog.categories.slice(0, 2).map((category) => (
              <span
                key={category.id}
                className="inline-block bg-primary/10 text-primary font-medium px-2 py-1 rounded text-xs"
              >
                {category.name}
              </span>
            ))}
          </div>

          {/* Title - Smaller */}
          <h3 className="text-xl font-bold text-secondary mb-3 leading-tight">
            {blog.title}
          </h3>
          
          {/* Excerpt - Shorter */}
          {blog.excerpt && (
            <p className="text-gray-600 text-sm mb-4 leading-relaxed line-clamp-2">
              {blog.excerpt}
            </p>
          )}

          {/* Read More Button - Smaller */}
          <Link
            href={`/blogs/${blog.slug}`}
            className="inline-flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-primary/90 transition-colors group self-start"
          >
            Read More
            <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FeaturedBlog;
