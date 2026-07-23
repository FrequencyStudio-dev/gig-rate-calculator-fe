import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"

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

export const viewport: Viewport = {
  themeColor: "#fbfbff",
}

const container = "mx-auto w-full max-w-3xl px-4 sm:px-6 lg:max-w-5xl"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full scroll-pt-24 antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <a
          href="#contenido"
          className="fixed top-3 left-3 z-50 -translate-y-20 rounded-lg bg-background px-3 py-2 text-sm font-medium ring-3 ring-ring/50 transition-transform focus:translate-y-0"
        >
          Saltar al contenido
        </a>

        <header className="sticky top-0 z-10 border-b bg-background/80 backdrop-blur">
          <div className={`${container} flex items-center gap-3 py-3 sm:py-4`}>
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
              <h1 className="font-heading leading-tight font-semibold">
                Gig Rate Calculator
              </h1>
            </div>
          </div>
        </header>

        <main id="contenido" className={`${container} flex-1 py-8 sm:py-10`}>
          {children}
        </main>

        <footer className="border-t py-6 text-sm text-muted-foreground">
          <div className={container}>
            Frequency Studio — Calculá cuánto cobrar por tu show.
          </div>
        </footer>
      </body>
    </html>
  )
}
