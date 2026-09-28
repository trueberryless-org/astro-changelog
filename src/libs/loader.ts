import type { Loader, LoaderContext } from "astro/loaders";
import { z } from "astro/zod";

import { type GitHubRelease, fetchGitHubReleases } from "./github";
import { getAstroReleaseVersion } from "./version";

const releaseSchema = z.object({
  createdAt: z.coerce.date(),
  name: z.string(),
  nodeId: z.string(),
  publishedAt: z.coerce.date().optional(),
  url: z.url(),
});

export function astroReleasesLoader() {
  return {
    name: "astro-releases",
    async load(context) {
      const token = import.meta.env.GITHUB_TOKEN;
      if (!token) {
        context.logger.warn(
          "No `GITHUB_TOKEN` environment variable set. Only releases among the latest 1000 GitHub releases of `withastro/astro` will be loaded."
        );
      }

      const githubReleases = await fetchGitHubReleases(token);

      await storeAstroReleases(githubReleases, context);
    },
    schema: releaseSchema,
  } satisfies Loader;
}

async function storeAstroReleases(
  githubReleases: GitHubRelease[],
  context: LoaderContext
) {
  const { generateDigest, parseData, renderMarkdown, store } = context;
  const versions = new Set<string>();

  for (const githubRelease of githubReleases) {
    const version = getAstroReleaseVersion(githubRelease.tag_name);
    if (!version) continue;

    versions.add(version);

    const body = githubRelease.body ?? "";
    const data = await parseData({
      data: githubReleaseToData(githubRelease),
      id: version,
    });
    const digest = generateDigest({ body, data });
    if (store.get(version)?.digest === digest) continue;

    store.set({
      body,
      data,
      digest,
      id: version,
      rendered: await renderMarkdown(body),
    });
  }

  for (const id of store.keys()) {
    if (!versions.has(id)) store.delete(id);
  }
}

function githubReleaseToData(
  githubRelease: GitHubRelease
): z.input<typeof releaseSchema> {
  return {
    createdAt: githubRelease.created_at,
    name: githubRelease.name ?? githubRelease.tag_name,
    nodeId: githubRelease.node_id,
    publishedAt: githubRelease.published_at ?? undefined,
    url: githubRelease.html_url,
  };
}
