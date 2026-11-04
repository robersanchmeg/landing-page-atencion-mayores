-- CreateTable
CREATE TABLE "Candidatura" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "telefono" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "mensaje" TEXT NOT NULL,
    "cvNombre" TEXT NOT NULL,
    "cv" BYTEA NOT NULL,
    "consentimientoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Candidatura_pkey" PRIMARY KEY ("id")
);
