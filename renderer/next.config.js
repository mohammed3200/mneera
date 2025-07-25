/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export", // Uncommented and required for Electron
  // eslint-disable-next-line no-undef
  distDir: process.env.NODE_ENV === "production" ? "../app" : ".next",
  trailingSlash: true,
  images: {
    // Keep unoptimized if you need to export some static images
    unoptimized: true,
  },
  experimental: {
    // REMOVE THIS LINE - serverActions are enabled by default
    // serverActions: true,
    serverComponentsExternalPackages: ["better-sqlite3"],
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals = [...config.externals, "better-sqlite3"];
      config.resolve.fallback = {
        fs: false,
        path: false,
        net: false,
        tls: false,
        electron: false
      };
    }
    return config;
  },
};

// eslint-disable-next-line no-undef
module.exports = nextConfig;
