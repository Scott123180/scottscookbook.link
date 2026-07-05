// src/utils/recipeValidation.ts
//
// Shared recipe-frontmatter validation. Used by:
//   - scripts/validate-recipes.js (CLI, run manually or in CI)
//   - src/utils/__tests__/recipeValidation.test.ts (runs under `npm test`)
//   - the add-recipe skill (.claude/skills/add-recipe)
//
// Keeping this logic in one place means all three surfaces catch the same
// problems the same way — see reference/recipe-spec.md for the field spec.
import matter from "gray-matter";

export const ALLOWED_TOPICS = [
  "Soup",
  "Salad",
  "Main Dish",
  "Side Dish",
  "One-Pot",
  "Sauce",
  "Snack",
  "Dessert",
  "Fermentation",
];

export interface RecipeIssue {
  field: string;
  message: string;
}

function isNonEmptyString(v: unknown): v is string {
  return typeof v === "string" && v.trim().length > 0;
}

export function validateIngredient(ing: any, index: number): RecipeIssue[] {
  const issues: RecipeIssue[] = [];
  const prefix = `ingredients[${index}]`;

  if (ing == null || typeof ing !== "object") {
    return [{ field: prefix, message: "must be an object" }];
  }

  if (!isNonEmptyString(ing.name)) {
    issues.push({ field: `${prefix}.name`, message: "is required and must be a non-empty string" });
  }
  if (typeof ing.amount !== "number") {
    issues.push({
      field: `${prefix}.amount`,
      message: `must be a number (got ${JSON.stringify(ing.amount)}); use a decimal for fractions (e.g. 0.5, not "1/2")`,
    });
  }
  if (!isNonEmptyString(ing.unit)) {
    issues.push({ field: `${prefix}.unit`, message: "is required and must be a non-empty string" });
  }
  if (ing.preparation !== undefined && typeof ing.preparation !== "string") {
    issues.push({ field: `${prefix}.preparation`, message: "must be a string when present" });
  }

  return issues;
}

export function validateRecipeFrontmatter(fm: any): RecipeIssue[] {
  const issues: RecipeIssue[] = [];

  if (fm == null || typeof fm !== "object") {
    return [{ field: "frontmatter", message: "is missing or not an object" }];
  }

  if (!isNonEmptyString(fm.title)) {
    issues.push({ field: "title", message: "is required and must be a non-empty string" });
  }
  if (!isNonEmptyString(fm.date)) {
    issues.push({ field: "date", message: "is required and must be a non-empty string" });
  }
  if (typeof fm.topic !== "string") {
    issues.push({ field: "topic", message: 'is required (use "" if none fit)' });
  } else if (fm.topic !== "" && !ALLOWED_TOPICS.includes(fm.topic)) {
    issues.push({
      field: "topic",
      message: `"${fm.topic}" is not an allowed topic. Allowed: ${ALLOWED_TOPICS.join(", ")}`,
    });
  }
  if (typeof fm.scottRating !== "number") {
    issues.push({ field: "scottRating", message: "is required and must be a number (0-5)" });
  }
  if (!isNonEmptyString(fm.image)) {
    issues.push({ field: "image", message: "is required and must be a non-empty string path" });
  }
  if (fm.cookTime !== undefined) {
    issues.push({ field: "cookTime", message: 'unrecognized field — use "cookingTime" instead' });
  }

  if (!Array.isArray(fm.ingredients) || fm.ingredients.length === 0) {
    issues.push({ field: "ingredients", message: "is required and must be a non-empty array" });
  } else {
    fm.ingredients.forEach((ing: any, i: number) => issues.push(...validateIngredient(ing, i)));
  }

  if (!Array.isArray(fm.directions) || fm.directions.length === 0) {
    issues.push({ field: "directions", message: "is required and must be a non-empty array" });
  } else {
    fm.directions.forEach((step: any, i: number) => {
      if (!isNonEmptyString(step)) {
        issues.push({ field: `directions[${i}]`, message: "must be a non-empty string" });
      }
    });
  }

  return issues;
}

export interface RecipeFileResult {
  file: string;
  parseError?: string;
  issues: RecipeIssue[];
}

/** Parses raw Markdown+frontmatter content and validates it. Never throws. */
export function validateRecipeFile(file: string, content: string): RecipeFileResult {
  try {
    const { data } = matter(content);
    return { file, issues: validateRecipeFrontmatter(data) };
  } catch (err: any) {
    return { file, parseError: err?.message ?? String(err), issues: [] };
  }
}
