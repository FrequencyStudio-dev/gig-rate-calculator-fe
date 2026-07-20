/**
 * Smoke test del propio setup de testing.
 *
 * No prueba lógica del proyecto: prueba que las cuatro piezas están enchufadas
 * (jsdom, Testing Library, los matchers de jest-dom y el alias "@/*").
 * Si este test falla, el problema es de configuración, no de código.
 */

import { describe, expect, it } from "vitest"
import { render, screen } from "@testing-library/react"

import { cn } from "@/lib/utils"

function Saludo({ nombre }: { nombre: string }) {
  return <h1 className={cn("text-lg", "font-bold")}>Hola, {nombre}</h1>
}

describe("setup de testing", () => {
  it("renderiza un componente de React en jsdom", () => {
    render(<Saludo nombre="Frequency" />)

    expect(
      screen.getByRole("heading", { level: 1, name: "Hola, Frequency" }),
    ).toBeInTheDocument()
  })

  it("resuelve el alias @/* de tsconfig", () => {
    expect(cn("p-2", "p-4")).toBe("p-4")
  })
})
