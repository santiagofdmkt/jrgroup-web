import NextLink from "next/link";

// Lo que antes estaba en el hero: por que cotizar con JR Group
const beneficios = [
  {
    icono: "★",
    titulo: "Representantes directos",
    texto: "Gestionamos tu afiliación con cada prepaga, con los mismos beneficios y descuentos según tu tipo de ingreso.",
  },
  {
    icono: "⇄",
    titulo: "Derivación de aportes",
    texto: "Con recibo de sueldo o monotributo.",
  },
  {
    icono: "%",
    titulo: "Descuento por hijos",
    texto: "Precios especiales para grupos familiares.",
  },
  {
    icono: "✦",
    titulo: "Plan Joven",
    texto: "Grandes beneficios para los más jóvenes.",
  },
];

export default function PorQueNosotros() {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-[#0b1b36] p-7 text-white shadow-2xl shadow-jr-azul/20 md:p-9">
      {/* Luces de fondo */}
      <div aria-hidden className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-jr-turquesa/25 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-jr-azul/30 blur-3xl" />

      <div className="relative">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-teal-300">Por qué con nosotros</p>
        <h3 className="mt-2 text-2xl font-extrabold md:text-[1.7rem]">Los mismos beneficios, mejor asesorado</h3>

        <ul className="mt-6 space-y-5">
          {beneficios.map((b) => (
            <li key={b.titulo} className="flex gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-jr-azul to-jr-turquesa text-lg font-bold text-white shadow-lg shadow-jr-turquesa/30">
                {b.icono}
              </span>
              <div>
                <p className="text-lg font-bold">{b.titulo}</p>
                <p className="mt-0.5 text-[15px] leading-relaxed text-white/80">{b.texto}</p>
              </div>
            </li>
          ))}
        </ul>

        <NextLink
          href="/#contacto"
          className="group mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-jr-azul to-teal-600 px-8 py-3.5 font-extrabold text-white shadow-xl shadow-teal-900/40 ring-1 ring-white/20 transition hover:-translate-y-1"
        >
          Quiero mi cotización gratis
          <span className="transition group-hover:translate-x-1">→</span>
        </NextLink>
      </div>
    </div>
  );
}
