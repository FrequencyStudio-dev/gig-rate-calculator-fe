"use client"

import type { Show } from "@/features/calculator/types"

export interface ShowInfoProps {
  show: Show
  onChange: (patch: Partial<Show>) => void
}

export function ShowInfo({ show, onChange }: ShowInfoProps) {
  return (
    <div className="flex flex-col gap-4">
      <label className="flex flex-col gap-1">
        <span className="text-sm font-medium">Integrantes</span>
        <input
          type="number"
          min={1}
          step={1}
          value={show.members}
          onChange={(e) => onChange({ members: Number(e.target.value) })}
          className="rounded border px-2 py-1"
        />
      </label>

      <label className="flex flex-col gap-1">
        <span className="text-sm font-medium">Nombre del evento</span>
        <input
          type="text"
          value={show.eventName}
          onChange={(e) => onChange({ eventName: e.target.value })}
          className="rounded border px-2 py-1"
        />
      </label>

      <label className="flex flex-col gap-1">
        <span className="text-sm font-medium">Tipo de evento</span>
        <input
          type="text"
          value={show.eventType}
          onChange={(e) => onChange({ eventType: e.target.value })}
          className="rounded border px-2 py-1"
        />
      </label>
    </div>
  )
}
