"use client"

import { ExpenseForm } from "@/components/expenses/ExpenseForm"
import { ExpenseRow } from "@/components/expenses/ExpenseRow"
import { calculateTotalCosts } from "@/features/calculator/calculations"
import type { Expense } from "@/features/calculator/types"
import { formatCurrency } from "@/lib/currency"

export interface ExpenseManagerProps {
  expenses: Expense[]
  onAdd: (input: Omit<Expense, "id">) => void
  onUpdate: (id: string, patch: Partial<Omit<Expense, "id">>) => void
  onRemove: (id: string) => void
}

export function ExpenseManager({
  expenses,
  onAdd,
  onUpdate,
  onRemove,
}: ExpenseManagerProps) {
  return (
    <div className="flex flex-col gap-4">
      <ExpenseForm onAdd={onAdd} />

      {expenses.length > 0 ? (
        <ul className="flex flex-col gap-2">
          {expenses.map((expense) => (
            <li
              key={expense.id}
              className="animate-in duration-200 fade-in slide-in-from-top-2"
            >
              <ExpenseRow
                expense={expense}
                onUpdate={onUpdate}
                onRemove={onRemove}
              />
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-sm text-muted-foreground">
          Los gastos agregados aparecerán aquí.
        </p>
      )}

      <p className="border-t border-border pt-3 text-right text-sm font-medium">
        Costo total:{" "}
        <span className="font-mono tabular-nums">
          {formatCurrency(calculateTotalCosts(expenses))}
        </span>
      </p>
    </div>
  )
}