import { Inter } from 'next/font/google'
import './globals.css'
import { Navbar } from './components/navbar'

const ubuntuSans = Inter({
  weight: ['300', '400', '500'],
  style: 'normal',
  subsets: ['latin'],
})

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-US">
      <body className={`${ubuntuSans.className} bg-gray-50 antialiased`}>
        <main className="min-h-dvh">
          <Navbar />

          {children}
        </main>
      </body>
    </html>
  )
}
