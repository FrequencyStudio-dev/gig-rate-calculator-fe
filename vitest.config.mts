import { defineConfig } from "vitest/config"
import react from "@vitejs/plugin-react"

export default defineConfig({
  plugins: [react()],
  resolve: {
    tsconfigPaths: true,
  },
  test: {
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    globals: false,
    coverage: {
      provider: "v8",
      include: [
        "features/**/*.ts",
        "hooks/**/*.ts",
        "components/*.tsx",
        "components/{show-info,expenses,goal,summary}/*.tsx",
      ],
    },
  },
})
