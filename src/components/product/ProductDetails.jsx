"use client";
import { useState } from "react";
import ProductDescription from "./ProductDescription";
import ProductVariants from "./ProductVariants";
import { ProductPrice } from "@shopify/hydrogen-react";
import { AddToCartButton } from "@shopify/hydrogen-react";

export default function ProductDetails({ product }) {
  // Extract variants array
  const variants = product.variants?.edges?.map(edge => edge.node) || [];
  // Use the first variant as default
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const selectedVariant = variants[selectedVariantIndex];

  // Get price and compareAtPrice from the selected variant
  const price = selectedVariant?.price;
  const compareAtPrice = selectedVariant?.compareAtPrice;

  return (
    <div className="space-y-4">

      {/* Availability */}
      <div className="flex items-center space-x-2">
        {selectedVariant?.availableForSale ? (
          <>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-green-600 font-medium">In Stock</span>
            {selectedVariant.quantityAvailable && (
              <span className="text-gray-600">
                ({selectedVariant.quantityAvailable} available)
              </span>
            )}
          </>
        ) : (
          <>
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span className="text-red-600 font-medium">Out of Stock</span>
          </>
        )}
      </div>

      {/* Title and Price */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.title}</h1>
        <div className="flex items-center space-x-4 mb-4">
          {price && (
            <ProductPrice
              data={product}
              priceType="regular"
              variantId={selectedVariant.id}
              className="text-2xl font-bold text-gray-900"
            />
          )}
          {compareAtPrice && (
            <ProductPrice
              data={product}
              priceType="compareAt"
              variantId={selectedVariant.id}
              className="text-xl text-gray-500 line-through"
            />
          )}
        </div>
      </div>

      <ProductVariants
      />

      {/* Add to Cart Button */}
      <AddToCartButton
        // onClick={() => console.log('Add to Cart clicked', selectedVariant.id)}
        variantId={selectedVariant.id}
        quantity={1}
        accessibleAddingToCartLabel="Adding item to your cart"
        disabled={!selectedVariant.availableForSale}
        className="w-full max-w-sm mx-auto py-3 px-6 bg-primary text-white font-semibold rounded-md shadow-sm hover:bg-primary/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary cursor-pointer"
      >
        Add to Cart
      </AddToCartButton>

      {/* Description */}
      <ProductDescription
        descriptionHtml={product.descriptionHtml}
        description={product.description}
      />

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
