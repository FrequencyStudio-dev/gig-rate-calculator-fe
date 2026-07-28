"use client"

import { useId, useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { SelectNative } from "@/components/ui/select-native"
import {
  DEFAULT_EXPENSE_CATEGORY,
  EXPENSE_CATEGORIES,
} from "@/features/calculator/constants"
import type { Expense, ExpenseCategory } from "@/features/calculator/types"
import {
  validateExpenseAmount,
  validateExpenseDescription,
} from "@/features/calculator/validation"

type ExpenseFormState = {
  category: ExpenseCategory
  description: string
  amount: string
}
export interface ExpenseFormProps {
  onAdd: (expense: Omit<Expense, "id">) => void
}

const INITIAL_FORM = {
  category: DEFAULT_EXPENSE_CATEGORY,
  description: "",
  amount: "",
}

export function ExpenseForm({ onAdd }: ExpenseFormProps) {
  const descriptionId = useId()
  const categoryId = useId()
  const amountId = useId()

  const [form, setForm] = useState <ExpenseFormState>(INITIAL_FORM)

  const [touched, setTouched] = useState({
    description: false,
    amount: false,
  })

  const descriptionError = touched.description
    ? validateExpenseDescription(form.description)
    : null

  const amountError = touched.amount
    ? validateExpenseAmount(Number(form.amount))
    : null

  const handleAdd = () => {
    const hasErrors =
      validateExpenseDescription(form.description) ||
      validateExpenseAmount(Number(form.amount))

    if (hasErrors) {
      setTouched({
        description: true,
        amount: true,
      })
      return
    }

    onAdd({
      category: form.category,
      description: form.description,
      amount: Number(form.amount),
    })

    setForm(INITIAL_FORM)

    setTouched({
      description: false,
      amount: false,
    })
  }

  return (
    <div className="grid gap-3 rounded-lg border border-border/70 bg-background p-3 transition-colors hover:border-border">
      <div className="grid gap-2">
        <Label htmlFor={categoryId}>Categoría</Label>

        <SelectNative
          id={categoryId}
          value={form.category}
          onChange={(e) =>
            setForm((prev) => ({
              ...prev,
              category: e.target.value as ExpenseCategory,
            }))
          }
        >
          {EXPENSE_CATEGORIES.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </SelectNative>
      </div>

      <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
        <div className="grid gap-2">
          <Label htmlFor={descriptionId}>Concepto</Label>

          <Input
            id={descriptionId}
            type="text"
            value={form.description}
            placeholder="Sonido, traslado, viáticos…"
            aria-invalid={Boolean(descriptionError)}
            aria-describedby={
              descriptionError ? `${descriptionId}-error` : undefined
            }
            onBlur={() =>
              setTouched((prev) => ({
                ...prev,
                description: true,
              }))
            }
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                description: e.target.value,
              }))
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

        <div className="grid gap-2">
          <Label htmlFor={amountId}>Importe</Label>

          <Input
            id={amountId}
            type="number"
            inputMode="decimal"
            min={0}
            step="0.01"
            value={form.amount}
            aria-invalid={Boolean(amountError)}
            aria-describedby={
              amountError ? `${amountId}-error` : undefined
            }
            onBlur={() =>
              setTouched((prev) => ({
                ...prev,
                amount: true,
              }))
            }
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                amount: e.target.value,
              }))
            }
            className="text-right font-mono tabular-nums sm:w-36"
          />
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
      <Button type="button" onClick={handleAdd}>
        Agregar gasto
      </Button>
    </div>
  )
}