"use client";
import { ProductProvider } from '@shopify/hydrogen-react';
import ProductImages from '@/components/product/product-images';
import ProductDetails from '@/components/product/product-details';
import ProductBreadcrumb from '@/components/product/product-breadcrumb';

export default function ProductPageClient({ product, reviews = [], averageRating = 0 }) {

  return (
    <ProductProvider data={product}>
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        <ProductBreadcrumb />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-8">
          <ProductImages />
          <ProductDetails reviews={reviews} averageRating={averageRating} />
        </div>
      </main>
    </ProductProvider>
  );
}