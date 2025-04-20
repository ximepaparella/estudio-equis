"use client"

import { useState } from "react"
import { DragDropContext, Droppable, Draggable, type DropResult } from "react-beautiful-dnd"
import { Plus, Clock, Search, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface Task {
  id: string
  title: string
  description?: string
  priority: "low" | "medium" | "high"
  dueDate?: string
  assignee?: string
  tags?: string[]
  status: "backlog" | "todo" | "in-progress" | "testing" | "done"
}

export default function TaskBoardPage() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      title: "Update homepage design",
      description: "Implement new hero section and improve responsive layout",
      priority: "high",
      dueDate: "2023-10-15",
      assignee: "John Doe",
      tags: ["design", "frontend"],
      status: "todo",
    },
    {
      id: "2",
      title: "Fix navigation bug",
      description: "Mobile menu doesn't close when clicking outside",
      priority: "medium",
      dueDate: "2023-10-10",
      assignee: "Jane Smith",
      tags: ["bug", "frontend"],
      status: "in-progress",
    },
    {
      id: "3",
      title: "Implement authentication",
      description: "Add login, registration and password recovery",
      priority: "high",
      dueDate: "2023-10-20",
      assignee: "Mike Johnson",
      tags: ["backend", "security"],
      status: "backlog",
    },
    {
      id: "4",
      title: "Create API documentation",
      description: "Document all endpoints with examples",
      priority: "low",
      dueDate: "2023-10-30",
      assignee: "Sarah Williams",
      tags: ["documentation"],
      status: "todo",
    },
    {
      id: "5",
      title: "Optimize image loading",
      description: "Implement lazy loading and WebP format",
      priority: "medium",
      dueDate: "2023-10-12",
      assignee: "John Doe",
      tags: ["performance", "frontend"],
      status: "testing",
    },
    {
      id: "6",
      title: "Database optimization",
      description: "Improve query performance for user dashboard",
      priority: "high",
      dueDate: "2023-10-08",
      assignee: "Mike Johnson",
      tags: ["database", "performance"],
      status: "in-progress",
    },
    {
      id: "7",
      title: "Deploy to production",
      description: "Final checks and deployment",
      priority: "high",
      dueDate: "2023-10-25",
      assignee: "Jane Smith",
      tags: ["devops"],
      status: "backlog",
    },
    {
      id: "8",
      title: "Write unit tests",
      description: "Increase test coverage for core components",
      priority: "medium",
      dueDate: "2023-10-18",
      assignee: "Sarah Williams",
      tags: ["testing"],
      status: "todo",
    },
    {
      id: "9",
      title: "Update dependencies",
      description: "Update all npm packages to latest versions",
      priority: "low",
      dueDate: "2023-10-22",
      assignee: "John Doe",
      tags: ["maintenance"],
      status: "done",
    },
  ])

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [newTask, setNewTask] = useState<Partial<Task>>({
    title: "",
    description: "",
    priority: "medium",
    status: "todo",
  })
  const [searchQuery, setSearchQuery] = useState("")
  const [filterPriority, setFilterPriority] = useState<string | null>(null)
  const [filterAssignee, setFilterAssignee] = useState<string | null>(null)
  const [filterTag, setFilterTag] = useState<string | null>(null)

  const handleDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result

    // If there's no destination or the item is dropped in the same place
    if (!destination || (destination.droppableId === source.droppableId && destination.index === source.index)) {
      return
    }

    // Find the task that was dragged
    const task = tasks.find((t) => t.id === draggableId)
    if (!task) return

    // Create a new array without the dragged task
    const newTasks = tasks.filter((t) => t.id !== draggableId)

    // Create a copy of the task with the new status
    const updatedTask = { ...task, status: destination.droppableId as Task["status"] }

    // Insert the task at the new position
    newTasks.splice(destination.index, 0, updatedTask)

    setTasks(newTasks)
  }

  const handleCreateTask = () => {
    if (!newTask.title) return

    const task: Task = {
      id: Date.now().toString(),
      title: newTask.title,
      description: newTask.description,
      priority: newTask.priority as "low" | "medium" | "high",
      dueDate: newTask.dueDate,
      assignee: newTask.assignee,
      tags: newTask.tags,
      status: newTask.status as "backlog" | "todo" | "in-progress" | "testing" | "done",
    }

    setTasks([...tasks, task])
    setIsDialogOpen(false)
    setNewTask({
      title: "",
      description: "",
      priority: "medium",
      status: "todo",
    })
  }

  const filteredTasks = tasks.filter((task) => {
    // Search filter
    const matchesSearch =
      searchQuery === "" ||
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (task.description && task.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (task.tags && task.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())))

    // Priority filter
    const matchesPriority = !filterPriority || task.priority === filterPriority

    // Assignee filter
    const matchesAssignee = !filterAssignee || task.assignee === filterAssignee

    // Tag filter
    const matchesTag = !filterTag || (task.tags && task.tags.includes(filterTag))

    return matchesSearch && matchesPriority && matchesAssignee && matchesTag
  })

  const getColumnTasks = (status: Task["status"]) => {
    return filteredTasks.filter((task) => task.status === status)
  }

  const getPriorityStyles = (priority: string) => {
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

  // Get unique assignees for filter
  const assignees = Array.from(new Set(tasks.map((task) => task.assignee).filter(Boolean))) as string[]

  // Get unique tags for filter
  const allTags = tasks.reduce((acc: string[], task) => {
    if (task.tags) {
      return [...acc, ...task.tags]
    }
    return acc
  }, [])
  const uniqueTags = Array.from(new Set(allTags))

  return (
    <div className="space-y-6">
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
                      {assignees.map((assignee) => (
                        <SelectItem key={assignee} value={assignee}>
                          {assignee}
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
                      {uniqueTags.map((tag) => (
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
                    setFilterTag(null)
                  }}
                  className="w-full border-gray-700 text-gray-400 hover:text-white"
                >
                  Clear Filters
                </Button>
              </div>
            </PopoverContent>
          </Popover>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90 text-white">
                <Plus className="mr-2 h-4 w-4" />
                Add Task
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-gray-900 border-gray-800 text-white">
              <DialogHeader>
                <DialogTitle>Create New Task</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-1">
                    Task Title*
                  </label>
                  <Input
                    id="title"
                    value={newTask.title}
                    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                    placeholder="Enter task title"
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-1">
                    Description
                  </label>
                  <Textarea
                    id="description"
                    value={newTask.description}
                    onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                    placeholder="Enter task description"
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="priority" className="block text-sm font-medium text-gray-300 mb-1">
                      Priority*
                    </label>
                    <Select
                      value={newTask.priority}
                      onValueChange={(value) => setNewTask({ ...newTask, priority: value as any })}
                    >
                      <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-700 text-white">
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label htmlFor="status" className="block text-sm font-medium text-gray-300 mb-1">
                      Status*
                    </label>
                    <Select
                      value={newTask.status}
                      onValueChange={(value) => setNewTask({ ...newTask, status: value as any })}
                    >
                      <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-700 text-white">
                        <SelectItem value="backlog">Backlog</SelectItem>
                        <SelectItem value="todo">To Do</SelectItem>
                        <SelectItem value="in-progress">In Progress</SelectItem>
                        <SelectItem value="testing">Testing</SelectItem>
                        <SelectItem value="done">Done</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="dueDate" className="block text-sm font-medium text-gray-300 mb-1">
                      Due Date
                    </label>
                    <Input
                      id="dueDate"
                      type="date"
                      value={newTask.dueDate}
                      onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </div>
                  <div>
                    <label htmlFor="assignee" className="block text-sm font-medium text-gray-300 mb-1">
                      Assignee
                    </label>
                    <Input
                      id="assignee"
                      value={newTask.assignee}
                      onChange={(e) => setNewTask({ ...newTask, assignee: e.target.value })}
                      placeholder="Enter assignee name"
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="tags" className="block text-sm font-medium text-gray-300 mb-1">
                    Tags (comma separated)
                  </label>
                  <Input
                    id="tags"
                    value={newTask.tags?.join(", ") || ""}
                    onChange={(e) =>
                      setNewTask({
                        ...newTask,
                        tags: e.target.value
                          .split(",")
                          .map((tag) => tag.trim())
                          .filter(Boolean),
                      })
                    }
                    placeholder="e.g. frontend, bug, feature"
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                  className="border-gray-700 text-gray-400 hover:text-white"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleCreateTask}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90 text-white"
                >
                  Create Task
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 overflow-x-auto">
          {/* Backlog Column */}
          <div className="bg-gray-900 rounded-xl border border-gray-800 min-w-[280px]">
            <div className="p-4 border-b border-gray-800 bg-gray-800/50">
              <h2 className="font-bold text-white flex items-center">
                <span className="h-2 w-2 rounded-full bg-gray-400 mr-2"></span>
                Backlog
                <span className="ml-2 text-sm bg-gray-800 px-2 py-0.5 rounded-full">
                  {getColumnTasks("backlog").length}
                </span>
              </h2>
            </div>
            <Droppable droppableId="backlog">
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="p-2 min-h-[200px] max-h-[calc(100vh-250px)] overflow-y-auto"
                >
                  {getColumnTasks("backlog").map((task, index) => (
                    <Draggable key={task.id} draggableId={task.id} index={index}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`bg-gray-800 rounded-lg p-3 mb-2 border-l-4 ${
                            task.priority === "high"
                              ? "border-red-500"
                              : task.priority === "medium"
                                ? "border-amber-500"
                                : "border-green-500"
                          } ${snapshot.isDragging ? "shadow-lg" : ""}`}
                        >
                          <div className="flex justify-between items-start">
                            <h3 className="font-medium text-white">{task.title}</h3>
                            <div className="flex">
                              <span className={`text-xs px-2 py-0.5 rounded-full ${getPriorityStyles(task.priority)}`}>
                                {task.priority}
                              </span>
                            </div>
                          </div>
                          {task.description && (
                            <p className="text-sm text-gray-400 mt-2 line-clamp-2">{task.description}</p>
                          )}
                          <div className="mt-3 flex flex-wrap gap-1">
                            {task.tags?.map((tag) => (
                              <span key={tag} className="text-xs bg-gray-700 text-gray-300 px-2 py-0.5 rounded-full">
                                {tag}
                              </span>
                            ))}
                          </div>
                          <div className="mt-3 flex justify-between items-center text-xs text-gray-400">
                            {task.dueDate && (
                              <div className="flex items-center">
                                <Clock className="h-3 w-3 mr-1" />
                                <span>{new Date(task.dueDate).toLocaleDateString()}</span>
                              </div>
                            )}
                            {task.assignee && <div>{task.assignee}</div>}
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

          {/* To Do Column */}
          <div className="bg-gray-900 rounded-xl border border-gray-800 min-w-[280px]">
            <div className="p-4 border-b border-gray-800 bg-gray-800/50">
              <h2 className="font-bold text-white flex items-center">
                <span className="h-2 w-2 rounded-full bg-blue-400 mr-2"></span>
                To Do
                <span className="ml-2 text-sm bg-gray-800 px-2 py-0.5 rounded-full">
                  {getColumnTasks("todo").length}
                </span>
              </h2>
            </div>
            <Droppable droppableId="todo">
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="p-2 min-h-[200px] max-h-[calc(100vh-250px)] overflow-y-auto"
                >
                  {getColumnTasks("todo").map((task, index) => (
                    <Draggable key={task.id} draggableId={task.id} index={index}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`bg-gray-800 rounded-lg p-3 mb-2 border-l-4 ${
                            task.priority === "high"
                              ? "border-red-500"
                              : task.priority === "medium"
                                ? "border-amber-500"
                                : "border-green-500"
                          } ${snapshot.isDragging ? "shadow-lg" : ""}`}
                        >
                          <div className="flex justify-between items-start">
                            <h3 className="font-medium text-white">{task.title}</h3>
                            <div className="flex">
                              <span className={`text-xs px-2 py-0.5 rounded-full ${getPriorityStyles(task.priority)}`}>
                                {task.priority}
                              </span>
                            </div>
                          </div>
                          {task.description && (
                            <p className="text-sm text-gray-400 mt-2 line-clamp-2">{task.description}</p>
                          )}
                          <div className="mt-3 flex flex-wrap gap-1">
                            {task.tags?.map((tag) => (
                              <span key={tag} className="text-xs bg-gray-700 text-gray-300 px-2 py-0.5 rounded-full">
                                {tag}
                              </span>
                            ))}
                          </div>
                          <div className="mt-3 flex justify-between items-center text-xs text-gray-400">
                            {task.dueDate && (
                              <div className="flex items-center">
                                <Clock className="h-3 w-3 mr-1" />
                                <span>{new Date(task.dueDate).toLocaleDateString()}</span>
                              </div>
                            )}
                            {task.assignee && <div>{task.assignee}</div>}
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

          {/* In Progress Column */}
          <div className="bg-gray-900 rounded-xl border border-gray-800 min-w-[280px]">
            <div className="p-4 border-b border-gray-800 bg-gray-800/50">
              <h2 className="font-bold text-white flex items-center">
                <span className="h-2 w-2 rounded-full bg-purple-400 mr-2"></span>
                In Progress
                <span className="ml-2 text-sm bg-gray-800 px-2 py-0.5 rounded-full">
                  {getColumnTasks("in-progress").length}
                </span>
              </h2>
            </div>
            <Droppable droppableId="in-progress">
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="p-2 min-h-[200px] max-h-[calc(100vh-250px)] overflow-y-auto"
                >
                  {getColumnTasks("in-progress").map((task, index) => (
                    <Draggable key={task.id} draggableId={task.id} index={index}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`bg-gray-800 rounded-lg p-3 mb-2 border-l-4 ${
                            task.priority === "high"
                              ? "border-red-500"
                              : task.priority === "medium"
                                ? "border-amber-500"
                                : "border-green-500"
                          } ${snapshot.isDragging ? "shadow-lg" : ""}`}
                        >
                          <div className="flex justify-between items-start">
                            <h3 className="font-medium text-white">{task.title}</h3>
                            <div className="flex">
                              <span className={`text-xs px-2 py-0.5 rounded-full ${getPriorityStyles(task.priority)}`}>
                                {task.priority}
                              </span>
                            </div>
                          </div>
                          {task.description && (
                            <p className="text-sm text-gray-400 mt-2 line-clamp-2">{task.description}</p>
                          )}
                          <div className="mt-3 flex flex-wrap gap-1">
                            {task.tags?.map((tag) => (
                              <span key={tag} className="text-xs bg-gray-700 text-gray-300 px-2 py-0.5 rounded-full">
                                {tag}
                              </span>
                            ))}
                          </div>
                          <div className="mt-3 flex justify-between items-center text-xs text-gray-400">
                            {task.dueDate && (
                              <div className="flex items-center">
                                <Clock className="h-3 w-3 mr-1" />
                                <span>{new Date(task.dueDate).toLocaleDateString()}</span>
                              </div>
                            )}
                            {task.assignee && <div>{task.assignee}</div>}
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

          {/* Testing Column */}
          <div className="bg-gray-900 rounded-xl border border-gray-800 min-w-[280px]">
            <div className="p-4 border-b border-gray-800 bg-gray-800/50">
              <h2 className="font-bold text-white flex items-center">
                <span className="h-2 w-2 rounded-full bg-amber-400 mr-2"></span>
                Testing
                <span className="ml-2 text-sm bg-gray-800 px-2 py-0.5 rounded-full">
                  {getColumnTasks("testing").length}
                </span>
              </h2>
            </div>
            <Droppable droppableId="testing">
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="p-2 min-h-[200px] max-h-[calc(100vh-250px)] overflow-y-auto"
                >
                  {getColumnTasks("testing").map((task, index) => (
                    <Draggable key={task.id} draggableId={task.id} index={index}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`bg-gray-800 rounded-lg p-3 mb-2 border-l-4 ${
                            task.priority === "high"
                              ? "border-red-500"
                              : task.priority === "medium"
                                ? "border-amber-500"
                                : "border-green-500"
                          } ${snapshot.isDragging ? "shadow-lg" : ""}`}
                        >
                          <div className="flex justify-between items-start">
                            <h3 className="font-medium text-white">{task.title}</h3>
                            <div className="flex">
                              <span className={`text-xs px-2 py-0.5 rounded-full ${getPriorityStyles(task.priority)}`}>
                                {task.priority}
                              </span>
                            </div>
                          </div>
                          {task.description && (
                            <p className="text-sm text-gray-400 mt-2 line-clamp-2">{task.description}</p>
                          )}
                          <div className="mt-3 flex flex-wrap gap-1">
                            {task.tags?.map((tag) => (
                              <span key={tag} className="text-xs bg-gray-700 text-gray-300 px-2 py-0.5 rounded-full">
                                {tag}
                              </span>
                            ))}
                          </div>
                          <div className="mt-3 flex justify-between items-center text-xs text-gray-400">
                            {task.dueDate && (
                              <div className="flex items-center">
                                <Clock className="h-3 w-3 mr-1" />
                                <span>{new Date(task.dueDate).toLocaleDateString()}</span>
                              </div>
                            )}
                            {task.assignee && <div>{task.assignee}</div>}
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

          {/* Done Column */}
          <div className="bg-gray-900 rounded-xl border border-gray-800 min-w-[280px]">
            <div className="p-4 border-b border-gray-800 bg-gray-800/50">
              <h2 className="font-bold text-white flex items-center">
                <span className="h-2 w-2 rounded-full bg-green-400 mr-2"></span>
                Done
                <span className="ml-2 text-sm bg-gray-800 px-2 py-0.5 rounded-full">
                  {getColumnTasks("done").length}
                </span>
              </h2>
            </div>
            <Droppable droppableId="done">
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="p-2 min-h-[200px] max-h-[calc(100vh-250px)] overflow-y-auto"
                >
                  {getColumnTasks("done").map((task, index) => (
                    <Draggable key={task.id} draggableId={task.id} index={index}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`bg-gray-800 rounded-lg p-3 mb-2 border-l-4 ${
                            task.priority === "high"
                              ? "border-red-500"
                              : task.priority === "medium"
                                ? "border-amber-500"
                                : "border-green-500"
                          } ${snapshot.isDragging ? "shadow-lg" : ""}`}
                        >
                          <div className="flex justify-between items-start">
                            <h3 className="font-medium text-white">{task.title}</h3>
                            <div className="flex">
                              <span className={`text-xs px-2 py-0.5 rounded-full ${getPriorityStyles(task.priority)}`}>
                                {task.priority}
                              </span>
                            </div>
                          </div>
                          {task.description && (
                            <p className="text-sm text-gray-400 mt-2 line-clamp-2">{task.description}</p>
                          )}
                          <div className="mt-3 flex flex-wrap gap-1">
                            {task.tags?.map((tag) => (
                              <span key={tag} className="text-xs bg-gray-700 text-gray-300 px-2 py-0.5 rounded-full">
                                {tag}
                              </span>
                            ))}
                          </div>
                          <div className="mt-3 flex justify-between items-center text-xs text-gray-400">
                            {task.dueDate && (
                              <div className="flex items-center">
                                <Clock className="h-3 w-3 mr-1" />
                                <span>{new Date(task.dueDate).toLocaleDateString()}</span>
                              </div>
                            )}
                            {task.assignee && <div>{task.assignee}</div>}
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
