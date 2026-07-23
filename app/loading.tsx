import { Card, CardContent, CardHeader } from "@/components/ui/card"

function CardSkeleton({ rows }: { rows: number }) {
  return (
    <Card aria-hidden>
      <CardHeader className="gap-2">
        <div className="h-4 w-40 animate-pulse rounded bg-muted" />
        <div className="h-3 w-64 max-w-full animate-pulse rounded bg-muted" />
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {Array.from({ length: rows }, (_, index) => (
          <div key={index} className="flex flex-col gap-2">
            <div className="h-3 w-24 animate-pulse rounded bg-muted" />
            <div className="h-10 w-full animate-pulse rounded-lg bg-muted md:h-8" />
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

export default function Loading() {
  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-start lg:gap-8">
      <div className="flex flex-col gap-6">
        <CardSkeleton rows={3} />
        <CardSkeleton rows={1} />
        <CardSkeleton rows={2} />
      </div>
      <CardSkeleton rows={1} />
    </div>
  )
}
