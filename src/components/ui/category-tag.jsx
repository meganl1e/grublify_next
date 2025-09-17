import React from "react";

const CategoryTag = ({ 
  name, 
  variant = "default", // "default", "primary", "secondary", "outline", "more"
  size = "sm", // "xs", "sm", "md"
  className = "",
  onClick
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case "primary":
        return "bg-primary text-white border border-primary";
      case "secondary":
        return "bg-secondary text-white border border-secondary";
      case "outline":
        return "bg-transparent border-2 border-gray-300 text-gray-600 hover:bg-gray-100 hover:border-gray-400";
      case "more":
        return "bg-gray-100 border border-gray-300 text-gray-600";
      case "default":
      default:
        return "bg-emerald-50 text-emerald-700 border border-emerald-200";
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case "xs":
        return "px-1.5 py-0.5 text-xs";
      case "sm":
        return "px-2.5 py-1 text-xs";
      case "md":
        return "px-3 py-1.5 text-sm";
      default:
        return "px-2.5 py-1 text-xs";
    }
  };

  const baseClasses = "inline-block font-medium rounded-full whitespace-nowrap transition-all duration-200";
  const variantClasses = getVariantClasses();
  const sizeClasses = getSizeClasses();
  const clickableClasses = onClick ? "cursor-pointer hover:scale-105" : "";

  return (
    <span
      className={`${baseClasses} ${variantClasses} ${sizeClasses} ${clickableClasses} ${className}`}
      onClick={onClick}
    >
      {name}
    </span>
  );
};

export default CategoryTag;
