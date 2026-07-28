import { TriangleAlertIcon } from "lucide-react"

import type { GoalType, Result } from "@/features/calculator/types"
import { formatCurrency } from "@/lib/currency"

export interface SummaryCardProps {
  result: Result
  goalType: GoalType
  isIncomplete: boolean
}

export function SummaryCard({
  result,
  goalType,
  isIncomplete,
}: SummaryCardProps) {
  return (
    <div className="@container flex flex-col gap-4">
      <dl className="grid gap-4 @md:grid-cols-3">
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

        {goalType === "perMember" ? (
          <div className="flex flex-col gap-1 border-t border-primary/15 pt-4">
            <dt className="text-sm text-muted-foreground">
              Ganancia por integrante
            </dt>
            <dd className="font-mono font-medium tabular-nums">
              {formatCurrency(result.profitPerMember)}
            </dd>
          </div>
        ) : null}

        <div className="flex flex-col gap-1 @md:col-span-3">
          <dt className="text-sm font-medium text-muted-foreground">
            Precio recomendado del show
          </dt>
          <dd
            aria-live="polite"
            className="font-mono text-3xl font-semibold tracking-tight text-primary tabular-nums @md:text-4xl"
          >
            {formatCurrency(result.recommendedPrice)}
          </dd>
        </div>
      </dl>

      {isIncomplete ? (
        <p
          role="status"
          className="flex items-start gap-2 rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-sm text-amber-700 dark:border-amber-500/25 dark:bg-amber-500/10 dark:text-amber-400"
        >
          <TriangleAlertIcon aria-hidden className="mt-0.5 size-4 shrink-0" />
          Faltan datos por completar: el precio se recalcula igual, pero todavía
          no es confiable.
        </p>
      ) : null}
    </div>
  )
}