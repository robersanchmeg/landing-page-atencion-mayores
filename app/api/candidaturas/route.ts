import { Prisma } from "@prisma/client"
import { NextResponse } from "next/server"
import { sendApplicationNotification } from "@/lib/email"
import { prisma } from "@/lib/prisma"

const maxCvSize = 3 * 1024 * 1024
const maxRequestSize = maxCvSize + 64 * 1024

function isNonEmptyString(value: FormDataEntryValue | null, maxLength: number): value is string {
  return typeof value === "string" && value.trim().length > 0 && value.trim().length <= maxLength
}

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get("content-length"))

  if (Number.isFinite(contentLength) && contentLength > maxRequestSize) {
    return NextResponse.json({ error: "El archivo no puede superar los 3 MB." }, { status: 413 })
  }

  let formData: FormData

  try {
    formData = await request.formData()
  } catch {
    return NextResponse.json({ error: "La solicitud no tiene un formato válido." }, { status: 400 })
  }

  const nombre = formData.get("nombre")
  const telefono = formData.get("telefono")
  const email = formData.get("email")
  const mensaje = formData.get("mensaje")
  const cv = formData.get("cv")
  const consentimiento = formData.get("consentimiento")

  if (
    !isNonEmptyString(nombre, 120) ||
    !isNonEmptyString(telefono, 40) ||
    !isNonEmptyString(email, 254) ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) ||
    !isNonEmptyString(mensaje, 3000) ||
    consentimiento !== "on" ||
    !(cv instanceof File)
  ) {
    return NextResponse.json({ error: "Revisa los datos del formulario." }, { status: 400 })
  }

  if (cv.size === 0 || cv.size > maxCvSize) {
    return NextResponse.json({ error: "Adjunta un CV en PDF de hasta 3 MB." }, { status: 400 })
  }

  if (cv.type !== "application/pdf") {
    return NextResponse.json({ error: "El CV debe estar en formato PDF." }, { status: 400 })
  }

  const cvBytes = new Uint8Array(await cv.arrayBuffer())
  const pdfHeader = new TextDecoder("ascii").decode(cvBytes.subarray(0, 1024))

  if (!pdfHeader.includes("%PDF-")) {
    return NextResponse.json({ error: "El archivo adjunto no parece ser un PDF válido." }, { status: 400 })
  }

  const cvNombre = (cv.name.replaceAll("\\", "/").split("/").pop() ?? "")
    .replace(/[\u0000-\u001f\u007f]/g, "")
    .slice(0, 255)

  try {
    const candidatura = await prisma.candidatura.create({
      data: {
        nombre: nombre.trim(),
        telefono: telefono.trim(),
        email: email.trim(),
        mensaje: mensaje.trim(),
        cvNombre: cvNombre || "curriculum.pdf",
        cv: cvBytes,
      },
    })

    try {
      await sendApplicationNotification(candidatura)
      return NextResponse.json({ success: true, notificationSent: true }, { status: 201 })
    } catch (error) {
      console.error(
        "Failed to send application email notification:",
        error instanceof Error ? error.message : "UNKNOWN",
      )
      return NextResponse.json(
        {
          success: true,
          notificationSent: false,
          warning:
            "Hemos guardado tu candidatura, pero no se pudo enviar el aviso al equipo por correo. No la envíes de nuevo; llámanos para confirmarla.",
        },
        { status: 202 },
      )
    }
  } catch (error) {
    console.error(
      "Failed to save job application:",
      error instanceof Prisma.PrismaClientKnownRequestError ? error.code : "UNKNOWN",
    )
    return NextResponse.json(
      { error: "No se pudo enviar la candidatura. Inténtalo de nuevo más tarde." },
      { status: 500 },
    )
  }
}
