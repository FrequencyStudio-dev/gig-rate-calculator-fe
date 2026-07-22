"use client"

import type { Goal } from "@/features/calculator/types"

export interface GoalSelectorProps {
  goal: Goal
  onChange: (patch: Partial<Goal>) => void
}

export function GoalSelector({ goal, onChange }: GoalSelectorProps) {
  return (
    <div className="flex flex-col gap-4">
      <fieldset className="flex flex-col gap-2">
        <legend className="text-sm font-medium">Modo de ganancia</legend>

        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="goalType"
            checked={goal.type === "total"}
            onChange={() => onChange({ type: "total" })}
          />
          <span className="text-sm">Total</span>
        </label>

        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="goalType"
            checked={goal.type === "perMember"}
            onChange={() => onChange({ type: "perMember" })}
          />
          <span className="text-sm">Por integrante</span>
        </label>
      </fieldset>

      <label className="flex flex-col gap-1">
        <span className="text-sm font-medium">Ganancia deseada</span>
        <input
          type="number"
          min={0}
          step="0.01"
          value={goal.value}
          onChange={(e) => onChange({ value: Number(e.target.value) })}
          className="rounded border px-2 py-1"
        />
      </label>
    </div>
  )
}
