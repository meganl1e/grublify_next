"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import BlogListItem from "./blog-list-item";
import BlogFilters from "./blog-filters";
import FeaturedBlog from "./featured-blog";
import PageHeader from "../ui/page-header";
import { Loader2 } from "lucide-react";

const BlogsClient = ({ initialBlogs, blogCategories, totalBlogs, initialPagination }) => {
  const [blogs, setBlogs] = useState([]);
  const [visibleBlogs, setVisibleBlogs] = useState([]);
  const [isClient, setIsClient] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const observerRef = useRef(null);
  const loadingRef = useRef(null);

  // Calculate optimal batch size for 2-column layout
  const getOptimalBatchSize = useCallback(() => {
    return 6; // Always 2 columns, batches of 6 for even rows
  }, []);

  // Ensure we're on the client side and initialize blogs
  useEffect(() => {
    setIsClient(true);
    if (initialBlogs && initialBlogs.length > 0) {
      setBlogs(initialBlogs);
      setVisibleBlogs(initialBlogs);
      setTotal(totalBlogs || initialBlogs.length);
      setHasMore(initialBlogs.length < (totalBlogs || initialBlogs.length));
    }
  }, [initialBlogs, totalBlogs]);

  // Load more blogs function
  const loadMoreBlogs = useCallback(async () => {
    if (loading || !hasMore) return;
    
    setLoading(true);
    
    try {
      const nextPage = currentPage + 1;
      const response = await fetch(`/api/blogs?page=${nextPage}&pageSize=6`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch more blogs');
      }
      
      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }
      
      const newBlogs = data.blogs || [];
      const total = data.total || 0;
      
      // If no new blogs returned, we've reached the end
      if (newBlogs.length === 0) {
        setHasMore(false);
        return;
      }
      
      setBlogs(prev => [...prev, ...newBlogs]);
      setVisibleBlogs(prev => [...prev, ...newBlogs]);
      setCurrentPage(nextPage);
      setTotal(total);
      
      // Check if we've loaded all available blogs
      const newTotalVisible = visibleBlogs.length + newBlogs.length;
      setHasMore(newTotalVisible < total);
      
    } catch (error) {
      console.error('Error loading more blogs:', error);
      // On error, stop trying to load more
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  }, [loading, hasMore, currentPage, visibleBlogs.length]);

  // Intersection Observer for infinite scroll
  useEffect(() => {
    if (!isClient) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          loadMoreBlogs();
        }
      },
      { threshold: 0.1 }
    );

    if (loadingRef.current) {
      observer.observe(loadingRef.current);
    }

    return () => {
      if (loadingRef.current) {
        observer.unobserve(loadingRef.current);
      }
    };
  }, [isClient, hasMore, loading, loadMoreBlogs]);

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

        {/* Featured Blog Post */}
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

        {/* All Blog Posts */}
        <section className="py-12 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-secondary">
                All Posts
              </h2>
              <div className="text-sm text-gray-500">
                Showing {visibleBlogs.length} of {total} posts
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {visibleBlogs.map((blog) => (
                <BlogListItem key={blog.id} blog={blog} />
              ))}
            </div>

            {/* Loading indicator for infinite scroll */}
            {hasMore && (
              <div ref={loadingRef} className="flex justify-center items-center py-8">
                {loading ? (
                  <div className="flex items-center gap-2 text-gray-600">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Loading more posts...</span>
                  </div>
                ) : (
                  <div className="text-gray-400 text-sm">
                    Scroll down to load more posts
                  </div>
                )}
              </div>
            )}

            {/* End of posts indicator */}
            {!hasMore && visibleBlogs.length > 0 && (
              <div className="flex justify-center items-center py-8">
                <div className="text-center">
                  <div className="text-gray-400 text-4xl mb-2">🎉</div>
                  <div className="text-secondary text-lg font-medium">
                    You've seen all {total} posts!
                  </div>
                  <div className="text-muted-foreground text-md mt-1">
                    Check back later for new content
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
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
