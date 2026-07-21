import { describe, expect, it } from "vitest"

import {
  buildCalculationResult,
  calculateProfitPerMember,
  calculateRecommendedPrice,
  calculateTotalCosts,
  resolveEconomicGoal,
} from "./calculations"
import type { BudgetState, Expense } from "./types"

/* Gasto de prueba con id/categoría por defecto; se sobrescribe lo relevante. */
function expense(amount: number, overrides: Partial<Expense> = {}): Expense {
  return {
    id: "e1",
    description: "Gasto",
    category: "other",
    amount,
    ...overrides,
  }
}

describe("calculateTotalCosts", () => {
  it("suma el importe de todos los gastos", () => {
    expect(calculateTotalCosts([expense(200), expense(300)])).toBe(500)
  })

  it("sin gastos devuelve 0", () => {
    expect(calculateTotalCosts([])).toBe(0)
  })
})

describe("resolveEconomicGoal", () => {
  it("objetivo total: devuelve el valor tal cual", () => {
    expect(resolveEconomicGoal({ type: "total", value: 900 }, 4)).toBe(900)
  })

  it("objetivo por integrante: multiplica por los integrantes", () => {
    expect(resolveEconomicGoal({ type: "perMember", value: 100 }, 4)).toBe(400)
  })
})

describe("calculateRecommendedPrice", () => {
  it("suma costos y objetivo", () => {
    expect(calculateRecommendedPrice(500, 400)).toBe(900)
  })
})

describe("calculateProfitPerMember", () => {
  it("reparte el objetivo entre los integrantes", () => {
    expect(calculateProfitPerMember(400, 4)).toBe(100)
  })

  it("con members <= 0 devuelve 0", () => {
    expect(calculateProfitPerMember(400, 0)).toBe(0)
  })
})

describe("buildCalculationResult", () => {
  it("ejemplo del doc: 4 int, $200+$300, $100/int → precio $900", () => {
    const state: BudgetState = {
      show: { members: 4, eventName: "Show", eventType: "concierto" },
      expenses: [
        expense(200, {
          id: "t",
          description: "Transporte",
          category: "transport",
        }),
        expense(300, {
          id: "s",
          description: "Sonido",
          category: "production",
        }),
      ],
      goal: { type: "perMember", value: 100 },
    }

    expect(buildCalculationResult(state)).toEqual({
      totalCosts: 500,
      totalGoal: 400,
      recommendedPrice: 900,
      profitPerMember: 100,
    })
  })

  // Medio border case
  it("banda pequeña (1 integrante) con objetivo total y sin gastos", () => {
    const state: BudgetState = {
      show: { members: 1, eventName: "Solo", eventType: "acústico" },
      expenses: [],
      goal: { type: "total", value: 500 },
    }

    expect(buildCalculationResult(state)).toEqual({
      totalCosts: 0,
      totalGoal: 500,
      recommendedPrice: 500,
      profitPerMember: 500,
    })
  })

  it("banda grande (8 integrantes) con objetivo por integrante", () => {
    const state: BudgetState = {
      show: { members: 8, eventName: "Gran show", eventType: "festival" },
      expenses: [expense(1000, { id: "a" }), expense(600, { id: "b" })],
      goal: { type: "perMember", value: 250 },
    }

    expect(buildCalculationResult(state)).toEqual({
      totalCosts: 1600,
      totalGoal: 2000,
      recommendedPrice: 3600,
      profitPerMember: 250,
    })
  })
})
