"use client"

import { useId, useState } from "react"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { Show } from "@/features/calculator/types"
import { validateMembers } from "@/features/calculator/validation"

export interface ShowInfoProps {
  show: Show
  onChange: (patch: Partial<Show>) => void
}

export function ShowInfo({ show, onChange }: ShowInfoProps) {
  const membersId = useId()
  const eventNameId = useId()
  const eventTypeId = useId()
  const [membersTouched, setMembersTouched] = useState(false)
  const membersError = membersTouched ? validateMembers(show.members) : null

  return (
    <div className="flex flex-col gap-4">
      <div className="grid gap-2">
        <Label htmlFor={membersId}>Integrantes</Label>
        <Input
          id={membersId}
          type="number"
          inputMode="numeric"
          min={1}
          step={1}
          value={show.members}
          aria-invalid={Boolean(membersError)}
          aria-describedby={membersError ? `${membersId}-error` : undefined}
          onBlur={() => setMembersTouched(true)}
          onChange={(e) => {
            setMembersTouched(true)
            onChange({ members: Number(e.target.value) })
          }}
          className="font-mono tabular-nums"
        />
        {membersError ? (
          <p
            id={`${membersId}-error`}
            role="alert"
            className="text-sm text-destructive"
          >
            {membersError}
          </p>
        ) : null}
      </div>

      <div className="grid gap-2">
        <Label htmlFor={eventNameId}>Nombre del evento</Label>
        <Input
          id={eventNameId}
          type="text"
          value={show.eventName}
          placeholder="Show en La Trastienda"
          onChange={(e) => onChange({ eventName: e.target.value })}
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor={eventTypeId}>Tipo de evento</Label>
        <Input
          id={eventTypeId}
          type="text"
          value={show.eventType}
          placeholder="Concierto, festival, casamiento…"
          onChange={(e) => onChange({ eventType: e.target.value })}
        />
      </div>
    </div>
  )
}
