import Link from "next/link";
import Image from "next/image";
import { Calendar, User, ArrowRight } from "lucide-react";

const FeaturedBlog = ({ blog }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300">
      <div className="grid lg:grid-cols-2 gap-0">
        <div className="relative h-64 lg:h-80">
          <Image
            src={blog.coverImage?.formats?.medium?.url || blog.coverImage?.formats?.small?.url || "https://grublify.com/_next/static/media/grublify_logo_simple.6f7f635f.png"}
            alt={blog.title}
            fill
            className="object-cover h-full"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div className="absolute top-4 left-4">
            <span className="bg-primary text-white px-3 py-1.5 rounded-full text-sm font-semibold shadow-lg">
              Featured
            </span>
          </div>
        </div>
        
        {/* Content - Bigger and more prominent */}
        <div className="p-8 flex flex-col justify-center">
          <div className="flex items-center gap-6 mb-4 text-sm text-gray-500">
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
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span className="font-medium">{blog.author?.name || "Grublify Team"}</span>
            </div>
          </div>
          
          {/* Categories */}
          <div className="flex flex-wrap gap-2 mb-4">
            {blog.categories?.slice(0, 3).map((category) => (
              <span
                key={category.id || category.name}
                className="inline-block bg-primary/10 text-primary font-medium px-3 py-1.5 rounded-lg text-sm"
              >
                {category.name}
              </span>
            ))}
          </div>

          {/* Title - Bigger and more prominent */}
          <h3 className="text-2xl lg:text-3xl font-bold text-secondary mb-4 leading-tight">
            {blog.title}
          </h3>
          
          {/* Excerpt - Longer and more engaging */}
          {blog.excerpt && (
            <p className="text-gray-600 text-base mb-6 leading-relaxed line-clamp-3">
              {blog.excerpt}
            </p>
          )}

          {/* Read More Button - Bigger and more prominent */}
          <Link
            href={`/blogs/${blog.slug}`}
            className="inline-flex items-center gap-3 bg-primary text-white px-6 py-3 rounded-lg text-base font-semibold hover:bg-primary/90 transition-all duration-200 group self-start hover:shadow-lg"
          >
            Read Full Article
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FeaturedBlog;
