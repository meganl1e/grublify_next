"use client";

import { useState } from "react";
import { Search, Filter } from "lucide-react";
import { useRouter } from "next/navigation";

const BlogFilters = ({ categories, totalPosts }) => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  // console.log("categories", categories)

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);

    if (category === "all") {
      router.push("/blogs");
    } else {
      // Ensure the category is properly encoded for the URL
      const encodedCategory = encodeURIComponent(category.toLowerCase());
      router.push(`/blogs/category/${encodedCategory}`);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // For now, just redirect to blogs page
      // In the future, you could implement search functionality
      router.push("/blogs");
    }
  };

  return (
    <section className="py-8 px-6 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search blogs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-sm shadow-sm"
            />
          </form>

          {/* Category Filter */}
          <div className="flex items-center gap-3">
            <Filter className="text-gray-500 w-5 h-5" />
            <select
              value={selectedCategory}
              onChange={handleCategoryChange}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all bg-white text-sm shadow-sm min-w-[160px]"
            >
              <option value="all">All Categories</option>
              {categories && categories.length > 0 ? (
                categories.map(category => (
                  <option key={category.id} value={category.slug}>
                    {category.name}
                  </option>
                ))
              ) : (
                <option value="" disabled>No categories available</option>
              )}
            </select>

          </div>

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
