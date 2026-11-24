import Link from "next/link";
import Image from "next/image";
import { prepagas } from "@/data/prepagas";

export default function TarjetasPrepagas() {
  return (
    <section id="prepagas" className="scroll-mt-24 py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="titulo-jr-centro text-center text-3xl font-medium md:text-4xl">Nuestras prepagas</h2>
        <p className="mx-auto mt-6 max-w-2xl text-center text-gray-600">
          Trabajamos con las prepagas líderes del país. Elegí una para ver sus planes o pedinos que las comparemos por vos.
        </p>

        <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
          {prepagas.map((p) => (
            <Link
              key={p.slug}
              href={`/${p.slug}`}
              className="group relative flex h-40 items-center justify-center overflow-hidden rounded-lg shadow-md ring-1 ring-gray-200 transition hover:-translate-y-1 hover:shadow-xl"
            >
              <Image src={p.logo} alt={p.nombre} fill className="object-cover" />
              {!p.activa && (
                <span className="absolute right-2 top-2 z-10 rounded bg-white/90 px-2 py-0.5 text-[10px] font-bold uppercase text-jr-azul">
                  Próximamente
                </span>
              )}
              <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 via-black/10 to-transparent p-3 opacity-0 transition group-hover:opacity-100">
                <span className="text-sm font-semibold text-white drop-shadow">Ver planes ›</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
