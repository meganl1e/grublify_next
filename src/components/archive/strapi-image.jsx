"use client"
import React from "react";
import Image from "next/image";

const StrapiImage = ({ image, className = "", sizes = "100vw", alt, width, height, priority = false }) => {
  if (!image) return null;

  const { url, alternativeText, formats } = image;

  const getUrl = (imgUrl) =>
    imgUrl?.startsWith("http") ? imgUrl : `${import.meta.env.VITE_STRAPI_URL}${imgUrl}`;

  const altText = alt || alternativeText || "";
  
  // Use the best available format, preferring medium for better optimization
  const src =
    (formats?.medium && getUrl(formats.medium.url)) ||
    (formats?.small && getUrl(formats.small.url)) ||
    (url && getUrl(url));

  // If width and height are provided, use them; otherwise use fill
  if (width && height) {
    return (
      <Image
        src={src}
        alt={altText}
        width={width}
        height={height}
        className={className}
        sizes={sizes}
        priority={priority}
        loading={priority ? "eager" : "lazy"}
      />
    );
  }

  return (
    <div className="relative" style={{ width: "100%", height: "auto" }}>
      <Image
        src={src}
        alt={altText}
        fill
        className={className}
        sizes={sizes}
        priority={priority}
        loading={priority ? "eager" : "lazy"}
        style={{ objectFit: "contain" }}
      />
    </div>
  );
};

export default StrapiImage;
