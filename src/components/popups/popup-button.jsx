"use client";
import React from "react";
import { IoMdGift } from "react-icons/io";


export default function PopupButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      aria-label="Open signup popup to get 40% off"
      className="
        fixed bottom-5 right-5 z-50
        px-5 py-3 md:px-6 md:py-4
        bg-accent text-white font-semibold
        rounded-full
        shadow-lg
        cursor-pointer
        transition-colors duration-300
        animate-bounce [animation-duration:2s]
        border-2 border-white
      "
    >
      <div className="flex flex-row items-center gap-2 text-lg md:text-xl">
        <IoMdGift />
        <p>Get 40% Off!</p>
      </div>
    </button>
  );
}
