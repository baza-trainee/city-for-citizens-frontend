import localFont from 'next/font/local'
import './globals.css'

const myFont = localFont({
  src: '../public/fonts/NewMexika.ttf',
  display: 'swap',
})

export const metadata = {
  title: 'Мiсто для мiстян',
  description: 'Мiсто для мiстян',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={myFont.className}>
      <body>{children}</body>
    </html>
  )
}
