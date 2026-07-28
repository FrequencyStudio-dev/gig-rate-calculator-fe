"use client"

// Este componente funciona como el contenedor de la calculadora y es el conector entre los cálculos, el estado y la UI

import { ExpenseManager } from "@/components/expenses/ExpenseManager"
import { GoalSelector } from "@/components/goal/GoalSelector"
import { ShowInfo } from "@/components/show-info/ShowInfo"
import { Button } from "@/components/ui/button"
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
    resetBudget,
  } = useBudget()

  const result = buildCalculationResult(state)

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-start lg:gap-8">
      <div className="flex flex-col gap-6">
        <section aria-label="Datos del show">
          <Card>
            <CardHeader>
              <CardTitle asChild>
                <h2>Datos del show</h2>
              </CardTitle>
              <CardDescription>
                Completa la información general del show para realizar el cálculo.
              </CardDescription>
            </CardHeader>
            <CardContent>
             <ShowInfo
                show={state.show}
                showMembers={state.goal.type === "perMember"}
                onChange={setShowInfo}/>
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
                Define la ganancia que deseas obtener una vez cubiertos todos los costos del show.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <GoalSelector
              goal={state.goal}
              members={state.show.members}
              onGoalChange={setGoal}
              onMembersChange={(members) => setShowInfo({ members })}/>
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
                Registra todos los costos asociados al show.
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
      </div>
      <section aria-label="Resumen" className="lg:sticky lg:top-24">
        <Card className="bg-primary/5 ring-primary/20">
          <CardHeader>
            <CardTitle asChild>
              <h2>Resumen</h2>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <SummaryCard
              result={result}
              goalType={state.goal.type}
              isIncomplete={hasIncompleteData(state)}
            />           
          </CardContent>
        </Card>
        <Button
          type="button"
          onClick={resetBudget}
          className="mt-4 px-4 py-2"
        >
          Nuevo presupuesto
        </Button>
      </section>
    </div>
  )
}
