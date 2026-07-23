const MEMBERS_MESSAGE = "Debe haber al menos un integrante."
const AMOUNT_MESSAGE = "El importe debe ser mayor a 0."
const DESCRIPTION_MESSAGE = "El concepto es obligatorio."
const GOAL_VALUE_MESSAGE = "El objetivo debe ser mayor que 0."

/*Integrantes: entero estricto mayor que 0 */
export function validateMembers(members: number): string | null {
  return Number.isInteger(members) && members > 0 ? null : MEMBERS_MESSAGE
}

/* Importe de un gasto: número finito mayor que 0 */
export function validateExpenseAmount(amount: number): string | null {
  return Number.isFinite(amount) && amount > 0 ? null : AMOUNT_MESSAGE
}

/* Concepto de un gasto: obligatorio  */
export function validateExpenseDescription(description: string): string | null {
  return description.trim().length > 0 ? null : DESCRIPTION_MESSAGE
}

/* Valor del objetivo: número finito mayor que 0 */
export function validateGoalValue(value: number): string | null {
  return Number.isFinite(value) && value > 0 ? null : GOAL_VALUE_MESSAGE
}
