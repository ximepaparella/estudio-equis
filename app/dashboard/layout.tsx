"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import Sidebar from "@/components/dashboard/sidebar"
import Header from "@/components/dashboard/header"
import { useMobile } from "@/hooks/use-mobile"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const isMobile = useMobile()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  useEffect(() => {
    if (!isMobile) {
      setIsSidebarOpen(false)
    }
  }, [isMobile])

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-950">
      <Sidebar isMobile={isMobile} isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header>
          {isMobile && (
            <Button variant="ghost" size="icon" className="mr-2" onClick={toggleSidebar} aria-label="Toggle sidebar">
              <Menu className="h-5 w-5" />
            </Button>
          )}
        </Header>
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  )
}
