# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: navigation.spec.ts >> SEO / page titles >> recipe page title contains the recipe name
- Location: e2e/navigation.spec.ts:172:7

# Error details

```
Error: expect(page).toHaveTitle(expected) failed

Expected pattern: /Lentil Soup/i
Received string:  ""
Timeout: 5000ms

Call log:
  - Expect "toHaveTitle" with timeout 5000ms
    12 × locator resolved to <html>…</html>
       - unexpected value ""

```

```yaml
- banner:
  - navigation "Primary":
    - link "Scott’s Cookbook":
      - /url: /
    - list:
      - listitem:
        - link "Cooking Tools":
          - /url: /tools/
      - listitem:
        - link "About":
          - /url: /about/
- main:
  - heading "Lentil Soup" [level=1]
  - paragraph: "Published: October 14, 2021"
  - img "Lentil Soup"
  - text: "Image info Total: 60 min Prep: 15 min Cook: 45 min"
  - button "Inspiring Recipe":
    - link "Inspiring Recipe":
      - /url: https://cookieandkate.com/best-lentil-soup-recipe/
  - 'button "Shopping mode (off). Provider: Amazon Fresh."': "Shopping: Disabled"
  - button "Cooking Mode OFF — may auto-lock": "Cooking Mode: Off"
  - heading "Ingredients" [level=5]
  - separator
  - paragraph: Ingredients
  - separator
  - list:
    - listitem:
      - paragraph:
        - strong: "0.25"
        - text: cups Extra Virgin Olive Oil
    - listitem:
      - paragraph:
        - strong: "1"
        - text: medium Yellow or White Onion , Chopped
    - listitem:
      - paragraph:
        - strong: "2"
        - text: count Carrots
    - listitem:
      - paragraph:
        - strong: "4"
        - text: count Garlic Cloves , pressed or minced
    - listitem:
      - paragraph:
        - strong: "2"
        - text: tsp Ground cumin
    - listitem:
      - paragraph:
        - strong: "1"
        - text: tsp Curry Powder
    - listitem:
      - paragraph:
        - strong: "0.5"
        - text: tsp Dried Thyme
    - listitem:
      - paragraph:
        - strong: "28"
        - text: oz Can Diced Tomatoes , lightly drained
    - listitem:
      - paragraph:
        - strong: "1"
        - text: cup Green or Brown Lentils , rinsed and sorted
    - listitem:
      - paragraph:
        - strong: "4"
        - text: cups Low sodium chicken or vegetable broth
    - listitem:
      - paragraph:
        - strong: "2"
        - text: cups Water
    - listitem:
      - paragraph:
        - strong: "1"
        - text: tsp Salt
    - listitem:
      - paragraph:
        - strong: "1"
        - text: pinch Red Pepper Flakes
    - listitem:
      - paragraph:
        - strong: "1"
        - text: to taste Black Pepper
    - listitem:
      - paragraph:
        - strong: "1"
        - text: cup Fresh collard greens or kale , rinced thoroughly and tough ribs removed, chopped
    - listitem:
      - paragraph:
        - strong: "2"
        - text: tsp lemon juice
  - heading "Directions" [level=5]
  - separator
  - list:
    - listitem: Turn stove to medium and heat olive oil.
    - listitem: Add the carrot and chopped onion, frequently stirring until the onion is slightly translucent and softened (5 or so minutes).
    - listitem: Add garlic, cumin, curry powder, thyme. And stir for about 30 seconds, or until fragrent.
    - listitem: Add slightly drained diced tomatoes and cook for a few more minutes. Remember to stir every few minutes.
    - listitem: Add lentils, broth, water, salt, red pepper flakes, and black pepper.
    - listitem: Bring to a boil, then reduce heat to simmer and cook for 25 to 30 minutes (or until lentils are tender but hold shape.
    - listitem: Take out 2 cups and put in a blender. Secure the lid and hold it down with a towel - you will probably burn your hand if you don't. Transfer soup back to pot. You can also use an immersion blender if you have one.
    - listitem: Add chopped greens and cook for 5 or so more minutes, or until they are soft
    - listitem: Remove the pot from heat and add lemon juice.
    - listitem: Taste and season with salt/pepper
- contentinfo:
  - text: © 2026
  - link "Scott's Cookbook":
    - /url: /
  - link:
    - /url: https://www.scotthansen.io/
    - img
  - link:
    - /url: https://github.com/Scott123180/eatwell.link
    - img
  - link:
    - /url: https://www.patreon.com/scotthansen
    - img
```

# Test source

```ts
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
  143 |     const response = await page.goto("/this-page-does-not-exist-xyz");
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
> 174 |     await expect(page).toHaveTitle(/Lentil Soup/i);
      |                        ^ Error: expect(page).toHaveTitle(expected) failed
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