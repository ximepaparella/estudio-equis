"use client"

import { forwardRef, useRef } from "react"
import { useDrop } from "react-dnd"
import { Plus } from "lucide-react"
import { useBuilderStore, type ComponentType } from "@/lib/builder-store"
import { ComponentRenderer } from "./component-renderer"

interface CanvasProps {
  deviceView: "desktop" | "tablet" | "mobile"
}

export const Canvas = forwardRef<HTMLDivElement, CanvasProps>(({ deviceView }, ref) => {
  const { components, addComponent, selectComponent } = useBuilderStore()
  const canvasRef = useRef<HTMLDivElement>(null)

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "COMPONENT",
    drop: (item: { type: ComponentType; id?: string }, monitor) => {
      // Check if we're dropping directly on the canvas
      const didDropOnCanvas = monitor.isOver({ shallow: true })
      if (didDropOnCanvas && !item.id) {
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

  // Get only root components (those without a parent)
  const rootComponents = components.filter((c) => !c.parentId).sort((a, b) => a.order - b.order)

  return (
    <div className="p-8 min-h-full flex justify-center bg-gray-900" ref={ref} onClick={() => selectComponent(null)}>
      <div
        ref={drop}
        className={`w-full ${getCanvasWidth()} bg-white rounded-lg min-h-screen transition-all duration-300 ${
          isOver ? "border-2 border-dashed border-purple-500" : ""
        }`}
      >
        <div className="px-5">
          {rootComponents.length === 0 ? (
            <div className="h-full flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-8">
              <div className="text-center">
                <p className="text-gray-500 mb-4">Arrastra y suelta componentes aquí</p>
                <button
                  className="inline-flex items-center justify-center rounded-md bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700"
                  onClick={(e) => {
                    e.stopPropagation()
                    addComponent("section")
                  }}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Añadir sección
                </button>
              </div>
            </div>
          ) : (
            <div className="relative">
              {rootComponents.map((component) => (
                <ComponentRenderer key={component.id} component={component} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
})

Canvas.displayName = "Canvas"
