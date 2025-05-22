import { Link } from "react-router-dom"; // Updated import

const BlogListItem = ({ blog }) => {
  return (
    <Link to={`/blogs/${blog.slug}`} className="flex-1">
      <div className="p-4 border rounded-lg shadow-sm flex flex-col gap-4 bg-white">
        <img
          src={blog.coverImage.formats.medium.url}
          alt={blog.title}
          className="w-full h-40 object-cover rounded-md"
        />
        <div>
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

          <h3 className="text-secondary text-xl font-semibold">{blog.title}</h3>
          <p className="text-gray-600">{blog.excerpt}</p>
        </div>
      </div>
    </Link>
  );
};

export default BlogListItem;
