/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  output: 'standalone',
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  publicRuntimeConfig: {
    processEnv: Object.fromEntries(
      Object.entries(process.env).filter(([key]) =>
        key.includes('NEXT_PUBLIC_')
      )
    ),
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "100mb"
    }
  }
};
export default nextConfig;
