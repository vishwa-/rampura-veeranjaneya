/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: "/book",
        destination: "/sevas#book",
        permanent: true,
      },
      {
        source: "/book.html",
        destination: "/sevas#book",
        permanent: true,
      },
      {
        source: "/:path*.html",
        destination: "/:path*",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/admin",
        headers: [
          { key: "X-Robots-Tag", value: "noindex, nofollow" }
        ]
      },
      {
        source: "/api/(.*)",
        headers: [
          { key: "Cache-Control", value: "no-store" }
        ]
      }
    ];
  }
};

export default nextConfig;
