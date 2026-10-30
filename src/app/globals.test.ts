// @vitest-environment node

import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import tailwindcss from "@tailwindcss/postcss";
import postcss from "postcss";
import { beforeAll, describe, expect, it } from "vitest";

let css: string;

beforeAll(async () => {
  const from = fileURLToPath(new URL("./globals.css", import.meta.url));
  const result = await postcss([tailwindcss({ optimize: false })]).process(
    await readFile(from, "utf8"),
    { from },
  );
  css = result.css;
});

describe("timeline styles", () => {
  it("preserves all eight category colors", () => {
    for (const [name, color] of Object.entries({
      red: "#ef4444",
      teal: "#14b8a6",
      green: "#22c55e",
      yellow: "#eab308",
      pink: "#ec4899",
      purple: "#a855f7",
      orange: "#f97316",
      blue: "#3b82f6",
    })) {
      expect(css).toContain(`--color-${name}-500: ${color}`);
      expect(css).toContain(`.bg-${name}-500`);
    }
  });

  it("generates responsive timeline widths and mobile drawer translation", () => {
    expect(css).toContain("width: 400vw");
    expect(css).toContain("width: 300vw");
    expect(css).toContain("width >= 48rem");
    expect(css).toContain(".translate-y-full");
    expect(css).toContain("--tw-translate-y: 100%");
    expect(css).toContain(
      "translate: var(--tw-translate-x) var(--tw-translate-y)",
    );
  });

  it("keeps the original legend swatch radius and border color", () => {
    expect(css).toContain("--radius-sm: 0.25rem");
    expect(css).toContain("--color-gray-200: #e5e7eb");
    expect(css).toContain("border-color: var(--color-gray-200)");
  });
});
