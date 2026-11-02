'use client'

import {
  ArrowRight,
  Check,
  ChevronDown,
  Clock3,
  FileText,
  HeartHandshake,
  Menu,
  MessageCircle,
  Moon,
  Phone,
  ShieldCheck,
  Stethoscope,
  UserRoundCheck,
  UsersRound,
  X,
} from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const services = [
  { icon: Clock3, title: 'Cuidado por horas', description: 'Ayuda flexible para el día a día, adaptada a cada familia y rutina.' },
  { icon: Moon, title: 'Asistencia nocturna / internos', description: 'Tranquilidad durante la noche y acompañamiento continuo en casa.' },
  { icon: Stethoscope, title: 'Acompañamiento médico', description: 'Te acompañamos a consultas, pruebas y revisiones con total confianza.' },
  { icon: FileText, title: 'Gestión de trámites de dependencia', description: 'Te ayudamos con el papeleo para que no tengas que hacerlo solo.' },
]

const values = [
  { icon: UserRoundCheck, title: 'Personal cualificado y seleccionado', description: 'Cuidadores con experiencia, referencias y vocación de servicio.' },
  { icon: ShieldCheck, title: 'Seguro de Responsabilidad Civil', description: 'Tu familia está protegida con todas las garantías.' },
  { icon: HeartHandshake, title: 'Atención 24/7', description: 'Siempre hay alguien al otro lado cuando lo necesitas.' },
]

export default function Page() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [sent, setSent] = useState(false)

  return (
    <main className="min-h-screen bg-[#fbfcfa] text-[#183b4a]">
      <header className="sticky top-0 z-40 border-b border-[#dfe9e5] bg-[#fbfcfa]/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
          <a href="#inicio" className="flex items-center gap-3" aria-label="Cuidarte, inicio">
            <span className="flex size-11 items-center justify-center rounded-2xl bg-[#183b4a] text-[#d9f0e5]"><HeartHandshake aria-hidden="true" /></span>
            <span className="text-xl font-bold tracking-tight">cuidarte<span className="text-[#71a890]">.</span></span>
          </a>
          <nav className={`${menuOpen ? 'absolute left-0 top-full flex w-full flex-col gap-5 border-b border-[#dfe9e5] bg-[#fbfcfa] px-5 py-6' : 'hidden'} lg:static lg:flex lg:w-auto lg:flex-row lg:items-center lg:gap-8 lg:border-0 lg:bg-transparent lg:p-0`} aria-label="Navegación principal">
            <a className="font-medium text-[#52707a] hover:text-[#183b4a]" href="#servicios">Servicios</a>
            <a className="font-medium text-[#52707a] hover:text-[#183b4a]" href="#confianza">Por qué elegirnos</a>
            <a className="font-medium text-[#52707a] hover:text-[#183b4a]" href="#contacto">Contacto</a>
          </nav>
          <div className="hidden items-center gap-5 lg:flex">
            <a href="tel:+34900123456" className="flex items-center gap-2 font-semibold text-[#183b4a]"><Phone className="size-4 text-[#71a890]" aria-hidden="true" /> 900 123 456</a>
            <Button nativeButton={false} render={<a href="#contacto" />} className="rounded-full bg-[#71a890] px-5 text-[#123343] hover:bg-[#5d997d]">Contacto</Button>
          </div>
          <button className="rounded-lg p-2 lg:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'} aria-expanded={menuOpen}>{menuOpen ? <X /> : <Menu />}</button>
        </div>
      </header>

      <section id="inicio" className="mx-auto grid max-w-7xl gap-12 px-5 pb-20 pt-14 lg:grid-cols-[1.02fr_.98fr] lg:items-center lg:px-8 lg:pb-28 lg:pt-24">
        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#cfe3d9] bg-[#edf7f1] px-4 py-2 text-sm font-semibold text-[#427761]"><span className="size-2 rounded-full bg-[#71a890]" /> Cuidado que se nota</div>
          <h1 className="max-w-2xl text-5xl font-semibold leading-[1.08] tracking-[-0.04em] text-[#183b4a] sm:text-6xl">La tranquilidad de saber que <span className="text-[#6a9d83]">están en buenas manos.</span></h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-[#5d7379]">Atención domiciliaria cercana y profesional para personas mayores y dependientes. Cuidamos de ellos para que toda la familia pueda respirar tranquila.</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row"><Button nativeButton={false} render={<a href="#contacto" />} size="lg" className="h-14 rounded-full bg-[#183b4a] px-7 text-base text-white hover:bg-[#285668]">Solicitar presupuesto <ArrowRight data-icon="inline-end" /></Button><Button nativeButton={false} render={<a href="#servicios" />} variant="outline" size="lg" className="h-14 rounded-full border-[#a9c5b7] bg-white px-7 text-base text-[#183b4a] hover:bg-[#edf7f1]">Ver servicios <ChevronDown data-icon="inline-end" /></Button></div>
          <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium text-[#5d7379]"><span className="flex items-center gap-2"><Check className="size-4 text-[#71a890]" /> Sin permanencia</span><span className="flex items-center gap-2"><Check className="size-4 text-[#71a890]" /> Presupuesto gratuito</span></div>
        </div>
        <div className="relative overflow-hidden rounded-[2rem] bg-[#dcece3] shadow-[0_24px_70px_-28px_rgba(24,59,74,.35)]"><img src="/cuidado-acompanamiento.png" alt="Cuidadora acompañando a un hombre mayor en su hogar" className="aspect-[4/3] w-full object-cover" /><div className="absolute bottom-5 left-5 flex items-center gap-3 rounded-2xl bg-white/95 p-4 shadow-lg"><span className="flex size-10 items-center justify-center rounded-xl bg-[#edf7f1] text-[#5d997d]"><HeartHandshake className="size-5" aria-hidden="true" /></span><div><p className="text-sm font-bold text-[#183b4a]">Cuidado con corazón</p><p className="text-xs text-[#668078]">Cada día, a tu lado</p></div></div></div>
      </section>

      <section id="servicios" className="bg-[#edf5f1] px-5 py-20 lg:px-8 lg:py-24"><div className="mx-auto max-w-7xl"><div className="max-w-2xl"><p className="mb-3 text-sm font-bold uppercase tracking-[.18em] text-[#5d997d]">Nuestros servicios</p><h2 className="text-4xl font-semibold tracking-[-.03em] text-[#183b4a] sm:text-5xl">Cuidamos de lo importante.</h2><p className="mt-4 text-lg leading-8 text-[#5d7379]">Soluciones pensadas para cada momento, con la cercanía y profesionalidad que tu familia merece.</p></div><div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{services.map(({ icon: Icon, title, description }) => <Card key={title} className="border-[#d8e7df] bg-[#fbfcfa] shadow-none transition-all hover:-translate-y-1 hover:shadow-lg"><CardHeader><span className="mb-4 flex size-12 items-center justify-center rounded-2xl bg-[#dceee5] text-[#4e8e71]"><Icon aria-hidden="true" /></span><CardTitle className="text-xl text-[#183b4a]">{title}</CardTitle></CardHeader><CardContent><p className="leading-7 text-[#668078]">{description}</p><a href="#contacto" className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#4e8e71]">Saber más <ArrowRight className="size-4" aria-hidden="true" /></a></CardContent></Card>)}</div></div></section>

      <section id="confianza" className="px-5 py-20 lg:px-8 lg:py-24"><div className="mx-auto max-w-7xl"><div className="grid gap-14 lg:grid-cols-[.9fr_1.1fr] lg:items-center"><div><p className="mb-3 text-sm font-bold uppercase tracking-[.18em] text-[#5d997d]">Nuestra diferencia</p><h2 className="text-4xl font-semibold leading-tight tracking-[-.03em] text-[#183b4a] sm:text-5xl">Confianza para ti.<br /><span className="text-[#6a9d83]">Bienestar para ellos.</span></h2><p className="mt-5 max-w-md text-lg leading-8 text-[#5d7379]">Sabemos que dejar a alguien querido en otras manos es una decisión importante. Por eso hacemos las cosas con transparencia, respeto y mucho corazón.</p></div><div className="grid gap-8 sm:grid-cols-3">{values.map(({ icon: Icon, title, description }) => <div key={title}><span className="flex size-12 items-center justify-center rounded-2xl bg-[#183b4a] text-[#d9f0e5]"><Icon aria-hidden="true" /></span><h3 className="mt-5 text-lg font-bold text-[#183b4a]">{title}</h3><p className="mt-2 leading-7 text-[#668078]">{description}</p></div>)}</div></div></div></section>

      <section id="contacto" className="bg-[#183b4a] px-5 py-20 text-white lg:px-8 lg:py-24"><div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[.8fr_1.2fr] lg:items-center"><div><p className="mb-3 text-sm font-bold uppercase tracking-[.18em] text-[#a9d5bd]">Hablemos</p><h2 className="text-4xl font-semibold leading-tight tracking-[-.03em] sm:text-5xl">Cuéntanos qué necesitas.</h2><p className="mt-5 max-w-md text-lg leading-8 text-[#c8d9d5]">Te llamamos sin compromiso para conocer tu caso y encontrar la mejor solución para tu familia.</p><div className="mt-8 flex items-center gap-3 text-[#d9f0e5]"><Phone className="size-5" aria-hidden="true" /><a href="tel:+34900123456" className="text-xl font-semibold">900 123 456</a></div></div><Card className="border-0 bg-[#fbfcfa] text-[#183b4a] shadow-2xl"><CardContent className="p-6 sm:p-8">{sent ? <div className="flex min-h-72 flex-col items-center justify-center text-center"><span className="flex size-14 items-center justify-center rounded-full bg-[#dceee5] text-[#4e8e71]"><Check /></span><h3 className="mt-5 text-2xl font-bold">¡Gracias por escribirnos!</h3><p className="mt-2 text-[#668078]">Te llamaremos muy pronto para hablar contigo.</p></div> : <form className="grid gap-5 sm:grid-cols-2" onSubmit={(event) => { event.preventDefault(); setSent(true) }}><div className="grid gap-2"><Label htmlFor="name">Nombre y apellidos</Label><Input id="name" required placeholder="Cómo te llamas" /></div><div className="grid gap-2"><Label htmlFor="phone">Teléfono</Label><Input id="phone" required type="tel" placeholder="Tu número de teléfono" /></div><div className="grid gap-2"><Label htmlFor="zone">Zona / Municipio</Label><Input id="zone" required placeholder="Ej. Pozuelo de Alarcón" /></div><div className="grid gap-2"><Label htmlFor="service">Servicio que necesitas</Label><Select required><SelectTrigger id="service"><SelectValue placeholder="Selecciona una opción" /></SelectTrigger><SelectContent><SelectItem value="hours">Cuidado por horas</SelectItem><SelectItem value="night">Asistencia nocturna / internos</SelectItem><SelectItem value="medical">Acompañamiento médico</SelectItem><SelectItem value="dependency">Trámites de dependencia</SelectItem></SelectContent></Select></div><div className="sm:col-span-2"><Button type="submit" size="lg" className="h-14 w-full rounded-full bg-[#71a890] text-[#123343] hover:bg-[#5d997d]">Solicitar presupuesto gratuito <ArrowRight data-icon="inline-end" /></Button><p className="mt-3 text-center text-xs text-[#78908a]">Al enviar aceptas nuestra política de privacidad.</p></div></form>}</CardContent></Card></div></section>

      <footer className="bg-[#102d3a] px-5 py-10 text-[#c8d9d5] lg:px-8"><div className="mx-auto grid max-w-7xl gap-8 sm:grid-cols-3"><div><div className="flex items-center gap-3 text-white"><span className="flex size-9 items-center justify-center rounded-xl bg-[#d9f0e5] text-[#183b4a]"><HeartHandshake className="size-5" /></span><span className="text-lg font-bold">cuidarte<span className="text-[#71a890]">.</span></span></div><p className="mt-4 max-w-xs text-sm leading-6">Cuidado profesional y cercano para que las familias vivan con más tranquilidad.</p></div><div><h3 className="font-bold text-white">Contacto</h3><div className="mt-4 flex flex-col gap-2 text-sm"><a href="tel:+34900123456" className="hover:text-white">900 123 456</a><a href="mailto:hola@cuidarte.es" className="hover:text-white">hola@cuidarte.es</a><span>Lunes a domingo, 24 horas</span></div></div><div><h3 className="font-bold text-white">Estamos cerca</h3><p className="mt-4 text-sm leading-6">Madrid y municipios de la Comunidad de Madrid.</p><div className="mt-3 flex gap-4 text-sm"><a href="#" className="underline underline-offset-4 hover:text-white">Aviso legal</a><a href="#" className="underline underline-offset-4 hover:text-white">Privacidad</a></div></div></div><div className="mx-auto mt-10 max-w-7xl border-t border-white/10 pt-5 text-xs text-[#8da9a5]">© 2026 cuidarte. Todos los derechos reservados.</div></footer>
      <a href="https://wa.me/34900123456" aria-label="Contactar por WhatsApp" className="fixed bottom-5 right-5 z-30 flex size-14 items-center justify-center rounded-full bg-[#25d366] text-white shadow-xl transition-transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-[#25d366]/40"><MessageCircle className="size-7 fill-white" aria-hidden="true" /></a>
    </main>
  )
}
