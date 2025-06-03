import type React from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function CodeRootsLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      {children}
      <Footer />
    </div>
  )
}
