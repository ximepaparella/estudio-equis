"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Calendar, Clock, ArrowRight, BarChart, Users, CheckCircle2, Clock8, ListTodo } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("all")

  const projects = [
    {
      id: 1,
      name: "E-commerce Redesign",
      client: "Fashion Retailer",
      deadline: "Oct 15, 2023",
      progress: 75,
      status: "in-progress",
      image: "/placeholder.svg?height=40&width=40&text=FR",
    },
    {
      id: 2,
      name: "Mobile Banking App",
      client: "Financial Services",
      deadline: "Nov 20, 2023",
      progress: 40,
      status: "in-progress",
      image: "/placeholder.svg?height=40&width=40&text=FS",
    },
    {
      id: 3,
      name: "Corporate Website",
      client: "Tech Solutions",
      deadline: "Sep 30, 2023",
      progress: 90,
      status: "review",
      image: "/placeholder.svg?height=40&width=40&text=TS",
    },
    {
      id: 4,
      name: "Brand Identity",
      client: "Startup Inc",
      deadline: "Oct 5, 2023",
      progress: 60,
      status: "in-progress",
      image: "/placeholder.svg?height=40&width=40&text=SI",
    },
  ]

  const tasks = [
    {
      id: 1,
      title: "Update homepage design",
      project: "E-commerce Redesign",
      dueDate: "Today",
      priority: "high",
      status: "in-progress",
    },
    {
      id: 2,
      title: "Create user flow diagrams",
      project: "Mobile Banking App",
      dueDate: "Tomorrow",
      priority: "medium",
      status: "to-do",
    },
    {
      id: 3,
      title: "Finalize logo design",
      project: "Brand Identity",
      dueDate: "Oct 3, 2023",
      priority: "high",
      status: "review",
    },
    {
      id: 4,
      title: "Implement contact form",
      project: "Corporate Website",
      dueDate: "Sep 29, 2023",
      priority: "low",
      status: "to-do",
    },
  ]

  const meetings = [
    {
      id: 1,
      title: "Weekly Team Standup",
      time: "10:00 AM - 10:30 AM",
      date: "Today",
      participants: 8,
    },
    {
      id: 2,
      title: "Client Presentation",
      time: "2:00 PM - 3:00 PM",
      date: "Today",
      participants: 5,
      client: "Fashion Retailer",
    },
    {
      id: 3,
      title: "Design Review",
      time: "11:00 AM - 12:00 PM",
      date: "Tomorrow",
      participants: 4,
      project: "Mobile Banking App",
    },
  ]

  const stats = [
    {
      title: "Active Projects",
      value: "12",
      change: "+2",
      icon: <BarChart className="h-5 w-5" />,
      color: "from-purple-500 to-pink-500",
    },
    {
      title: "Team Members",
      value: "24",
      change: "+3",
      icon: <Users className="h-5 w-5" />,
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Completed Tasks",
      value: "128",
      change: "+28",
      icon: <CheckCircle2 className="h-5 w-5" />,
      color: "from-green-500 to-teal-500",
    },
    {
      title: "Pending Tasks",
      value: "42",
      change: "-5",
      icon: <Clock8 className="h-5 w-5" />,
      color: "from-orange-500 to-amber-500",
    },
  ]

  const filteredProjects = activeTab === "all" ? projects : projects.filter((project) => project.status === activeTab)

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white">Welcome back, John!</h1>
          <p className="text-gray-400">Here's what's happening with your projects today.</p>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-gray-400">
            <Calendar className="h-5 w-5 inline mr-1" />
            {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
          </span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="bg-gray-900 rounded-xl border border-gray-800 p-4"
          >
            <div className="flex justify-between items-start mb-3">
              <div className={`h-10 w-10 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                {stat.icon}
              </div>
              <div className={`text-sm font-medium ${stat.change.startsWith("+") ? "text-green-500" : "text-red-500"}`}>
                {stat.change}
              </div>
            </div>
            <h3 className="text-gray-400 text-sm">{stat.title}</h3>
            <p className="text-2xl font-bold text-white">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Projects */}
      <div className="bg-gray-900 rounded-xl border border-gray-800 p-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
          <h2 className="text-xl font-bold text-white">Your Projects</h2>
          <div className="flex space-x-2">
            <Button
              variant={activeTab === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveTab("all")}
              className={
                activeTab === "all"
                  ? "bg-purple-600 hover:bg-purple-700 text-white"
                  : "border-gray-700 text-gray-400 hover:text-white"
              }
            >
              All
            </Button>
            <Button
              variant={activeTab === "in-progress" ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveTab("in-progress")}
              className={
                activeTab === "in-progress"
                  ? "bg-blue-600 hover:bg-blue-700 text-white"
                  : "border-gray-700 text-gray-400 hover:text-white"
              }
            >
              In Progress
            </Button>
            <Button
              variant={activeTab === "review" ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveTab("review")}
              className={
                activeTab === "review"
                  ? "bg-amber-600 hover:bg-amber-700 text-white"
                  : "border-gray-700 text-gray-400 hover:text-white"
              }
            >
              In Review
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-gray-400 text-sm">
                <th className="pb-3 font-medium">Project</th>
                <th className="pb-3 font-medium">Deadline</th>
                <th className="pb-3 font-medium">Progress</th>
                <th className="pb-3 font-medium">Status</th>
                <th className="pb-3 font-medium sr-only">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {filteredProjects.map((project) => (
                <tr key={project.id} className="text-gray-300">
                  <td className="py-3 pr-4">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-lg overflow-hidden mr-3">
                        <Image
                          src={project.image || "/placeholder.svg"}
                          alt={project.client}
                          width={40}
                          height={40}
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium text-white">{project.name}</p>
                        <p className="text-sm text-gray-400">{project.client}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 pr-4">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 text-gray-400 mr-1" />
                      <span>{project.deadline}</span>
                    </div>
                  </td>
                  <td className="py-3 pr-4">
                    <div className="w-full max-w-[150px]">
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">{project.progress}%</span>
                      </div>
                      <Progress value={project.progress} className="h-2 bg-gray-700" />
                    </div>
                  </td>
                  <td className="py-3 pr-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        project.status === "in-progress"
                          ? "bg-blue-900/30 text-blue-400"
                          : project.status === "review"
                            ? "bg-amber-900/30 text-amber-400"
                            : "bg-green-900/30 text-green-400"
                      }`}
                    >
                      {project.status === "in-progress"
                        ? "In Progress"
                        : project.status === "review"
                          ? "In Review"
                          : "Completed"}
                    </span>
                  </td>
                  <td className="py-3">
                    <Link
                      href={`/dashboard/projects/${project.id}`}
                      className="text-purple-400 hover:text-purple-300 inline-flex items-center"
                    >
                      View
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 text-center">
          <Link href="/dashboard/projects">
            <Button variant="outline" className="border-gray-700 text-gray-400 hover:text-white">
              View All Projects
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Tasks */}
        <div className="bg-gray-900 rounded-xl border border-gray-800 p-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">Recent Tasks</h2>
            <Link href="/dashboard/tasks">
              <Button variant="ghost" size="sm" className="text-purple-400 hover:text-purple-300">
                View All
              </Button>
            </Link>
          </div>

          <div className="space-y-3">
            {tasks.map((task) => (
              <div key={task.id} className="bg-gray-800 rounded-lg p-3">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center mb-1">
                      <span
                        className={`h-2 w-2 rounded-full mr-2 ${
                          task.priority === "high"
                            ? "bg-red-500"
                            : task.priority === "medium"
                              ? "bg-yellow-500"
                              : "bg-green-500"
                        }`}
                      ></span>
                      <h3 className="font-medium text-white">{task.title}</h3>
                    </div>
                    <p className="text-sm text-gray-400">{task.project}</p>
                  </div>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      task.status === "in-progress"
                        ? "bg-blue-900/30 text-blue-400"
                        : task.status === "review"
                          ? "bg-amber-900/30 text-amber-400"
                          : "bg-gray-700 text-gray-300"
                    }`}
                  >
                    {task.status === "in-progress" ? "In Progress" : task.status === "review" ? "In Review" : "To Do"}
                  </span>
                </div>
                <div className="flex items-center mt-2 text-sm text-gray-400">
                  <Clock className="h-3 w-3 mr-1" />
                  <span>Due {task.dueDate}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 text-center">
            <Link href="/dashboard/tasks">
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90 text-white">
                <ListTodo className="mr-2 h-4 w-4" />
                Go to Task Board
              </Button>
            </Link>
          </div>
        </div>

        {/* Meetings */}
        <div className="bg-gray-900 rounded-xl border border-gray-800 p-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">Upcoming Meetings</h2>
            <Link href="/dashboard/calendar">
              <Button variant="ghost" size="sm" className="text-purple-400 hover:text-purple-300">
                View Calendar
              </Button>
            </Link>
          </div>

          <div className="space-y-4">
            {meetings.map((meeting) => (
              <div key={meeting.id} className="bg-gray-800 rounded-lg p-4">
                <div className="flex items-start">
                  <div className="bg-purple-900/30 text-purple-400 rounded-lg p-2 mr-3">
                    <Calendar className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-white mb-1">{meeting.title}</h3>
                    <div className="flex flex-col sm:flex-row sm:items-center text-sm text-gray-400 gap-2 sm:gap-4">
                      <div className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        <span>{meeting.time}</span>
                      </div>
                      <div>{meeting.date}</div>
                      <div className="flex items-center">
                        <Users className="h-3 w-3 mr-1" />
                        <span>{meeting.participants} participants</span>
                      </div>
                    </div>
                    {(meeting.client || meeting.project) && (
                      <div className="mt-2 text-sm">
                        <span className="text-purple-400">
                          {meeting.client ? `Client: ${meeting.client}` : `Project: ${meeting.project}`}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 text-center">
            <Link href="/dashboard/calendar">
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90 text-white">
                <Calendar className="mr-2 h-4 w-4" />
                View Full Calendar
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
