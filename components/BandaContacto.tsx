import NextLink from "next/link";
import { linkWhatsapp } from "@/data/contacto";

export default function BandaContacto() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-jr-azul via-sky-500 to-jr-turquesa py-14 text-white md:py-16">
      {/* Decoracion: circulos de luz, anillos y trama de puntos */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-white/20 blur-3xl" />
        <div className="absolute -bottom-32 right-1/4 h-80 w-80 rounded-full bg-[#0b1b36]/30 blur-3xl" />
        <div className="absolute -right-16 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full border-[18px] border-white/10" />
        <div className="absolute -right-4 top-1/2 h-40 w-40 -translate-y-1/2 rounded-full border-[10px] border-white/10" />
        <div
          className="absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        />
      </div>

      <div className="relative mx-auto flex max-w-6xl flex-col items-center gap-8 px-4 text-center md:flex-row md:justify-between md:text-left">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] backdrop-blur">
            <span className="h-2 w-2 animate-pulse rounded-full bg-white" />
            ¿Tenés dudas?
          </span>
          <h2 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight md:text-4xl">
            Estamos para ayudarte a elegir tu cobertura
          </h2>
          <p className="mt-3 text-base font-medium text-white/90 md:text-lg">
            Asesoramiento <strong className="text-white">claro, honesto y sin compromiso</strong> para que elijas la
            prepaga ideal para vos y tu familia.
          </p>
        </div>

        <div className="flex w-full shrink-0 flex-col gap-3 sm:w-auto">
          <NextLink
            href="/#contacto"
            className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-base font-extrabold text-jr-azul shadow-xl shadow-[#0b1b36]/25 transition duration-300 hover:scale-105 hover:shadow-2xl"
          >
            Cotizá ahora
            <span className="transition group-hover:translate-x-1">→</span>
          </NextLink>
          <a
            href={linkWhatsapp()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/60 px-8 py-3.5 text-base font-bold text-white transition duration-300 hover:scale-105 hover:bg-white/15"
          >
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-300" />
            Escribinos por WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}