import * as React from "react";
import { render, screen } from "@testing-library/react";
import IngredientTable from "../IngredientTable";

const BASE_INGREDIENTS = [
  {
    name: "black beans",
    amount: 2,
    unit: "cups",
    section: "Beans",
    preparation: ", drained",
    metric: "473 mL",
  },
  {
    name: "olive oil",
    amount: 2,
    unit: "tbsp",
    section: "Beans",
  },
];

describe("IngredientTable", () => {
  describe("rendering", () => {
    it("renders ingredient name", () => {
      render(
        <IngredientTable
          data={BASE_INGREDIENTS}
          shoppingModeToggled={false}
          shoppingProvider="AMAZON_FRESH"
        />
      );
      expect(screen.getByText(/black beans/)).toBeInTheDocument();
      expect(screen.getByText(/olive oil/)).toBeInTheDocument();
    });

    it("renders ingredient amount and unit", () => {
      render(
        <IngredientTable
          data={BASE_INGREDIENTS}
          shoppingModeToggled={false}
          shoppingProvider="AMAZON_FRESH"
        />
      );
      expect(screen.getAllByText("2").length).toBeGreaterThan(0);
      expect(screen.getByText(/cups/)).toBeInTheDocument();
      expect(screen.getByText(/tbsp/)).toBeInTheDocument();
    });

    it("renders preparation text", () => {
      render(
        <IngredientTable
          data={BASE_INGREDIENTS}
          shoppingModeToggled={false}
          shoppingProvider="AMAZON_FRESH"
        />
      );
      expect(screen.getByText(/, drained/)).toBeInTheDocument();
    });

    it("renders metric equivalent in parentheses", () => {
      render(
        <IngredientTable
          data={BASE_INGREDIENTS}
          shoppingModeToggled={false}
          shoppingProvider="AMAZON_FRESH"
        />
      );
      expect(screen.getByText(/473 mL/)).toBeInTheDocument();
    });

    it("renders section header when showHeader is true (default)", () => {
      render(
        <IngredientTable
          data={BASE_INGREDIENTS}
          shoppingModeToggled={false}
          shoppingProvider="AMAZON_FRESH"
        />
      );
      expect(screen.getByText("Beans")).toBeInTheDocument();
    });

    it("hides section header when showHeader is false", () => {
      render(
        <IngredientTable
          data={BASE_INGREDIENTS}
          shoppingModeToggled={false}
          shoppingProvider="AMAZON_FRESH"
          showHeader={false}
        />
      );
      expect(screen.queryByText("Beans")).not.toBeInTheDocument();
    });

    it("returns null for empty ingredient list", () => {
      const { container } = render(
        <IngredientTable
          data={[]}
          shoppingModeToggled={false}
          shoppingProvider="AMAZON_FRESH"
        />
      );
      expect(container.firstChild).toBeNull();
    });
  });

  describe("shopping mode OFF", () => {
    it("does not render shopping cart buttons", () => {
      render(
        <IngredientTable
          data={BASE_INGREDIENTS}
          shoppingModeToggled={false}
          shoppingProvider="AMAZON_FRESH"
        />
      );
      expect(
        screen.queryByRole("link", { name: /shop for/i })
      ).not.toBeInTheDocument();
    });
  });

  describe("shopping mode ON — provider URLs", () => {
    it("links to Amazon Fresh with spaces replaced by +", () => {
      render(
        <IngredientTable
          data={BASE_INGREDIENTS}
          shoppingModeToggled={true}
          shoppingProvider="AMAZON_FRESH"
        />
      );
      const links = screen.getAllByRole("link", { name: /shop for/i });
      expect(links[0]).toHaveAttribute(
        "href",
        expect.stringContaining("amazonfresh")
      );
      // spaces in "black beans" → "black+beans"
      expect(links[0]).toHaveAttribute(
        "href",
        expect.stringContaining("black+beans")
      );
    });

    it("links to Instacart", () => {
      render(
        <IngredientTable
          data={BASE_INGREDIENTS}
          shoppingModeToggled={true}
          shoppingProvider="INSTACART"
        />
      );
      const links = screen.getAllByRole("link", { name: /shop for/i });
      expect(links[0]).toHaveAttribute(
        "href",
        expect.stringContaining("instacart.com")
      );
    });

    it("links to Walmart Grocery", () => {
      render(
        <IngredientTable
          data={BASE_INGREDIENTS}
          shoppingModeToggled={true}
          shoppingProvider="WALMART_GROCERY"
        />
      );
      const links = screen.getAllByRole("link", { name: /shop for/i });
      expect(links[0]).toHaveAttribute(
        "href",
        expect.stringContaining("walmart.com")
      );
    });

    it("links to Whole Foods", () => {
      render(
        <IngredientTable
          data={BASE_INGREDIENTS}
          shoppingModeToggled={true}
          shoppingProvider="WHOLE_FOODS"
        />
      );
      const links = screen.getAllByRole("link", { name: /shop for/i });
      expect(links[0]).toHaveAttribute(
        "href",
        expect.stringContaining("wholefoods")
      );
    });

    it("renders a shopping link for each ingredient", () => {
      render(
        <IngredientTable
          data={BASE_INGREDIENTS}
          shoppingModeToggled={true}
          shoppingProvider="AMAZON_FRESH"
        />
      );
      const links = screen.getAllByRole("link", { name: /shop for/i });
      expect(links).toHaveLength(BASE_INGREDIENTS.length);
    });
  });
});
