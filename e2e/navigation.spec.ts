import { test, expect } from "@playwright/test";

/**
 * Navigation, routing, and static page tests
 *
 * Covers: nav bar links, About page, Tools page, 404 handling,
 * Layout presence on all pages, and SEO titles.
 */

test.describe("Navigation bar", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("nav bar is visible on the home page", async ({ page }) => {
    await expect(page.locator("nav, header").first()).toBeVisible();
  });

  test("nav contains a link to the home / root", async ({ page }) => {
    const homeLink = page
      .locator("nav a, header a")
      .filter({ hasText: /Scott['’]?s Cookbook|Home/i })
      .first();
    await expect(homeLink).toBeVisible();
  });

  test("nav contains a link to the About page", async ({ page }) => {
    const aboutLink = page
      .locator("nav a, header a")
      .filter({ hasText: /About/i })
      .first();
    await expect(aboutLink).toBeVisible();
  });

  test("nav contains a link to the Tools page", async ({ page }) => {
    const toolsLink = page
      .locator("nav a, header a")
      .filter({ hasText: /Tools/i })
      .first();
    await expect(toolsLink).toBeVisible();
  });

  test("clicking the Tools nav link navigates to /tools", async ({ page }) => {
    const toolsLink = page
      .locator("nav a, header a")
      .filter({ hasText: /Tools/i })
      .first();
    await toolsLink.click();
    await expect(page).toHaveURL(/\/tools/);
    await expect(
      page.getByRole("heading", { name: "Bean Converter" })
    ).toBeVisible();
  });

  test("clicking the About nav link navigates to /about", async ({ page }) => {
    const aboutLink = page
      .locator("nav a, header a")
      .filter({ hasText: /About/i })
      .first();
    await aboutLink.click();
    await expect(page).toHaveURL(/\/about/);
  });

  test("clicking the home/logo link navigates back to /", async ({ page }) => {
    // Navigate away first
    await page.goto("/tools");
    const homeLink = page
      .locator("nav a, header a")
      .filter({ hasText: /Scott['’]?s Cookbook|Home/i })
      .first();
    await homeLink.click();
    await expect(page).toHaveURL("/");
  });
});

test.describe("About page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/about");
  });

  test("About page loads without error", async ({ page }) => {
    await expect(page).not.toHaveURL(/404/);
  });

  test("About page has a heading", async ({ page }) => {
    await expect(page.getByRole("heading").first()).toBeVisible();
  });

  test("About page renders inside the shared Layout (nav is present)", async ({
    page,
  }) => {
    await expect(page.locator("nav, header").first()).toBeVisible();
  });
});

test.describe("Tools page", () => {
  test("Tools page loads and shows Bean Converter", async ({ page }) => {
    await page.goto("/tools");
    await expect(
      page.getByRole("heading", { name: "Bean Converter" })
    ).toBeVisible();
  });

  test("Tools page renders inside the shared Layout", async ({ page }) => {
    await page.goto("/tools");
    await expect(page.locator("nav, header").first()).toBeVisible();
  });
});

test.describe("Home page", () => {
  test("home page renders inside the shared Layout", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("nav, header").first()).toBeVisible();
  });

  test("home page has a footer", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("footer")).toBeVisible();
  });
});

test.describe("Recipe pages", () => {
  test("a known recipe URL loads and has a heading", async ({ page }) => {
    await page.goto("/recipes/LentilSoup/");
    await expect(
      page.getByRole("heading", { name: /Lentil Soup/i })
    ).toBeVisible();
  });

  test("recipe page renders inside the shared Layout", async ({ page }) => {
    await page.goto("/recipes/LentilSoup/");
    await expect(page.locator("nav, header").first()).toBeVisible();
  });

  test("recipe page has a footer", async ({ page }) => {
    await page.goto("/recipes/LentilSoup/");
    await expect(page.locator("footer")).toBeVisible();
  });
});

test.describe("404 page", () => {
  test("navigating to an unknown URL shows a 404 page", async ({ page }) => {
    const response = await page.goto("/this-page-does-not-exist-xyz");
    // Gatsby serves a custom 404; the response status may be 200 for SSR
    // but the page content should indicate the page wasn't found
    const body = await page.content();
    const has404 = body.toLowerCase().includes("404") ||
      body.toLowerCase().includes("not found") ||
      body.toLowerCase().includes("page not found");
    expect(has404).toBe(true);
  });
});

test.describe("SEO / page titles", () => {
  test("home page has a meaningful title", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Scott'?s Cookbook/i);
  });

  test("about page has a meaningful title", async ({ page }) => {
    await page.goto("/about");
    // react-helmet sets document.title after the initial render, so poll
    // rather than reading page.title() once immediately after navigation.
    await expect.poll(() => page.title()).not.toBe("");
  });

  test("tools page has a meaningful title", async ({ page }) => {
    await page.goto("/tools");
    await expect.poll(() => page.title()).not.toBe("");
  });

  test("recipe page title contains the recipe name", async ({ page }) => {
    await page.goto("/recipes/LentilSoup/");
    await expect(page).toHaveTitle(/Lentil Soup/i);
  });
});

test.describe("Mobile layout", () => {
  test.use({ viewport: { width: 375, height: 812 } });

  test("home page renders on mobile without horizontal overflow", async ({
    page,
  }) => {
    await page.goto("/");
    const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
    const viewportWidth = page.viewportSize()!.width;
    expect(bodyWidth).toBeLessThanOrEqual(viewportWidth + 5); // allow 5px rounding
  });

  test("recipe cards stack to single column on mobile", async ({ page }) => {
    await page.goto("/");
    const card = page.locator('[class*="MuiCard-root"]').first();
    const box = await card.boundingBox();
    // On mobile (375px) a full-width card should be close to the viewport width
    expect(box!.width).toBeGreaterThan(300);
  });

  test("recipe detail page is usable on mobile", async ({ page }) => {
    await page.goto("/recipes/LentilSoup/");
    await expect(
      page.getByRole("heading", { name: /Lentil Soup/i })
    ).toBeVisible();
    // Ingredients and directions should both still appear
    await expect(
      page.getByRole("heading", { name: /Ingredient/i })
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: /Direction/i })
    ).toBeVisible();
  });

  test("tools page is usable on mobile", async ({ page }) => {
    await page.goto("/tools");
    await expect(
      page.getByRole("heading", { name: "Bean Converter" })
    ).toBeVisible();
  });
});
