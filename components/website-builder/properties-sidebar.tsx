"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { AlignLeft, AlignCenter, AlignRight, Bold, Italic, Underline } from "lucide-react"
import { useBuilderStore } from "@/lib/builder-store"

export function PropertiesSidebar() {
  const { components, selectedId, updateComponent } = useBuilderStore()
  const [activeTab, setActiveTab] = useState("content")

  const selectedComponent = selectedId ? components.find((c) => c.id === selectedId) : null

  if (!selectedComponent) {
    return (
      <div className="flex-1 p-6 flex items-center justify-center">
        <div className="text-center">
          <h3 className="text-lg font-medium text-white mb-2">Propiedades</h3>
          <p className="text-gray-400">Selecciona un componente para editar sus propiedades</p>
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
        <p className="text-sm text-gray-400">Editando: {getComponentName(selectedComponent.type)}</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
        <TabsList className="bg-gray-900 border-b border-gray-800 p-0 h-auto">
          <TabsTrigger
            value="content"
            className="data-[state=active]:bg-transparent data-[state=active]:text-purple-400 data-[state=active]:border-b-2 data-[state=active]:border-purple-400 rounded-none px-4 py-2 text-gray-400"
          >
            Contenido
          </TabsTrigger>
          <TabsTrigger
            value="style"
            className="data-[state=active]:bg-transparent data-[state=active]:text-purple-400 data-[state=active]:border-b-2 data-[state=active]:border-purple-400 rounded-none px-4 py-2 text-gray-400"
          >
            Estilo
          </TabsTrigger>
          <TabsTrigger
            value="advanced"
            className="data-[state=active]:bg-transparent data-[state=active]:text-purple-400 data-[state=active]:border-b-2 data-[state=active]:border-purple-400 rounded-none px-4 py-2 text-gray-400"
          >
            Avanzado
          </TabsTrigger>
        </TabsList>

        <TabsContent value="content" className="flex-1 p-4 space-y-4 overflow-y-auto">
          {renderContentProperties(selectedComponent.type, selectedComponent.props, handleChange)}
        </TabsContent>

        <TabsContent value="style" className="flex-1 p-4 space-y-4 overflow-y-auto">
          {renderStyleProperties(selectedComponent.type, selectedComponent.props, handleChange)}
        </TabsContent>

        <TabsContent value="advanced" className="flex-1 p-4 space-y-4 overflow-y-auto">
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
                placeholder="Ej: my-custom-class"
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
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="sombra" className="text-white">
                  Sombra
                </Label>
                <Switch
                  id="sombra"
                  checked={selectedComponent.props.hasShadow || false}
                  onCheckedChange={(checked) => handleChange("hasShadow", checked)}
                />
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function getComponentName(componentType: string): string {
  switch (componentType) {
    case "hero":
      return "Hero con título e imagen"
    case "icons-section":
      return "Sección con iconos"
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
      return "Testimonial"
    case "divider":
      return "Divisor"
    case "spacer":
      return "Espaciador"
    default:
      return "Componente"
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
                Cambiar
              </Button>
            </div>
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
          </div>
        </div>
      )
    case "heading":
      return (
        <div className="space-y-4">
          <div>
            <Label htmlFor="heading-text" className="text-white">
              Texto
            </Label>
            <Input
              id="heading-text"
              value={props.text || ""}
              onChange={(e) => handleChange("text", e.target.value)}
              className="bg-gray-800 border-gray-700 text-white"
            />
          </div>
          <div>
            <Label htmlFor="heading-level" className="text-white">
              Nivel
            </Label>
            <Select value={props.level || "h2"} onValueChange={(value) => handleChange("level", value)}>
              <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                <SelectValue placeholder="h2" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700 text-white">
                <SelectItem value="h1">H1</SelectItem>
                <SelectItem value="h2">H2</SelectItem>
                <SelectItem value="h3">H3</SelectItem>
                <SelectItem value="h4">H4</SelectItem>
              </SelectContent>
            </Select>
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
    <div className="space-y-6">
      <div className="space-y-4">
        <Label className="text-white">Alineación</Label>
        <div className="flex items-center gap-2">
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

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="padding" className="text-white">
            Padding (px)
          </Label>
          <span className="text-sm text-white">{props.padding || 24}</span>
        </div>
        <Slider
          id="padding"
          min={0}
          max={100}
          step={1}
          value={[props.padding || 24]}
          onValueChange={(value) => handleChange("padding", value[0])}
          className="py-4"
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="margin" className="text-white">
            Margin (px)
          </Label>
          <span className="text-sm text-white">{props.margin || 16}</span>
        </div>
        <Slider
          id="margin"
          min={0}
          max={100}
          step={1}
          value={[props.margin || 16]}
          onValueChange={(value) => handleChange("margin", value[0])}
          className="py-4"
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="border-radius" className="text-white">
            Border Radius (px)
          </Label>
          <span className="text-sm text-white">{props.borderRadius || 8}</span>
        </div>
        <Slider
          id="border-radius"
          min={0}
          max={50}
          step={1}
          value={[props.borderRadius || 8]}
          onValueChange={(value) => handleChange("borderRadius", value[0])}
          className="py-4"
        />
      </div>

      <div>
        <Label htmlFor="background-color" className="text-white">
          Color de fondo
        </Label>
        <div className="flex items-center gap-2 mt-2">
          <div
            className="w-8 h-8 rounded border border-gray-700"
            style={{ backgroundColor: props.backgroundColor || "#ffffff" }}
          ></div>
          <Input
            id="background-color"
            value={props.backgroundColor || "#ffffff"}
            onChange={(e) => handleChange("backgroundColor", e.target.value)}
            className="bg-gray-800 border-gray-700 text-white"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="text-color" className="text-white">
          Color de texto
        </Label>
        <div className="flex items-center gap-2 mt-2">
          <div
            className="w-8 h-8 rounded border border-gray-700"
            style={{ backgroundColor: props.textColor || "#000000" }}
          ></div>
          <Input
            id="text-color"
            value={props.textColor || "#000000"}
            onChange={(e) => handleChange("textColor", e.target.value)}
            className="bg-gray-800 border-gray-700 text-white"
          />
        </div>
      </div>
    </div>
  )
}
