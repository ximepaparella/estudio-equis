import { create } from "zustand"
import { v4 as uuidv4 } from "uuid"

export type ComponentType =
  | "hero"
  | "paragraph"
  | "heading"
  | "button"
  | "image"
  | "icons-section"
  | "background-section"
  | "gallery"
  | "testimonial"

export interface Component {
  id: string
  type: ComponentType
  props: Record<string, any>
  order: number
}

interface BuilderStore {
  components: Component[]
  selectedId: string | null
  deviceView: "desktop" | "tablet" | "mobile"

  // Actions
  addComponent: (type: ComponentType) => void
  removeComponent: (id: string) => void
  selectComponent: (id: string | null) => void
  updateComponent: (id: string, props: Record<string, any>) => void
  moveComponent: (id: string, direction: "up" | "down") => void
  duplicateComponent: (id: string) => void
  setDeviceView: (view: "desktop" | "tablet" | "mobile") => void
}

// Default props for each component type
const defaultProps: Record<ComponentType, Record<string, any>> = {
  hero: {
    title: "Bienvenidos a Mi Tienda",
    subtitle: "Los mejores productos para tu hogar",
    buttonText: "Comprar Ahora",
    buttonUrl: "#",
    backgroundImage: "",
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
    text: "Click Here",
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
}

export const useBuilderStore = create<BuilderStore>((set) => ({
  components: [],
  selectedId: null,
  deviceView: "desktop",

  addComponent: (type) =>
    set((state) => {
      const newComponent: Component = {
        id: uuidv4(),
        type,
        props: { ...defaultProps[type] },
        order: state.components.length,
      }

      return {
        components: [...state.components, newComponent],
        selectedId: newComponent.id,
      }
    }),

  removeComponent: (id) =>
    set((state) => ({
      components: state.components.filter((c) => c.id !== id),
      selectedId: state.selectedId === id ? null : state.selectedId,
    })),

  selectComponent: (id) => set({ selectedId: id }),

  updateComponent: (id, props) =>
    set((state) => ({
      components: state.components.map((c) => (c.id === id ? { ...c, props: { ...c.props, ...props } } : c)),
    })),

  moveComponent: (id, direction) =>
    set((state) => {
      const index = state.components.findIndex((c) => c.id === id)
      if (index === -1) return state

      const newIndex = direction === "up" ? Math.max(0, index - 1) : Math.min(state.components.length - 1, index + 1)

      if (index === newIndex) return state

      const newComponents = [...state.components]
      const [removed] = newComponents.splice(index, 1)
      newComponents.splice(newIndex, 0, removed)

      // Update order property
      const updatedComponents = newComponents.map((c, i) => ({
        ...c,
        order: i,
      }))

      return { components: updatedComponents }
    }),

  duplicateComponent: (id) =>
    set((state) => {
      const component = state.components.find((c) => c.id === id)
      if (!component) return state

      const newComponent: Component = {
        ...component,
        id: uuidv4(),
        order: state.components.length,
      }

      return {
        components: [...state.components, newComponent],
        selectedId: newComponent.id,
      }
    }),

  setDeviceView: (deviceView) => set({ deviceView }),
}))
