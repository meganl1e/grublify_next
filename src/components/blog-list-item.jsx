import Link from "next/link";

const BlogListItem = ({ blog }) => {
  return (
    <Link href={`/blogs/${blog.slug}`} className="flex-1 h-full">
      <div className="p-4 border rounded-lg shadow-sm flex flex-col gap-4 bg-white h-full">
        <img
          src={blog.coverImage.formats.medium.url}
          alt={blog.title}
          className="w-full h-40 object-cover rounded-md flex-shrink-0"
        />
        <div className="flex-1 flex flex-col">
          <div className="flex flex-wrap gap-2 mb-2 max-h-12 overflow-hidden">
            {blog.categories.slice(0, 3).map((category, index) => (
              <span key={index} className="inline-block bg-primary/10 text-primary font-bold border-2 border-primary shadow-md text-sm px-3 py-1 rounded-full">
                {category.name}
              </span>
            ))}
            {blog.categories.length > 3 && (
              <span className="text-xs text-gray-500">+{blog.categories.length - 3} more</span>
            )}
          </div>
            {/* published date */}
            <div className="text-sm text-gray-500 "> {/* Increased margin-bottom */}
              Grublify • {" "}
              <time dateTime={blog.publishedDate}>
                {new Date(blog.publishedDate).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </time>
            </div>

          <h3 className="text-secondary text-xl font-semibold line-clamp-2 flex-1">
            {blog.title}
          </h3>
        </div>
      </div>
    </Link>
  );
};

export default BlogListItem;
