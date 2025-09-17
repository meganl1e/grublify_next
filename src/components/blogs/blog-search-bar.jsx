"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";

const BlogSearchBar = ({ onSearch, initialSearchQuery = "", placeholder = "Search blogs..." }) => {
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      if (onSearch) {
        // If onSearch callback is provided, use it (for search results page)
        onSearch(searchQuery);
      } else {
        // Otherwise, navigate to search page
        router.push(`/blogs/search?q=${encodeURIComponent(searchQuery.trim())}`);
      }
    }
  };

  return (
    <form onSubmit={handleSearch} className="relative flex-1 max-w-md">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
      <input
        type="text"
        placeholder={placeholder}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-sm shadow-sm"
      />
    </form>
  );
};

export default BlogSearchBar;
