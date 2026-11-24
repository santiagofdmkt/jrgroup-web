import Link from "next/link";

export default function BandaContacto() {
  return (
    <section className="bg-jr-gris py-16 text-center text-white md:py-20">
      <div className="mx-auto max-w-4xl px-4">
        <h2 className="text-3xl font-medium drop-shadow md:text-4xl">Estamos para ayudarte a elegir tu cobertura</h2>
        <p className="mt-4 font-medium">
          Te ofrecemos asesoramiento claro, honesto y sin compromiso para que elijas la prepaga ideal para vos y tu familia.
        </p>
        <Link
          href="/#contacto"
          className="mt-8 inline-block rounded bg-jr-azul px-8 py-3 text-sm font-bold uppercase hover:bg-jr-azul-oscuro"
        >
          Cotizá ahora
        </Link>
      </div>
    </section>
  );
}