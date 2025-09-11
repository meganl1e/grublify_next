import logo from "../../../public/grublify_logo_simple.png";
import Link from "next/link";


// export default function Footer() {
//   return (
//     <nav className="py-4 px-6 bg-secondary border-t border-white/20">
//       <div className="max-w-7xl mx-auto flex justify-between items-center">
//         <a className="flex items-center space-x-2">
//           <img src={logo.src} alt="Grublify Logo" className="h-8 w-auto mr-2" />
//         </a>
//         <div className="text-sm text-primary">
//           © 2025 Grublify Inc. All rights reserved.
//         </div>
//       </div>
//     </nav>
//   );
// }

export default function Footer() {
  return (
    <footer className="border-t border-white/20 bg-secondary/95">
      <div className="py-12 px-8 max-w-7xl mx-auto flex flex-col md:flex-row md:flex-wrap gap-8">
        {/* About Section */}
        <div className="min-w-[180px] flex-1">
          <a className="flex items-center space-x-2 mb-4">
            <img src={logo.src} alt="Grublify Logo" className="h-8 w-auto mr-2" />
            <span className="text-2xl font-semibold text-primary">Grublify</span>
          </a>
        </div>
        {/* Quick Links */}
        <div className="min-w-[180px] flex-1">
          <h3 className="text-lg font-semibold text-primary mb-2">QUICK LINKS</h3>
          <ul className="text-sm text-primary space-y-1">
            <li><Link href="/" className="hover:underline">Home</Link></li>
            <li><Link href="/blogs" className="hover:underline">Blogs</Link></li>
            <li><Link href="/recipes" className="hover:underline">Recipes</Link></li>
            <li><Link href="/about" className="hover:underline">About</Link></li>
            <li><Link href="/team" className="hover:underline">Team</Link></li>
            <li><Link href="/faq" className="hover:underline">FAQ</Link></li>
          </ul>
        </div>
        {/* Shop Section */}
        <div className="min-w-[180px] flex-1">
          <h3 className="text-lg font-semibold text-primary mb-2">SHOP</h3>
          <ul className="text-sm text-primary space-y-1">
            <li>
              <Link href="/products" className="hover:underline">
                All Products
              </Link>
            </li>
            <li>
              <Link href="/products/nutrition-pack-essentials" className="hover:underline">
                Nutrition Packs
              </Link>
            </li>

          </ul>
        </div>
        {/* Quick Links */}
        <div className="min-w-[180px] flex-1">
          <h3 className="text-lg font-semibold text-primary mb-2">RECIPES & TOOLS</h3>
          <ul className="text-sm text-primary space-y-1">
            <li><Link href="/recipes" className="hover:underline">All Recipes</Link></li>
            <li><Link href="/recipes/chicken-and-rice" className="hover:underline">Chicken & Rice</Link></li>
            <li><Link href="/recipes/portion-calculator" className="hover:underline">Portion Calculator</Link></li>
            <li><Link href="/recipes/transition-guide" className="hover:underline">Transition Guide</Link></li>
          </ul>
        </div>
        {/* Policies Section */}
        <div className="min-w-[180px] flex-1">
          <h3 className="text-lg font-semibold text-primary mb-2">
            <Link href="policies" className="hover:underline">POLICIES</Link>
          </h3>
          <ul className="text-sm text-primary space-y-1">
            <li><Link href="/policies/disclaimer" className="hover:underline">Disclaimer</Link></li>
            <li><Link href="/policies/privacy" className="hover:underline">Privacy Policy</Link></li>
            <li><Link href="/policies/return-and-refund-policy" className="hover:underline">Return and Refund Policy</Link></li>
            {/* <li><Link href="/policies/anti-diversion" className="hover:underline">Anti Diversion</Link></li> */}
            {/* <li><Link href="/policies/data-sale-opt-out" className="hover:underline">Data Sale Opt Out</Link></li> */}
            <li><Link href="/policies/terms-of-service" className="hover:underline">Terms of Service</Link></li>
          </ul>
        </div>
      </div>
      <div className="flex justify-center text-right p-8 text-sm text-primary border-t border-white/20 bg-secondary">
        © 2025 Grublify Inc. All rights reserved.
      </div>
    </footer>
  );
}