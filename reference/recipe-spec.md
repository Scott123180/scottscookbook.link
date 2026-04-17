# Recipe Markdown Specification

Recipes live in `src/content/recipes/` as Markdown files with YAML frontmatter. The body of the file (below the `---` closing fence) is optional and rarely used. All recipe data is encoded in frontmatter.

---

## Frontmatter Fields

### Top-Level Fields

| Field | Type | Required | Used by | Notes |
|---|---|---|---|---|
| `title` | string | **yes** | listing, detail | Display name of the recipe. Always quote (e.g. `title: "Miso Ramen"`). |
| `date` | string | **yes** | listing, detail | Publication date (e.g. `"March 14, 2026"`). |
| `topic` | string | **yes** | listing (filter/sort) | Category. Must be one of the allowed values below. |
| `scottRating` | integer | **yes** | listing | 1–5; use `0` when not yet rated. |
| `image` | string | **yes** | listing, detail | Relative path to image (e.g. `"../../images/recipe/RecipeName.png"`). |
| `prepTime` | string | recommended | listing, detail | Human-readable (e.g. `"20 min"`). |
| `cookingTime` | string | recommended | detail | Human-readable (e.g. `"60 min"`). **Use `cookingTime`, not `cookTime`.** |
| `totalTime` | string | recommended | listing, detail | Human-readable (e.g. `"80 min"`). |
| `originalLink` | string | optional | detail | URL of the source / inspiration recipe. |
| `ingredients` | array | **yes** | detail | See Ingredient Object below. |
| `directions` | array of strings | **yes** | detail | Ordered cooking steps. Each step is a quoted string. |

### Allowed `topic` Values

```
"Soup"
"Salad"
"Main Dish"
"Side Dish"
"One-Pot"
"Sauce"
"Snack"
"Dessert"
"Fermentation"
```

Leave as `""` if none fit.

---

## Ingredient Object

Each element in the `ingredients` array is an object with the following fields:

| Field | Type | Required | Notes |
|---|---|---|---|
| `name` | string | **yes** | Unquoted unless it contains special characters (`:`, `#`, `{`, etc.). |
| `amount` | number | **yes** | Always a number (decimal for fractions: `0.5`, `0.25`, `0.333`). |
| `unit` | string | **yes** | Unquoted scalar. See allowed values below. |
| `preparation` | string | optional | Prep note appended after the name. Include the leading comma and space: `", diced"`. |
| `section` | string | optional | Groups ingredients under a heading (e.g. `"Broth"`, `"Vegetables"`). Omit for ungrouped recipes; all items fall under a default "Ingredients" header. |
| `metric` | string | optional | Metric equivalent (e.g. `"240 ml"`). Not currently displayed in the UI but stored in the schema. |

### Common `unit` Values

```
cups        tbsp        tsp
oz          lb          g
count       medium      large
cloves      stalk       pinch
knob        packs       to taste
```

- For "to taste" items: `amount: 1, unit: to taste`
- Combine equivalent quantities when the same ingredient appears multiple times (e.g., two 14.5 oz cans → `amount: 29, unit: oz`).

---

## File & Image Conventions

- **Filename:** PascalCase, no spaces (e.g., `SplitPeaSoupWithoutPork.md`).
- **Image path:** `src/images/recipe/RecipeName.png` (or `.jpg`). Reference it in frontmatter as `image: "../../images/recipe/RecipeName.png"`.

---

## Minimal Example

```yaml
---
title: "Example Recipe"
date: "March 14, 2026"
prepTime: "10 min"
cookingTime: "30 min"
totalTime: "40 min"
topic: "Soup"
scottRating: 0
originalLink: "https://example.com/recipe"
image: "../../images/recipe/ExampleRecipe.png"
ingredients: [
  {
    name: Onion,
    preparation: ", diced",
    amount: 1,
    unit: medium,
    section: "Vegetables"
  },
  {
    name: Salt,
    amount: 1,
    unit: to taste
  }
]
directions: [
  "Dice the onion.",
  "Cook over medium heat until softened, about 5 minutes.",
  "Season with salt."
]
---
```

---

## GraphQL Schema Reference

The canonical schema is defined in [gatsby-node.ts](../gatsby-node.ts):

```graphql
type MarkdownRemarkFrontmatter {
  title: String
  date: Date @dateformat
  prepTime: String
  cookingTime: String      # NOT cookTime
  totalTime: String
  originalLink: String
  ingredients: [MarkdownRemarkFrontmatterIngredients]
  directions: [String]
  image: File @fileByRelativePath
}

type MarkdownRemarkFrontmatterIngredients {
  name: String
  preparation: String
  amount: String
  unit: String
  section: String
  metric: String
}
```

> **Note:** `topic` and `scottRating` are not explicitly typed in the schema but are used by the index page listing query.

---

## Common Mistakes

- Using `cookTime` instead of `cookingTime` — the schema and TypeScript types only recognize `cookingTime`.
- Quoting `unit` values — units must be **unquoted** YAML scalars (exception: `unit: "to taste"` needs quotes because it contains a space).
- Setting `amount` to a string like `"1/2"` — use the decimal equivalent `0.5`.
