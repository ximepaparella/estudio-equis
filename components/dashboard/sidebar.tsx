"use client"

import type React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Calendar,
  CheckSquare,
  Users,
  FileText,
  Settings,
  LogOut,
  Menu,
  X,
  User,
  Briefcase,
  DollarSign,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Sidebar({ className, isMobile, isOpen, toggleSidebar }: any) {
  const pathname = usePathname()
  // const [isOpen, setIsOpen] = useState(false);

  // const toggleSidebar = () => {
  //   setIsOpen(!isOpen);
  // }

  const routes = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      href: "/dashboard",
      active: pathname === "/dashboard",
    },
    {
      label: "Calendar",
      icon: Calendar,
      href: "/dashboard/calendar",
      active: pathname === "/dashboard/calendar",
    },
    {
      label: "Tasks",
      icon: CheckSquare,
      href: "/dashboard/tasks",
      active: pathname === "/dashboard/tasks",
    },
    {
      label: "Projects",
      icon: Briefcase,
      href: "/dashboard/projects",
      active: pathname.includes("/dashboard/projects"),
      subItems: [
        {
          label: "All Projects",
          href: "/dashboard/projects",
          active: pathname === "/dashboard/projects",
        },
        {
          label: "Active Projects",
          href: "/dashboard/projects/active",
          active: pathname === "/dashboard/projects/active",
        },
      ],
    },
    {
      label: "Clients",
      icon: Users,
      href: "/dashboard/clients",
      active: pathname.includes("/dashboard/clients"),
    },
    {
      label: "Invoices",
      icon: FileText,
      href: "/dashboard/invoices",
      active: pathname.includes("/dashboard/invoices"),
    },
    {
      label: "Finance",
      icon: DollarSign,
      href: "/dashboard/finance",
      active: pathname === "/dashboard/finance",
    },
  ]

  return (
    <>
      <Button
        variant="outline"
        size="icon"
        className="fixed top-4 left-4 z-50 md:hidden bg-gray-900 border-gray-700 text-white"
        onClick={toggleSidebar}
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      <div
        className={cn(
          "fixed inset-0 z-40 bg-black/80 backdrop-blur-sm md:hidden transition-opacity duration-200",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none",
        )}
        onClick={toggleSidebar}
      />

      <aside
        className={cn(
          "fixed top-0 left-0 z-40 h-full w-64 bg-gray-900 border-r border-gray-800 transition-transform duration-200 md:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
          className,
        )}
      >
        <div className="flex h-full flex-col">
          <div className="flex h-14 items-center border-b border-gray-800 px-4">
            <Link href="/dashboard" className="flex items-center gap-2">
              <div className="h-7 w-7 rounded-full bg-gradient-to-br from-purple-600 to-pink-600" />
              <span className="text-lg font-bold text-white">CreativeFlow</span>
            </Link>
          </div>
          <ScrollArea className="flex-1 py-4">
            <nav className="grid gap-1 px-2">
              {routes.map((route) => (
                <div key={route.href}>
                  <Link
                    href={route.href}
                    className={cn(
                      "group flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-800 hover:text-white",
                      route.active ? "bg-gray-800 text-white" : "text-gray-400",
                    )}
                  >
                    <route.icon className="h-5 w-5" />
                    {route.label}
                  </Link>
                  {route.subItems && route.active && (
                    <div className="ml-8 mt-1 grid gap-1">
                      {route.subItems.map((subItem) => (
                        <Link
                          key={subItem.href}
                          href={subItem.href}
                          className={cn(
                            "group flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-800 hover:text-white",
                            subItem.active ? "bg-gray-800 text-white" : "text-gray-400",
                          )}
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </ScrollArea>
          <div className="mt-auto border-t border-gray-800 p-4">
            <div className="flex items-center gap-3 rounded-md px-3 py-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-800">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-white">John Doe</p>
                <p className="text-xs text-gray-400">john@example.com</p>
              </div>
            </div>
            <div className="mt-4 grid gap-1">
              <Link
                href="/dashboard/profile"
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-800 hover:text-white",
                  pathname === "/dashboard/profile" ? "bg-gray-800 text-white" : "text-gray-400",
                )}
              >
                <Settings className="h-4 w-4" />
                Settings
              </Link>
              <Link
                href="/auth/login"
                className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-gray-400 hover:bg-gray-800 hover:text-white"
              >
                <LogOut className="h-4 w-4" />
                Log out
              </Link>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}

export default Sidebar
