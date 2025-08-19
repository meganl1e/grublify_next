"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import BlogListItem from "./blog-list-item";
import { Loader2 } from "lucide-react";

const InfiniteScrollBlogs = ({ initialBlogs, loadMoreBlogs, hasMore }) => {
  const [blogs, setBlogs] = useState(initialBlogs || []);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const observer = useRef();

  // Intersection Observer for infinite scroll
  const lastBlogRef = useCallback(node => {
    if (loading) return;
    
    if (observer.current) observer.current.disconnect();
    
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prevPage => prevPage + 1);
      }
    });
    
    if (node) observer.current.observe(node);
  }, [loading, hasMore]);

  // Load more blogs when page changes
  useEffect(() => {
    if (page === 1) return; // Skip initial load
    
    const loadMore = async () => {
      setLoading(true);
      try {
        const newBlogs = await loadMoreBlogs(page);
        if (newBlogs && newBlogs.length > 0) {
          setBlogs(prev => [...prev, ...newBlogs]);
        }
      } catch (error) {
        console.error('Error loading more blogs:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadMore();
  }, [page, loadMoreBlogs]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {blogs.map((blog, index) => {
        // Add ref to last blog for intersection observer
        if (blogs.length === index + 1) {
          return (
            <div key={blog.id} ref={lastBlogRef}>
              <BlogListItem blog={blog} />
            </div>
          );
        }
        
        return <BlogListItem key={blog.id} blog={blog} />;
      })}
      
      {/* Loading indicator */}
      {loading && (
        <div className="col-span-full flex justify-center py-8">
          <div className="flex items-center gap-2 text-gray-600">
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Loading more posts...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default InfiniteScrollBlogs;
