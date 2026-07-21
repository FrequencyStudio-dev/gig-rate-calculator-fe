import type { ExpenseCategory, ExpenseCategoryOption, GoalType } from "./types"

/* Categorías fijas del gasto, en orden de aparición en la UI. */
export const EXPENSE_CATEGORIES: ExpenseCategoryOption[] = [
  { value: "transport", label: "Transporte" },
  { value: "equipment", label: "Equipamiento" },
  { value: "production", label: "Producción" },
  { value: "staff", label: "Personal" },
  { value: "other", label: "Otros" },
]

/* Integrantes por defecto de un show nuevo (entero > 0). */
export const DEFAULT_MEMBERS = 1

/* Categoría preseleccionada al crear un gasto. */
export const DEFAULT_EXPENSE_CATEGORY: ExpenseCategory = "other"

/* Modo de objetivo preseleccionado. */
export const DEFAULT_GOAL_TYPE: GoalType = "total"

/* Valor inicial del objetivo (inválido hasta que el usuario lo complete). */
export const DEFAULT_GOAL_VALUE = 0
