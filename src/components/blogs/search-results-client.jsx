"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import BlogListItem from "./blog-list-item";
import BlogSearchBar from "./blog-search-bar";
import BlogCategoryFilter from "./blog-category-filter";
import PageHeader from "../ui/page-header";
import { Loader2, Search, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const SearchResultsClient = ({ searchData, blogCategories, initialQuery }) => {
  const [blogs, setBlogs] = useState([]);
  const [visibleBlogs, setVisibleBlogs] = useState([]);
  const [isClient, setIsClient] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [query, setQuery] = useState('');
  const observerRef = useRef(null);
  const loadingRef = useRef(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  // Initialize state
  useEffect(() => {
    setIsClient(true);
    if (searchData && searchData.blogs) {
      setBlogs(searchData.blogs);
      setVisibleBlogs(searchData.blogs);
      setTotal(searchData.total || 0);
      setQuery(searchData.query || initialQuery || '');
      setHasMore(searchData.blogs.length < (searchData.total || 0));
      setCurrentPage(1);
    }
  }, [searchData, initialQuery]);

  // Load more search results
  const loadMoreResults = useCallback(async () => {
    if (loading || !hasMore || !query.trim()) return;
    
    setLoading(true);
    
    try {
      const nextPage = currentPage + 1;
      const response = await fetch(`/api/blogs/search?q=${encodeURIComponent(query)}&page=${nextPage}&pageSize=9`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch more search results');
      }
      
      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }
      
      const newBlogs = data.blogs || [];
      
      if (newBlogs.length === 0) {
        setHasMore(false);
        return;
      }
      
      setBlogs(prev => [...prev, ...newBlogs]);
      setVisibleBlogs(prev => [...prev, ...newBlogs]);
      setCurrentPage(nextPage);
      setTotal(data.total || 0);
      
      const newTotalVisible = visibleBlogs.length + newBlogs.length;
      setHasMore(newTotalVisible < (data.total || 0));
      
    } catch (error) {
      console.error('Error loading more search results:', error);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  }, [loading, hasMore, currentPage, query, visibleBlogs.length]);

  // Intersection Observer for infinite scroll
  useEffect(() => {
    if (!isClient) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          loadMoreResults();
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
  }, [isClient, hasMore, loading, loadMoreResults]);

  // Handle search from filters component
  const handleSearch = (searchQuery) => {
    if (searchQuery.trim()) {
      router.push(`/blogs/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

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

  return (
    <div className="flex-1">
      <div className="px-6 py-10">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <div className="mb-6 flex items-center justify-between">
              <Button asChild variant="secondary">
                <Link href="/blogs">
                  <ArrowLeft className="w-4 h-4" />
                  Back to All Blog Posts
                </Link>
              </Button>
              {/* Search and Filter Section */}
              <div className="flex items-center gap-4">
                <BlogSearchBar 
                  onSearch={handleSearch}
                  initialSearchQuery={query}
                />
                <BlogCategoryFilter categories={blogCategories} />
              </div>
            </div>
            {/* Title section - only show if there are results or no query */}
            {(!query || visibleBlogs.length > 0) && (
              <div className="text-center">
                <h1 className="text-4xl font-bold text-secondary mb-4">
                  {query ? `Search Results for "${query}"` : 'Search Blogs'}
                </h1>
                <p className="text-gray-600 text-lg">
                  {query ? (
                    `${total} ${total === 1 ? 'result' : 'results'} found`
                  ) : (
                    'Search through our collection of dog food recipes, nutrition tips, and pet care advice.'
                  )}
                </p>
              </div>
            )}
          </div>

          {/* Search Results */}
          {query ? (
            <>

              {/* Results Grid */}
              {visibleBlogs.length > 0 ? (
                <>
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
                          <span>Loading more results...</span>
                        </div>
                      ) : (
                        <div className="text-gray-400 text-sm">
                          Scroll down to load more results
                        </div>
                      )}
                    </div>
                  )}

                  {/* End of results indicator */}
                  {!hasMore && visibleBlogs.length > 0 && (
                    <div className="flex justify-center items-center py-8">
                      <div className="text-center">
                        <div className="text-gray-400 text-4xl mb-2">🔍</div>
                        <div className="text-secondary text-lg font-medium">
                          You've seen all {total} results!
                        </div>
                        <div className="text-muted-foreground text-md mt-1">
                          Try a different search term for more results
                        </div>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-20">
                  <div className="text-gray-400 text-6xl mb-4">🔍</div>
                  <h3 className="text-2xl font-bold text-secondary mb-4">
                    No results found for "{query}"
                  </h3>
                  <p className="text-gray-600 mb-8 max-w-md mx-auto">
                    We couldn't find any blog posts matching your search. Try different keywords or browse our categories.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    {/* <Button asChild variant="secondary">
                      <Link href="/blogs">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to All Blog Posts
                      </Link>
                    </Button> */}
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-20">
              <div className="text-gray-400 text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-secondary mb-4">
                Start Your Search
              </h3>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                Use the search bar above to find blog posts about dog food recipes, nutrition tips, and pet care advice.
              </p>
              <Button asChild variant="secondary">
                <Link href="/blogs">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Browse All Posts
                </Link>
              </Button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default SearchResultsClient;
