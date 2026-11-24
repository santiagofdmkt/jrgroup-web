export default function NumerosJR() {
  const datos = [
    { numero: "+10", texto: "años de experiencia" },
    { numero: "+500", texto: "familias asesoradas" },
    { numero: "10", texto: "prepagas disponibles" },
    { numero: "100%", texto: "asesoramiento gratuito" },
  ];

  return (
    <section className="bg-jr-azul py-10">
      <div className="mx-auto grid max-w-5xl grid-cols-2 gap-6 px-6 text-center text-white md:grid-cols-4">
        {datos.map((d) => (
          <div key={d.texto}>
            <p className="text-3xl font-bold md:text-4xl">{d.numero}</p>
            <p className="mt-1 text-sm text-white/90 md:text-base">{d.texto}</p>
          </div>
        ))}
      </div>
    </section>
  );
}