"use client"

import { useId, useState } from "react"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import type { Goal, GoalType } from "@/features/calculator/types"
import { validateGoalValue } from "@/features/calculator/validation"

export interface GoalSelectorProps {
  goal: Goal
  onChange: (patch: Partial<Goal>) => void
}

export function GoalSelector({ goal, onChange }: GoalSelectorProps) {
  const modeLabelId = useId()
  const modeHelpId = useId()
  const totalId = useId()
  const perMemberId = useId()
  const valueId = useId()

  const [valueTouched, setValueTouched] = useState(false)
  const valueError = valueTouched ? validateGoalValue(goal.value) : null

  return (
    <div className="flex flex-col gap-4">
      <div className="grid gap-2">
        <span id={modeLabelId} className="text-sm font-medium">
          Modo de ganancia
        </span>

        <RadioGroup
          value={goal.type}
          onValueChange={(value) => onChange({ type: value as GoalType })}
          aria-labelledby={modeLabelId}
          aria-describedby={modeHelpId}
          className="grid-cols-2"
        >
          <Label
            htmlFor={totalId}
            className="cursor-pointer rounded-lg border border-input p-3 transition-colors hover:bg-accent/50 has-aria-checked:border-primary has-aria-checked:bg-accent"
          >
            <RadioGroupItem id={totalId} value="total" />
            Total
          </Label>

          <Label
            htmlFor={perMemberId}
            className="cursor-pointer rounded-lg border border-input p-3 transition-colors hover:bg-accent/50 has-aria-checked:border-primary has-aria-checked:bg-accent"
          >
            <RadioGroupItem id={perMemberId} value="perMember" />
            Por integrante
          </Label>
        </RadioGroup>

        <p id={modeHelpId} className="text-sm text-muted-foreground">
          Elegí si la ganancia deseada es para toda la banda o para cada
          integrante.
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
          value={goal.value}
          aria-invalid={Boolean(valueError)}
          aria-describedby={valueError ? `${valueId}-error` : undefined}
          onBlur={() => setValueTouched(true)}
          onChange={(e) => onChange({ value: Number(e.target.value) })}
          className="font-mono tabular-nums"
        />
        {valueError ? (
          <p
            id={`${valueId}-error`}
            role="alert"
            className="text-sm text-destructive"
          >
            {valueError}
          </p>
        ) : null}
      </div>
    </div>
  )
}
