import BlogListItem from "../../../../components/blogs/blog-list-item";
import NotFound from "../../../not-found";
import { fetchBlogs } from "@/lib/strapi-client";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export async function generateMetadata({ params }) {
  const { category } = await params;
  const blogs = await fetchBlogs();
  
  const categoryBlogs = blogs.filter(blog =>
    blog.categories.some(cat => cat.name.toLowerCase() === category.toLowerCase())
  );

  return {
    title: `${category} | Grublify Blog`,
    description: `Discover ${category} related articles, tips, and advice from Grublify. Expert insights for your furry friend's health and nutrition.`,
    openGraph: {
      title: `${category} | Grublify Blog`,
      description: `Discover ${category} related articles, tips, and advice from Grublify.`,
      url: `https://grublify.com/blogs/category/${category}`,
      siteName: "Grublify",
      type: "website",
    },
  };
}

export default async function CategoryPage({ params }) {
  const { category } = await params;
  const blogs = await fetchBlogs();
  
  if (!blogs) return <NotFound />;

  const categoryBlogs = blogs.filter(blog =>
    blog.categories.some(cat => cat.name.toLowerCase() === category.toLowerCase())
  );

  if (categoryBlogs.length === 0) {
    return (
      <div className="flex-1 px-6 py-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-gray-400 text-6xl mb-4">📝</div>
          <h1 className="text-3xl font-bold text-secondary mb-4">
            No posts found in {category}
          </h1>
          <p className="text-gray-600 mb-8">
            We couldn't find any blog posts in this category yet.
          </p>
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to All Blogs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 px-6 py-10">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-8 text-sm text-gray-600">
          <Link href="/blogs" className="hover:text-primary transition-colors">
            Blogs
          </Link>
          <span>/</span>
          <span className="text-primary font-semibold capitalize">{category}</span>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-secondary mb-4 capitalize">
            {category} Posts
          </h1>
          <p className="text-gray-600 text-lg">
            {categoryBlogs.length} {categoryBlogs.length === 1 ? 'post' : 'posts'} found
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categoryBlogs.map((blog) => (
            <BlogListItem key={blog.id} blog={blog} />
          ))}
        </div>

        {/* Back to All Blogs */}
        <div className="text-center mt-12">
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-semibold transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            View All Blog Posts
          </Link>
        </div>
      </div>
    </div>
  );
}
