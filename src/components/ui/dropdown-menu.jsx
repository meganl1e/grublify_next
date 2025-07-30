"use client";
import { useState } from "react";
import Link from "next/link";

export default function DropdownMenu({ trigger, children, className = "" }) {
  const [isOpen, setIsOpen] = useState(false);

  // dropdown menu is visible
  const handleMouseEnter = () => {
    setIsOpen(true);
  };

  // dropdown menu is invisible
  const handleMouseLeave = () => {
    setIsOpen(false);
  };

  const handleItemClick = () => {
    setIsOpen(false);
  };

  return (
    <div 
      className={`relative group ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* this trigger is a button, link, whatever you want, it is the thing you have to interact with in order to trigger dropdown menu*/}
      {trigger}
      
      {/* Dropdown Content */}
      <div
        className={`absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-sm shadow-xl min-w-[200px] transition-all duration-200 z-30
    ${isOpen
            ? 'opacity-100 visible translate-y-0'
            : 'opacity-0 invisible -translate-y-2'
          }`}
      >
        {/* Pass the click handler to children */}
        {typeof children === 'function' ? children(handleItemClick) : children}
      </div>

      {/* <div 
        className={`absolute top-full left-0 mt-1 bg-secondary border border-white/20 rounded-lg shadow-lg py-2 min-w-[200px] transition-all duration-200 ${
          isOpen 
            ? 'opacity-100 visible translate-y-0' 
            : 'opacity-0 invisible -translate-y-2'
        }`}
      >
        {children}
      </div> */}
    </div>
  );
}

// export function DropdownItem({ href, children, className = "" }) {
//   return (
//     <Link href={href}>
//       <div className={`px-4 py-2 text-sm text-white/90 hover:text-primary hover:bg-white/5 transition-colors cursor-pointer ${className}`}>
//         {children}
//       </div>
//     </Link>
//   );
// }

export function DropdownItem({ href, children, className = "", onClick }) {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <Link href={href} onClick={handleClick}>
      <div
        className={`
          px-4 py-4 text-sm text-secondary hover:text-secondary hover:bg-primary-light font-medium
          transition-colors cursor-pointer rounded-sm
          ${className}
        `}
      >
        {children}
      </div>
    </Link>
  );
}

