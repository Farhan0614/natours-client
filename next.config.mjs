/** @type {import('next').NextConfig} */

// Build the images.remotePatterns entry from the API URL at build time,
// so next/image can optimize backend-hosted images (no more `unoptimized`).
const remotePatterns = [];
try {
  const { protocol, hostname, port } = new URL(
    process.env.NEXT_PUBLIC_API_URL || "",
  );
  remotePatterns.push({
    protocol: protocol.replace(":", ""),
    hostname,
    ...(port ? { port } : {}),
  });
} catch {
  // Fallback for local development when NEXT_PUBLIC_API_URL is not set yet
  remotePatterns.push({
    protocol: "http",
    hostname: "localhost",
    port: "3000",
  });
}

const nextConfig = {
  images: {
    remotePatterns,
  },
};

export default nextConfig;
