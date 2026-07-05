#!/usr/bin/env node
// Validates every recipe Markdown file's frontmatter (or a specific file passed
// as an argv, e.g. for a just-created recipe). Exits non-zero if any file has
// a YAML parse error or fails schema validation — see reference/recipe-spec.md.
//
// Usage:
//   npm run validate:recipes                 # validate all recipes
//   npm run validate:recipes -- path/to.md    # validate one file

require("@babel/register")({
  presets: [["@babel/preset-env", { targets: { node: "current" } }], "@babel/preset-typescript"],
  extensions: [".ts", ".js"],
});

const fs = require("fs");
const path = require("path");
const { validateRecipeFile } = require("../src/utils/recipeValidation.ts");

const RECIPES_DIR = path.resolve(__dirname, "..", "src", "content", "recipes");

const targets = process.argv.slice(2);
const files =
  targets.length > 0
    ? targets.map((f) => path.resolve(f))
    : fs
        .readdirSync(RECIPES_DIR)
        .filter((f) => f.endsWith(".md"))
        .map((f) => path.join(RECIPES_DIR, f));

let hadProblems = false;

for (const file of files) {
  const content = fs.readFileSync(file, "utf8");
  const result = validateRecipeFile(path.relative(process.cwd(), file), content);

  if (result.parseError) {
    hadProblems = true;
    console.error(`\n${result.file}`);
    console.error(`  YAML parse error: ${result.parseError}`);
  } else if (result.issues.length > 0) {
    hadProblems = true;
    console.error(`\n${result.file}`);
    result.issues.forEach((issue) => console.error(`  - ${issue.field}: ${issue.message}`));
  }
}

if (hadProblems) {
  console.error(`\nvalidate-recipes: found problems (see above).`);
  process.exit(1);
} else {
  console.log(`validate-recipes: ${files.length} recipe file(s) OK.`);
}
