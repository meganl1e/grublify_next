
import "./globals.css";
import Navbar from "../components/navbar.jsx";
import Footer from "../components/footer.jsx";
import Providers from "./providers";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";


export const metadata = {
  title: "Grublify",
  description: "Easy, nutritious, homemade dog food recipes and nutrition packs. Create balanced meals for your pup - healthy, simple, and complete",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
        </Providers>
      </body>
    </html>
  );
}
