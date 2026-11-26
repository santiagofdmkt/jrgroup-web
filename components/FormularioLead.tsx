"use client";

import { useState } from "react";
import { prepagas } from "@/data/prepagas";
import { linkWhatsapp } from "@/data/contacto";

type Props = {
  prepagaInicial?: string; // si viene una prepaga, aparece ya marcada
  compacto?: boolean; // version mas chica para el hero (entra entera en pantalla)
};

// Las mismas preguntas que en las landings de cada prepaga
const PREGUNTA_INGRESO = ["Trabajo en relación de dependencia", "Soy monotributista", "Soy responsable inscripto", "Soy particular"];
const MAX_PREPAGAS = 3; // cantidad maxima de prepagas que se pueden marcar
const PREGUNTA_GRUPO = ["Para mí solo", "Para mí y mi pareja", "Para mi grupo familiar completo"];

const campo =
  "w-full rounded-xl border border-gray-200 bg-[#f5f5f7] px-4 py-3 text-sm text-jr-texto placeholder:text-gray-400 transition focus:border-jr-azul focus:bg-white focus:outline-none focus:ring-4 focus:ring-jr-azul/15";
const etiqueta = "mb-1.5 block text-xs font-semibold uppercase tracking-wide text-gray-500";

export default function FormularioLead({ prepagaInicial = "", compacto = false }: Props) {
  // En el hero usamos campos mas bajos y menos espacio entre filas
  // En el hero la tarjeta es de vidrio esmerilado: campos blancos y textos claros
  const c = compacto
    ? "w-full rounded-xl border border-white/40 bg-white/95 px-4 py-2.5 text-sm text-jr-texto placeholder:text-gray-400 shadow-sm transition focus:border-white focus:bg-white focus:outline-none focus:ring-4 focus:ring-jr-turquesa/40"
    : campo;
  const et = compacto ? "mb-1 block text-xs font-semibold uppercase tracking-wide text-white/75" : etiqueta;

  const [tipoIngreso, setTipoIngreso] = useState("");
  const [grupoFamiliar, setGrupoFamiliar] = useState("");
  const [nombre, setNombre] = useState("");
  const [localidad, setLocalidad] = useState("");
  const [telefono, setTelefono] = useState("");
  const [elegidas, setElegidas] = useState<string[]>(prepagaInicial ? [prepagaInicial] : []);
  const [estado, setEstado] = useState<"listo" | "enviando" | "ok">("listo");
  const [error, setError] = useState("");

  // Marca o desmarca una prepaga (se pueden elegir hasta MAX_PREPAGAS)
  const alternar = (nombrePrepaga: string) =>
    setElegidas((lista) => {
      if (lista.includes(nombrePrepaga)) return lista.filter((n) => n !== nombrePrepaga);
      if (lista.length >= MAX_PREPAGAS) return lista;
      return [...lista, nombrePrepaga];
    });

  async function enviar(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (telefono.length !== 10) {
      setError("El teléfono debe tener 10 dígitos, sin 0 ni 15.");
      return;
    }
    setError("");
    setEstado("enviando");
    const prepaga = elegidas.length ? elegidas.join(", ") : "Sin preferencia";
    const datos = { tipoIngreso, grupoFamiliar, nombre, localidad, telefono, prepaga, prepagas: elegidas };

    try {
      const r = await fetch("/api/contacto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datos),
      });
      if (!r.ok) throw new Error("fallo el envio");
      setEstado("ok");
    } catch {
      // Si el envio falla (por ejemplo, antes de conectar Supabase), mandamos los datos por WhatsApp
      const texto = `Hola JR Group! Quiero cotizar.\nNombre: ${nombre}\nTeléfono: ${telefono}\nLocalidad: ${localidad}\nIngreso: ${tipoIngreso}\nPara: ${grupoFamiliar}\nPrepagas: ${prepaga}`;
      window.open(linkWhatsapp(texto), "_blank");
      setEstado("listo");
    }
  }

  if (estado === "ok") {
    return (
      <div className="rounded-3xl border border-gray-100 bg-white p-8 text-center shadow-xl">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-3xl font-bold text-emerald-600">
          ✓
        </div>
        <p className="mt-5 text-2xl font-extrabold text-jr-texto">¡Recibimos tu consulta!</p>
        <p className="mt-2 text-gray-600">Un asesor te escribe por WhatsApp con tu cotización.</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={enviar}
      className={`rounded-3xl ${
        compacto
          ? "relative space-y-3.5 overflow-hidden border border-white/25 bg-[#0b1b36]/45 p-6 shadow-2xl shadow-black/40 ring-1 ring-white/10 backdrop-blur-xl md:p-7"
          : "space-y-4 border border-gray-100 bg-white p-6 shadow-xl md:p-8"
      }`}
    >
      {/* Linea de color arriba de la tarjeta de vidrio */}
      {compacto && <div aria-hidden className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-jr-azul via-sky-300 to-jr-turquesa" />}

      {compacto ? (
        <div>
          <h3 className="text-2xl font-extrabold text-white">
            Pedí tu{" "}
            <span className="bg-gradient-to-r from-sky-300 to-jr-turquesa bg-clip-text text-transparent">cotización gratis</span>
          </h3>
          <p className="mt-1 text-sm text-white/70">Te respondemos por WhatsApp con planes y valores.</p>
        </div>
      ) : (
        <h3 className="text-lg font-bold text-jr-texto">Pedí tu cotización</h3>
      )}

      {/* En el hero las 2 preguntas van una al lado de la otra */}
      <div className={compacto ? "grid gap-3 sm:grid-cols-2 sm:space-y-0" : "space-y-4"}>
      <div>
        <label className={et}>{compacto ? "Tipo de ingreso *" : "¿Qué tipo de ingreso harías? *"}</label>
        <select value={tipoIngreso} onChange={(e) => setTipoIngreso(e.target.value)} required className={`${c} cursor-pointer`}>
          <option value="">Seleccionar...</option>
          {PREGUNTA_INGRESO.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
      </div>

      <div>
        <label className={et}>{compacto ? "¿Para quién es? *" : "¿Es para vos solo o grupo familiar? *"}</label>
        <select value={grupoFamiliar} onChange={(e) => setGrupoFamiliar(e.target.value)} required className={`${c} cursor-pointer`}>
          <option value="">Seleccionar...</option>
          {PREGUNTA_GRUPO.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
      </div>
      </div>

      <div>
        <label className={et}>Nombre y apellido *</label>
        <input value={nombre} onChange={(e) => setNombre(e.target.value)} required placeholder="Tu nombre completo" className={c} />
      </div>

      <div className={`grid sm:grid-cols-2 ${compacto ? "gap-3" : "gap-4"}`}>
        <div>
          <label className={et}>Localidad *</label>
          <input value={localidad} onChange={(e) => setLocalidad(e.target.value)} required placeholder="Ej: Buenos Aires" className={c} />
        </div>
        <div>
          <label className={et}>Teléfono / WhatsApp *</label>
          <input
            type="tel"
            inputMode="numeric"
            maxLength={10}
            value={telefono}
            onChange={(e) => setTelefono(e.target.value.replace(/\D/g, "").slice(0, 10))}
            required
            placeholder={compacto ? "10 dígitos, sin 0 ni 15" : "Ej: 1123456789"}
            className={c}
          />
          {!compacto && <span className="mt-1 block text-[11px] text-gray-400">10 dígitos, sin 0 ni 15</span>}
        </div>
      </div>

      {/* Prepagas de interes: se pueden marcar varias */}
      <div>
        <label className={et}>{compacto ? "¿Qué prepagas te interesan? (hasta 3)" : "¿Qué prepagas te interesan? (podés elegir hasta 3)"}</label>
        {/* Botones en 2 filas de 5: cada boton se estira para que las filas queden parejas */}
        <div className="space-y-1.5">
          {[prepagas.slice(0, 5), prepagas.slice(5)].map((fila, n) => (
            <div key={n} className="flex flex-wrap gap-1.5">
              {fila.map((p) => {
                const activa = elegidas.includes(p.nombre);
                const bloqueada = !activa && elegidas.length >= MAX_PREPAGAS; // ya hay 3 marcadas
                return (
                  <button
                    key={p.slug}
                    type="button"
                    onClick={() => alternar(p.nombre)}
                    aria-pressed={activa}
                    disabled={bloqueada}
                    className={`flex-auto basis-[30%] whitespace-nowrap rounded-full sm:basis-auto border px-2 py-1.5 text-center text-xs font-semibold transition ${
                      compacto
                        ? activa
                          ? "cursor-pointer border-white bg-white text-jr-azul shadow-md shadow-black/20"
                          : bloqueada
                          ? "cursor-not-allowed border-white/20 bg-white/5 text-white/80 opacity-40"
                          : "cursor-pointer border-white/30 bg-white/10 text-white hover:-translate-y-0.5 hover:bg-white/20"
                        : activa
                        ? "cursor-pointer border-jr-azul bg-jr-azul text-white shadow-md shadow-jr-azul/25"
                        : bloqueada
                        ? "cursor-not-allowed border-gray-200 bg-[#f5f5f7] text-gray-600 opacity-40"
                        : "cursor-pointer border-gray-200 bg-[#f5f5f7] text-gray-600 hover:border-jr-azul hover:text-jr-azul"
                    }`}
                  >
                    {activa ? "✓ " : ""}
                    {p.nombre}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
        {!compacto && (
          <span className="mt-1.5 block text-[11px] text-gray-400">Si no marcás ninguna, te recomendamos la que más te conviene.</span>
        )}
      </div>

      {error && <p className={`text-center text-xs font-medium ${compacto ? "text-red-200" : "text-red-600"}`}>{error}</p>}

      <button
        type="submit"
        disabled={estado === "enviando"}
        className={`w-full cursor-pointer rounded-xl py-3.5 text-sm font-bold uppercase tracking-wide text-white shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl disabled:translate-y-0 disabled:opacity-60 ${
          compacto
            ? "bg-gradient-to-r from-jr-azul to-teal-600 shadow-teal-900/40 ring-1 ring-white/20"
            : "bg-jr-azul hover:bg-jr-azul-oscuro"
        }`}
      >
        {estado === "enviando" ? "Enviando..." : "Quiero que me asesoren"}
      </button>
      {!compacto && <p className="text-center text-xs text-gray-500">Asesoramiento gratuito y sin compromiso.</p>}
    </form>
  );
}
