"use client"

import type React from "react"

import { useBuilderStore, type Component } from "@/lib/builder-store"
import { ChevronUp, ChevronDown, Copy, Trash } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useDrop } from "react-dnd"
import type { ComponentType } from "@/lib/builder-store"

interface ComponentRendererProps {
  component: Component
  isNested?: boolean
}

export function ComponentRenderer({ component, isNested = false }: ComponentRendererProps) {
  const {
    components,
    selectedId,
    moveComponent,
    duplicateComponent,
    removeComponent,
    selectComponent,
    moveComponentToContainer,
    updateComponent,
    addComponent,
  } = useBuilderStore()

  const { type, props, id, children } = component
  const isSelected = selectedId === id
  const childComponents = children
    ? components.filter((c) => children.includes(c.id)).sort((a, b) => a.order - b.order)
    : []

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "COMPONENT",
    drop: (item: { type: string; id?: string }, monitor) => {
      // Only handle drop if this is the direct target (not a child)
      if (!monitor.didDrop() && ["container", "section", "columns"].includes(type)) {
        if (item.id) {
          // Moving an existing component
          moveComponentToContainer(item.id, id)
        } else {
          // Adding a new component
          // This is handled by the Canvas component
        }
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver({ shallow: true }),
    }),
  }))

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

  const getComponentStyles = () => {
    const styles: React.CSSProperties = {}

    // Apply padding
    if (props.paddingTop !== undefined) styles.paddingTop = `${props.paddingTop}px`
    if (props.paddingRight !== undefined) styles.paddingRight = `${props.paddingRight}px`
    if (props.paddingBottom !== undefined) styles.paddingBottom = `${props.paddingBottom}px`
    if (props.paddingLeft !== undefined) styles.paddingLeft = `${props.paddingLeft}px`

    // Apply margin
    if (props.marginTop !== undefined) styles.marginTop = `${props.marginTop}px`
    if (props.marginBottom !== undefined) styles.marginBottom = `${props.marginBottom}px`

    // Apply border radius
    if (props.borderRadius !== undefined) styles.borderRadius = `${props.borderRadius}px`

    // Apply background color
    if (props.backgroundColor) styles.backgroundColor = props.backgroundColor

    return styles
  }

  const renderChildren = () => {
    if (!children || childComponents.length === 0) {
      return (
        <div className="min-h-[50px] flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-4">
          <p className="text-gray-500 text-sm">Arrastra componentes aquí</p>
        </div>
      )
    }

    return childComponents.map((child) => <ComponentRenderer key={child.id} component={child} isNested={true} />)
  }

  const Column = ({ columnIndex, parentId }: { columnIndex: number; parentId: string }) => {
    const columnChildren = childComponents.filter((child) => child.props.columnIndex === columnIndex)

    const [{ isColumnOver }, columnDrop] = useDrop(() => ({
      accept: "COMPONENT",
      drop: (item: { type: string; id?: string }) => {
        if (item.id) {
          // Update the existing component to have this column index
          const component = components.find((c) => c.id === item.id)
          if (component) {
            moveComponentToContainer(item.id, parentId)
            // Update the column index
            const updatedProps = { ...component.props, columnIndex: columnIndex }
            updateComponent(item.id, updatedProps)
          }
        } else {
          // Add a new component to this column
          addComponent(item.type as ComponentType, parentId)
          // The new component will be the last one added
          const newComponent = components[components.length - 1]
          if (newComponent) {
            // Update its column index
            updateComponent(newComponent.id, { columnIndex: columnIndex })
          }
        }
      },
      collect: (monitor) => ({
        isColumnOver: !!monitor.isOver({ shallow: true }),
      }),
    }))

    return (
      <div
        key={columnIndex}
        ref={columnDrop}
        className={`min-h-[100px] border-2 border-dashed ${
          isColumnOver ? "border-purple-500 bg-purple-50" : "border-gray-300"
        } rounded-lg p-2`}
        onClick={(e) => {
          e.stopPropagation()
        }}
      >
        {columnChildren.length > 0 ? (
          columnChildren.map((child) => <ComponentRenderer key={child.id} component={child} isNested={true} />)
        ) : (
          <div className="h-full flex items-center justify-center">
            <p className="text-gray-500 text-sm">Columna {columnIndex + 1}</p>
          </div>
        )}
      </div>
    )
  }

  switch (type) {
    case "container":
      return (
        <div
          ref={drop}
          className={`relative ${isSelected ? "ring-2 ring-purple-500" : ""} ${isOver ? "ring-2 ring-blue-500" : ""}`}
          style={getComponentStyles()}
          onClick={(e) => {
            e.stopPropagation()
            selectComponent(id)
          }}
        >
          {renderComponentControls()}
          <div className="p-4">{renderChildren()}</div>
        </div>
      )

    case "section":
      return (
        <div
          ref={drop}
          className={`relative ${isSelected ? "ring-2 ring-purple-500" : ""} ${isOver ? "ring-2 ring-blue-500" : ""}`}
          style={getComponentStyles()}
          onClick={(e) => {
            e.stopPropagation()
            selectComponent(id)
          }}
        >
          {renderComponentControls()}
          <div className={`${props.fullWidth ? "w-full" : "container mx-auto"}`}>{renderChildren()}</div>
        </div>
      )

    case "columns":
      const columnCount = props.columnCount || 2
      const gap = props.gap || 16

      return (
        <div
          className={`relative ${isSelected ? "ring-2 ring-purple-500" : ""} ${isOver ? "ring-2 ring-blue-500" : ""}`}
          style={getComponentStyles()}
          onClick={(e) => {
            e.stopPropagation()
            selectComponent(id)
          }}
        >
          {renderComponentControls()}
          <div
            className="grid"
            style={{
              gridTemplateColumns: `repeat(${columnCount}, 1fr)`,
              gap: `${gap}px`,
            }}
          >
            {Array.from({ length: columnCount }).map((_, i) => (
              <Column key={i} columnIndex={i} parentId={id} />
            ))}
          </div>
        </div>
      )

    case "hero":
      return (
        <div
          className={`relative ${isSelected ? "ring-2 ring-purple-500" : ""}`}
          onClick={(e) => {
            e.stopPropagation()
            selectComponent(id)
          }}
          style={getComponentStyles()}
        >
          {renderComponentControls()}
          <div
            className="relative py-16 px-8 bg-cover bg-center text-white"
            style={{
              backgroundImage: props.backgroundImage
                ? `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${props.backgroundImage})`
                : "linear-gradient(to right, #4F46E5, #7C3AED)",
              color: props.textColor || "#FFFFFF",
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
          style={getComponentStyles()}
        >
          {renderComponentControls()}
          <div className="py-16 px-8" style={{ backgroundColor: props.backgroundColor || "#FFFFFF" }}>
            <h2 className="text-3xl font-bold text-center mb-12" style={{ color: props.textColor || "#111111" }}>
              {props.title || "Nuestros Servicios"}
            </h2>
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
                  <h3 className="text-lg font-semibold mb-2" style={{ color: props.textColor || "#111111" }}>
                    {item.title}
                  </h3>
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
          style={getComponentStyles()}
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
          style={getComponentStyles()}
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
          style={getComponentStyles()}
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
          style={getComponentStyles()}
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
          style={getComponentStyles()}
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
          style={getComponentStyles()}
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
          style={getComponentStyles()}
        >
          {renderComponentControls()}
          <div className="p-8 border border-dashed border-gray-300 text-center">
            <p className="text-gray-500">Unknown component: {type}</p>
          </div>
        </div>
      )
  }
}
