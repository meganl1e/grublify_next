
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
  keywords: "homemade dog food, dog food recipes, dog nutrition, pet health, healthy dog food, vet-approved dog food",
  authors: [{ name: "Grublify Team" }],
  creator: "Grublify",
  publisher: "Grublify",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://grublify.com"),
  alternates: {
    canonical: "https://grublify.com",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://grublify.com",
    title: "Grublify | Homemade Dog Food Recipes & Nutrition Packs",
    description: "Discover healthy, homemade dog food recipes and nutrition packs at Grublify. Make balanced, simple meals for your dog: easy, nutritious, and vet-approved.",
    siteName: "Grublify",
    images: [
      {
        url: "/grublify_logo.png",
        width: 1200,
        height: 630,
        alt: "Grublify - Homemade Dog Food Recipes & Nutrition Packs",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Grublify | Homemade Dog Food Recipes & Nutrition Packs",
    description: "Discover healthy, homemade dog food recipes and nutrition packs at Grublify.",
    images: ["/grublify_logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code", // Add your Google Search Console verification code
  },
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
         
         {/* Microsoft Advertising UET Tag */}
         <Script id="microsoft-uet-tag" strategy="afterInteractive">
           {`
             (function(w,d,t,r,u)
             {
               var f,n,i;
               w[u]=w[u]||[],f=function()
               {
                 var o={ti:"187208323", enableAutoSpaTracking: true};
                 o.q=w[u],w[u]=new UET(o),w[u].push("pageLoad")
               },
               n=d.createElement(t),n.src=r,n.async=1,n.onload=n.onreadystatechange=function()
               {
                 var s=this.readyState;
                 s&&s!=="loaded"&&s!=="complete"||(f(),n.onload=n.onreadystatechange=null)
               },
               i=d.getElementsByTagName(t)[0],i.parentNode.insertBefore(n,i)
             })
             (window,document,"script","//bat.bing.com/bat.js","uetq");
           `}
         </Script>
         
         {/* Microsoft UET Consent Mode - Default Denied */}
         <Script id="microsoft-uet-consent" strategy="afterInteractive">
           {`
             window.uetq=window.uetq||[];
             window.uetq.push('consent', 'default', {
               'ad_storage': 'denied'
             });
           `}
         </Script>
       </head>
      {/* <GoogleTagManager gtmId="GTM-W7GD9KBX" /> */}

      <body suppressHydrationWarning={true}>
        <TrackPageView />


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
