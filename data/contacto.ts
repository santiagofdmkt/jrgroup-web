// Datos de contacto de JR Group. Si cambia un numero o mail, se cambia solo aca.

export const contacto = {
  whatsapp: "5492966561516", // sin +, sin espacios ni guiones
  whatsappVisible: "+54 9 2966 56-1516",
  mensajeWhatsapp: "Hola JR Group! Quiero cotizar una prepaga.",
  email: "info@jrgroup.com.ar",
  instagram: "https://www.instagram.com/jrgroup_asesores/",
  facebook: "https://www.facebook.com/jrgroup",
};

export function linkWhatsapp(mensaje: string = contacto.mensajeWhatsapp): string {
  return `https://wa.me/${contacto.whatsapp}?text=${encodeURIComponent(mensaje)}`;
}