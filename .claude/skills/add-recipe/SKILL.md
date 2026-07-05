---
name: add-recipe
description: Use when adding one or more new recipes to Scott's Cookbook (creating src/content/recipes/*.md files). Covers the required frontmatter format and validates the result before finishing.
---

# Adding a recipe

Recipes are Markdown files with YAML frontmatter in `src/content/recipes/`. The
full field-by-field spec, allowed `topic` values, ingredient object schema, and
a minimal example all live in [reference/recipe-spec.md](../../../reference/recipe-spec.md) —
read it before writing frontmatter, especially if this is early in the
conversation.

## Steps

1. **Filename**: PascalCase, no spaces, matching the recipe name (e.g.
   `SplitPeaSoupWithoutPork.md`). The filename becomes the page slug verbatim
   (`/recipes/SplitPeaSoupWithoutPork/`) — there is no kebab-case or
   lowercasing transform, so get the casing right the first time.
2. **Write the frontmatter** following `reference/recipe-spec.md`. Common
   mistakes to avoid (these are exactly what the validator below catches):
   - Every `preparation: "..."` (and every other field) inside a multi-line
     flow-mapping `{ ... }` ingredient entry needs a trailing comma — a
     missing comma throws a hard YAML parse error that silently drops the
     *entire recipe* from the site with no visible error to the user.
   - Use `cookingTime`, not `cookTime`.
   - `amount` is always a number (`0.5`, not `"1/2"`).
   - `topic` must be one of the allowed values in the spec, or `""`.
   - Every ingredient needs `name`, `amount`, and `unit` — a missing `unit` is
     a common oversight on "to taste" or last-minute-added ingredients.
3. **Add the image** to `src/images/recipe/RecipeName.png` (or `.jpg`) and
   reference it as `image: "../../images/recipe/RecipeName.png"`.
4. **Validate before finishing.** Run the same validation logic the test
   suite uses, scoped to just the new file(s) so output is easy to read:

   ```bash
   npm run validate:recipes -- src/content/recipes/RecipeName.md
   ```

   This parses the frontmatter with the same YAML engine Gatsby uses and
   checks it against the schema in `src/utils/recipeValidation.ts` — the
   exact logic that also runs under `npm test` (in
   `src/utils/__tests__/recipeValidation.test.ts`), so a clean result here
   means the recipe won't show up as a newly-failing test either.

   If it reports problems, fix them and re-run until it prints `OK`. Don't
   report the task done with known validation failures outstanding.
