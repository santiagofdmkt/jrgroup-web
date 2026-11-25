"use client";

import { useEffect, useState } from "react";
import NextImage from "next/image";
import { linkWhatsapp } from "@/data/contacto";

// ====== DATOS DE LA PREPAGA (para armar otra landing, se cambia solo esta parte) ======
const PREPAGA = "Omint";
const LOGO = "/img/logo-omint.png";
const FOTO_HERO = "/img/hero-3.jpg";
const AZUL_OMINT = "#2a4f9e";

type Plan = { id: string; nombre: string; bajada: string; puntos: string[]; etiqueta?: string };

const PLANES: Plan[] = [
  {
    id: "vos",
    nombre: "Omint Vos",
    bajada: "El plan para jóvenes de 18 a 35 años. Simple, digital y sin trámites.",
    puntos: ["Contratación 100% digital", "Médico online", "Exclusivo para nuevos socios"],
    etiqueta: "18 a 35 años",
  },
  {
    id: "genesis",
    nombre: "Génesis",
    bajada: "Prepaga para jóvenes de hasta 25 años.",
    puntos: ["Habitación individual en clínicas propias", "Odontología general al 100%", "40% en medicamentos (70% crónicos)"],
    etiqueta: "Hasta 25 años",
  },
  {
    id: "global",
    nombre: "Global",
    bajada: "Cobertura médica nacional e internacional.",
    puntos: ["Seguro de viaje internacional", "Habitación individual en toda la cartilla", "Reintegros fuera de cartilla"],
  },
  {
    id: "clasico",
    nombre: "Clásico",
    bajada: "Cobertura integral, con más beneficios para tu familia.",
    puntos: ["Ortodoncia hasta los 25 años", "Acompañante en internación", "Reintegros por ecografía 3D/4D"],
  },
  {
    id: "premium",
    nombre: "Premium",
    bajada: "La cobertura de salud más avanzada de Omint.",
    puntos: ["Cobertura internacional incluida", "Check-up anual", "Acompañante pediátrico hasta 18 años"],
    etiqueta: "Máxima cobertura",
  },
];

const DATOS = [
  { valor: "3", texto: "clínicas propias" },
  { valor: "24/7", texto: "médico online" },
  { valor: "40%", texto: "de descuento en farmacias" },
  { valor: "5", texto: "planes para cada etapa" },
];

const TIPOS = [
  { icono: "★", titulo: "Particulares o monotributistas", texto: "Elegí el plan que mejor se adapta a vos. Si tenés hasta 35 años, mirá Omint Vos." },
  { icono: "⇄", titulo: "Relación de dependencia", texto: "Derivá tus aportes y pagá menos, sin cambiar de empleador." },
  { icono: "▣", titulo: "Empresas", texto: "Planes para pymes y grandes empresas, con atención corporativa." },
];

const PRESTACIONES = [
  { icono: "✚", titulo: "Clínicas propias", texto: "Clínica Santa Isabel, Clínica del Sol y Clínica Bazterrica." },
  { icono: "⌂", titulo: "Centros médicos propios", texto: "Bazterrica, Santa Isabel y Santa Rita en San Isidro." },
  { icono: "☎", titulo: "Médico Online", texto: "Consultá a un médico desde tu celular, las 24 horas." },
  { icono: "▤", titulo: "Autogestión y Smart Card", texto: "Credencial, autorizaciones y reintegros, todo online." },
  { icono: "☺", titulo: "Clínica Odontológica Omint", texto: "Odontología en un centro propio." },
  { icono: "%", titulo: "Club de beneficios", texto: "Descuentos y beneficios exclusivos para socios." },
];

const PREGUNTA_INGRESO = ["Trabajo en relación de dependencia", "Soy monotributista", "Soy responsable inscripto", "Soy particular"];
const PREGUNTA_GRUPO = ["Para mí solo", "Para mí y mi pareja", "Para mi grupo familiar completo"];

const campo =
  "w-full rounded-xl border-2 border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-[#2a4f9e]";
const etiqueta = "mb-1.5 block text-xs font-semibold text-gray-700";

// ====== FORMULARIO (el mismo para todas las prepagas) ======
function FormularioCotizacion({ plan }: { plan?: string }) {
  const [tipoIngreso, setTipoIngreso] = useState("");
  const [grupoFamiliar, setGrupoFamiliar] = useState("");
  const [nombre, setNombre] = useState("");
  const [localidad, setLocalidad] = useState("");
  const [telefono, setTelefono] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [enviado, setEnviado] = useState(false);
  const [error, setError] = useState(false);

  const enviar = async (e: React.FormEvent) => {
    e.preventDefault();
    if (telefono.length !== 10) {
      setError(true);
      return;
    }
    setEnviando(true);
    setError(false);
    try {
      const res = await fetch("/api/contacto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tipoIngreso, grupoFamiliar, nombre, localidad, telefono, planInteres: plan, prepaga: PREPAGA }),
      });
      if (!res.ok) throw new Error();
      setEnviado(true);
    } catch {
      setError(true);
    } finally {
      setEnviando(false);
    }
  };

  if (enviado) {
    return (
      <div className="py-6 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-3xl font-bold text-emerald-600">
          ✓
        </div>
        <h3 className="mt-5 text-2xl font-extrabold text-[#0b1b36]">¡Recibimos tu consulta!</h3>
        <p className="mt-2 text-gray-600">
          Un asesor te escribe por WhatsApp con tu cotización de {plan ? `${PREPAGA} ${plan}` : PREPAGA}.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={enviar} className="flex flex-col gap-3">
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
        <input type="text" placeholder="Tu nombre completo" value={nombre} onChange={(e) => setNombre(e.target.value)} required className={campo} />
      </div>
      <div>
        <label className={etiqueta}>Localidad *</label>
        <input type="text" placeholder="Ej: Buenos Aires, Córdoba..." value={localidad} onChange={(e) => setLocalidad(e.target.value)} required className={campo} />
      </div>
      <div>
        <label className={etiqueta}>Teléfono / WhatsApp *</label>
        <input
          type="tel"
          inputMode="numeric"
          maxLength={10}
          placeholder="Ej: 1123456789"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value.replace(/\D/g, "").slice(0, 10))}
          required
          className={campo}
        />
        <span className="mt-1 block text-[11px] text-gray-500">10 dígitos, sin 0 ni 15</span>
      </div>
      {error && (
        <p className="text-center text-xs text-red-600">
          {telefono.length !== 10 ? "El teléfono debe tener 10 dígitos, sin 0 ni 15." : "Hubo un error. Intentá de nuevo."}
        </p>
      )}
      <button
        type="submit"
        disabled={enviando}
        className="cursor-pointer mt-1 w-full rounded-xl bg-[#2a4f9e] py-3.5 text-base font-bold text-white shadow-lg shadow-indigo-900/25 transition hover:-translate-y-0.5 hover:bg-[#1f3d7d] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {enviando ? "Enviando..." : plan ? `Cotizar ${plan}` : "Cotizá tu plan"}
      </button>
      <p className="text-center text-[11px] leading-relaxed text-gray-500">
        Tu privacidad es vital. Evitamos llamadas molestas y correos invasivos.
      </p>
    </form>
  );
}

// ====== PAGINA ======
export default function OmintPage() {
  const [planModal, setPlanModal] = useState<string | null>(null);

  // Al entrar a la pagina, arranca siempre desde arriba de todo
  useEffect(() => {
    if (!window.location.hash) window.scrollTo(0, 0);
  }, []);

  return (
    <div className="overflow-x-hidden bg-white text-[#0b1b36]">
      {/* HERO */}
      <section className="relative overflow-hidden bg-[#0b1b36] text-white">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${FOTO_HERO})` }} />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b1b36] via-[#0b1b36]/90 to-[#0a1f4d]/50" />
        <div aria-hidden className="pointer-events-none absolute -left-32 top-1/4 h-96 w-96 rounded-full bg-[#2a4f9e]/25 blur-3xl" />

        <div className="relative mx-auto flex max-w-[1320px] flex-col items-center gap-10 px-4 py-14 md:px-8 lg:flex-row lg:gap-12 lg:py-20">
          <div className="flex flex-1 flex-col items-center text-center">
            <div className="overflow-hidden rounded-3xl border-2 border-white/40 shadow-[0_0_0_6px_rgba(255,255,255,0.08),0_0_45px_rgba(140,160,220,0.45),0_20px_50px_rgba(0,0,0,0.4)]">
              <NextImage src={LOGO} alt={PREPAGA} width={480} height={316} priority className="h-24 w-40 object-cover md:h-28 md:w-44" />
            </div>
            <span className="mt-7 rounded-lg border border-indigo-300/40 bg-indigo-400/15 px-4 py-1.5 text-xs font-bold tracking-wide text-indigo-200">
              ASESORES OFICIALES {PREPAGA.toUpperCase()}
            </span>
            <h1 className="mt-5 text-4xl font-extrabold leading-tight tracking-tight md:text-[52px]">
              Planes <span className="text-[#aebfe8]">{PREPAGA}</span>
              <br />
              para vos y tu familia
            </h1>
            <p className="mt-5 max-w-xl text-lg text-white/80">
              Te asesoramos <strong className="text-white">gratis</strong> y te enviamos la propuesta de{" "}
              <strong className="text-white">planes y valores</strong> que mejor se adapta a vos.
            </p>
          </div>

          <div id="cotizar" className="w-full max-w-[400px] scroll-mt-28 rounded-3xl bg-white p-7 text-gray-900 shadow-2xl shadow-black/40">
            <div className="mb-5 rounded-2xl bg-gradient-to-br from-[#2a4f9e] to-[#5672b8] p-4 text-center text-white shadow-lg shadow-indigo-900/25">
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-indigo-100">Cotización sin cargo</p>
              <p className="mt-1 text-base font-bold leading-snug">Completá tus datos y recibí tu cotización en minutos</p>
            </div>
            <FormularioCotizacion />
          </div>
        </div>
      </section>

      {/* AVISO */}
      <div className="border-l-4 border-[#2a4f9e] bg-indigo-50 px-4 py-3">
        <p className="mx-auto max-w-6xl text-sm text-[#1f3470]">
          <strong>Somos asesores oficiales de {PREPAGA}.</strong> Este sitio no reemplaza los canales oficiales de atención
          al afiliado.
        </p>
      </div>

      {/* NUMEROS */}
      <section className="bg-[#0b1b36] px-4 py-10">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 md:grid-cols-4">
          {DATOS.map((d) => (
            <div key={d.texto} className="text-center">
              <p className="text-3xl font-extrabold text-[#aebfe8] md:text-4xl">{d.valor}</p>
              <p className="mt-1 text-sm text-white/70">{d.texto}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PLANES */}
      <section id="planes" className="scroll-mt-24 bg-[#f5f5f7] px-4 py-16 md:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#2a4f9e]">Encontrá el que mejor se adapta a vos</p>
            <h2 className="mt-2 text-3xl font-extrabold md:text-5xl">
              Planes <span className="text-[#2a4f9e]">{PREPAGA}</span>
            </h2>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {PLANES.map((p) => (
              <div
                key={p.id}
                className="relative flex flex-col overflow-hidden rounded-3xl bg-white p-6 shadow-xl shadow-black/5 ring-1 ring-gray-100 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:ring-[#2a4f9e]/30"
              >
                <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-[#2a4f9e] to-[#5672b8]" />
                {p.etiqueta && (
                  <span className="absolute right-4 top-4 rounded-full bg-[#2a4f9e] px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
                    {p.etiqueta}
                  </span>
                )}
                <p className="text-xs font-bold uppercase tracking-wide text-gray-400">Plan</p>
                <h3 className="text-2xl font-extrabold">{p.nombre}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">{p.bajada}</p>
                <ul className="mt-4 flex-1 space-y-2 text-sm">
                  {p.puntos.map((x) => (
                    <li key={x} className="flex gap-2">
                      <span className="font-bold text-[#2a4f9e]">✓</span>
                      {x}
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  onClick={() => setPlanModal(p.nombre)}
                  className="cursor-pointer mt-6 w-full rounded-xl bg-[#0b1b36] py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#2a4f9e]"
                >
                  Quiero este plan
                </button>
              </div>
            ))}

            {/* Tarjeta de ayuda para completar la grilla */}
            <div className="flex flex-col justify-center rounded-3xl bg-gradient-to-br from-[#2a4f9e] to-[#5672b8] p-6 text-white shadow-xl shadow-indigo-900/25">
              <h3 className="text-2xl font-extrabold">¿No sabés cuál elegir?</h3>
              <p className="mt-2 text-sm text-white/90">
                También está <strong>Omint midoc</strong>, con médico online 24/7. Contanos qué necesitás y te recomendamos el ideal <strong>según tu edad, zona e ingresos</strong>.
              </p>
              <a
                href="#cotizar"
                className="mt-6 rounded-xl bg-white py-3 text-center text-sm font-bold text-[#2a4f9e] transition hover:-translate-y-0.5"
              >
                Pedir asesoramiento
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* COMO AFILIARTE */}
      <section className="bg-white px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#2a4f9e]">Planes para cada perfil</p>
            <h2 className="mt-2 text-3xl font-extrabold md:text-4xl">
              ¿Cómo querés <span className="text-[#2a4f9e]">afiliarte?</span>
            </h2>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {TIPOS.map((t) => (
              <div
                key={t.titulo}
                className="flex flex-col items-center rounded-3xl bg-[#f5f5f7] p-7 text-center ring-1 ring-gray-100 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0b1b36] text-2xl text-[#aebfe8] shadow-lg">
                  {t.icono}
                </span>
                <h3 className="mt-4 text-lg font-bold">{t.titulo}</h3>
                <p className="mt-2 text-sm text-gray-600">{t.texto}</p>
                <a href="#cotizar" className="mt-5 rounded-xl bg-[#2a4f9e] px-6 py-2.5 text-sm font-bold text-white transition hover:-translate-y-0.5">
                  Cotizar
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRESTACIONES */}
      <section className="bg-[#f5f5f7] px-4 py-16 md:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#2a4f9e]">Lo que incluye tu plan</p>
            <h2 className="mt-2 text-3xl font-extrabold md:text-4xl">
              Beneficios <span className="text-[#2a4f9e]">{PREPAGA}</span>
            </h2>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {PRESTACIONES.map((p) => (
              <div
                key={p.titulo}
                className="flex gap-4 rounded-3xl bg-white p-6 shadow-lg shadow-black/5 ring-1 ring-gray-100 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#2a4f9e] to-[#5672b8] text-xl font-bold text-white">
                  {p.icono}
                </span>
                <div>
                  <h3 className="font-bold">{p.titulo}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-gray-600">{p.texto}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <a
              href="#cotizar"
              className="inline-block rounded-xl bg-[#2a4f9e] px-10 py-4 font-bold text-white shadow-lg shadow-indigo-900/25 transition hover:-translate-y-0.5"
            >
              Cotizá tu plan
            </a>
          </div>
        </div>
      </section>

      {/* WHATSAPP */}
      <section className="relative overflow-hidden bg-gradient-to-r from-[#0b1b36] to-[#0a1f4d] px-4 py-16 text-center text-white">
        <h2 className="text-3xl font-extrabold md:text-4xl">
          ¿Querés hablar ahora <span className="text-[#aebfe8]">con un asesor?</span>
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-white/80">
          Te asesoramos sin compromiso y encontramos el plan {PREPAGA} ideal para vos y tu familia.
        </p>
        <a
          href={linkWhatsapp(`Hola! Quiero consultar sobre planes ${PREPAGA}`)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[#25D366] px-10 py-4 text-lg font-bold text-white shadow-lg shadow-emerald-500/30 transition hover:-translate-y-0.5"
        >
          Escribinos por WhatsApp
        </a>
      </section>

      {/* LEGALES */}
      <section className="bg-[#0b1b36] px-4 py-8 text-center">
        <p className="mx-auto max-w-3xl text-xs leading-relaxed text-white/50">
          Superintendencia de Servicios de Salud. Órgano de Control de Obras Sociales y Entidades de Medicina Prepaga.
          0800 222 SALUD (72583) | www.sssalud.gob.ar
        </p>
        <p className="mt-2 text-[11px] text-white/30">2026 Asesores Oficiales {PREPAGA} - JR Group</p>
      </section>

      {/* VENTANA DE COTIZACION POR PLAN */}
      {planModal && (
        <div
          className="fixed inset-0 z-[1000] flex items-start justify-center overflow-y-auto bg-[#0b1b36]/90 px-4 pb-10 pt-14"
          onClick={() => setPlanModal(null)}
        >
          <div className="relative w-full max-w-[420px]" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              aria-label="Cerrar"
              onClick={() => setPlanModal(null)}
              className="cursor-pointer absolute -top-12 right-0 h-10 w-10 rounded-full bg-white/15 text-lg font-bold text-white hover:bg-white/25"
            >
              ✕
            </button>
            <div className="rounded-3xl bg-white p-7 shadow-2xl">
              <div className="mb-5 rounded-2xl bg-[#2a4f9e] p-3 text-center font-bold text-white">
                Cotizá tu plan {PREPAGA} {planModal}
              </div>
              <FormularioCotizacion plan={planModal} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
