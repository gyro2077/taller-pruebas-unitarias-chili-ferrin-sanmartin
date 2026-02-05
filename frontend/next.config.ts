import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/socios/:path*',
        destination: 'http://localhost:8080/api/socios/:path*',
      },
      {
        source: '/cuentas/:path*',
        destination: 'http://localhost:3000/cuentas/:path*',
      },
    ];
  },
};

export default nextConfig;
