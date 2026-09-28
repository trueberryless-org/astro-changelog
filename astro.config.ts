import { satteri } from "@astrojs/markdown-satteri";
import expressiveCode from "astro-expressive-code";
import { defineConfig, fontProviders } from "astro/config";

import { satteriReleaseHeadings } from "./src/libs/satteri";

export default defineConfig({
  fonts: [
    {
      cssVariable: "--font-lato",
      fallbacks: ["sans-serif"],
      name: "Lato",
      provider: fontProviders.google(),
      subsets: ["latin"],
      weights: [400, 700],
    },
    {
      cssVariable: "--font-source-code-pro",
      fallbacks: ["monospace"],
      name: "Source Code Pro",
      provider: fontProviders.google(),
      subsets: ["latin"],
      weights: [400],
    },
  ],
  image: {
    domains: ["release-image-generator.netlify.app"],
  },
  integrations: [expressiveCode()],
  markdown: {
    processor: satteri({ hastPlugins: [satteriReleaseHeadings()] }),
  },
  site: "https://astro-changelog.netlify.app",
});
