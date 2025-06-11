"ues client";
import React, { useState, useEffect } from "react";
import { CiShoppingCart } from "react-icons/ci";
import { useCart } from "@shopify/hydrogen-react";

export default function CartModal() {

  const { lines, totalQuantity, cost, status } = useCart();
  const itemCount = lines?.reduce((sum, line) => sum + line.quantity, 0) || 0;
  const [isOpen, setIsOpen] = useState(false);

  // Open and close handlers
  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  // Optional: Close modal when clicking the backdrop
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) closeCart();
  };

  console.log("shoppping cart:", lines)



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
            className="absolute right-6 text-2xl text-secondary"
            aria-label="Close cart"
          >
            &times;
          </button>
          {/* Modal Header */}
          <h2 className="mb-6 text-xl font-semibold text-secondary">My Cart</h2>
          {/* Modal Content */}
          {lines.length > 0 ? (
            <ul>
              {lines.map((line) => (
                <li key={line.id}>
                  {line.merchandise.product.title} — {line.merchandise.selectedOptions[0].value} - {line.quantity}
                </li>
              ))}
            </ul>
          ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-gray-400">
            Your cart is empty.
          </div>
      )}

        </div>
      </div>
    </>
  );
}