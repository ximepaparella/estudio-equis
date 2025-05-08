"use client"

import { forwardRef, useRef } from "react"
import { useDrop } from "react-dnd"
import { ChevronUp, ChevronDown, Copy, Trash } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useBuilderStore, type ComponentType } from "@/lib/builder-store"
import { ComponentRenderer } from "./component-renderer"

interface CanvasProps {
  deviceView: "desktop" | "tablet" | "mobile"
}

export const Canvas = forwardRef<HTMLDivElement, CanvasProps>(({ deviceView }, ref) => {
  const { components, selectedId, addComponent, removeComponent, selectComponent, moveComponent, duplicateComponent } =
    useBuilderStore()

  const canvasRef = useRef<HTMLDivElement>(null)

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "COMPONENT",
    drop: (item: { type: ComponentType }, monitor) => {
      // Check if we're dropping directly on the canvas
      const didDropOnCanvas = monitor.isOver({ shallow: true })
      if (didDropOnCanvas) {
        addComponent(item.type)
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver({ shallow: true }),
    }),
  }))

  const getCanvasWidth = () => {
    switch (deviceView) {
      case "mobile":
        return "max-w-sm"
      case "tablet":
        return "max-w-2xl"
      default:
        return "max-w-6xl"
    }
  }

  const sortedComponents = [...components].sort((a, b) => a.order - b.order)

  return (
    <div className="p-8 min-h-full flex justify-center" ref={ref}>
      <div
        ref={drop}
        className={`w-full ${getCanvasWidth()} bg-white rounded-lg min-h-[500px] transition-all duration-300 ${
          isOver ? "border-2 border-dashed border-purple-500" : ""
        }`}
      >
        {components.length === 0 ? (
          <div className="h-full flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-8">
            <div className="text-center">
              <p className="text-gray-500">Drag and drop components here</p>
            </div>
          </div>
        ) : (
          <div className="relative">
            {sortedComponents.map((component) => (
              <div
                key={component.id}
                className={`relative ${selectedId === component.id ? "ring-2 ring-purple-500" : ""}`}
                onClick={(e) => {
                  e.stopPropagation()
                  selectComponent(component.id)
                }}
              >
                {selectedId === component.id && (
                  <div className="absolute -top-4 right-2 flex items-center space-x-1 z-10">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 bg-gray-900 border-gray-700 text-white"
                      onClick={(e) => {
                        e.stopPropagation()
                        moveComponent(component.id, "up")
                      }}
                    >
                      <ChevronUp className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 bg-gray-900 border-gray-700 text-white"
                      onClick={(e) => {
                        e.stopPropagation()
                        moveComponent(component.id, "down")
                      }}
                    >
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 bg-gray-900 border-gray-700 text-white"
                      onClick={(e) => {
                        e.stopPropagation()
                        duplicateComponent(component.id)
                      }}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 bg-gray-900 border-gray-700 text-white"
                      onClick={(e) => {
                        e.stopPropagation()
                        removeComponent(component.id)
                      }}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                )}
                <ComponentRenderer component={component} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
})

Canvas.displayName = "Canvas"
