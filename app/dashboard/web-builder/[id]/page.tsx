"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Monitor, Tablet, Smartphone, Search, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useBuilderStore } from "@/lib/builder-store"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import { ComponentRenderer } from "@/components/web-builder/component-renderer"

// Component types for the sidebar
const componentCategories = [
  {
    name: "Todos",
    components: [
      { id: "hero", name: "Hero con título e imagen", description: "Sección principal con título e imagen" },
      { id: "icons-section", name: "Sección con iconos y texto", description: "Muestra características o servicios" },
      { id: "background-section", name: "Sección con fondo", description: "Sección con fondo personalizado" },
      { id: "heading", name: "Encabezado", description: "Título o encabezado de sección" },
      { id: "paragraph", name: "Párrafo", description: "Bloque de texto" },
      { id: "button", name: "Botón", description: "Botón clickeable" },
      { id: "image", name: "Imagen", description: "Imagen única" },
      { id: "gallery", name: "Galería", description: "Colección de imágenes" },
      { id: "testimonial", name: "Testimonial", description: "Cita de cliente" },
    ],
  },
  {
    name: "Secciones",
    components: [
      { id: "hero", name: "Hero con título e imagen", description: "Sección principal con título e imagen" },
      { id: "icons-section", name: "Sección con iconos y texto", description: "Muestra características o servicios" },
      { id: "background-section", name: "Sección con fondo", description: "Sección con fondo personalizado" },
    ],
  },
  {
    name: "Básicos",
    components: [
      { id: "heading", name: "Encabezado", description: "Título o encabezado de sección" },
      { id: "paragraph", name: "Párrafo", description: "Bloque de texto" },
      { id: "button", name: "Botón", description: "Botón clickeable" },
      { id: "image", name: "Imagen", description: "Imagen única" },
    ],
  },
]

export default function WebBuilderEditorPage({ params }: { params: { id: string } }) {
  const { components, selectedId, deviceView, setDeviceView, selectComponent, addComponent } = useBuilderStore()
  const [activeCategory, setActiveCategory] = useState("Todos")

  // Get the selected component
  const selectedComponent = components.find((c) => c.id === selectedId)

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="fixed inset-0 bg-[#0F172A] flex flex-col">
        {/* Top Navigation */}
        <header className="h-14 border-b border-gray-800 bg-[#0F172A] flex items-center justify-between px-4">
          <div className="flex items-center space-x-2">
            <Link href="/dashboard/web-builder">
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div className="flex items-center">
              <span className="font-semibold text-white">Visual Site</span>
              <span className="mx-2 text-gray-500">/</span>
              <span className="text-gray-400">My Sites</span>
              <span className="mx-2 text-gray-500">/</span>
              <span className="text-gray-400">Mi Tienda Online</span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {/* Device Preview Buttons */}
            <div className="flex items-center border border-gray-700 rounded-md overflow-hidden">
              <Button
                variant="ghost"
                size="sm"
                className={`rounded-none h-8 px-2 ${deviceView === "desktop" ? "bg-gray-800 text-white" : "text-gray-400"}`}
                onClick={() => setDeviceView("desktop")}
              >
                <Monitor className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className={`rounded-none h-8 px-2 ${deviceView === "tablet" ? "bg-gray-800 text-white" : "text-gray-400"}`}
                onClick={() => setDeviceView("tablet")}
              >
                <Tablet className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className={`rounded-none h-8 px-2 ${deviceView === "mobile" ? "bg-gray-800 text-white" : "text-gray-400"}`}
                onClick={() => setDeviceView("mobile")}
              >
                <Smartphone className="h-4 w-4" />
              </Button>
            </div>

            {/* Action Buttons */}
            <Button variant="outline" size="sm" className="border-gray-700 text-gray-300">
              Save
            </Button>
            <Button variant="outline" size="sm" className="border-gray-700 text-gray-300">
              Preview
            </Button>
            <Button className="bg-purple-600 hover:bg-purple-700 text-white">Publish</Button>
          </div>
        </header>

        {/* Main Content - 3 Column Layout */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left Sidebar - Components */}
          <div className="w-64 bg-[#0F172A] border-r border-gray-800 flex flex-col">
            <div className="p-4">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                <Input
                  type="search"
                  placeholder="Buscar componentes..."
                  className="pl-8 bg-gray-800 border-gray-700 text-white"
                />
              </div>
            </div>

            <div className="flex border-b border-gray-800">
              {["Todos", "Secciones", "Básicos"].map((category) => (
                <Button
                  key={category}
                  variant="ghost"
                  className={`flex-1 rounded-none text-sm ${
                    activeCategory === category ? "text-white border-b-2 border-purple-500" : "text-gray-400"
                  }`}
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-white">Componentes</h3>
                <div className="flex items-center">
                  <span className="text-xs bg-purple-100 text-purple-800 px-2 py-0.5 rounded-full">Premium</span>
                </div>
              </div>

              <div className="space-y-4">
                {componentCategories
                  .find((cat) => cat.name === activeCategory)
                  ?.components.map((component) => (
                    <div
                      key={component.id + component.name}
                      className="group relative bg-gray-800 rounded-lg p-4 cursor-pointer hover:bg-gray-700 transition-colors"
                      onClick={() => addComponent(component.id as any)}
                    >
                      <div className="flex items-start">
                        <div className="h-10 w-10 rounded-lg bg-purple-100 flex items-center justify-center mr-3">
                          <div className="h-6 w-6 bg-purple-500 rounded-md"></div>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-white">{component.name}</h4>
                          <p className="text-xs text-gray-400 mt-1">{component.description}</p>
                        </div>
                      </div>
                      <button className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Plus className="h-4 w-4 text-gray-400" />
                      </button>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          {/* Center - Canvas */}
          <div className="flex-1 bg-[#0F172A] overflow-auto">
            <div className="min-h-full p-8 flex justify-center">
              <div
                className={`w-full ${
                  deviceView === "mobile" ? "max-w-sm" : deviceView === "tablet" ? "max-w-2xl" : "max-w-6xl"
                } bg-white rounded-lg min-h-[500px] transition-all duration-300`}
              >
                {components.length === 0 ? (
                  <div className="h-full flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-8">
                    <div className="text-center">
                      <p className="text-gray-500">Drag and drop components here</p>
                    </div>
                  </div>
                ) : (
                  <div className="relative">
                    {components
                      .sort((a, b) => a.order - b.order)
                      .map((component) => (
                        <div
                          key={component.id}
                          className={`relative ${selectedId === component.id ? "ring-2 ring-purple-500" : ""}`}
                          onClick={(e) => {
                            e.stopPropagation()
                            selectComponent(component.id)
                          }}
                        >
                          <ComponentRenderer component={component} />
                        </div>
                      ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Sidebar - Properties */}
          <div className="w-80 bg-[#0F172A] border-l border-gray-800 flex flex-col">
            <div className="p-4 border-b border-gray-800">
              <h3 className="text-lg font-medium text-white">Propiedades</h3>
              <p className="text-sm text-gray-400">
                {selectedComponent
                  ? "Edita las propiedades del componente seleccionado"
                  : "Selecciona un componente para editar sus propiedades"}
              </p>
            </div>

            {selectedComponent ? (
              <div className="flex-1 overflow-y-auto p-4">
                <Tabs defaultValue="content">
                  <TabsList className="grid w-full grid-cols-3 bg-gray-800">
                    <TabsTrigger value="content">Contenido</TabsTrigger>
                    <TabsTrigger value="style">Estilo</TabsTrigger>
                    <TabsTrigger value="advanced">Avanzado</TabsTrigger>
                  </TabsList>
                  <TabsContent value="content" className="mt-4 space-y-4">
                    {/* Dynamic content based on component type */}
                    {selectedComponent.type === "hero" && (
                      <>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-white">Título</label>
                          <Input
                            value={selectedComponent.props.title || ""}
                            className="bg-gray-800 border-gray-700 text-white"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-white">Subtítulo</label>
                          <Input
                            value={selectedComponent.props.subtitle || ""}
                            className="bg-gray-800 border-gray-700 text-white"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-white">Texto del botón</label>
                          <Input
                            value={selectedComponent.props.buttonText || ""}
                            className="bg-gray-800 border-gray-700 text-white"
                          />
                        </div>
                      </>
                    )}
                    {selectedComponent.type === "heading" && (
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-white">Texto</label>
                        <Input
                          value={selectedComponent.props.text || ""}
                          className="bg-gray-800 border-gray-700 text-white"
                        />
                      </div>
                    )}
                    {selectedComponent.type === "paragraph" && (
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-white">Texto</label>
                        <textarea
                          value={selectedComponent.props.text || ""}
                          className="w-full h-32 bg-gray-800 border border-gray-700 rounded-md p-2 text-white"
                        />
                      </div>
                    )}
                  </TabsContent>
                  <TabsContent value="style" className="mt-4">
                    <p className="text-sm text-gray-400">Opciones de estilo para este componente</p>
                  </TabsContent>
                  <TabsContent value="advanced" className="mt-4">
                    <p className="text-sm text-gray-400">Configuración avanzada</p>
                  </TabsContent>
                </Tabs>
              </div>
            ) : (
              <div className="flex-1 flex items-center justify-center p-4">
                <div className="text-center">
                  <p className="text-gray-400">Sin selección</p>
                  <p className="text-sm text-gray-500 mt-2">
                    Selecciona un módulo del canvas para editar sus propiedades
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </DndProvider>
  )
}
