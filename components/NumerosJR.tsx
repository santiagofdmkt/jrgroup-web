"use client";

import { useEffect, useRef, useState } from "react";

const datos = [
  { prefijo: "+", numero: 10, sufijo: "", texto: "años de experiencia" },
  { prefijo: "+", numero: 500, sufijo: "", texto: "familias asesoradas" },
  { prefijo: "", numero: 10, sufijo: "", texto: "prepagas disponibles" },
  { prefijo: "", numero: 100, sufijo: "%", texto: "asesoramiento gratuito" },
];

function Contador({ hasta, duracionMs = 1500 }: { hasta: number; duracionMs?: number }) {
  const [valor, setValor] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let yaAnimo = false;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !yaAnimo) {
            yaAnimo = true;
            const inicio = performance.now();
            const tick = (ahora: number) => {
              const progreso = Math.min((ahora - inicio) / duracionMs, 1);
              setValor(Math.round(progreso * hasta));
              if (progreso < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
          }
        });
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [hasta, duracionMs]);

  return <span ref={ref}>{valor}</span>;
}

export default function NumerosJR() {
  return (
    <section className="bg-jr-azul py-10">
      <div className="mx-auto grid max-w-5xl grid-cols-2 gap-6 px-6 text-center text-white md:grid-cols-4">
        {datos.map((d) => (
          <div key={d.texto}>
            <p className="text-3xl font-bold md:text-4xl">
              {d.prefijo}
              <Contador hasta={d.numero} />
              {d.sufijo}
            </p>
            <p className="mt-1 text-sm text-white/90 md:text-base">{d.texto}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
