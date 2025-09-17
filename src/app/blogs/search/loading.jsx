export default function SearchLoading() {
  return (
    <div className="flex-1 flex items-center justify-center py-20">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-gray-600">Searching...</p>
      </div>
    </div>
  );
}
