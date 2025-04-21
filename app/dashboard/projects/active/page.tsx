"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, Calendar, Clock, Users, DollarSign, Filter, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

// Mock data for active projects
const activeProjectsData = [
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
]

export default function ActiveProjectsPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [filterClient, setFilterClient] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("projects")

  // Get unique clients for filter
  const clients = Array.from(new Set(activeProjectsData.map((project) => project.client)))

  const filteredProjects = activeProjectsData.filter((project) => {
    // Search filter
    const matchesSearch =
      searchQuery === "" ||
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.client.toLowerCase().includes(searchQuery.toLowerCase())

    // Client filter
    const matchesClient = !filterClient || project.client === filterClient

    return matchesSearch && matchesClient
  })

  // Calculate total stats
  const totalStats = filteredProjects.reduce(
    (acc, project) => {
      acc.totalBudget += project.budget
      acc.totalInvoiced += project.invoiced
      acc.totalHours += project.totalHours
      acc.completedHours += project.completedHours
      acc.totalTasks += project.tasks.total
      acc.completedTasks += project.tasks.completed
      acc.inProgressTasks += project.tasks.inProgress
      acc.backlogTasks += project.tasks.backlog
      return acc
    },
    {
      totalBudget: 0,
      totalInvoiced: 0,
      totalHours: 0,
      completedHours: 0,
      totalTasks: 0,
      completedTasks: 0,
      inProgressTasks: 0,
      backlogTasks: 0,
    },
  )

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="icon"
            onClick={() => router.push("/dashboard/projects")}
            className="h-8 w-8 border-gray-700 text-gray-400 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl md:text-3xl font-bold text-white">Active Projects</h1>
        </div>
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
                    setFilterClient(null)
                  }}
                  className="w-full border-gray-700 text-gray-400 hover:text-white"
                >
                  Clear Filters
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="bg-gray-800 border-gray-700">
          <TabsTrigger value="projects" className="data-[state=active]:bg-gray-700">
            Projects
          </TabsTrigger>
          <TabsTrigger value="stats" className="data-[state=active]:bg-gray-700">
            Statistics
          </TabsTrigger>
        </TabsList>

        <TabsContent value="projects" className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            {filteredProjects.map((project) => (
              <Link key={project.id} href={`/dashboard/projects/${project.id}`}>
                <Card className="bg-gray-900 border-gray-800 hover:bg-gray-800/50 transition-colors cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h2 className="text-xl font-bold text-white">{project.name}</h2>
                          <Badge className="bg-blue-900/30 text-blue-400 border-blue-500/30">{project.status}</Badge>
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
            ))}

            {filteredProjects.length === 0 && (
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-8 text-center">
                <h3 className="text-xl font-medium text-white mb-2">No active projects found</h3>
                <p className="text-gray-400 mb-6">
                  Try adjusting your search or filters to find what you're looking for.
                </p>
                <Button
                  onClick={() => {
                    setSearchQuery("")
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
        </TabsContent>

        <TabsContent value="stats" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-white">${totalStats.totalBudget.toLocaleString()}</div>
                <div className="text-gray-400">Total Budget</div>
              </CardContent>
            </Card>
            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-green-400">${totalStats.totalInvoiced.toLocaleString()}</div>
                <div className="text-gray-400">Invoiced</div>
              </CardContent>
            </Card>
            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-white">{totalStats.totalHours}</div>
                <div className="text-gray-400">Total Hours</div>
              </CardContent>
            </Card>
            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-green-400">{totalStats.completedHours}</div>
                <div className="text-gray-400">Completed Hours</div>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Task Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-gray-800 rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-white">{totalStats.totalTasks}</div>
                  <div className="text-gray-400">Total Tasks</div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-green-400">{totalStats.completedTasks}</div>
                  <div className="text-gray-400">Completed</div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-blue-400">{totalStats.inProgressTasks}</div>
                  <div className="text-gray-400">In Progress</div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-amber-400">{totalStats.backlogTasks}</div>
                  <div className="text-gray-400">Backlog</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Project Completion</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredProjects.map((project) => (
                  <div key={project.id} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="font-medium text-white">{project.name}</div>
                      <div className="text-sm text-white">{project.completion}%</div>
                    </div>
                    <Progress value={project.completion} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
