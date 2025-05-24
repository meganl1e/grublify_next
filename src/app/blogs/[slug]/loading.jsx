import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function BlogSkeleton() {
  return (
    <div className="flex-1 px-6 py-10">
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb */}
        <div className="mb-4">
          <Skeleton width={120} height={18} />
        </div>
        {/* Image */}
        <Skeleton height={300} className="w-full max-w-3xl rounded-lg mb-4" />
        {/* Title */}
        <h1 className="text-5xl font-bold mb-4 text-secondary">
          <Skeleton width={300} height={40} />
        </h1>
        {/* Date */}
        <div className="mb-4">
          <Skeleton width={160} height={18} />
        </div>
        {/* Content
        <div className="mt-6">
          <Skeleton count={6} height={20} />
        </div> */}
      </div>
    </div>
  );
}
