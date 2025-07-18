"use client";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";

const customBlocks = {
  heading: ({ children, level }) => {
    const HeadingTag = `h${level}`;
    const classes = {
      1: "text-3xl font-semibold",
      2: "text-2xl font-semibold",
      3: "text-xl font-semibold",
    };
    return <HeadingTag className={classes[level] || "text-xl font-bold"}>{children}</HeadingTag>;
  },
  paragraph: ({ children }) => (
    <p className="text-base leading-relaxed">{children}</p>
  ),
  list: ({ children, format }) =>
    format === "ordered"
      ? <ol className="list-decimal ml-6">{children}</ol>
      : <ul className="list-disc ml-6">{children}</ul>,
};

export default function PolicyBlocksRenderer({ content }) {
  return <BlocksRenderer content={content} blocks={customBlocks} />;
} 