import Link from "next/link";

const BlogListItem = ({ blog }) => {
  return (
    <Link href={`/blogs/${blog.slug}`} className="flex-1 h-full">
      <div className="p-4 border rounded-lg shadow-sm flex flex-col gap-4 bg-white h-full">
        <img
          src={blog.coverImage.formats.medium.url}
          alt={blog.title}
          className="w-full h-40 object-cover rounded-md"
        />
        <div className="flex flex-col gap-1">
          <div className="flex flex-wrap gap-2 mb-2">
            {blog.categories.map((category, index) => (
              <span
                key={index}
                className="inline-block bg-primary/10 text-primary font-bold border-2 border-primary shadow-md text-sm px-3 py-1 rounded-full"
              >
                {category.name}
              </span>
            ))}
          </div>
          {/* published date */}
          <div className="text-sm text-gray-400"> {/* Increased margin-bottom */}
            Grublify • {" "}
            <time dateTime={blog.publishedDate}>
              {new Date(blog.publishedDate).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          </div>

          <h3 className="text-secondary text-xl font-semibold">{blog.title}</h3>
        </div>
      </div>
    </Link>
  );
};

export default BlogListItem;
