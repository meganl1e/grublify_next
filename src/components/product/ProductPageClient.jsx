"use client";
import { ProductProvider } from '@shopify/hydrogen-react';
import ProductImages from '@/components/product/ProductImages';
import ProductDetails from '@/components/product/ProductDetails';
import ProductBreadcrumb from '@/components/product/ProductBreadcrumb';


export default function ProductPageClient({ product }) {

  return (
    <ProductProvider data={product}>
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        <ProductBreadcrumb />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          <ProductImages />
          <ProductDetails />
        </div>
      </main>
    </ProductProvider>
  );
}