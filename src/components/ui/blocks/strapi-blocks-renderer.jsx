"use client";
import { BlocksRenderer } from '@strapi/blocks-react-renderer';

const customBlocks = {
  heading: ({ children, level }) => {
    const HeadingTag = `h${level}`;
    // Example: Tailwind classes for different heading levels
    const classes = {
      1: "text-4xl font-semibold mt-8 mb-4",
      2: "text-3xl font-semibold mt-6 mb-4",
      3: "text-2xl font-semibold mt-4 mb-4",
    };
    return <HeadingTag className={classes[level] || "text-xl font-bold mt-6 mb-4"}>{children}</HeadingTag>; // Adjusted spacing
  },
  paragraph: ({ children }) => (
    <p className="leading-relaxed text-lg">{children}</p> // Added margin-bottom for spacing
  ),
  list: ({ children, format }) =>
    format === "ordered" ? (
      <ol className="list-decimal ml-6 text-lg ">{children}</ol>
    ) : (
      <ul className="list-disc ml-6 text-lg" >{children}</ul>
    ),
  // Add more overrides as needed (quote, code, image, etc.)
};

export default function StrapiBlocksRenderer({ content }) {
  return <BlocksRenderer content={content} blocks={customBlocks} />;
}