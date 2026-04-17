# Scott's Cookbook

A minimal, mobile-friendly recipe website built with Gatsby and React. Browse, filter, and cook from a personal collection of recipes with features like grocery shopping integration and a cooking mode that keeps your screen on.

**Live site:** [scottscookbook.link](https://scottscookbook.link)

## Local Development

```bash
npm install
npm run develop
```

Site runs at `http://localhost:8000`. GraphQL explorer at `http://localhost:8000/___graphql`.

## Adding a Recipe

1. Create `src/content/recipes/RecipeName.md` with YAML frontmatter (see any existing recipe for the format)
2. Add a recipe image to `src/images/recipe/RecipeName.png`
3. Run `npm run develop` to preview

## Build

```bash
npm run build   # production build
npm run serve   # serve the production build locally
```
