"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";

const CategoryDropdown = ({ categories, currentCategory }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const router = useRouter();
  const dropdownRef = useRef(null);

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

  const handleCategorySelect = (categorySlug) => {
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

  const getCurrentCategoryName = () => {
    if (currentCategory === "all") return "All Categories";
    const category = categories?.find(cat => cat.slug === currentCategory);
    return category?.name || "All Categories";
  };

  return (
    <div className="flex items-center justify-end py-6 px-6">
      <div className="flex items-center gap-3" ref={dropdownRef}>
        <span className="text-sm font-medium text-gray-700">Category:</span>
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="flex items-center gap-2 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all bg-white text-sm shadow-sm min-w-[160px] hover:bg-gray-50"
          >
            <span className="flex-1 text-left">
              {getCurrentCategoryName()}
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
                onClick={() => handleCategorySelect("all")}
                className={`w-full px-4 py-3 text-sm text-left hover:bg-gray-50 transition-colors cursor-pointer
                  ${currentCategory === "all" ? "bg-primary-light text-secondary font-medium" : "text-gray-700"}`}
              >
                All Categories
              </button>
              {categories && categories.length > 0 ? (
                categories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => handleCategorySelect(category.slug)}
                    className={`w-full px-4 py-3 text-sm text-left hover:bg-gray-50 transition-colors cursor-pointer
                      ${currentCategory === category.slug ? "bg-primary-light text-secondary font-medium" : "text-gray-700"}`}
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
    </div>
  );
};

export default CategoryDropdown;
