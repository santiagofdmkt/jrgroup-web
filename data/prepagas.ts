// Lista central de prepagas de JR Group.
// Para activar una prepaga: cambiar activa a true.

export type Prepaga = {
  slug: string; // la ruta: jrgroup.../slug
  nombre: string; // nombre visible
  activa: boolean; // true = landing completa, false = "Proximamente"
  resumen: string; // texto corto de la tarjeta en la home
  logo: string; // ruta del logo en public/img
  tituloSeo: string; // titulo de la pestaña y de Google
  descripcionSeo: string; // descripcion que muestra Google
};

export const prepagas: Prepaga[] = [
  {
    slug: "sancor-salud",
    nombre: "SanCor Salud",
    activa: true,
    resumen: "Planes para individuos, familias y monotributistas.",
    logo: "/img/logo-sancor-salud.png",
    tituloSeo: "SanCor Salud | Planes y precios | JR Group",
    descripcionSeo:
      "Cotizá SanCor Salud con asesoramiento gratis. Compará planes y precios para vos y tu familia.",
  },
  {
    slug: "medife",
    nombre: "Medifé",
    activa: false,
    resumen: "Cobertura médica con red de prestadores en todo el país.",
    logo: "/img/logo-medife.png",
    tituloSeo: "Medifé | Planes y precios | JR Group",
    descripcionSeo:
      "Cotizá Medifé con asesoramiento gratis. Compará planes y precios para vos y tu familia.",
  },
  {
    slug: "avalian",
    nombre: "Avalian",
    activa: false,
    resumen: "Planes de salud con alcance nacional.",
    logo: "/img/logo-avalian.png",
    tituloSeo: "Avalian | Planes y precios | JR Group",
    descripcionSeo:
      "Cotizá Avalian con asesoramiento gratis. Compará planes y precios para vos y tu familia.",
  },
  {
    slug: "premedic",
    nombre: "Premedic",
    activa: false,
    resumen: "Cobertura médica accesible para toda la familia.",
    logo: "/img/logo-premedic.png",
    tituloSeo: "Premedic | Planes y precios | JR Group",
    descripcionSeo:
      "Cotizá Premedic con asesoramiento gratis. Compará planes y precios para vos y tu familia.",
  },
  {
    slug: "galeno",
    nombre: "Galeno",
    activa: false,
    resumen: "Planes con sanatorios y centros médicos propios.",
    logo: "/img/logo-galeno.png",
    tituloSeo: "Galeno | Planes y precios | JR Group",
    descripcionSeo:
      "Cotizá Galeno con asesoramiento gratis. Compará planes y precios para vos y tu familia.",
  },
  {
    slug: "prevencion-salud",
    nombre: "Prevención Salud",
    activa: false,
    resumen: "Planes flexibles para cada etapa de tu vida.",
    logo: "/img/logo-prevencion-salud.png",
    tituloSeo: "Prevención Salud | Planes y precios | JR Group",
    descripcionSeo:
      "Cotizá Prevención Salud con asesoramiento gratis. Compará planes y precios para vos y tu familia.",
  },
  {
    slug: "swiss-medical",
    nombre: "Swiss Medical",
    activa: false,
    resumen: "Cobertura premium con amplia red de prestadores.",
    logo: "/img/logo-swiss-medical.png",
    tituloSeo: "Swiss Medical | Planes y precios | JR Group",
    descripcionSeo:
      "Cotizá Swiss Medical con asesoramiento gratis. Compará planes y precios para vos y tu familia.",
  },
  {
    slug: "hominis",
    nombre: "Hominis",
    activa: false,
    resumen: "Planes de salud pensados para vos.",
    logo: "/img/logo-hominis.png",
    tituloSeo: "Hominis | Planes y precios | JR Group",
    descripcionSeo:
      "Cotizá Hominis con asesoramiento gratis. Compará planes y precios para vos y tu familia.",
  },
  {
    slug: "doctored",
    nombre: "Doctored",
    activa: false,
    resumen: "Cobertura médica cercana y personalizada.",
    logo: "/img/logo-doctored.png",
    tituloSeo: "Doctored | Planes y precios | JR Group",
    descripcionSeo:
      "Cotizá Doctored con asesoramiento gratis. Compará planes y precios para vos y tu familia.",
  },
  {
    slug: "omint",
    nombre: "Omint",
    activa: false,
    resumen: "Planes de salud con atención de primer nivel.",
    logo: "/img/logo-omint.png",
    tituloSeo: "Omint | Planes y precios | JR Group",
    descripcionSeo:
      "Cotizá Omint con asesoramiento gratis. Compará planes y precios para vos y tu familia.",
  },
];

// Busca una prepaga por su ruta. Devuelve undefined si no existe.
export function buscarPrepaga(slug: string): Prepaga | undefined {
  return prepagas.find((p) => p.slug === slug);
}
