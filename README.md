# Astro Changelog

View all releases of the [`astro`](https://github.com/withastro/astro) package on this beautiful website: [astro-changelog.netlify.app](https://astro-changelog.netlify.app)

Releases of every other package published from the Astro repository, like adapters and integrations, are available on their own [package pages](https://astro-changelog.netlify.app/packages/). All release notes can be searched with the full-text search powered by [Pagefind](https://pagefind.app).

[![Netlify Status](https://api.netlify.com/api/v1/badges/c2a53124-582a-4ee8-8434-d47f93fdebe5/deploy-status)](https://app.netlify.com/projects/astro-changelog/deploys)

## Development

Releases are loaded from the GitHub API at build time. Set a `GITHUB_TOKEN` environment variable to load the complete release history, as unauthenticated requests are limited to the latest 1000 releases of the `withastro/astro` repository.

```sh
pnpm install
pnpm dev
```

The search index is generated at build time, so search is only available after running `pnpm build` and `pnpm preview`.

## License

Licensed under the MIT License, Copyright © trueberryless.

See [LICENSE](https://github.com/trueberryless-org/astro-changelog/blob/main/LICENSE) for more information.
