"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { AlignLeft, AlignCenter, AlignRight, Bold, Italic, Underline } from "lucide-react"
import { useBuilder } from "./builder-context"

export function PropertyPanel() {
  const { components, selectedComponentId, updateComponent } = useBuilder()
  const [activeTab, setActiveTab] = useState("contenido")

  const selectedComponent = selectedComponentId ? components.find((c) => c.id === selectedComponentId) : null

  if (!selectedComponent) {
    return (
      <div className="flex-1 p-6 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-400 mb-2">Selecciona un módulo para editar sus propiedades</p>
        </div>
      </div>
    )
  }

  const handleChange = (key: string, value: any) => {
    updateComponent(selectedComponent.id, { [key]: value })
  }

  return (
    <div className="flex-1 flex flex-col">
      <div className="p-4 border-b border-gray-800">
        <h3 className="text-lg font-medium text-white">Propiedades</h3>
        <p className="text-sm text-gray-400">Editando: {getModuleName(selectedComponent.type)}</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
        <TabsList className="bg-gray-900 border-b border-gray-800 p-0 h-auto">
          <TabsTrigger
            value="contenido"
            className="data-[state=active]:bg-transparent data-[state=active]:text-purple-400 data-[state=active]:border-b-2 data-[state=active]:border-purple-400 rounded-none px-4 py-2 text-gray-400"
          >
            Contenido
          </TabsTrigger>
          <TabsTrigger
            value="estilo"
            className="data-[state=active]:bg-transparent data-[state=active]:text-purple-400 data-[state=active]:border-b-2 data-[state=active]:border-purple-400 rounded-none px-4 py-2 text-gray-400"
          >
            Estilo
          </TabsTrigger>
          <TabsTrigger
            value="avanzado"
            className="data-[state=active]:bg-transparent data-[state=active]:text-purple-400 data-[state=active]:border-b-2 data-[state=active]:border-purple-400 rounded-none px-4 py-2 text-gray-400"
          >
            Avanzado
          </TabsTrigger>
        </TabsList>

        <TabsContent value="contenido" className="flex-1 p-4 space-y-4 overflow-y-auto">
          {renderContentProperties(selectedComponent.type, selectedComponent.props, handleChange)}
        </TabsContent>

        <TabsContent value="estilo" className="flex-1 p-4 space-y-4 overflow-y-auto">
          {renderStyleProperties(selectedComponent.type, selectedComponent.props, handleChange)}
        </TabsContent>

        <TabsContent value="avanzado" className="flex-1 p-4 space-y-4 overflow-y-auto">
          <div className="space-y-4">
            <div>
              <Label htmlFor="custom-class" className="text-white">
                Clase CSS personalizada
              </Label>
              <Input
                id="custom-class"
                className="bg-gray-800 border-gray-700 text-white"
                value={selectedComponent.props.customClass || ""}
                onChange={(e) => handleChange("customClass", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="custom-id" className="text-white">
                ID personalizado
              </Label>
              <Input
                id="custom-id"
                className="bg-gray-800 border-gray-700 text-white"
                value={selectedComponent.props.customId || ""}
                onChange={(e) => handleChange("customId", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="animation" className="text-white">
                Animación
              </Label>
              <Select
                value={selectedComponent.props.animation || "none"}
                onValueChange={(value) => handleChange("animation", value)}
              >
                <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                  <SelectValue placeholder="Ninguna" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700 text-white">
                  <SelectItem value="none">Ninguna</SelectItem>
                  <SelectItem value="fade">Fade In</SelectItem>
                  <SelectItem value="slide">Slide Up</SelectItem>
                  <SelectItem value="zoom">Zoom In</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function getModuleName(moduleType: string): string {
  switch (moduleType) {
    case "hero":
      return "Hero con título e imagen"
    case "icons-section":
      return "Sección con iconos y texto"
    case "background-section":
      return "Sección con fondo"
    case "heading":
      return "Encabezado"
    case "paragraph":
      return "Párrafo"
    case "button":
      return "Botón"
    case "image":
      return "Imagen"
    case "gallery":
      return "Galería"
    case "testimonial":
      return "Testimonio"
    default:
      return "Módulo"
  }
}

function renderContentProperties(type: string, props: any, handleChange: (key: string, value: any) => void) {
  switch (type) {
    case "hero":
      return (
        <div className="space-y-4">
          <div>
            <Label htmlFor="hero-title" className="text-white">
              Título
            </Label>
            <Input
              id="hero-title"
              value={props.title || ""}
              onChange={(e) => handleChange("title", e.target.value)}
              className="bg-gray-800 border-gray-700 text-white"
            />
          </div>
          <div>
            <Label htmlFor="hero-subtitle" className="text-white">
              Subtítulo
            </Label>
            <Textarea
              id="hero-subtitle"
              value={props.subtitle || ""}
              onChange={(e) => handleChange("subtitle", e.target.value)}
              className="bg-gray-800 border-gray-700 text-white"
            />
          </div>
          <div>
            <Label htmlFor="hero-image" className="text-white">
              Imagen de fondo
            </Label>
            <div className="flex items-center gap-2">
              <Input
                id="hero-image"
                value={props.backgroundImage || ""}
                onChange={(e) => handleChange("backgroundImage", e.target.value)}
                className="bg-gray-800 border-gray-700 text-white"
              />
              <Button variant="outline" className="border-gray-700 text-gray-300">
                Subir
              </Button>
            </div>
          </div>
          <div>
            <Label htmlFor="hero-button-text" className="text-white">
              Texto del botón
            </Label>
            <Input
              id="hero-button-text"
              value={props.buttonText || ""}
              onChange={(e) => handleChange("buttonText", e.target.value)}
              className="bg-gray-800 border-gray-700 text-white"
            />
          </div>
          <div>
            <Label htmlFor="hero-button-url" className="text-white">
              URL del botón
            </Label>
            <Input
              id="hero-button-url"
              value={props.buttonUrl || ""}
              onChange={(e) => handleChange("buttonUrl", e.target.value)}
              className="bg-gray-800 border-gray-700 text-white"
            />
          </div>
        </div>
      )
    case "paragraph":
      return (
        <div className="space-y-4">
          <div>
            <Label htmlFor="paragraph-text" className="text-white">
              Texto
            </Label>
            <Textarea
              id="paragraph-text"
              rows={6}
              value={props.text || ""}
              onChange={(e) => handleChange("text", e.target.value)}
              className="bg-gray-800 border-gray-700 text-white"
            />
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className={`border-gray-700 ${props.isBold ? "bg-gray-700" : ""} text-gray-300`}
              onClick={() => handleChange("isBold", !props.isBold)}
            >
              <Bold className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className={`border-gray-700 ${props.isItalic ? "bg-gray-700" : ""} text-gray-300`}
              onClick={() => handleChange("isItalic", !props.isItalic)}
            >
              <Italic className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className={`border-gray-700 ${props.isUnderline ? "bg-gray-700" : ""} text-gray-300`}
              onClick={() => handleChange("isUnderline", !props.isUnderline)}
            >
              <Underline className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className={`border-gray-700 ${props.alignment === "left" ? "bg-gray-700" : ""} text-gray-300`}
              onClick={() => handleChange("alignment", "left")}
            >
              <AlignLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className={`border-gray-700 ${props.alignment === "center" ? "bg-gray-700" : ""} text-gray-300`}
              onClick={() => handleChange("alignment", "center")}
            >
              <AlignCenter className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className={`border-gray-700 ${props.alignment === "right" ? "bg-gray-700" : ""} text-gray-300`}
              onClick={() => handleChange("alignment", "right")}
            >
              <AlignRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )
    case "button":
      return (
        <div className="space-y-4">
          <div>
            <Label htmlFor="button-text" className="text-white">
              Texto
            </Label>
            <Input
              id="button-text"
              value={props.text || ""}
              onChange={(e) => handleChange("text", e.target.value)}
              className="bg-gray-800 border-gray-700 text-white"
            />
          </div>
          <div>
            <Label htmlFor="button-url" className="text-white">
              URL
            </Label>
            <Input
              id="button-url"
              value={props.url || ""}
              onChange={(e) => handleChange("url", e.target.value)}
              className="bg-gray-800 border-gray-700 text-white"
            />
          </div>
          <div>
            <Label htmlFor="button-type" className="text-white">
              Tipo
            </Label>
            <Select value={props.variant || "primary"} onValueChange={(value) => handleChange("variant", value)}>
              <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                <SelectValue placeholder="Primario" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700 text-white">
                <SelectItem value="primary">Primario</SelectItem>
                <SelectItem value="secondary">Secundario</SelectItem>
                <SelectItem value="outline">Contorno</SelectItem>
                <SelectItem value="ghost">Fantasma</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="button-size" className="text-white">
              Tamaño
            </Label>
            <Select value={props.size || "md"} onValueChange={(value) => handleChange("size", value)}>
              <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                <SelectValue placeholder="Mediano" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700 text-white">
                <SelectItem value="sm">Pequeño</SelectItem>
                <SelectItem value="md">Mediano</SelectItem>
                <SelectItem value="lg">Grande</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="button-alignment" className="text-white">
              Alineación
            </Label>
            <div className="flex items-center gap-2 mt-2">
              <Button
                variant="outline"
                size="icon"
                className={`border-gray-700 ${props.alignment === "left" ? "bg-gray-700" : ""} text-gray-300`}
                onClick={() => handleChange("alignment", "left")}
              >
                <AlignLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className={`border-gray-700 ${props.alignment === "center" ? "bg-gray-700" : ""} text-gray-300`}
                onClick={() => handleChange("alignment", "center")}
              >
                <AlignCenter className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className={`border-gray-700 ${props.alignment === "right" ? "bg-gray-700" : ""} text-gray-300`}
                onClick={() => handleChange("alignment", "right")}
              >
                <AlignRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )
    default:
      return (
        <div className="space-y-4">
          <div>
            <Label htmlFor="title" className="text-white">
              Título
            </Label>
            <Input
              id="title"
              value={props.title || ""}
              onChange={(e) => handleChange("title", e.target.value)}
              className="bg-gray-800 border-gray-700 text-white"
            />
          </div>
          <div>
            <Label htmlFor="description" className="text-white">
              Descripción
            </Label>
            <Textarea
              id="description"
              value={props.description || ""}
              onChange={(e) => handleChange("description", e.target.value)}
              className="bg-gray-800 border-gray-700 text-white"
            />
          </div>
        </div>
      )
  }
}

function renderStyleProperties(type: string, props: any, handleChange: (key: string, value: any) => void) {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="background-color" className="text-white">
          Color de fondo
        </Label>
        <div className="flex items-center gap-2">
          <div
            className="w-8 h-8 rounded border border-gray-700"
            style={{ backgroundColor: props.backgroundColor || "#111111" }}
          ></div>
          <Input
            id="background-color"
            value={props.backgroundColor || "#111111"}
            onChange={(e) => handleChange("backgroundColor", e.target.value)}
            className="bg-gray-800 border-gray-700 text-white"
          />
        </div>
      </div>
      <div>
        <Label htmlFor="text-color" className="text-white">
          Color de texto
        </Label>
        <div className="flex items-center gap-2">
          <div
            className="w-8 h-8 rounded border border-gray-700"
            style={{ backgroundColor: props.textColor || "#FFFFFF" }}
          ></div>
          <Input
            id="text-color"
            value={props.textColor || "#FFFFFF"}
            onChange={(e) => handleChange("textColor", e.target.value)}
            className="bg-gray-800 border-gray-700 text-white"
          />
        </div>
      </div>
      <div>
        <Label htmlFor="padding" className="text-white">
          Espaciado (padding)
        </Label>
        <div className="grid grid-cols-4 gap-2">
          <div>
            <Label htmlFor="padding-top" className="text-xs text-gray-400">
              Superior
            </Label>
            <Input
              id="padding-top"
              value={props.paddingTop || "16"}
              onChange={(e) => handleChange("paddingTop", e.target.value)}
              className="bg-gray-800 border-gray-700 text-white"
            />
          </div>
          <div>
            <Label htmlFor="padding-right" className="text-xs text-gray-400">
              Derecho
            </Label>
            <Input
              id="padding-right"
              value={props.paddingRight || "16"}
              onChange={(e) => handleChange("paddingRight", e.target.value)}
              className="bg-gray-800 border-gray-700 text-white"
            />
          </div>
          <div>
            <Label htmlFor="padding-bottom" className="text-xs text-gray-400">
              Inferior
            </Label>
            <Input
              id="padding-bottom"
              value={props.paddingBottom || "16"}
              onChange={(e) => handleChange("paddingBottom", e.target.value)}
              className="bg-gray-800 border-gray-700 text-white"
            />
          </div>
          <div>
            <Label htmlFor="padding-left" className="text-xs text-gray-400">
              Izquierdo
            </Label>
            <Input
              id="padding-left"
              value={props.paddingLeft || "16"}
              onChange={(e) => handleChange("paddingLeft", e.target.value)}
              className="bg-gray-800 border-gray-700 text-white"
            />
          </div>
        </div>
      </div>
      <div>
        <Label htmlFor="margin" className="text-white">
          Margen
        </Label>
        <div className="grid grid-cols-4 gap-2">
          <div>
            <Label htmlFor="margin-top" className="text-xs text-gray-400">
              Superior
            </Label>
            <Input
              id="margin-top"
              value={props.marginTop || "0"}
              onChange={(e) => handleChange("marginTop", e.target.value)}
              className="bg-gray-800 border-gray-700 text-white"
            />
          </div>
          <div>
            <Label htmlFor="margin-right" className="text-xs text-gray-400">
              Derecho
            </Label>
            <Input
              id="margin-right"
              value={props.marginRight || "0"}
              onChange={(e) => handleChange("marginRight", e.target.value)}
              className="bg-gray-800 border-gray-700 text-white"
            />
          </div>
          <div>
            <Label htmlFor="margin-bottom" className="text-xs text-gray-400">
              Inferior
            </Label>
            <Input
              id="margin-bottom"
              value={props.marginBottom || "0"}
              onChange={(e) => handleChange("marginBottom", e.target.value)}
              className="bg-gray-800 border-gray-700 text-white"
            />
          </div>
          <div>
            <Label htmlFor="margin-left" className="text-xs text-gray-400">
              Izquierdo
            </Label>
            <Input
              id="margin-left"
              value={props.marginLeft || "0"}
              onChange={(e) => handleChange("marginLeft", e.target.value)}
              className="bg-gray-800 border-gray-700 text-white"
            />
          </div>
        </div>
      </div>
      <div>
        <Label htmlFor="border-radius" className="text-white">
          Radio de borde
        </Label>
        <Input
          id="border-radius"
          value={props.borderRadius || "4"}
          onChange={(e) => handleChange("borderRadius", e.target.value)}
          className="bg-gray-800 border-gray-700 text-white"
        />
      </div>
    </div>
  )
}
