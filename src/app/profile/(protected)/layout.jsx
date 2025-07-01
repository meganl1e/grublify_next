import { getCurrentUser } from '@/lib/auth-actions';
import LoginOrSignupButton from '@/components/ui/LoginOrSignupButton';
import SidebarNav from './SidebarNav';

const navItems = [
  { href: "/profile", label: "Profile" },
  { href: "/profile/orders", label: "Orders" },
  { href: "/profile/settings", label: "Settings" },
];

export default async function ProtectedProfileLayout({ children }) {
  const user = await getCurrentUser();
  // const login = useShopifyLogin();

  if (!user || user.error) {
    return (
      <div className="max-w-xl mx-auto mt-20 text-center">
        <h1 className="text-2xl text-secondary font-bold mb-4">Sign in to your account</h1>
        <p className="text-gray-600 mb-6">You must be signed in to view your account dashboard.</p>
        <LoginOrSignupButton />
      </div>
    );
  }

  // Sidebar layout (only shown if user is logged in)
  return (
    <div className="flex max-w-4xl mx-auto mt-10 min-h-[60vh]">
      <SidebarNav />
      <main className="flex-1 pl-8">{children}</main>
    </div>
  );
}
