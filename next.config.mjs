/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    domains: ["shiftvitto.s3.amazonaws.com"],
  },
  // rewrites: () => {
  //   return [
  //     {
  //       source: "/api/:path*",
  //       destination:
  //         "http://ec2-54-164-115-34.compute-1.amazonaws.com:3000/api/:path*",
  //     },
  //   ];
  // },
};

export default nextConfig;
