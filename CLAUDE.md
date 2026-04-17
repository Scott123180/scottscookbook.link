# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run develop    # Start dev server at http://localhost:8000 (GraphQL IDE at /___graphql)
npm run build      # Production build
npm run serve      # Serve production build locally
npm run format     # Prettier format all JS/JSX/JSON/MD files
npm run test:e2e   # Run Playwright E2E tests (auto-starts gatsby develop if not already running)
```

## Testing

After making any code changes, run the Playwright E2E test suite:

```bash
npm run test:e2e
```

The test runner will automatically start the dev server if one isn't already running. Wait for it to complete and verify all tests pass before considering a task done.

When adding a new feature or modifying existing behavior, update the relevant spec file in `e2e/` to cover the change. When adding entirely new pages or components, create a new spec file in `e2e/`. Tests live alongside the features they cover:

- `e2e/home.spec.ts` — home page, RecipeList, search, filter, sort
- `e2e/recipe.spec.ts` — recipe detail page, ingredients, cooking mode, shopping mode
- `e2e/tools.spec.ts` — Bean Converter
- `e2e/navigation.spec.ts` — nav bar, static pages, 404, mobile layout

## Architecture

**Scott's Cookbook** is a Gatsby 5 static site for a personal recipe collection. Recipes are stored as Markdown files with structured YAML frontmatter — this is the primary content source.

### Data Flow

1. Gatsby's `gatsby-source-filesystem` picks up files from `src/content/` and `src/images/`
2. `gatsby-transformer-remark` parses `.md` files; their YAML frontmatter becomes GraphQL fields
3. `gatsby-node.js` (or Gatsby's file system routing) creates a page per recipe using `src/templates/recipe.tsx`
4. The index page (`src/pages/index.tsx`) queries all recipes via GraphQL for the listing view

### Recipe Markdown Format

See [`reference/recipe-spec.md`](reference/recipe-spec.md) for the full field-by-field specification, allowed `topic` values, ingredient object schema, common `unit` values, a minimal example, and common mistakes to avoid.

### Key Source Files

- `src/pages/index.tsx` — Recipe listing with filtering/sorting
- `src/templates/recipe.tsx` — Individual recipe page with cooking mode
- `src/components/` — Shared components; notable ones:
  - `RecipeList` — Paginated card grid
  - `IngredientTable` — Renders ingredients with optional grocery shopping provider links (Amazon Fresh, Instacart, Walmart, Whole Foods)
  - `BeanConverter` — Bean dry/cooked conversion utility
  - `CookingToggle` — Enables cooking mode (triggers wake lock via `src/hooks/useWakeLock.ts`)
- `src/utils/cookies.ts` — Persists user preferences (shopping provider, etc.)

### Adding a New Recipe

1. Create `src/content/recipes/RecipeName.md` with YAML frontmatter following the format above
2. Add recipe image to `src/images/recipe/RecipeName.png` (or `.jpg`)
3. Reference the image in frontmatter as `image: "../../images/recipe/RecipeName.png"`
