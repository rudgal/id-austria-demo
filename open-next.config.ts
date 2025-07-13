// default open-next.config.ts file created by @opennextjs/cloudflare
import { defineCloudflareConfig } from "@opennextjs/cloudflare/config";
// import r2IncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/r2-incremental-cache";

export default defineCloudflareConfig({
	// Disable R2 incremental cache for local preview
	// Uncomment the following lines when you have an R2 bucket configured
	// incrementalCache: r2IncrementalCache,
});
