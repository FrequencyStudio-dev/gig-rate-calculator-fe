/**
 * Se carga antes de cada archivo de test (setupFiles en vitest.config.mts).
 *
 * Aporta los matchers de jest-dom (toBeInTheDocument, toHaveTextContent, ...)
 * y limpia el DOM entre tests para que no se filtre estado de uno a otro.
 */

import "@testing-library/jest-dom/vitest"
import { cleanup } from "@testing-library/react"
import { afterEach } from "vitest"

afterEach(() => {
  cleanup()
})
