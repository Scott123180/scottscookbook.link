# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: navigation.spec.ts >> 404 page >> navigating to an unknown URL shows a 404 page
- Location: e2e/navigation.spec.ts:142:7

# Error details

```
Error: Channel closed
```

```
Error: page.goto: Target page, context or browser has been closed
Call log:
  - navigating to "http://localhost:8000/this-page-does-not-exist-xyz", waiting until "load"

```

# Test source

```ts
  43  |   test("clicking the Tools nav link navigates to /tools", async ({ page }) => {
  44  |     const toolsLink = page
  45  |       .locator("nav a, header a")
  46  |       .filter({ hasText: /Tools/i })
  47  |       .first();
  48  |     await toolsLink.click();
  49  |     await expect(page).toHaveURL(/\/tools/);
  50  |     await expect(
  51  |       page.getByRole("heading", { name: "Bean Converter" })
  52  |     ).toBeVisible();
  53  |   });
  54  | 
  55  |   test("clicking the About nav link navigates to /about", async ({ page }) => {
  56  |     const aboutLink = page
  57  |       .locator("nav a, header a")
  58  |       .filter({ hasText: /About/i })
  59  |       .first();
  60  |     await aboutLink.click();
  61  |     await expect(page).toHaveURL(/\/about/);
  62  |   });
  63  | 
  64  |   test("clicking the home/logo link navigates back to /", async ({ page }) => {
  65  |     // Navigate away first
  66  |     await page.goto("/tools");
  67  |     const homeLink = page
  68  |       .locator("nav a, header a")
  69  |       .filter({ hasText: /Scott['’]?s Cookbook|Home/i })
  70  |       .first();
  71  |     await homeLink.click();
  72  |     await expect(page).toHaveURL("/");
  73  |   });
  74  | });
  75  | 
  76  | test.describe("About page", () => {
  77  |   test.beforeEach(async ({ page }) => {
  78  |     await page.goto("/about");
  79  |   });
  80  | 
  81  |   test("About page loads without error", async ({ page }) => {
  82  |     await expect(page).not.toHaveURL(/404/);
  83  |   });
  84  | 
  85  |   test("About page has a heading", async ({ page }) => {
  86  |     await expect(page.getByRole("heading").first()).toBeVisible();
  87  |   });
  88  | 
  89  |   test("About page renders inside the shared Layout (nav is present)", async ({
  90  |     page,
  91  |   }) => {
  92  |     await expect(page.locator("nav, header").first()).toBeVisible();
  93  |   });
  94  | });
  95  | 
  96  | test.describe("Tools page", () => {
  97  |   test("Tools page loads and shows Bean Converter", async ({ page }) => {
  98  |     await page.goto("/tools");
  99  |     await expect(
  100 |       page.getByRole("heading", { name: "Bean Converter" })
  101 |     ).toBeVisible();
  102 |   });
  103 | 
  104 |   test("Tools page renders inside the shared Layout", async ({ page }) => {
  105 |     await page.goto("/tools");
  106 |     await expect(page.locator("nav, header").first()).toBeVisible();
  107 |   });
  108 | });
  109 | 
  110 | test.describe("Home page", () => {
  111 |   test("home page renders inside the shared Layout", async ({ page }) => {
  112 |     await page.goto("/");
  113 |     await expect(page.locator("nav, header").first()).toBeVisible();
  114 |   });
  115 | 
  116 |   test("home page has a footer", async ({ page }) => {
  117 |     await page.goto("/");
  118 |     await expect(page.locator("footer")).toBeVisible();
  119 |   });
  120 | });
  121 | 
  122 | test.describe("Recipe pages", () => {
  123 |   test("a known recipe URL loads and has a heading", async ({ page }) => {
  124 |     await page.goto("/recipes/LentilSoup/");
  125 |     await expect(
  126 |       page.getByRole("heading", { name: /Lentil Soup/i })
  127 |     ).toBeVisible();
  128 |   });
  129 | 
  130 |   test("recipe page renders inside the shared Layout", async ({ page }) => {
  131 |     await page.goto("/recipes/LentilSoup/");
  132 |     await expect(page.locator("nav, header").first()).toBeVisible();
  133 |   });
  134 | 
  135 |   test("recipe page has a footer", async ({ page }) => {
  136 |     await page.goto("/recipes/LentilSoup/");
  137 |     await expect(page.locator("footer")).toBeVisible();
  138 |   });
  139 | });
  140 | 
  141 | test.describe("404 page", () => {
  142 |   test("navigating to an unknown URL shows a 404 page", async ({ page }) => {
> 143 |     const response = await page.goto("/this-page-does-not-exist-xyz");
      |                                 ^ Error: page.goto: Target page, context or browser has been closed
  144 |     // Gatsby serves a custom 404; the response status may be 200 for SSR
  145 |     // but the page content should indicate the page wasn't found
  146 |     const body = await page.content();
  147 |     const has404 = body.toLowerCase().includes("404") ||
  148 |       body.toLowerCase().includes("not found") ||
  149 |       body.toLowerCase().includes("page not found");
  150 |     expect(has404).toBe(true);
  151 |   });
  152 | });
  153 | 
  154 | test.describe("SEO / page titles", () => {
  155 |   test("home page has a meaningful title", async ({ page }) => {
  156 |     await page.goto("/");
  157 |     await expect(page).toHaveTitle(/Scott'?s Cookbook/i);
  158 |   });
  159 | 
  160 |   test("about page has a meaningful title", async ({ page }) => {
  161 |     await page.goto("/about");
  162 |     // react-helmet sets document.title after the initial render, so poll
  163 |     // rather than reading page.title() once immediately after navigation.
  164 |     await expect.poll(() => page.title()).not.toBe("");
  165 |   });
  166 | 
  167 |   test("tools page has a meaningful title", async ({ page }) => {
  168 |     await page.goto("/tools");
  169 |     await expect.poll(() => page.title()).not.toBe("");
  170 |   });
  171 | 
  172 |   test("recipe page title contains the recipe name", async ({ page }) => {
  173 |     await page.goto("/recipes/LentilSoup/");
  174 |     await expect(page).toHaveTitle(/Lentil Soup/i);
  175 |   });
  176 | });
  177 | 
  178 | test.describe("Mobile layout", () => {
  179 |   test.use({ viewport: { width: 375, height: 812 } });
  180 | 
  181 |   test("home page renders on mobile without horizontal overflow", async ({
  182 |     page,
  183 |   }) => {
  184 |     await page.goto("/");
  185 |     const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
  186 |     const viewportWidth = page.viewportSize()!.width;
  187 |     expect(bodyWidth).toBeLessThanOrEqual(viewportWidth + 5); // allow 5px rounding
  188 |   });
  189 | 
  190 |   test("recipe cards stack to single column on mobile", async ({ page }) => {
  191 |     await page.goto("/");
  192 |     const card = page.locator('[class*="MuiCard-root"]').first();
  193 |     const box = await card.boundingBox();
  194 |     // On mobile (375px) a full-width card should be close to the viewport width
  195 |     expect(box!.width).toBeGreaterThan(300);
  196 |   });
  197 | 
  198 |   test("recipe detail page is usable on mobile", async ({ page }) => {
  199 |     await page.goto("/recipes/LentilSoup/");
  200 |     await expect(
  201 |       page.getByRole("heading", { name: /Lentil Soup/i })
  202 |     ).toBeVisible();
  203 |     // Ingredients and directions should both still appear
  204 |     await expect(
  205 |       page.getByRole("heading", { name: /Ingredient/i })
  206 |     ).toBeVisible();
  207 |     await expect(
  208 |       page.getByRole("heading", { name: /Direction/i })
  209 |     ).toBeVisible();
  210 |   });
  211 | 
  212 |   test("tools page is usable on mobile", async ({ page }) => {
  213 |     await page.goto("/tools");
  214 |     await expect(
  215 |       page.getByRole("heading", { name: "Bean Converter" })
  216 |     ).toBeVisible();
  217 |   });
  218 | });
  219 | 
```