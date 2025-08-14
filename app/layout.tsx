import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Ege Üniversitesi - Klinik Araştırmalar Etik Kurulu',
  description: 'Ege Üniversitesi Klinik Araştırmalar Etik Kurulu başvuru ve değerlendirme sistemi',
  keywords: 'etik kurul, klinik araştırma, ege üniversitesi, başvuru',
  authors: [{ name: 'Ege Üniversitesi' }],
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr" className="h-full">
      <body className={`${inter.className} h-full bg-gray-50 antialiased`}>
        <div className="min-h-full">
          {children}
        </div>
      </body>
    </html>
  )
}