"use client";
import Link from "next/link";
import Image from "next/image";
import { contacto, linkWhatsapp } from "@/data/contacto";
import { prepagas } from "@/data/prepagas";

export default function Footer() {
  return (
    <footer className="bg-jr-fondo text-jr-texto">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Image
            src="/img/logo-jr-group.png"
            alt="JR Group Asesores"
            width={160}
            height={48}
            className="mb-4 h-10 w-auto"
          />
          <p className="text-sm leading-relaxed text-gray-600">
            Asesores de Prepagas y Coberturas Médicas. Unificamos tu afiliación en un solo lugar, para que compares las mejores opciones y elijas el Plan de salud que más te conviene. Sin costo extra, pedí tu cotización y recibila en minutos.
          </p>
        </div>

        <div>
          <h3 className="mb-4 font-semibold">Prepagas</h3>
          <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-gray-600">
            {prepagas.map((p) => (
              <li key={p.slug}>
                <Link href={`/${p.slug}`} className="cursor-pointer hover:text-jr-azul">
                  {p.nombre}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 font-semibold">Contacto</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>
              <a href={linkWhatsapp()} target="_blank" rel="noopener" className="cursor-pointer hover:text-jr-azul">
                WhatsApp: {contacto.whatsappVisible}
              </a>
            </li>
            <li>
              <a href={`mailto:${contacto.email}`} className="cursor-pointer hover:text-jr-azul">
                {contacto.email}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 font-semibold">Seguinos</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>
              <a href={contacto.instagram} target="_blank" rel="noopener" className="cursor-pointer hover:text-jr-azul">
                Instagram
              </a>
            </li>
            <li>
              <a href={contacto.facebook} target="_blank" rel="noopener" className="cursor-pointer hover:text-jr-azul">
                Facebook
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-200">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 text-xs text-gray-500">
          <p>&copy; 2026 JR Group · Asesores en prepagas y coberturas médicas</p>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Volver arriba"
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-gray-300 text-jr-texto transition hover:border-jr-azul hover:text-jr-azul"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="18 15 12 9 6 15" />
            </svg>
          </button>
          <p>Asesoramiento gratuito y sin compromiso</p>
        </div>
      </div>
    </footer>
  );
}
