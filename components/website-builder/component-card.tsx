"use client"

import { useDrag } from "react-dnd"
import {
  Layout,
  Box,
  Columns,
  Heading,
  Text,
  MousePointer,
  ImageIcon,
  Minus,
  ArrowUpDown,
  Grid,
  DollarSign,
  CheckSquare,
  MessageSquare,
  Zap,
  FileText,
} from "lucide-react"
import type { ComponentType } from "@/lib/builder-store"

interface ComponentCardProps {
  type: ComponentType
  name: string
  description: string
  icon: string
}

export function ComponentCard({ type, name, description, icon }: ComponentCardProps) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "COMPONENT",
    item: { type },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }))

  const renderIcon = () => {
    switch (icon) {
      case "Layout":
        return <Layout className="h-5 w-5" />
      case "Box":
        return <Box className="h-5 w-5" />
      case "Columns":
        return <Columns className="h-5 w-5" />
      case "Heading":
        return <Heading className="h-5 w-5" />
      case "Text":
        return <Text className="h-5 w-5" />
      case "MousePointer":
        return <MousePointer className="h-5 w-5" />
      case "Image":
        return <ImageIcon className="h-5 w-5" />
      case "Minus":
        return <Minus className="h-5 w-5" />
      case "ArrowUpDown":
        return <ArrowUpDown className="h-5 w-5" />
      case "Grid":
        return <Grid className="h-5 w-5" />
      case "DollarSign":
        return <DollarSign className="h-5 w-5" />
      case "CheckSquare":
        return <CheckSquare className="h-5 w-5" />
      case "MessageSquare":
        return <MessageSquare className="h-5 w-5" />
      case "Zap":
        return <Zap className="h-5 w-5" />
      case "FileText":
        return <FileText className="h-5 w-5" />
      default:
        return <Box className="h-5 w-5" />
    }
  }

  return (
    <div
      ref={drag}
      className={`p-3 bg-gray-800 rounded-md cursor-move border border-gray-700 hover:border-purple-500 transition-colors ${
        isDragging ? "opacity-50" : ""
      }`}
    >
      <div className="flex items-start">
        <div className="flex-shrink-0 p-2 bg-gray-700 rounded-md text-purple-400">{renderIcon()}</div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-white">{name}</h3>
          <p className="text-xs text-gray-400">{description}</p>
        </div>
      </div>
    </div>
  )
}
