import logo from "../../public/grublify_logo_simple.png";


export default function Footer() {
  return (
    <nav className="py-4 px-6 bg-secondary border-t border-white/20">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <a className="flex items-center space-x-2">
          <img src={logo.src} alt="Grublify Logo" className="h-8 w-auto mr-2" />
        </a>
        <div className="text-sm text-primary">
          © 2025 Grublify Inc. All rights reserved.
        </div>
      </div>
    </nav>
  );
}