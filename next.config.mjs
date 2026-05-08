/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  images: {
    domains: ["images.unsplash.com", "media-assets.swiggy.com"],
  },
};

export default nextConfig;
