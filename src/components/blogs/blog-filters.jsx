"use client";

import { useState, useRef, useEffect } from "react";
import { Search, Filter, ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const BlogFilters = ({ categories, totalPosts }) => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const router = useRouter();
  const dropdownRef = useRef(null);

  // console.log("categories", categories)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleCategorySelect = (categorySlug, categoryName) => {
    setSelectedCategory(categorySlug);
    setIsDropdownOpen(false);

    if (categorySlug === "all") {
      router.push("/blogs");
    } else {
      // Ensure the category is properly encoded for the URL
      const encodedCategory = encodeURIComponent(categorySlug.toLowerCase());
      router.push(`/blogs/category/${encodedCategory}`);
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
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
        <div className="flex flex-col lg:flex-row gap-6 items-center justify-center">
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
          <div className="flex items-center gap-3" ref={dropdownRef}>
            <Filter className="text-gray-500 w-5 h-5" />
            <div className="relative">
              <button
                onClick={toggleDropdown}
                className="flex items-center gap-2 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all bg-white text-sm shadow-sm min-w-[160px] hover:bg-gray-50"
              >
                <span className="flex-1 text-left">
                  {selectedCategory === "all" ? "All Categories" : 
                   categories?.find(cat => cat.slug === selectedCategory)?.name || "All Categories"}
                </span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Menu */}
              <div
                className={`absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-xl min-w-[200px] transition-all duration-200 z-30
                  ${isDropdownOpen
                    ? 'opacity-100 visible translate-y-0'
                    : 'opacity-0 invisible -translate-y-2'
                  }`}
              >
                <div className="py-2">
                  <button
                    onClick={() => handleCategorySelect("all", "All Categories")}
                    className={`w-full px-4 py-3 text-sm text-left hover:bg-gray-50 transition-colors cursor-pointer
                      ${selectedCategory === "all" ? "bg-primary-light text-secondary font-medium" : "text-gray-700"}`}
                  >
                    All Categories
                  </button>
                  {categories && categories.length > 0 ? (
                    categories.map(category => (
                      <button
                        key={category.id}
                        onClick={() => handleCategorySelect(category.slug, category.name)}
                        className={`w-full px-4 py-3 text-sm text-left hover:bg-gray-50 transition-colors cursor-pointer
                          ${selectedCategory === category.slug ? "bg-primary-light text-secondary font-medium" : "text-gray-700"}`}
                      >
                        {category.name}
                      </button>
                    ))
                  ) : (
                    <div className="px-4 py-3 text-sm text-gray-500">No categories available</div>
                  )}
                </div>
              </div>
            </div>
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
