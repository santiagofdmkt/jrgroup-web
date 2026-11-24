"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

// Cada slide: titulo, texto, boton y foto de fondo (en public/img).
// Si la foto no existe todavia, se ve el fondo azul igual.
const slides = [
  {
    titulo: "Compará prepagas y elegí tu cobertura médica",
    texto: "Te asesoramos gratis para que encuentres el plan ideal para vos y tu familia.",
    boton: "Cotizá gratis",
    href: "/#contacto",
    foto: "/img/hero-1.jpg",
  },
  {
    titulo: "10 prepagas líderes en un solo lugar",
    texto: "SanCor Salud, Swiss Medical, Galeno, Omint, Medifé y más. Sin vueltas.",
    boton: "Ver prepagas",
    href: "/#prepagas",
    foto: "/img/hero-2.jpg",
  },
  {
    titulo: "Asesoramiento claro, honesto y sin compromiso",
    texto: "Más de 10 años acompañando a familias, monotributistas y empresas.",
    boton: "Hablemos",
    href: "/#contacto",
    foto: "/img/hero-3.jpg",
  },
];

export default function HeroSlider() {
  const [actual, setActual] = useState(0);

  // Pasa solo al siguiente slide cada 6 segundos
  useEffect(() => {
    const t = setInterval(() => setActual((a) => (a + 1) % slides.length), 6000);
    return () => clearInterval(t);
  }, []);

  const ir = (n: number) => setActual((n + slides.length) % slides.length);

  return (
    <section className="relative h-[480px] overflow-hidden bg-jr-azul md:h-[560px]">
      {slides.map((s, i) => (
        <div
          key={s.titulo}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-700 ${
            i === actual ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
          style={{ backgroundImage: `url(${s.foto})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-jr-azul-oscuro/90 via-jr-azul-oscuro/60 to-jr-azul-oscuro/30" />
          <div className="relative mx-auto flex h-full max-w-4xl flex-col items-center justify-center px-6 text-center text-white">
            <h1 className="text-3xl font-bold drop-shadow-lg md:text-5xl">{s.titulo}</h1>
            <p className="mt-4 max-w-2xl text-base font-medium drop-shadow-lg md:text-lg">{s.texto}</p>
            <Link
              href={s.href}
              className="mt-8 rounded bg-jr-azul px-8 py-3 text-sm font-bold uppercase shadow hover:bg-white hover:text-jr-azul"
            >
              {s.boton}
            </Link>
          </div>
        </div>
      ))}

      {/* Flechas */}
      <button
        type="button"
        aria-label="Anterior"
        onClick={() => ir(actual - 1)}
        className="absolute left-3 top-1/2 -translate-y-1/2 px-2 text-4xl text-white/80 hover:text-white"
      >
        ‹
      </button>
      <button
        type="button"
        aria-label="Siguiente"
        onClick={() => ir(actual + 1)}
        className="absolute right-3 top-1/2 -translate-y-1/2 px-2 text-4xl text-white/80 hover:text-white"
      >
        ›
      </button>

      {/* Puntitos */}
      <div className="absolute bottom-5 left-0 right-0 flex justify-center gap-2">
        {slides.map((s, i) => (
          <button
            key={s.titulo}
            type="button"
            aria-label={`Ir al slide ${i + 1}`}
            onClick={() => ir(i)}
            className={`h-2.5 w-2.5 rounded-full ${i === actual ? "bg-white" : "bg-white/50"}`}
          />
        ))}
      </div>
    </section>
  );
}