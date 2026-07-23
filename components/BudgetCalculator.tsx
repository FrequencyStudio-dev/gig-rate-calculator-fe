"use client"

// Este componente funciona como el contenedor de la calculadora y es el conector entre los cálculos, el estado y la UI

import { ExpenseManager } from "@/components/expenses/ExpenseManager"
import { GoalSelector } from "@/components/goal/GoalSelector"
import { ShowInfo } from "@/components/show-info/ShowInfo"
import { SummaryCard } from "@/components/summary/SummaryCard"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { buildCalculationResult } from "@/features/calculator/calculations"
import type { BudgetState } from "@/features/calculator/types"
import {
  validateExpenseAmount,
  validateExpenseDescription,
  validateGoalValue,
  validateMembers,
} from "@/features/calculator/validation"
import { useBudget } from "@/hooks/useBudget"

function hasIncompleteData(state: BudgetState): boolean {
  return (
    validateMembers(state.show.members) !== null ||
    validateGoalValue(state.goal.value) !== null ||
    state.expenses.some(
      (expense) =>
        validateExpenseDescription(expense.description) !== null ||
        validateExpenseAmount(expense.amount) !== null,
    )
  )
}

export function BudgetCalculator() {
  const {
    state,
    setShowInfo,
    addExpense,
    updateExpense,
    removeExpense,
    setGoal,
  } = useBudget()

  const result = buildCalculationResult(state)

  return (
    <>
      <section aria-label="Datos del show">
        <Card>
          <CardHeader>
            <CardTitle asChild>
              <h2>Datos del show</h2>
            </CardTitle>
            <CardDescription>
              Cuántos son y qué van a tocar. Los integrantes reparten la
              ganancia.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ShowInfo show={state.show} onChange={setShowInfo} />
          </CardContent>
        </Card>
      </section>

      <section aria-label="Gastos">
        <Card>
          <CardHeader>
            <CardTitle asChild>
              <h2>Gastos</h2>
            </CardTitle>
            <CardDescription>
              Todo lo que hay que pagar para que el show pase.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ExpenseManager
              expenses={state.expenses}
              onAdd={addExpense}
              onUpdate={updateExpense}
              onRemove={removeExpense}
            />
          </CardContent>
        </Card>
      </section>

      <section aria-label="Objetivo económico">
        <Card>
          <CardHeader>
            <CardTitle asChild>
              <h2>Objetivo económico</h2>
            </CardTitle>
            <CardDescription>
              Cuánto querés que le quede a la banda después de cubrir los
              gastos.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <GoalSelector goal={state.goal} onChange={setGoal} />
          </CardContent>
        </Card>
      </section>

      <section aria-label="Resumen">
        <Card className="bg-primary/5 ring-primary/20">
          <CardHeader>
            <CardTitle asChild>
              <h2>Resumen</h2>
            </CardTitle>
            <CardDescription>
              Esto es lo que tenés que cobrar por el show.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SummaryCard
              result={result}
              isIncomplete={hasIncompleteData(state)}
            />
          </CardContent>
        </Card>
      </section>
    </>
  )
}
