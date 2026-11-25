"use client";

import { useEffect, useRef, useState } from "react";

const pasos = [
  { numero: "1", titulo: "Dejás tus datos", texto: "Completás el formulario o nos escribís por WhatsApp. Te lleva un minuto." },
  { numero: "2", titulo: "Te asesoramos", texto: "Comparamos planes y precios de varias prepagas según tu edad, zona y necesidades." },
  { numero: "3", titulo: "Elegís tu plan", texto: "Te acompañamos en el alta y después, cada vez que lo necesites." },
];

const datos = [
  { valor: "+10", texto: "años de experiencia" },
  { valor: "10", texto: "prepagas líderes" },
  { valor: "$0", texto: "costo de asesoramiento" },
];

// Hace aparecer un bloque suave cuando entra en pantalla (no necesita CSS extra)
function useAparecer() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  const clase = `transition-all duration-700 ease-out ${visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`;
  return { ref, clase };
}

export default function QuienesSomos() {
  const intro = useAparecer();
  const tarjetas = useAparecer();
  const proceso = useAparecer();

  return (
    <section
      id="como-trabajamos"
      className="relative scroll-mt-24 overflow-hidden bg-gradient-to-b from-[#f5f5f7] via-[#ececf0] to-[#f5f5f7] pb-20 pt-12 md:pb-24 md:pt-14"
    >
      {/* Luces de color de fondo */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -right-32 top-10 h-96 w-96 rounded-full bg-jr-turquesa/15 blur-3xl" />
        <div className="absolute -left-40 bottom-0 h-[26rem] w-[26rem] rounded-full bg-jr-azul/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4">
        {/* Encabezado */}
        <div ref={intro.ref} className={`text-center ${intro.clase}`}>
          <span className="inline-flex items-center gap-2 rounded-full bg-jr-azul/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-jr-azul">
            <span className="h-1.5 w-1.5 rounded-full bg-jr-turquesa" />
            Quiénes somos
          </span>
          <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-jr-texto md:text-5xl">
            Cómo{" "}
            <span className="bg-gradient-to-r from-jr-azul to-jr-turquesa bg-clip-text text-transparent">trabajamos</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-gray-600 md:text-lg">
            Un equipo de asesores que te habla <strong className="text-jr-texto">claro</strong>, compara{" "}
            <strong className="text-jr-texto">por vos</strong> y te acompaña{" "}
            <strong className="text-jr-texto">antes, durante y después</strong> del alta.
          </p>

          {/* Datos destacados */}
          <div className="mx-auto mt-10 grid max-w-3xl grid-cols-3 divide-x divide-gray-200 rounded-2xl bg-white/80 py-5 shadow-lg shadow-jr-azul/5 ring-1 ring-gray-100 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:ring-jr-azul/20">
            {datos.map((d) => (
              <div key={d.texto} className="px-2">
                <p className="bg-gradient-to-r from-jr-azul to-jr-turquesa bg-clip-text text-2xl font-extrabold text-transparent md:text-4xl">
                  {d.valor}
                </p>
                <p className="mt-1 text-xs font-medium text-gray-500 md:text-sm">{d.texto}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Mision y por que elegirnos */}
        <div ref={tarjetas.ref} className={`mt-14 grid gap-6 md:grid-cols-2 ${tarjetas.clase}`}>
          <div className="group relative overflow-hidden rounded-3xl bg-white p-8 shadow-xl shadow-jr-azul/5 ring-1 ring-gray-100 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:ring-jr-azul/20 md:p-10">
            <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-jr-azul to-sky-400" />
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-jr-azul to-sky-400 text-2xl text-white shadow-lg shadow-jr-azul/30 transition duration-300 group-hover:-translate-y-1 group-hover:rotate-6">
              ♥
            </div>
            <h3 className="mt-6 text-2xl font-extrabold text-jr-texto">Qué hacemos</h3>
            <p className="mt-4 leading-relaxed text-gray-600">
              Somos <strong className="text-jr-texto">JR Group</strong>, asesores de prepagas con{" "}
              <strong className="text-jr-texto">más de 10 años</strong> en el rubro. Comparamos planes y precios de las
              principales prepagas del país y te decimos <strong className="text-jr-azul">cuál te conviene</strong>{" "}
              según tu edad, tu zona y tu tipo de ingreso. Trabajamos con{" "}
              <strong className="text-jr-texto">familias, monotributistas y empresas</strong>.
            </p>
          </div>

          <div className="group relative overflow-hidden rounded-3xl bg-white p-8 shadow-xl shadow-jr-azul/5 ring-1 ring-gray-100 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:ring-jr-azul/20 md:p-10">
            <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-jr-turquesa to-emerald-400" />
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-jr-turquesa to-emerald-400 text-2xl font-bold text-white shadow-lg shadow-jr-turquesa/30 transition duration-300 group-hover:-translate-y-1 group-hover:-rotate-6">
              ✓
            </div>
            <h3 className="mt-6 text-2xl font-extrabold text-jr-texto">¿Por qué elegirnos?</h3>
            <p className="mt-4 leading-relaxed text-gray-600">
              Somos <strong className="text-jr-turquesa">representantes directos</strong> de cada prepaga con la que
              trabajamos. Gestionamos tu afiliación directamente con ellas,{" "}
              <strong className="text-jr-texto">sin intermediarios</strong>, y somos tu nexo de confianza durante todo
              el proceso. Nuestro asesoramiento <strong className="text-jr-texto">no tiene costo extra</strong>.
            </p>
          </div>
        </div>

        {/* Paso a paso */}
        <div
          ref={proceso.ref}
          className={`relative mt-8 overflow-hidden rounded-3xl bg-[#0b1b36] p-8 text-white shadow-2xl shadow-jr-azul/20 hover:-translate-y-2 hover:shadow-jr-azul/40 md:p-12 ${proceso.clase}`}
        >
          <div aria-hidden className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-jr-turquesa/25 blur-3xl" />
          <div aria-hidden className="pointer-events-none absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-jr-azul/30 blur-3xl" />

          <div className="relative">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-jr-turquesa">Paso a paso</p>
            <h3 className="mt-2 text-2xl font-extrabold md:text-3xl">Tu prepaga en 3 pasos simples</h3>

            <ol className="relative mt-10 grid gap-8 md:grid-cols-3 md:gap-6">
              {/* Linea que une los pasos (solo en compu) */}
              <div aria-hidden className="absolute left-7 right-[30%] top-7 hidden h-0.5 bg-gradient-to-r from-jr-azul via-jr-turquesa to-emerald-400 opacity-60 md:block" />
              {pasos.map((p) => (
                <li key={p.numero} className="group relative flex gap-4 md:flex-col md:gap-5">
                  <span className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-jr-azul to-jr-turquesa text-xl font-extrabold text-white shadow-lg shadow-jr-turquesa/30 ring-4 ring-[#0b1b36] transition duration-300 group-hover:-translate-y-1 group-hover:shadow-jr-turquesa/60">
                    {p.numero}
                  </span>
                  <div>
                    <p className="text-lg font-bold">{p.titulo}</p>
                    <p className="mt-1 text-sm leading-relaxed text-white/70">{p.texto}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}