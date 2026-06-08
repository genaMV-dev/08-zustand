import type { Metadata } from "next"
import { Roboto } from "next/font/google"
import "./globals.css"
import Header from "../components/Header/Header"
import Footer from "../components/Footer/Footer"
import TanStackProvider from "../components/TanStackProvider/TanStackProvider"

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// })

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// })

const fontRoboto = Roboto({
  weight: ["400", "600"],
  subsets: ["latin"],
  display: "auto",
  variable: "--font-roboto"
})

export const metadata: Metadata = {
  title: "NoteHub",
  description: "Note management app",
  openGraph: {
    title: "NoteHub",
    description: "Note management app",
    url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
    images: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg"
  }
}

export default function RootLayout({
  children,
  modal
}: Readonly<{
  children: React.ReactNode,
  modal?: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${fontRoboto.variable}`}>
      <body>
        <TanStackProvider>
          <Header />
          {children}
          <Footer />
          {modal}
        </TanStackProvider>
      </body>
    </html>
  )
}
