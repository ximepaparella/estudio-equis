"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { v4 as uuidv4 } from "uuid"

// Define component types
export type ComponentType =
  | "hero"
  | "icons-section"
  | "background-section"
  | "heading"
  | "paragraph"
  | "button"
  | "image"
  | "gallery"
  | "testimonial"

// Define component properties
export interface ComponentProps {
  [key: string]: any
}

// Define component instance
export interface ComponentInstance {
  id: string
  type: ComponentType
  props: ComponentProps
  order: number
}

// Define builder context
interface BuilderContextType {
  components: ComponentInstance[]
  selectedComponentId: string | null
  addComponent: (type: ComponentType) => void
  removeComponent: (id: string) => void
  updateComponent: (id: string, props: ComponentProps) => void
  selectComponent: (id: string | null) => void
  moveComponent: (id: string, direction: "up" | "down") => void
  duplicateComponent: (id: string) => void
  getDefaultProps: (type: ComponentType) => ComponentProps
}

const BuilderContext = createContext<BuilderContextType | undefined>(undefined)

// Default props for each component type
const defaultProps: Record<ComponentType, ComponentProps> = {
  hero: {
    title: "Bienvenido a Mi Tienda",
    subtitle: "Descubre nuestros productos exclusivos",
    buttonText: "Comprar ahora",
    buttonUrl: "/productos",
    backgroundImage: "",
    alignment: "center",
    textColor: "#FFFFFF",
    backgroundColor: "#111111",
  },
  "icons-section": {
    title: "Nuestros Servicios",
    items: [
      { icon: "Star", title: "Servicio 1", description: "Descripción breve del servicio ofrecido." },
      { icon: "Heart", title: "Servicio 2", description: "Descripción breve del servicio ofrecido." },
      { icon: "Zap", title: "Servicio 3", description: "Descripción breve del servicio ofrecido." },
    ],
    columns: 3,
    backgroundColor: "#FFFFFF",
    textColor: "#111111",
  },
  "background-section": {
    title: "Sección con Fondo",
    content:
      "Esta es una sección con un fondo de color personalizado que puede utilizarse para destacar contenido importante.",
    backgroundColor: "#6B21A8",
    textColor: "#FFFFFF",
    padding: "64px",
  },
  heading: {
    text: "Título de Sección",
    level: "h2",
    alignment: "left",
    color: "#111111",
    size: "3xl",
  },
  paragraph: {
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc eu nisl.",
    alignment: "left",
    color: "#333333",
    size: "base",
  },
  button: {
    text: "Haz clic aquí",
    url: "#",
    variant: "primary",
    size: "md",
    alignment: "center",
  },
  image: {
    src: "/placeholder.svg",
    alt: "Imagen",
    width: "100%",
    height: "auto",
    alignment: "center",
  },
  gallery: {
    images: [
      { src: "/placeholder.svg", alt: "Imagen 1" },
      { src: "/placeholder.svg", alt: "Imagen 2" },
      { src: "/placeholder.svg", alt: "Imagen 3" },
    ],
    columns: 3,
    gap: "4",
  },
  testimonial: {
    quote: "Este producto ha cambiado mi vida. Lo recomiendo totalmente.",
    author: "Juan Pérez",
    role: "Cliente",
    avatar: "",
    backgroundColor: "#F9FAFB",
    textColor: "#111111",
  },
}

export const BuilderProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [components, setComponents] = useState<ComponentInstance[]>([])
  const [selectedComponentId, setSelectedComponentId] = useState<string | null>(null)

  // Load initial components (could be from API or localStorage)
  useEffect(() => {
    // For demo purposes, let's add some initial components
    setComponents([
      {
        id: uuidv4(),
        type: "hero",
        props: defaultProps.hero,
        order: 0,
      },
      {
        id: uuidv4(),
        type: "paragraph",
        props: defaultProps.paragraph,
        order: 1,
      },
      {
        id: uuidv4(),
        type: "button",
        props: defaultProps.button,
        order: 2,
      },
    ])
  }, [])

  const getDefaultProps = (type: ComponentType): ComponentProps => {
    return { ...defaultProps[type] }
  }

  const addComponent = (type: ComponentType) => {
    const newComponent: ComponentInstance = {
      id: uuidv4(),
      type,
      props: getDefaultProps(type),
      order: components.length,
    }

    setComponents([...components, newComponent])
    setSelectedComponentId(newComponent.id)
  }

  const removeComponent = (id: string) => {
    setComponents(components.filter((c) => c.id !== id))
    if (selectedComponentId === id) {
      setSelectedComponentId(null)
    }
  }

  const updateComponent = (id: string, props: ComponentProps) => {
    setComponents(components.map((c) => (c.id === id ? { ...c, props: { ...c.props, ...props } } : c)))
  }

  const selectComponent = (id: string | null) => {
    setSelectedComponentId(id)
  }

  const moveComponent = (id: string, direction: "up" | "down") => {
    const component = components.find((c) => c.id === id)
    if (!component) return

    const currentIndex = components.findIndex((c) => c.id === id)
    const newIndex =
      direction === "up" ? Math.max(0, currentIndex - 1) : Math.min(components.length - 1, currentIndex + 1)

    if (currentIndex === newIndex) return

    const newComponents = [...components]
    const [removed] = newComponents.splice(currentIndex, 1)
    newComponents.splice(newIndex, 0, removed)

    // Update order property
    const updatedComponents = newComponents.map((c, index) => ({
      ...c,
      order: index,
    }))

    setComponents(updatedComponents)
  }

  const duplicateComponent = (id: string) => {
    const component = components.find((c) => c.id === id)
    if (!component) return

    const newComponent: ComponentInstance = {
      ...component,
      id: uuidv4(),
      order: components.length,
    }

    setComponents([...components, newComponent])
    setSelectedComponentId(newComponent.id)
  }

  return (
    <BuilderContext.Provider
      value={{
        components,
        selectedComponentId,
        addComponent,
        removeComponent,
        updateComponent,
        selectComponent,
        moveComponent,
        duplicateComponent,
        getDefaultProps,
      }}
    >
      {children}
    </BuilderContext.Provider>
  )
}

export const useBuilder = () => {
  const context = useContext(BuilderContext)
  if (context === undefined) {
    throw new Error("useBuilder must be used within a BuilderProvider")
  }
  return context
}
