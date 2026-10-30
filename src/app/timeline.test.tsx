import { getByRole, getByText, within } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";
import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { categories } from "@/app/categories";
import { people } from "@/app/people";
import Timeline from "@/app/timeline";

let container: HTMLDivElement;
let root: Root;

beforeEach(() => {
  Object.assign(globalThis, { IS_REACT_ACT_ENVIRONMENT: true });
  container = document.createElement("div");
  document.body.append(container);
  root = createRoot(container);
});

afterEach(async () => {
  await act(async () => root.unmount());
  container.remove();
});

function personBar(name: string) {
  const bar = getByText(container, name).parentElement;
  if (!bar) throw new Error(`Missing timeline bar for ${name}`);
  return bar;
}

describe("timeline", () => {
  it("renders every person using their category color and lifespan", async () => {
    await act(async () => root.render(<Timeline />));

    for (const person of people) {
      const bar = personBar(person.name);
      expect(bar).toHaveClass(categories[person.category].color);
      expect(bar.style.opacity).toBe("1");
      expect(Number.parseFloat(bar.style.width)).toBeGreaterThanOrEqual(0.5);
      expect(Number.parseFloat(bar.style.left)).toBeCloseTo(
        ((person.birthYear - 1440) / (new Date().getFullYear() - 1440)) * 100,
      );
    }
  });

  it("dims other categories and restores them when the category is toggled off", async () => {
    const user = userEvent.setup();
    await act(async () => root.render(<Timeline />));
    const legend = container.querySelector(".mb-4");
    if (!(legend instanceof HTMLElement))
      throw new Error("Missing desktop legend");
    const art = within(legend).getByRole("button", { name: "Art" });
    await act(async () => user.click(art));

    for (const person of people) {
      expect(personBar(person.name).style.opacity).toBe(
        person.category === "Art" ? "1" : "0.5",
      );
    }

    await act(async () => user.click(art));
    for (const person of people)
      expect(personBar(person.name).style.opacity).toBe("1");
  });

  it("opens the mobile drawer, selects a category, and closes without a duplicate transform", async () => {
    const user = userEvent.setup();
    await act(async () => root.render(<Timeline />));
    const close = getByRole(container, "button", {
      name: "Close filter drawer",
    });
    const drawer = close.parentElement?.parentElement;
    if (!drawer) throw new Error("Missing mobile drawer");
    expect(drawer).toHaveClass("translate-y-full");
    expect(drawer.style.transform).toBe("");

    await act(async () =>
      user.click(
        getByRole(container, "button", { name: "Filter by Category" }),
      ),
    );
    expect(drawer).toHaveClass("translate-y-0");
    await act(async () =>
      user.click(within(drawer).getByRole("button", { name: "Science" })),
    );
    expect(drawer).toHaveClass("translate-y-full");

    for (const person of people) {
      expect(personBar(person.name).style.opacity).toBe(
        person.category === "Science" ? "1" : "0.5",
      );
    }

    await act(async () =>
      user.click(
        getByRole(container, "button", { name: "Filter by Category" }),
      ),
    );
    await act(async () => user.click(close));
    expect(drawer).toHaveClass("translate-y-full");
  });
});
