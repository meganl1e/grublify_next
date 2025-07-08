export default function Card({ children, className = "" }) {
  return (
    <div className={`bg-white border border-gray-200 rounded-lg shadow p-6 mb-4 ${className}`}>
      {children}
    </div>
  );
} 