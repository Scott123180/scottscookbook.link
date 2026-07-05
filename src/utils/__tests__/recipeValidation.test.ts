import * as fs from "fs";
import * as path from "path";
import { validateRecipeFile, validateRecipeFrontmatter } from "../recipeValidation";

const RECIPES_DIR = path.resolve(__dirname, "..", "..", "content", "recipes");

describe("recipe content validation", () => {
  const files = fs.readdirSync(RECIPES_DIR).filter((f) => f.endsWith(".md"));

  it("finds recipe files to validate", () => {
    expect(files.length).toBeGreaterThan(0);
  });

  it.each(files)("%s has valid, parseable frontmatter", (file) => {
    const content = fs.readFileSync(path.join(RECIPES_DIR, file), "utf8");
    const result = validateRecipeFile(file, content);

    if (result.parseError) {
      throw new Error(`${file}: YAML parse error — ${result.parseError}`);
    }
    if (result.issues.length > 0) {
      const details = result.issues.map((i) => `${i.field}: ${i.message}`).join("\n  ");
      throw new Error(`${file} has invalid frontmatter:\n  ${details}`);
    }
  });
});

describe("validateRecipeFrontmatter", () => {
  const validFrontmatter = {
    title: "Example Recipe",
    date: "March 14, 2026",
    topic: "Soup",
    scottRating: 0,
    image: "../../images/recipe/ExampleRecipe.png",
    ingredients: [{ name: "Onion", amount: 1, unit: "medium" }],
    directions: ["Dice the onion."],
  };

  it("passes a well-formed recipe", () => {
    expect(validateRecipeFrontmatter(validFrontmatter)).toEqual([]);
  });

  it("flags a missing title", () => {
    const { title, ...rest } = validFrontmatter;
    const issues = validateRecipeFrontmatter(rest);
    expect(issues.some((i) => i.field === "title")).toBe(true);
  });

  it("flags a disallowed topic", () => {
    const issues = validateRecipeFrontmatter({ ...validFrontmatter, topic: "Brunch" });
    expect(issues.some((i) => i.field === "topic")).toBe(true);
  });

  it("flags a cookTime typo field", () => {
    const issues = validateRecipeFrontmatter({ ...validFrontmatter, cookTime: "20 min" });
    expect(issues.some((i) => i.field === "cookTime")).toBe(true);
  });

  it("flags an ingredient missing a unit", () => {
    const issues = validateRecipeFrontmatter({
      ...validFrontmatter,
      ingredients: [{ name: "Salt", amount: 1 }],
    });
    expect(issues.some((i) => i.field === "ingredients[0].unit")).toBe(true);
  });

  it("flags a non-numeric ingredient amount", () => {
    const issues = validateRecipeFrontmatter({
      ...validFrontmatter,
      ingredients: [{ name: "Salt", amount: "1/2", unit: "tsp" }],
    });
    expect(issues.some((i) => i.field === "ingredients[0].amount")).toBe(true);
  });

  it("flags empty directions", () => {
    const issues = validateRecipeFrontmatter({ ...validFrontmatter, directions: [] });
    expect(issues.some((i) => i.field === "directions")).toBe(true);
  });
});
