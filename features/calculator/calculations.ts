import type { BudgetState, Expense, Goal, Result } from "./types"

export function calculateTotalCosts(expenses: Expense[]): number {
  return expenses.reduce((total, expense) => total + expense.amount, 0)
}

export function resolveEconomicGoal(goal: Goal, members: number): number {
  return goal.type === "perMember" ? goal.value * members : goal.value
}

export function calculateRecommendedPrice(
  totalCosts: number,
  totalGoal: number,
): number {
  return totalCosts + totalGoal
}

export function calculateProfitPerMember(
  totalGoal: number,
  members: number,
): number {
  return members > 0 ? totalGoal / members : 0
}

export function buildCalculationResult(state: BudgetState): Result {
  const totalCosts = calculateTotalCosts(state.expenses)
  const totalGoal = resolveEconomicGoal(state.goal, state.show.members)
  const recommendedPrice = calculateRecommendedPrice(totalCosts, totalGoal)
  const profitPerMember = calculateProfitPerMember(
    totalGoal,
    state.show.members,
  )

  return { totalCosts, totalGoal, recommendedPrice, profitPerMember }
}
