import { type CollectionEntry, getCollection } from "astro:content";

import { getMinorReleaseVersion } from "./version";

const RELEASE_IMAGE_HEIGHT = 640;
const RELEASE_IMAGE_WIDTH = 1650;

export async function getReleases() {
  const releases = await getCollection("releases");

  return releases.toSorted(
    (a, b) => getReleaseDate(b).getTime() - getReleaseDate(a).getTime()
  );
}

export function getReleaseDate(release: Release) {
  return release.data.publishedAt ?? release.data.createdAt;
}

export function getReleaseDescription(release: Release) {
  return `Release notes for ${release.data.name}.`;
}

export function getReleaseImage(release: Release) {
  const minorVersion = getMinorReleaseVersion(release.id);
  if (!minorVersion) return;

  const url = new URL(
    "https://release-image-generator.netlify.app/api/generateImage"
  );
  url.searchParams.set("width", String(RELEASE_IMAGE_WIDTH));
  url.searchParams.set("height", String(RELEASE_IMAGE_HEIGHT));
  url.searchParams.set("text", minorVersion);

  return {
    alt: `Astro ${minorVersion}`,
    height: RELEASE_IMAGE_HEIGHT,
    src: url.href,
    width: RELEASE_IMAGE_WIDTH,
  };
}

export function getReleasePath(release: Release) {
  return `/releases/${release.id}/`;
}

export function getReleaseStaticPaths(releases: Release[]) {
  return releases.flatMap((release) => [
    { params: { id: release.id }, props: { redirect: undefined, release } },
    {
      params: { id: release.data.nodeId },
      props: { redirect: getReleasePath(release), release },
    },
  ]);
}

export type Release = CollectionEntry<"releases">;
