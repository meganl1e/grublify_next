import React from "react";

export default function AuthErrorModal({ error, onLogout, open = true }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full flex flex-col items-center border-t-4 border-red-600">
        <h2 className="text-lg font-bold text-red-600 mb-2">Authentication Error</h2>
        <div className="text-gray-800 text-sm mb-4 break-words text-center">
          {error ? `Auth error: ${error}` : 'An unknown authentication error occurred.'}
        </div>
        <button
          onClick={onLogout}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 text-sm font-semibold cursor-pointer"
        >
          Log Out
        </button>
      </div>
    </div>
  );
} 