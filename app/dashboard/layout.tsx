"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Sidebar from "@/components/dashboard/sidebar"
import Header from "@/components/dashboard/header"
import { useMobile } from "@/hooks/use-mobile"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const isMobile = useMobile()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // Close sidebar when switching to desktop view
  useEffect(() => {
    if (!isMobile) {
      setSidebarOpen(false)
    }
  }, [isMobile])

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  return (
    <div className="min-h-screen bg-black text-white flex">
      <Sidebar isMobile={isMobile} isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      <div className="flex-1 flex flex-col min-h-screen">
        <Header toggleSidebar={toggleSidebar} />

        <main className="flex-1 bg-black">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="p-4 md:p-6"
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  )
}
