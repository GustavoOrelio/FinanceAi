/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "2mb",
    },
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Request-Timeout",
            value: "60",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
