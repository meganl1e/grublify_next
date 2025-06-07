import Link from "next/link";
import { useCart } from "@shopify/hydrogen-react";
import { CiShoppingCart } from "react-icons/ci";


export default function CartButton() {
  const { lines } = useCart();
  const itemCount = lines?.reduce((sum, line) => sum + line.quantity, 0) || 0;

  return (
    <Link href="/cart" className="relative inline-block">
      <CiShoppingCart className="w-8 h-8 text-white/90 hover:text-white transition-colors" />
      <span className="absolute -top-1 -right-2 bg-primary text-secondary text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
        {itemCount}
      </span>
    </Link>
  );
}
