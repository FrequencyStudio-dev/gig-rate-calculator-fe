"use client"

import { PlusIcon, ReceiptTextIcon } from "lucide-react"

import { ExpenseItem } from "@/components/expenses/ExpenseItem"
import { Button } from "@/components/ui/button"
import { calculateTotalCosts } from "@/features/calculator/calculations"
import { DEFAULT_EXPENSE_CATEGORY } from "@/features/calculator/constants"
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
  const addExpense = () =>
    onAdd({
      description: "",
      category: DEFAULT_EXPENSE_CATEGORY,
      amount: 0,
    })

  return (
    <div className="flex flex-col gap-4">
      {expenses.length === 0 ? (
        <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed border-border py-8 text-center">
          <ReceiptTextIcon
            aria-hidden
            className="size-6 text-muted-foreground"
          />
          <div className="flex flex-col gap-1">
            <p className="text-sm font-medium">Sin gastos todavía.</p>
            <p className="text-sm text-muted-foreground">
              Sumá el primero para saber cuánto te cuesta tocar.
            </p>
          </div>
          <Button type="button" variant="outline" onClick={addExpense}>
            <PlusIcon />
            Agregar gasto
          </Button>
        </div>
      ) : (
        <>
          <ul className="flex flex-col gap-3">
            {expenses.map((expense) => (
              <li
                key={expense.id}
                className="animate-in duration-200 fade-in slide-in-from-top-2"
              >
                <ExpenseItem
                  expense={expense}
                  onUpdate={onUpdate}
                  onRemove={onRemove}
                />
              </li>
            ))}
          </ul>

          <Button
            type="button"
            variant="outline"
            onClick={addExpense}
            className="self-start"
          >
            <PlusIcon />
            Agregar gasto
          </Button>
        </>
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
