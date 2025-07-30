"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import logo from "../../../public/grublify_logo_simple.png";
import CartModal from "../cart/cart-modal";
import ProfileButton from "../archive/profile/profile-button";
import DropdownMenu, { DropdownItem } from "../ui/dropdown-menu";


export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const links = [
    {
      href: "/products",
      label: "Shop",
      children: [
        { href: "/products/", label: "All Products" },
        { href: "/products/nutrition-pack-essentials", label: "Nutrition Packs" }
      ]
    },
    {
      href: "/recipes",
      label: "Recipes",
      children: [
        { href: "/recipes", label: "All Recipes" },
        { href: "/recipes/portion-calculator", label: "Portion Calculator" },
        { href: "/recipes/transition-guide", label: "Transition Guide" }
      ]
    },
    { href: "/blogs", label: "Blog" },
    {
      href: "/about",
      label: "About",
      children: [
        { href: "/about", label: "Our Story" },
        { href: "/team", label: "Team" }
      ]
    },
  ];

  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  return (
    <nav className="py-4 px-6 bg-secondary sticky top-0 z-50 border-b border-white/20">
      <div className="max-w-7xl mx-auto">

        {/* DESKTOP NAVBAR */}
        <div className="hidden lg:grid grid-cols-3 items-center w-full">
          {/* Left: Logo */}
          <div className="flex justify-start">
            <Link href="/">
              <div className="flex items-center space-x-2 cursor-pointer">
                <img src={logo.src} alt="Grublify Logo" className="h-8 w-auto mr-2" />
                <span className="text-3xl font-semibold text-primary hover:text-primary/90 transition-colors">
                  Grublify
                </span>
              </div>
            </Link>
          </div>

          {/* Center: Links */}
          <div className="flex justify-center items-center gap-8">
            {links.map((link) => {
              if (link.children) {
                return (
                  <DropdownMenu
                    key={link.href}
                    trigger={
                      <Link href={link.href}>
                        <span
                          className={`px-2 py-2 text-md font-medium transition-colors hover:text-white cursor-pointer flex items-center gap-1
                    ${pathname === link.href ? "text-primary" : "text-white/90"}`}
                        >
                          {link.label}
                          {/* the dropdown arrow thing is kinda ugly */}
                          {/* <svg 
                            className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg> */}
                        </span>
                      </Link>
                    }
                  >
                    {(handleItemClick) => 
                      link.children.map((child) => (
                        <DropdownItem 
                          key={child.href} 
                          href={child.href}
                          onClick={handleItemClick}
                        >
                          {child.label}
                        </DropdownItem>
                      ))
                    }
                  </DropdownMenu>
                );
              }

              return (
                <Link href={link.href} key={link.href}>
                  <span
                    className={`px-2 py-2 text-md font-medium transition-colors hover:text-white cursor-pointer
              ${pathname === link.href ? "text-primary" : "text-white/90"}`}
                  >
                    {link.label}
                  </span>
                </Link>
              );
            })}
          </div>

          {/* Right: Profile and Cart */}
          <div className="flex justify-end items-center gap-6">
            <ProfileButton />
            <CartModal />
          </div>
        </div>

        {/* MOBILE NAVBAR */}
        <div className="flex lg:hidden items-center justify-between w-full relative">
          {/* Left: Hamburger */}
          <button
            onClick={handleClick}
            className="text-white text-3xl flex-shrink-0"
            aria-label="Open menu"
          >
            {open ? "×" : "☰"}
          </button>

          {/* Center: Logo */}
          <Link href="/" className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center cursor-pointer">
            <img src={logo.src} alt="Grublify Logo" className="h-6 md:h-8 w-auto mr-2" />
            <span className="text-2xl md:text-3xl font-semibold text-primary hover:text-primary/90 transition-colors">
              Grublify
            </span>
          </Link>

          {/* Right: Profile and Cart */}
          <div className="flex items-center gap-1 md:gap-2 flex-shrink-0">
            <ProfileButton />
            <CartModal />
          </div>
        </div>
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ${open ? "max-h-screen" : "max-h-0"}`}
        >
          <div className="bg-secondary text-white p-4 space-y-4">
            {links.map((link) => (
              <Link href={link.href} key={link.href}>
                <div
                  className={`block px-1 py-2 text-lg font-semibold transition-colors hover:text-primary cursor-pointer ${pathname === link.href ? "text-primary" : "text-white/90"}`}
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}