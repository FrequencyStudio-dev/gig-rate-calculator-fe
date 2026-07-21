/* Fuente única de tipos del dominio */

export type ExpenseCategory =
  "transport" | "equipment" | "production" | "staff" | "other"


export type GoalType = "total" | "perMember"

/** Datos del show. Entidad raíz del cálculo. */
export interface Show {
  members: number
  eventName: string
  eventType: string
}

export interface Expense {
  id: string
  description: string
  category: ExpenseCategory
  amount: number
}

/* Objetivo económico, modelado anidado. */
export interface Goal {
  type: GoalType
  value: number
}

/* Resultado del cálculo. Lo produce buildCalculationResult */
export interface Result {
  totalCosts: number
  totalGoal: number
  recommendedPrice: number
  profitPerMember: number
}

/* Estado del presupuesto: fuente única de la verdad que consume el hook. */
export interface BudgetState {
  show: Show
  expenses: Expense[]
  goal: Goal
}

/* Categoría + su etiqueta UI. Alimenta el array de constants.ts. */
export interface ExpenseCategoryOption {
  value: ExpenseCategory
  label: string
}
