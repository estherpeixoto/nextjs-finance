import { Montserrat } from 'next/font/google'
import './globals.css'
import { Navbar } from './components/navbar'

const montserrat = Montserrat({
  weight: '500',
  style: 'normal',
  subsets: ['latin'],
})

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-US">
      <body className={`${montserrat.className} bg-zinc-900`}>
        <main className="min-h-dvh">
          <Navbar />

          <hr className="mx-2 sm:mx-4 mb-6 text-zinc-700" />

          {children}
        </main>
      </body>
    </html>
  )
}
