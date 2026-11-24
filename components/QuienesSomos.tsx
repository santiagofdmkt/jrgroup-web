const pasos = [
  { numero: "1", titulo: "Dejás tus datos", texto: "Completás el formulario o nos escribís por WhatsApp. Te lleva un minuto." },
  { numero: "2", titulo: "Te asesoramos", texto: "Comparamos planes y precios de varias prepagas según tu edad, zona y necesidades." },
  { numero: "3", titulo: "Elegís tu plan", texto: "Te acompañamos en el alta y después, cada vez que lo necesites." },
];

export default function QuienesSomos() {
  return (
    <section id="como-trabajamos" className="scroll-mt-24 bg-jr-fondo py-16 md:py-20">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 md:grid-cols-2">
        <div>
          <h2 className="titulo-jr text-3xl font-medium md:text-4xl">¿Quiénes somos?</h2>
          <p className="mt-6 leading-relaxed text-gray-700">
            <strong>JR Group</strong> nació con una misión clara: acercar coberturas de calidad con un asesoramiento
            transparente y humano. Con más de 10 años de experiencia, acompañamos a familias, monotributistas y empresas
            a elegir la prepaga que mejor se adapta a cada etapa de su vida.
          </p>

          <h2 className="titulo-jr mt-12 text-3xl font-medium md:text-4xl">¿Por qué elegirnos?</h2>
          <p className="mt-6 leading-relaxed text-gray-700">
            Porque somos independientes y trabajamos para vos, no para una prepaga. Comparamos opciones de las
            principales empresas de salud del país y te recomendamos la que realmente te conviene. Nuestro
            asesoramiento no tiene costo extra.
          </p>
        </div>

        <div className="rounded-lg bg-white p-8 shadow-md">
          <h3 className="text-xl font-bold text-jr-azul">Cómo trabajamos</h3>
          <ol className="mt-6 space-y-6">
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
    </section>
  );
}