import Link from "next/link";
import Image from "next/image";
import { Calendar, User, ArrowRight } from "lucide-react";
import CategoryTag from "../ui/category-tag";

const FeaturedBlog = ({ blog }) => {
  return (
    <Link href={`/blogs/${blog.slug}`} className="group">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg hover:border-gray-200 transition-all duration-300 group-hover:-translate-y-1">
        <div className="grid lg:grid-cols-2 gap-0 min-h-64 lg:min-h-80">
          <div className="relative overflow-hidden h-64 lg:h-auto">
            <Image
              src={blog.coverImage?.formats?.medium?.url || blog.coverImage?.formats?.small?.url || "https://grublify.com/_next/static/media/grublify_logo_simple.6f7f635f.png"}
              alt={blog.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute top-4 left-4">
              <CategoryTag
                name="Featured"
                variant="primary"
                size="md"
              />
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
                <span className="font-medium">Grublify Team</span>
              </div>
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-2 mb-4">
              {blog.categories?.slice(0, 3).map((category) => (
                <CategoryTag
                  key={category.id}
                  name={category.name}
                  variant="default"
                  size="md"
                />
              ))}
            </div>

            {/* Title - Bigger and more prominent */}
            <h3 className="text-2xl lg:text-3xl font-bold text-secondary group-hover:text-primary transition-colors mb-4 leading-tight">
              {blog.title}
            </h3>

            {/* Excerpt - Longer and more engaging */}
            {blog.excerpt && (
              <p className="text-gray-600 text-base mb-6 leading-relaxed line-clamp-3">
                {blog.excerpt}
              </p>
            )}

            {/* Read More Button - Bigger and more prominent */}
            <div
              onClick={() => window.scrollTo(0, 0)}
              className="inline-flex items-center gap-3 bg-primary text-white px-6 py-3 rounded-xl text-base font-semibold hover:bg-primary/90 transition-all duration-200 group self-start hover:shadow-lg hover:scale-105"
            >
              Read Full Article
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default FeaturedBlog;
