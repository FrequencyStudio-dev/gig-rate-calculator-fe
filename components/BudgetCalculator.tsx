"use client"

// Este componente funciona como el contenedor de la calculadora y es el conector entre los cálculos, el estado y la UI

import { ExpenseManager } from "@/components/expenses/ExpenseManager"
import { GoalSelector } from "@/components/goal/GoalSelector"
import { ShowInfo } from "@/components/show-info/ShowInfo"
import { SummaryCard } from "@/components/summary/SummaryCard"
import { buildCalculationResult } from "@/features/calculator/calculations"
import { useBudget } from "@/hooks/useBudget"

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
      <section aria-label="Datos del show" className="flex flex-col gap-3">
        <h2 className="font-medium">Datos del show</h2>
        <ShowInfo show={state.show} onChange={setShowInfo} />
      </section>

      <section aria-label="Gastos" className="flex flex-col gap-3">
        <h2 className="font-medium">Gastos</h2>
        <ExpenseManager
          expenses={state.expenses}
          onAdd={addExpense}
          onUpdate={updateExpense}
          onRemove={removeExpense}
        />
      </section>

      <section aria-label="Objetivo económico" className="flex flex-col gap-3">
        <h2 className="font-medium">Objetivo económico</h2>
        <GoalSelector goal={state.goal} onChange={setGoal} />
      </section>

      <section aria-label="Resumen" className="flex flex-col gap-3">
        <h2 className="font-medium">Resumen</h2>
        <SummaryCard result={result} />
      </section>
    </>
  )
}
