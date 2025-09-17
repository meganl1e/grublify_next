import { Suspense } from 'react';
import { searchBlogs, fetchBlogCategories } from '@/lib/strapi-client';
import SearchResultsClient from '@/components/blogs/search-results-client';
import { Metadata } from 'next';

export async function generateMetadata({ searchParams }) {
  const query = searchParams?.q || '';
  
  if (!query) {
    return {
      title: 'Search Blogs | Grublify',
      description: 'Search through our collection of dog food recipes, nutrition tips, and pet care advice.',
    };
  }

  return {
    title: `Search Results for "${query}" | Grublify Blog`,
    description: `Find articles about "${query}" in our collection of dog food recipes, nutrition tips, and pet care advice.`,
    openGraph: {
      title: `Search Results for "${query}" | Grublify Blog`,
      description: `Find articles about "${query}" in our collection of dog food recipes, nutrition tips, and pet care advice.`,
      url: `https://grublify.com/blogs/search?q=${encodeURIComponent(query)}`,
      siteName: "Grublify",
      type: "website",
    },
  };
}

export default async function SearchPage({ searchParams }) {
  const query = searchParams?.q || '';
  const page = parseInt(searchParams?.page) || 1;

  try {
    const [searchData, blogCategories] = await Promise.all([
      query ? searchBlogs(query, page, 9) : { blogs: [], pagination: null, total: 0, query: '' },
      fetchBlogCategories()
    ]);

    return (
      <div className="flex-1">
        <Suspense fallback={
          <div className="flex-1 flex items-center justify-center py-20">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-gray-600">Searching...</p>
            </div>
          </div>
        }>
          <SearchResultsClient 
            searchData={searchData}
            blogCategories={blogCategories}
            initialQuery={query}
          />
        </Suspense>
      </div>
    );
  } catch (error) {
    console.error('Error in Search page:', error);
    
    let blogCategories = [];
    try {
      blogCategories = await fetchBlogCategories();
    } catch (catError) {
      console.error('Error fetching categories:', catError);
    }
    
    return (
      <div className="flex-1 flex items-center justify-center py-20">
        <div className="text-center">
          <div className="text-red-400 text-6xl mb-4">⚠️</div>
          <h1 className="text-3xl font-bold text-secondary mb-4">Search Error</h1>
          <p className="text-gray-600 mb-8">
            Something went wrong while searching. Please try again.
          </p>
          <SearchResultsClient 
            searchData={{ blogs: [], pagination: null, total: 0, query: '' }}
            blogCategories={blogCategories}
            initialQuery={query}
          />
        </div>
      </div>
    );
  }
}
