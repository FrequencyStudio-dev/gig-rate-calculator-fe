import { render, screen, within } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import type { UserEvent } from "@testing-library/user-event"
import { describe, expect, it } from "vitest"

import { BudgetCalculator } from "@/components/BudgetCalculator"
import { formatCurrency } from "@/lib/currency"

/* Lee un valor del resumen por su etiqueta (el <dd> hermano de su <dt>). */
function summaryValue(label: string): string {
  const summary = screen.getByRole("region", { name: "Resumen" })
  const term = within(summary).getByText(label)

  return term.nextElementSibling?.textContent ?? ""
}

/* Subtotal que muestra ExpenseManager dentro de la sección de gastos. */
function expensesSubtotal(): string {
  const expenses = within(screen.getByRole("region", { name: "Gastos" }))

  return expenses.getByText(/^Costo total:/).textContent as string
}

function expenseItem(index: number) {
  return within(screen.getAllByRole("listitem")[index])
}

/* Los inputs numéricos arrancan en 0. hay que vaciarlos antes de escribir. */
async function fillNumber(user: UserEvent, field: HTMLElement, value: string) {
  await user.clear(field)
  await user.type(field, value)
}

describe("BudgetCalculator", () => {
  it("4 integrantes, $200 + $300 y $100 por integrante → $900", async () => {
    const user = userEvent.setup()
    render(<BudgetCalculator />)

    await fillNumber(user, screen.getByLabelText("Integrantes"), "4")
    await user.type(screen.getByLabelText("Nombre del evento"), "Show en Sala")
    await user.type(screen.getByLabelText("Tipo de evento"), "Concierto")

    await user.click(screen.getByRole("button", { name: "Agregar gasto" }))
    await user.type(expenseItem(0).getByLabelText("Concepto"), "Transporte")
    await user.selectOptions(
      expenseItem(0).getByLabelText("Categoría"),
      "transport",
    )
    await fillNumber(user, expenseItem(0).getByLabelText("Importe"), "200")

    await user.click(screen.getByRole("button", { name: "Agregar gasto" }))
    await user.type(expenseItem(1).getByLabelText("Concepto"), "Sonido")
    await fillNumber(user, expenseItem(1).getByLabelText("Importe"), "300")

    await user.click(screen.getByLabelText("Por integrante"))
    await fillNumber(user, screen.getByLabelText("Ganancia deseada"), "100")

    expect(expensesSubtotal()).toBe(`Costo total: ${formatCurrency(500)}`)
    expect(summaryValue("Costo total")).toBe(formatCurrency(500))
    expect(summaryValue("Ganancia objetivo")).toBe(formatCurrency(400))
    expect(summaryValue("Precio recomendado")).toBe(formatCurrency(900))
    expect(summaryValue("Ganancia por integrante")).toBe(formatCurrency(100))
  })

  it("recalcula el resumen al cambiar cualquier dato", async () => {
    const user = userEvent.setup()
    render(<BudgetCalculator />)

    await fillNumber(user, screen.getByLabelText("Integrantes"), "2")
    await fillNumber(user, screen.getByLabelText("Ganancia deseada"), "1000")

    expect(summaryValue("Precio recomendado")).toBe(formatCurrency(1000))
    expect(summaryValue("Ganancia por integrante")).toBe(formatCurrency(500))

    /* Solo cambia la cantidad de integrantes, el resumen se actualiza solo. */
    await fillNumber(user, screen.getByLabelText("Integrantes"), "4")

    expect(summaryValue("Ganancia por integrante")).toBe(formatCurrency(250))

    /* Y un gasto nuevo mueve el precio recomendado sin tocar nada más. */
    await user.click(screen.getByRole("button", { name: "Agregar gasto" }))
    await fillNumber(user, expenseItem(0).getByLabelText("Importe"), "150")

    expect(summaryValue("Costo total")).toBe(formatCurrency(150))
    expect(summaryValue("Precio recomendado")).toBe(formatCurrency(1150))
  })

  it("agrega, edita y elimina gastos, y se ve reflejado en el subtotal", async () => {
    const user = userEvent.setup()
    render(<BudgetCalculator />)

    expect(screen.getByText("Sin gastos todavía.")).toBeInTheDocument()

    await user.click(screen.getByRole("button", { name: "Agregar gasto" }))
    await user.type(expenseItem(0).getByLabelText("Concepto"), "Traslado")
    await fillNumber(user, expenseItem(0).getByLabelText("Importe"), "200")

    await user.click(screen.getByRole("button", { name: "Agregar gasto" }))
    await fillNumber(user, expenseItem(1).getByLabelText("Importe"), "300")

    expect(expensesSubtotal()).toBe(`Costo total: ${formatCurrency(500)}`)

    await user.clear(expenseItem(0).getByLabelText("Concepto"))
    await user.type(expenseItem(0).getByLabelText("Concepto"), "Combustible")
    await fillNumber(user, expenseItem(0).getByLabelText("Importe"), "250")

    expect(expenseItem(0).getByLabelText("Concepto")).toHaveValue("Combustible")
    expect(expensesSubtotal()).toBe(`Costo total: ${formatCurrency(550)}`)

    await user.click(expenseItem(0).getByRole("button", { name: "Eliminar" }))

    expect(screen.getAllByRole("listitem")).toHaveLength(1)
    expect(expensesSubtotal()).toBe(`Costo total: ${formatCurrency(300)}`)
    expect(summaryValue("Costo total")).toBe(formatCurrency(300))
  })

  it("alterna el modo de ganancia entre total y por integrante", async () => {
    const user = userEvent.setup()
    render(<BudgetCalculator />)

    await fillNumber(user, screen.getByLabelText("Integrantes"), "4")
    await fillNumber(user, screen.getByLabelText("Ganancia deseada"), "400")

    /* Por defecto el objetivo es total. */
    expect(screen.getByLabelText("Total")).toBeChecked()
    expect(summaryValue("Ganancia objetivo")).toBe(formatCurrency(400))
    expect(summaryValue("Ganancia por integrante")).toBe(formatCurrency(100))

    await user.click(screen.getByLabelText("Por integrante"))

    expect(summaryValue("Ganancia objetivo")).toBe(formatCurrency(1600))
    expect(summaryValue("Ganancia por integrante")).toBe(formatCurrency(400))
  })
})
