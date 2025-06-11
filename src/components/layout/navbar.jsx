"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import CartButton from "../ui/CartButton";
import ProfileButton from "../ui/ProfileButton";
import logo from "../../../public/grublify_logo_simple.png";
import CartModal from "../cart/cart-modal";

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const links = [
    { href: "/products/nutrition-pack-essentials", label: "Shop" },
    { href: "/recipes", label: "Recipes" },
    { href: "/blogs", label: "Blog" },
    { href: "/about", label: "About" },
  ];

  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  return (
<nav className="py-4 px-6 bg-secondary sticky top-0 z-50 border-b border-white/20">
  <div className="max-w-7xl mx-auto">

    {/* DESKTOP NAVBAR */}
    <div className="hidden lg:flex items-center justify-between w-full">
      {/* Left: Logo */}
      <Link href="/">
        <div className="flex items-center space-x-2 cursor-pointer">
          <img src={logo.src} alt="Grublify Logo" className="h-8 w-auto mr-2" />
          <span className="text-3xl font-semibold text-primary hover:text-primary/90 transition-colors">
            Grublify
          </span>
        </div>
      </Link>

      {/* Center: Links */}
      <div className="flex justify-center items-center gap-8">
        {links.map((link) => (
          <Link href={link.href} key={link.href}>
            <span
              className={`px-2 py-2 text-md font-medium transition-colors hover:text-white cursor-pointer
                ${pathname === link.href ? "text-primary" : "text-white/90"}`}
            >
              {link.label}
            </span>
          </Link>
        ))}
      </div>

      {/* Right: Profile and Cart */}
      <div className="flex items-center gap-6">
        <ProfileButton />
        <CartModal />
      </div>
    </div>

    {/* MOBILE NAVBAR */}
    <div className="flex lg:hidden items-center justify-between w-full relative">
      {/* Left: Hamburger */}
      <button
        onClick={handleClick}
        className="text-primary text-3xl flex-shrink-0"
        aria-label="Open menu"
      >
        {open ? "×" : "☰"}
      </button>

      {/* Center: Logo */}
      <Link href="/" className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center cursor-pointer">
        <img src={logo.src} alt="Grublify Logo" className="h-8 w-auto mr-2" />
        <span className="text-3xl font-semibold text-primary hover:text-primary/90 transition-colors">
          Grublify
        </span>
      </Link>

      {/* Right: Profile and Cart */}
      <div className="flex items-center gap-4 flex-shrink-0">
        <ProfileButton />
        <CartModal />
      </div>
    </div>
  </div>
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ${open ? "max-h-screen" : "max-h-0"
          }`}
      >
        <div className="bg-secondary text-white p-4 space-y-4">
          {links.map((link) => (
            <Link href={link.href} key={link.href}>
              <div
                className={`block px-1 py-2 text-lg font-semibold transition-colors hover:text-primary cursor-pointer ${pathname === link.href ? "text-primary" : "text-white/90"
                  }`}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </div>
            </Link>
          ))}
          {/* <Link href="/waitlist">
            <button className="mt-2 text-md px-4 py-2 bg-primary hover:bg-white/90 text-secondary font-semibold rounded-sm border border-primary cursor-pointer" onClick={() => setOpen(false)}>
              Get Started
            </button>
          </Link> */}
        </div>
      </div>
    </nav>
  );
}

