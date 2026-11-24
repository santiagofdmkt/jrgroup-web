"use client";

import { useEffect, useRef } from "react";

const pasos = [
  { numero: "1", titulo: "Dejás tus datos", texto: "Completás el formulario o nos escribís por WhatsApp. Te lleva un minuto." },
  { numero: "2", titulo: "Te asesoramos", texto: "Comparamos planes y precios de varias prepagas según tu edad, zona y necesidades." },
  { numero: "3", titulo: "Elegís tu plan", texto: "Te acompañamos en el alta y después, cada vez que lo necesites." },
];

export default function QuienesSomos() {
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-visible");
          }
        });
      },
      { threshold: 0.2 }
    );
    refs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="como-trabajamos" className="scroll-mt-24 bg-jr-fondo py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="titulo-jr-centro text-center text-3xl font-medium md:text-4xl">¿Quiénes somos?</h2>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <div
            ref={(el) => { refs.current[0] = el; }}
            className="reveal rounded-lg bg-white p-8 shadow-md transition hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-jr-azul/10">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-jr-azul">
                <path d="M12 21s-7-4.35-9.5-8.5C.5 8.5 2.5 5 6 5c2 0 3.5 1 4 2 .5-1 2-2 4-2 3.5 0 5.5 3.5 3.5 7.5C19 16.65 12 21 12 21z" />
              </svg>
            </div>
            <h3 className="mt-5 text-xl font-bold text-jr-texto">Nuestra misión</h3>
            <p className="mt-3 leading-relaxed text-gray-600">
              <strong>JR Group</strong> nació con una misión clara: acercar coberturas de calidad con un asesoramiento
              transparente y humano. Con más de 10 años de experiencia, acompañamos a familias, monotributistas y
              empresas a elegir la prepaga que mejor se adapta a cada etapa de su vida.
            </p>
          </div>

          <div
            ref={(el) => { refs.current[1] = el; }}
            className="reveal rounded-lg bg-white p-8 shadow-md transition hover:-translate-y-1 hover:shadow-xl"
            style={{ transitionDelay: "0.15s" }}
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-jr-turquesa/10">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-jr-turquesa">
                <path d="M9 12l2 2 4-4" />
                <circle cx="12" cy="12" r="9" />
              </svg>
            </div>
            <h3 className="mt-5 text-xl font-bold text-jr-texto">¿Por qué elegirnos?</h3>
            <p className="mt-3 leading-relaxed text-gray-600">
              Somos representantes directos de cada prepaga con la que trabajamos. Eso significa que gestionamos tu
              afiliación directamente con ellas, sin intermediarios, y te acompañamos como tu nexo de confianza
              durante todo el proceso. Nuestro asesoramiento no tiene costo extra.
            </p>
          </div>

          <div
            ref={(el) => { refs.current[2] = el; }}
            className="reveal rounded-lg bg-white p-8 shadow-md transition hover:-translate-y-1 hover:shadow-xl md:col-span-2"
            style={{ transitionDelay: "0.3s" }}
          >
            <h3 className="text-xl font-bold text-jr-azul">Cómo trabajamos</h3>
            <ol className="mt-6 grid gap-6 md:grid-cols-3">
              {pasos.map((p) => (
                <li key={p.numero} className="flex gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-jr-turquesa font-bold text-white">
                    {p.numero}
                  </span>
                  <div>
                    <p className="font-bold">{p.titulo}</p>
                    <p className="text-sm text-gray-600">{p.texto}</p>
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
