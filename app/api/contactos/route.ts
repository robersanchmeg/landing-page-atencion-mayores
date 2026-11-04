import { ServicioContacto } from "@prisma/client"
import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

function isContactoRequest(
  value: unknown,
): value is {
  nombre: string
  telefono: string
  zona: string
  servicio: ServicioContacto
} {
  if (typeof value !== "object" || value === null) {
    return false
  }

  const contacto = value as Record<string, unknown>

  return (
    typeof contacto.nombre === "string" &&
    contacto.nombre.trim().length > 0 &&
    contacto.nombre.trim().length <= 120 &&
    typeof contacto.telefono === "string" &&
    contacto.telefono.trim().length > 0 &&
    contacto.telefono.trim().length <= 40 &&
    typeof contacto.zona === "string" &&
    contacto.zona.trim().length > 0 &&
    contacto.zona.trim().length <= 120 &&
    (contacto.servicio === ServicioContacto.hours ||
      contacto.servicio === ServicioContacto.night ||
      contacto.servicio === ServicioContacto.medical ||
      contacto.servicio === ServicioContacto.dependency)
  )
}

export async function POST(request: Request) {
  let body: unknown

  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "La solicitud no tiene un formato válido." }, { status: 400 })
  }

  if (!isContactoRequest(body)) {
    return NextResponse.json({ error: "Revisa los datos del formulario." }, { status: 400 })
  }

  try {
    await prisma.contacto.create({
      data: {
        nombre: body.nombre.trim(),
        telefono: body.telefono.trim(),
        zona: body.zona.trim(),
        servicio: body.servicio,
      },
    })

    return NextResponse.json({ success: true }, { status: 201 })
  } catch (error) {
    console.error(
      "Failed to save contact request:",
      error instanceof Error ? error.name : "Unknown error",
    )
    return NextResponse.json(
      { error: "No se pudo guardar la solicitud. Inténtalo de nuevo más tarde." },
      { status: 500 },
    )
  }
}
