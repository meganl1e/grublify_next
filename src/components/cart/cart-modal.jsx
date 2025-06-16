"ues client";
import React, { useState, useEffect } from "react";
import { CiShoppingCart } from "react-icons/ci";
import { useCart, CartLineProvider, CartCheckoutButton } from "@shopify/hydrogen-react";
import CartLine from "./cart-line";

export default function CartModal() {

  const { lines, totalQuantity, cost, status, checkoutUrl } = useCart();
  const itemCount = lines?.reduce((sum, line) => sum + line.quantity, 0) || 0;
  const [isOpen, setIsOpen] = useState(false);

  // Open and close handlers
  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  // Optional: Close modal when clicking the backdrop
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) closeCart();
  };

  // console.log("shoppping cart:", lines)

  // console.log("checkout: ", checkoutUrl)

  // const url = new URL(checkoutUrl);
  // const pathAndQuery = url.pathname + url.search;
  // const shopifyCheckoutUrl = `https://grublify.myshopify.com${pathAndQuery}`;




  return (
    <>
      <button
        onClick={openCart}
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
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
        onClick={handleBackdropClick}
        aria-hidden={!isOpen}
      >
        {/* Sliding Panel */}
        <div
          className={`
            absolute right-0 top-0 h-full w-full md:max-w-md bg-white shadow-lg flex flex-col p-6
            transition-transform duration-300 ease-in-out
            ${isOpen ? "translate-x-0" : "translate-x-full"}
          `}
        >
          {/* Close button */}
          <button
            onClick={closeCart}
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
                    <CartLine closeCart={closeCart} />
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
                {/* <CartCheckoutButton
                  className="w-full mt-4 bg-primary text-secondary font-bold py-3 rounded hover:bg-primary/90 transition"
                  disabled={status === "idle" && lines.length === 0}
                >
                  Checkout
                </CartCheckoutButton> */}

                <button
                  className="w-full mt-4 bg-primary text-secondary font-bold py-3 rounded hover:bg-primary/90 transition cursor-pointer"
                  disabled={lines.length === 0}
                  onClick={() => {
                    console.log("clicked")
                    if (checkoutUrl) {
                      // Extract the cart ID from your cart URL
                      const url = new URL(checkoutUrl);
                      const cartId = url.pathname.split('/cart/c/')[1];

                      // Create clean checkout URL
                      const shopifyCheckoutUrl = `https://grublify.myshopify.com/checkouts/cn/${cartId}`;

                      // to open the link directly
                      window.location.href = shopifyCheckoutUrl; 

                      // to open the link in a new tab (this works better as it won't redirect you to grublify.com)
                      // window.open(shopifyCheckoutUrl, '_blank');
                      // console.log("shopify checkout url: ", shopifyCheckoutUrl)
                    }
                    else {
                      console.log("no checkout url")
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