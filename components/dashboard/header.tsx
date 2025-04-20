"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Bell, Menu, Search, X, MessageSquare, Calendar, CheckSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface HeaderProps {
  toggleSidebar: () => void
}

export default function Header({ toggleSidebar }: HeaderProps) {
  const [showSearch, setShowSearch] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const notifications = [
    {
      id: 1,
      type: "message",
      content: "Sarah sent you a message about the project timeline",
      time: "5 minutes ago",
      read: false,
      icon: <MessageSquare className="h-4 w-4" />,
    },
    {
      id: 2,
      type: "calendar",
      content: "Team meeting scheduled for tomorrow at 10:00 AM",
      time: "1 hour ago",
      read: false,
      icon: <Calendar className="h-4 w-4" />,
    },
    {
      id: 3,
      type: "task",
      content: "New task assigned: Update homepage design",
      time: "3 hours ago",
      read: true,
      icon: <CheckSquare className="h-4 w-4" />,
    },
  ]

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Searching for:", searchQuery)
    // Implement search functionality
    setShowSearch(false)
  }

  return (
    <header className="sticky top-0 z-30 bg-gray-900 border-b border-gray-800">
      <div className="px-4 h-16 flex items-center justify-between">
        <div className="flex items-center">
          <button
            onClick={toggleSidebar}
            className="mr-4 text-gray-400 hover:text-white md:hidden"
            aria-label="Toggle sidebar"
          >
            <Menu className="h-6 w-6" />
          </button>

          <h1 className="text-xl font-bold text-white hidden md:block">Dashboard</h1>
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={() => setShowSearch(!showSearch)}
            className="text-gray-400 hover:text-white"
            aria-label="Search"
          >
            {showSearch ? <X className="h-5 w-5" /> : <Search className="h-5 w-5" />}
          </button>

          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="text-gray-400 hover:text-white relative"
              aria-label="Notifications"
            >
              <Bell className="h-5 w-5" />
              {notifications.some((n) => !n.read) && (
                <span className="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full"></span>
              )}
            </button>

            <AnimatePresence>
              {showNotifications && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-80 bg-gray-800 border border-gray-700 rounded-lg shadow-lg overflow-hidden z-50"
                >
                  <div className="p-3 border-b border-gray-700 flex justify-between items-center">
                    <h3 className="font-medium">Notifications</h3>
                    <button className="text-xs text-purple-400 hover:text-purple-300">Mark all as read</button>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.length > 0 ? (
                      <div>
                        {notifications.map((notification) => (
                          <div
                            key={notification.id}
                            className={`p-3 border-b border-gray-700 hover:bg-gray-700/50 transition-colors ${
                              !notification.read ? "bg-gray-700/20" : ""
                            }`}
                          >
                            <div className="flex">
                              <div
                                className={`h-8 w-8 rounded-full flex items-center justify-center mr-3 ${
                                  notification.type === "message"
                                    ? "bg-blue-500/20 text-blue-400"
                                    : notification.type === "calendar"
                                      ? "bg-green-500/20 text-green-400"
                                      : "bg-purple-500/20 text-purple-400"
                                }`}
                              >
                                {notification.icon}
                              </div>
                              <div className="flex-1">
                                <p className="text-sm text-gray-300">{notification.content}</p>
                                <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="p-4 text-center text-gray-500">No notifications</div>
                    )}
                  </div>
                  <div className="p-3 border-t border-gray-700 text-center">
                    <Link href="/dashboard/notifications" className="text-sm text-purple-400 hover:text-purple-300">
                      View all notifications
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="flex items-center">
            <Link href="/dashboard/profile" className="flex items-center">
              <div className="h-8 w-8 rounded-full overflow-hidden border-2 border-gray-700">
                <Image
                  src="/placeholder.svg?height=32&width=32&text=JD"
                  alt="Profile"
                  width={32}
                  height={32}
                  className="object-cover"
                />
              </div>
              <span className="ml-2 text-sm font-medium text-gray-300 hidden md:block">John Doe</span>
            </Link>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showSearch && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="border-t border-gray-800 overflow-hidden"
          >
            <form onSubmit={handleSearch} className="p-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search for projects, tasks, or team members..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-gray-800 border-gray-700 text-white w-full"
                  autoFocus
                />
                <Button
                  type="submit"
                  size="sm"
                  className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-purple-600 hover:bg-purple-700 text-white"
                >
                  Search
                </Button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
