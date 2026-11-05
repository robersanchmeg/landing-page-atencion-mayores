import nodemailer, { type SendMailOptions } from "nodemailer"
import { ServicioContacto } from "@prisma/client"

const defaultRecipients = ["qidart@qidart.es", "duverneycardozo@qidart.es"]

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;")
}

async function sendEmail(options: Omit<SendMailOptions, "from" | "to">) {
  const host = process.env.SMTP_HOST?.trim()
  const port = Number(process.env.SMTP_PORT)
  const user = process.env.SMTP_USER?.trim()
  const password = process.env.SMTP_PASSWORD

  if (!host || !Number.isInteger(port) || port < 1 || port > 65535 || !user || !password) {
    throw new Error("SMTP_CONFIGURATION_MISSING")
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass: password },
  })

  const recipients = (process.env.SMTP_TO?.trim() || defaultRecipients.join(","))
    .split(",")
    .map((recipient) => recipient.trim())
    .filter(Boolean)

  await transporter.sendMail({
    from: process.env.SMTP_FROM?.trim() || user,
    to: recipients,
    ...options,
  })
}

const serviceLabels: Record<ServicioContacto, string> = {
  [ServicioContacto.hours]: "Cuidado por horas",
  [ServicioContacto.night]: "Noches e internos",
  [ServicioContacto.medical]: "Acompañamiento médico",
  [ServicioContacto.dependency]: "Ayuda con la dependencia",
}

export async function sendContactNotification(contact: {
  nombre: string
  telefono: string
  zona: string
  servicio: ServicioContacto
}) {
  const values = {
    Nombre: contact.nombre,
    Teléfono: contact.telefono,
    "Zona / municipio": contact.zona,
    Servicio: serviceLabels[contact.servicio],
  }
  const html = Object.entries(values)
    .map(([label, value]) => `<p><strong>${label}:</strong> ${escapeHtml(value)}</p>`)
    .join("")

  await sendEmail({
    subject: "Nueva solicitud de contacto desde QIDART",
    text: Object.entries(values).map(([label, value]) => `${label}: ${value}`).join("\n"),
    html: `<h1>Nueva solicitud de contacto</h1>${html}`,
  })
}

export async function sendApplicationNotification(application: {
  nombre: string
  telefono: string
  email: string
  mensaje: string
  cvNombre: string
  cv: Uint8Array
}) {
  const values = {
    Nombre: application.nombre,
    Teléfono: application.telefono,
    Email: application.email,
    "Sobre la candidatura": application.mensaje,
  }
  const html = Object.entries(values)
    .map(([label, value]) => `<p><strong>${label}:</strong> ${escapeHtml(value).replaceAll("\n", "<br>")}</p>`)
    .join("")

  await sendEmail({
    subject: `Nueva candidatura de ${application.nombre}`,
    replyTo: application.email,
    text: Object.entries(values).map(([label, value]) => `${label}: ${value}`).join("\n"),
    html: `<h1>Nueva candidatura</h1>${html}`,
    attachments: [
      {
        filename: application.cvNombre,
        content: Buffer.from(application.cv),
        contentType: "application/pdf",
      },
    ],
  })
}
