import createMDX from '@next/mdx'

// Import OpenNext for development
if (process.env.NODE_ENV === "development") {
  const { initOpenNextCloudflareForDev } = await import("@opennextjs/cloudflare/cloudflare-context");
  await initOpenNextCloudflareForDev();
}
 
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure `pageExtensions` to include markdown and MDX files
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  // Optionally, add any other Next.js config below
}
 
const withMDX = createMDX({
  // Add markdown plugins here, as desired
})
 
// Merge MDX config with Next.js config
export default withMDX(nextConfig)