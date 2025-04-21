"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Plus, Search, Filter, Calendar, Clock, Users, DollarSign } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

// Mock data for projects
const projectsData = [
  {
    id: "project1",
    name: "Website Redesign",
    description: "Complete redesign of the corporate website with new branding",
    client: "Acme Corporation",
    clientId: "client1",
    status: "In Progress",
    startDate: "2023-09-01",
    endDate: "2023-11-30",
    budget: 15000,
    invoiced: 7500,
    completion: 50,
    tasks: {
      total: 24,
      completed: 12,
      inProgress: 8,
      backlog: 4,
    },
    totalHours: 120,
    completedHours: 60,
    team: ["John Doe", "Sarah Smith", "Mike Johnson"],
  },
  {
    id: "project2",
    name: "Mobile App Development",
    description: "Develop a new mobile app for customer engagement",
    client: "TechGiant",
    clientId: "client2",
    status: "Planning",
    startDate: "2023-10-15",
    endDate: "2024-02-28",
    budget: 45000,
    invoiced: 15000,
    completion: 10,
    tasks: {
      total: 36,
      completed: 4,
      inProgress: 6,
      backlog: 26,
    },
    totalHours: 450,
    completedHours: 45,
    team: ["Jane Wilson", "Robert Brown", "Emily Davis"],
  },
  {
    id: "project3",
    name: "Brand Identity Refresh",
    description: "Update brand guidelines, logo, and marketing materials",
    client: "Creative Studios",
    clientId: "client3",
    status: "Completed",
    startDate: "2023-07-01",
    endDate: "2023-09-15",
    budget: 12000,
    invoiced: 12000,
    completion: 100,
    tasks: {
      total: 18,
      completed: 18,
      inProgress: 0,
      backlog: 0,
    },
    totalHours: 160,
    completedHours: 160,
    team: ["Sarah Smith", "Mike Johnson", "Lisa Taylor"],
  },
  {
    id: "project4",
    name: "E-commerce Platform",
    description: "Build a new e-commerce platform with inventory management",
    client: "Retail Plus",
    clientId: "client4",
    status: "In Progress",
    startDate: "2023-08-15",
    endDate: "2024-01-15",
    budget: 35000,
    invoiced: 17500,
    completion: 40,
    tasks: {
      total: 42,
      completed: 16,
      inProgress: 12,
      backlog: 14,
    },
    totalHours: 350,
    completedHours: 140,
    team: ["John Doe", "Emily Davis", "Robert Brown"],
  },
  {
    id: "project5",
    name: "Marketing Campaign",
    description: "Q4 digital marketing campaign for product launch",
    client: "TechGiant",
    clientId: "client2",
    status: "Planning",
    startDate: "2023-10-01",
    endDate: "2023-12-31",
    budget: 20000,
    invoiced: 5000,
    completion: 15,
    tasks: {
      total: 22,
      completed: 3,
      inProgress: 5,
      backlog: 14,
    },
    totalHours: 200,
    completedHours: 30,
    team: ["Lisa Taylor", "Jane Wilson", "Mike Johnson"],
  },
]

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState<string | null>(null)
  const [filterClient, setFilterClient] = useState<string | null>(null)
  const [isNewProjectDialogOpen, setIsNewProjectDialogOpen] = useState(false)

  // Get unique clients for filter
  const clients = Array.from(new Set(projectsData.map((project) => project.client)))

  const filteredProjects = projectsData.filter((project) => {
    // Search filter
    const matchesSearch =
      searchQuery === "" ||
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.client.toLowerCase().includes(searchQuery.toLowerCase())

    // Status filter
    const matchesStatus = !filterStatus || project.status === filterStatus

    // Client filter
    const matchesClient = !filterClient || project.client === filterClient

    return matchesSearch && matchesStatus && matchesClient
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-900/30 text-green-400 border-green-500/30"
      case "In Progress":
        return "bg-blue-900/30 text-blue-400 border-blue-500/30"
      case "Planning":
        return "bg-amber-900/30 text-amber-400 border-amber-500/30"
      default:
        return "bg-gray-900/30 text-gray-400 border-gray-500/30"
    }
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-2xl md:text-3xl font-bold text-white">Projects</h1>
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-grow max-w-xs">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-gray-800 border-gray-700 text-white"
            />
          </div>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm" className="border-gray-700 text-gray-400 hover:text-white">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 bg-gray-800 border-gray-700 text-white p-4">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Status</label>
                  <Select value={filterStatus || ""} onValueChange={(value) => setFilterStatus(value || null)}>
                    <SelectTrigger className="bg-gray-900 border-gray-700 text-white">
                      <SelectValue placeholder="All statuses" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 border-gray-700 text-white">
                      <SelectItem value="none">All statuses</SelectItem>
                      <SelectItem value="Planning">Planning</SelectItem>
                      <SelectItem value="In Progress">In Progress</SelectItem>
                      <SelectItem value="Completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Client</label>
                  <Select value={filterClient || ""} onValueChange={(value) => setFilterClient(value || null)}>
                    <SelectTrigger className="bg-gray-900 border-gray-700 text-white">
                      <SelectValue placeholder="All clients" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 border-gray-700 text-white">
                      <SelectItem value="none">All clients</SelectItem>
                      {clients.map((client) => (
                        <SelectItem key={client} value={client}>
                          {client}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setFilterStatus(null)
                    setFilterClient(null)
                  }}
                  className="w-full border-gray-700 text-gray-400 hover:text-white"
                >
                  Clear Filters
                </Button>
              </div>
            </PopoverContent>
          </Popover>

          <Dialog open={isNewProjectDialogOpen} onOpenChange={setIsNewProjectDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90 text-white">
                <Plus className="mr-2 h-4 w-4" />
                New Project
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-gray-900 border-gray-800 text-white max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Project</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div>
                  <Label htmlFor="project-name" className="text-gray-300">
                    Project Name*
                  </Label>
                  <Input
                    id="project-name"
                    placeholder="Enter project name"
                    className="bg-gray-800 border-gray-700 text-white mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="description" className="text-gray-300">
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="Enter project description"
                    className="bg-gray-800 border-gray-700 text-white mt-1"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="client" className="text-gray-300">
                      Client*
                    </Label>
                    <Select>
                      <SelectTrigger className="bg-gray-800 border-gray-700 text-white mt-1">
                        <SelectValue placeholder="Select client" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-900 border-gray-700 text-white">
                        {clients.map((client) => (
                          <SelectItem key={client} value={client}>
                            {client}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="status" className="text-gray-300">
                      Status*
                    </Label>
                    <Select defaultValue="Planning">
                      <SelectTrigger className="bg-gray-800 border-gray-700 text-white mt-1">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-900 border-gray-700 text-white">
                        <SelectItem value="Planning">Planning</SelectItem>
                        <SelectItem value="In Progress">In Progress</SelectItem>
                        <SelectItem value="Completed">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="start-date" className="text-gray-300">
                      Start Date*
                    </Label>
                    <Input id="start-date" type="date" className="bg-gray-800 border-gray-700 text-white mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="end-date" className="text-gray-300">
                      End Date*
                    </Label>
                    <Input id="end-date" type="date" className="bg-gray-800 border-gray-700 text-white mt-1" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="budget" className="text-gray-300">
                    Budget ($)
                  </Label>
                  <Input
                    id="budget"
                    type="number"
                    placeholder="Enter project budget"
                    className="bg-gray-800 border-gray-700 text-white mt-1"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsNewProjectDialogOpen(false)}
                  className="border-gray-700 text-gray-400 hover:text-white"
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => setIsNewProjectDialogOpen(false)}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90 text-white"
                >
                  Create Project
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {filteredProjects.map((project) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Link href={`/dashboard/projects/${project.id}`}>
              <Card className="bg-gray-900 border-gray-800 hover:bg-gray-800/50 transition-colors cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h2 className="text-xl font-bold text-white">{project.name}</h2>
                        <Badge className={getStatusColor(project.status)}>{project.status}</Badge>
                      </div>
                      <p className="text-gray-400 mb-4 max-w-2xl">{project.description}</p>
                      <div className="flex flex-wrap gap-6 text-sm">
                        <div className="flex items-center text-gray-300">
                          <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                          <span>
                            {new Date(project.startDate).toLocaleDateString()} -{" "}
                            {new Date(project.endDate).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center text-gray-300">
                          <Users className="h-4 w-4 mr-2 text-gray-400" />
                          <span>{project.client}</span>
                        </div>
                        <div className="flex items-center text-gray-300">
                          <Clock className="h-4 w-4 mr-2 text-gray-400" />
                          <span>
                            {project.completedHours} / {project.totalHours} hours
                          </span>
                        </div>
                        <div className="flex items-center text-gray-300">
                          <DollarSign className="h-4 w-4 mr-2 text-gray-400" />
                          <span>
                            ${project.invoiced.toLocaleString()} / ${project.budget.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <div className="text-right">
                        <div className="text-sm text-gray-400">Completion</div>
                        <div className="text-xl font-bold text-white">{project.completion}%</div>
                      </div>
                      <div className="w-32">
                        <Progress value={project.completion} className="h-2" />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
                    <div className="bg-gray-800 rounded-lg p-3 text-center">
                      <div className="text-2xl font-bold text-white">{project.tasks.total}</div>
                      <div className="text-sm text-gray-400">Total Tasks</div>
                    </div>
                    <div className="bg-gray-800 rounded-lg p-3 text-center">
                      <div className="text-2xl font-bold text-green-400">{project.tasks.completed}</div>
                      <div className="text-sm text-gray-400">Completed</div>
                    </div>
                    <div className="bg-gray-800 rounded-lg p-3 text-center">
                      <div className="text-2xl font-bold text-blue-400">{project.tasks.inProgress}</div>
                      <div className="text-sm text-gray-400">In Progress</div>
                    </div>
                    <div className="bg-gray-800 rounded-lg p-3 text-center">
                      <div className="text-2xl font-bold text-amber-400">{project.tasks.backlog}</div>
                      <div className="text-sm text-gray-400">Backlog</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}

        {filteredProjects.length === 0 && (
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-8 text-center">
            <h3 className="text-xl font-medium text-white mb-2">No projects found</h3>
            <p className="text-gray-400 mb-6">Try adjusting your search or filters to find what you're looking for.</p>
            <Button
              onClick={() => {
                setSearchQuery("")
                setFilterStatus(null)
                setFilterClient(null)
              }}
              variant="outline"
              className="border-gray-700 text-gray-300 hover:text-white"
            >
              Clear all filters
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
