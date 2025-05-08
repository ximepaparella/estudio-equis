"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ModuleCard } from "./module-card"
import type { ComponentType } from "@/lib/builder-store"

export function ComponentsSidebar() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("all")

  const moduleTypes: { id: ComponentType; title: string; description: string; icon: string; category: string }[] = [
    {
      id: "hero",
      title: "Hero with Title and Image",
      description: "Main featured section",
      icon: "Layers",
      category: "sections",
    },
    {
      id: "icons-section",
      title: "Icons Section",
      description: "Display features or services",
      icon: "Layers",
      category: "sections",
    },
    {
      id: "background-section",
      title: "Background Section",
      description: "Section with custom background",
      icon: "Layers",
      category: "sections",
    },
    {
      id: "heading",
      title: "Heading",
      description: "Section title or heading",
      icon: "Type",
      category: "basics",
    },
    {
      id: "paragraph",
      title: "Paragraph",
      description: "Text block",
      icon: "Type",
      category: "basics",
    },
    {
      id: "button",
      title: "Button",
      description: "Clickable button",
      icon: "Square",
      category: "basics",
    },
    {
      id: "image",
      title: "Image",
      description: "Single image",
      icon: "Image",
      category: "media",
    },
    {
      id: "gallery",
      title: "Gallery",
      description: "Collection of images",
      icon: "Grid",
      category: "media",
    },
    {
      id: "testimonial",
      title: "Testimonial",
      description: "Customer quote",
      icon: "MessageSquare",
      category: "content",
    },
  ]

  const filteredModules = moduleTypes.filter(
    (module) =>
      (activeCategory === "all" || module.category === activeCategory) &&
      (searchQuery === "" ||
        module.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        module.description.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  return (
    <div className="w-64 border-r border-gray-800 bg-gray-900 flex flex-col">
      <div className="p-4 border-b border-gray-800">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            type="search"
            placeholder="Search components..."
            className="pl-8 bg-gray-800 border-gray-700 text-white"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="flex border-b border-gray-800">
        <Button
          variant="ghost"
          className={`flex-1 rounded-none ${
            activeCategory === "all" ? "text-white border-b-2 border-purple-500" : "text-gray-400"
          }`}
          onClick={() => setActiveCategory("all")}
        >
          All
        </Button>
        <Button
          variant="ghost"
          className={`flex-1 rounded-none ${
            activeCategory === "sections" ? "text-white border-b-2 border-purple-500" : "text-gray-400"
          }`}
          onClick={() => setActiveCategory("sections")}
        >
          Sections
        </Button>
        <Button
          variant="ghost"
          className={`flex-1 rounded-none ${
            activeCategory === "basics" ? "text-white border-b-2 border-purple-500" : "text-gray-400"
          }`}
          onClick={() => setActiveCategory("basics")}
        >
          Basics
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-white">Components</h3>
          <span className="text-xs bg-gray-800 text-gray-400 px-2 py-1 rounded-full">
            {filteredModules.length} items
          </span>
        </div>

        {filteredModules.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-400">No components found</p>
          </div>
        ) : (
          filteredModules.map((module) => (
            <ModuleCard
              key={module.id}
              id={module.id}
              title={module.title}
              description={module.description}
              icon={module.icon}
            />
          ))
        )}
      </div>
    </div>
  )
}
