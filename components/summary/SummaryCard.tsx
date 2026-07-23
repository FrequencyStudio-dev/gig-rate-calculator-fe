import type { Result } from "@/features/calculator/types"
import { formatCurrency } from "@/lib/currency"

export interface SummaryCardProps {
  result: Result
}

export function SummaryCard({ result }: SummaryCardProps) {
  return (
    <dl className="flex flex-col gap-2">
      <div className="flex flex-wrap gap-2">
        <dt className="text-sm font-medium">Precio recomendado</dt>
        <dd className="text-sm">{formatCurrency(result.recommendedPrice)}</dd>
      </div>

      <div className="flex flex-wrap gap-2">
        <dt className="text-sm font-medium">Costo total</dt>
        <dd className="text-sm">{formatCurrency(result.totalCosts)}</dd>
      </div>

      <div className="flex flex-wrap gap-2">
        <dt className="text-sm font-medium">Ganancia objetivo</dt>
        <dd className="text-sm">{formatCurrency(result.totalGoal)}</dd>
      </div>

      <div className="flex flex-wrap gap-2">
        <dt className="text-sm font-medium">Ganancia por integrante</dt>
        <dd className="text-sm">{formatCurrency(result.profitPerMember)}</dd>
      </div>
    </dl>
  )
}
