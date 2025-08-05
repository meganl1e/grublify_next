"use client";

import React, { useState, useEffect, useRef } from "react";

export default function HeadlineSlideshow({ messages = [], interval = 5000 }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (!messages.length) return;

    timeoutRef.current = setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % messages.length);
    }, interval);

    return () => clearTimeout(timeoutRef.current);
  }, [currentIndex, messages.length, interval]);

  if (!messages.length) return null;

  return (
    <div
      className="w-full bg-primary-dark text-white text-center text-sm md:text-base h-8 flex items-center justify-center px-4 relative overflow-hidden"
      aria-live="polite"
      aria-atomic="true"
      role="region"
      aria-label="Site announcement"
    >
      {messages.map((msg, i) => (
        <span
          key={i}
          className={`absolute left-0 top-0 w-full h-full flex items-center justify-center transition-opacity duration-1500 ease-in-out ${
            i === currentIndex ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          aria-hidden={i !== currentIndex}
        >
          {msg}
        </span>
      ))}
    </div>
  );
}
