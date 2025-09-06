"use client";

import { useState, useEffect } from "react";
import BlogListItem from "./blog-list-item";
import BlogFilters from "./blog-filters";
import FeaturedBlog from "./featured-blog";
import PageHeader from "../ui/page-header";
import { ArrowRight, Loader2 } from "lucide-react";

const BlogsClient = ({ initialBlogs, blogCategories }) => {
  const [blogs, setBlogs] = useState([]);
  const [visibleCount, setVisibleCount] = useState(13);
  const [loadingMore, setLoadingMore] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // console.log("blogCategories", blogCategories)

  // Ensure we're on the client side
  useEffect(() => {
    setIsClient(true);
    if (initialBlogs && initialBlogs.length > 0) {
      setBlogs(initialBlogs);
    }
  }, [initialBlogs]);

  // Don't render until we're on the client
  if (!isClient) {
    return (
      <div className="flex-1 flex items-center justify-center py-20">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!blogs || blogs.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center py-20">
        <div className="text-center">
          <p className="text-gray-600">No blog posts found.</p>
        </div>
      </div>
    );
  }

  // Get featured blog (most recent)
  const featuredBlog = blogs[0];
  const recentBlogs = blogs.slice(1, 7);
  const remainingBlogs = blogs.slice(7, visibleCount);

  // Extract unique categories

  // const categories = [...new Set(blogs.flatMap(blog => 
  //   blog.categories?.map(cat => cat.name) || []
  // ))];

  // Handle loading more posts
  const loadMore = () => {
    setLoadingMore(true);
    // Simulate loading delay (remove this in production)
    setTimeout(() => {
      setVisibleCount(prev => Math.min(prev + 6, blogs.length));
      setLoadingMore(false);
    }, 500);
  };

  // Check if there are more posts to load
  const hasMorePosts = visibleCount < blogs.length;

  // Show all posts in Recent Posts if we have 6 or fewer total
  const shouldShowAllInRecent = blogs.length <= 7;
  const displayRecentBlogs = shouldShowAllInRecent ? blogs.slice(1) : recentBlogs;

  try {
    return (
      <div className="flex-1">
        {/* Hero Section */}
        <PageHeader
          title={
            <>
              Welcome to Our <span className="text-primary-dark">Blog</span>!
            </>
          }
          subtitle="Discover the latest updates, tips, and stories from our team."
          variant="default"
        />

        {/* Search and Filter Section */}
        <BlogFilters categories={blogCategories} totalPosts={blogs.length} />

        {/* Featured Blog Post  */}
        {featuredBlog && (
          <section className="py-12 px-6 bg-gradient-to-br from-gray-50 to-white">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-secondary mb-8 text-center animate-slide-in">
                Featured Post
              </h2>
              <div className="animate-slide-in" style={{ animationDelay: '0.1s' }}>
                <FeaturedBlog blog={featuredBlog} />
              </div>
            </div>
          </section>
        )}

        {/* Recent Posts - Main content area */}
        <section className="py-12 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-secondary">
                {shouldShowAllInRecent ? 'All Posts' : 'Recent Posts'}
              </h2>
              <div className="text-sm text-gray-500">
                {displayRecentBlogs.length} posts
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {displayRecentBlogs.map((blog) => (
                <BlogListItem key={blog.id} blog={blog} />
              ))}
            </div>
          </div>
        </section>

        {/* All Posts - Load more functionality */}
        {blogs.length > 7 && (
          <section className="py-12 px-6 bg-gray-50">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-secondary">
                  All Posts
                </h2>
                <div className="text-sm text-gray-500">
                  Showing {Math.max(0, visibleCount - 7)} of {blogs.length - 7} more posts
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                {remainingBlogs.map((blog) => (
                  <BlogListItem key={blog.id} blog={blog} />
                ))}
              </div>

              {/* Load More Button */}
              {hasMorePosts && (
                <div className="text-center">
                  <button
                    onClick={loadMore}
                    disabled={loadingMore}
                    className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loadingMore ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Loading...
                      </>
                    ) : (
                      <>
                        Load More Posts
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          </section>
        )}
      </div>
    );
  } catch (error) {
    console.error('Error rendering BlogsClient:', error);
    return (
      <div className="flex-1 flex items-center justify-center py-20">
        <div className="text-center">
          <p className="text-red-600 mb-4">Something went wrong loading the blog.</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }
};

export default BlogsClient;
