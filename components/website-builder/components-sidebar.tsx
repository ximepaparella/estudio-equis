"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ComponentCard } from "./component-card"
import type { ComponentType } from "@/lib/builder-store"

export function ComponentsSidebar() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("layout")

  const layoutComponents: { type: ComponentType; name: string; description: string; icon: string }[] = [
    {
      type: "section",
      name: "Sección",
      description: "Contenedor de ancho completo",
      icon: "Layout",
    },
    {
      type: "container",
      name: "Contenedor",
      description: "Contenedor con ancho máximo",
      icon: "Box",
    },
    {
      type: "columns",
      name: "Columnas",
      description: "Diseño en columnas",
      icon: "Columns",
    },
  ]

  const basicComponents: { type: ComponentType; name: string; description: string; icon: string }[] = [
    {
      type: "heading",
      name: "Encabezado",
      description: "Título o subtítulo",
      icon: "Heading",
    },
    {
      type: "paragraph",
      name: "Párrafo",
      description: "Bloque de texto",
      icon: "Text",
    },
    {
      type: "button",
      name: "Botón",
      description: "Botón de acción",
      icon: "MousePointer",
    },
    {
      type: "image",
      name: "Imagen",
      description: "Imagen o foto",
      icon: "Image",
    },
    {
      type: "divider",
      name: "Divisor",
      description: "Línea horizontal",
      icon: "Minus",
    },
    {
      type: "spacer",
      name: "Espaciador",
      description: "Espacio vertical",
      icon: "ArrowUpDown",
    },
  ]

  const advancedComponents: { type: ComponentType; name: string; description: string; icon: string }[] = [
    {
      type: "hero",
      name: "Hero",
      description: "Sección principal con imagen de fondo",
      icon: "Layout",
    },
    {
      type: "icons-section",
      name: "Sección de iconos",
      description: "Cuadrícula de iconos con texto",
      icon: "Grid",
    },
    {
      type: "pricing",
      name: "Precios",
      description: "Tabla de precios",
      icon: "DollarSign",
    },
    {
      type: "features",
      name: "Características",
      description: "Lista de características",
      icon: "CheckSquare",
    },
    {
      type: "testimonials",
      name: "Testimonios",
      description: "Opiniones de clientes",
      icon: "MessageSquare",
    },
    {
      type: "cta",
      name: "Llamada a la acción",
      description: "Sección de conversión",
      icon: "Zap",
    },
    {
      type: "form",
      name: "Formulario",
      description: "Formulario de contacto",
      icon: "FileText",
    },
  ]

  const filterComponents = (components: any[]) => {
    if (!searchTerm) return components
    return components.filter(
      (component) =>
        component.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        component.description.toLowerCase().includes(searchTerm.toLowerCase()),
    )
  }

  return (
    <div className="w-64 h-full flex flex-col bg-gray-900 border-r border-gray-800">
      <div className="p-4 border-b border-gray-800">
        <h2 className="text-lg font-medium text-white mb-2">Componentes</h2>
        <div className="relative">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            type="text"
            placeholder="Buscar componentes..."
            className="pl-8 bg-gray-800 border-gray-700 text-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
        <TabsList className="bg-gray-900 border-b border-gray-800 p-0 h-auto">
          <TabsTrigger
            value="layout"
            className="data-[state=active]:bg-transparent data-[state=active]:text-purple-400 data-[state=active]:border-b-2 data-[state=active]:border-purple-400 rounded-none px-4 py-2 text-gray-400"
          >
            Layout
          </TabsTrigger>
          <TabsTrigger
            value="basic"
            className="data-[state=active]:bg-transparent data-[state=active]:text-purple-400 data-[state=active]:border-b-2 data-[state=active]:border-purple-400 rounded-none px-4 py-2 text-gray-400"
          >
            Básico
          </TabsTrigger>
          <TabsTrigger
            value="advanced"
            className="data-[state=active]:bg-transparent data-[state=active]:text-purple-400 data-[state=active]:border-b-2 data-[state=active]:border-purple-400 rounded-none px-4 py-2 text-gray-400"
          >
            Avanzado
          </TabsTrigger>
        </TabsList>

        <TabsContent value="layout" className="flex-1 p-4 space-y-2 overflow-y-auto">
          {filterComponents(layoutComponents).map((component) => (
            <ComponentCard
              key={component.type}
              type={component.type}
              name={component.name}
              description={component.description}
              icon={component.icon}
            />
          ))}
        </TabsContent>

        <TabsContent value="basic" className="flex-1 p-4 space-y-2 overflow-y-auto">
          {filterComponents(basicComponents).map((component) => (
            <ComponentCard
              key={component.type}
              type={component.type}
              name={component.name}
              description={component.description}
              icon={component.icon}
            />
          ))}
        </TabsContent>

        <TabsContent value="advanced" className="flex-1 p-4 space-y-2 overflow-y-auto">
          {filterComponents(advancedComponents).map((component) => (
            <ComponentCard
              key={component.type}
              type={component.type}
              name={component.name}
              description={component.description}
              icon={component.icon}
            />
          ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}
