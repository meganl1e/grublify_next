'use client';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
export default function TrackPageView() {
  const pathname = usePathname();
  useEffect(() => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', 'AW-17424660572', {
        page_path: pathname,
      });
    }
  }, [pathname]);
  return null; // This component has no UI
}