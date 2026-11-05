import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://www.qidart.es'),
  title: 'Cuidado de Personas Mayores a Domicilio en Madrid | QIDART',
  description: 'Atención y cuidado a domicilio para personas mayores y dependientes en Madrid. Cuidado profesional, cercano y adaptado a cada familia.',
  alternates: {
    canonical: '/',
  },
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/qidart-logo.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#fbfcfa',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className="antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
