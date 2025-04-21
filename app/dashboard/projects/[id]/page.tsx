"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  ArrowLeft,
  Calendar,
  Clock,
  Users,
  DollarSign,
  Edit,
  Trash2,
  Plus,
  CheckCircle,
  AlertCircle,
  Briefcase,
  FileText,
  Mail,
  Phone,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock data for a project
const getProjectData = (id: string) => {
  // This would normally be a fetch from your API
  return {
    id,
    name: id === "active" ? "Active Projects Overview" : "Website Redesign",
    description:
      id === "active"
        ? "Overview of all active projects"
        : "Complete redesign of the corporate website with new branding and improved user experience. Includes responsive design, content migration, and SEO optimization.",
    client: "Acme Corporation",
    clientId: "client1",
    clientEmail: "contact@acmecorp.com",
    clientPhone: "+1 (555) 123-4567",
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
    team: [
      { id: "user1", name: "John Doe", role: "Project Manager", avatar: "/placeholder.svg?height=40&width=40" },
      { id: "user2", name: "Sarah Smith", role: "UI/UX Designer", avatar: "/placeholder.svg?height=40&width=40" },
      { id: "user3", name: "Mike Johnson", role: "Developer", avatar: "/placeholder.svg?height=40&width=40" },
    ],
    milestones: [
      {
        id: "m1",
        title: "Project Kickoff",
        date: "2023-09-01",
        completed: true,
        description: "Initial meeting with client to define project scope and requirements",
      },
      {
        id: "m2",
        title: "Design Approval",
        date: "2023-09-15",
        completed: true,
        description: "Client approval of website design mockups and wireframes",
      },
      {
        id: "m3",
        title: "Development Phase 1",
        date: "2023-10-15",
        completed: false,
        description: "Completion of core website functionality and responsive framework",
      },
      {
        id: "m4",
        title: "Content Migration",
        date: "2023-11-01",
        completed: false,
        description: "Migration of existing content to new website structure",
      },
      {
        id: "m5",
        title: "Launch",
        date: "2023-11-30",
        completed: false,
        description: "Website launch and final client approval",
      },
    ],
    taskList: [
      {
        id: "task1",
        title: "Create wireframes",
        status: "Completed",
        assignee: "Sarah Smith",
        dueDate: "2023-09-10",
        priority: "High",
        hours: 16,
        completedHours: 16,
      },
      {
        id: "task2",
        title: "Design homepage",
        status: "Completed",
        assignee: "Sarah Smith",
        dueDate: "2023-09-15",
        priority: "High",
        hours: 24,
        completedHours: 24,
      },
      {
        id: "task3",
        title: "Develop responsive framework",
        status: "In Progress",
        assignee: "Mike Johnson",
        dueDate: "2023-10-05",
        priority: "High",
        hours: 40,
        completedHours: 20,
      },
      {
        id: "task4",
        title: "Implement contact form",
        status: "In Progress",
        assignee: "Mike Johnson",
        dueDate: "2023-10-10",
        priority: "Medium",
        hours: 8,
        completedHours: 0,
      },
      {
        id: "task5",
        title: "SEO optimization",
        status: "Backlog",
        assignee: "John Doe",
        dueDate: "2023-11-15",
        priority: "Medium",
        hours: 16,
        completedHours: 0,
      },
    ],
    invoices: [
      {
        id: "inv1",
        number: "INV-2023-001",
        date: "2023-09-15",
        amount: 5000,
        status: "Paid",
        description: "Initial payment (33%)",
      },
      {
        id: "inv2",
        number: "INV-2023-002",
        date: "2023-10-15",
        amount: 2500,
        status: "Paid",
        description: "Milestone payment (17%)",
      },
      {
        id: "inv3",
        number: "INV-2023-003",
        date: "2023-11-01",
        amount: 5000,
        status: "Pending",
        description: "Milestone payment (33%)",
      },
      {
        id: "inv4",
        number: "INV-2023-004",
        date: "2023-11-30",
        amount: 2500,
        status: "Draft",
        description: "Final payment (17%)",
      },
    ],
  }
}

export default function ProjectDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("overview")
  const project = getProjectData(params.id)

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

  const getTaskStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-900/30 text-green-400 border-green-500/30"
      case "In Progress":
        return "bg-blue-900/30 text-blue-400 border-blue-500/30"
      case "Backlog":
        return "bg-amber-900/30 text-amber-400 border-amber-500/30"
      default:
        return "bg-gray-900/30 text-gray-400 border-gray-500/30"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-red-900/30 text-red-400 border-red-500/30"
      case "Medium":
        return "bg-amber-900/30 text-amber-400 border-amber-500/30"
      case "Low":
        return "bg-green-900/30 text-green-400 border-green-500/30"
      default:
        return "bg-gray-900/30 text-gray-400 border-gray-500/30"
    }
  }

  const getInvoiceStatusColor = (status: string) => {
    switch (status) {
      case "Paid":
        return "bg-green-900/30 text-green-400 border-green-500/30"
      case "Pending":
        return "bg-amber-900/30 text-amber-400 border-amber-500/30"
      case "Draft":
        return "bg-blue-900/30 text-blue-400 border-blue-500/30"
      case "Overdue":
        return "bg-red-900/30 text-red-400 border-red-500/30"
      default:
        return "bg-gray-900/30 text-gray-400 border-gray-500/30"
    }
  }

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
          <h1 className="text-2xl md:text-3xl font-bold text-white">{project.name}</h1>
          <Badge className={getStatusColor(project.status)}>{project.status}</Badge>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="border-gray-700 text-gray-400 hover:text-white">
            <Edit className="mr-2 h-4 w-4" />
            Edit Project
          </Button>
          <Button variant="destructive" className="bg-red-900 hover:bg-red-800 text-white border-none">
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="bg-gray-800 border-gray-700">
          <TabsTrigger value="overview" className="data-[state=active]:bg-gray-700">
            Overview
          </TabsTrigger>
          <TabsTrigger value="tasks" className="data-[state=active]:bg-gray-700">
            Tasks
          </TabsTrigger>
          <TabsTrigger value="timeline" className="data-[state=active]:bg-gray-700">
            Timeline
          </TabsTrigger>
          <TabsTrigger value="team" className="data-[state=active]:bg-gray-700">
            Team
          </TabsTrigger>
          <TabsTrigger value="finances" className="data-[state=active]:bg-gray-700">
            Finances
          </TabsTrigger>
          <TabsTrigger value="client" className="data-[state=active]:bg-gray-700">
            Client
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Project Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-400">{project.description}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-gray-400 mb-1">Start Date</div>
                    <div className="text-white flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                      {new Date(project.startDate).toLocaleDateString()}
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-400 mb-1">End Date</div>
                    <div className="text-white flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                      {new Date(project.endDate).toLocaleDateString()}
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-400 mb-1">Client</div>
                    <div className="text-white flex items-center">
                      <Users className="h-4 w-4 mr-2 text-gray-400" />
                      {project.client}
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-400 mb-1">Status</div>
                    <Badge className={getStatusColor(project.status)}>{project.status}</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Project Progress</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <div className="text-gray-400">Completion</div>
                    <div className="text-white font-bold">{project.completion}%</div>
                  </div>
                  <Progress value={project.completion} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <div className="text-gray-400">Budget Used</div>
                    <div className="text-white font-bold">
                      ${project.invoiced.toLocaleString()} / ${project.budget.toLocaleString()}
                    </div>
                  </div>
                  <Progress value={(project.invoiced / project.budget) * 100} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <div className="text-gray-400">Hours Used</div>
                    <div className="text-white font-bold">
                      {project.completedHours} / {project.totalHours} hours
                    </div>
                  </div>
                  <Progress value={(project.completedHours / project.totalHours) * 100} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-white">{project.tasks.total}</div>
                <div className="text-gray-400">Total Tasks</div>
              </CardContent>
            </Card>
            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-green-400">{project.tasks.completed}</div>
                <div className="text-gray-400">Completed Tasks</div>
              </CardContent>
            </Card>
            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-blue-400">{project.tasks.inProgress}</div>
                <div className="text-gray-400">In Progress</div>
              </CardContent>
            </Card>
            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-amber-400">{project.tasks.backlog}</div>
                <div className="text-gray-400">Backlog</div>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Recent Tasks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {project.taskList.slice(0, 3).map((task) => (
                  <div
                    key={task.id}
                    className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 bg-gray-800 rounded-lg"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-medium text-white">{task.title}</h3>
                        <Badge className={getTaskStatusColor(task.status)}>{task.status}</Badge>
                        <Badge className={getPriorityColor(task.priority)}>{task.priority}</Badge>
                      </div>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-1" />
                          {task.assignee}
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {new Date(task.dueDate).toLocaleDateString()}
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {task.completedHours} / {task.hours} hours
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Progress
                        value={(task.completedHours / task.hours) * 100}
                        className="h-2 w-24"
                        aria-label="Task progress"
                      />
                      <span className="text-sm text-white font-medium">
                        {Math.round((task.completedHours / task.hours) * 100)}%
                      </span>
                    </div>
                  </div>
                ))}
                <div className="text-center mt-4">
                  <Button
                    variant="outline"
                    onClick={() => setActiveTab("tasks")}
                    className="border-gray-700 text-gray-400 hover:text-white"
                  >
                    View All Tasks
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tasks" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-white">Project Tasks</h2>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90 text-white">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Task
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-gray-900 border-gray-800 text-white">
                <DialogHeader>
                  <DialogTitle>Add New Task</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div>
                    <Label htmlFor="task-title" className="text-gray-300">
                      Task Title*
                    </Label>
                    <Input
                      id="task-title"
                      placeholder="Enter task title"
                      className="bg-gray-800 border-gray-700 text-white mt-1"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="status" className="text-gray-300">
                        Status*
                      </Label>
                      <Select defaultValue="Backlog">
                        <SelectTrigger className="bg-gray-800 border-gray-700 text-white mt-1">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-900 border-gray-700 text-white">
                          <SelectItem value="Backlog">Backlog</SelectItem>
                          <SelectItem value="In Progress">In Progress</SelectItem>
                          <SelectItem value="Completed">Completed</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="priority" className="text-gray-300">
                        Priority*
                      </Label>
                      <Select defaultValue="Medium">
                        <SelectTrigger className="bg-gray-800 border-gray-700 text-white mt-1">
                          <SelectValue placeholder="Select priority" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-900 border-gray-700 text-white">
                          <SelectItem value="Low">Low</SelectItem>
                          <SelectItem value="Medium">Medium</SelectItem>
                          <SelectItem value="High">High</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="assignee" className="text-gray-300">
                        Assignee*
                      </Label>
                      <Select>
                        <SelectTrigger className="bg-gray-800 border-gray-700 text-white mt-1">
                          <SelectValue placeholder="Select assignee" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-900 border-gray-700 text-white">
                          {project.team.map((member) => (
                            <SelectItem key={member.id} value={member.name}>
                              {member.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="due-date" className="text-gray-300">
                        Due Date*
                      </Label>
                      <Input id="due-date" type="date" className="bg-gray-800 border-gray-700 text-white mt-1" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="estimated-hours" className="text-gray-300">
                        Estimated Hours*
                      </Label>
                      <Input
                        id="estimated-hours"
                        type="number"
                        placeholder="Enter hours"
                        className="bg-gray-800 border-gray-700 text-white mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="completed-hours" className="text-gray-300">
                        Completed Hours
                      </Label>
                      <Input
                        id="completed-hours"
                        type="number"
                        placeholder="Enter hours"
                        className="bg-gray-800 border-gray-700 text-white mt-1"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="description" className="text-gray-300">
                      Description
                    </Label>
                    <Textarea
                      id="description"
                      placeholder="Enter task description"
                      className="bg-gray-800 border-gray-700 text-white mt-1"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" className="border-gray-700 text-gray-400 hover:text-white">
                    Cancel
                  </Button>
                  <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90 text-white">
                    Add Task
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="space-y-4">
            {project.taskList.map((task) => (
              <div
                key={task.id}
                className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 bg-gray-800 rounded-lg"
              >
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-medium text-white">{task.title}</h3>
                    <Badge className={getTaskStatusColor(task.status)}>{task.status}</Badge>
                    <Badge className={getPriorityColor(task.priority)}>{task.priority}</Badge>
                  </div>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      {task.assignee}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {new Date(task.dueDate).toLocaleDateString()}
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {task.completedHours} / {task.hours} hours
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Progress
                      value={(task.completedHours / task.hours) * 100}
                      className="h-2 w-24"
                      aria-label="Task progress"
                    />
                    <span className="text-sm text-white font-medium">
                      {Math.round((task.completedHours / task.hours) * 100)}%
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="h-8 w-8 p-0 border-gray-700">
                      <Edit className="h-4 w-4 text-gray-400" />
                    </Button>
                    <Button variant="outline" size="sm" className="h-8 w-8 p-0 border-gray-700">
                      <Trash2 className="h-4 w-4 text-gray-400" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="timeline" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-white">Project Timeline</h2>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90 text-white">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Milestone
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-gray-900 border-gray-800 text-white">
                <DialogHeader>
                  <DialogTitle>Add New Milestone</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div>
                    <Label htmlFor="milestone-title" className="text-gray-300">
                      Milestone Title*
                    </Label>
                    <Input
                      id="milestone-title"
                      placeholder="Enter milestone title"
                      className="bg-gray-800 border-gray-700 text-white mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="milestone-date" className="text-gray-300">
                      Date*
                    </Label>
                    <Input id="milestone-date" type="date" className="bg-gray-800 border-gray-700 text-white mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="milestone-description" className="text-gray-300">
                      Description
                    </Label>
                    <Textarea
                      id="milestone-description"
                      placeholder="Enter milestone description"
                      className="bg-gray-800 border-gray-700 text-white mt-1"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" className="border-gray-700 text-gray-400 hover:text-white">
                    Cancel
                  </Button>
                  <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90 text-white">
                    Add Milestone
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-700" />
            <div className="space-y-8 relative pl-12">
              {project.milestones.map((milestone, index) => (
                <div key={milestone.id} className="relative">
                  <div
                    className={`absolute -left-12 top-0 w-8 h-8 rounded-full flex items-center justify-center ${
                      milestone.completed
                        ? "bg-green-500/20 text-green-400 border border-green-500/30"
                        : "bg-gray-800 text-gray-400 border border-gray-700"
                    }`}
                  >
                    {milestone.completed ? <CheckCircle className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
                  </div>
                  <div className="bg-gray-800 rounded-lg p-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
                      <h3 className="font-medium text-white">{milestone.title}</h3>
                      <div className="flex items-center gap-2">
                        <div className="text-sm text-gray-400">{new Date(milestone.date).toLocaleDateString()}</div>
                        <Badge
                          className={
                            milestone.completed
                              ? "bg-green-900/30 text-green-400 border-green-500/30"
                              : "bg-blue-900/30 text-blue-400 border-blue-500/30"
                          }
                        >
                          {milestone.completed ? "Completed" : "Upcoming"}
                        </Badge>
                      </div>
                    </div>
                    <p className="text-gray-400 text-sm">{milestone.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="team" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-white">Project Team</h2>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90 text-white">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Team Member
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-gray-900 border-gray-800 text-white">
                <DialogHeader>
                  <DialogTitle>Add Team Member</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div>
                    <Label htmlFor="team-member" className="text-gray-300">
                      Team Member*
                    </Label>
                    <Select>
                      <SelectTrigger className="bg-gray-800 border-gray-700 text-white mt-1">
                        <SelectValue placeholder="Select team member" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-900 border-gray-700 text-white">
                        <SelectItem value="user1">John Doe</SelectItem>
                        <SelectItem value="user2">Sarah Smith</SelectItem>
                        <SelectItem value="user3">Mike Johnson</SelectItem>
                        <SelectItem value="user4">Emily Davis</SelectItem>
                        <SelectItem value="user5">Robert Brown</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="role" className="text-gray-300">
                      Role*
                    </Label>
                    <Select>
                      <SelectTrigger className="bg-gray-800 border-gray-700 text-white mt-1">
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-900 border-gray-700 text-white">
                        <SelectItem value="Project Manager">Project Manager</SelectItem>
                        <SelectItem value="UI/UX Designer">UI/UX Designer</SelectItem>
                        <SelectItem value="Developer">Developer</SelectItem>
                        <SelectItem value="Content Writer">Content Writer</SelectItem>
                        <SelectItem value="QA Tester">QA Tester</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" className="border-gray-700 text-gray-400 hover:text-white">
                    Cancel
                  </Button>
                  <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90 text-white">
                    Add Team Member
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {project.team.map((member) => (
              <Card key={member.id} className="bg-gray-900 border-gray-800">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <Avatar className="h-20 w-20 mb-4">
                      <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                      <AvatarFallback className="bg-gray-700 text-white">
                        {member.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <h3 className="text-lg font-medium text-white mb-1">{member.name}</h3>
                    <p className="text-gray-400 mb-4">{member.role}</p>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 w-8 p-0 border-gray-700 text-gray-400 hover:text-white"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 w-8 p-0 border-gray-700 text-gray-400 hover:text-white"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="finances" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-white">Project Finances</h2>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90 text-white">
                  <Plus className="mr-2 h-4 w-4" />
                  Create Invoice
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-gray-900 border-gray-800 text-white">
                <DialogHeader>
                  <DialogTitle>Create New Invoice</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div>
                    <Label htmlFor="invoice-number" className="text-gray-300">
                      Invoice Number*
                    </Label>
                    <Input
                      id="invoice-number"
                      placeholder="Enter invoice number"
                      className="bg-gray-800 border-gray-700 text-white mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="invoice-date" className="text-gray-300">
                      Date*
                    </Label>
                    <Input id="invoice-date" type="date" className="bg-gray-800 border-gray-700 text-white mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="invoice-amount" className="text-gray-300">
                      Amount ($)*
                    </Label>
                    <Input
                      id="invoice-amount"
                      type="number"
                      placeholder="Enter amount"
                      className="bg-gray-800 border-gray-700 text-white mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="invoice-status" className="text-gray-300">
                      Status*
                    </Label>
                    <Select defaultValue="Draft">
                      <SelectTrigger className="bg-gray-800 border-gray-700 text-white mt-1">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-900 border-gray-700 text-white">
                        <SelectItem value="Draft">Draft</SelectItem>
                        <SelectItem value="Pending">Pending</SelectItem>
                        <SelectItem value="Paid">Paid</SelectItem>
                        <SelectItem value="Overdue">Overdue</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="invoice-description" className="text-gray-300">
                      Description
                    </Label>
                    <Textarea
                      id="invoice-description"
                      placeholder="Enter description"
                      className="bg-gray-800 border-gray-700 text-white mt-1"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" className="border-gray-700 text-gray-400 hover:text-white">
                    Cancel
                  </Button>
                  <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90 text-white">
                    Create Invoice
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-white">${project.budget.toLocaleString()}</div>
                <div className="text-gray-400">Total Budget</div>
              </CardContent>
            </Card>
            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-green-400">${project.invoiced.toLocaleString()}</div>
                <div className="text-gray-400">Invoiced</div>
              </CardContent>
            </Card>
            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-blue-400">
                  ${(project.budget - project.invoiced).toLocaleString()}
                </div>
                <div className="text-gray-400">Remaining</div>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Invoices</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {project.invoices.map((invoice) => (
                  <div
                    key={invoice.id}
                    className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 bg-gray-800 rounded-lg"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-medium text-white">{invoice.number}</h3>
                        <Badge className={getInvoiceStatusColor(invoice.status)}>{invoice.status}</Badge>
                      </div>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {new Date(invoice.date).toLocaleDateString()}
                        </div>
                        <div className="flex items-center">
                          <FileText className="h-4 w-4 mr-1" />
                          {invoice.description}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-xl font-bold text-white">${invoice.amount.toLocaleString()}</div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" className="h-8 w-8 p-0 border-gray-700">
                          <Edit className="h-4 w-4 text-gray-400" />
                        </Button>
                        <Button variant="outline" size="sm" className="h-8 w-8 p-0 border-gray-700">
                          <Trash2 className="h-4 w-4 text-gray-400" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="client" className="space-y-6">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Client Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-8">
                <div className="flex-1">
                  <div className="mb-6">
                    <h3 className="text-lg font-medium text-white mb-4">Contact Details</h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <Briefcase className="h-5 w-5 text-gray-400" />
                        <div>
                          <div className="text-white font-medium">{project.client}</div>
                          <div className="text-sm text-gray-400">Company Name</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Mail className="h-5 w-5 text-gray-400" />
                        <div>
                          <div className="text-white font-medium">{project.clientEmail}</div>
                          <div className="text-sm text-gray-400">Email Address</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Phone className="h-5 w-5 text-gray-400" />
                        <div>
                          <div className="text-white font-medium">{project.clientPhone}</div>
                          <div className="text-sm text-gray-400">Phone Number</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-white mb-4">Project Summary</h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <Calendar className="h-5 w-5 text-gray-400" />
                        <div>
                          <div className="text-white font-medium">
                            {new Date(project.startDate).toLocaleDateString()} -{" "}
                            {new Date(project.endDate).toLocaleDateString()}
                          </div>
                          <div className="text-sm text-gray-400">Project Timeline</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <DollarSign className="h-5 w-5 text-gray-400" />
                        <div>
                          <div className="text-white font-medium">${project.budget.toLocaleString()}</div>
                          <div className="text-sm text-gray-400">Total Budget</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Clock className="h-5 w-5 text-gray-400" />
                        <div>
                          <div className="text-white font-medium">
                            {project.completedHours} / {project.totalHours} hours
                          </div>
                          <div className="text-sm text-gray-400">Hours Used</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-white mb-4">Client Projects</h3>
                  <div className="space-y-4">
                    <div className="bg-gray-800 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-white">Website Redesign</h4>
                        <Badge className="bg-blue-900/30 text-blue-400 border-blue-500/30">In Progress</Badge>
                      </div>
                      <div className="text-sm text-gray-400 mb-3">
                        Complete redesign of the corporate website with new branding
                      </div>
                      <div className="flex justify-between text-sm">
                        <div className="text-gray-400">Completion</div>
                        <div className="text-white">50%</div>
                      </div>
                      <Progress value={50} className="h-1 mt-1" />
                    </div>
                    <div className="bg-gray-800 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-white">Marketing Campaign</h4>
                        <Badge className="bg-amber-900/30 text-amber-400 border-amber-500/30">Planning</Badge>
                      </div>
                      <div className="text-sm text-gray-400 mb-3">Q4 digital marketing campaign for product launch</div>
                      <div className="flex justify-between text-sm">
                        <div className="text-gray-400">Completion</div>
                        <div className="text-white">15%</div>
                      </div>
                      <Progress value={15} className="h-1 mt-1" />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
