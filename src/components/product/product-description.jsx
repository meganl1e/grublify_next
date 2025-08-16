"use client";
import Portions from "./portions";
import { useProduct } from "@shopify/hydrogen-react";

export default function ProductDescription() {

  const { product } = useProduct();
  console.log(product.descriptionHtml || "no descriptionHtml");
  return (
    <div>
      {/* Description */}
      {product.description && (
        <div className="max-w-lg lg:max-w-none mx-auto">
          <h3 className="text-2xl font-semibold mb-2 text-secondary">Description</h3>
          <section
            className="prose prose-gray text-secondary"
            dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
          />

          <Portions />
           {/* <div className="prose"><ul><li>Test</li></ul></div> */}
        </div>
      )}
    </div>
  );
}