import BlogListItem from "../../components/blogs/blog-list-item";
import NotFound from "../not-found";
import { fetchBlogs } from "@/lib/strapi-client";

export default async function Blogs() {
  const blogs = await fetchBlogs();
  
  if (!blogs) return <NotFound />;

  return (
    <div className="flex-1">
      {/* Hero Section */}
      <section className="relative py-20 px-6 bg-secondary text-center flex items-center justify-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-4">Welcome to Our Blog!</h1>
          <p className="text-lg text-primary/80 font-semibold">
            Discover the latest updates, tips, and stories from our team.
          </p>
        </div>
      </section>
      {/* Blog Posts Section */}
      <section className="py-10 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-secondary">Latest Posts</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog) => (
              <BlogListItem
                key={blog.id}
                blog={blog}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
