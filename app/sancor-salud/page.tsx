import NumerosJR from "@/components/NumerosJR";
import HeroSlider from "@/components/HeroSlider";
import TarjetasPrepagas from "@/components/TarjetasPrepagas";
import QuienesSomos from "@/components/QuienesSomos";
import BandaContacto from "@/components/BandaContacto";
import FormularioLead from "@/components/FormularioLead";

export default function Home() {
  return (
    <>
      <HeroSlider />
      <NumerosJR />
      <TarjetasPrepagas />
      <QuienesSomos />
      <BandaContacto />

      <section id="contacto" className="scroll-mt-24 py-16 md:py-20">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 md:grid-cols-2">
          <div>
            <h2 className="titulo-jr text-3xl font-medium md:text-4xl">Cotizá tu prepaga</h2>
            <p className="mt-6 leading-relaxed text-gray-700">
              Dejanos tus datos y un asesor de JR Group te contacta para comparar planes y precios. Sin costo y sin
              compromiso.
            </p>
          </div>
          <FormularioLead />
        </div>
      </section>
    </>
  );
}
