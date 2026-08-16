import { test, expect } from "@playwright/test";

/**
 * Tools page – Bean Converter tests
 *
 * Covers: page load, system toggle, bean selection, style toggle,
 * quantity input, unit toggle (imperial/metric), canned weight-only restriction,
 * validation alert, result chips, and conversion table.
 */

test.describe("Tools page – Bean Converter", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/tools");
    await expect(
      page.getByRole("heading", { name: "Bean Converter" })
    ).toBeVisible();
  });

  // ── Smoke ───────────────────────────────────────────────────────────────

  test("page title includes Tools or Cookbook", async ({ page }) => {
    await expect(page).toHaveTitle(/Tools|Cookbook/i);
  });

  test("Bean Converter heading is visible", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: "Bean Converter" })
    ).toBeVisible();
  });

  test("shows a description paragraph", async ({ page }) => {
    await expect(
      page.getByText(/Convert between dried, cooked, and canned/i)
    ).toBeVisible();
  });

  // ── Initial validation state ─────────────────────────────────────────────

  test("shows info alert before any input is provided", async ({ page }) => {
    await expect(
      page.getByText(
        /Select a bean, choose style, enter a quantity, and pick a unit/i
      )
    ).toBeVisible();
  });

  // ── System toggle ────────────────────────────────────────────────────────

  test("Imperial toggle is selected by default", async ({ page }) => {
    const imperialBtn = page.getByRole("button", { name: /Imperial/i });
    await expect(imperialBtn).toHaveAttribute("aria-pressed", "true");
  });

  test("clicking Metric toggle switches to metric system", async ({ page }) => {
    const metricBtn = page.getByRole("button", { name: /Metric/i });
    await metricBtn.click();
    await expect(metricBtn).toHaveAttribute("aria-pressed", "true");
  });

  // ── Bean autocomplete ────────────────────────────────────────────────────

  test("bean autocomplete is visible", async ({ page }) => {
    const beanInput = page.getByLabel("Bean / Legume Type");
    await expect(beanInput).toBeVisible();
  });

  test("bean autocomplete dropdown lists all six beans", async ({ page }) => {
    const beanInput = page.getByLabel("Bean / Legume Type");
    await beanInput.click();

    // "Black" is a substring of "Black-Eyed Peas", so it needs an anchored
    // regex — otherwise both options match and Playwright's strict mode
    // rejects the locator as ambiguous.
    const expectedBeans = [
      /^Black$/i,
      /Chickpeas/i,
      /Pinto/i,
      /Kidney/i,
      /Cannellini/i,
      /Black-Eyed Peas/i,
    ];
    for (const name of expectedBeans) {
      await expect(page.getByRole("option", { name })).toBeVisible();
    }
  });

  test("selecting a bean from the autocomplete fills the input", async ({
    page,
  }) => {
    const beanInput = page.getByLabel("Bean / Legume Type");
    await beanInput.click();
    await page.getByRole("option", { name: /Black$/i }).click();
    await expect(beanInput).toHaveValue(/Black/i);
  });

  // ── Style toggle ─────────────────────────────────────────────────────────

  test("Dried, Canned, Cooked style buttons are visible", async ({ page }) => {
    await expect(page.getByRole("button", { name: /Dried/i })).toBeVisible();
    await expect(page.getByRole("button", { name: /Canned/i })).toBeVisible();
    await expect(page.getByRole("button", { name: /Cooked/i })).toBeVisible();
  });

  test("clicking Canned shows weight-only notice", async ({ page }) => {
    await page.getByRole("button", { name: /Canned/i }).click();
    await expect(
      page.getByText(/Canned conversions are weight-based only/i)
    ).toBeVisible();
  });

  test("clicking Dried hides weight-only notice", async ({ page }) => {
    await page.getByRole("button", { name: /Canned/i }).click();
    await expect(
      page.getByText(/Canned conversions are weight-based only/i)
    ).toBeVisible();

    await page.getByRole("button", { name: /Dried/i }).click();
    await expect(
      page.getByText(/Canned conversions are weight-based only/i)
    ).not.toBeVisible();
  });

  // ── Unit toggle – Imperial ────────────────────────────────────────────────

  test("imperial units include oz, cups, fl oz for non-canned styles", async ({
    page,
  }) => {
    await page.getByRole("button", { name: /Dried/i }).click();
    await expect(page.getByRole("button", { name: /^oz$/i })).toBeVisible();
    await expect(page.getByRole("button", { name: /cups/i })).toBeVisible();
    await expect(page.getByRole("button", { name: /fl oz/i })).toBeVisible();
  });

  test("canned style restricts imperial to oz only (no cups or fl oz)", async ({
    page,
  }) => {
    await page.getByRole("button", { name: /Canned/i }).click();
    // Only 'oz' should remain in the Unit group
    await expect(page.getByRole("button", { name: /^oz$/i })).toBeVisible();
    await expect(
      page.getByRole("button", { name: /cups/i })
    ).not.toBeVisible();
    await expect(
      page.getByRole("button", { name: /fl oz/i })
    ).not.toBeVisible();
  });

  // ── Unit toggle – Metric ──────────────────────────────────────────────────

  test("metric units include g and mL for non-canned styles", async ({
    page,
  }) => {
    await page.getByRole("button", { name: /Metric/i }).click();
    await page.getByRole("button", { name: /Dried/i }).click();
    await expect(page.getByRole("button", { name: /^g$/i })).toBeVisible();
    await expect(page.getByRole("button", { name: /mL/i })).toBeVisible();
  });

  test("canned + metric restricts to grams only (no mL)", async ({ page }) => {
    await page.getByRole("button", { name: /Metric/i }).click();
    await page.getByRole("button", { name: /Canned/i }).click();
    await expect(page.getByRole("button", { name: /^g$/i })).toBeVisible();
    await expect(page.getByRole("button", { name: /mL/i })).not.toBeVisible();
  });

  // ── Quantity input ───────────────────────────────────────────────────────

  test("quantity input is visible and accepts numbers", async ({ page }) => {
    const qty = page.getByLabel("Quantity");
    await expect(qty).toBeVisible();
    await qty.fill("2");
    await expect(qty).toHaveValue("2");
  });

  test("quantity input does not accept negative values (min=0)", async ({
    page,
  }) => {
    const qty = page.getByLabel("Quantity");
    await qty.fill("-1");
    // The HTML min=0 constraint prevents invalid submission; the result should still not appear
    await expect(
      page.getByText(/Select a bean, choose style/i)
    ).toBeVisible();
  });

  // ── Full conversion flow ─────────────────────────────────────────────────

  async function fillAllInputs(page: import("@playwright/test").Page) {
    // Select Black beans
    const beanInput = page.getByLabel("Bean / Legume Type");
    await beanInput.click();
    await page.getByRole("option", { name: /Black$/i }).click();
    // Select Dried style
    await page.getByRole("button", { name: /Dried/i }).click();
    // Enter quantity
    await page.getByLabel("Quantity").fill("1");
    // Unit auto-selects; leave as default (oz or first available)
  }

  test("info alert disappears after all inputs are filled", async ({
    page,
  }) => {
    await fillAllInputs(page);
    await expect(
      page.getByText(/Select a bean, choose style/i)
    ).not.toBeVisible();
  });

  test("result chips appear after filling all inputs", async ({ page }) => {
    await fillAllInputs(page);
    await expect(page.getByText(/Cooked:/i)).toBeVisible();
    await expect(page.getByText(/Canned:/i)).toBeVisible();
    await expect(page.getByText(/Dried:/i)).toBeVisible();
  });

  test("conversion table appears with all 13 rows after filling inputs", async ({
    page,
  }) => {
    await fillAllInputs(page);

    const expectedRows = [
      "Cooked (g)",
      "Cooked (ml)",
      "Cooked (cups)",
      "Cooked (oz)",
      "Cooked (fl oz)",
      "Dried (g)",
      "Dried (ml)",
      "Dried (cups)",
      "Dried (oz)",
      "Dried (fl oz)",
      "Canned (g)",
      "Canned (oz)",
    ];

    for (const label of expectedRows) {
      await expect(page.getByText(label, { exact: true })).toBeVisible();
    }
  });

  test("data source attribution shows 'Serious Eats' for Black beans", async ({
    page,
  }) => {
    await fillAllInputs(page);
    await expect(page.getByText(/Serious Eats/i)).toBeVisible();
  });

  test("conversion values are numeric (cooked grams is a positive integer)", async ({
    page,
  }) => {
    await fillAllInputs(page);

    // The result chip text: "Cooked: 1049 g (…)"  — pick a cooked-g row from the table
    const cookedGRow = page.locator("tr", { hasText: "Cooked (g)" });
    const valueCell = cookedGRow.locator("td").nth(1);
    const value = parseInt(await valueCell.innerText(), 10);
    expect(value).toBeGreaterThan(0);
  });

  test("switching from Dried to Cooked style changes result values", async ({
    page,
  }) => {
    await fillAllInputs(page); // Dried, 1 oz, Black beans

    const cookedGRow = page.locator("tr", { hasText: "Cooked (g)" });
    const beforeValue = await cookedGRow.locator("td").nth(1).innerText();

    // Switch to Cooked style (1 oz of cooked beans → fewer dried beans)
    await page.getByRole("button", { name: /Cooked/i }).click();
    const afterValue = await cookedGRow.locator("td").nth(1).innerText();

    expect(beforeValue).not.toBe(afterValue);
  });

  test("switching between bean types changes result values", async ({
    page,
  }) => {
    await fillAllInputs(page); // Black beans

    const cookedGRow = page.locator("tr", { hasText: "Cooked (g)" });
    const blackValue = await cookedGRow.locator("td").nth(1).innerText();

    // Switch to Chickpeas
    const beanInput = page.getByLabel("Bean / Legume Type");
    await beanInput.clear();
    await beanInput.click();
    await page.getByRole("option", { name: /Chickpeas/i }).click();

    const chickpeaValue = await cookedGRow.locator("td").nth(1).innerText();
    expect(blackValue).not.toBe(chickpeaValue);
  });

  test("switching Imperial → Metric keeps results visible", async ({
    page,
  }) => {
    await fillAllInputs(page); // Imperial oz

    await page.getByRole("button", { name: /Metric/i }).click();

    // The unit auto-switches to grams; results should still be shown
    await expect(page.getByText(/Cooked:/i)).toBeVisible();
  });
});
