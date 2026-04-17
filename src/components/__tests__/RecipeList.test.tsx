import * as React from "react";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import RecipeList from "../RecipeList";

// ---- helpers ----
function makeEdge(overrides: {
  title: string;
  topic?: string;
  scottRating?: number;
  date?: string;
  totalTime?: string;
  prepTime?: string;
}) {
  const fm = {
    title: overrides.title,
    topic: overrides.topic ?? "",
    scottRating: overrides.scottRating ?? 0,
    date: overrides.date ?? null,
    totalTime: overrides.totalTime ?? null,
    prepTime: overrides.prepTime ?? null,
    image: null,
  };
  return {
    node: {
      id: fm.title,
      fields: { slug: `/recipes/${fm.title.toLowerCase().replace(/\s+/g, "-")}` },
      frontmatter: fm,
    },
  };
}

const SAMPLE_EDGES = [
  makeEdge({ title: "Chicken Soup", topic: "Soup", scottRating: 5, date: "2023-01-15" }),
  makeEdge({ title: "Caesar Salad", topic: "Salad", scottRating: 3, date: "2022-06-01" }),
  makeEdge({ title: "Beef Tacos", topic: "Main Dish", scottRating: 4, date: "2024-03-20" }),
  makeEdge({ title: "Tomato Bisque", topic: "Soup", scottRating: 2, date: "2021-09-10" }),
];

function renderList(edges = SAMPLE_EDGES) {
  return render(<RecipeList data={{ edges }} />);
}

describe("RecipeList", () => {
  describe("rendering", () => {
    it("renders all recipe titles", () => {
      renderList();
      expect(screen.getByText("Chicken Soup")).toBeInTheDocument();
      expect(screen.getByText("Caesar Salad")).toBeInTheDocument();
      expect(screen.getByText("Beef Tacos")).toBeInTheDocument();
      expect(screen.getByText("Tomato Bisque")).toBeInTheDocument();
    });

    it("renders topic chips for each recipe", () => {
      renderList();
      // Each topic appears at least once (in the filter toggles and/or recipe chips)
      expect(screen.getAllByText("Soup").length).toBeGreaterThanOrEqual(2);
      expect(screen.getAllByText("Salad").length).toBeGreaterThanOrEqual(1);
      expect(screen.getAllByText("Main Dish").length).toBeGreaterThanOrEqual(1);
    });

    it("renders 'No recipes found' when given an empty list", () => {
      renderList([]);
      expect(screen.getByText("No recipes found")).toBeInTheDocument();
    });

    it("renders the topic filter toggle buttons", () => {
      renderList();
      expect(screen.getByRole("button", { name: "All" })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "Soup" })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "Salad" })).toBeInTheDocument();
    });
  });

  describe("search filtering", () => {
    it("filters recipes by title (case-insensitive)", async () => {
      renderList();
      const searchBox = screen.getByPlaceholderText("Search recipes…");

      await userEvent.type(searchBox, "chicken");

      expect(screen.getByText("Chicken Soup")).toBeInTheDocument();
      expect(screen.queryByText("Caesar Salad")).not.toBeInTheDocument();
      expect(screen.queryByText("Beef Tacos")).not.toBeInTheDocument();
    });

    it("filters recipes by topic via search", async () => {
      renderList();
      const searchBox = screen.getByPlaceholderText("Search recipes…");

      await userEvent.type(searchBox, "salad");

      expect(screen.getByText("Caesar Salad")).toBeInTheDocument();
      expect(screen.queryByText("Chicken Soup")).not.toBeInTheDocument();
    });

    it("shows 'No recipes found' when search matches nothing", async () => {
      renderList();
      const searchBox = screen.getByPlaceholderText("Search recipes…");

      await userEvent.type(searchBox, "zzznomatch");

      expect(screen.getByText("No recipes found")).toBeInTheDocument();
    });

    it("restores all recipes when search is cleared", async () => {
      renderList();
      const searchBox = screen.getByPlaceholderText("Search recipes…");

      await userEvent.type(searchBox, "chicken");
      expect(screen.queryByText("Caesar Salad")).not.toBeInTheDocument();

      await userEvent.clear(searchBox);
      expect(screen.getByText("Caesar Salad")).toBeInTheDocument();
    });
  });

  describe("topic filtering", () => {
    it("filters to only Soup recipes when Soup button is clicked", async () => {
      renderList();
      await userEvent.click(screen.getByRole("button", { name: "Soup" }));

      expect(screen.getByText("Chicken Soup")).toBeInTheDocument();
      expect(screen.getByText("Tomato Bisque")).toBeInTheDocument();
      expect(screen.queryByText("Caesar Salad")).not.toBeInTheDocument();
      expect(screen.queryByText("Beef Tacos")).not.toBeInTheDocument();
    });

    it("shows all recipes again after clicking All", async () => {
      renderList();
      await userEvent.click(screen.getByRole("button", { name: "Soup" }));
      await userEvent.click(screen.getByRole("button", { name: "All" }));

      expect(screen.getByText("Caesar Salad")).toBeInTheDocument();
      expect(screen.getByText("Beef Tacos")).toBeInTheDocument();
    });
  });

  describe("sorting", () => {
    // Helper: open the MUI Select and pick an option
    async function selectSort(optionName: string) {
      // MUI Select renders its trigger as role="button" with aria-haspopup="listbox"
      const trigger = screen.getByRole("button", {
        name: /Rating \(high → low\)/i,
      });
      await userEvent.click(trigger);
      const option = await screen.findByRole("option", { name: optionName });
      await userEvent.click(option);
    }

    it("sorts by rating (highest first) by default", () => {
      renderList();
      const cards = screen.getAllByRole("heading", { level: 6 });
      expect(cards[0]).toHaveTextContent("Chicken Soup"); // rating 5
      expect(cards[1]).toHaveTextContent("Beef Tacos");   // rating 4
    });

    it("sorts by title (A→Z)", async () => {
      renderList();
      await selectSort("Title (A→Z)");

      const cards = screen.getAllByRole("heading", { level: 6 });
      expect(cards[0]).toHaveTextContent("Beef Tacos");    // B
      expect(cards[3]).toHaveTextContent("Tomato Bisque"); // T
    });

    it("sorts by date newest first", async () => {
      renderList();
      await selectSort("Date (newest)");

      const cards = screen.getAllByRole("heading", { level: 6 });
      expect(cards[0]).toHaveTextContent("Beef Tacos");    // 2024
      expect(cards[3]).toHaveTextContent("Tomato Bisque"); // 2021
    });

    it("sorts by date oldest first", async () => {
      renderList();
      await selectSort("Date (oldest)");

      const cards = screen.getAllByRole("heading", { level: 6 });
      expect(cards[0]).toHaveTextContent("Tomato Bisque"); // 2021
      expect(cards[3]).toHaveTextContent("Beef Tacos");    // 2024
    });
  });

  describe("edge cases", () => {
    it("skips edges without frontmatter", () => {
      const edges = [
        ...SAMPLE_EDGES,
        { node: { id: "bad", fields: { slug: "/bad" }, frontmatter: null } },
      ];
      renderList(edges as any);
      // Should render the 4 good ones without crashing
      expect(screen.getByText("Chicken Soup")).toBeInTheDocument();
    });

    it("handles recipes without a topic gracefully", () => {
      const edges = [makeEdge({ title: "Untopiced Dish" })];
      renderList(edges);
      expect(screen.getByText("Untopiced Dish")).toBeInTheDocument();
      // No topic filter toggles (only "All" if no topics exist)
      // The toggle group only renders when topics.length > 1
    });
  });
});
