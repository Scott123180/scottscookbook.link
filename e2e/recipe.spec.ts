import { test, expect, Page } from "@playwright/test";

/**
 * Recipe detail page tests
 *
 * Uses "Lentil Soup" as the primary fixture recipe because it has an image,
 * an originalLink, a scottRating, and all time fields filled in.
 *
 * Slug derivation: gatsby-source-filesystem root is src/content/,
 * so LentilSoup.md → /recipes/lentil-soup/
 */

const LENTIL_SOUP_URL = "/recipes/lentil-soup/";

// Helper: navigate to Lentil Soup and wait for the heading
async function goToLentilSoup(page: Page) {
  await page.goto(LENTIL_SOUP_URL);
  await expect(page.getByRole("heading", { name: /Lentil Soup/i })).toBeVisible();
}

test.describe("Recipe detail page – structure", () => {
  test.beforeEach(async ({ page }) => {
    await goToLentilSoup(page);
  });

  test("shows the recipe title as a heading", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: /Lentil Soup/i })
    ).toBeVisible();
  });

  test("shows the publication date", async ({ page }) => {
    // Lentil Soup date is October 14, 2021
    await expect(page.getByText(/2021/)).toBeVisible();
  });

  test("renders the recipe image", async ({ page }) => {
    const img = page.locator("img[alt='Lentil Soup']").first();
    await expect(img).toBeVisible();
  });

  test("ingredients section is present", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: /Ingredient/i })
    ).toBeVisible();
  });

  test("directions section is present", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: /Direction/i })
    ).toBeVisible();
  });

  test("at least one ingredient row is rendered", async ({ page }) => {
    // Ingredient rows are rendered inside an ordered or unordered list, or a table-like structure
    const ingredientItems = page.locator(
      '[class*="MuiListItem-root"], [class*="MuiTableRow-root"]'
    );
    const count = await ingredientItems.count();
    expect(count).toBeGreaterThan(0);
  });

  test("at least one direction step is rendered", async ({ page }) => {
    const steps = page.locator("ol li");
    const count = await steps.count();
    expect(count).toBeGreaterThan(0);
  });
});

test.describe("Recipe detail page – meta chips", () => {
  test.beforeEach(async ({ page }) => {
    await goToLentilSoup(page);
  });

  test("shows Total time chip", async ({ page }) => {
    await expect(page.getByText(/Total:/i)).toBeVisible();
  });

  test("shows Prep time chip", async ({ page }) => {
    await expect(page.getByText(/Prep:/i)).toBeVisible();
  });

  test("shows Cook time chip", async ({ page }) => {
    await expect(page.getByText(/Cook:/i)).toBeVisible();
  });

  test("shows the Inspiring Recipe link chip", async ({ page }) => {
    await expect(page.getByText("Inspiring Recipe")).toBeVisible();
  });

  test("Inspiring Recipe chip opens the original link in a new tab", async ({
    page,
    context,
  }) => {
    const [newPage] = await Promise.all([
      context.waitForEvent("page"),
      page.getByText("Inspiring Recipe").click(),
    ]);
    await newPage.waitForLoadState("domcontentloaded");
    expect(newPage.url()).toContain("cookieandkate.com");
    await newPage.close();
  });

  test("Cooking Mode chip is visible and defaults to Off", async ({ page }) => {
    // Clear any persisted state
    await page.evaluate(() => localStorage.removeItem("sc_cooking_mode"));
    await page.reload();
    await expect(page.getByText("Cooking Mode: Off")).toBeVisible();
  });

  test("toggling Cooking Mode chip changes label to On", async ({ page }) => {
    await page.evaluate(() => localStorage.removeItem("sc_cooking_mode"));
    await page.reload();

    const chip = page.locator('[class*="MuiChip-root"]', {
      hasText: "Cooking Mode",
    });
    await chip.click();
    await expect(page.getByText("Cooking Mode: On")).toBeVisible();
  });

  test("Cooking Mode state persists to localStorage", async ({ page }) => {
    await page.evaluate(() => localStorage.removeItem("sc_cooking_mode"));
    await page.reload();

    await page
      .locator('[class*="MuiChip-root"]', { hasText: "Cooking Mode" })
      .click();
    await expect(page.getByText("Cooking Mode: On")).toBeVisible();

    const stored = await page.evaluate(() =>
      localStorage.getItem("sc_cooking_mode")
    );
    expect(stored).toBe("1");
  });

  test("Cooking Mode On persists across page reload", async ({ page }) => {
    // Enable cooking mode
    await page.evaluate(() => localStorage.removeItem("sc_cooking_mode"));
    await page.reload();
    await page
      .locator('[class*="MuiChip-root"]', { hasText: "Cooking Mode" })
      .click();
    await expect(page.getByText("Cooking Mode: On")).toBeVisible();

    // Reload and check it's still on
    await page.reload();
    await expect(page.getByText("Cooking Mode: On")).toBeVisible();
  });

  test("toggling Cooking Mode Off stores 0 in localStorage", async ({
    page,
  }) => {
    // Start with it on
    await page.evaluate(() => localStorage.setItem("sc_cooking_mode", "1"));
    await page.reload();
    await expect(page.getByText("Cooking Mode: On")).toBeVisible();

    // Toggle off
    await page
      .locator('[class*="MuiChip-root"]', { hasText: "Cooking Mode" })
      .click();
    await expect(page.getByText("Cooking Mode: Off")).toBeVisible();

    const stored = await page.evaluate(() =>
      localStorage.getItem("sc_cooking_mode")
    );
    expect(stored).toBe("0");
  });
});

test.describe("Recipe detail page – shopping mode", () => {
  test.beforeEach(async ({ page }) => {
    // Clear cookies/storage so shopping mode starts disabled
    await page.goto(LENTIL_SOUP_URL);
    await page.evaluate(() => {
      document.cookie =
        "sc_shopping_enabled=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
      document.cookie =
        "sc_shopping_provider=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
    });
    await page.reload();
    await expect(page.getByRole("heading", { name: /Lentil Soup/i })).toBeVisible();
  });

  test("Shopping chip is visible and defaults to Disabled", async ({
    page,
  }) => {
    const shoppingChip = page
      .locator('[class*="MuiChip-root"]', { hasText: /Shopping/i })
      .first();
    await expect(shoppingChip).toBeVisible();
    await expect(shoppingChip).toContainText(/Disabled/i);
  });

  test("clicking Shopping chip enables shopping mode", async ({ page }) => {
    const shoppingChip = page
      .locator('[class*="MuiChip-root"]', { hasText: /Shopping/i })
      .first();
    await shoppingChip.click();
    // Should now show a provider name, not "Disabled"
    await expect(shoppingChip).not.toContainText(/Disabled/i);
  });

  test("provider dropdown appears and lists all four providers", async ({
    page,
  }) => {
    // Click the expand (delete) icon on the shopping chip to open the menu
    const expandIcon = page
      .locator('[class*="MuiChip-root"]', { hasText: /Shopping/i })
      .first()
      .locator('[data-testid="ExpandMoreIcon"], [class*="MuiChip-deleteIcon"]')
      .first();
    await expandIcon.click();

    await expect(page.getByRole("menuitem", { name: /Amazon Fresh/i })).toBeVisible();
    await expect(page.getByRole("menuitem", { name: /Instacart/i })).toBeVisible();
    await expect(page.getByRole("menuitem", { name: /Walmart Grocery/i })).toBeVisible();
    await expect(page.getByRole("menuitem", { name: /Whole Foods/i })).toBeVisible();
  });

  test("selecting a provider from the dropdown updates the chip label", async ({
    page,
  }) => {
    // Enable shopping mode first
    const shoppingChip = page
      .locator('[class*="MuiChip-root"]', { hasText: /Shopping/i })
      .first();
    await shoppingChip.click();

    // Open provider menu via expand icon
    const expandIcon = shoppingChip
      .locator('[class*="MuiChip-deleteIcon"]')
      .first();
    await expandIcon.click();

    await page.getByRole("menuitem", { name: /Instacart/i }).click();

    await expect(shoppingChip).toContainText(/Instacart/i);
  });
});

test.describe("Recipe detail page – ingredient table", () => {
  test.beforeEach(async ({ page }) => {
    await goToLentilSoup(page);
  });

  test("ingredient amounts are visible", async ({ page }) => {
    // Lentil Soup has Olive Oil as 0.25 cups — look for numeric amounts
    const amounts = page.locator(
      '[class*="MuiListItem-root"], [class*="MuiTableRow-root"]'
    );
    const count = await amounts.count();
    expect(count).toBeGreaterThan(0);
  });

  test("ingredient names are displayed", async ({ page }) => {
    // "Olive Oil" should appear somewhere on the page
    await expect(page.getByText(/Olive Oil/i)).toBeVisible();
  });
});

test.describe("Recipe pages – general navigation", () => {
  test("navigating from home card to recipe and back works", async ({
    page,
  }) => {
    await page.goto("/");
    const firstCard = page.locator('[class*="MuiCard-root"]').first();
    await firstCard.click();
    // We're on a recipe page — go back
    await page.goBack();
    await expect(page).toHaveURL("/");
    await expect(page.locator('[class*="MuiCard-root"]').first()).toBeVisible();
  });

  test("recipe page has a link back to the home page via the nav", async ({
    page,
  }) => {
    await goToLentilSoup(page);
    const homeLink = page.getByRole("link", { name: /Scott'?s Cookbook|Home/i }).first();
    await homeLink.click();
    await expect(page).toHaveURL("/");
  });
});
