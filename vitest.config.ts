/// <reference types="vitest" />
import { defineConfig } from "vite";

export default defineConfig({
  test: {
    globals: true,
    environment: "node",
    include: ["src/**/*spec.ts"],
    exclude: ["node_modules/**", "build/**"],
    coverage: {
      exclude: ["**/*.js", "vitest.config.ts", "./src/config.ts"],
    },
  },
});
