"use client"

import { useDrag } from "react-dnd"
import { Plus } from "lucide-react"
import type { ComponentType } from "@/lib/builder-store"

interface ComponentCardProps {
  type: ComponentType
  title: string
  description: string
  icon: string
}

export function ComponentCard({ type, title, description, icon }: ComponentCardProps) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "COMPONENT",
    item: { type },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }))

  return (
    <div
      ref={drag}
      className={`flex cursor-grab items-center rounded-lg border border-gray-700 bg-gray-800 p-3 transition-all hover:border-purple-500 ${
        isDragging ? "opacity-50" : ""
      }`}
    >
      <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-md bg-purple-100">
        <div className="h-5 w-5 rounded-sm bg-purple-500"></div>
      </div>
      <div className="flex-1">
        <h3 className="text-sm font-medium text-white">{title}</h3>
        <p className="text-xs text-gray-400">{description}</p>
      </div>
      <button className="ml-2 flex h-6 w-6 items-center justify-center rounded-full bg-purple-600 text-white hover:bg-purple-700">
        <Plus className="h-4 w-4" />
      </button>
    </div>
  )
}
