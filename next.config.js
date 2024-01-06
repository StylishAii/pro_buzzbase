/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: `${process.env.NEXT_PUBLIC_IMAGE_PROTOCOL}`,
        hostname: `${process.env.NEXT_PUBLIC_IMAGE_HOSTNAME}`,
        port: `${process.env.NEXT_PUBLIC_IMAGE_PORT}`,
        pathname: `${process.env.NEXT_PUBLIC_IMAGE_PATHNAME}`,
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          {
            key: "Access-Control-Allow-Origin",
            value: process.env.NEXT_PUBLIC_BACKEND_URL,
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,OPTIONS,PATCH,DELETE,POST,PUT",
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
