"use client";

import { useState } from "react";
import { prepagas } from "@/data/prepagas";
import { linkWhatsapp } from "@/data/contacto";

type Props = {
  prepagaInicial?: string; // en la landing de una prepaga, viene elegida
};

export default function FormularioLead({ prepagaInicial = "" }: Props) {
  const [estado, setEstado] = useState<"listo" | "enviando" | "ok">("listo");

  async function enviar(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setEstado("enviando");
    const datos = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;

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
      const texto = `Hola JR Group! Quiero cotizar.\nNombre: ${datos.nombre}\nTeléfono: ${datos.telefono}\nZona: ${datos.zona}\nEdad: ${datos.edad}\nPrepaga: ${datos.prepaga || "Sin preferencia"}`;
      window.open(linkWhatsapp(texto), "_blank");
      setEstado("listo");
    }
  }

  if (estado === "ok") {
    return (
      <div className="rounded-2xl border border-gray-100 bg-white p-8 text-center shadow-xl">
        <p className="text-2xl font-bold text-jr-azul">¡Gracias!</p>
        <p className="mt-2 text-gray-700">Recibimos tus datos. Un asesor te va a contactar a la brevedad.</p>
      </div>
    );
  }

  const campo =
    "w-full rounded-xl border border-gray-200 bg-jr-fondo/40 px-4 py-3 text-sm text-jr-texto placeholder:text-gray-400 transition focus:border-jr-azul focus:bg-white focus:outline-none focus:ring-4 focus:ring-jr-azul/15";
  const etiqueta = "mb-1.5 block text-xs font-semibold uppercase tracking-wide text-gray-500";

  return (
    <form
      onSubmit={enviar}
      className="space-y-4 rounded-2xl border border-gray-100 bg-white p-6 shadow-xl md:p-8"
    >
      <h3 className="text-lg font-bold text-jr-texto">Pedí tu cotización</h3>

      <div>
        <label className={etiqueta}>Nombre y apellido</label>
        <input name="nombre" required placeholder="Ej: Juan Pérez" className={campo} />
      </div>

      <div>
        <label className={etiqueta}>Teléfono</label>
        <input name="telefono" required type="tel" placeholder="Con código de área" className={campo} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={etiqueta}>Localidad</label>
          <input name="zona" required placeholder="Ciudad" className={campo} />
        </div>
        <div>
          <label className={etiqueta}>Edad</label>
          <input name="edad" required type="number" min={0} max={110} placeholder="Años" className={campo} />
        </div>
      </div>

      <div>
        <label className={etiqueta}>Prepaga</label>
        <select name="prepaga" defaultValue={prepagaInicial} className={campo}>
          <option value="">Seleccionar prepaga (opcional)</option>
          {prepagas.map((p) => (
            <option key={p.slug} value={p.nombre}>
              {p.nombre}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        disabled={estado === "enviando"}
        className="w-full rounded-xl bg-jr-azul py-3.5 text-sm font-bold uppercase tracking-wide text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-jr-azul-oscuro hover:shadow-xl disabled:translate-y-0 disabled:opacity-60"
      >
        {estado === "enviando" ? "Enviando..." : "Quiero que me asesoren"}
      </button>
      <p className="text-center text-xs text-gray-500">Asesoramiento gratuito y sin compromiso.</p>
    </form>
  );
}
