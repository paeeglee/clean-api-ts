import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["**/*.{test,spec}.ts", "**/*.{test,spec}.tsx"],
    exclude: ["node_modules/**", "dist/**", "build/**", "**/.*/**"],
    environment: "node",
    globals: true,
    coverage: {
      reporter: ["text", "json", "html"],
      exclude: ["node_modules/", "dist/", "**/*.config.*", "**/*.d.ts"],
    },
  },
});
