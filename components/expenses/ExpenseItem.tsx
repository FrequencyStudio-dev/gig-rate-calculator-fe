"use client"

import { useId, useState } from "react"
import { Trash2Icon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { SelectNative } from "@/components/ui/select-native"
import { EXPENSE_CATEGORIES } from "@/features/calculator/constants"
import type { Expense, ExpenseCategory } from "@/features/calculator/types"
import {
  validateExpenseAmount,
  validateExpenseDescription,
} from "@/features/calculator/validation"

export interface ExpenseItemProps {
  expense: Expense
  onUpdate: (id: string, patch: Partial<Omit<Expense, "id">>) => void
  onRemove: (id: string) => void
}

export function ExpenseItem({ expense, onUpdate, onRemove }: ExpenseItemProps) {
  const descriptionId = useId()
  const categoryId = useId()
  const amountId = useId()

  const [touched, setTouched] = useState({
    description: false,
    amount: false,
  })

  const descriptionError = touched.description
    ? validateExpenseDescription(expense.description)
    : null
  const amountError = touched.amount
    ? validateExpenseAmount(expense.amount)
    : null

  return (
    <div className="grid gap-3 rounded-lg border border-border/70 bg-background p-3 transition-colors hover:border-border">
      <div className="grid gap-2">
        <Label htmlFor={descriptionId}>Concepto</Label>
        <Input
          id={descriptionId}
          type="text"
          value={expense.description}
          placeholder="Sonido, traslado, viáticos…"
          aria-invalid={Boolean(descriptionError)}
          aria-describedby={
            descriptionError ? `${descriptionId}-error` : undefined
          }
          onBlur={() => setTouched((prev) => ({ ...prev, description: true }))}
          onChange={(e) =>
            onUpdate(expense.id, { description: e.target.value })
          }
        />
        {descriptionError ? (
          <p
            id={`${descriptionId}-error`}
            role="alert"
            className="animate-in text-sm text-destructive duration-150 fade-in slide-in-from-top-1"
          >
            {descriptionError}
          </p>
        ) : null}
      </div>

      <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
        <div className="grid gap-2">
          <Label htmlFor={categoryId}>Categoría</Label>
          <SelectNative
            id={categoryId}
            value={expense.category}
            onChange={(e) =>
              onUpdate(expense.id, {
                category: e.target.value as ExpenseCategory,
              })
            }
          >
            {EXPENSE_CATEGORIES.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </SelectNative>
        </div>

        <div className="grid gap-2">
          <Label htmlFor={amountId}>Importe</Label>
          <div className="flex items-center gap-2">
            <Input
              id={amountId}
              type="number"
              inputMode="decimal"
              min={0}
              step="0.01"
              value={expense.amount}
              aria-invalid={Boolean(amountError)}
              aria-describedby={amountError ? `${amountId}-error` : undefined}
              onBlur={() => setTouched((prev) => ({ ...prev, amount: true }))}
              onChange={(e) =>
                onUpdate(expense.id, { amount: Number(e.target.value) })
              }
              className="text-right font-mono tabular-nums sm:w-36"
            />

            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label="Eliminar"
              title="Eliminar"
              onClick={() => onRemove(expense.id)}
              className="shrink-0 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
            >
              <Trash2Icon />
            </Button>
          </div>
          {amountError ? (
            <p
              id={`${amountId}-error`}
              role="alert"
              className="animate-in text-sm text-destructive duration-150 fade-in slide-in-from-top-1"
            >
              {amountError}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  )
}
