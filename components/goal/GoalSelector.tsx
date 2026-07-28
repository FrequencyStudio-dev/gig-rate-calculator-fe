"use client"

import { useEffect, useId, useState } from "react"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import type { Goal, GoalType } from "@/features/calculator/types"
import { validateGoalValue } from "@/features/calculator/validation"

export interface GoalSelectorProps {
  goal: Goal
  members: number
  onGoalChange: (patch: Partial<Goal>) => void
  onMembersChange: (members: number) => void
}

export function GoalSelector({
  goal,
  members,
  onGoalChange,
  onMembersChange,
}: GoalSelectorProps) {
  const modeLabelId = useId()
  const modeHelpId = useId()
  const totalId = useId()
  const perMemberId = useId()
  const valueId = useId()

  const [inputValue, setInputValue] = useState(
    goal.value === 0 ? "" : String(goal.value)
  )

  const [valueTouched, setValueTouched] = useState(false)
  useEffect(() => {
  setInputValue(goal.value === 0 ? "" : String(goal.value))
}, [goal.value])

  const valueError = valueTouched
    ? validateGoalValue(Number(inputValue))
    : null

  return (
    <div className="flex flex-col gap-4">
      <div className="grid gap-2">
        <span id={modeLabelId} className="text-sm font-medium">
          Modo de ganancia
        </span>

        <RadioGroup
          value={goal.type}
            onValueChange={(value) => {
              const type = value as GoalType

              onGoalChange({ type })

              if (type === "total") {
                onMembersChange(1)
              }
            }}
            aria-labelledby={modeLabelId}
            aria-describedby={modeHelpId}
            className="grid-cols-2"
          >
          <Label
            htmlFor={totalId}
            className="cursor-pointer rounded-lg border border-input bg-secondary p-4 transition-colors hover:bg-accent/50 has-focus-visible:border-ring has-focus-visible:ring-3 has-focus-visible:ring-ring/50 has-aria-checked:border-primary has-aria-checked:bg-accent has-aria-checked:font-medium has-aria-checked:text-accent-foreground md:p-3"
          >
            <RadioGroupItem id={totalId} value="total" />
            Total
          </Label>

          <Label
            htmlFor={perMemberId}
            className="cursor-pointer rounded-lg border border-input bg-secondary p-4 transition-colors hover:bg-accent/50 has-focus-visible:border-ring has-focus-visible:ring-3 has-focus-visible:ring-ring/50 has-aria-checked:border-primary has-aria-checked:bg-accent has-aria-checked:font-medium has-aria-checked:text-accent-foreground md:p-3"
          >
            <RadioGroupItem id={perMemberId} value="perMember" />
            Por integrante
          </Label>
        </RadioGroup>

        <p id={modeHelpId} className="text-sm text-muted-foreground">
            Indica si la ganancia deseada corresponde al total del show o a cada integrante.
        </p>
      </div>

      <div className="grid gap-2">
        <Label htmlFor={valueId}>Ganancia deseada</Label>

        <Input
          id={valueId}
          type="number"
          inputMode="decimal"
          min={0}
          step="0.01"
          value={inputValue}
          aria-invalid={Boolean(valueError)}
          aria-describedby={valueError ? `${valueId}-error` : undefined}
          onBlur={() => {
            setValueTouched(true)
           onGoalChange({ value: Number(inputValue) })
          }}
          onChange={(e) => {
            setInputValue(e.target.value)
          }}
          className="font-mono tabular-nums"
        />

        {valueError ? (
          <p
            id={`${valueId}-error`}
            role="alert"
            className="animate-in text-sm text-destructive duration-150 fade-in slide-in-from-top-1"
          >
            {valueError}
          </p>
        ) : null}
      </div>
    </div>
  )
}