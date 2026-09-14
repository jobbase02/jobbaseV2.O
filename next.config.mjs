/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // ── Image Optimization ─────────────────────────────────────────────────────
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        pathname: '/images/**',
      },
      {
        protocol: 'https',
        hostname: '*.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
    ],
    formats: ['image/avif', 'image/webp'], // Modern image formats
    minimumCacheTTL: 86400,                // Cache optimized images for 24h
  },

  // ── HTTP Security Headers ─────────────────────────────────────────────────
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          // Prevent clickjacking
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          // Prevent MIME sniffing
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          // Control referrer info
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          // Disable browser features not used by this app
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
          },
          // XSS protection for older browsers
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          // Force HTTPS (HSTS) — uncomment when on production HTTPS
          // { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
        ],
      },
      // Cache static assets aggressively
      {
        source: '/_next/static/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      // Cache public images
      {
        source: '/images/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=86400, stale-while-revalidate=604800' },
        ],
      },
    ];
  },

  // ── Compression ───────────────────────────────────────────────────────────
  compress: true,

  // ── Compiler ──────────────────────────────────────────────────────────────
  compiler: {
    styledComponents: true,
  },
  
  transpilePackages: ['sanity', 'next-sanity', 'styled-components'],

  // ── Production optimizations ──────────────────────────────────────────────
  // Removed optimizePackageImports for lucide-react as it causes Webpack undefined 'call' errors

  // ── URL Masking ───────────────────────────────────────────────────────────
  async rewrites() {
    return [
      {
        source: '/files/:path*',
        destination: `${process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://nefoypxmwvrcxcqdkjij.supabase.co'}/storage/v1/object/public/:path*`,
      },
    ];
  },
};

export default nextConfig;
