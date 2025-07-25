"use client";
import { useProduct } from '@shopify/hydrogen-react';
import Link from "next/link";

export default function ProductBreadcrumb() {

  const { product } = useProduct();
  return (
    <nav className = "mb-8" >
      <div className="flex items-center space-x-2 text-sm text-gray-600">
        <Link href="/" className="hover:text-secondary">Home</Link>
        <span>/</span>
        <Link href="/products" className="hover:text-secondary">Products</Link>
        <span>/</span>
        <span className="text-gray-900">{product.title}</span>
      </div>
    </nav >
  );
}