"use client"

import { useEffect } from "react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function Error({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string }
  unstable_retry: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="mx-auto w-full max-w-3xl">
      <Card>
        <CardHeader>
          <CardTitle asChild>
            <h2>Se rompió algo</h2>
          </CardTitle>
          <CardDescription>
            No pudimos mostrar la calculadora. Tus datos no salieron de este
            navegador, así que no se filtró nada.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {error.digest ? (
            <p className="font-mono text-xs text-muted-foreground">
              Referencia: {error.digest}
            </p>
          ) : null}
          <Button
            type="button"
            onClick={() => unstable_retry()}
            className="self-start"
          >
            Reintentar
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
