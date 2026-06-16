/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  images: {
    domains: ["images.unsplash.com", "media-assets.swiggy.com"],
  },
  async headers() {
    return [
      {
        source: "/api/rooms/:code/events",
        headers: [
          { key: "X-Accel-Buffering",       value: "no"                          },
          { key: "Cache-Control",            value: "no-cache, no-store, no-transform" },
          { key: "Content-Type",             value: "text/event-stream; charset=utf-8" },
        ],
      },
    ];
  },
};

export default nextConfig;
