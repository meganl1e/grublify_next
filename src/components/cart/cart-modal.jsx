'use client'; // <-- Make sure this is at the top

import React from "react";
import { CiShoppingCart } from "react-icons/ci";
import { useCart, CartLineProvider } from "@shopify/hydrogen-react";
import CartLine from "./cart-line";
import { useCartUI } from "./cart-context";

export default function CartModal() {
  const { isCartOpen, setIsCartOpen } = useCartUI();
  const { lines, totalQuantity, cost, checkoutUrl } = useCart();
  const itemCount = lines?.reduce((sum, line) => sum + line.quantity, 0) || 0;

  return (
    <>
      <button
        onClick={() => setIsCartOpen(true)}
        aria-label="Open cart"
        className="cursor-pointer"
      >
        <div className="relative">
          <CiShoppingCart className="w-8 h-8 text-white/90 hover:text-white transition-colors" />
          <span className="absolute -top-1 -right-2 bg-primary text-secondary text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
            {itemCount}
          </span>
        </div>
      </button>

      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 ${
          isCartOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={(e) => {
          // Only close if clicking the backdrop itself, not its children, otherwise increasing item in cart closes the modal
          if (e.target === e.currentTarget) {
            setIsCartOpen(false);
          }
        }}
        aria-hidden={!isCartOpen}
      >
        {/* Sliding Panel */}
        <div
          className={`
            absolute right-0 top-0 h-full w-full md:max-w-md bg-white shadow-lg flex flex-col p-6
            transition-transform duration-300 ease-in-out
            ${isCartOpen ? "translate-x-0" : "translate-x-full"}
          `}
        >
          {/* Close button */}
          <button
            onClick={() => setIsCartOpen(false)}
            className="absolute right-6 text-3xl text-secondary"
            aria-label="Close cart"
          >
            &times;
          </button>
          {/* Modal Header */}
          <h2 className="mb-6 text-2xl font-bold text-secondary">My Cart</h2>
          {/* Modal Content */}
          {lines.length > 0 ? (
            <>
              <ul>
                {lines.map((line) => (
                  <CartLineProvider key={line.id} line={line}>
                    <CartLine closeCart={() => setIsCartOpen(false)} />
                  </CartLineProvider>
                ))}
              </ul>
              {/* Cart Summary & Checkout */}
              <div className="mt-6 pt-4">
                <div className="flex justify-between text-lg font-semibold mb-2">
                  <span>Subtotal</span>
                  <span>
                    ${cost?.subtotalAmount?.amount} {cost?.subtotalAmount?.currencyCode}
                  </span>
                </div>
                <button
                  className="w-full mt-4 bg-primary text-secondary font-bold py-3 rounded hover:bg-primary/90 transition cursor-pointer"
                  disabled={lines.length === 0}
                  onClick={() => {
                    if (checkoutUrl) {
                      const url = new URL(checkoutUrl);
                      const cartId = url.pathname.split('/cart/c/')[1];
                      const shopifyCheckoutUrl = `https://grublify.myshopify.com/checkouts/cn/${cartId}`;
                      window.location.href = shopifyCheckoutUrl;
                    } else {
                      console.log("no checkout url");
                    }
                  }}
                >
                  Checkout
                </button>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-secondary">
              Your cart is empty.
            </div>
          )}
        </div>
      </div>
    </>
  );
}
