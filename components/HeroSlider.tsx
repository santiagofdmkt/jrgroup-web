"use client";

import NextLink from "next/link";
import { useEffect, useState } from "react";
import { linkWhatsapp } from "@/data/contacto";

// Fotos de fondo que van rotando (en public/img)
const fotos = ["/img/hero-1.jpg", "/img/hero-2.jpg", "/img/hero-3.jpg"];

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

export default function HeroSlider() {
  const [actual, setActual] = useState(0);
  const [listo, setListo] = useState(false);

  // Cambia la foto cada 6 segundos y activa la animacion de entrada
  useEffect(() => {
    setListo(true);
    const t = setInterval(() => setActual((a) => (a + 1) % fotos.length), 6000);
    return () => clearInterval(t);
  }, []);

  const entrada = (demora: string) =>
    `transition-all duration-700 ease-out ${demora} ${listo ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`;

  return (
    <section className="relative overflow-hidden bg-[#0b1b36] text-white">
      {/* Fotos de fondo */}
      {fotos.map((foto, i) => (
        <div
          key={foto}
          className={`absolute inset-0 bg-cover bg-center transition-all duration-[1500ms] ${
            i === actual ? "scale-105 opacity-100" : "scale-100 opacity-0"
          }`}
          style={{ backgroundImage: `url(${foto})` }}
        />
      ))}

      {/* Capa azul para que el texto se lea bien */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0b1b36] via-[#0b1b36]/85 to-[#0b1b36]/40" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0b1b36]/80 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-[#0b1b36]/40 lg:hidden" />
      <div aria-hidden className="pointer-events-none absolute -left-32 top-1/3 h-96 w-96 rounded-full bg-jr-azul/30 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 md:py-24 lg:grid-cols-[1.15fr_1fr] lg:py-28">
        {/* Texto principal */}
        <div>
          <span
            className={`inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-white/90 backdrop-blur ${entrada("delay-0")}`}
          >
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            Asesoramiento gratis
          </span>

          <h1
            className={`mt-6 text-4xl font-extrabold leading-[1.08] tracking-tight md:text-6xl ${entrada("delay-100")}`}
          >
            Comparamos las{" "}
            <span className="bg-gradient-to-r from-sky-300 to-jr-turquesa bg-clip-text text-transparent">
              10 prepagas
            </span>{" "}
            con mayor cobertura del país
          </h1>

          <p className={`mt-6 max-w-xl text-lg leading-relaxed text-white/80 md:text-xl ${entrada("delay-200")}`}>
            Escuchamos qué necesitás y te enviamos la propuesta de{" "}
            <strong className="text-white">planes y valores</strong>. Sin costo y sin compromiso.
          </p>

          <div className={`mt-9 flex flex-col gap-3 sm:flex-row ${entrada("delay-300")}`}>
            <NextLink
              href="/#contacto"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-jr-azul px-8 py-4 text-base font-bold text-white shadow-xl shadow-jr-azul/40 transition hover:-translate-y-0.5 hover:bg-jr-azul-oscuro"
            >
              Quiero mi cotización gratis
              <span className="transition group-hover:translate-x-1">→</span>
            </NextLink>
            <a
              href={linkWhatsapp()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 bg-white/10 px-8 py-4 text-base font-bold text-white backdrop-blur transition hover:-translate-y-0.5 hover:bg-white/20"
            >
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
              Consultar por WhatsApp
            </a>
          </div>

          {/* Puntitos de las fotos */}
          <div className="mt-10 flex gap-2">
            {fotos.map((foto, i) => (
              <button
                key={foto}
                type="button"
                aria-label={`Ver foto ${i + 1}`}
                onClick={() => setActual(i)}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  i === actual ? "w-10 bg-white" : "w-4 bg-white/40 hover:bg-white/70"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Tarjeta de beneficios */}
        <div
          className={`rounded-3xl border border-white/15 bg-white/10 p-6 shadow-2xl shadow-black/30 backdrop-blur-xl md:p-8 ${entrada("delay-500")}`}
        >
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-jr-turquesa">Por qué con nosotros</p>
          <h2 className="mt-2 text-2xl font-extrabold">Los mismos beneficios, mejor asesorado</h2>

          <ul className="mt-6 space-y-5">
            {beneficios.map((b) => (
              <li key={b.titulo} className="flex gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-jr-azul to-jr-turquesa text-lg font-bold text-white shadow-lg shadow-jr-turquesa/30">
                  {b.icono}
                </span>
                <div>
                  <p className="font-bold">{b.titulo}</p>
                  <p className="mt-0.5 text-sm leading-relaxed text-white/70">{b.texto}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}