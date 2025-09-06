"use client";

import React from "react";

const PageHeader = ({ 
  title, 
  subtitle,
  className = "",
  titleClassName = "",
  subtitleClassName = "",
  variant = "warm" // "warm", "cool", "nature", "minimal"
}) => {
  const getBackgroundClasses = () => {
    switch (variant) {
      case "warm":
        return "bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50";
      case "cool":
        return "bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50";
      case "nature":
        return "bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50";
      case "minimal":
        return "bg-gradient-to-br from-gray-50 to-white";
      default:
        return "bg-primary-light";
    }
  };

  const getAccentColor = () => {
    switch (variant) {
      case "warm":
        return "bg-orange-500";
      case "cool":
        return "bg-blue-500";
      case "nature":
        return "bg-green-500";
      case "minimal":
        return "bg-gray-500";
      default:
        return "bg-primary-dark";
    }
  };

  return (
    <section className={`${getBackgroundClasses()} py-12 md:py-16 relative overflow-hidden ${className}`}>
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>
      
      <div className="max-w-6xl mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold text-secondary leading-tight mb-6 ${titleClassName}`}>
            {title}
          </h1>
          {subtitle && (
            <p className={`text-lg md:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto ${subtitleClassName}`}>
              {subtitle}
            </p>
          )}
          
          {/* Decorative accent line */}
          <div className={`w-24 h-1 mx-auto mt-8 rounded-full ${getAccentColor()}`} />
        </div>
      </div>
    </section>
  );
};

export default PageHeader;
