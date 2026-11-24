"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const menu = [
  { texto: "Inicio", href: "/" },
  { texto: "Prepagas", href: "/#prepagas" },
  { texto: "Cómo trabajamos", href: "/#como-trabajamos" },
  { texto: "Contacto", href: "/#contacto" },
];

export default function Header() {
  const [abierto, setAbierto] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white shadow-sm">
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-4">
        <Link href="/" onClick={() => setAbierto(false)}>
          <Image
            src="/img/logo-jr-group.png"
            alt="JR Group Asesores"
            width={160}
            height={48}
            priority
            className="h-12 w-auto"
          />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {menu.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium uppercase tracking-wide text-jr-texto hover:text-jr-azul"
            >
              {item.texto}
            </Link>
          ))}
          <Link
            href="/#contacto"
            className="rounded bg-jr-azul px-5 py-2.5 text-sm font-bold uppercase text-white hover:bg-jr-azul-oscuro"
          >
            Cotizá gratis
          </Link>
        </nav>

        <button
          type="button"
          aria-label="Abrir menú"
          onClick={() => setAbierto(!abierto)}
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
        >
          <span className="block h-0.5 w-6 bg-jr-azul" />
          <span className="block h-0.5 w-6 bg-jr-azul" />
          <span className="block h-0.5 w-6 bg-jr-azul" />
        </button>
      </div>

      {abierto && (
        <nav className="border-t border-gray-100 bg-white px-4 pb-4 md:hidden">
          {menu.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setAbierto(false)}
              className="block border-b border-gray-100 py-3 text-sm font-medium uppercase text-jr-texto"
            >
              {item.texto}
            </Link>
          ))}
          <Link
            href="/#contacto"
            onClick={() => setAbierto(false)}
            className="mt-4 block rounded bg-jr-azul py-3 text-center text-sm font-bold uppercase text-white"
          >
            Cotizá gratis
          </Link>
        </nav>
      )}
    </header>
  );
}