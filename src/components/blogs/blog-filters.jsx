import BlogSearchBar from "./blog-search-bar";
import BlogCategoryFilter from "./blog-category-filter";

const BlogFilters = ({ categories, totalPosts, onSearch, initialSearchQuery = "" }) => {
  return (
    <section className="py-8 px-6 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-6 items-center justify-center">
          {/* Search Bar */}
          <BlogSearchBar 
            onSearch={onSearch} 
            initialSearchQuery={initialSearchQuery}
          />

          {/* Category Filter */}
          <BlogCategoryFilter categories={categories} />

          {/* Results Count */}
          <div className="text-sm text-gray-600 font-medium bg-gray-100 px-4 py-2 rounded-lg">
            {totalPosts} {totalPosts === 1 ? 'post' : 'posts'}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogFilters;
