"use client";
import ProductDescription from "./ProductDescription";
import ProductVariants from "./ProductVariants";
import { ProductPrice, AddToCartButton, useProduct } from "@shopify/hydrogen-react";

export default function ProductDetails() {

  const {
    product,
    selectedVariant,
  } = useProduct();

  const compareAtPrice = selectedVariant?.compareAtPrice;


  return (
    <div className="flex flex-col space-y-6 items-center lg:items-start ">

      {/* Title, Price, Variants, and Button grouped as a "buy box" */}
      <div className="space-y-4 mb-4">
        <h1 className="text-3xl font-bold text-secondary mb-2">{product.title}</h1>
        {/* <span className="inline-block bg-amber-100 text-amber-700 text-sm font-semibold px-3 py-1 rounded-full uppercase tracking-wide border border-amber-200">
          Coming Soon!
        </span> */}


        <div className="flex items-center space-x-4">
          <ProductPrice
            data={product}
            variantId={selectedVariant.id}
            className="text-2xl font-bold text-secondary"
          />
          {compareAtPrice && (
            <ProductPrice
              data={product}
              priceType="compareAt"
              variantId={selectedVariant.id}
              className="text-xl text-gray-500 line-through"
            />
          )}
        </div>
        <ProductVariants />
        <AddToCartButton
          onClick={() => console.log('Add to Cart clicked', selectedVariant.id)}
          variantId={selectedVariant.id}
          quantity={1}
          accessibleAddingToCartLabel="Adding item to your cart"
          disabled={!selectedVariant.availableForSale}
          className="w-full mb-4 max-w-sm mx-auto py-3 px-6 bg-primary text-white font-semibold rounded-md shadow-sm hover:bg-primary/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary cursor-pointer"
        >
          Add to Cart
        </AddToCartButton>
      </div>

      {/* Description */}
      <div className="px-6 lg:px-0">
        <ProductDescription />
      </div>

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
