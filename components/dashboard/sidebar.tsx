"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import {
  LayoutDashboard,
  Calendar,
  ListTodo,
  Users,
  Settings,
  LogOut,
  X,
  ChevronDown,
  ChevronRight,
  FileText,
  DollarSign,
  Briefcase,
} from "lucide-react"

interface SidebarProps {
  isMobile: boolean
  isOpen: boolean
  toggleSidebar: () => void
}

export default function Sidebar({ isMobile, isOpen, toggleSidebar }: SidebarProps) {
  const pathname = usePathname()
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null)

  const mainLinks = [
    {
      title: "Dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
      href: "/dashboard",
    },
    {
      title: "Calendar",
      icon: <Calendar className="h-5 w-5" />,
      href: "/dashboard/calendar",
    },
    {
      title: "Task Board",
      icon: <ListTodo className="h-5 w-5" />,
      href: "/dashboard/tasks",
    },
    {
      title: "Clients",
      icon: <Briefcase className="h-5 w-5" />,
      href: "/dashboard/clients",
    },
    {
      title: "Invoices",
      icon: <FileText className="h-5 w-5" />,
      href: "/dashboard/invoices",
    },
    {
      title: "Finance",
      icon: <DollarSign className="h-5 w-5" />,
      href: "/dashboard/finance",
    },
  ]

  const projectLinks = [
    { title: "Active Projects", href: "/dashboard/projects/active" },
    { title: "Completed Projects", href: "/dashboard/projects/completed" },
    { title: "Project Archive", href: "/dashboard/projects/archive" },
  ]

  const toggleSubmenu = (title: string) => {
    setOpenSubmenu(openSubmenu === title ? null : title)
  }

  const sidebarVariants = {
    open: { x: 0, opacity: 1 },
    closed: { x: isMobile ? "-100%" : 0, opacity: isMobile ? 0 : 1 },
  }

  return (
    <>
      {/* Mobile Overlay */}
      {isMobile && isOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40" onClick={toggleSidebar} aria-hidden="true" />
      )}

      {/* Sidebar */}
      <motion.aside
        initial={isMobile ? "closed" : "open"}
        animate={isOpen || !isMobile ? "open" : "closed"}
        variants={sidebarVariants}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={`fixed md:sticky top-0 left-0 z-50 h-screen w-64 bg-gray-900 border-r border-gray-800 flex flex-col ${
          isMobile && !isOpen ? "hidden" : "flex"
        }`}
      >
        {/* Header */}
        <div className="p-4 border-b border-gray-800 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center">
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
              CREATIVE
            </span>
          </Link>
          {isMobile && (
            <button onClick={toggleSidebar} className="text-gray-400 hover:text-white">
              <X className="h-6 w-6" />
            </button>
          )}
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto py-4 px-3">
          <nav className="space-y-6">
            <div>
              <h3 className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Main</h3>
              <ul className="space-y-1">
                {mainLinks.map((link) => (
                  <li key={link.title}>
                    <Link
                      href={link.href}
                      className={`flex items-center px-4 py-2.5 rounded-lg transition-colors ${
                        pathname === link.href
                          ? "bg-purple-900/20 text-purple-400"
                          : "text-gray-300 hover:bg-gray-800 hover:text-white"
                      }`}
                    >
                      <span className="mr-3">{link.icon}</span>
                      <span>{link.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Projects</h3>
              <div>
                <button
                  onClick={() => toggleSubmenu("Projects")}
                  className={`flex items-center justify-between w-full px-4 py-2.5 rounded-lg transition-colors ${
                    pathname.includes("/dashboard/projects")
                      ? "bg-purple-900/20 text-purple-400"
                      : "text-gray-300 hover:bg-gray-800 hover:text-white"
                  }`}
                >
                  <div className="flex items-center">
                    <Users className="h-5 w-5 mr-3" />
                    <span>Projects</span>
                  </div>
                  {openSubmenu === "Projects" ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </button>

                {openSubmenu === "Projects" && (
                  <motion.ul
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="mt-1 ml-6 space-y-1"
                  >
                    {projectLinks.map((link) => (
                      <li key={link.title}>
                        <Link
                          href={link.href}
                          className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                            pathname === link.href
                              ? "bg-purple-900/20 text-purple-400"
                              : "text-gray-300 hover:bg-gray-800 hover:text-white"
                          }`}
                        >
                          <span>{link.title}</span>
                        </Link>
                      </li>
                    ))}
                  </motion.ul>
                )}
              </div>
            </div>

            <div>
              <h3 className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Account</h3>
              <ul className="space-y-1">
                <li>
                  <Link
                    href="/dashboard/profile"
                    className={`flex items-center px-4 py-2.5 rounded-lg transition-colors ${
                      pathname === "/dashboard/profile"
                        ? "bg-purple-900/20 text-purple-400"
                        : "text-gray-300 hover:bg-gray-800 hover:text-white"
                    }`}
                  >
                    <Settings className="h-5 w-5 mr-3" />
                    <span>Profile Settings</span>
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-800">
          <button className="flex items-center justify-center w-full px-4 py-2 text-gray-300 hover:text-white transition-colors">
            <LogOut className="h-5 w-5 mr-3" />
            <span>Log Out</span>
          </button>
        </div>
      </motion.aside>
    </>
  )
}
