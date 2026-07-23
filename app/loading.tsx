import { Card, CardContent, CardHeader } from "@/components/ui/card"

function CardSkeleton({ rows }: { rows: number }) {
  return (
    <Card aria-hidden>
      <CardHeader className="gap-2">
        <div className="h-4 w-40 animate-pulse rounded bg-muted" />
        <div className="h-3 w-64 animate-pulse rounded bg-muted" />
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {Array.from({ length: rows }, (_, index) => (
          <div key={index} className="flex flex-col gap-2">
            <div className="h-3 w-24 animate-pulse rounded bg-muted" />
            <div className="h-8 w-full animate-pulse rounded-lg bg-muted" />
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

export default function Loading() {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-8">
      <CardSkeleton rows={3} />
      <CardSkeleton rows={1} />
      <CardSkeleton rows={2} />
      <CardSkeleton rows={1} />
    </div>
  )
}
