"use client";
import { useShopifyLogin } from "@/hooks/useShopifyLogin";

export default function LoginOrSignupButton() {
  const login = useShopifyLogin();

  return (
    <button
      onClick={login}
      className="mt-6 px-6 py-2 bg-primary text-white rounded shadow transition
        hover:bg-primary-dark hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary/60 active:scale-95 active:bg-primary/90"
      style={{ fontWeight: 600, letterSpacing: 0.5 }}
    >
      Log In or Sign Up
    </button>
  );
}