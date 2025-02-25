import { Montserrat } from 'next/font/google'
import './globals.css'

const montserrat = Montserrat({
  weight: '500',
  style: 'normal',
  subsets: ['latin'],
})

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${montserrat.className}`}>
        <main className="min-h-dvh p-4 bg-gray-200 flex justify-start sm:justify-center items-center">
          {children}
        </main>
      </body>
    </html>
  )
}
