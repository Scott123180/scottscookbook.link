# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: home.spec.ts >> Home page >> search by topic keyword shows matching cards
- Location: e2e/home.spec.ts:104:7

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.fill: Test timeout of 30000ms exceeded.
Call log:
  - waiting for getByPlaceholder('Search title, ingredient, or step…')
    - locator resolved to <input value="" id=":r1:" type="text" aria-invalid="false" placeholder="Search title, ingredient, or step…" class="MuiInputBase-input MuiOutlinedInput-input MuiInputBase-inputSizeSmall MuiInputBase-inputAdornedStart css-1ua80n0-MuiInputBase-input-MuiOutlinedInput-input"/>
    - fill("Soup")
  - attempting fill action
    - waiting for element to be visible, enabled and editable

```

# Test source

```ts
  6   |  * Covers: page load, banner, recipe card rendering, search, topic filter,
  7   |  * sort order, empty-state, and card navigation.
  8   |  */
  9   | 
  10  | test.describe("Home page", () => {
  11  |   test.beforeEach(async ({ page }) => {
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
> 106 |     await search.fill("Soup");
      |                  ^ Error: locator.fill: Test timeout of 30000ms exceeded.
  107 | 
  108 |     const cards = page.locator('[class*="MuiCard-root"]');
  109 |     await expect(cards.first()).toBeVisible();
  110 |   });
  111 | 
  112 |   test("empty state message appears when search has no matches", async ({
  113 |     page,
  114 |   }) => {
  115 |     const search = page.getByPlaceholder("Search title, ingredient, or step…");
  116 |     await search.fill("xyzzy_no_recipe_matches_this");
  117 | 
  118 |     await expect(page.getByText("No recipes found")).toBeVisible();
  119 |     await expect(
  120 |       page.getByText("Try clearing filters or searching a different term.")
  121 |     ).toBeVisible();
  122 |   });
  123 | 
  124 |   test("clearing the search restores the full recipe list", async ({
  125 |     page,
  126 |   }) => {
  127 |     const search = page.getByPlaceholder("Search title, ingredient, or step…");
  128 |     // Wait for the initial card render before counting, so a slow first
  129 |     // paint (seen on Firefox) doesn't get read as "zero cards".
  130 |     await expect(page.locator('[class*="MuiCard-root"]').first()).toBeVisible();
  131 |     const cardsBefore = await page
  132 |       .locator('[class*="MuiCard-root"]')
  133 |       .count();
  134 | 
  135 |     await search.fill("zzznomatch");
  136 |     await expect(page.getByText("No recipes found")).toBeVisible();
  137 | 
  138 |     await search.clear();
  139 |     const cardsAfter = await page.locator('[class*="MuiCard-root"]').count();
  140 |     expect(cardsAfter).toBe(cardsBefore);
  141 |   });
  142 | 
  143 |   // ── Topic filter ──────────────────────────────────────────────────────────
  144 | 
  145 |   test("topic toggle button group is visible", async ({ page }) => {
  146 |     const allBtn = page.getByRole("button", { name: /^All$/i });
  147 |     await expect(allBtn).toBeVisible();
  148 |   });
  149 | 
  150 |   test("clicking a topic filter button shows only that topic's recipes", async ({
  151 |     page,
  152 |   }) => {
  153 |     // Find a topic button that isn't "All"
  154 |     const topicButtons = page.locator('[class*="MuiToggleButton-root"]');
  155 |     const count = await topicButtons.count();
  156 |     // Skip "All" (index 0) and click the first real topic
  157 |     if (count > 1) {
  158 |       const topicBtn = topicButtons.nth(1);
  159 |       const topicName = (await topicBtn.innerText()).trim();
  160 |       await topicBtn.click();
  161 | 
  162 |       // Every visible card's topic chip should match
  163 |       const topicChips = page.locator(
  164 |         '[class*="MuiCard-root"] [class*="MuiChip-root"]:not([class*="MuiChip-outlined"])'
  165 |       );
  166 |       const chipCount = await topicChips.count();
  167 |       for (let i = 0; i < chipCount; i++) {
  168 |         const chipText = (await topicChips.nth(i).innerText()).trim();
  169 |         expect(chipText).toBe(topicName);
  170 |       }
  171 |     }
  172 |   });
  173 | 
  174 |   test("clicking All after a topic filter restores the full list", async ({
  175 |     page,
  176 |   }) => {
  177 |     const topicButtons = page.locator('[class*="MuiToggleButton-root"]');
  178 |     const totalBefore = await page.locator('[class*="MuiCard-root"]').count();
  179 | 
  180 |     if ((await topicButtons.count()) > 1) {
  181 |       await topicButtons.nth(1).click();
  182 |       await topicButtons.nth(0).click(); // "All"
  183 | 
  184 |       const totalAfter = await page.locator('[class*="MuiCard-root"]').count();
  185 |       expect(totalAfter).toBe(totalBefore);
  186 |     }
  187 |   });
  188 | 
  189 |   // ── Sort ──────────────────────────────────────────────────────────────────
  190 | 
  191 |   test("sort dropdown is visible with default Rating option", async ({
  192 |     page,
  193 |   }) => {
  194 |     const select = page.locator('[class*="MuiSelect-select"]');
  195 |     await expect(select).toBeVisible();
  196 |     await expect(select).toContainText(/Rating/i);
  197 |   });
  198 | 
  199 |   test("sort by Title A→Z orders cards alphabetically", async ({ page }) => {
  200 |     const select = page.locator('[class*="MuiSelect-select"]');
  201 |     await select.click();
  202 |     await page.getByRole("option", { name: "Title (A→Z)" }).click();
  203 | 
  204 |     const titles = await page
  205 |       .locator('[class*="MuiCard-root"] [class*="MuiTypography-h6"]')
  206 |       .allInnerTexts();
```