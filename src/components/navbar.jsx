"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import logo from "../../public/grublify_logo_simple.png";

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const links = [
    { href: "/products", label: "Shop" },
    { href: "/recipes", label: "Recipes" },
    { href: "/blogs", label: "Blog" },
    { href: "/about", label: "About" },
  ];

  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  return (
    <nav className="py-4 px-6 bg-secondary sticky top-0 z-50 border-b border-white/20">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="/">
          <div className="flex items-center space-x-2 cursor-pointer">
            <img src={logo.src} alt="Grublify Logo" className="h-8 w-auto mr-2" />
            <span className="text-3xl font-semibold text-primary hover:text-primary/90 transition-colors">
              Grublify
            </span>
          </div>
        </Link>

        {/* Hamburger Button */}
        <button
          className="lg:hidden text-primary text-3xl"
          onClick={handleClick}
        >
          {open ? "X" : "☰"}
        </button>

        {/* Desktop Menu */}
        <div className="hidden lg:flex flex-grow space-x-6 items-center justify-end">
          {links.map((link) => (
            <Link href={link.href} key={link.href}>
              <span
                className={`px-2 py-2 text-md font-semibold transition-colors hover:text-white cursor-pointer
                  ${pathname === link.href ? "text-primary" : "text-white/90"}`}
              >
                {link.label}
              </span>
            </Link>
          ))}
          <Link href="/waitlist">
            <button className="text-md px-4 py-2 bg-primary hover:bg-white/90 text-secondary font-semibold ml-2 rounded-sm border border-primary cursor-pointer">
              Get Started
            </button>
          </Link>
        </div>
        {/* <Link href="/waitlist">
          <button className="text-md px-4 py-2 bg-primary hover:bg-white/90 text-secondary font-semibold ml-2 rounded-sm border border-primary cursor-pointer">
            Get Started
          </button>
        </Link> */}
      </div>

      {/* MOBILE MENU */}
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
          <Link href="/waitlist">
            <button className="mt-2 text-md px-4 py-2 bg-primary hover:bg-white/90 text-secondary font-semibold rounded-sm border border-primary cursor-pointer" onClick={() => setOpen(false)}>
              Get Started
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
}

