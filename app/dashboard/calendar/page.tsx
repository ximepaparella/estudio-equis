"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  isToday,
  parseISO,
} from "date-fns"
import { ChevronLeft, ChevronRight, Plus, Clock, Users, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Event {
  id: string
  title: string
  date: string
  startTime: string
  endTime: string
  description?: string
  location?: string
  attendees?: number
  type: "meeting" | "deadline" | "reminder" | "client"
}

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [events, setEvents] = useState<Event[]>([])
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [newEvent, setNewEvent] = useState<Partial<Event>>({
    title: "",
    date: "",
    startTime: "",
    endTime: "",
    description: "",
    location: "",
    type: "meeting",
  })

  // Mock events data
  useEffect(() => {
    const mockEvents: Event[] = [
      {
        id: "1",
        title: "Team Meeting",
        date: "2023-10-05",
        startTime: "10:00",
        endTime: "11:00",
        description: "Weekly team standup to discuss project progress",
        attendees: 8,
        type: "meeting",
      },
      {
        id: "2",
        title: "Client Presentation",
        date: "2023-10-10",
        startTime: "14:00",
        endTime: "15:30",
        description: "Present the new website design to the client",
        location: "Conference Room A",
        attendees: 5,
        type: "client",
      },
      {
        id: "3",
        title: "Project Deadline",
        date: "2023-10-15",
        startTime: "18:00",
        endTime: "18:00",
        description: "E-commerce website redesign final delivery",
        type: "deadline",
      },
      {
        id: "4",
        title: "Design Review",
        date: "2023-10-07",
        startTime: "13:00",
        endTime: "14:00",
        description: "Review the latest UI designs for the mobile app",
        attendees: 4,
        type: "meeting",
      },
      {
        id: "5",
        title: "Follow up with Marketing",
        date: "2023-10-12",
        startTime: "11:00",
        endTime: "11:30",
        description: "Discuss marketing strategy for the new product launch",
        type: "reminder",
      },
    ]

    setEvents(mockEvents)
  }, [])

  const nextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1))
  }

  const prevMonth = () => {
    setCurrentDate(subMonths(currentDate, 1))
  }

  const monthStart = startOfMonth(currentDate)
  const monthEnd = endOfMonth(currentDate)
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd })

  const getEventsForDay = (day: Date) => {
    return events.filter((event) => {
      const eventDate = parseISO(event.date)
      return isSameDay(eventDate, day)
    })
  }

  const handleDateClick = (day: Date) => {
    setSelectedDate(day)
    setNewEvent((prev) => ({
      ...prev,
      date: format(day, "yyyy-MM-dd"),
    }))
  }

  const handleCreateEvent = () => {
    if (!newEvent.title || !newEvent.date || !newEvent.startTime || !newEvent.endTime) {
      return // Validate required fields
    }

    const event: Event = {
      id: Date.now().toString(),
      title: newEvent.title || "",
      date: newEvent.date || "",
      startTime: newEvent.startTime || "",
      endTime: newEvent.endTime || "",
      description: newEvent.description,
      location: newEvent.location,
      attendees: newEvent.attendees,
      type: newEvent.type as "meeting" | "deadline" | "reminder" | "client",
    }

    setEvents([...events, event])
    setIsDialogOpen(false)
    setNewEvent({
      title: "",
      date: selectedDate ? format(selectedDate, "yyyy-MM-dd") : "",
      startTime: "",
      endTime: "",
      description: "",
      location: "",
      type: "meeting",
    })
  }

  const getEventTypeStyles = (type: string) => {
    switch (type) {
      case "meeting":
        return "bg-blue-900/30 text-blue-400 border-blue-500/30"
      case "deadline":
        return "bg-red-900/30 text-red-400 border-red-500/30"
      case "reminder":
        return "bg-amber-900/30 text-amber-400 border-amber-500/30"
      case "client":
        return "bg-purple-900/30 text-purple-400 border-purple-500/30"
      default:
        return "bg-gray-900/30 text-gray-400 border-gray-500/30"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-2xl md:text-3xl font-bold text-white">Calendar</h1>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={prevMonth}
              className="border-gray-700 text-gray-400 hover:text-white"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <h2 className="text-xl font-bold">{format(currentDate, "MMMM yyyy")}</h2>
            <Button
              variant="outline"
              size="icon"
              onClick={nextMonth}
              className="border-gray-700 text-gray-400 hover:text-white"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90 text-white">
                <Plus className="mr-2 h-4 w-4" />
                Create Event
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-gray-900 border-gray-800 text-white">
              <DialogHeader>
                <DialogTitle>Create New Event</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-1">
                    Event Title*
                  </label>
                  <Input
                    id="title"
                    value={newEvent.title}
                    onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                    placeholder="Enter event title"
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="date" className="block text-sm font-medium text-gray-300 mb-1">
                      Date*
                    </label>
                    <Input
                      id="date"
                      type="date"
                      value={newEvent.date}
                      onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </div>
                  <div>
                    <label htmlFor="type" className="block text-sm font-medium text-gray-300 mb-1">
                      Event Type*
                    </label>
                    <Select
                      value={newEvent.type}
                      onValueChange={(value) => setNewEvent({ ...newEvent, type: value as any })}
                    >
                      <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-700 text-white">
                        <SelectItem value="meeting">Meeting</SelectItem>
                        <SelectItem value="deadline">Deadline</SelectItem>
                        <SelectItem value="reminder">Reminder</SelectItem>
                        <SelectItem value="client">Client Meeting</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="startTime" className="block text-sm font-medium text-gray-300 mb-1">
                      Start Time*
                    </label>
                    <Input
                      id="startTime"
                      type="time"
                      value={newEvent.startTime}
                      onChange={(e) => setNewEvent({ ...newEvent, startTime: e.target.value })}
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </div>
                  <div>
                    <label htmlFor="endTime" className="block text-sm font-medium text-gray-300 mb-1">
                      End Time*
                    </label>
                    <Input
                      id="endTime"
                      type="time"
                      value={newEvent.endTime}
                      onChange={(e) => setNewEvent({ ...newEvent, endTime: e.target.value })}
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-300 mb-1">
                    Location
                  </label>
                  <Input
                    id="location"
                    value={newEvent.location}
                    onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                    placeholder="Enter location (optional)"
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-1">
                    Description
                  </label>
                  <Textarea
                    id="description"
                    value={newEvent.description}
                    onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                    placeholder="Enter description (optional)"
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
                  onClick={handleCreateEvent}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90 text-white"
                >
                  Create Event
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
        {/* Calendar Header */}
        <div className="grid grid-cols-7 text-center py-2 border-b border-gray-800 bg-gray-800/50">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="text-gray-400 font-medium">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 auto-rows-fr">
          {daysInMonth.map((day, i) => {
            const dayEvents = getEventsForDay(day)
            const isCurrentMonth = isSameMonth(day, currentDate)
            const isSelected = selectedDate ? isSameDay(day, selectedDate) : false
            const isCurrentDay = isToday(day)

            return (
              <motion.div
                key={i}
                whileHover={{ scale: 0.98 }}
                onClick={() => handleDateClick(day)}
                className={`min-h-[120px] p-2 border-b border-r border-gray-800 cursor-pointer transition-colors ${
                  isSelected
                    ? "bg-purple-900/20"
                    : isCurrentDay
                      ? "bg-gray-800/50"
                      : isCurrentMonth
                        ? "bg-gray-900"
                        : "bg-gray-900/50"
                }`}
              >
                <div
                  className={`text-right mb-1 ${
                    isCurrentDay ? "font-bold text-purple-400" : isCurrentMonth ? "text-white" : "text-gray-500"
                  }`}
                >
                  {format(day, "d")}
                </div>
                <div className="space-y-1 overflow-y-auto max-h-[80px]">
                  {dayEvents.map((event) => (
                    <div
                      key={event.id}
                      className={`text-xs p-1 rounded truncate border ${getEventTypeStyles(event.type)}`}
                    >
                      <div className="font-medium truncate">{event.title}</div>
                      <div className="text-xs opacity-80">{`${event.startTime} - ${event.endTime}`}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Events for Selected Date */}
      {selectedDate && (
        <div className="bg-gray-900 rounded-xl border border-gray-800 p-4">
          <h2 className="text-xl font-bold mb-4">Events for {format(selectedDate, "MMMM d, yyyy")}</h2>

          <div className="space-y-4">
            {getEventsForDay(selectedDate).length > 0 ? (
              getEventsForDay(selectedDate).map((event) => (
                <div key={event.id} className={`p-4 rounded-lg border ${getEventTypeStyles(event.type)}`}>
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-lg">{event.title}</h3>
                    <span className="text-xs px-2 py-1 rounded-full bg-gray-800">
                      {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                    </span>
                  </div>
                  <div className="flex items-center mt-2 text-sm">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{`${event.startTime} - ${event.endTime}`}</span>
                  </div>
                  {event.location && (
                    <div className="flex items-center mt-2 text-sm">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{event.location}</span>
                    </div>
                  )}
                  {event.attendees && (
                    <div className="flex items-center mt-2 text-sm">
                      <Users className="h-4 w-4 mr-1" />
                      <span>{event.attendees} attendees</span>
                    </div>
                  )}
                  {event.description && <div className="mt-3 text-sm text-gray-300">{event.description}</div>}
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-400">
                <p>No events scheduled for this day</p>
                <Button
                  onClick={() => setIsDialogOpen(true)}
                  className="mt-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90 text-white"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Event
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
