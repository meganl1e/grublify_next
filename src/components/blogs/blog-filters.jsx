"use client";

import { useState } from "react";
import { Search, Filter } from "lucide-react";
import { useRouter } from "next/navigation";

const BlogFilters = ({ categories, totalPosts }) => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);
    
    if (category === "all") {
      router.push("/blogs");
    } else {
      router.push(`/blogs/category/${category.toLowerCase()}`);
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
    <section className="py-6 px-6 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search blogs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-sm"
            />
          </form>

          {/* Category Filter */}
          <div className="flex items-center gap-2">
            <Filter className="text-gray-500 w-4 h-4" />
            <select
              value={selectedCategory}
              onChange={handleCategoryChange}
              className="px-3 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all bg-white text-sm"
            >
              <option value="all">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Results Count */}
          <div className="text-sm text-gray-600 font-medium">
            {totalPosts} {totalPosts === 1 ? 'post' : 'posts'}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogFilters;
