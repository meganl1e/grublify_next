"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/profile", label: "Profile" },
  { href: "/profile/orders", label: "Orders" },
  { href: "/profile/settings", label: "Settings" },
];

export default function ProfileLayout({ children }) {
  const pathname = usePathname();

  return (
    <div className="flex max-w-4xl mx-auto mt-10 min-h-[60vh]">
      <aside className="w-48 border-r pr-4">
        <nav className="flex flex-col gap-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`px-3 py-2 rounded transition ${
                pathname === item.href
                  ? "bg-primary text-white font-semibold"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>
      <main className="flex-1 pl-8">{children}</main>
    </div>
  );
} 