"use client"

import { useBuilderStore, type Component } from "@/lib/builder-store"
import { ChevronUp, ChevronDown, Copy, Trash } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ComponentRendererProps {
  component: Component
}

export function ComponentRenderer({ component }: ComponentRendererProps) {
  const { selectedId, moveComponent, duplicateComponent, removeComponent, selectComponent } = useBuilderStore()
  const { type, props, id } = component
  const isSelected = selectedId === id

  const renderComponentControls = () => {
    if (!isSelected) return null

    return (
      <div className="absolute -top-4 right-2 flex items-center space-x-1 z-10">
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 bg-gray-900 border-gray-700 text-white"
          onClick={(e) => {
            e.stopPropagation()
            moveComponent(id, "up")
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
            moveComponent(id, "down")
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
            duplicateComponent(id)
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
            removeComponent(id)
          }}
        >
          <Trash className="h-4 w-4" />
        </Button>
      </div>
    )
  }

  switch (type) {
    case "hero":
      return (
        <div
          className={`relative ${isSelected ? "ring-2 ring-purple-500" : ""}`}
          onClick={(e) => {
            e.stopPropagation()
            selectComponent(id)
          }}
        >
          {renderComponentControls()}
          <div
            className="relative py-16 px-8 bg-cover bg-center text-white"
            style={{
              backgroundImage: props.backgroundImage
                ? `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${props.backgroundImage})`
                : "linear-gradient(to right, #4F46E5, #7C3AED)",
            }}
          >
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl font-bold mb-4">{props.title || "Bienvenidos a Mi Tienda"}</h1>
              <p className="text-xl mb-8">{props.subtitle || "Los mejores productos para tu hogar"}</p>
              <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-6 rounded-full">
                {props.buttonText || "Comprar Ahora"}
              </button>
            </div>
          </div>
        </div>
      )

    case "icons-section":
      return (
        <div
          className={`relative ${isSelected ? "ring-2 ring-purple-500" : ""}`}
          onClick={(e) => {
            e.stopPropagation()
            selectComponent(id)
          }}
        >
          {renderComponentControls()}
          <div className="py-16 px-8">
            <h2 className="text-3xl font-bold text-center mb-12">{props.title || "Nuestros Servicios"}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {(
                props.items || [
                  { icon: "Truck", title: "Envío Gratis", description: "En todos tus pedidos" },
                  { icon: "HeadphonesIcon", title: "Soporte 24/7", description: "Estamos para ayudarte" },
                  { icon: "ShieldCheck", title: "Garantía", description: "30 días de garantía" },
                ]
              ).map((item: any, i: number) => (
                <div key={i} className="text-center p-6 bg-white rounded-lg shadow-md">
                  <div className="inline-flex items-center justify-center p-3 bg-purple-100 rounded-full mb-4">
                    <div className="w-6 h-6 bg-purple-500 rounded-md"></div>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )

    case "heading":
      const HeadingTag = props.level || "h2"
      return (
        <div
          className={`relative ${isSelected ? "ring-2 ring-purple-500" : ""}`}
          onClick={(e) => {
            e.stopPropagation()
            selectComponent(id)
          }}
        >
          {renderComponentControls()}
          <div className="py-4 px-8">
            <HeadingTag
              className={`text-${props.size || "3xl"} font-bold`}
              style={{
                color: props.color || "#111111",
                textAlign: props.alignment || ("left" as any),
              }}
            >
              {props.text || "Nuestros Servicios"}
            </HeadingTag>
          </div>
        </div>
      )

    case "paragraph":
      return (
        <div
          className={`relative ${isSelected ? "ring-2 ring-purple-500" : ""}`}
          onClick={(e) => {
            e.stopPropagation()
            selectComponent(id)
          }}
        >
          {renderComponentControls()}
          <div className="py-4 px-8">
            <p
              className={`text-${props.size || "base"}`}
              style={{
                color: props.color || "#333333",
                textAlign: props.alignment || ("left" as any),
              }}
            >
              {props.text ||
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc eu nisl."}
            </p>
          </div>
        </div>
      )

    case "button":
      const getButtonStyle = () => {
        switch (props.variant) {
          case "primary":
            return "bg-purple-600 hover:bg-purple-700 text-white"
          case "secondary":
            return "bg-gray-200 hover:bg-gray-300 text-gray-800"
          case "outline":
            return "bg-transparent hover:bg-purple-100 text-purple-600 border border-purple-600"
          default:
            return "bg-purple-600 hover:bg-purple-700 text-white"
        }
      }

      const getButtonSize = () => {
        switch (props.size) {
          case "sm":
            return "py-1 px-4 text-sm"
          case "lg":
            return "py-3 px-8 text-lg"
          default:
            return "py-2 px-6"
        }
      }

      return (
        <div
          className={`relative ${isSelected ? "ring-2 ring-purple-500" : ""}`}
          onClick={(e) => {
            e.stopPropagation()
            selectComponent(id)
          }}
        >
          {renderComponentControls()}
          <div
            className="py-4 px-8 flex"
            style={{
              justifyContent:
                props.alignment === "center" ? "center" : props.alignment === "right" ? "flex-end" : "flex-start",
            }}
          >
            <button
              className={`${getButtonStyle()} ${getButtonSize()} font-bold rounded`}
              onClick={(e) => e.stopPropagation()}
            >
              {props.text || "Comprar Ahora"}
            </button>
          </div>
        </div>
      )

    case "image":
      return (
        <div
          className={`relative ${isSelected ? "ring-2 ring-purple-500" : ""}`}
          onClick={(e) => {
            e.stopPropagation()
            selectComponent(id)
          }}
        >
          {renderComponentControls()}
          <div
            className="py-4 px-8 flex"
            style={{
              justifyContent:
                props.alignment === "center" ? "center" : props.alignment === "right" ? "flex-end" : "flex-start",
            }}
          >
            <img
              src={props.src || "/placeholder.svg?height=300&width=500"}
              alt={props.alt || "Image"}
              style={{
                width: props.width || "100%",
                height: props.height || "auto",
              }}
              className="rounded"
            />
          </div>
        </div>
      )

    case "divider":
      return (
        <div
          className={`relative ${isSelected ? "ring-2 ring-purple-500" : ""}`}
          onClick={(e) => {
            e.stopPropagation()
            selectComponent(id)
          }}
        >
          {renderComponentControls()}
          <div className="py-4 px-8">
            <hr
              style={{
                borderStyle: props.style || "solid",
                borderColor: props.color || "#E5E7EB",
                borderWidth: `${props.thickness || 1}px 0 0 0`,
                margin: `${props.margin || 16}px 0`,
              }}
            />
          </div>
        </div>
      )

    case "spacer":
      return (
        <div
          className={`relative ${isSelected ? "ring-2 ring-purple-500" : ""}`}
          onClick={(e) => {
            e.stopPropagation()
            selectComponent(id)
          }}
        >
          {renderComponentControls()}
          <div className="px-8" style={{ height: `${props.height || 48}px` }}></div>
        </div>
      )

    default:
      return (
        <div
          className={`relative ${isSelected ? "ring-2 ring-purple-500" : ""}`}
          onClick={(e) => {
            e.stopPropagation()
            selectComponent(id)
          }}
        >
          {renderComponentControls()}
          <div className="p-8 border border-dashed border-gray-300 text-center">
            <p className="text-gray-500">Unknown component: {type}</p>
          </div>
        </div>
      )
  }
}
