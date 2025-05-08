import { create } from "zustand"
import { v4 as uuidv4 } from "uuid"

export type ComponentType =
  | "container"
  | "section"
  | "columns"
  | "hero"
  | "paragraph"
  | "heading"
  | "button"
  | "image"
  | "icons-section"
  | "background-section"
  | "gallery"
  | "testimonial"
  | "divider"
  | "spacer"
  | "pricing"
  | "features"
  | "testimonials"
  | "cta"
  | "video"
  | "icon"
  | "form"
  | "map"
  | "social"

export interface Component {
  id: string
  type: ComponentType
  props: Record<string, any>
  order: number
  parentId?: string | null
  children?: string[] // Array of component IDs
}

interface BuilderStore {
  components: Component[]
  selectedId: string | null
  deviceView: "desktop" | "tablet" | "mobile"
  history: Component[][]
  historyIndex: number

  // Actions
  addComponent: (type: ComponentType, parentId?: string | null) => void
  removeComponent: (id: string) => void
  selectComponent: (id: string | null) => void
  updateComponent: (id: string, props: Record<string, any>) => void
  moveComponent: (id: string, direction: "up" | "down") => void
  duplicateComponent: (id: string) => void
  setDeviceView: (view: "desktop" | "tablet" | "mobile") => void
  loadComponents: (components: Component[]) => void
  clearComponents: () => void
  saveHistory: () => void
  undo: () => void
  redo: () => void
  moveComponentToContainer: (componentId: string, containerId: string, index?: number) => void
}

// Default props for each component type
const defaultProps: Record<ComponentType, Record<string, any>> = {
  container: {
    backgroundColor: "#FFFFFF",
    paddingTop: 20,
    paddingRight: 20,
    paddingBottom: 20,
    paddingLeft: 20,
    marginTop: 0,
    marginBottom: 0,
    borderRadius: 0,
    fullWidth: false,
  },
  section: {
    backgroundColor: "#FFFFFF",
    paddingTop: 60,
    paddingRight: 20,
    paddingBottom: 60,
    paddingLeft: 20,
    marginTop: 0,
    marginBottom: 0,
    fullWidth: true,
  },
  columns: {
    columnCount: 2,
    gap: 16,
    backgroundColor: "#FFFFFF",
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
  },
  hero: {
    title: "Bienvenidos a Mi Tienda",
    subtitle: "Los mejores productos para tu hogar",
    buttonText: "Comprar Ahora",
    buttonUrl: "#",
    backgroundImage: "/placeholder.svg?height=600&width=800",
    alignment: "center",
    textColor: "#FFFFFF",
    backgroundColor: "#111111",
  },
  paragraph: {
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc eu nisl.",
    alignment: "left",
    color: "#333333",
    size: "base",
  },
  heading: {
    text: "Nuestros Servicios",
    level: "h2",
    alignment: "left",
    color: "#111111",
    size: "3xl",
  },
  button: {
    text: "Comprar Ahora",
    url: "#",
    variant: "primary",
    size: "md",
    alignment: "center",
  },
  image: {
    src: "/placeholder.svg?height=300&width=500",
    alt: "Image",
    width: "100%",
    height: "auto",
    alignment: "center",
  },
  "icons-section": {
    title: "Nuestros Servicios",
    items: [
      { icon: "Truck", title: "Envío Gratis", description: "En todos tus pedidos" },
      { icon: "HeadphonesIcon", title: "Soporte 24/7", description: "Estamos para ayudarte" },
      { icon: "ShieldCheck", title: "Garantía", description: "30 días de garantía" },
    ],
    columns: 3,
    backgroundColor: "#FFFFFF",
    textColor: "#111111",
  },
  "background-section": {
    title: "Background Section",
    content: "This is a section with a custom background color that can be used to highlight important content.",
    backgroundColor: "#6B21A8",
    textColor: "#FFFFFF",
    padding: "64px",
  },
  gallery: {
    images: [
      { src: "/placeholder.svg?height=200&width=300", alt: "Image 1" },
      { src: "/placeholder.svg?height=200&width=300", alt: "Image 2" },
      { src: "/placeholder.svg?height=200&width=300", alt: "Image 3" },
    ],
    columns: 3,
    gap: "4",
  },
  testimonial: {
    quote: "This product has changed my life. I highly recommend it.",
    author: "John Doe",
    role: "Customer",
    avatar: "",
    backgroundColor: "#F9FAFB",
    textColor: "#111111",
  },
  divider: {
    style: "solid",
    color: "#E5E7EB",
    thickness: 1,
    margin: 16,
  },
  spacer: {
    height: 48,
  },
  pricing: {
    title: "Nuestros Planes",
    description: "Elige el plan que mejor se adapte a tus necesidades",
    plans: [
      {
        title: "Básico",
        price: "9.99",
        period: "mes",
        features: ["Característica 1", "Característica 2", "Característica 3"],
        buttonText: "Empezar",
        buttonUrl: "#",
        highlighted: false,
      },
      {
        title: "Pro",
        price: "19.99",
        period: "mes",
        features: ["Característica 1", "Característica 2", "Característica 3", "Característica 4", "Característica 5"],
        buttonText: "Empezar",
        buttonUrl: "#",
        highlighted: true,
      },
      {
        title: "Premium",
        price: "29.99",
        period: "mes",
        features: [
          "Característica 1",
          "Característica 2",
          "Característica 3",
          "Característica 4",
          "Característica 5",
          "Característica 6",
        ],
        buttonText: "Empezar",
        buttonUrl: "#",
        highlighted: false,
      },
    ],
  },
  features: {
    title: "Características",
    description: "Todo lo que necesitas para tener éxito",
    items: [
      {
        icon: "Check",
        title: "Característica 1",
        description: "Descripción de la característica 1",
      },
      {
        icon: "Check",
        title: "Característica 2",
        description: "Descripción de la característica 2",
      },
      {
        icon: "Check",
        title: "Característica 3",
        description: "Descripción de la característica 3",
      },
    ],
  },
  testimonials: {
    title: "Lo que dicen nuestros clientes",
    items: [
      {
        quote: "Este producto ha cambiado mi vida. Lo recomiendo ampliamente.",
        author: "Juan Pérez",
        role: "Cliente",
        avatar: "",
      },
      {
        quote: "Increíble servicio y atención al cliente. Volveré a comprar.",
        author: "María García",
        role: "Cliente",
        avatar: "",
      },
      {
        quote: "La mejor inversión que he hecho. Gracias por todo.",
        author: "Carlos Rodríguez",
        role: "Cliente",
        avatar: "",
      },
    ],
  },
  cta: {
    title: "¿Listo para empezar?",
    description: "Únete a miles de clientes satisfechos hoy mismo",
    buttonText: "Comenzar ahora",
    buttonUrl: "#",
    backgroundColor: "#6B21A8",
    textColor: "#FFFFFF",
  },
  video: {
    url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    title: "Video Title",
    width: "100%",
    height: "400px",
  },
  icon: {
    name: "Star",
    size: "24",
    color: "#6B21A8",
  },
  form: {
    title: "Contáctanos",
    description: "Envíanos un mensaje y te responderemos lo antes posible",
    fields: [
      { type: "text", name: "name", label: "Nombre", required: true },
      { type: "email", name: "email", label: "Email", required: true },
      { type: "textarea", name: "message", label: "Mensaje", required: true },
    ],
    buttonText: "Enviar",
  },
  map: {
    address: "1600 Amphitheatre Parkway, Mountain View, CA",
    zoom: 15,
    height: "400px",
  },
  social: {
    networks: [
      { name: "Facebook", url: "#", icon: "Facebook" },
      { name: "Twitter", url: "#", icon: "Twitter" },
      { name: "Instagram", url: "#", icon: "Instagram" },
      { name: "LinkedIn", url: "#", icon: "Linkedin" },
    ],
    size: "md",
    color: "#6B21A8",
  },
}

// Helper function to get all child component IDs recursively
const getAllChildrenIds = (components: Component[], parentId: string): string[] => {
  const directChildren = components.filter((c) => c.parentId === parentId).map((c) => c.id)
  const allChildren = [...directChildren]

  directChildren.forEach((childId) => {
    allChildren.push(...getAllChildrenIds(components, childId))
  })

  return allChildren
}

export const useBuilderStore = create<BuilderStore>((set, get) => ({
  components: [],
  selectedId: null,
  deviceView: "desktop",
  history: [],
  historyIndex: -1,

  addComponent: (type, parentId = null) =>
    set((state) => {
      const isContainer = ["container", "section", "columns"].includes(type)
      const newComponent: Component = {
        id: uuidv4(),
        type,
        props: { ...defaultProps[type] },
        order: parentId
          ? state.components.filter((c) => c.parentId === parentId).length
          : state.components.filter((c) => !c.parentId).length,
        parentId,
        ...(isContainer ? { children: [] } : {}),
      }

      // If adding to a container, update the container's children array
      const updatedComponents = [...state.components]
      if (parentId) {
        const parentIndex = updatedComponents.findIndex((c) => c.id === parentId)
        if (parentIndex !== -1) {
          updatedComponents[parentIndex] = {
            ...updatedComponents[parentIndex],
            children: [...(updatedComponents[parentIndex].children || []), newComponent.id],
          }
        }
      }

      return {
        components: [...updatedComponents, newComponent],
        selectedId: newComponent.id,
      }
    }),

  removeComponent: (id) =>
    set((state) => {
      // Get all children IDs to remove
      const childrenIds = getAllChildrenIds(state.components, id)
      const idsToRemove = [id, ...childrenIds]

      // Find the parent component
      const componentToRemove = state.components.find((c) => c.id === id)
      const parentId = componentToRemove?.parentId

      // Filter out the component and all its children
      const filteredComponents = state.components.filter((c) => !idsToRemove.includes(c.id))

      // Update the parent's children array if needed
      if (parentId) {
        const parentIndex = filteredComponents.findIndex((c) => c.id === parentId)
        if (parentIndex !== -1) {
          filteredComponents[parentIndex] = {
            ...filteredComponents[parentIndex],
            children: (filteredComponents[parentIndex].children || []).filter((childId) => childId !== id),
          }
        }
      }

      // Update order for all components with the same parent
      const updatedComponents = filteredComponents.map((c) => {
        if (c.parentId === parentId) {
          const sameParentComponents = filteredComponents.filter((comp) => comp.parentId === parentId)
          const index = sameParentComponents.findIndex((comp) => comp.id === c.id)
          return { ...c, order: index }
        }
        return c
      })

      return {
        components: updatedComponents,
        selectedId: state.selectedId === id ? null : state.selectedId,
      }
    }),

  selectComponent: (id) => set({ selectedId: id }),

  updateComponent: (id, props) =>
    set((state) => ({
      components: state.components.map((c) => (c.id === id ? { ...c, props: { ...c.props, ...props } } : c)),
    })),

  moveComponent: (id, direction) =>
    set((state) => {
      const component = state.components.find((c) => c.id === id)
      if (!component) return state

      const parentId = component.parentId
      const sameParentComponents = state.components.filter((c) => c.parentId === parentId)
      const index = sameParentComponents.findIndex((c) => c.id === id)

      if (index === -1) return state

      const newIndex =
        direction === "up" ? Math.max(0, index - 1) : Math.min(sameParentComponents.length - 1, index + 1)

      if (index === newIndex) return state

      // Create a new array of components with the same parent
      const newSameParentComponents = [...sameParentComponents]
      const [removed] = newSameParentComponents.splice(index, 1)
      newSameParentComponents.splice(newIndex, 0, removed)

      // Update order property for all components with the same parent
      const updatedSameParentComponents = newSameParentComponents.map((c, i) => ({
        ...c,
        order: i,
      }))

      // Replace the old components with the updated ones
      const updatedComponents = state.components.map((c) => {
        if (c.parentId === parentId) {
          const updatedComponent = updatedSameParentComponents.find((uc) => uc.id === c.id)
          return updatedComponent || c
        }
        return c
      })

      return { components: updatedComponents }
    }),

  duplicateComponent: (id) =>
    set((state) => {
      const component = state.components.find((c) => c.id === id)
      if (!component) return state

      const duplicateId = uuidv4()
      const parentId = component.parentId

      // Duplicate the component
      const newComponent: Component = {
        ...component,
        id: duplicateId,
        order: component.order + 1,
        children: component.children ? [] : undefined,
      }

      // Update order for all components with the same parent that come after the duplicated component
      const updatedComponents = state.components.map((c) => {
        if (c.parentId === parentId && c.order > component.order) {
          return { ...c, order: c.order + 1 }
        }
        return c
      })

      // If the component has children, duplicate them too
      let additionalComponents: Component[] = []
      if (component.children && component.children.length > 0) {
        const childrenToClone = state.components.filter((c) => component.children?.includes(c.id))

        const clonedChildren = childrenToClone.map((child) => {
          const childCloneId = uuidv4()
          return {
            ...child,
            id: childCloneId,
            parentId: duplicateId,
          }
        })

        additionalComponents = clonedChildren
        newComponent.children = clonedChildren.map((c) => c.id)
      }

      // Update the parent's children array if needed
      if (parentId) {
        const parentIndex = updatedComponents.findIndex((c) => c.id === parentId)
        if (parentIndex !== -1) {
          updatedComponents[parentIndex] = {
            ...updatedComponents[parentIndex],
            children: [...(updatedComponents[parentIndex].children || []), duplicateId],
          }
        }
      }

      return {
        components: [...updatedComponents, newComponent, ...additionalComponents],
        selectedId: duplicateId,
      }
    }),

  setDeviceView: (deviceView) => set({ deviceView }),

  loadComponents: (components) => set({ components, selectedId: null }),

  clearComponents: () => set({ components: [], selectedId: null }),

  saveHistory: () =>
    set((state) => {
      const newHistory = state.history.slice(0, state.historyIndex + 1)
      return {
        history: [...newHistory, [...state.components]],
        historyIndex: state.historyIndex + 1,
      }
    }),

  undo: () =>
    set((state) => {
      if (state.historyIndex <= 0) return state

      const newIndex = state.historyIndex - 1
      return {
        components: [...state.history[newIndex]],
        historyIndex: newIndex,
      }
    }),

  redo: () =>
    set((state) => {
      if (state.historyIndex >= state.history.length - 1) return state

      const newIndex = state.historyIndex + 1
      return {
        components: [...state.history[newIndex]],
        historyIndex: newIndex,
      }
    }),

  moveComponentToContainer: (componentId, containerId, index) =>
    set((state) => {
      const component = state.components.find((c) => c.id === componentId)
      if (!component) return state

      const oldParentId = component.parentId

      // Remove from old parent's children array
      let updatedComponents = [...state.components]
      if (oldParentId) {
        const oldParentIndex = updatedComponents.findIndex((c) => c.id === oldParentId)
        if (oldParentIndex !== -1) {
          updatedComponents[oldParentIndex] = {
            ...updatedComponents[oldParentIndex],
            children: (updatedComponents[oldParentIndex].children || []).filter((id) => id !== componentId),
          }
        }
      }

      // Add to new parent's children array
      const containerIndex = updatedComponents.findIndex((c) => c.id === containerId)
      if (containerIndex !== -1) {
        const containerChildren = [...(updatedComponents[containerIndex].children || [])]

        // If index is provided, insert at that position, otherwise append
        if (index !== undefined) {
          containerChildren.splice(index, 0, componentId)
        } else {
          containerChildren.push(componentId)
        }

        updatedComponents[containerIndex] = {
          ...updatedComponents[containerIndex],
          children: containerChildren,
        }
      }

      // Update the component's parentId
      updatedComponents = updatedComponents.map((c) => (c.id === componentId ? { ...c, parentId: containerId } : c))

      // Update order for all components in both old and new containers
      updatedComponents = updatedComponents.map((c) => {
        if (c.parentId === oldParentId || c.parentId === containerId) {
          const sameParentComponents = updatedComponents.filter((comp) => comp.parentId === c.parentId)
          const index = sameParentComponents.findIndex((comp) => comp.id === c.id)
          return { ...c, order: index }
        }
        return c
      })

      return { components: updatedComponents }
    }),
}))
