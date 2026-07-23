"use client"

import { PlusIcon } from "lucide-react"

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
  return (
    <div className="flex flex-col gap-4">
      {expenses.length === 0 ? (
        <p className="text-sm">Sin gastos todavía.</p>
      ) : (
        <ul className="flex flex-col gap-4">
          {expenses.map((expense) => (
            <li key={expense.id}>
              <ExpenseItem
                expense={expense}
                onUpdate={onUpdate}
                onRemove={onRemove}
              />
            </li>
          ))}
        </ul>
      )}

      <Button
        type="button"
        onClick={() =>
          onAdd({
            description: "",
            category: DEFAULT_EXPENSE_CATEGORY,
            amount: 0,
          })
        }
        className="self-start"
      >
        <PlusIcon />
        Agregar gasto
      </Button>

      <p className="text-sm font-medium">
        Costo total: {formatCurrency(calculateTotalCosts(expenses))}
      </p>
    </div>
  )
}
