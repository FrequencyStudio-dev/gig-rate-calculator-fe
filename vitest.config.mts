import { defineConfig } from "vitest/config"
import react from "@vitejs/plugin-react"

export default defineConfig({
  plugins: [react()],
  resolve: {
    // Resuelve el alias "@/*" de tsconfig.json dentro de los tests.
    // El doc de Next recomienda el plugin vite-tsconfig-paths, pero Vite 8
    // trae esto de serie y el propio Vite avisa de que el plugin ya sobra.
    tsconfigPaths: true,
  },
  test: {
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    globals: false,
    coverage: {
      provider: "v8",
      // El objetivo de cobertura es el dominio puro, no la UI ni el scaffold.
      include: ["features/**/*.ts", "hooks/**/*.ts"],
    },
  },
})
