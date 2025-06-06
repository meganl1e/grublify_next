export default function ProductDescription({ descriptionHtml, description }) {
  return (
    <div>
      {/* Description */}
      {description && (
        <div className="prose prose-gray max-w-none">
          <h3 className="text-xl font-semibold mb-2">Description</h3>
          <div
            dangerouslySetInnerHTML={{ __html: descriptionHtml || description}}
            className="text-gray-600"
          />
        </div>
      )}
    </div>
  );
}