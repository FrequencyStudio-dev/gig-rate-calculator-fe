import { BudgetCalculator } from "@/components/BudgetCalculator"

export default function Home() {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-8">
      <BudgetCalculator />
    </div>
  )
}
