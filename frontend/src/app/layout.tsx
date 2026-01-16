import type { Metadata, Viewport } from 'next'
import { Fraunces, DM_Sans } from 'next/font/google'
import './globals.css'

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Morning Brew Collective - Where Singapore\'s Morning Ritual Begins',
  description: 'Experience the perfect blend of tradition and modernity. Authentic Singapore kopitiam experience since 1973.',
  themeColor: '#3D2B1F',
  keywords: ['kopi', 'Singapore', 'coffee', 'kopitiam', 'heritage', 'traditional'],
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${fraunces.variable} ${dmSans.variable}`}>
      <head>
        {/* Preconnect for fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="font-body antialiased">
        {/* Skip Link */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-6 bg-espresso-dark text-cream-white px-6 py-3 rounded-full font-semibold z-[10000]"
        >
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  )
}
