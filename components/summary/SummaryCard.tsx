import { TriangleAlertIcon } from "lucide-react"

import type { Result } from "@/features/calculator/types"
import { formatCurrency } from "@/lib/currency"

export interface SummaryCardProps {
  result: Result
  /* Hay algún dato inválido: el precio se muestra igual, pero con reservas. */
  isIncomplete: boolean
}

export function SummaryCard({ result, isIncomplete }: SummaryCardProps) {
  return (
    <div className="flex flex-col gap-4">
      <dl className="grid gap-4 sm:grid-cols-3">
        <div className="flex flex-col gap-1 sm:col-span-3">
          <dt className="text-sm font-medium text-muted-foreground">
            Precio recomendado
          </dt>
          <dd className="font-mono text-4xl font-semibold tracking-tight text-primary tabular-nums">
            {formatCurrency(result.recommendedPrice)}
          </dd>
        </div>

        <div className="flex flex-col gap-1 border-t border-primary/15 pt-4">
          <dt className="text-sm text-muted-foreground">Costo total</dt>
          <dd className="font-mono font-medium tabular-nums">
            {formatCurrency(result.totalCosts)}
          </dd>
        </div>

        <div className="flex flex-col gap-1 border-t border-primary/15 pt-4">
          <dt className="text-sm text-muted-foreground">Ganancia objetivo</dt>
          <dd className="font-mono font-medium tabular-nums">
            {formatCurrency(result.totalGoal)}
          </dd>
        </div>

        <div className="flex flex-col gap-1 border-t border-primary/15 pt-4">
          <dt className="text-sm text-muted-foreground">
            Ganancia por integrante
          </dt>
          <dd className="font-mono font-medium tabular-nums">
            {formatCurrency(result.profitPerMember)}
          </dd>
        </div>
      </dl>

      {isIncomplete ? (
        <p
          role="status"
          className="flex items-start gap-2 rounded-lg bg-muted px-3 py-2 text-sm text-muted-foreground"
        >
          <TriangleAlertIcon aria-hidden className="mt-0.5 size-4 shrink-0" />
          Faltan datos por completar: el precio se recalcula igual, pero todavía
          no es confiable.
        </p>
      ) : null}
    </div>
  )
}
