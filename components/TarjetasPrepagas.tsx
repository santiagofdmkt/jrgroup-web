"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { prepagas } from "@/data/prepagas";

// Color de fondo de cada logo: asi el logo "se funde" con su tarjeta
// y todas quedan parejas, como credenciales oficiales.
const fondoLogo: Record<string, string> = {
  "sancor-salud": "#253c82",
  medife: "linear-gradient(135deg, #f38302 0%, #e35205 100%)",
  avalian: "linear-gradient(180deg, #e3f6da 0%, #ffffff 100%)",
  premedic: "#007d7d",
  galeno: "#ffffff",
  "prevencion-salud": "#ff006a",
  "swiss-medical": "#ffffff",
  hominis: "#6b53ff",
  doctored: "#fefefe",
  omint: "#002c6b",
};

// Logos cuadrados con degrade propio: se estiran a todo el panel
const logoCompleto = ["medife"];

const confianza = [
  "Representantes oficiales",
  "Asesoramiento sin costo",
  "Gestión directa, sin intermediarios",
];

export default function TarjetasPrepagas() {
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  // Aparicion suave de las tarjetas al hacer scroll (mismo efecto que Quienes somos)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("reveal-visible");
        });
      },
      { threshold: 0.15 }
    );
    refs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="prepagas"
      className="relative scroll-mt-24 overflow-hidden bg-[#0b1b36] pb-16 pt-10 text-white md:pb-24 md:pt-12"
    >
      {/* Fondo: luces suaves de color + trama de puntos */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 -top-40 h-[28rem] w-[28rem] rounded-full bg-jr-azul/30 blur-3xl" />
        <div className="absolute -bottom-48 -right-32 h-[30rem] w-[30rem] rounded-full bg-jr-turquesa/20 blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
            backgroundSize: "22px 22px",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4">
        {/* Etiqueta superior */}
        <div className="flex justify-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-white/80 backdrop-blur">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="text-jr-turquesa">
              <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" />
              <path d="M9 12l2 2 4-4" />
            </svg>
            Nuestras prepagas
          </span>
        </div>

        <h2 className="animar-zoom mx-auto mt-5 max-w-4xl text-center text-3xl font-extrabold leading-tight tracking-tight md:text-5xl">
          Comparamos prepagas,{" "}
          <span className="bg-gradient-to-r from-sky-300 to-jr-turquesa bg-clip-text text-transparent">vos elegís</span>{" "}
          tu cobertura médica
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-base text-white/70 md:text-lg">
          Las prepagas líderes del país, en un solo lugar. Sin costo y sin compromiso.
        </p>

        {/* Sellos de confianza */}
        <ul className="mt-7 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-white/80">
          {confianza.map((t) => (
            <li key={t} className="flex items-center gap-2">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-jr-turquesa/20">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-jr-turquesa">
                  <path d="M5 12l5 5L20 7" />
                </svg>
              </span>
              {t}
            </li>
          ))}
        </ul>

        {/* Credenciales de cada prepaga */}
        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-5 lg:grid-cols-5">
          {prepagas.map((p, i) => (
            <div
              key={p.slug}
              ref={(el) => {
                refs.current[i] = el;
              }}
              className="reveal"
              style={{ transitionDelay: `${i * 0.06}s` }}
            >
              <Link
                href={`/${p.slug}`}
                className={`group relative flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-lg shadow-black/30 transition duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-black/40 ${
                  p.activa ? "ring-2 ring-emerald-400" : "ring-1 ring-white/10"
                }`}
              >
                {/* Panel del logo */}
                <div
                  className="relative h-28 overflow-hidden md:h-32"
                  style={{ background: fondoLogo[p.slug] ?? "#ffffff" }}
                >
                  <Image
                    src={p.logo}
                    alt={`Logo ${p.nombre}`}
                    fill
                    sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 230px"
                    className={`transition duration-500 group-hover:scale-105 ${
                      logoCompleto.includes(p.slug) ? "object-cover" : "object-contain p-3"
                    }`}
                  />
                  {/* Brillo que cruza la tarjeta al pasar el mouse */}
                  <div className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-white/25 opacity-0 transition-all duration-700 group-hover:left-[120%] group-hover:opacity-100" />

                </div>

                {/* Pie de la credencial */}
                <div className="flex flex-1 items-center justify-between gap-2 border-t border-gray-100 px-3.5 py-3">
                  <div className="min-w-0">
                    <p className="text-sm font-bold leading-tight text-jr-texto">{p.nombre}</p>
                    <p className="mt-0.5 flex items-center gap-1.5 text-[11px] font-semibold text-emerald-600">
                      <span className="relative flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                      </span>
                      Cotizá hoy
                    </p>
                  </div>
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition duration-300 group-hover:translate-x-0.5 ${
                      p.activa
                        ? "bg-jr-azul text-white"
                        : "bg-gray-100 text-gray-500 group-hover:bg-jr-azul group-hover:text-white"
                    }`}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </span>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* Llamado a la accion */}
        <div className="mt-12 flex flex-col items-center gap-3">
          <Link
            href="/#contacto"
            className="animar-pulso rounded-full bg-jr-azul px-9 py-3.5 text-sm font-bold uppercase tracking-wide text-white shadow-lg shadow-jr-azul/30 transition hover:-translate-y-0.5 hover:bg-jr-azul-oscuro hover:shadow-xl"
          >
            Cotizá gratis ›
          </Link>
          <p className="text-sm text-white/60">¿No sabés cuál elegir? Te ayudamos a comparar.</p>
        </div>
      </div>
    </section>
  );
}