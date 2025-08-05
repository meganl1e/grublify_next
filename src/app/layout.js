
import "./globals.css";
import Navbar from "../components/layout/navbar.jsx";
import Footer from "../components/layout/footer.jsx";
import Providers from "./providers";
import { SkeletonTheme } from "react-loading-skeleton";
import { Inter } from "next/font/google"
import PopupController from "@/components/popups/popup-controller";
import HeadlineTicker from "@/components/layout/headline-ticker";

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
      <body suppressHydrationWarning={true}>
        <Providers>
          <SkeletonTheme
            baseColor="rgba(120,130,140,0.18)"
            highlightColor="rgba(255,255,255,0.28)"
          >
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-1">
                {children}
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
