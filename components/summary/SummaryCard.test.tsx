import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { SummaryCard } from "@/components/summary/SummaryCard"
import type { Result } from "@/features/calculator/types"
import { formatCurrency } from "@/lib/currency"

const RESULT: Result = {
  totalCosts: 500,
  totalGoal: 400,
  recommendedPrice: 900,
  profitPerMember: 100,
}

/* Lee el importe de una fila del resumen: el <dd> hermano de su <dt> */
function summaryValue(label: string): string {
  return screen.getByText(label).nextElementSibling?.textContent ?? ""
}

describe("SummaryCard", () => {
  it("muestra los cuatro importes formateados", () => {
    render(<SummaryCard result={RESULT}
      goalType="perMember" 
      isIncomplete={false} 
      />,
    )

    expect(summaryValue("Precio recomendado del show")).toBe(formatCurrency(900))
    expect(summaryValue("Costo total")).toBe(formatCurrency(500))
    expect(summaryValue("Ganancia objetivo")).toBe(formatCurrency(400))
    expect(summaryValue("Ganancia por integrante")).toBe(formatCurrency(100))
  })

  it("anuncia el precio recomendado como zona live (RF03)", () => {
    render(<SummaryCard result={RESULT}
      goalType="perMember" 
      isIncomplete={false} 
      />,
    )

    const price = screen.getByText("Precio recomendado del show").nextElementSibling
    expect(price).toHaveAttribute("aria-live", "polite")
  })

  it("muestra el aviso de datos incompletos cuando isIncomplete", () => {
    render(<SummaryCard result={RESULT}
      goalType="perMember"
      isIncomplete={true} 
      />,
    )

    expect(screen.getByRole("status")).toHaveTextContent(
      /Faltan datos por completar/,
    )
  })

  it("oculta el aviso cuando los datos están completos", () => {
    render(<SummaryCard result={RESULT}
      goalType="perMember"
       isIncomplete={false} 
       />,
      )

    expect(screen.queryByRole("status")).toBeNull()
  })
})

it("oculta la ganancia por integrante en modo total", () => {
  render(
    <SummaryCard
      result={RESULT}
      goalType="total"
      isIncomplete={false}
    />,
  )

  expect(
    screen.queryByText("Ganancia por integrante"),
  ).toBeNull()
})
