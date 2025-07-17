import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const BlogListItemSkeleton = () => (
  <div className="p-4 border rounded-lg shadow-sm flex flex-col gap-4 bg-white">
    <Skeleton height={160} className="w-full rounded-md" />
    <div>
      <div className="flex flex-wrap gap-2 mb-2">
        <Skeleton width={80} height={24} className="rounded-full" />
        <Skeleton width={80} height={24} className="rounded-full" />      </div>
      <Skeleton height={24} width="60%" />
      <Skeleton height={16} width="80%" />
    </div>
  </div>
);

export default function BlogsLoading() {
  return (
    <div className="flex-1"> {/* Hero Section */}
      <section className="relative py-20 px-6 bg-secondary text-center flex items-center justify-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-4">Welcome to Our Blog!</h1>
          <p className="text-lg text-primary/80 font-bold">
            Discover the latest updates, tips, and stories from our team.
          </p>
        </div>
      </section>
      {/* Loading Section */}
      <section className="py-10 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-secondary">Latest Posts</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <BlogListItemSkeleton />
            <BlogListItemSkeleton />
            <BlogListItemSkeleton />
          </div>
        </div>
      </section>
    </div>
  );
} 