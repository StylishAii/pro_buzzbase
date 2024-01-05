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
};

module.exports = nextConfig;
