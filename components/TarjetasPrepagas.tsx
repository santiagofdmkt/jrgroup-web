"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { prepagas } from "@/data/prepagas";

// Fotos de fondo del CTA, bien traslucidas (igual que el hero).
// Guardalas en public/img/cta-1.jpg, cta-2.jpg, cta-3.jpg
const fondos = ["/img/cta-1.jpg", "/img/cta-2.jpg", "/img/cta-3.jpg"];

export default function TarjetasPrepagas() {
  const [actual, setActual] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActual((a) => (a + 1) % fondos.length), 6000);
    return () => clearInterval(t);
  }, []);

  return (
    <section id="prepagas" className="relative scroll-mt-24 overflow-hidden py-10 md:py-14">
      {/* Fondo con fotos traslucidas, igual estilo que el hero */}
      <div className="absolute inset-0 bg-jr-fondo">
        {fondos.map((foto, i) => (
          <div
            key={foto}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
              i === actual ? "opacity-25" : "opacity-0"
            }`}
            style={{ backgroundImage: `url(${foto})` }}
          />
        ))}
      </div>

      <div className="relative mx-auto max-w-7xl px-4">
        <h2 className="animar-zoom text-center text-3xl font-extrabold leading-tight md:text-5xl">
          Comparamos prepagas, <span className="text-jr-azul">vos elegís</span> tu cobertura médica
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-sm text-gray-600 md:text-base">
          Las prepagas líderes del país, en un solo lugar. Sin costo y sin compromiso.
        </p>

        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-5 md:gap-4">
          {prepagas.map((p) => (
            <Link
              key={p.slug}
              href={`/${p.slug}`}
              className="group relative flex h-24 items-center justify-center overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl transition hover:-translate-y-1 hover:shadow-2xl md:h-28"
            >
              <Image
                src={p.logo}
                alt={p.nombre}
                fill
                sizes="(max-width: 768px) 40vw, 200px"
                className="object-contain p-2"
              />
              {!p.activa && (
                <span className="absolute right-1 top-1 z-10 rounded bg-jr-azul px-1.5 py-0.5 text-[9px] font-bold uppercase text-white">
                  Próximamente
                </span>
              )}
              <div className="absolute inset-0 z-10 flex translate-y-2 items-end justify-center bg-gradient-to-t from-black/60 via-transparent to-transparent pb-2 opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                <span className="text-xs font-medium tracking-wide text-white">Ver planes ›</span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            href="/#contacto"
            className="animar-pulso rounded-full bg-jr-azul px-8 py-3 text-sm font-bold uppercase tracking-wide text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-jr-azul-oscuro hover:shadow-xl"
          >
            Cotizá gratis ›
          </Link>
        </div>
      </div>
    </section>
  );
}
