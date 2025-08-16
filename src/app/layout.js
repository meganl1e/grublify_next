
import "./globals.css";
import Navbar from "../components/layout/navbar.jsx";
import Footer from "../components/layout/footer.jsx";
import Providers from "./providers";
import { SkeletonTheme } from "react-loading-skeleton";
import { Inter } from "next/font/google"
import PopupController from "@/components/popups/popup-controller";
import HeadlineTicker from "@/components/layout/headline-ticker";
import { Analytics } from '@vercel/analytics/next';
import Script from "next/script";
import { GoogleTagManager } from '@next/third-parties/google'
import TrackPageView from "@/components/page-view";

// const inter = Inter({
//   subsets: ["latin"], // or ["latin-ext"] if you need more
//   display: "swap",    // optional, for better performance
// });


export const metadata = {
  title: "Grublify | Homemade Dog Food Recipes & Nutrition Packs",
  description: "Discover healthy, homemade dog food recipes and nutrition packs at Grublify. Make balanced, simple meals for your dog: easy, nutritious, and vet-approved.",
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

const testMessages = [
  "Free shipping over $30",
  "20% off sitewide until Friday!",
  "New app features just launched"
];



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-17424660572"
          strategy="afterInteractive"
        />
        <Script id="google-ads-tag" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-17424660572');
          `}
        </Script> */}
      </head>
      {/* <GoogleTagManager gtmId="GTM-W7GD9KBX" /> */}

      <body suppressHydrationWarning={true}>
        <TrackPageView />

        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-17424660572"
          strategy="afterInteractive"
        />
        <Script id="google-ads-tag" strategy="afterInteractive">
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'AW-17424660572');
        `}
        </Script>
        <Providers>
          <SkeletonTheme
            baseColor="rgba(120,130,140,0.18)"
            highlightColor="rgba(255,255,255,0.28)"
          >
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-1">
                {children}
                <Analytics />
              </main>
              <Footer />
              <PopupController />
            </div>
          </SkeletonTheme>
        </Providers>
      </body>
    </html>
  );
}
