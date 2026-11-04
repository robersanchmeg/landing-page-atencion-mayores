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
  X,
} from 'lucide-react'
import { useState, type FormEvent } from 'react'
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
  {
    icon: Clock3,
    title: 'Cuidado por horas',
    description: 'Apoyo flexible para el día a día, adaptado a cada persona y familia.',
  },
  {
    icon: Moon,
    title: 'Noches e internos',
    description: 'Acompañamiento y tranquilidad en casa durante la noche o todo el día.',
  },
  {
    icon: Stethoscope,
    title: 'Acompañamiento médico',
    description: 'Estamos a tu lado en consultas, pruebas y revisiones médicas.',
  },
  {
    icon: FileText,
    title: 'Ayuda con la dependencia',
    description: 'Te orientamos con los trámites para que te resulte más sencillo.',
  },
]

const values = [
  {
    icon: UserRoundCheck,
    title: 'Personas que cuidan de personas',
    description: 'Seleccionamos cuidadores con experiencia y vocación de servicio.',
  },
  {
    icon: ShieldCheck,
    title: 'Cuidado con garantías',
    description: 'Trabajamos con responsabilidad, transparencia y confianza.',
  },
  {
    icon: HeartHandshake,
    title: 'Cerca de tu familia',
    description: 'Te acompañamos y estamos disponibles cuando nos necesitas.',
  },
]

export default function Page() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [sent, setSent] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const closeMenu = () => setMenuOpen(false)

  const handleContactSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitting(true)
    setSubmitError('')

    const formData = new FormData(event.currentTarget)

    try {
      const response = await fetch('/api/contactos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: formData.get('nombre'),
          telefono: formData.get('telefono'),
          zona: formData.get('zona'),
          servicio: formData.get('servicio'),
        }),
      })
      const result = await response.json()

      if (!response.ok) {
        setSubmitError(result.error ?? 'No se pudo enviar la solicitud.')
        return
      }

      setSent(true)
    } catch {
      setSubmitError('No se pudo enviar la solicitud. Comprueba tu conexión e inténtalo de nuevo.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen overflow-hidden bg-white text-[#173c50]">
      <div className="bg-[#123b50] px-5 py-2 text-center text-xs font-medium text-white sm:text-sm">
        <span className="text-[#40d0d0]">Cuidado cercano y profesional</span>
        <span className="mx-2 text-white/40">·</span>
        Atención a domicilio en Madrid
      </div>

      <header className="sticky top-0 z-40 border-b border-[#e6eeee] bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-5 px-5 py-3 lg:px-8">
          <a href="#inicio" className="shrink-0" aria-label="QIDART, inicio" onClick={closeMenu}>
            <img src="/qidart-logo.svg" alt="QIDART" className="h-12 w-auto" />
          </a>
          <nav
            className={`${menuOpen ? 'absolute left-0 top-full flex w-full flex-col gap-5 border-b border-[#e6eeee] bg-white px-5 py-6 shadow-lg' : 'hidden'} lg:static lg:flex lg:w-auto lg:flex-row lg:items-center lg:gap-8 lg:border-0 lg:bg-transparent lg:p-0 lg:shadow-none`}
            aria-label="Navegación principal"
          >
            <a className="font-medium text-[#526c79] transition hover:text-[#08aeb4]" href="#servicios" onClick={closeMenu}>Servicios</a>
            <a className="font-medium text-[#526c79] transition hover:text-[#08aeb4]" href="#confianza" onClick={closeMenu}>Por qué QIDART</a>
            <a className="font-medium text-[#526c79] transition hover:text-[#08aeb4]" href="#contacto" onClick={closeMenu}>Contacto</a>
          </nav>
          <div className="hidden shrink-0 items-center gap-5 lg:flex">
            <a href="tel:+34900123456" className="flex items-center gap-2 font-semibold text-[#173c50]">
              <Phone className="size-4 text-[#08aeb4]" aria-hidden="true" />
              900 123 456
            </a>
            <Button nativeButton={false} render={<a href="#contacto" />} className="rounded-full bg-[#08aeb4] px-5 text-white hover:bg-[#078f97]">
              Hablemos
            </Button>
          </div>
          <button
            className="rounded-full p-2 text-[#173c50] transition hover:bg-[#e9f8f8] lg:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      <section id="inicio" className="relative mx-auto grid max-w-7xl gap-12 px-5 pb-16 pt-12 sm:pt-16 lg:grid-cols-[1.02fr_.98fr] lg:items-center lg:px-8 lg:pb-24 lg:pt-20">
        <div className="relative z-10">
          <p className="mb-5 inline-flex items-center gap-2 rounded-full bg-[#e8f8f7] px-4 py-2 text-sm font-semibold text-[#087e87]">
            <HeartHandshake className="size-4" aria-hidden="true" />
            Cuidarte es nuestra vocación
          </p>
          <h1 className="max-w-2xl text-[2.8rem] font-semibold leading-[1.07] tracking-[-.045em] text-[#173c50] sm:text-6xl">
            El cuidado que tu familia merece, <span className="text-[#08aeb4]">en casa.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-[#5b7079]">
            Atención domiciliaria para personas mayores y dependientes, con cercanía, respeto y un plan hecho a vuestra medida.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button nativeButton={false} render={<a href="#contacto" />} size="lg" className="h-14 rounded-full bg-[#08aeb4] px-7 text-base text-white shadow-[0_10px_24px_-12px_rgba(8,174,180,.75)] hover:bg-[#078f97]">
              Cuéntanos qué necesitas <ArrowRight data-icon="inline-end" />
            </Button>
            <Button nativeButton={false} render={<a href="#servicios" />} variant="outline" size="lg" className="h-14 rounded-full border-[#b8d8d9] bg-white px-7 text-base text-[#173c50] hover:bg-[#effafa]">
              Conoce nuestros servicios <ChevronDown data-icon="inline-end" />
            </Button>
          </div>
          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium text-[#526c79]">
            <span className="flex items-center gap-2"><Check className="size-4 text-[#08aeb4]" /> Atención personalizada</span>
            <span className="flex items-center gap-2"><Check className="size-4 text-[#08aeb4]" /> Presupuesto gratuito</span>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-2xl lg:mr-0">
          <div className="absolute -right-7 -top-8 size-36 rounded-full bg-[#dff6f3] blur-2xl sm:size-52" />
          <div className="relative overflow-hidden rounded-[2rem] bg-[#e4f2ef] shadow-[0_28px_75px_-34px_rgba(23,60,80,.38)]">
            <img
              src="/cuidado-acompanamiento.png"
              alt="Cuidadora acompañando a un hombre mayor en su hogar"
              className="aspect-[4/3] w-full object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#102f3c]/35 to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 flex items-center gap-3 rounded-2xl border border-white/80 bg-white/95 p-4 shadow-lg sm:bottom-6 sm:left-6 sm:right-auto sm:min-w-64">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[#e4f8f6] text-[#08aeb4]">
                <HeartHandshake className="size-5" aria-hidden="true" />
              </span>
              <div>
                <p className="font-bold text-[#173c50]">A tu lado, de verdad</p>
                <p className="mt-0.5 text-sm text-[#667d85]">Cuidado con calidez y confianza</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section aria-label="Nuestro compromiso" className="border-y border-[#e5eeee] bg-[#f7fbfa]">
        <div className="mx-auto grid max-w-7xl gap-5 px-5 py-6 sm:grid-cols-3 sm:gap-0 lg:px-8">
          <div className="flex items-center justify-center gap-3 sm:border-r sm:border-[#dce9e8]">
            <HeartHandshake className="size-5 text-[#08aeb4]" aria-hidden="true" />
            <span className="font-semibold text-[#173c50]">Cuidado a medida</span>
          </div>
          <div className="flex items-center justify-center gap-3 sm:border-r sm:border-[#dce9e8]">
            <ShieldCheck className="size-5 text-[#08aeb4]" aria-hidden="true" />
            <span className="font-semibold text-[#173c50]">Profesionales de confianza</span>
          </div>
          <div className="flex items-center justify-center gap-3">
            <Phone className="size-5 text-[#08aeb4]" aria-hidden="true" />
            <span className="font-semibold text-[#173c50]">Siempre cerca de ti</span>
          </div>
        </div>
      </section>

      <section id="servicios" className="px-5 py-20 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="mb-3 text-sm font-bold uppercase tracking-[.18em] text-[#078f97]">Cómo podemos ayudarte</p>
            <h2 className="text-4xl font-semibold tracking-[-.04em] text-[#173c50] sm:text-5xl">
              Un cuidado para cada momento.
            </h2>
            <p className="mt-4 text-lg leading-8 text-[#5b7079]">
              Escuchamos lo que necesitáis y encontramos juntos la forma de cuidar mejor.
            </p>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {services.map(({ icon: Icon, title, description }) => (
              <Card key={title} className="group rounded-3xl border-[#e2eceb] bg-white shadow-[0_8px_30px_-24px_rgba(23,60,80,.38)] transition-all hover:-translate-y-1 hover:border-[#a9dfe0] hover:shadow-[0_20px_40px_-24px_rgba(23,60,80,.3)]">
                <CardHeader>
                  <span className="mb-3 flex size-12 items-center justify-center rounded-2xl bg-[#e8f8f7] text-[#078f97] transition-colors group-hover:bg-[#08aeb4] group-hover:text-white">
                    <Icon aria-hidden="true" />
                  </span>
                  <CardTitle className="text-xl text-[#173c50]">{title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="leading-7 text-[#60757d]">{description}</p>
                  <a href="#contacto" className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#078f97]">
                    Más información <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="confianza" className="bg-[#f1f9f8] px-5 py-20 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-[.85fr_1.15fr] lg:items-center">
            <div>
              <p className="mb-3 text-sm font-bold uppercase tracking-[.18em] text-[#078f97]">Nuestra manera de cuidar</p>
              <h2 className="text-4xl font-semibold leading-tight tracking-[-.04em] text-[#173c50] sm:text-5xl">
                La confianza también forma parte del cuidado.
              </h2>
              <p className="mt-5 max-w-lg text-lg leading-8 text-[#5b7079]">
                Sabemos que confiar el cuidado de alguien querido es una decisión importante. Por eso ponemos a las personas en el centro, siempre.
              </p>
              <a href="#contacto" className="mt-7 inline-flex items-center gap-2 font-bold text-[#078f97]">
                Hablemos de tu caso <ArrowRight className="size-4" aria-hidden="true" />
              </a>
            </div>
            <div className="grid gap-8 sm:grid-cols-3">
              {values.map(({ icon: Icon, title, description }) => (
                <div key={title}>
                  <span className="flex size-12 items-center justify-center rounded-2xl bg-white text-[#08aeb4] shadow-sm">
                    <Icon aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 text-lg font-bold text-[#173c50]">{title}</h3>
                  <p className="mt-2 leading-7 text-[#60757d]">{description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="contacto" className="bg-[#123b50] px-5 py-20 text-white lg:px-8 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
          <div>
            <p className="mb-3 text-sm font-bold uppercase tracking-[.18em] text-[#61dcda]">Estamos para ayudarte</p>
            <h2 className="text-4xl font-semibold leading-tight tracking-[-.04em] sm:text-5xl">
              Empecemos por escucharte.
            </h2>
            <p className="mt-5 max-w-md text-lg leading-8 text-[#d0e0e4]">
              Cuéntanos un poco qué necesitas. Nos pondremos en contacto para encontrar la mejor solución para tu familia.
            </p>
            <div className="mt-8 flex items-center gap-3 text-[#61dcda]">
              <Phone className="size-5" aria-hidden="true" />
              <a href="tel:+34900123456" className="text-xl font-semibold text-white">900 123 456</a>
            </div>
          </div>
          <Card className="rounded-3xl border-0 bg-white text-[#173c50] shadow-2xl">
            <CardContent className="p-6 sm:p-8">
              {sent ? (
                <div className="flex min-h-72 flex-col items-center justify-center text-center">
                  <span className="flex size-14 items-center justify-center rounded-full bg-[#e4f8f6] text-[#078f97]"><Check /></span>
                  <h3 className="mt-5 text-2xl font-bold">¡Gracias por escribirnos!</h3>
                  <p className="mt-2 text-[#60757d]">Te llamaremos muy pronto para hablar contigo.</p>
                </div>
              ) : (
                <form
                  className="grid gap-5 sm:grid-cols-2"
                  onSubmit={handleContactSubmit}
                >
                  <div className="grid gap-2">
                    <Label htmlFor="name">Nombre y apellidos</Label>
                    <Input id="name" name="nombre" required maxLength={120} placeholder="Cómo te llamas" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="phone">Teléfono</Label>
                    <Input id="phone" name="telefono" required maxLength={40} type="tel" placeholder="Tu número de teléfono" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="zone">Zona / Municipio</Label>
                    <Input id="zone" name="zona" required maxLength={120} placeholder="Ej. Pozuelo de Alarcón" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="service">Servicio que necesitas</Label>
                    <Select name="servicio" required>
                      <SelectTrigger id="service">
                        <SelectValue placeholder="Selecciona una opción" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hours">Cuidado por horas</SelectItem>
                        <SelectItem value="night">Noches e internos</SelectItem>
                        <SelectItem value="medical">Acompañamiento médico</SelectItem>
                        <SelectItem value="dependency">Ayuda con la dependencia</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="sm:col-span-2">
                    {submitError && (
                      <p role="alert" className="mb-3 text-sm text-red-700">{submitError}</p>
                    )}
                    <Button type="submit" size="lg" disabled={submitting} className="h-14 w-full rounded-full bg-[#08aeb4] text-white hover:bg-[#078f97]">
                      {submitting ? 'Enviando solicitud…' : 'Solicitar presupuesto gratuito'} {!submitting && <ArrowRight data-icon="inline-end" />}
                    </Button>
                    <p className="mt-3 text-center text-xs text-[#778991]">Al enviar aceptas nuestra política de privacidad.</p>
                  </div>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      <footer className="bg-[#0d2f41] px-5 py-10 text-[#d0e0e4] lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 sm:grid-cols-3">
          <div>
            <a href="#inicio" aria-label="QIDART, inicio">
              <img src="/qidart-logo.svg" alt="QIDART" className="h-12 w-auto brightness-0 invert" />
            </a>
            <p className="mt-3 text-sm font-medium text-[#61dcda]">Cuidarte es nuestra vocación</p>
            <p className="mt-3 max-w-xs text-sm leading-6">Cuidado profesional y cercano para que las familias vivan con más tranquilidad.</p>
          </div>
          <div>
            <h3 className="font-bold text-white">Contacto</h3>
            <div className="mt-4 flex flex-col gap-2 text-sm">
              <a href="tel:+34900123456" className="hover:text-white">900 123 456</a>
              <a href="mailto:hola@cuidarte.es" className="hover:text-white">hola@cuidarte.es</a>
              <span>Lunes a domingo, 24 horas</span>
            </div>
          </div>
          <div>
            <h3 className="font-bold text-white">Estamos cerca</h3>
            <p className="mt-4 text-sm leading-6">Madrid y municipios de la Comunidad de Madrid.</p>
            <div className="mt-3 flex gap-4 text-sm">
              <a href="#" className="underline underline-offset-4 hover:text-white">Aviso legal</a>
              <a href="#" className="underline underline-offset-4 hover:text-white">Privacidad</a>
            </div>
          </div>
        </div>
        <div className="mx-auto mt-10 max-w-7xl border-t border-white/10 pt-5 text-xs text-[#9bb0b7]">© 2026 QIDART. Todos los derechos reservados.</div>
      </footer>
      <a href="https://wa.me/34900123456" aria-label="Contactar por WhatsApp" className="fixed bottom-5 right-5 z-30 flex size-14 items-center justify-center rounded-full bg-[#25d366] text-white shadow-xl transition-transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-[#25d366]/40">
        <MessageCircle className="size-7 fill-white" aria-hidden="true" />
      </a>
    </main>
  )
}
