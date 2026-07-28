"use client"

import { useId, useState } from "react"
import { CheckIcon, PencilIcon, Trash2Icon, XIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SelectNative } from "@/components/ui/select-native"
import { EXPENSE_CATEGORIES } from "@/features/calculator/constants"
import type { Expense, ExpenseCategory } from "@/features/calculator/types"
import {
  validateExpenseAmount,
  validateExpenseDescription,
} from "@/features/calculator/validation"
import { formatCurrency } from "@/lib/currency"

export interface ExpenseRowProps {
  expense: Expense
  onUpdate: (
    id: string,
    patch: Partial<Omit<Expense, "id">>
  ) => void
  onRemove: (id: string) => void
}

export function ExpenseRow({
  expense,
  onUpdate,
  onRemove,
}: ExpenseRowProps) {
  const descriptionId = useId()
  const categoryId = useId()
  const amountId = useId()

  const [isEditing, setIsEditing] = useState(false)

  const [draft, setDraft] = useState({
    category: expense.category,
    description: expense.description,
    amount: expense.amount,
  })

  const [touched, setTouched] = useState({
    description: false,
    amount: false,
  })

  const descriptionError = touched.description
    ? validateExpenseDescription(draft.description)
    : null

  const amountError = touched.amount
    ? validateExpenseAmount(draft.amount)
    : null

  const categoryLabel =
    EXPENSE_CATEGORIES.find(
      (category) => category.value === expense.category
    )?.label ?? expense.category

  const startEditing = () => {
    setDraft({
      category: expense.category,
      description: expense.description,
      amount: expense.amount,
    })

    setTouched({
      description: false,
      amount: false,
    })

    setIsEditing(true)
  }

  const cancelEditing = () => {
    setDraft({
      category: expense.category,
      description: expense.description,
      amount: expense.amount,
    })

    setTouched({
      description: false,
      amount: false,
    })

    setIsEditing(false)
  }

  const saveChanges = () => {
    const hasErrors =
      validateExpenseDescription(draft.description) ||
      validateExpenseAmount(draft.amount)

    if (hasErrors) {
      setTouched({
        description: true,
        amount: true,
      })

      return
    }

    onUpdate(expense.id, draft)
    setIsEditing(false)
  }

  if (isEditing) {
    return (
      <div className="grid gap-3 rounded-lg border border-border/70 bg-background p-3">
        <div className="grid gap-2">
          <SelectNative
            id={categoryId}
            value={draft.category}
            onChange={(e) =>
              setDraft((prev) => ({
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
            <Input
              id={descriptionId}
              value={draft.description}
              placeholder="Sonido, traslado, viáticos…"
              aria-invalid={Boolean(descriptionError)}
              onBlur={() =>
                setTouched((prev) => ({
                  ...prev,
                  description: true,
                }))
              }
              onChange={(e) =>
                setDraft((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
            />

            {descriptionError ? (
              <p className="text-sm text-destructive">
                {descriptionError}
              </p>
            ) : null}
          </div>

          <div className="flex items-start gap-2">
            <Input
              id={amountId}
              type="number"
              inputMode="decimal"
              min={0}
              step="0.01"
              value={draft.amount}
              aria-invalid={Boolean(amountError)}
              onBlur={() =>
                setTouched((prev) => ({
                  ...prev,
                  amount: true,
                }))
              }
              onChange={(e) =>
                setDraft((prev) => ({
                  ...prev,
                  amount: Number(e.target.value),
                }))
              }
              className="text-right font-mono tabular-nums sm:w-36"
            />

            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label="Guardar cambios"
              title="Guardar cambios"
              onClick={saveChanges}
            >
              <CheckIcon />
            </Button>

            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label="Cancelar"
              title="Cancelar"
              onClick={cancelEditing}
            >
              <XIcon />
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-between gap-4 border-b border-border py-3">
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="font-medium">{categoryLabel}</span>

          <span className="text-muted-foreground">•</span>

          <span className="truncate text-muted-foreground">
            {expense.description}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <span className="font-mono tabular-nums font-medium">
          {formatCurrency(expense.amount)}
        </span>

        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label="Editar"
          title="Editar"
          onClick={startEditing}
        >
          <PencilIcon />
        </Button>

        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label="Eliminar"
          title="Eliminar"
          onClick={() => onRemove(expense.id)}
          className="text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
        >
          <Trash2Icon />
        </Button>
      </div>
    </div>
  )
}