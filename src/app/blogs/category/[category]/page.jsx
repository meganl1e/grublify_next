import BlogListItem from "../../../../components/blogs/blog-list-item";
import CategoryDropdown from "../../../../components/blogs/category-dropdown";
import BlogSearchBar from "../../../../components/blogs/blog-search-bar";
import NotFound from "../../../not-found";
import { fetchBlogsByCategory, fetchBlogCategories } from "@/lib/strapi-client";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export async function generateMetadata({ params }) {
  const { category } = await params;
  
  return {
    title: `${slugToTitle(category)} | Grublify Blog`,
    description: `Discover ${slugToTitle(category)} related articles, tips, and advice from Grublify. Expert insights for your furry friend's health and nutrition.`,
    openGraph: {
      title: `${category.charAt(0).toUpperCase() + category.slice(1)} | Grublify Blog`,
      description: `Discover ${category} related articles, tips, and advice from Grublify.`,
      url: `https://grublify.com/blogs/category/${category}`,
      siteName: "Grublify",
      type: "website",
    },
  };
}

function slugToTitle(slug) {
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}


export default async function CategoryPage({ params }) {
  const { category } = await params;
  // console.log(category)
  const [categoryBlogs, blogCategories] = await Promise.all([
    fetchBlogsByCategory(category),
    fetchBlogCategories()
  ]);
  // console.log(categoryBlogs);
  
  if (!categoryBlogs || categoryBlogs.length === 0) {
    return (
      <div className="flex-1 px-6 py-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-gray-400 text-6xl mb-4">📝</div>
          <h1 className="text-3xl font-bold text-secondary mb-4">
            No posts found in {category.charAt(0).toUpperCase() + category.slice(1)}
          </h1>
          <p className="text-gray-600 mb-8">
            We couldn't find any blog posts in this category yet.
          </p>
          <Button asChild variant="secondary">
              <Link href="/blogs">
                <ArrowLeft className="w-4 h-4" />
                Back to All Blog Posts
              </Link>
            </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1">
      {/* Category Dropdown */}
     
      
      <div className="px-6 py-10">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-8 text-sm text-gray-600">
            <Link href="/blogs" className="hover:text-primary transition-colors">
              Blogs
            </Link>
            <span>/</span>
            <span className="font-semibold hover:underline">{slugToTitle(category)}</span>
          </div>

        {/* Header */}
        <div className="mb-12">
          <div className="mb-6 flex items-center justify-between">
            <Button asChild variant="secondary">
              <Link href="/blogs">
                <ArrowLeft className="w-4 h-4" />
                Back to All Blog Posts
              </Link>
            </Button>
            <div className="flex items-center gap-4">
              <BlogSearchBar />
              <CategoryDropdown categories={blogCategories} currentCategory={category} />
            </div>
          </div>
          <div className="text-center">
            <h1 className="text-4xl font-bold text-secondary mb-4 capitalize">
              {slugToTitle(category)} Posts
            </h1>
            <p className="text-gray-600 text-lg">
              {categoryBlogs.length} {categoryBlogs.length === 1 ? 'post' : 'posts'} found
            </p>
          </div>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoryBlogs.map((blog) => (
            <BlogListItem key={blog.id} blog={blog} />
          ))}
        </div>

        {/* Back to All Blogs */}
        <div className="text-center mt-12">
          <Button asChild variant="secondary">
            <Link href="/blogs">
              <ArrowLeft className="w-4 h-4" />
              Back to All Blog Posts
            </Link>
          </Button>
        </div>
        </div>
      </div>
    </div>
  );
}
