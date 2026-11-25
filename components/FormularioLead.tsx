"use client";

import { useState } from "react";
import { prepagas } from "@/data/prepagas";
import { linkWhatsapp } from "@/data/contacto";

type Props = {
  prepagaInicial?: string; // si viene una prepaga, aparece ya marcada
};

// Las mismas preguntas que en las landings de cada prepaga
const PREGUNTA_INGRESO = ["Trabajo en relación de dependencia", "Soy monotributista", "Soy responsable inscripto", "Soy particular"];
const PREGUNTA_GRUPO = ["Para mí solo", "Para mí y mi pareja", "Para mi grupo familiar completo"];

const campo =
  "w-full rounded-xl border border-gray-200 bg-[#f5f5f7] px-4 py-3 text-sm text-jr-texto placeholder:text-gray-400 transition focus:border-jr-azul focus:bg-white focus:outline-none focus:ring-4 focus:ring-jr-azul/15";
const etiqueta = "mb-1.5 block text-xs font-semibold uppercase tracking-wide text-gray-500";

export default function FormularioLead({ prepagaInicial = "" }: Props) {
  const [tipoIngreso, setTipoIngreso] = useState("");
  const [grupoFamiliar, setGrupoFamiliar] = useState("");
  const [nombre, setNombre] = useState("");
  const [localidad, setLocalidad] = useState("");
  const [telefono, setTelefono] = useState("");
  const [elegidas, setElegidas] = useState<string[]>(prepagaInicial ? [prepagaInicial] : []);
  const [estado, setEstado] = useState<"listo" | "enviando" | "ok">("listo");
  const [error, setError] = useState("");

  // Marca o desmarca una prepaga (se pueden elegir varias)
  const alternar = (nombrePrepaga: string) =>
    setElegidas((lista) =>
      lista.includes(nombrePrepaga) ? lista.filter((n) => n !== nombrePrepaga) : [...lista, nombrePrepaga]
    );

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
    <form onSubmit={enviar} className="space-y-4 rounded-3xl border border-gray-100 bg-white p-6 shadow-xl md:p-8">
      <h3 className="text-lg font-bold text-jr-texto">Pedí tu cotización</h3>

      <div>
        <label className={etiqueta}>¿Qué tipo de ingreso harías? *</label>
        <select value={tipoIngreso} onChange={(e) => setTipoIngreso(e.target.value)} required className={`${campo} cursor-pointer`}>
          <option value="">Seleccionar...</option>
          {PREGUNTA_INGRESO.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
      </div>

      <div>
        <label className={etiqueta}>¿Es para vos solo o grupo familiar? *</label>
        <select value={grupoFamiliar} onChange={(e) => setGrupoFamiliar(e.target.value)} required className={`${campo} cursor-pointer`}>
          <option value="">Seleccionar...</option>
          {PREGUNTA_GRUPO.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
      </div>

      <div>
        <label className={etiqueta}>Nombre y apellido *</label>
        <input value={nombre} onChange={(e) => setNombre(e.target.value)} required placeholder="Tu nombre completo" className={campo} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={etiqueta}>Localidad *</label>
          <input value={localidad} onChange={(e) => setLocalidad(e.target.value)} required placeholder="Ej: Buenos Aires" className={campo} />
        </div>
        <div>
          <label className={etiqueta}>Teléfono / WhatsApp *</label>
          <input
            type="tel"
            inputMode="numeric"
            maxLength={10}
            value={telefono}
            onChange={(e) => setTelefono(e.target.value.replace(/\D/g, "").slice(0, 10))}
            required
            placeholder="Ej: 1123456789"
            className={campo}
          />
          <span className="mt-1 block text-[11px] text-gray-400">10 dígitos, sin 0 ni 15</span>
        </div>
      </div>

      {/* Prepagas de interes: se pueden marcar varias */}
      <div>
        <label className={etiqueta}>¿Qué prepagas te interesan? (podés elegir varias)</label>
        <div className="flex flex-wrap gap-2">
          {prepagas.map((p) => {
            const activa = elegidas.includes(p.nombre);
            return (
              <button
                key={p.slug}
                type="button"
                onClick={() => alternar(p.nombre)}
                aria-pressed={activa}
                className={`cursor-pointer rounded-full border px-3.5 py-1.5 text-xs font-semibold transition ${
                  activa
                    ? "border-jr-azul bg-jr-azul text-white shadow-md shadow-jr-azul/25"
                    : "border-gray-200 bg-[#f5f5f7] text-gray-600 hover:border-jr-azul hover:text-jr-azul"
                }`}
              >
                {activa ? "✓ " : ""}
                {p.nombre}
              </button>
            );
          })}
        </div>
        <span className="mt-1.5 block text-[11px] text-gray-400">Si no marcás ninguna, te recomendamos la que más te conviene.</span>
      </div>

      {error && <p className="text-center text-xs font-medium text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={estado === "enviando"}
        className="w-full cursor-pointer rounded-xl bg-jr-azul py-3.5 text-sm font-bold uppercase tracking-wide text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-jr-azul-oscuro hover:shadow-xl disabled:translate-y-0 disabled:opacity-60"
      >
        {estado === "enviando" ? "Enviando..." : "Quiero que me asesoren"}
      </button>
      <p className="text-center text-xs text-gray-500">Asesoramiento gratuito y sin compromiso.</p>
    </form>
  );
}
