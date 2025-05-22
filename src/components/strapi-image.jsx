import React, { useState } from "react";

const StrapiImage = ({ image, className = "", sizes = "100vw", alt, width, height }) => {
  if (!image) return null;

  const { url, alternativeText, formats } = image;
  const [imgLoading, setImgLoading] = useState(true);

  const getUrl = (imgUrl) =>
    imgUrl?.startsWith("http") ? imgUrl : `${import.meta.env.VITE_STRAPI_URL}${imgUrl}`;

  const srcSet = [
    formats?.small?.url && `${getUrl(formats.small.url)} 500w`,
    formats?.medium?.url && `${getUrl(formats.medium.url)} 750w`,
    formats?.large?.url && `${getUrl(formats.large.url)} 1000w`,
    url && `${getUrl(url)} 1800w`,
  ].filter(Boolean).join(", ");

  const altText = alt || alternativeText || "";
  const src =
    (formats?.medium && getUrl(formats.medium.url)) ||
    (formats?.small && getUrl(formats.small.url)) ||
    (url && getUrl(url));

  return (
    <img
      src={src}
      srcSet={srcSet}
      sizes={sizes}
      alt={altText}
      className={className}
      width={width}
      height={height}
      loading="eager" // or "lazy" if you want
      style={{ display: "block", width: "100%", height: "auto" }}
      onLoad={() => setImgLoading(false)}
    />
  );
};

export default StrapiImage;
