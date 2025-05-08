"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ComponentCard } from "./component-card"
import type { ComponentType } from "@/lib/builder-store"

export function ComponentsSidebar() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("all")

  const componentTypes: { id: ComponentType; title: string; description: string; icon: string; category: string }[] = [
    {
      id: "hero",
      title: "Hero con título e imagen",
      description: "Sección principal con título",
      icon: "Layers",
      category: "sections",
    },
    {
      id: "icons-section",
      title: "Sección con iconos y texto",
      description: "Muestra características o servicios",
      icon: "Layers",
      category: "sections",
    },
    {
      id: "background-section",
      title: "Sección con fondo",
      description: "Sección con fondo personalizado",
      icon: "Layers",
      category: "sections",
    },
    {
      id: "heading",
      title: "Encabezado",
      description: "Título o encabezado de sección",
      icon: "Type",
      category: "basics",
    },
    {
      id: "paragraph",
      title: "Párrafo",
      description: "Bloque de texto",
      icon: "Type",
      category: "basics",
    },
    {
      id: "button",
      title: "Botón",
      description: "Botón con diferentes estilos",
      icon: "Square",
      category: "basics",
    },
    {
      id: "image",
      title: "Imagen",
      description: "Imagen con opciones",
      icon: "Image",
      category: "media",
    },
    {
      id: "gallery",
      title: "Galería",
      description: "Colección de imágenes",
      icon: "Grid",
      category: "media",
    },
    {
      id: "testimonial",
      title: "Testimonial",
      description: "Cita de cliente",
      icon: "MessageSquare",
      category: "content",
    },
    {
      id: "divider",
      title: "Divisor",
      description: "Línea divisoria",
      icon: "Minus",
      category: "basics",
    },
    {
      id: "spacer",
      title: "Espaciador",
      description: "Espacio vertical entre elementos",
      icon: "ArrowUpDown",
      category: "basics",
    },
  ]

  const filteredComponents = componentTypes.filter(
    (component) =>
      (activeCategory === "all" || component.category === activeCategory) &&
      (searchQuery === "" ||
        component.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        component.description.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  return (
    <div className="w-full h-full flex flex-col bg-gray-900 border-r border-gray-800">
      <div className="p-4 border-b border-gray-800">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            type="search"
            placeholder="Buscar componentes..."
            className="pl-8 bg-gray-800 border-gray-700 text-white"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="flex border-b border-gray-800">
        <Button
          variant="ghost"
          className={`flex-1 rounded-none ${
            activeCategory === "all" ? "text-white border-b-2 border-purple-500" : "text-gray-400"
          }`}
          onClick={() => setActiveCategory("all")}
        >
          Todos
        </Button>
        <Button
          variant="ghost"
          className={`flex-1 rounded-none ${
            activeCategory === "sections" ? "text-white border-b-2 border-purple-500" : "text-gray-400"
          }`}
          onClick={() => setActiveCategory("sections")}
        >
          Secciones
        </Button>
        <Button
          variant="ghost"
          className={`flex-1 rounded-none ${
            activeCategory === "basics" ? "text-white border-b-2 border-purple-500" : "text-gray-400"
          }`}
          onClick={() => setActiveCategory("basics")}
        >
          Básicos
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-white">Componentes</h3>
          <span className="text-xs bg-gray-800 text-gray-400 px-2 py-1 rounded-full">
            {filteredComponents.length} items
          </span>
        </div>

        {filteredComponents.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-400">No se encontraron componentes</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredComponents.map((component) => (
              <ComponentCard
                key={component.id}
                type={component.id}
                title={component.title}
                description={component.description}
                icon={component.icon}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
