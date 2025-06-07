import Link from "next/link";
import { useCart } from "@shopify/hydrogen-react";
import { CiUser } from "react-icons/ci";


export default function ProfileButton() {

  return (
    <Link href="/profile" className="relative inline-block">
      <CiUser className="w-8 h-8 text-white/90 hover:text-white transition-colors" />
    </Link>
  );
}
