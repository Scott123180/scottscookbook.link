# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run develop    # Start dev server at http://localhost:8000 (GraphQL IDE at /___graphql)
npm run build      # Production build
npm run serve      # Serve production build locally
npm run format     # Prettier format all JS/JSX/JSON/MD files
```

There are no tests configured.

## Architecture

**Scott's Cookbook** is a Gatsby 5 static site for a personal recipe collection. Recipes are stored as Markdown files with structured YAML frontmatter — this is the primary content source.

### Data Flow

1. Gatsby's `gatsby-source-filesystem` picks up files from `src/content/` and `src/images/`
2. `gatsby-transformer-remark` parses `.md` files; their YAML frontmatter becomes GraphQL fields
3. `gatsby-node.js` (or Gatsby's file system routing) creates a page per recipe using `src/templates/recipe.tsx`
4. The index page (`src/pages/index.tsx`) queries all recipes via GraphQL for the listing view

### Recipe Markdown Format

Recipes in `src/content/recipes/` use YAML frontmatter with these key fields:
- `title`, `date`, `prepTime`, `cookingTime`, `totalTime`, `topic`, `scottRating`
- `image`: relative path to `src/images/recipe/`
- `originalLink`: source URL
- `ingredients`: array of objects with `name`, `amount`, `unit`, `preparation` (optional), `section` (optional)
- `directions`: array of strings (ordered steps)

Units in ingredients are unquoted YAML scalars (e.g., `unit: cups`, `unit: count`, `unit: tbsp`).

### Adapting a Recipe to This Format

**Filename:** PascalCase, no spaces (e.g., `SplitPeaSoupWithoutPork.md`).

**`cookingTime`:** Note the field is `cookingTime`, not `cookTime`.

**`scottRating`:** Use `0` when the recipe hasn't been rated yet.

**`topic`:** Use one of the established values: `"Soup"`, `"Salad"`, `"Main Dish"`, `"Side Dish"`, `"One-Pot"`, `"Sauce"`, `"Snack"`, `"Dessert"`, `"Fermentation"`. Leave as `""` if none fit.

**Ingredients:**
- `name` can be unquoted unless it contains special characters; quote it when it does
- `preparation` holds prep notes that follow the ingredient name (e.g., `preparation: ", diced"`) — include the leading comma and space
- `amount` is a number; use decimals for fractions (e.g., `0.5`, `0.25`)
- For "to taste" items, use `amount: 1, unit: to taste`
- Combine equivalent quantities when a recipe lists the same ingredient multiple times (e.g., two 14.5 oz cans → `amount: 29, unit: oz`)
- `unit` is an unquoted scalar; common values: `cups`, `tbsp`, `tsp`, `oz`, `lb`, `count`, `medium`, `large`, `cloves`, `pinch`, `to taste`, `stalk`

**Directions:** Split into discrete steps. Each step is a quoted string in the array.

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
