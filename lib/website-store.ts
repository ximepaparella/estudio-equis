import { create } from "zustand"
import { v4 as uuidv4 } from "uuid"

export interface Website {
  id: string
  name: string
  slug: string
  thumbnail: string
  lastEdited: Date
  status: "draft" | "published"
  modules: number
}

interface WebsiteStore {
  websites: Website[]
  selectedWebsite: Website | null

  // Actions
  addWebsite: (website: Omit<Website, "id">) => void
  updateWebsite: (id: string, data: Partial<Website>) => void
  deleteWebsite: (id: string) => void
  selectWebsite: (id: string | null) => void
}

export const useWebsiteStore = create<WebsiteStore>((set) => ({
  websites: [
    {
      id: "1",
      name: "Mi Tienda Online",
      slug: "mi-tienda-online",
      thumbnail: "/placeholder.svg?height=400&width=600",
      lastEdited: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      status: "published",
      modules: 9,
    },
    {
      id: "2",
      name: "Portfolio Personal",
      slug: "portfolio-personal",
      thumbnail: "/placeholder.svg?height=400&width=600",
      lastEdited: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      status: "published",
      modules: 0,
    },
    {
      id: "3",
      name: "Blog de Viajes",
      slug: "blog-de-viajes",
      thumbnail: "/placeholder.svg?height=400&width=600",
      lastEdited: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
      status: "draft",
      modules: 0,
    },
  ],
  selectedWebsite: null,

  addWebsite: (website) =>
    set((state) => ({
      websites: [...state.websites, { ...website, id: uuidv4() }],
    })),

  updateWebsite: (id, data) =>
    set((state) => ({
      websites: state.websites.map((website) => (website.id === id ? { ...website, ...data } : website)),
    })),

  deleteWebsite: (id) =>
    set((state) => ({
      websites: state.websites.filter((website) => website.id !== id),
    })),

  selectWebsite: (id) =>
    set((state) => ({
      selectedWebsite: id ? state.websites.find((website) => website.id === id) || null : null,
    })),
}))
