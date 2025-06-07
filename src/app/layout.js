
import "./globals.css";
import Navbar from "../components/layout/navbar.jsx";
import Footer from "../components/layout/footer.jsx";
import Providers from "./providers";
import { SkeletonTheme } from "react-loading-skeleton";


export const metadata = {
  title: "Grublify | Homemade Dog Food Recipes & Nutrition Packs",
  description: "Discover healthy, homemade dog food recipes and nutrition packs at Grublify. Make balanced, simple meals for your dog — easy, nutritious, and vet-approved.",
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
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
            </div>
          </SkeletonTheme>
        </Providers>
      </body>
    </html>
  );
}
