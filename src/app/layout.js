
import "./globals.css";
import Navbar from "../components/navbar.jsx";
import Footer from "../components/footer.jsx";


export const metadata = {
  title: "Grublify",
  description: "Easy, nutritious, homemade dog food recipes and nutrition packs. Create balanced meals for your pup - healthy, simple, and complete",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body      >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
