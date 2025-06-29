'use client'; // This makes the component run on the client

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState } from 'react';
import { CartProvider, ShopifyProvider } from '@shopify/hydrogen-react';
import { CartUIProvider } from '@/components/cart/cart-context';

export default function Providers({ children }) {
  // We use useState to ensure the QueryClient is only created once per app
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <ShopifyProvider
        storeDomain={process.env.NEXT_PUBLIC_PUBLIC_SHOPIFY_DOMAIN}
        storefrontToken={process.env.NEXT_PUBLIC_PUBLIC_STOREFRONT_API_TOKEN}
        storefrontApiVersion="2025-04"
        countryIsoCode="US"
        languageIsoCode="EN"
      // LATER, CHANGE THIS SO IT WORKS FOR EVERY COUNTRY
      >
       
        <CartProvider>
          <CartUIProvider>
            {children}
          </CartUIProvider>
        </CartProvider>
  
      </ShopifyProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
