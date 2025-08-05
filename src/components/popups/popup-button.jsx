"use client";
import React from "react";

export default function PopupButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      aria-label="Open signup popup to get 40% off"
      className="
        fixed bottom-5 right-5 z-50
        px-5 py-3
        bg-rose-500 text-white font-semibold
        rounded-full
        shadow-lg
        cursor-pointer
        transition-colors duration-300
        hover:bg-rose-600
        animate-pulse
        focus:outline-none focus:ring-4 focus:ring-rose-400
      "
    >
      🎁 Get 40% Off!
    </button>
  );
}
