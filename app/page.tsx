/*
 * Esqueleto de la calculadora (Fase 2 · Día 5): las 4 secciones como
 * placeholders. Los componentes reales y el cableado al estado llegan en los
 * Días 6-8.
 */
export default function Home() {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-8">
      <section aria-label="Datos del show">
        <h2 className="font-medium">Datos del show</h2>
        <p className="text-sm">Pendiente · ShowInfo (Día 6)</p>
      </section>

      <section aria-label="Gastos">
        <h2 className="font-medium">Gastos</h2>
        <p className="text-sm">Pendiente · ExpenseManager (Día 7)</p>
      </section>

      <section aria-label="Objetivo económico">
        <h2 className="font-medium">Objetivo económico</h2>
        <p className="text-sm">Pendiente · GoalSelector (Día 7)</p>
      </section>

      <section aria-label="Resumen">
        <h2 className="font-medium">Resumen</h2>
        <p className="text-sm">Pendiente · SummaryCard (Día 8)</p>
      </section>
    </div>
  )
}
