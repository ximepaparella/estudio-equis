"use client"

import { useState } from "react"
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd"
import { Search, Filter, Plus, MoreHorizontal, Calendar, Paperclip, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

// Mock data
const initialTasks = [
  {
    id: "task-1",
    title: "Redesign homepage",
    description: "Update the homepage with new branding and improve user experience",
    status: "backlog",
    priority: "high",
    assignee: {
      id: "user-1",
      name: "John Doe",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    dueDate: "2023-11-15",
    client: "Acme Inc",
    project: "Website Redesign",
    tags: ["design", "frontend"],
    attachments: 2,
    comments: 3,
    hours: 16,
    completedHours: 0,
  },
  {
    id: "task-2",
    title: "Implement authentication",
    description: "Set up user authentication and authorization system",
    status: "in-progress",
    priority: "high",
    assignee: {
      id: "user-2",
      name: "Jane Smith",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    dueDate: "2023-11-10",
    client: "TechCorp",
    project: "Mobile App",
    tags: ["backend", "security"],
    attachments: 1,
    comments: 5,
    hours: 24,
    completedHours: 10,
  },
  {
    id: "task-3",
    title: "Create API documentation",
    description: "Document all API endpoints and parameters",
    status: "in-progress",
    priority: "medium",
    assignee: {
      id: "user-1",
      name: "John Doe",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    dueDate: "2023-11-20",
    client: "TechCorp",
    project: "Mobile App",
    tags: ["documentation", "backend"],
    attachments: 0,
    comments: 2,
    hours: 8,
    completedHours: 4,
  },
  {
    id: "task-4",
    title: "Design logo variations",
    description: "Create multiple logo variations for client review",
    status: "done",
    priority: "medium",
    assignee: {
      id: "user-3",
      name: "Emily Johnson",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    dueDate: "2023-11-05",
    client: "Acme Inc",
    project: "Brand Refresh",
    tags: ["design", "branding"],
    attachments: 5,
    comments: 8,
    hours: 12,
    completedHours: 12,
  },
  {
    id: "task-5",
    title: "Optimize database queries",
    description: "Improve performance of slow database queries",
    status: "backlog",
    priority: "low",
    assignee: {
      id: "user-4",
      name: "Michael Brown",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    dueDate: "2023-11-25",
    client: "TechCorp",
    project: "Mobile App",
    tags: ["backend", "performance"],
    attachments: 0,
    comments: 1,
    hours: 16,
    completedHours: 0,
  },
  {
    id: "task-6",
    title: "Create social media graphics",
    description: "Design graphics for upcoming marketing campaign",
    status: "done",
    priority: "high",
    assignee: {
      id: "user-3",
      name: "Emily Johnson",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    dueDate: "2023-11-08",
    client: "Acme Inc",
    project: "Marketing Campaign",
    tags: ["design", "marketing"],
    attachments: 8,
    comments: 4,
    hours: 10,
    completedHours: 10,
  },
]

const clients = ["Acme Inc", "TechCorp", "GlobalMedia", "StartupX"]
const projects = ["Website Redesign", "Mobile App", "Brand Refresh", "Marketing Campaign"]
const tags = ["design", "frontend", "backend", "documentation", "security", "performance", "marketing", "branding"]
const users = [
  { id: "user-1", name: "John Doe", avatar: "/placeholder.svg?height=32&width=32" },
  { id: "user-2", name: "Jane Smith", avatar: "/placeholder.svg?height=32&width=32" },
  { id: "user-3", name: "Emily Johnson", avatar: "/placeholder.svg?height=32&width=32" },
  { id: "user-4", name: "Michael Brown", avatar: "/placeholder.svg?height=32&width=32" },
]

export default function TasksPage() {
  const [tasks, setTasks] = useState(initialTasks)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterPriority, setFilterPriority] = useState<string | null>(null)
  const [filterAssignee, setFilterAssignee] = useState<string | null>(null)
  const [filterClient, setFilterClient] = useState<string | null>(null)
  const [filterTag, setFilterTag] = useState<string | null>(null)
  const [isNewTaskDialogOpen, setIsNewTaskDialogOpen] = useState(false)
  const [editingTask, setEditingTask] = useState<any | null>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)

  const filteredTasks = tasks.filter((task) => {
    // Search filter
    const matchesSearch =
      searchQuery === "" ||
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase())

    // Priority filter
    const matchesPriority = !filterPriority || task.priority === filterPriority

    // Assignee filter
    const matchesAssignee = !filterAssignee || task.assignee.id === filterAssignee

    // Client filter
    const matchesClient = !filterClient || task.client === filterClient

    // Tag filter
    const matchesTag = !filterTag || task.tags.includes(filterTag)

    return matchesSearch && matchesPriority && matchesAssignee && matchesClient && matchesTag
  })

  const getColumnTasks = (status: string) => {
    return filteredTasks.filter((task) => task.status === status)
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-900/30 text-red-400 border-red-500/30"
      case "medium":
        return "bg-amber-900/30 text-amber-400 border-amber-500/30"
      case "low":
        return "bg-green-900/30 text-green-400 border-green-500/30"
      default:
        return "bg-gray-900/30 text-gray-400 border-gray-500/30"
    }
  }

  const handleDragEnd = (result: any) => {
    const { destination, source, draggableId } = result

    // If there's no destination or the item is dropped back to its original position
    if (!destination || (destination.droppableId === source.droppableId && destination.index === source.index)) {
      return
    }

    // Find the task that was dragged
    const task = tasks.find((t) => t.id === draggableId)
    if (!task) return

    // Create a new array without the dragged task
    const newTasks = tasks.filter((t) => t.id !== draggableId)

    // Create a copy of the task with the updated status
    const updatedTask = { ...task, status: destination.droppableId }

    // Insert the updated task at the new position
    newTasks.splice(destination.index, 0, updatedTask)

    // Update the state
    setTasks(newTasks)
  }

  const handleCreateTask = (formData: FormData) => {
    const title = formData.get("title") as string
    const description = formData.get("description") as string
    const priority = formData.get("priority") as string
    const assigneeId = formData.get("assignee") as string
    const dueDate = formData.get("due-date") as string
    const client = formData.get("client") as string
    const project = formData.get("project") as string
    const tagsString = formData.get("tags") as string
    const hours = Number(formData.get("hours"))
    const completedHours = Number(formData.get("completed-hours"))

    const assignee = users.find((user) => user.id === assigneeId) || users[0]
    const taskTags = tagsString.split(",").map((tag) => tag.trim())

    const newTask = {
      id: `task-${Date.now()}`,
      title,
      description,
      status: "backlog",
      priority,
      assignee,
      dueDate,
      client,
      project,
      tags: taskTags,
      attachments: 0,
      comments: 0,
      hours,
      completedHours,
    }

    setTasks([...tasks, newTask])
    setIsNewTaskDialogOpen(false)
  }

  const handleEditTask = (formData: FormData) => {
    if (!editingTask) return

    const title = formData.get("title") as string
    const description = formData.get("description") as string
    const priority = formData.get("priority") as string
    const assigneeId = formData.get("assignee") as string
    const dueDate = formData.get("due-date") as string
    const client = formData.get("client") as string
    const project = formData.get("project") as string
    const tagsString = formData.get("tags") as string
    const hours = Number(formData.get("hours"))
    const completedHours = Number(formData.get("completed-hours"))

    const assignee = users.find((user) => user.id === assigneeId) || editingTask.assignee
    const taskTags = tagsString.split(",").map((tag: string) => tag.trim())

    const updatedTask = {
      ...editingTask,
      title,
      description,
      priority,
      assignee,
      dueDate,
      client,
      project,
      tags: taskTags,
      hours,
      completedHours,
    }

    setTasks(tasks.map((task) => (task.id === editingTask.id ? updatedTask : task)))
    setIsEditDialogOpen(false)
    setEditingTask(null)
  }

  const openEditDialog = (task: any) => {
    setEditingTask(task)
    setIsEditDialogOpen(true)
  }

  const deleteTask = (taskId: string) => {
    setTasks(tasks.filter((task) => task.id !== taskId))
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-2xl md:text-3xl font-bold text-white">Task Board</h1>
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-grow max-w-xs">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search tasks..."
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
                  <label className="block text-sm font-medium text-gray-300 mb-1">Priority</label>
                  <Select value={filterPriority || ""} onValueChange={(value) => setFilterPriority(value || null)}>
                    <SelectTrigger className="bg-gray-900 border-gray-700 text-white">
                      <SelectValue placeholder="All priorities" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 border-gray-700 text-white">
                      <SelectItem value="all">All priorities</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Assignee</label>
                  <Select value={filterAssignee || ""} onValueChange={(value) => setFilterAssignee(value || null)}>
                    <SelectTrigger className="bg-gray-900 border-gray-700 text-white">
                      <SelectValue placeholder="All assignees" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 border-gray-700 text-white">
                      <SelectItem value="all">All assignees</SelectItem>
                      {users.map((user) => (
                        <SelectItem key={user.id} value={user.id}>
                          {user.name}
                        </SelectItem>
                      ))}
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
                      <SelectItem value="all">All clients</SelectItem>
                      {clients.map((client) => (
                        <SelectItem key={client} value={client}>
                          {client}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Tag</label>
                  <Select value={filterTag || ""} onValueChange={(value) => setFilterTag(value || null)}>
                    <SelectTrigger className="bg-gray-900 border-gray-700 text-white">
                      <SelectValue placeholder="All tags" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 border-gray-700 text-white">
                      <SelectItem value="all">All tags</SelectItem>
                      {tags.map((tag) => (
                        <SelectItem key={tag} value={tag}>
                          {tag}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setFilterPriority(null)
                    setFilterAssignee(null)
                    setFilterClient(null)
                    setFilterTag(null)
                  }}
                  className="w-full border-gray-700 text-gray-400 hover:text-white"
                >
                  Clear Filters
                </Button>
              </div>
            </PopoverContent>
          </Popover>

          <Dialog open={isNewTaskDialogOpen} onOpenChange={setIsNewTaskDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90 text-white">
                <Plus className="mr-2 h-4 w-4" />
                Add Task
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-gray-900 border-gray-800 text-white max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Task</DialogTitle>
                <DialogDescription className="text-gray-400">
                  Add a new task to your board. Fill in the details below.
                </DialogDescription>
              </DialogHeader>
              <form action={handleCreateTask} className="space-y-4 py-4">
                <div>
                  <Label htmlFor="title" className="text-gray-300">
                    Task Title*
                  </Label>
                  <Input
                    id="title"
                    name="title"
                    placeholder="Enter task title"
                    className="bg-gray-800 border-gray-700 text-white mt-1"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="description" className="text-gray-300">
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Enter task description"
                    className="bg-gray-800 border-gray-700 text-white mt-1"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="priority" className="text-gray-300">
                      Priority*
                    </Label>
                    <Select name="priority" defaultValue="medium">
                      <SelectTrigger className="bg-gray-800 border-gray-700 text-white mt-1">
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-900 border-gray-700 text-white">
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="assignee" className="text-gray-300">
                      Assignee*
                    </Label>
                    <Select name="assignee">
                      <SelectTrigger className="bg-gray-800 border-gray-700 text-white mt-1">
                        <SelectValue placeholder="Select assignee" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-900 border-gray-700 text-white">
                        {users.map((user) => (
                          <SelectItem key={user.id} value={user.id}>
                            {user.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="due-date" className="text-gray-300">
                      Due Date*
                    </Label>
                    <Input
                      id="due-date"
                      name="due-date"
                      type="date"
                      className="bg-gray-800 border-gray-700 text-white mt-1"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="client" className="text-gray-300">
                      Client*
                    </Label>
                    <Select name="client">
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
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="project" className="text-gray-300">
                      Project*
                    </Label>
                    <Select name="project">
                      <SelectTrigger className="bg-gray-800 border-gray-700 text-white mt-1">
                        <SelectValue placeholder="Select project" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-900 border-gray-700 text-white">
                        {projects.map((project) => (
                          <SelectItem key={project} value={project}>
                            {project}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="tags" className="text-gray-300">
                      Tags (comma separated)
                    </Label>
                    <Input
                      id="tags"
                      name="tags"
                      placeholder="design, frontend, etc."
                      className="bg-gray-800 border-gray-700 text-white mt-1"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="hours" className="text-gray-300">
                      Estimated Hours*
                    </Label>
                    <Input
                      id="hours"
                      name="hours"
                      type="number"
                      placeholder="Enter hours"
                      className="bg-gray-800 border-gray-700 text-white mt-1"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="completed-hours" className="text-gray-300">
                      Completed Hours
                    </Label>
                    <Input
                      id="completed-hours"
                      name="completed-hours"
                      type="number"
                      placeholder="Enter hours"
                      className="bg-gray-800 border-gray-700 text-white mt-1"
                      defaultValue="0"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsNewTaskDialogOpen(false)}
                    className="border-gray-700 text-gray-400 hover:text-white"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90 text-white"
                  >
                    Create Task
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>

          <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <DialogContent className="bg-gray-900 border-gray-800 text-white max-w-2xl">
              <DialogHeader>
                <DialogTitle>Edit Task</DialogTitle>
                <DialogDescription className="text-gray-400">Update the task details below.</DialogDescription>
              </DialogHeader>
              {editingTask && (
                <form action={handleEditTask} className="space-y-4 py-4">
                  <div>
                    <Label htmlFor="edit-title" className="text-gray-300">
                      Task Title*
                    </Label>
                    <Input
                      id="edit-title"
                      name="title"
                      placeholder="Enter task title"
                      className="bg-gray-800 border-gray-700 text-white mt-1"
                      defaultValue={editingTask.title}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-description" className="text-gray-300">
                      Description
                    </Label>
                    <Textarea
                      id="edit-description"
                      name="description"
                      placeholder="Enter task description"
                      className="bg-gray-800 border-gray-700 text-white mt-1"
                      defaultValue={editingTask.description}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="edit-priority" className="text-gray-300">
                        Priority*
                      </Label>
                      <Select name="priority" defaultValue={editingTask.priority}>
                        <SelectTrigger className="bg-gray-800 border-gray-700 text-white mt-1">
                          <SelectValue placeholder="Select priority" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-900 border-gray-700 text-white">
                          <SelectItem value="high">High</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="low">Low</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="edit-assignee" className="text-gray-300">
                        Assignee*
                      </Label>
                      <Select name="assignee" defaultValue={editingTask.assignee.id}>
                        <SelectTrigger className="bg-gray-800 border-gray-700 text-white mt-1">
                          <SelectValue placeholder="Select assignee" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-900 border-gray-700 text-white">
                          {users.map((user) => (
                            <SelectItem key={user.id} value={user.id}>
                              {user.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="edit-due-date" className="text-gray-300">
                        Due Date*
                      </Label>
                      <Input
                        id="edit-due-date"
                        name="due-date"
                        type="date"
                        className="bg-gray-800 border-gray-700 text-white mt-1"
                        defaultValue={editingTask.dueDate}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="edit-client" className="text-gray-300">
                        Client*
                      </Label>
                      <Select name="client" defaultValue={editingTask.client}>
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
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="edit-project" className="text-gray-300">
                        Project*
                      </Label>
                      <Select name="project" defaultValue={editingTask.project}>
                        <SelectTrigger className="bg-gray-800 border-gray-700 text-white mt-1">
                          <SelectValue placeholder="Select project" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-900 border-gray-700 text-white">
                          {projects.map((project) => (
                            <SelectItem key={project} value={project}>
                              {project}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="edit-tags" className="text-gray-300">
                        Tags (comma separated)
                      </Label>
                      <Input
                        id="edit-tags"
                        name="tags"
                        placeholder="design, frontend, etc."
                        className="bg-gray-800 border-gray-700 text-white mt-1"
                        defaultValue={editingTask.tags.join(", ")}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="edit-hours" className="text-gray-300">
                        Estimated Hours*
                      </Label>
                      <Input
                        id="edit-hours"
                        name="hours"
                        type="number"
                        placeholder="Enter hours"
                        className="bg-gray-800 border-gray-700 text-white mt-1"
                        defaultValue={editingTask.hours}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="edit-completed-hours" className="text-gray-300">
                        Completed Hours
                      </Label>
                      <Input
                        id="edit-completed-hours"
                        name="completed-hours"
                        type="number"
                        placeholder="Enter hours"
                        className="bg-gray-800 border-gray-700 text-white mt-1"
                        defaultValue={editingTask.completedHours}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setIsEditDialogOpen(false)
                        setEditingTask(null)
                      }}
                      className="border-gray-700 text-gray-400 hover:text-white"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      className="bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90 text-white"
                    >
                      Update Task
                    </Button>
                  </DialogFooter>
                </form>
              )}
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white">Backlog</h2>
              <Badge className="bg-gray-700 text-white">{getColumnTasks("backlog").length}</Badge>
            </div>
            <Droppable droppableId="backlog">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="bg-gray-900/50 rounded-lg min-h-[200px] p-3 space-y-3"
                >
                  {getColumnTasks("backlog").map((task, index) => (
                    <Draggable key={task.id} draggableId={task.id} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="bg-gray-800 rounded-lg p-4 shadow-sm"
                          onClick={() => openEditDialog(task)}
                        >
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-medium text-white">{task.title}</h3>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-8 w-8 p-0 text-gray-400 hover:text-white"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent className="bg-gray-900 border-gray-700 text-white">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuSeparator className="bg-gray-700" />
                                <DropdownMenuItem
                                  className="hover:bg-gray-800 cursor-pointer"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    openEditDialog(task)
                                  }}
                                >
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  className="hover:bg-gray-800 cursor-pointer text-red-400"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    deleteTask(task.id)
                                  }}
                                >
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                          <p className="text-gray-400 text-sm mb-3 line-clamp-2">{task.description}</p>
                          <div className="flex flex-wrap gap-2 mb-3">
                            <Badge className={getPriorityColor(task.priority)}>
                              {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                            </Badge>
                            {task.tags.slice(0, 2).map((tag) => (
                              <Badge key={tag} className="bg-gray-700 text-white">
                                {tag}
                              </Badge>
                            ))}
                            {task.tags.length > 2 && (
                              <Badge className="bg-gray-700 text-white">+{task.tags.length - 2}</Badge>
                            )}
                          </div>
                          <div className="flex items-center justify-between text-sm text-gray-400">
                            <div className="flex items-center">
                              <Avatar className="h-6 w-6 mr-2">
                                <AvatarImage
                                  src={task.assignee.avatar || "/placeholder.svg"}
                                  alt={task.assignee.name}
                                />
                                <AvatarFallback className="bg-gray-700 text-white text-xs">
                                  {task.assignee.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <span className="truncate max-w-[100px]">{task.assignee.name}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="flex items-center">
                                <Calendar className="h-3 w-3 mr-1" />
                                <span>{new Date(task.dueDate).toLocaleDateString()}</span>
                              </div>
                            </div>
                          </div>
                          <div className="mt-3 pt-3 border-t border-gray-700">
                            <div className="flex justify-between items-center mb-1 text-sm">
                              <div className="text-gray-400">
                                Hours: {task.completedHours}/{task.hours}
                              </div>
                              <div className="text-white font-medium">
                                {Math.round((task.completedHours / task.hours) * 100)}%
                              </div>
                            </div>
                            <Progress value={(task.completedHours / task.hours) * 100} className="h-1" />
                          </div>
                          <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-700 text-gray-400 text-sm">
                            <div className="flex items-center gap-3">
                              <div className="flex items-center">
                                <Paperclip className="h-3 w-3 mr-1" />
                                <span>{task.attachments}</span>
                              </div>
                              <div className="flex items-center">
                                <MessageSquare className="h-3 w-3 mr-1" />
                                <span>{task.comments}</span>
                              </div>
                            </div>
                            <div className="text-xs">{task.client}</div>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white">In Progress</h2>
              <Badge className="bg-gray-700 text-white">{getColumnTasks("in-progress").length}</Badge>
            </div>
            <Droppable droppableId="in-progress">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="bg-gray-900/50 rounded-lg min-h-[200px] p-3 space-y-3"
                >
                  {getColumnTasks("in-progress").map((task, index) => (
                    <Draggable key={task.id} draggableId={task.id} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="bg-gray-800 rounded-lg p-4 shadow-sm"
                          onClick={() => openEditDialog(task)}
                        >
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-medium text-white">{task.title}</h3>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-8 w-8 p-0 text-gray-400 hover:text-white"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent className="bg-gray-900 border-gray-700 text-white">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuSeparator className="bg-gray-700" />
                                <DropdownMenuItem
                                  className="hover:bg-gray-800 cursor-pointer"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    openEditDialog(task)
                                  }}
                                >
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  className="hover:bg-gray-800 cursor-pointer text-red-400"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    deleteTask(task.id)
                                  }}
                                >
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                          <p className="text-gray-400 text-sm mb-3 line-clamp-2">{task.description}</p>
                          <div className="flex flex-wrap gap-2 mb-3">
                            <Badge className={getPriorityColor(task.priority)}>
                              {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                            </Badge>
                            {task.tags.slice(0, 2).map((tag) => (
                              <Badge key={tag} className="bg-gray-700 text-white">
                                {tag}
                              </Badge>
                            ))}
                            {task.tags.length > 2 && (
                              <Badge className="bg-gray-700 text-white">+{task.tags.length - 2}</Badge>
                            )}
                          </div>
                          <div className="flex items-center justify-between text-sm text-gray-400">
                            <div className="flex items-center">
                              <Avatar className="h-6 w-6 mr-2">
                                <AvatarImage
                                  src={task.assignee.avatar || "/placeholder.svg"}
                                  alt={task.assignee.name}
                                />
                                <AvatarFallback className="bg-gray-700 text-white text-xs">
                                  {task.assignee.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <span className="truncate max-w-[100px]">{task.assignee.name}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="flex items-center">
                                <Calendar className="h-3 w-3 mr-1" />
                                <span>{new Date(task.dueDate).toLocaleDateString()}</span>
                              </div>
                            </div>
                          </div>
                          <div className="mt-3 pt-3 border-t border-gray-700">
                            <div className="flex justify-between items-center mb-1 text-sm">
                              <div className="text-gray-400">
                                Hours: {task.completedHours}/{task.hours}
                              </div>
                              <div className="text-white font-medium">
                                {Math.round((task.completedHours / task.hours) * 100)}%
                              </div>
                            </div>
                            <Progress value={(task.completedHours / task.hours) * 100} className="h-1" />
                          </div>
                          <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-700 text-gray-400 text-sm">
                            <div className="flex items-center gap-3">
                              <div className="flex items-center">
                                <Paperclip className="h-3 w-3 mr-1" />
                                <span>{task.attachments}</span>
                              </div>
                              <div className="flex items-center">
                                <MessageSquare className="h-3 w-3 mr-1" />
                                <span>{task.comments}</span>
                              </div>
                            </div>
                            <div className="text-xs">{task.client}</div>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white">Done</h2>
              <Badge className="bg-gray-700 text-white">{getColumnTasks("done").length}</Badge>
            </div>
            <Droppable droppableId="done">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="bg-gray-900/50 rounded-lg min-h-[200px] p-3 space-y-3"
                >
                  {getColumnTasks("done").map((task, index) => (
                    <Draggable key={task.id} draggableId={task.id} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="bg-gray-800 rounded-lg p-4 shadow-sm"
                          onClick={() => openEditDialog(task)}
                        >
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-medium text-white">{task.title}</h3>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-8 w-8 p-0 text-gray-400 hover:text-white"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent className="bg-gray-900 border-gray-700 text-white">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuSeparator className="bg-gray-700" />
                                <DropdownMenuItem
                                  className="hover:bg-gray-800 cursor-pointer"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    openEditDialog(task)
                                  }}
                                >
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  className="hover:bg-gray-800 cursor-pointer text-red-400"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    deleteTask(task.id)
                                  }}
                                >
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                          <p className="text-gray-400 text-sm mb-3 line-clamp-2">{task.description}</p>
                          <div className="flex flex-wrap gap-2 mb-3">
                            <Badge className={getPriorityColor(task.priority)}>
                              {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                            </Badge>
                            {task.tags.slice(0, 2).map((tag) => (
                              <Badge key={tag} className="bg-gray-700 text-white">
                                {tag}
                              </Badge>
                            ))}
                            {task.tags.length > 2 && (
                              <Badge className="bg-gray-700 text-white">+{task.tags.length - 2}</Badge>
                            )}
                          </div>
                          <div className="flex items-center justify-between text-sm text-gray-400">
                            <div className="flex items-center">
                              <Avatar className="h-6 w-6 mr-2">
                                <AvatarImage
                                  src={task.assignee.avatar || "/placeholder.svg"}
                                  alt={task.assignee.name}
                                />
                                <AvatarFallback className="bg-gray-700 text-white text-xs">
                                  {task.assignee.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <span className="truncate max-w-[100px]">{task.assignee.name}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="flex items-center">
                                <Calendar className="h-3 w-3 mr-1" />
                                <span>{new Date(task.dueDate).toLocaleDateString()}</span>
                              </div>
                            </div>
                          </div>
                          <div className="mt-3 pt-3 border-t border-gray-700">
                            <div className="flex justify-between items-center mb-1 text-sm">
                              <div className="text-gray-400">
                                Hours: {task.completedHours}/{task.hours}
                              </div>
                              <div className="text-white font-medium">
                                {Math.round((task.completedHours / task.hours) * 100)}%
                              </div>
                            </div>
                            <Progress value={(task.completedHours / task.hours) * 100} className="h-1" />
                          </div>
                          <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-700 text-gray-400 text-sm">
                            <div className="flex items-center gap-3">
                              <div className="flex items-center">
                                <Paperclip className="h-3 w-3 mr-1" />
                                <span>{task.attachments}</span>
                              </div>
                              <div className="flex items-center">
                                <MessageSquare className="h-3 w-3 mr-1" />
                                <span>{task.comments}</span>
                              </div>
                            </div>
                            <div className="text-xs">{task.client}</div>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        </div>
      </DragDropContext>
    </div>
  )
}
