'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import NextImage from 'next/image'
import { linkWhatsapp } from '@/data/contacto'

type Plan = { id: string; nombre: string; color: string; img: string; info: string; popular?: boolean }

const IMGS = {
  hero: '/imagenes/foto-portada-para-celulares-sancor-salud.jpg',
  logo: '/imagenes/logo.png',
  logoSancor: '/img/logo-sancor-salud.png',
  gen:  '/imagenes/gen.png',
  bannerPyme: '/imagenes/banner-pyme.jpg',
  tipos: {
    particulares: '/imagenes/particulares-o-autonomos.png',
    dependencia:  '/imagenes/relacion-de-dependencia.png',
    corporativos: '/imagenes/planes-corporativos.png',
  },
  prestaciones: {
    cobertura:    '/imagenes/logo-1-removebg-preview.png',
    red:          '/imagenes/logo-2-removebg-preview.png',
    videollamada: '/imagenes/logo-3-removebg-preview.png',
    emergencias:  '/imagenes/logo-5-removebg-preview.png',
    odonto:       '/imagenes/logo-4-removebg-preview.png',
    gestiones:    '/imagenes/logo-6-removebg-preview.png',
  },
  clinicas: {
    aleman:     '/imagenes/aleman-removebg-preview.png',
    austral:    '/imagenes/austral-final-removebg-preview.png',
    britanico:  '/imagenes/britanico-removebg-preview.png',
    cemic:      '/imagenes/cemic-removebg-preview.png',
    sol:        '/imagenes/clinica-del-sol-removebg-preview.png',
    bazterrica: '/imagenes/bazterrica-removebg-preview.png',
  }
}

const NAV_ITEMS = [
  { label: 'Volver a JR Group', href: '/' },
]

const PLANES: Plan[] = [
  { id: 'F800',  nombre: 'Plan F800',  color: '#E91E8C', img: '/imagenes/plan-800.jpeg',  info: '/imagenes/plan-800-info.jpg' },
  { id: 'S1000', nombre: 'Plan S1000', color: '#3FAEDC', img: '/imagenes/plan-1000.jpeg', info: '/imagenes/plan-1000-info.jpg', popular: true },
  { id: 'S1500', nombre: 'Plan S1500', color: '#00ACC1', img: '/imagenes/plan-1500.jpeg', info: '/imagenes/plan-1500-info.jpg' },
  { id: 'S3000', nombre: 'Plan S3000', color: '#1565C0', img: '/imagenes/plan-3000.jpeg', info: '/imagenes/plan-3000-info.jpg' },
]

export default function SancorSaludPage() {
  const [tipoIngreso, setTipoIngreso] = useState('')
  const [grupoFamiliar, setGrupoFamiliar] = useState('')
  const [nombre, setNombre] = useState('')
  const [localidad, setLocalidad] = useState('')
  const [telefono, setTelefono] = useState('')
  const [enviado, setEnviado] = useState(false)
  const [enviando, setEnviando] = useState(false)
  const [error, setError] = useState(false)
  const [carruselIdx, setCarruselIdx] = useState(0)
  const [menuAbierto, setMenuAbierto] = useState(false)
  const [planModal, setPlanModal] = useState<Plan | null>(null)
  const [modalEnviado, setModalEnviado] = useState(false)
  const carruselRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const clinicas = [
    { nombre: 'Hospital Aleman',    img: IMGS.clinicas.aleman },
    { nombre: 'Hospital Austral',   img: IMGS.clinicas.austral },
    { nombre: 'Hospital Britanico', img: IMGS.clinicas.britanico },
    { nombre: 'CEMIC',              img: IMGS.clinicas.cemic },
    { nombre: 'Clinica del Sol',    img: IMGS.clinicas.sol },
    { nombre: 'Clinica Bazterrica', img: IMGS.clinicas.bazterrica },
  ]

  useEffect(() => {
    carruselRef.current = setInterval(() => {
      setCarruselIdx(prev => (prev + 1) % clinicas.length)
    }, 2500)
    return () => { if (carruselRef.current) clearInterval(carruselRef.current) }
  }, [clinicas.length])

  useEffect(() => {
    if (!menuAbierto) return
    const handler = () => setMenuAbierto(false)
    document.addEventListener('click', handler)
    return () => document.removeEventListener('click', handler)
  }, [menuAbierto])

  // Al entrar a la pagina, arranca siempre desde arriba de todo
  useEffect(() => {
    if (!window.location.hash) window.scrollTo(0, 0)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (telefono.length !== 10) { setError(true); return }
    setEnviando(true)
    setError(false)
    try {
      const res = await fetch('/api/contacto', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tipoIngreso, grupoFamiliar, nombre, localidad, telefono, prepaga: 'SanCor Salud' }),
      })
      if (!res.ok) throw new Error()
      setEnviado(true)
    } catch {
      setError(true)
    } finally {
      setEnviando(false)
    }
  }

   const abrirPlan = (p: Plan) => {
    setPlanModal(p)
    setModalEnviado(false)
  }
  const cerrarModal = () => setPlanModal(null)

  const abrirGen = () => {
    setPlanModal({ id: 'GEN', nombre: 'Plan GEN', color: '#FF6B00', img: '/imagenes/gen.png', info: '/imagenes/gen.png' })
        setModalEnviado(false)
  }

  const handleModalSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (telefono.length !== 10) { setError(true); return }
    setEnviando(true)
    setError(false)
    try {
      const res = await fetch('/api/contacto', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tipoIngreso, grupoFamiliar, nombre, localidad, telefono, planInteres: planModal?.nombre, prepaga: 'SanCor Salud' }),
      })
      if (!res.ok) throw new Error()
      setModalEnviado(true)
    } catch {
      setError(true)
    } finally {
      setEnviando(false)
    }
  }

  const prestaciones = [
    { img: IMGS.prestaciones.cobertura,    titulo: 'Cobertura Medica Integral',              desc: 'Consultas y practicas medicas, internacion al 100% y emergencias a domicilio' },
    { img: IMGS.prestaciones.red,          titulo: 'Red de Prestadores mas grande del Pais', desc: 'Mas de 200.000 medicos, sanatorios y centros de diagnostico en todo el pais' },
    { img: IMGS.prestaciones.videollamada, titulo: 'Atencion por Videollamada',              desc: 'Mas de 20 especialidades con guardia medica y pediatrica 24/7' },
    { img: IMGS.prestaciones.emergencias,  titulo: 'Emergencias Medicas las 24hs',           desc: 'Atencion medica en domicilio, urgencias y emergencias las 24hs' },
    { img: IMGS.prestaciones.odonto,       titulo: 'Odontologia General al 100%',            desc: 'Consultas y tratamientos. Urgencias y Centros para imagenes' },
    { img: IMGS.prestaciones.gestiones,    titulo: 'Gestiones Online',                       desc: 'Autorizaciones, recetas digitales, consulta tu factura, imprimi tu credencial' },
  ]

  const tiposCliente = [
    { img: IMGS.tipos.particulares, titulo: 'Particulares o autonomos',  desc: 'La mejor opcion precio calidad. Planes sin obra social.' },
    { img: IMGS.tipos.dependencia,  titulo: 'Relacion de dependencia',   desc: 'Deriva tus aportes y paga menos. Sin cambiar de empleador.' },
    { img: IMGS.tipos.corporativos, titulo: 'Planes corporativos',       desc: 'Te cotizamos el mejor plan para vos y tus empleados.' },
  ]

  const stats = [
    { num: '+700.000', label: 'Afiliados en todo el pais' },
    { num: '+200.000', label: 'Prestadores medicos' },
    { num: '+300',     label: 'Centros de atencion' },
    { num: '+3.500',   label: 'Empresas asociadas' },
  ]

  return (
    <div style={{ fontFamily: "var(--font-sans), 'Segoe UI', sans-serif", color: '#1a1a2e', background: '#fff', overflowX: 'hidden' }}>
      <style>{`
        .btn-naranja {
          background: #F56400;
          color: white; border: none; border-radius: 12px;
          padding: 16px 38px; font-size: 16px; font-weight: 700;
          cursor: pointer; transition: background 0.2s, transform 0.2s, box-shadow 0.2s;
          box-shadow: 0 6px 18px rgba(245,100,0,0.28); text-decoration: none; display: inline-block;
        }
        .btn-naranja:hover { background: #E25A00; transform: translateY(-2px); box-shadow: 0 10px 26px rgba(245,100,0,0.34); }

        select, input[type=text], input[type=tel] {
          width: 100%; padding: 13px 16px; border: 2px solid #e0e0f0;
          border-radius: 12px; font-size: 14px; font-family: inherit;
          background: white; color: #1a1a2e; transition: border-color 0.2s; appearance: none;
        }
        select:focus, input:focus { outline: none; border-color: #1565C0; }

        .plan-card-v2 {
          border-radius: 22px; overflow: hidden; position: relative;
          transition: transform 0.25s, box-shadow 0.25s;
          box-shadow: 0 8px 32px rgba(0,0,0,0.12); background: white;
          display: flex; flex-direction: column;
        }
        .plan-card-v2:hover { transform: translateY(-8px); box-shadow: 0 24px 56px rgba(0,0,0,0.18); }
        .plan-card-v2 .badge-popular {
          position: absolute; top: 14px; right: 14px; z-index: 2;
          background: #F56400; color: white;
          font-size: 10px; font-weight: 700; letter-spacing: 1px;
          padding: 6px 13px; border-radius: 8px;
          box-shadow: 0 4px 14px rgba(245,100,0,0.4);
        }

        .tipo-card {
          background: #f8faff; border-radius: 18px; padding: 24px 20px;
          text-align: center; box-shadow: 0 6px 28px rgba(13,36,97,0.08);
          border: 1px solid rgba(13,36,97,0.05);
          transition: transform 0.2s, box-shadow 0.2s;
          display: flex; flex-direction: column; align-items: center;
        }
        .tipo-card:hover { transform: translateY(-5px); box-shadow: 0 16px 40px rgba(13,36,97,0.13); }
        .tipo-card .icono-wrap {
          width: 80px; height: 80px;
          background: #0D2461; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          margin: 0 auto 14px; overflow: hidden;
          box-shadow: 0 0 0 8px rgba(13,36,97,0.08), 0 4px 14px rgba(13,36,97,0.18);
        }
        .tipo-card .icono-wrap img { width: 100%; height: 100%; object-fit: cover; }

        .prest-card {
          background: white; border-radius: 18px; padding: 32px 24px;
          box-shadow: 0 4px 24px rgba(13,36,97,0.07);
          border: 1px solid rgba(13,36,97,0.06);
          transition: transform 0.2s, box-shadow 0.2s;
          display: flex; flex-direction: column; align-items: center; text-align: center;
        }
        .prest-card:hover { transform: translateY(-4px); box-shadow: 0 10px 36px rgba(13,36,97,0.12); }

        .carrusel-wrapper { overflow: hidden; width: 100%; }
        .carrusel-track {
          display: flex; gap: 16px;
          transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .clinica-card {
          flex: 0 0 calc(25% - 12px); min-width: calc(25% - 12px);
          background: #0D2461; border-radius: 14px; padding: 22px 16px;
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 2px 14px rgba(13,36,97,0.2);
          border: 1px solid rgba(255,255,255,0.08); min-height: 88px;
          transition: transform 0.2s;
        }
        .clinica-card:hover { transform: translateY(-3px); }

        .hamburger-sancor {
          display: none; flex-direction: column; gap: 5px;
          cursor: pointer; padding: 6px; background: none; border: none; z-index: 200;
        }
        .hamburger-sancor span {
          display: block; width: 24px; height: 2px;
          background: white; border-radius: 2px; transition: all 0.3s;
        }
        .hamburger-sancor.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
        .hamburger-sancor.open span:nth-child(2) { opacity: 0; }
        .hamburger-sancor.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

        .nav-desktop-sancor { display: flex; gap: 24px; align-items: center; }

        .plan-modal-overlay {
          position: fixed; inset: 0; background: rgba(10,26,74,0.88);
          z-index: 1000; display: flex; align-items: flex-start; justify-content: center;
          padding: 56px 16px 40px; overflow-y: auto;
        }

        @media (max-width: 768px) {
          .hero-grid-sancor { flex-direction: column !important; gap: 32px !important; padding: 40px 5% !important; }
          .hero-form-sancor { flex: unset !important; width: 100% !important; max-width: 100% !important; }
          .planes-grid-sancor { grid-template-columns: 1fr 1fr !important; }
          .prestaciones-grid-sancor { grid-template-columns: 1fr 1fr !important; }
          .tipos-grid-sancor { grid-template-columns: 1fr !important; }
          .gen-grid-sancor { flex-direction: column !important; text-align: center; gap: 32px !important; }
          .stats-grid-sancor { grid-template-columns: 1fr 1fr !important; }
          .clinica-card { flex: 0 0 calc(50% - 8px); min-width: calc(50% - 8px); }
        }
        @media (max-width: 480px) {
          .planes-grid-sancor { grid-template-columns: 1fr !important; }
          .prestaciones-grid-sancor { grid-template-columns: 1fr !important; }
          .clinica-card { flex: 0 0 calc(50% - 8px); min-width: calc(50% - 8px); }
        }
      `}</style>

      {/* HERO */}
      <section style={{ position: 'relative', minHeight: 620, display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
        <Image src={IMGS.hero} alt="Hero SanCor Salud" fill priority sizes="100vw"
          style={{ objectFit: 'cover', objectPosition: 'center top' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(13,36,97,0.94) 0%, rgba(21,101,192,0.80) 55%, rgba(30,136,229,0.55) 100%)' }} />
        <div
          style={{ position: 'relative', maxWidth: 1200, margin: '0 auto', padding: '60px 5%', width: '100%', display: 'flex', alignItems: 'center', gap: 60 }}
          className="hero-grid-sancor"
        >
          <div style={{ flex: 1, color: 'white', minWidth: 0, alignSelf: 'flex-start', paddingTop: 8 }}>
            <div style={{ display: 'inline-flex', background: '#253c82', borderRadius: 20, padding: '8px 16px', boxShadow: '0 18px 45px rgba(0,0,0,0.35)', border: '1px solid rgba(255,255,255,0.2)', marginBottom: 26 }}>
              <NextImage
                src={IMGS.logoSancor}
                alt="SanCor Salud"
                width={500}
                height={281}
                priority
                style={{ width: 'clamp(200px, 22vw, 270px)', height: 'auto', display: 'block' }}
              />
            </div>
            <div style={{ display: 'block', width: 'fit-content', background: 'rgba(255,107,0,0.18)', border: '1px solid rgba(255,107,0,0.4)', borderRadius: 8, padding: '6px 16px', fontSize: 12, fontWeight: 700, color: '#FFB74D', marginBottom: 18, letterSpacing: 0.5 }}>
              ASESORES OFICIALES SANCOR SALUD
            </div>
            <h1 style={{ fontSize: 'clamp(34px, 5vw, 62px)', fontWeight: 800, lineHeight: 1.08, marginBottom: 0, letterSpacing: '-0.5px' }}>
              Planes <span style={{ color: '#FFB74D' }}>SanCor Salud</span>
              <br />
              para vos y tu familia
            </h1>
          </div>

          <div id="cotizar" className="hero-form-sancor" style={{ flex: '0 0 390px', background: 'white', borderRadius: 22, padding: 30, boxShadow: '0 24px 70px rgba(0,0,0,0.35)', scrollMarginTop: 90 }}>
            {enviado ? (
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <div style={{ width: 72, height: 72, borderRadius: '50%', background: '#E3F5EC', border: '2px solid #BFE9CF', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                  <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#0F9D58" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h3 style={{ fontSize: 23, fontWeight: 800, color: '#0B1E52', marginBottom: 10, letterSpacing: '-0.3px' }}>Recibimos tu consulta!</h3>
                <p style={{ color: '#36405A', fontWeight: 500, lineHeight: 1.55, fontSize: 15 }}>Un asesor se va a comunicar con vos a la brevedad por WhatsApp con tu cotizacion.</p>
              </div>
            ) : (
              <>
                <div style={{ background: 'linear-gradient(135deg, #0D2461 0%, #1D5FBF 100%)', borderRadius: 14, padding: '16px 18px', marginBottom: 18, textAlign: 'center', boxShadow: '0 6px 22px rgba(13,36,97,0.3)', border: '1px solid rgba(255,255,255,0.12)' }}>
                  <p style={{ color: '#FFB74D', fontWeight: 700, fontSize: 11, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 5 }}>Cotizacion sin cargo</p>
                  <p style={{ color: 'white', fontWeight: 700, fontSize: 16, lineHeight: 1.35, letterSpacing: '-0.2px' }}>Completa tus datos y recibi tu cotizacion en minutos</p>
                </div>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
                  <div>
                    <label style={{ fontSize: 12, fontWeight: 600, color: '#3a4252', marginBottom: 5, display: 'block' }}>Que tipo de ingreso harias? *</label>
                    <div style={{ position: 'relative' }}>
                      <select value={tipoIngreso} onChange={e => setTipoIngreso(e.target.value)} required>
                        <option value="">Seleccionar...</option>
                        <option>Trabajo en Relacion de Dependencia</option>
                        <option>Soy Monotributista</option>
                        <option>Soy Responsable Inscripto</option>
                        <option>Soy Particular</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label style={{ fontSize: 12, fontWeight: 600, color: '#3a4252', marginBottom: 5, display: 'block' }}>Es para vos solo o grupo familiar? *</label>
                    <div style={{ position: 'relative' }}>
                      <select value={grupoFamiliar} onChange={e => setGrupoFamiliar(e.target.value)} required>
                        <option value="">Seleccionar...</option>
                        <option>Para mi solo</option>
                        <option>Para mi y mi pareja</option>
                        <option>Para mi grupo familiar completo</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label style={{ fontSize: 12, fontWeight: 600, color: '#3a4252', marginBottom: 5, display: 'block' }}>Nombre y Apellido *</label>
                    <input type="text" placeholder="Tu nombre completo" value={nombre} onChange={e => setNombre(e.target.value)} required />
                  </div>
                  <div>
                    <label style={{ fontSize: 12, fontWeight: 600, color: '#3a4252', marginBottom: 5, display: 'block' }}>Localidad *</label>
                    <input type="text" placeholder="Ej: Buenos Aires, Cordoba..." value={localidad} onChange={e => setLocalidad(e.target.value)} required />
                  </div>
                  <div>
                    <label style={{ fontSize: 12, fontWeight: 600, color: '#3a4252', marginBottom: 5, display: 'block' }}>Telefono / WhatsApp *</label>
                    <input type="tel" placeholder="Ej: 2346123456" value={telefono} onChange={e => setTelefono(e.target.value.replace(/\D/g, '').slice(0, 10))} maxLength={10} inputMode="numeric" required />
                    <span style={{ display: 'block', marginTop: 4, fontSize: 11, color: '#8b91a1' }}>10 digitos, sin 0 ni 15</span>
                  </div>
                  {error && (
                    <p style={{ color: '#d33', fontSize: 12, textAlign: 'center', lineHeight: 1.4 }}>
                      {telefono.length !== 10 ? 'El telefono debe tener 10 digitos, sin 0 ni 15.' : 'Hubo un error. Intenta de nuevo.'}
                    </p>
                  )}
                  <button type="submit" disabled={enviando} className="btn-naranja" style={{ marginTop: 4, width: '100%', textAlign: 'center', padding: '14px', opacity: enviando ? 0.6 : 1, cursor: enviando ? 'not-allowed' : 'pointer' }}>
                    {enviando ? 'Enviando...' : 'Cotiza tu plan'}
                  </button>
                  <p style={{ fontSize: 11, color: '#8b91a1', textAlign: 'center', lineHeight: 1.5 }}>
                    Tu privacidad es vital. Evitamos llamadas molestas y correos invasivos.
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      </section>

      <div style={{ background: '#E8F0FE', borderLeft: '4px solid #1565C0', padding: '13px 5%' }}>
        <p style={{ maxWidth: 1200, margin: '0 auto', fontSize: 13, color: '#0D47A1', lineHeight: 1.6 }}>
          <strong>Somos Asesores Oficiales de SanCor Salud.</strong> Este sitio no reemplaza los canales oficiales de atencion al afiliado.
        </p>
      </div>

      <section style={{ background: '#0D2461', padding: '36px 5%' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }} className="stats-grid-sancor">
          {stats.map(s => (
            <div key={s.label} style={{ textAlign: 'center', padding: '16px 8px' }}>
              <p style={{ color: '#FFB74D', fontSize: 'clamp(22px, 4vw, 34px)', fontWeight: 800, lineHeight: 1 }}>{s.num}</p>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 'clamp(11px, 2vw, 13px)', marginTop: 6, lineHeight: 1.3 }}>{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="planes" style={{ padding: '52px 5%', background: '#f0f4ff', scrollMarginTop: 90 }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 52 }}>
            <p style={{ color: '#F56400', fontWeight: 700, fontSize: 12, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 10 }}>Encontra el que mejor se adapta a vos</p>
            <h2 style={{ fontSize: 'clamp(28px, 3.2vw, 42px)', fontWeight: 600, color: '#0D2461' }}>
              Nuestros <span style={{ color: '#F56400' }}>Planes</span>
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20, alignItems: 'start' }} className="planes-grid-sancor">
            {PLANES.map(plan => (
              <div key={plan.id} className="plan-card-v2" style={{ border: `2px solid ${plan.color}22` }}>
                {plan.popular && <div className="badge-popular">MAS ELEGIDO</div>}
                <button
                  onClick={() => abrirPlan(plan)}
                  style={{ border: 'none', padding: 0, background: 'transparent', cursor: 'pointer', width: '100%' }}
                  aria-label={`Ver detalle ${plan.nombre}`}
                >
                  <Image src={plan.img} alt={plan.nombre} width={0} height={0} sizes="(max-width: 480px) 100vw, (max-width: 768px) 50vw, 300px" style={{ width: '100%', height: 'auto', display: 'block' }} />
                </button>
                <div style={{ padding: '16px 16px 20px', marginTop: 'auto' }}>
                  <button
                    onClick={() => abrirPlan(plan)}
                    style={{ width: '100%', background: plan.color, color: 'white', border: 'none', borderRadius: 12, padding: '13px', fontWeight: 700, fontSize: 14, cursor: 'pointer', transition: 'opacity 0.2s' }}
                  >
                    Quiero este plan
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 48 }}>
            <a href="#cotizar" className="btn-naranja">ASOCIATE ONLINE</a>
          </div>
        </div>
      </section>

      <section style={{ background: 'white', padding: '32px 5%' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 28 }}>
            <p style={{ color: '#F56400', fontWeight: 700, fontSize: 12, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 10 }}>Planes para cada perfil</p>
            <h2 style={{ fontSize: 'clamp(26px, 3vw, 40px)', fontWeight: 600, color: '#0D2461' }}>Como queres <span style={{ color: '#F56400' }}>afiliarte?</span></h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }} className="tipos-grid-sancor">
            {tiposCliente.map(tipo => (
              <div key={tipo.titulo} className="tipo-card">
                <div className="icono-wrap">
                  <img src={tipo.img} alt={tipo.titulo} />
                </div>
                <h3 style={{ color: '#0D2461', fontSize: 16, fontWeight: 700, marginBottom: 8 }}>{tipo.titulo}</h3>
                <p style={{ color: '#3a4252', fontSize: 13, lineHeight: 1.55, marginBottom: 14 }}>{tipo.desc}</p>
                <a href="#cotizar" className="btn-naranja" style={{ padding: '10px 24px', fontSize: 13 }}>Cotizar</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="gen" style={{ position: 'relative', overflow: 'hidden', minHeight: 440, display: 'flex', alignItems: 'center', scrollMarginTop: 90 }}>
        <Image src={IMGS.gen} alt="Plan Gen SanCor Salud" fill sizes="100vw"
          style={{ objectFit: 'cover', objectPosition: 'center' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(13,36,97,0.93) 0%, rgba(21,101,192,0.74) 50%, rgba(13,36,97,0.48) 100%)' }} />
        <div style={{ position: 'relative', maxWidth: 1200, margin: '0 auto', padding: '52px 5%', width: '100%', display: 'flex', alignItems: 'center', gap: 60, flexWrap: 'wrap' }} className="gen-grid-sancor">
          <div style={{ flex: 1, minWidth: 280, color: 'white' }}>
            <div style={{ background: 'rgba(255,107,0,0.2)', border: '1px solid rgba(255,107,0,0.5)', borderRadius: 8, display: 'inline-block', padding: '6px 16px', fontSize: 12, fontWeight: 700, color: '#FFB74D', marginBottom: 18 }}>
              PLAN GEN - 18 A 45 ANOS
            </div>
            <h2 style={{ fontSize: 'clamp(28px, 3.2vw, 46px)', fontWeight: 600, lineHeight: 1.18, marginBottom: 16 }}>
              Una sinergia de salud<br />
              <span style={{ color: '#FFB74D' }}>pensada para vos</span>
            </h2>
            <p style={{ fontSize: 16, opacity: 0.92, marginBottom: 30, lineHeight: 1.7, maxWidth: 460 }}>
              Si tenes entre <strong>18 y 45 anos</strong>, el Plan GEN tiene beneficios y descuentos exclusivos pensados para tu estilo de vida.
            </p>
            <button onClick={abrirGen} className="btn-naranja" style={{ border: 'none', cursor: 'pointer' }}>ASOCIATE ONLINE</button>
          </div>
          <div>
            <div style={{ background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(8px)', borderRadius: 24, padding: '36px 44px', textAlign: 'center', border: '2px solid rgba(255,183,77,0.35)' }}>
              <p style={{ color: '#FFB74D', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>DESCUENTO EXCLUSIVO</p>
              <p style={{ fontSize: 76, fontWeight: 800, color: 'white', lineHeight: 1 }}>30<span style={{ fontSize: 38, color: '#FFB74D' }}>%</span></p>
              <p style={{ color: '#FFB74D', fontSize: 20, fontWeight: 700, marginTop: 4 }}>OFF</p>
              <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: 13, marginTop: 10 }}>Plan GEN - 18 a 45 anos</p>
            </div>
          </div>
        </div>
      </section>

      <section id="prestaciones" style={{ padding: '52px 5%', background: '#f8faff', scrollMarginTop: 90 }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 52 }}>
            <p style={{ color: '#F56400', fontWeight: 700, fontSize: 12, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 10 }}>Lo que incluye tu plan</p>
            <h2 style={{ fontSize: 'clamp(28px, 3.2vw, 42px)', fontWeight: 600, color: '#0D2461' }}>Nuestras <span style={{ color: '#F56400' }}>Prestaciones</span></h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }} className="prestaciones-grid-sancor">
            {prestaciones.map(p => (
              <div key={p.titulo} className="prest-card">
                <div style={{ width: 72, height: 72, marginBottom: 18, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <img src={p.img} alt={p.titulo} style={{ width: 64, height: 64, objectFit: 'contain' }} />
                </div>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: '#0D2461', marginBottom: 8, lineHeight: 1.3 }}>{p.titulo}</h3>
                <p style={{ fontSize: 13, color: '#3a4252', lineHeight: 1.65 }}>{p.desc}</p>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 48 }}>
            <a href="#cotizar" className="btn-naranja">Cotiza tu plan</a>
          </div>
        </div>
      </section>

      <section id="contacto" style={{ padding: '52px 5%', textAlign: 'center', position: 'relative', overflow: 'hidden', scrollMarginTop: 90 }}>
        <Image src={IMGS.bannerPyme} alt="fondo asesor" fill sizes="100vw" style={{ objectFit: 'cover', objectPosition: 'center' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(13,36,97,0.82)' }} />
        <div style={{ maxWidth: 600, margin: '0 auto', position: 'relative' }}>
          <h2 style={{ fontSize: 'clamp(28px, 3.2vw, 42px)', fontWeight: 600, color: 'white', marginBottom: 14, lineHeight: 1.18 }}>
            Queres hablar ahora<br />
            <span style={{ color: '#FFB74D' }}>con un asesor?</span>
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 16, marginBottom: 36, lineHeight: 1.6 }}>
            Te asesoramos sin compromiso y encontramos el plan ideal para vos y tu familia.
          </p>
          <a href={linkWhatsapp('Hola! Quiero consultar sobre planes SanCor Salud')} target="_blank" rel="noopener noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 12, background: '#25D366', color: 'white', borderRadius: 12, padding: '18px 48px', fontSize: 17, fontWeight: 700, textDecoration: 'none', boxShadow: '0 6px 24px rgba(37,211,102,0.4)' }}
          >
            Escribinos por WhatsApp
          </a>
        </div>
      </section>

      <section style={{ background: '#f8faff', padding: '40px 5%' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', textAlign: 'center' }}>
          <p style={{ color: '#8b91a1', fontSize: 12, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 32 }}>Prestadores destacados de nuestra red</p>
          <div className="carrusel-wrapper">
            <div className="carrusel-track" style={{ transform: `translateX(calc(-${carruselIdx} * (25% + 4px)))` }}>
              {[...clinicas, ...clinicas].map((c, i) => (
                <div key={i} className="clinica-card">
                  <img src={c.img} alt={c.nombre} style={{ maxHeight: 46, maxWidth: '100%', objectFit: 'contain' }} />
                </div>
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 24 }}>
            {clinicas.map((_, i) => (
              <button key={i} onClick={() => setCarruselIdx(i)}
                style={{ width: carruselIdx % clinicas.length === i ? 22 : 8, height: 8, borderRadius: 50, border: 'none', background: carruselIdx % clinicas.length === i ? '#0D2461' : '#ccd5f0', cursor: 'pointer', transition: 'all 0.3s', padding: 0 }}
              />
            ))}
          </div>
        </div>
      </section>

      <footer style={{ background: '#0A1A4A', padding: '40px 5% 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', textAlign: 'center' }}>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 12, lineHeight: 1.8, maxWidth: 820, margin: '0 auto 8px' }}>
            ASOCIACION MUTUAL SANCOR SALUD inscripta en el Registro Nacional de Entidades de Medicina Prepaga (R.N.E.M.P.) bajo el numero 1137.
          </p>
          <p style={{ color: 'rgba(255,255,255,0.2)', fontSize: 11 }}>2026 Asesores Oficiales SanCor Salud - JR Group</p>
        </div>
      </footer>

      {planModal && (
        <div className="plan-modal-overlay" onClick={cerrarModal}>
          <div onClick={e => e.stopPropagation()} style={{ maxWidth: 420, width: '100%', position: 'relative' }}>
            <button onClick={cerrarModal} aria-label="Cerrar"
              style={{ position: 'absolute', top: -46, right: 0, background: 'rgba(255,255,255,0.15)', color: 'white', border: 'none', borderRadius: '50%', width: 38, height: 38, fontSize: 18, cursor: 'pointer', zIndex: 2 }}
            >
              X
            </button>
            <div style={{ background: 'white', borderRadius: 22, padding: 30, boxShadow: '0 24px 70px rgba(0,0,0,0.5)' }}>
              {modalEnviado ? (
                <div style={{ textAlign: 'center', padding: '20px 0' }}>
                  <div style={{ width: 72, height: 72, borderRadius: '50%', background: '#E3F5EC', border: '2px solid #BFE9CF', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                    <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#0F9D58" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <h3 style={{ fontSize: 23, fontWeight: 800, color: '#0B1E52', marginBottom: 10, letterSpacing: '-0.3px' }}>Recibimos tu consulta!</h3>
                  <p style={{ color: '#36405A', fontWeight: 500, lineHeight: 1.55, fontSize: 15 }}>Un asesor se va a comunicar con vos por WhatsApp con la cotizacion del {planModal.nombre}.</p>
                </div>
              ) : (
                <>
                  <div style={{ background: planModal.color, borderRadius: 12, padding: '13px 16px', marginBottom: 18, textAlign: 'center' }}>
                    <p style={{ color: 'white', fontWeight: 700, fontSize: 15 }}>Cotiza tu {planModal.nombre}</p>
                  </div>
                  <form onSubmit={handleModalSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
                    <div>
                      <label style={{ fontSize: 12, fontWeight: 600, color: '#3a4252', marginBottom: 5, display: 'block' }}>Que tipo de ingreso harias? *</label>
                      <select value={tipoIngreso} onChange={e => setTipoIngreso(e.target.value)} required>
                        <option value="">Seleccionar...</option>
                        <option>Trabajo en Relacion de Dependencia</option>
                        <option>Soy Monotributista</option>
                        <option>Soy Responsable Inscripto</option>
                        <option>Soy Particular</option>
                      </select>
                    </div>
                    <div>
                      <label style={{ fontSize: 12, fontWeight: 600, color: '#3a4252', marginBottom: 5, display: 'block' }}>Es para vos solo o grupo familiar? *</label>
                      <select value={grupoFamiliar} onChange={e => setGrupoFamiliar(e.target.value)} required>
                        <option value="">Seleccionar...</option>
                        <option>Para mi solo</option>
                        <option>Para mi y mi pareja</option>
                        <option>Para mi grupo familiar completo</option>
                      </select>
                    </div>
                    <div>
                      <label style={{ fontSize: 12, fontWeight: 600, color: '#3a4252', marginBottom: 5, display: 'block' }}>Nombre y Apellido *</label>
                      <input type="text" placeholder="Tu nombre completo" value={nombre} onChange={e => setNombre(e.target.value)} required />
                    </div>
                    <div>
                      <label style={{ fontSize: 12, fontWeight: 600, color: '#3a4252', marginBottom: 5, display: 'block' }}>Localidad *</label>
                      <input type="text" placeholder="Ej: Buenos Aires, Cordoba..." value={localidad} onChange={e => setLocalidad(e.target.value)} required />
                    </div>
                    <div>
                      <label style={{ fontSize: 12, fontWeight: 600, color: '#3a4252', marginBottom: 5, display: 'block' }}>Telefono / WhatsApp *</label>
                      <input type="tel" placeholder="Ej: 2346123456" value={telefono} onChange={e => setTelefono(e.target.value.replace(/\D/g, '').slice(0, 10))} maxLength={10} inputMode="numeric" required />
                      <span style={{ display: 'block', marginTop: 4, fontSize: 11, color: '#8b91a1' }}>10 digitos, sin 0 ni 15</span>
                    </div>
                    {error && (
                      <p style={{ color: '#d33', fontSize: 12, textAlign: 'center', lineHeight: 1.4 }}>
                        {telefono.length !== 10 ? 'El telefono debe tener 10 digitos, sin 0 ni 15.' : 'Hubo un error. Intenta de nuevo.'}
                      </p>
                    )}
                    <button type="submit" disabled={enviando} className="btn-naranja" style={{ marginTop: 4, width: '100%', textAlign: 'center', padding: '14px', border: 'none', opacity: enviando ? 0.6 : 1, cursor: enviando ? 'not-allowed' : 'pointer' }}>
                      {enviando ? 'Enviando...' : 'Cotizar Plan'}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
