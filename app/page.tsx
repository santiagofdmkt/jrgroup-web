import NumerosJR from "@/components/NumerosJR";
import HeroSlider from "@/components/HeroSlider";
import TarjetasPrepagas from "@/components/TarjetasPrepagas";
import QuienesSomos from "@/components/QuienesSomos";
import BandaContacto from "@/components/BandaContacto";
import PorQueNosotros from "@/components/PorQueNosotros";

export default function Home() {
  return (
    <>
      <HeroSlider />
      <NumerosJR />
      <TarjetasPrepagas />
      <QuienesSomos />
      <BandaContacto />

      <section id="por-que-nosotros" className="scroll-mt-24 py-16 md:py-20">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 md:grid-cols-2">
          <div>
            <span className="inline-block rounded-full bg-jr-azul/10 px-4 py-1 text-xs font-bold uppercase tracking-wide text-jr-azul">
              Sin costo · Sin compromiso
            </span>
            <h2 className="titulo-jr mt-4 text-3xl font-extrabold leading-tight md:text-5xl">
              Cotizá tu <span className="text-jr-azul">prepaga</span> hoy mismo
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-gray-700">
              Dejanos tus datos y un asesor de JR Group te contacta para comparar planes y precios entre las
              principales prepagas del país.
            </p>
            <ul className="mt-6 space-y-3 text-sm font-medium text-jr-texto">
              <li className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-jr-turquesa/15 text-jr-turquesa">✓</span>
                Respuesta en el día
              </li>
              <li className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-jr-turquesa/15 text-jr-turquesa">✓</span>
                Asesoramiento 100% gratuito
              </li>
              <li className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-jr-turquesa/15 text-jr-turquesa">✓</span>
                Te acompañamos en todo el proceso
              </li>
            </ul>
          </div>
          <PorQueNosotros />
        </div>
      </section>
    </>
  );
}
