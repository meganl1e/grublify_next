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
      {
        protocol: 'https',
        hostname: 'proud-whisper-861c52bc8d.media.strapiapp.com',
        port: '',
        pathname: '/**',
      },
    ],
    // Optimize image caching and processing
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
    dangerouslyAllowSVG: false,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
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
