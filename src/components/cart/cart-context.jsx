// CartUIContext.js
"use client";
import { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export function CartUIProvider({ children }) {
  const [isCartOpen, setIsCartOpen] = useState(false);
  return (
    <CartContext.Provider value={{ isCartOpen, setIsCartOpen }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCartUI() {
  return useContext(CartContext);
}
