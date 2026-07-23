import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"

/*
 * El nombre de `variable` es el que consume el tema: `@theme inline` mapea
 * --font-sans / --font-mono en app/globals.css. Si no coinciden, la utilidad
 * font-sans resuelve a nada y la app cae en la tipografía del sistema.
 */
const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
  fallback: ["system-ui", "arial"],
})

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  fallback: ["ui-monospace", "monospace"],
})

export const metadata: Metadata = {
  title: "Gig Rate Calculator",
  description: "Calculadora de precio de show para bandas — Frequency Studio.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <header className="sticky top-0 z-10 border-b bg-background/80 backdrop-blur">
          <div className="mx-auto flex w-full max-w-3xl items-center gap-3 px-6 py-4">
            {/* Ecualizador: la marca gráfica de Frequency Studio. */}
            <span aria-hidden className="flex h-6 items-end gap-0.75">
              <span className="h-2.5 w-1 rounded-full bg-primary/40" />
              <span className="h-5 w-1 rounded-full bg-primary" />
              <span className="h-3.5 w-1 rounded-full bg-primary/70" />
            </span>
            <div className="flex flex-col">
              <span className="text-xs font-medium tracking-widest text-muted-foreground uppercase">
                Frequency Studio
              </span>
              <span className="font-heading leading-tight font-semibold">
                Gig Rate Calculator
              </span>
            </div>
          </div>
        </header>

        <main className="flex-1 px-6 py-10">{children}</main>

        <footer className="border-t px-6 py-6 text-sm text-muted-foreground">
          <div className="mx-auto w-full max-w-3xl">
            Frequency Studio — Calculá cuánto cobrar por tu show.
          </div>
        </footer>
      </body>
    </html>
  )
}
