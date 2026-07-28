import { render, screen, within, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import type { UserEvent } from "@testing-library/user-event"
import { describe, expect, it } from "vitest"

import { BudgetCalculator } from "@/components/BudgetCalculator"
import { formatCurrency } from "@/lib/currency"

function summaryValue(label: string): string {
  const summary = screen.getByRole("region", { name: "Resumen" })
  const term = within(summary).getByText(label)

  return term.nextElementSibling?.textContent ?? ""
}

function expensesSubtotal(): string {
  const expenses = within(screen.getByRole("region", { name: "Gastos" }))

  return expenses.getByText(/^Costo total:/).textContent as string
}

function expenseItem(index: number) {
  return within(screen.getAllByTestId("expense-row")[index])
}

async function fillNumber(
  user: UserEvent,
  field: HTMLElement,
  value: string,
) {
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

    await user.type(screen.getByLabelText("Concepto"), "Transporte")
    await fillNumber(user, screen.getByLabelText("Importe"), "200")

    await user.click(screen.getByRole("button", { name: "Agregar gasto" }))

    await user.type(screen.getByLabelText("Concepto"), "Sonido")
    await fillNumber(user, screen.getByLabelText("Importe"), "300")

    await user.click(screen.getByLabelText("Por integrante"))
    await fillNumber(user, screen.getByLabelText("Ganancia deseada"), "100")

    expect(expensesSubtotal()).toBe(`Costo total: ${formatCurrency(500)}`)
    expect(summaryValue("Costo total")).toBe(formatCurrency(500))
    expect(summaryValue("Ganancia objetivo")).toBe(formatCurrency(400))
    expect(summaryValue("Precio recomendado")).toBe(formatCurrency(900))
    expect(summaryValue("Ganancia por integrante")).toBe(formatCurrency(100))
  })


  it("agrega, edita y elimina gastos, y se ve reflejado en el subtotal", async () => {
    const user = userEvent.setup()
    render(<BudgetCalculator />)

    // Crear primer gasto
    await user.click(screen.getByRole("button", { name: "Agregar gasto" }))

    await user.type(screen.getByLabelText("Concepto"), "Traslado")
    await fillNumber(user, screen.getByLabelText("Importe"), "200")

    await user.click(screen.getByRole("button", { name: "Agregar gasto" }))


    // Crear segundo gasto
    await user.type(screen.getByLabelText("Concepto"), "Sonido")
    await fillNumber(user, screen.getByLabelText("Importe"), "300")

    await user.click(screen.getByRole("button", { name: "Agregar gasto" }))


    expect(expensesSubtotal()).toBe(
      `Costo total: ${formatCurrency(500)}`
    )
      // Editar primer gasto
      await user.click(
        expenseItem(0).getByRole("button", { name: "Editar" }),
      )

      console.log(screen.getAllByLabelText("Concepto").length)
      console.log(screen.getAllByLabelText("Importe").length)

      const concepto = screen.getByLabelText("Concepto")
      const importe = screen.getByLabelText("Importe")

      await user.clear(concepto)
      await user.type(concepto, "Combustible")

      await user.clear(importe)
      await user.type(importe, "250")

      expect(importe).toHaveValue(250)

      await user.click(
        screen.getByRole("button", { name: "Guardar cambios" }),
      )

      screen.debug()

      await waitFor(() => {
        expect(expensesSubtotal()).toBe(
          `Costo total: ${formatCurrency(550)}`
        )
      })

        // Eliminar primer gasto
        await user.click(
          expenseItem(0).getByRole("button", { name: "Eliminar" }),
        )

        expect(expensesSubtotal()).toBe(
          `Costo total: ${formatCurrency(300)}`
        )

        expect(summaryValue("Costo total"))
          .toBe(formatCurrency(300))
      })


  it("alterna el modo de ganancia entre total y por integrante", async () => {
    const user = userEvent.setup()
    render(<BudgetCalculator />)

    expect(screen.getByLabelText("Total")).toBeChecked()

    await user.click(screen.getByLabelText("Por integrante"))

    await fillNumber(user, screen.getByLabelText("Integrantes"), "4")
    await fillNumber(user, screen.getByLabelText("Ganancia deseada"), "400")

    expect(summaryValue("Ganancia objetivo"))
      .toBe(formatCurrency(1600))

    expect(summaryValue("Ganancia por integrante"))
      .toBe(formatCurrency(400))

    await user.click(screen.getByLabelText("Total"))

    expect(summaryValue("Ganancia objetivo"))
      .toBe(formatCurrency(400))

    expect(screen.queryByLabelText("Integrantes"))
      .toBeNull()
  })
})


describe("BudgetCalculator · validación", () => {

  it("marca error y aria-invalid al dejar Integrantes en un valor inválido", async () => {
    const user = userEvent.setup()
    render(<BudgetCalculator />)

    await user.click(screen.getByLabelText("Por integrante"))

    await fillNumber(
      user,
      screen.getByLabelText("Integrantes"),
      "0",
    )

    const show = within(
      screen.getByRole("region", { name: "Datos del show" }),
    )

    expect(show.getByRole("alert"))
      .toHaveTextContent(
        "Debe haber al menos un integrante.",
      )

    expect(screen.getByLabelText("Integrantes"))
      .toHaveAttribute(
        "aria-invalid",
        "true",
      )
  })


  it("muestra los errores de un gasto vacío al salir de cada campo", async () => {
    const user = userEvent.setup()
    render(<BudgetCalculator />)

    await user.click(
      screen.getByRole("button", { name: "Agregar gasto" }),
    )

    const concepto = screen.getByLabelText("Concepto")
    await user.click(concepto)
    await user.tab()

    const importe = screen.getByLabelText("Importe")
    await user.click(importe)
    await user.tab()

    expect(
      screen.getByText("El concepto es obligatorio."),
    ).toBeInTheDocument()

    expect(
      screen.getByText("El importe debe ser mayor a 0."),
    ).toBeInTheDocument()

    expect(concepto)
      .toHaveAttribute("aria-invalid", "true")
  })


  it("marca error al salir de Ganancia deseada sin un valor válido", async () => {
    const user = userEvent.setup()
    render(<BudgetCalculator />)

    const objetivo = within(
      screen.getByRole(
        "region",
        { name: "Objetivo económico" },
      ),
    )

    const value = screen.getByLabelText("Ganancia deseada")

    await user.click(value)
    await user.tab()

    expect(objetivo.getByRole("alert"))
      .toHaveTextContent(
        "El objetivo debe ser mayor que 0.",
      )

    expect(value)
      .toHaveAttribute(
        "aria-invalid",
        "true",
      )
  })


  it("el aviso de datos incompletos desaparece al completar los datos mínimos", async () => {
    const user = userEvent.setup()
    render(<BudgetCalculator />)

    expect(
      screen.getByRole("status"),
    ).toBeInTheDocument()


    await fillNumber(
      user,
      screen.getByLabelText("Ganancia deseada"),
      "100",
    )


    await waitFor(() => {
      expect(
        screen.queryByRole("status"),
      ).toBeNull()
    })


    await user.click(
      screen.getByRole("button", { name: "Agregar gasto" }),
    )

    expect(
      screen.queryByRole("status"),
    ).toBeNull()
  })
})