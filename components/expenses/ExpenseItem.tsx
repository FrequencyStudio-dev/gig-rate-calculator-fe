"use client"

import { EXPENSE_CATEGORIES } from "@/features/calculator/constants"
import type { Expense, ExpenseCategory } from "@/features/calculator/types"

export interface ExpenseItemProps {
  expense: Expense
  onUpdate: (id: string, patch: Partial<Omit<Expense, "id">>) => void
  onRemove: (id: string) => void
}

export function ExpenseItem({ expense, onUpdate, onRemove }: ExpenseItemProps) {
  return (
    <div className="flex flex-wrap items-end gap-3">
      <label className="flex flex-col gap-1">
        <span className="text-sm font-medium">Concepto</span>
        <input
          type="text"
          value={expense.description}
          onChange={(e) =>
            onUpdate(expense.id, { description: e.target.value })
          }
          className="rounded border px-2 py-1"
        />
      </label>

      <label className="flex flex-col gap-1">
        <span className="text-sm font-medium">Categoría</span>
        <select
          value={expense.category}
          onChange={(e) =>
            onUpdate(expense.id, {
              category: e.target.value as ExpenseCategory,
            })
          }
          className="rounded border px-2 py-1"
        >
          {EXPENSE_CATEGORIES.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>

      <label className="flex flex-col gap-1">
        <span className="text-sm font-medium">Importe</span>
        <input
          type="number"
          min={0}
          step="0.01"
          value={expense.amount}
          onChange={(e) =>
            onUpdate(expense.id, { amount: Number(e.target.value) })
          }
          className="rounded border px-2 py-1"
        />
      </label>

      <button
        type="button"
        onClick={() => onRemove(expense.id)}
        className="rounded border px-3 py-1 text-sm"
      >
        Eliminar
      </button>
    </div>
  )
}
