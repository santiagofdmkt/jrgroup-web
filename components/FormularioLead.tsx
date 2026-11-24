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
      <div className="rounded-lg bg-white p-8 text-center shadow-md">
        <p className="text-2xl font-bold text-jr-azul">¡Gracias!</p>
        <p className="mt-2 text-gray-700">Recibimos tus datos. Un asesor te va a contactar a la brevedad.</p>
      </div>
    );
  }

  const campo =
    "w-full rounded border border-gray-300 px-4 py-3 text-sm focus:border-jr-azul focus:outline-none focus:ring-2 focus:ring-jr-azul/30";

  return (
    <form onSubmit={enviar} className="space-y-4 rounded-lg bg-white p-6 shadow-md md:p-8">
      <input name="nombre" required placeholder="Nombre y apellido" className={campo} />
      <input name="telefono" required type="tel" placeholder="Teléfono (con código de área)" className={campo} />
      <div className="grid grid-cols-2 gap-4">
        <input name="zona" required placeholder="Localidad" className={campo} />
        <input name="edad" required type="number" min={0} max={110} placeholder="Edad" className={campo} />
      </div>
      <select name="prepaga" defaultValue={prepagaInicial} className={campo}>
        <option value="">Seleccionar prepaga (opcional)</option>
        {prepagas.map((p) => (
          <option key={p.slug} value={p.nombre}>
            {p.nombre}
          </option>
        ))}
      </select>
      <button
        type="submit"
        disabled={estado === "enviando"}
        className="w-full rounded bg-jr-azul py-3 text-sm font-bold uppercase text-white hover:bg-jr-azul-oscuro disabled:opacity-60"
      >
        {estado === "enviando" ? "Enviando..." : "Quiero que me asesoren"}
      </button>
      <p className="text-center text-xs text-gray-500">Asesoramiento gratuito y sin compromiso.</p>
    </form>
  );
}