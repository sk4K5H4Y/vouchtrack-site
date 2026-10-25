// VouchTrack site. Static output that mirrors the old file layout exactly:
// src/pages/pricing.astro -> dist/pricing.html, features/index.astro -> dist/features/index.html.
// Vercel's cleanUrls (vercel.json) keeps serving /pricing, /features and so on.
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://www.vouchtrack.com",
  output: "static",
  trailingSlash: "ignore",
  build: { format: "preserve", inlineStylesheets: "never" },
  compressHTML: false,
  devToolbar: { enabled: false },
});
