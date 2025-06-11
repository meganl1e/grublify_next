/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    useCache: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.shopify.com',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/sitemap.xml',
        destination: "https://proud-whisper-861c52bc8d.strapiapp.com/api/strapi-5-sitemap-plugin/sitemap.xml",
      },
    ];
  },
};

export default nextConfig;
