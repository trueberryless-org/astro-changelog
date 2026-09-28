const ASTRO_RELEASE_TAG_RE = /^astro@(\d+\.\d+\.\d+(?:-[\w.]+)?)$/;
const MINOR_RELEASE_VERSION_RE = /^(\d+\.\d+)\.0$/;

export function getAstroReleaseVersion(tagName: string) {
  return ASTRO_RELEASE_TAG_RE.exec(tagName)?.[1];
}

export function getMinorReleaseVersion(version: string) {
  return MINOR_RELEASE_VERSION_RE.exec(version)?.[1];
}
