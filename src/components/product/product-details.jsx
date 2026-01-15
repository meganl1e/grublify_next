"use client";
import ProductDescription from "./product-description";
import ProductVariants from "./product-variants";
import ProductSubscription from "./product-subscription";
import ProductReviews from "./product-reviews";
import { ProductPrice, AddToCartButton, useProduct } from "@shopify/hydrogen-react";
import { useCartUI } from "../cart/cart-context";
import { CompactStarRating } from "../ui/star-rating";
import { useRef, useState, useMemo } from "react";

export default function ProductDetails({ reviews = [], averageRating = 0 }) {
  const { setIsCartOpen } = useCartUI();
  const reviewsRef = useRef(null);
  const [selectedSellingPlanId, setSelectedSellingPlanId] = useState(null);
  const [selectedSellingPlan, setSelectedSellingPlan] = useState(null);

  const handleClick = () => {
    setIsCartOpen(true);
  };

  const handleStarClick = () => {
    if (reviewsRef.current) {
      const top = reviewsRef.current.getBoundingClientRect().top + window.scrollY - 125;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  const {
    product,
    selectedVariant,
  } = useProduct();
  
  // Check if subscription is required
  const requiresSellingPlan = product?.requiresSellingPlan;
  const hasSellingPlans = product?.sellingPlanGroups?.edges?.length > 0;

  const compareAtPrice = selectedVariant?.compareAtPrice;
  const regularPrice = parseFloat(selectedVariant?.price?.amount || 0);
  const currencyCode = selectedVariant?.price?.currencyCode || 'USD';
  
  // Calculate subscription price from variant's sellingPlanAllocations
  // Using useMemo to recalculate when selectedSellingPlanId or selectedVariant changes
  const subscriptionPrice = useMemo(() => {
    if (!selectedSellingPlanId || !selectedVariant) return null;
    
    // Get selling plan allocations from the selected variant
    const allocations = selectedVariant?.sellingPlanAllocations?.edges || [];
    
    // Find the allocation that matches the selected selling plan
    const allocation = allocations.find(alloc => 
      alloc.node.sellingPlan.id === selectedSellingPlanId
    );
    
    if (!allocation) return null;
    
    const priceAdjustments = allocation.node.priceAdjustments || [];
    if (priceAdjustments.length === 0) return null;
    
    // Get the first price adjustment (usually the main price)
    const adjustment = priceAdjustments[0];
    
    // Priority: price > perDeliveryPrice > unitPrice
    if (adjustment.price) {
      return {
        amount: parseFloat(adjustment.price.amount),
        currencyCode: adjustment.price.currencyCode
      };
    } else if (adjustment.perDeliveryPrice) {
      return {
        amount: parseFloat(adjustment.perDeliveryPrice.amount),
        currencyCode: adjustment.perDeliveryPrice.currencyCode
      };
    } else if (adjustment.unitPrice) {
      return {
        amount: parseFloat(adjustment.unitPrice.amount),
        currencyCode: adjustment.unitPrice.currencyCode
      };
    }
    
    return null;
  }, [selectedSellingPlanId, selectedVariant]);
  
  const showSubscriptionPrice = selectedSellingPlanId && subscriptionPrice;

  const hasOnlyDefaultVariant =
    product.options.length === 1 &&
    product.options[0].name === "Title" &&
    product.options[0].values.length === 1 &&
    product.options[0].values[0] === "Default Title" &&
    product.variants.edges.length === 1;

  const publishedReviews = reviews.filter(
    (review) => review.attributes.status?.value === 'published'
  );
  const count = publishedReviews.length;

  return (
    <div className="flex flex-col space-y-6 items-center lg:items-start ">

      {/* Title, Price, Variants, and Button grouped as a "buy box" */}
      <div className="space-y-4 mb-4">
        <h1 className="text-3xl font-bold text-secondary mb-2">{product.title}</h1>
        {/* Star Rating - only show if we have a rating */}
        {averageRating > 0 && (
          <button
            type="button"
            onClick={handleStarClick}
            className="focus:outline-none cursor-pointer"
            aria-label="Scroll to reviews"
            style={{ background: "none", border: "none", padding: 0, margin: 0 }}
          >
            <CompactStarRating rating={averageRating} count={count} />
          </button>
        )}
        {/* <span className="inline-block bg-amber-100 text-amber-700 text-sm font-semibold px-3 py-1 rounded-full uppercase tracking-wide border border-amber-200">
          Coming Soon!
        </span> */}

        <div className="flex items-center space-x-4">
          {showSubscriptionPrice ? (
            <>
              <span className="text-xl text-gray-500 line-through">
                ${regularPrice.toFixed(2)} {currencyCode}
              </span>
              <span className="text-2xl font-bold text-secondary">
                ${subscriptionPrice.amount.toFixed(2)} {subscriptionPrice.currencyCode}
              </span>
            </>
          ) : (
            <>
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
            </>
          )}
        </div>
        {!hasOnlyDefaultVariant &&
          <ProductVariants />
        }
        {hasSellingPlans && (
          <ProductSubscription 
            onSellingPlanChange={setSelectedSellingPlanId}
            onSelectedPlanChange={setSelectedSellingPlan}
          />
        )}
        <AddToCartButton
          onClick={handleClick}
          variantId={selectedVariant.id}
          quantity={1}
          sellingPlanId={selectedSellingPlanId || undefined}
          accessibleAddingToCartLabel="Adding item to your cart"
          disabled={!selectedVariant.availableForSale || (requiresSellingPlan && !selectedSellingPlanId)}
          className={`w-full mb-4 max-w-sm mx-auto py-3 px-6 font-semibold rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary ${!selectedVariant.availableForSale || (requiresSellingPlan && !selectedSellingPlanId)
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-primary text-white hover:bg-primary/80 cursor-pointer"
            }`}
        >
          {requiresSellingPlan && !selectedSellingPlanId 
            ? "Select a Subscription Plan" 
            : "Add to Cart"}
        </AddToCartButton>
      </div>

      {/* Description */}
      <div className="px-6 lg:px-0">
        <ProductDescription />
      </div>

      {/* Reviews */}
      <div className="px-6 lg:px-0" ref={reviewsRef}>
        <ProductReviews reviews={reviews} averageRating={averageRating} />
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
