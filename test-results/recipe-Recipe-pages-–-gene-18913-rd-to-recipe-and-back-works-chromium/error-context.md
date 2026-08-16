# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: recipe.spec.ts >> Recipe pages – general navigation >> navigating from home card to recipe and back works
- Location: e2e/recipe.spec.ts:267:7

# Error details

```
Error: expect(page).toHaveURL(expected) failed

Expected: "http://localhost:8000/"
Received: "about:blank"
Timeout:  5000ms

Call log:
  - Expect "toHaveURL" with timeout 5000ms
    14 × locator resolved to <html>…</html>
       - unexpected value "about:blank"

```

# Test source

```ts
  175 |     await page.goto(LENTIL_SOUP_URL);
  176 |     await page.evaluate(() => {
  177 |       document.cookie =
  178 |         "sc_shopping_enabled=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
  179 |       document.cookie =
  180 |         "sc_shopping_provider=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
  181 |     });
  182 |     await page.reload();
  183 |     await expect(page.getByRole("heading", { name: /Lentil Soup/i })).toBeVisible();
  184 |   });
  185 | 
  186 |   test("Shopping chip is visible and defaults to Disabled", async ({
  187 |     page,
  188 |   }) => {
  189 |     const shoppingChip = page
  190 |       .locator('[class*="MuiChip-root"]', { hasText: /Shopping/i })
  191 |       .first();
  192 |     await expect(shoppingChip).toBeVisible();
  193 |     await expect(shoppingChip).toContainText(/Disabled/i);
  194 |   });
  195 | 
  196 |   test("clicking Shopping chip enables shopping mode", async ({ page }) => {
  197 |     const shoppingChip = page
  198 |       .locator('[class*="MuiChip-root"]', { hasText: /Shopping/i })
  199 |       .first();
  200 |     await shoppingChip.click();
  201 |     // Should now show a provider name, not "Disabled"
  202 |     await expect(shoppingChip).not.toContainText(/Disabled/i);
  203 |   });
  204 | 
  205 |   test("provider dropdown appears and lists all four providers", async ({
  206 |     page,
  207 |   }) => {
  208 |     // Click the expand (delete) icon on the shopping chip to open the menu
  209 |     const expandIcon = page
  210 |       .locator('[class*="MuiChip-root"]', { hasText: /Shopping/i })
  211 |       .first()
  212 |       .locator('[data-testid="ExpandMoreIcon"], [class*="MuiChip-deleteIcon"]')
  213 |       .first();
  214 |     await expandIcon.click();
  215 | 
  216 |     await expect(page.getByRole("menuitem", { name: /Amazon Fresh/i })).toBeVisible();
  217 |     await expect(page.getByRole("menuitem", { name: /Instacart/i })).toBeVisible();
  218 |     await expect(page.getByRole("menuitem", { name: /Walmart Grocery/i })).toBeVisible();
  219 |     await expect(page.getByRole("menuitem", { name: /Whole Foods/i })).toBeVisible();
  220 |   });
  221 | 
  222 |   test("selecting a provider from the dropdown updates the chip label", async ({
  223 |     page,
  224 |   }) => {
  225 |     // Enable shopping mode first
  226 |     const shoppingChip = page
  227 |       .locator('[class*="MuiChip-root"]', { hasText: /Shopping/i })
  228 |       .first();
  229 |     await shoppingChip.click();
  230 | 
  231 |     // Open provider menu via expand icon
  232 |     const expandIcon = shoppingChip
  233 |       .locator('[class*="MuiChip-deleteIcon"]')
  234 |       .first();
  235 |     await expandIcon.click();
  236 | 
  237 |     await page.getByRole("menuitem", { name: /Instacart/i }).click();
  238 | 
  239 |     await expect(shoppingChip).toContainText(/Instacart/i);
  240 |   });
  241 | });
  242 | 
  243 | test.describe("Recipe detail page – ingredient table", () => {
  244 |   test.beforeEach(async ({ page }) => {
  245 |     await goToLentilSoup(page);
  246 |   });
  247 | 
  248 |   test("ingredient amounts are visible", async ({ page }) => {
  249 |     // Lentil Soup has Olive Oil as 0.25 cups — look for numeric amounts
  250 |     const amounts = page.locator(
  251 |       '[class*="MuiListItem-root"], [class*="MuiTableRow-root"]'
  252 |     );
  253 |     const count = await amounts.count();
  254 |     expect(count).toBeGreaterThan(0);
  255 |   });
  256 | 
  257 |   test("ingredient names are displayed", async ({ page }) => {
  258 |     // "Olive Oil" should appear somewhere on the page. Case-sensitive: the
  259 |     // ingredient list renders Title Case ("Olive Oil"), while the directions
  260 |     // prose also mentions "olive oil" in lowercase — matching case-insensitively
  261 |     // would resolve to both and violate Playwright's strict-locator mode.
  262 |     await expect(page.getByText(/Olive Oil/)).toBeVisible();
  263 |   });
  264 | });
  265 | 
  266 | test.describe("Recipe pages – general navigation", () => {
  267 |   test("navigating from home card to recipe and back works", async ({
  268 |     page,
  269 |   }) => {
  270 |     await page.goto("/");
  271 |     const firstCard = page.locator('[class*="MuiCard-root"]').first();
  272 |     await firstCard.click();
  273 |     // We're on a recipe page — go back
  274 |     await page.goBack();
> 275 |     await expect(page).toHaveURL("/");
      |                        ^ Error: expect(page).toHaveURL(expected) failed
  276 |     await expect(page.locator('[class*="MuiCard-root"]').first()).toBeVisible();
  277 |   });
  278 | 
  279 |   test("recipe page has a link back to the home page via the nav", async ({
  280 |     page,
  281 |   }) => {
  282 |     await goToLentilSoup(page);
  283 |     const homeLink = page.getByRole("link", { name: /Scott['’]?s Cookbook|Home/i }).first();
  284 |     await homeLink.click();
  285 |     await expect(page).toHaveURL("/");
  286 |   });
  287 | });
  288 | 
```