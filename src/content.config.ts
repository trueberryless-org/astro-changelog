import { defineCollection } from "astro:content";

import { astroReleasesLoader } from "./libs/loader";

const releases = defineCollection({
  loader: astroReleasesLoader(),
});

export const collections = { releases };
