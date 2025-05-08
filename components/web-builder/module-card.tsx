"use client"

import { useDrag } from "react-dnd"
import { Plus } from "lucide-react"
import type { ComponentType } from "@/lib/builder-store"

interface ModuleCardProps {
  id: ComponentType
  title: string
  description: string
  icon: string
}

export function ModuleCard({ id, title, description, icon }: ModuleCardProps) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "COMPONENT",
    item: { type: id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }))

  return (
    <div
      ref={drag}
      className={`group relative bg-gray-800 rounded-lg p-4 cursor-pointer hover:bg-gray-700 transition-colors ${
        isDragging ? "opacity-50" : ""
      }`}
    >
      <div className="flex items-start">
        <div className="h-10 w-10 rounded-lg bg-purple-100 flex items-center justify-center mr-3">
          <div className="h-6 w-6 bg-purple-500 rounded-md"></div>
        </div>
        <div>
          <h4 className="text-sm font-medium text-white">{title}</h4>
          <p className="text-xs text-gray-400 mt-1">{description}</p>
        </div>
      </div>
      <button className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <Plus className="h-4 w-4 text-gray-400" />
      </button>
    </div>
  )
}
