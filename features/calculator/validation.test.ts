import { describe, expect, it } from "vitest"

import {
  validateExpenseAmount,
  validateExpenseDescription,
  validateGoalValue,
  validateMembers,
} from "./validation"

describe("validateMembers", () => {
  it("acepta un entero mayor que 0", () => {
    expect(validateMembers(1)).toBe(null)
    expect(validateMembers(4)).toBe(null)
  })

  it("rechaza 0, negativos, decimales y NaN", () => {
    const message = "Debe existir algún integrante"
    expect(validateMembers(0)).toBe(message)
    expect(validateMembers(-1)).toBe(message)
    expect(validateMembers(1.5)).toBe(message)
    expect(validateMembers(NaN)).toBe(message)
  })
})

describe("validateExpenseAmount", () => {
  it("acepta un importe mayor a 0", () => {
    expect(validateExpenseAmount(200)).toBe(null)
  })

  it("rechaza 0, negativos y NaN", () => {
    const message = "El importe debe ser mayor a 0."
    expect(validateExpenseAmount(0)).toBe(message)
    expect(validateExpenseAmount(-50)).toBe(message)
    expect(validateExpenseAmount(NaN)).toBe(message)
  })
})

describe("validateExpenseDescription", () => {
  it("acepta un concepto con texto", () => {
    expect(validateExpenseDescription("Transporte")).toBe(null)
  })

  it("rechaza vacío y solo espacios", () => {
    const message = "El concepto es obligatorio."
    expect(validateExpenseDescription("")).toBe(message)
    expect(validateExpenseDescription("   ")).toBe(message)
  })
})

describe("validateGoalValue", () => {
  it("acepta un valor mayor que 0", () => {
    expect(validateGoalValue(100)).toBe(null)
  })

  it("rechaza 0, negativos y NaN", () => {
    const message = "El objetivo debe ser mayor que 0."
    expect(validateGoalValue(0)).toBe(message)
    expect(validateGoalValue(-10)).toBe(message)
    expect(validateGoalValue(NaN)).toBe(message)
  })
})
