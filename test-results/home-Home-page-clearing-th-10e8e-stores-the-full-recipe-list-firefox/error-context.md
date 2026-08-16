# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: home.spec.ts >> Home page >> clearing the search restores the full recipe list
- Location: e2e/home.spec.ts:124:7

# Error details

```
Test timeout of 30000ms exceeded while running "beforeEach" hook.
```

# Test source

```ts
  1   | import { test, expect } from "@playwright/test";
  2   | 
  3   | /**
  4   |  * Home page (RecipeList) tests
  5   |  *
  6   |  * Covers: page load, banner, recipe card rendering, search, topic filter,
  7   |  * sort order, empty-state, and card navigation.
  8   |  */
  9   | 
  10  | test.describe("Home page", () => {
> 11  |   test.beforeEach(async ({ page }) => {
      |        ^ Test timeout of 30000ms exceeded while running "beforeEach" hook.
  12  |     await page.goto("/");
  13  |   });
  14  | 
  15  |   // ── Smoke ─────────────────────────────────────────────────────────────────
  16  | 
  17  |   test("loads and shows the site title", async ({ page }) => {
  18  |     await expect(page).toHaveTitle(/Scott'?s Cookbook/i);
  19  |   });
  20  | 
  21  |   test("renders the hero heading", async ({ page }) => {
  22  |     await expect(
  23  |       page.getByRole("heading", { name: "A personal, ad-free cookbook." })
  24  |     ).toBeVisible();
  25  |   });
  26  | 
  27  |   test("renders at least one recipe card", async ({ page }) => {
  28  |     const cards = page.locator('[class*="MuiCard-root"]');
  29  |     await expect(cards.first()).toBeVisible();
  30  |     const count = await cards.count();
  31  |     expect(count).toBeGreaterThan(1);
  32  |   });
  33  | 
  34  |   // ── Card content ──────────────────────────────────────────────────────────
  35  | 
  36  |   test("recipe cards display a title", async ({ page }) => {
  37  |     const firstTitle = page
  38  |       .locator('[class*="MuiCard-root"] [class*="MuiTypography-h6"]')
  39  |       .first();
  40  |     await expect(firstTitle).not.toBeEmpty();
  41  |   });
  42  | 
  43  |   test("recipe cards display time chips", async ({ page }) => {
  44  |     // At least one card should have a total-time chip
  45  |     const timeChip = page
  46  |       .locator('[class*="MuiChip-root"]', { hasText: /min|hour/i })
  47  |       .first();
  48  |     await expect(timeChip).toBeVisible();
  49  |   });
  50  | 
  51  |   test("recipe cards show a star rating component", async ({ page }) => {
  52  |     const rating = page.locator('[class*="MuiRating-root"]').first();
  53  |     await expect(rating).toBeVisible();
  54  |   });
  55  | 
  56  |   test("cards with no image show the fallback frying-pan emoji", async ({
  57  |     page,
  58  |   }) => {
  59  |     const fallback = page
  60  |       .locator('[role="img"][aria-label="frying pan"]')
  61  |       .first();
  62  |     // Only assert if at least one exists — not all cards may be imageless
  63  |     const count = await fallback.count();
  64  |     if (count > 0) {
  65  |       await expect(fallback).toBeVisible();
  66  |     }
  67  |   });
  68  | 
  69  |   // ── Search ────────────────────────────────────────────────────────────────
  70  | 
  71  |   test("search box is visible and accepts input", async ({ page }) => {
  72  |     const search = page.getByPlaceholder("Search title, ingredient, or step…");
  73  |     await expect(search).toBeVisible();
  74  |     await search.fill("lentil");
  75  |     await expect(search).toHaveValue("lentil");
  76  |   });
  77  | 
  78  |   test("search filters recipes by title (case-insensitive)", async ({
  79  |     page,
  80  |   }) => {
  81  |     const search = page.getByPlaceholder("Search title, ingredient, or step…");
  82  |     await search.fill("Mjadra");
  83  | 
  84  |     const cards = page.locator('[class*="MuiCard-root"]');
  85  |     const count = await cards.count();
  86  |     for (let i = 0; i < count; i++) {
  87  |       const text = await cards.nth(i).innerText();
  88  |       expect(text.toLowerCase()).toContain("mjadra");
  89  |     }
  90  |   });
  91  | 
  92  |   test("search matches recipes by ingredient name even when the ingredient isn't in the title", async ({
  93  |     page,
  94  |   }) => {
  95  |     const search = page.getByPlaceholder("Search title, ingredient, or step…");
  96  |     await search.fill("lentil");
  97  | 
  98  |     const cards = page.locator('[class*="MuiCard-root"]');
  99  |     await expect(cards.first()).toBeVisible();
  100 |     const titles = await page.locator('[class*="MuiCard-root"] h6').allInnerTexts();
  101 |     expect(titles.some((t) => !t.toLowerCase().includes("lentil"))).toBe(true);
  102 |   });
  103 | 
  104 |   test("search by topic keyword shows matching cards", async ({ page }) => {
  105 |     const search = page.getByPlaceholder("Search title, ingredient, or step…");
  106 |     await search.fill("Soup");
  107 | 
  108 |     const cards = page.locator('[class*="MuiCard-root"]');
  109 |     await expect(cards.first()).toBeVisible();
  110 |   });
  111 | 
```