import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function Loading() {
  return (
    <div className="min-h-screen p-4 sm:p-8">
      <div className="container mx-auto max-w-6xl">
        <main className="w-full lg:w-1/2 lg:mx-auto pt-4 lg:pt-6 space-y-6">
          <div className="flex flex-col gap-1">
            <h3 className="text-lg font-bold text-secondary/80">
              <Skeleton width={64} />
            </h3>
            <h2 className="text-6xl lg:text-6xl font-bold text-primary">
              <Skeleton width={350} height={60} />
            </h2>
          </div>
          <Skeleton height={400} width={400} className="rounded-2xl" />
          <Skeleton className="mt-6" height={200} width="100%" borderRadius={8} />
        </main>

      </div>
    </div>
  );
}
