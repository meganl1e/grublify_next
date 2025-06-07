"use client";
import { useState } from "react";
import ProductDescription from "./ProductDescription";
import ProductVariants from "./ProductVariants";
import { ProductPrice, AddToCartButton, useProduct } from "@shopify/hydrogen-react";
import Link from "next/link";

export default function ProductDetails() {

  const {
    product,
    selectedVariant,
  } = useProduct();

  const compareAtPrice = selectedVariant?.compareAtPrice;

  return (
    <div className="space-y-4">

      {/* Availability
      <div className="flex items-center space-x-2">
        {selectedVariant?.availableForSale ? (
          <>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-green-600 font-medium">In Stock</span>
          </>
        ) : (
          <>
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span className="text-red-600 font-medium">Out of Stock</span>
          </>
        )}
      </div> */}

      {/* Title, Price, Variants, and Button grouped as a "buy box" */}
      <div className="space-y-4 mb-4">
        <h1 className="text-3xl font-bold text-secondary mb-2">{product.title}</h1>
        <span className="inline-block bg-amber-100 text-amber-700 text-sm font-semibold px-3 py-1 rounded-full uppercase tracking-wide border border-amber-200">
          Coming Soon!
        </span>

        <div className="flex items-center space-x-4">
          {/* <ProductPrice
            data={product}
            variantId={selectedVariant.id}
            className="text-2xl font-bold text-gray-900"
          />
          {compareAtPrice && (
            <ProductPrice
              data={product}
              priceType="compareAt"
              variantId={selectedVariant.id}
              className="text-xl text-gray-500 line-through"
            />
          )} */}
        </div>
        {/* <ProductVariants /> */}
        {/* <AddToCartButton
          // onClick={() => console.log('Add to Cart clicked', selectedVariant.id)}
          variantId={selectedVariant.id}
          quantity={1}
          accessibleAddingToCartLabel="Adding item to your cart"
          disabled={!selectedVariant.availableForSale}
          className="w-full mb-4 max-w-sm mx-auto py-3 px-6 bg-primary text-white font-semibold rounded-md shadow-sm hover:bg-primary/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary cursor-pointer"
        >
          Add to Cart
        </AddToCartButton> */}

        <Link href="/waitlist">
          <button
            className="w-full mb-4 max-w-sm mx-auto py-3 px-6 bg-primary text-white font-semibold rounded-md shadow-sm hover:bg-primary/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary cursor-pointer"
          >
            Sign Up For Early Access!
          </button>
        </Link>
      </div>

      {/* Description */}
      <ProductDescription />

      {/* Tags */}
      {product.tags && product.tags.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-3">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {product.tags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
