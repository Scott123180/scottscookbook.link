import { test, expect } from "@playwright/test";

/**
 * Home page (RecipeList) tests
 *
 * Covers: page load, banner, recipe card rendering, search, topic filter,
 * sort order, empty-state, and card navigation.
 */

test.describe("Home page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  // ── Smoke ─────────────────────────────────────────────────────────────────

  test("loads and shows the site title", async ({ page }) => {
    await expect(page).toHaveTitle(/Scott'?s Cookbook/i);
  });

  test("renders the hero heading", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: "A personal, ad-free cookbook." })
    ).toBeVisible();
  });

  test("renders at least one recipe card", async ({ page }) => {
    const cards = page.locator('[class*="MuiCard-root"]');
    await expect(cards.first()).toBeVisible();
    const count = await cards.count();
    expect(count).toBeGreaterThan(1);
  });

  // ── Card content ──────────────────────────────────────────────────────────

  test("recipe cards display a title", async ({ page }) => {
    const firstTitle = page
      .locator('[class*="MuiCard-root"] [class*="MuiTypography-h6"]')
      .first();
    await expect(firstTitle).not.toBeEmpty();
  });

  test("recipe cards display time chips", async ({ page }) => {
    // At least one card should have a total-time chip
    const timeChip = page
      .locator('[class*="MuiChip-root"]', { hasText: /min|hour/i })
      .first();
    await expect(timeChip).toBeVisible();
  });

  test("recipe cards show a star rating component", async ({ page }) => {
    const rating = page.locator('[class*="MuiRating-root"]').first();
    await expect(rating).toBeVisible();
  });

  test("cards with no image show the fallback frying-pan emoji", async ({
    page,
  }) => {
    const fallback = page
      .locator('[role="img"][aria-label="frying pan"]')
      .first();
    // Only assert if at least one exists — not all cards may be imageless
    const count = await fallback.count();
    if (count > 0) {
      await expect(fallback).toBeVisible();
    }
  });

  // ── Search ────────────────────────────────────────────────────────────────

  test("search box is visible and accepts input", async ({ page }) => {
    const search = page.getByPlaceholder("Search title, ingredient, or step…");
    await expect(search).toBeVisible();
    await search.fill("lentil");
    await expect(search).toHaveValue("lentil");
  });

  test("search filters recipes by title (case-insensitive)", async ({
    page,
  }) => {
    const search = page.getByPlaceholder("Search title, ingredient, or step…");
    await search.fill("Mjadra");

    const cards = page.locator('[class*="MuiCard-root"]');
    const count = await cards.count();
    for (let i = 0; i < count; i++) {
      const text = await cards.nth(i).innerText();
      expect(text.toLowerCase()).toContain("mjadra");
    }
  });

  test("search matches recipes by ingredient name even when the ingredient isn't in the title", async ({
    page,
  }) => {
    const search = page.getByPlaceholder("Search title, ingredient, or step…");
    await search.fill("lentil");

    const cards = page.locator('[class*="MuiCard-root"]');
    await expect(cards.first()).toBeVisible();
    const titles = await page.locator('[class*="MuiCard-root"] h6').allInnerTexts();
    expect(titles.some((t) => !t.toLowerCase().includes("lentil"))).toBe(true);
  });

  test("search by topic keyword shows matching cards", async ({ page }) => {
    const search = page.getByPlaceholder("Search title, ingredient, or step…");
    await search.fill("Soup");

    const cards = page.locator('[class*="MuiCard-root"]');
    await expect(cards.first()).toBeVisible();
  });

  test("empty state message appears when search has no matches", async ({
    page,
  }) => {
    const search = page.getByPlaceholder("Search title, ingredient, or step…");
    await search.fill("xyzzy_no_recipe_matches_this");

    await expect(page.getByText("No recipes found")).toBeVisible();
    await expect(
      page.getByText("Try clearing filters or searching a different term.")
    ).toBeVisible();
  });

  test("clearing the search restores the full recipe list", async ({
    page,
  }) => {
    const search = page.getByPlaceholder("Search title, ingredient, or step…");
    // Wait for the initial card render before counting, so a slow first
    // paint (seen on Firefox) doesn't get read as "zero cards".
    await expect(page.locator('[class*="MuiCard-root"]').first()).toBeVisible();
    const cardsBefore = await page
      .locator('[class*="MuiCard-root"]')
      .count();

    await search.fill("zzznomatch");
    await expect(page.getByText("No recipes found")).toBeVisible();

    await search.clear();
    const cardsAfter = await page.locator('[class*="MuiCard-root"]').count();
    expect(cardsAfter).toBe(cardsBefore);
  });

  // ── Topic filter ──────────────────────────────────────────────────────────

  test("topic toggle button group is visible", async ({ page }) => {
    const allBtn = page.getByRole("button", { name: /^All$/i });
    await expect(allBtn).toBeVisible();
  });

  test("clicking a topic filter button shows only that topic's recipes", async ({
    page,
  }) => {
    // Find a topic button that isn't "All"
    const topicButtons = page.locator('[class*="MuiToggleButton-root"]');
    const count = await topicButtons.count();
    // Skip "All" (index 0) and click the first real topic
    if (count > 1) {
      const topicBtn = topicButtons.nth(1);
      const topicName = (await topicBtn.innerText()).trim();
      await topicBtn.click();

      // Every visible card's topic chip should match
      const topicChips = page.locator(
        '[class*="MuiCard-root"] [class*="MuiChip-root"]:not([class*="MuiChip-outlined"])'
      );
      const chipCount = await topicChips.count();
      for (let i = 0; i < chipCount; i++) {
        const chipText = (await topicChips.nth(i).innerText()).trim();
        expect(chipText).toBe(topicName);
      }
    }
  });

  test("clicking All after a topic filter restores the full list", async ({
    page,
  }) => {
    const topicButtons = page.locator('[class*="MuiToggleButton-root"]');
    const totalBefore = await page.locator('[class*="MuiCard-root"]').count();

    if ((await topicButtons.count()) > 1) {
      await topicButtons.nth(1).click();
      await topicButtons.nth(0).click(); // "All"

      const totalAfter = await page.locator('[class*="MuiCard-root"]').count();
      expect(totalAfter).toBe(totalBefore);
    }
  });

  // ── Sort ──────────────────────────────────────────────────────────────────

  test("sort dropdown is visible with default Rating option", async ({
    page,
  }) => {
    const select = page.locator('[class*="MuiSelect-select"]');
    await expect(select).toBeVisible();
    await expect(select).toContainText(/Rating/i);
  });

  test("sort by Title A→Z orders cards alphabetically", async ({ page }) => {
    const select = page.locator('[class*="MuiSelect-select"]');
    await select.click();
    await page.getByRole("option", { name: "Title (A→Z)" }).click();

    const titles = await page
      .locator('[class*="MuiCard-root"] [class*="MuiTypography-h6"]')
      .allInnerTexts();

    const sorted = [...titles].sort((a, b) =>
      a.toLowerCase().localeCompare(b.toLowerCase())
    );
    expect(titles).toEqual(sorted);
  });

  test("sort by Date (newest) is selectable", async ({ page }) => {
    const select = page.locator('[class*="MuiSelect-select"]');
    await select.click();
    await page.getByRole("option", { name: "Date (newest)" }).click();
    await expect(select).toContainText(/newest/i);
  });

  test("sort by Date (oldest) is selectable", async ({ page }) => {
    const select = page.locator('[class*="MuiSelect-select"]');
    await select.click();
    await page.getByRole("option", { name: "Date (oldest)" }).click();
    await expect(select).toContainText(/oldest/i);
  });

  // ── Navigation ────────────────────────────────────────────────────────────

  test("clicking a recipe card navigates to its detail page", async ({
    page,
  }) => {
    const firstCard = page.locator('[class*="MuiCard-root"]').first();
    const cardTitle = await firstCard
      .locator('[class*="MuiTypography-h6"]')
      .innerText();

    await firstCard.click();

    // Should no longer be on the home page
    await expect(page).not.toHaveURL("/");
    // The recipe title should appear as a heading on the detail page
    await expect(
      page.getByRole("heading", { name: cardTitle, exact: false })
    ).toBeVisible();
  });
});
