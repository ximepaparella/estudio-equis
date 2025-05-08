"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Users,
  FileText,
  Calendar,
  Settings,
  CreditCard,
  Briefcase,
  CheckSquare,
  Globe,
} from "lucide-react"

interface SidebarLinkProps {
  href: string
  icon: React.ReactNode
  label: string
  active?: boolean
}

function SidebarLink({ href, icon, label, active }: SidebarLinkProps) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
        active ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white" : "text-gray-400 hover:text-white"
      }`}
    >
      {icon}
      {label}
    </Link>
  )
}

interface SidebarProps {
  isMobile: boolean
  isOpen: boolean
  toggleSidebar: () => void
}

export default function Sidebar({ isMobile, isOpen, toggleSidebar }: SidebarProps) {
  const pathname = usePathname()

  return (
    <div
      className={`fixed inset-y-0 left-0 z-40 w-64 flex-shrink-0 overflow-y-auto bg-gray-900 text-white border-r border-gray-800 md:static md:inset-auto md:border-0 transition-transform duration-300 ${
        isMobile ? (isOpen ? "translate-x-0" : "-translate-x-full") : "translate-x-0"
      }`}
    >
      <div className="flex h-full w-full flex-col">
        <div className="flex-1 overflow-auto py-2">
          <nav className="grid items-start px-2 text-sm font-medium">
            <div className="space-y-1">
              <SidebarLink
                href="/dashboard"
                icon={<LayoutDashboard className="h-4 w-4" />}
                label="Dashboard"
                active={pathname === "/dashboard"}
              />
              <SidebarLink
                href="/dashboard/websites"
                icon={<Globe className="h-4 w-4" />}
                label="Websites"
                active={pathname.startsWith("/dashboard/websites")}
              />
              <SidebarLink
                href="/dashboard/clients"
                icon={<Users className="h-4 w-4" />}
                label="Clients"
                active={pathname.startsWith("/dashboard/clients")}
              />
              <SidebarLink
                href="/dashboard/projects"
                icon={<Briefcase className="h-4 w-4" />}
                label="Projects"
                active={pathname.startsWith("/dashboard/projects")}
              />
              <SidebarLink
                href="/dashboard/tasks"
                icon={<CheckSquare className="h-4 w-4" />}
                label="Tasks"
                active={pathname.startsWith("/dashboard/tasks")}
              />
              <SidebarLink
                href="/dashboard/invoices"
                icon={<FileText className="h-4 w-4" />}
                label="Invoices"
                active={pathname.startsWith("/dashboard/invoices")}
              />
              <SidebarLink
                href="/dashboard/calendar"
                icon={<Calendar className="h-4 w-4" />}
                label="Calendar"
                active={pathname.startsWith("/dashboard/calendar")}
              />
              <SidebarLink
                href="/dashboard/finance"
                icon={<CreditCard className="h-4 w-4" />}
                label="Finance"
                active={pathname.startsWith("/dashboard/finance")}
              />
              <SidebarLink
                href="/dashboard/profile"
                icon={<Settings className="h-4 w-4" />}
                label="Settings"
                active={pathname.startsWith("/dashboard/profile")}
              />
            </div>
          </nav>
        </div>
      </div>
    </div>
  )
}
