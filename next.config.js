/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: `${process.env.IMAGE_PUBLIC_PROTOCOL}`,
        hostname: `${process.env.IMAGE_PUBLIC_HOSTNAME}`,
        port: `${process.env.NEXT_PUBLIC_IMAGE_PORT}`,
        pathname: `${process.env.IMAGE_PUBLIC_PATHNAME}`,
      },
    ],
  },
};

module.exports = nextConfig;
