"use client";

import NextLink from "next/link";
import NextImage from "next/image";
import { contacto, linkWhatsapp } from "@/data/contacto";
import { prepagas } from "@/data/prepagas";

const titulo = "mb-5 text-xs font-bold uppercase tracking-[0.2em] text-teal-300";
const enlace = "group inline-flex items-center gap-1.5 text-white/75 transition hover:text-white";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#0b1b36] text-white">
      {/* Luces de fondo y linea de color arriba */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-jr-azul via-jr-turquesa to-emerald-400" />
        <div className="absolute -left-32 -top-32 h-80 w-80 rounded-full bg-jr-azul/25 blur-3xl" />
        <div className="absolute -bottom-40 -right-24 h-96 w-96 rounded-full bg-jr-turquesa/15 blur-3xl" />
      </div>

      <div className="relative mx-auto grid max-w-6xl gap-12 px-4 pb-12 pt-16 sm:grid-cols-2 lg:grid-cols-[1.3fr_1.2fr_1fr_0.8fr]">
        {/* Marca */}
        <div>
          <div className="inline-flex rounded-2xl bg-white px-4 py-3 shadow-lg shadow-black/20">
            <NextImage src="/img/logo-jr-group.png" alt="JR Group Asesores de Prepagas" width={174} height={64} className="h-12 w-auto" />
          </div>
          <p className="mt-6 text-sm leading-relaxed text-white/70">
            <strong className="text-white">Asesores de Prepagas y Coberturas Médicas.</strong> Unificamos tu afiliación
            en <strong className="text-white">un solo lugar</strong>, para que compares las mejores opciones y elijas el
            plan de salud que <strong className="text-white">más te conviene</strong>. Sin costo extra: pedí tu
            cotización y <strong className="text-teal-300">recibila en minutos</strong>.
          </p>
        </div>

        {/* Prepagas */}
        <div>
          <h3 className={titulo}>Prepagas</h3>
          <ul className="grid grid-cols-2 gap-x-4 gap-y-2.5 text-sm">
            {prepagas.map((p) => (
              <li key={p.slug}>
                <NextLink href={`/${p.slug}`} className={enlace}>
                  <span className="text-jr-turquesa transition group-hover:translate-x-0.5">›</span>
                  {p.nombre}
                </NextLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Contacto */}
        <div>
          <h3 className={titulo}>Contacto</h3>
          <ul className="space-y-3 text-sm">
            <li>
              <a
                href={linkWhatsapp()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-4 py-2 font-bold text-white shadow-lg shadow-emerald-500/20 transition hover:-translate-y-0.5 hover:bg-emerald-400"
              >
                <span className="h-2 w-2 animate-pulse rounded-full bg-white" />
                WhatsApp
              </a>
              <p className="mt-2 font-semibold text-white">{contacto.whatsappVisible}</p>
            </li>
            <li>
              <a href={`mailto:${contacto.email}`} className={enlace}>
                <span className="text-jr-turquesa">✉</span>
                {contacto.email}
              </a>
            </li>
          </ul>
        </div>

        {/* Redes */}
        <div>
          <h3 className={titulo}>Seguinos</h3>
          <div className="flex flex-wrap gap-2">
            <a
              href={contacto.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:border-pink-400 hover:bg-gradient-to-r hover:from-pink-500 hover:to-orange-400"
            >
              Instagram
            </a>
            <a
              href={contacto.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:border-blue-500 hover:bg-blue-600"
            >
              Facebook
            </a>
          </div>
        </div>
      </div>

      {/* Barra final */}
      <div className="relative border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 py-5 text-xs text-white/60 sm:flex-row sm:justify-between">
          <p>
            &copy; 2026 <strong className="text-white">JR Group</strong> · Asesores en prepagas y coberturas médicas
          </p>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Volver arriba"
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-gradient-to-br from-jr-azul to-jr-turquesa text-lg font-bold text-white shadow-lg shadow-jr-turquesa/30 transition hover:-translate-y-1"
          >
            ↑
          </button>
          <p>
            Asesoramiento <strong className="text-teal-300">gratuito y sin compromiso</strong>
          </p>
        </div>
      </div>
    </footer>
  );
}