import React from "react";
import { CiLogout, CiUser, CiSettings, CiShoppingCart, CiCircleQuestion } from "react-icons/ci";




export default function ProfileDropdown({ user }) {
  const handleLogout = async () => {
    await fetch('/api/auth/set-return-to', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ return_to: window.location.pathname + window.location.search }),
    });
    window.location.href = '/api/auth/logout';
  };

  return (
    <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
      <div className="px-4 py-3 border-b border-gray-100">
        <div className="text-xs text-gray-500 mb-1">Signed in as</div>
        <div className="font-semibold text-gray-800 truncate">{user.emailAddress.emailAddress}</div>
      </div>
      <div className="py-2">
        <a
          href="/profile"
          className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 transition rounded"
        >
          <CiUser className="w-5 h-5 mr-2" />
          Profile
        </a>
        <a
          href="/orders"
          className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 transition rounded"
        >
          <CiShoppingCart className="w-5 h-5 mr-2" />
          Orders
        </a>
        <a
          href="/support"
          className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 transition rounded"
        >
          <CiCircleQuestion className="w-5 h-5 mr-2" />
          Support
        </a>
      </div>
      <div className="border-t border-gray-100">
        <button
          onClick={handleLogout}
          className="flex items-center w-full px-4 py-2 text-red-600 hover:bg-red-50 transition rounded-b"
        >
          <CiLogout className="w-5 h-5 mr-2" />
          Logout
        </button>
      </div>
    </div>
  );
} 