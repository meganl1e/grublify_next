"use client";
import { useProduct } from "@shopify/hydrogen-react";

export default function ProductDescription() {

  const { product } = useProduct();
  return (
    <div>
      {/* Description */}
      {product.description && (
        <div className="prose prose-gray max-w-none">
          <h3 className="text-2xl font-semibold mb-2 text-secondary">Description</h3>
          <div
            dangerouslySetInnerHTML={{ __html: product.descriptionHtml || product.description}}
            className="text-gray-600"
          />
        </div>
      )}
    </div>
  );
}