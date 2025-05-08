"use client"

import { useState } from "react"
import { ChevronRight, X } from "lucide-react"
import { useBuilderStore } from "@/lib/builder-store"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function PropertiesSidebar() {
  const { components, selectedId, updateComponent, selectComponent } = useBuilderStore()
  const [isCollapsed, setIsCollapsed] = useState(false)

  const selectedComponent = components.find((c) => c.id === selectedId)

  if (isCollapsed) {
    return (
      <div className="w-10 h-full flex flex-col items-center bg-gray-900 border-l border-gray-800">
        <Button
          variant="ghost"
          size="icon"
          className="mt-4 text-gray-400 hover:text-white"
          onClick={() => setIsCollapsed(false)}
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>
    )
  }

  if (!selectedComponent) {
    return (
      <div className="w-full h-full flex flex-col bg-gray-900 border-l border-gray-800">
        <div className="flex justify-between items-center p-4 border-b border-gray-800">
          <h2 className="text-sm font-medium text-white">Propiedades</h2>
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-400 hover:text-white"
            onClick={() => setIsCollapsed(true)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex-1 p-8 flex items-center justify-center text-center">
          <div>
            <p className="text-gray-400 mb-2">Selecciona un componente para editar sus propiedades</p>
          </div>
        </div>
      </div>
    )
  }

  const renderPropertyControls = () => {
    const { type, props } = selectedComponent

    switch (type) {
      case "hero":
        return (
          <>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Título</Label>
                <Input
                  id="title"
                  value={props.title || ""}
                  onChange={(e) => updateComponent(selectedId, { title: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="subtitle">Subtítulo</Label>
                <Input
                  id="subtitle"
                  value={props.subtitle || ""}
                  onChange={(e) => updateComponent(selectedId, { subtitle: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="buttonText">Texto del botón</Label>
                <Input
                  id="buttonText"
                  value={props.buttonText || ""}
                  onChange={(e) => updateComponent(selectedId, { buttonText: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="buttonUrl">URL del botón</Label>
                <Input
                  id="buttonUrl"
                  value={props.buttonUrl || ""}
                  onChange={(e) => updateComponent(selectedId, { buttonUrl: e.target.value })}
                />
              </div>
            </div>
          </>
        )

      case "heading":
        return (
          <>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="text">Texto</Label>
                <Input
                  id="text"
                  value={props.text || ""}
                  onChange={(e) => updateComponent(selectedId, { text: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="level">Nivel</Label>
                <Select
                  value={props.level || "h2"}
                  onValueChange={(value) => updateComponent(selectedId, { level: value })}
                >
                  <SelectTrigger id="level">
                    <SelectValue placeholder="Seleccionar nivel" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="h1">H1</SelectItem>
                    <SelectItem value="h2">H2</SelectItem>
                    <SelectItem value="h3">H3</SelectItem>
                    <SelectItem value="h4">H4</SelectItem>
                    <SelectItem value="h5">H5</SelectItem>
                    <SelectItem value="h6">H6</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="alignment">Alineación</Label>
                <Select
                  value={props.alignment || "left"}
                  onValueChange={(value) => updateComponent(selectedId, { alignment: value })}
                >
                  <SelectTrigger id="alignment">
                    <SelectValue placeholder="Seleccionar alineación" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="left">Izquierda</SelectItem>
                    <SelectItem value="center">Centro</SelectItem>
                    <SelectItem value="right">Derecha</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="color">Color</Label>
                <div className="flex">
                  <Input
                    id="color"
                    type="color"
                    className="w-12 p-1 h-10"
                    value={props.color || "#111111"}
                    onChange={(e) => updateComponent(selectedId, { color: e.target.value })}
                  />
                  <Input
                    type="text"
                    className="flex-1 ml-2"
                    value={props.color || "#111111"}
                    onChange={(e) => updateComponent(selectedId, { color: e.target.value })}
                  />
                </div>
              </div>
            </div>
          </>
        )

      case "paragraph":
        return (
          <>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="text">Texto</Label>
                <Textarea
                  id="text"
                  rows={5}
                  value={props.text || ""}
                  onChange={(e) => updateComponent(selectedId, { text: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="alignment">Alineación</Label>
                <Select
                  value={props.alignment || "left"}
                  onValueChange={(value) => updateComponent(selectedId, { alignment: value })}
                >
                  <SelectTrigger id="alignment">
                    <SelectValue placeholder="Seleccionar alineación" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="left">Izquierda</SelectItem>
                    <SelectItem value="center">Centro</SelectItem>
                    <SelectItem value="right">Derecha</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="color">Color</Label>
                <div className="flex">
                  <Input
                    id="color"
                    type="color"
                    className="w-12 p-1 h-10"
                    value={props.color || "#333333"}
                    onChange={(e) => updateComponent(selectedId, { color: e.target.value })}
                  />
                  <Input
                    type="text"
                    className="flex-1 ml-2"
                    value={props.color || "#333333"}
                    onChange={(e) => updateComponent(selectedId, { color: e.target.value })}
                  />
                </div>
              </div>
            </div>
          </>
        )

      case "button":
        return (
          <>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="text">Texto</Label>
                <Input
                  id="text"
                  value={props.text || ""}
                  onChange={(e) => updateComponent(selectedId, { text: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="url">URL</Label>
                <Input
                  id="url"
                  value={props.url || ""}
                  onChange={(e) => updateComponent(selectedId, { url: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="variant">Variante</Label>
                <Select
                  value={props.variant || "primary"}
                  onValueChange={(value) => updateComponent(selectedId, { variant: value })}
                >
                  <SelectTrigger id="variant">
                    <SelectValue placeholder="Seleccionar variante" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="primary">Primario</SelectItem>
                    <SelectItem value="secondary">Secundario</SelectItem>
                    <SelectItem value="outline">Contorno</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="size">Tamaño</Label>
                <Select
                  value={props.size || "md"}
                  onValueChange={(value) => updateComponent(selectedId, { size: value })}
                >
                  <SelectTrigger id="size">
                    <SelectValue placeholder="Seleccionar tamaño" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sm">Pequeño</SelectItem>
                    <SelectItem value="md">Mediano</SelectItem>
                    <SelectItem value="lg">Grande</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="alignment">Alineación</Label>
                <Select
                  value={props.alignment || "center"}
                  onValueChange={(value) => updateComponent(selectedId, { alignment: value })}
                >
                  <SelectTrigger id="alignment">
                    <SelectValue placeholder="Seleccionar alineación" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="left">Izquierda</SelectItem>
                    <SelectItem value="center">Centro</SelectItem>
                    <SelectItem value="right">Derecha</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </>
        )

      case "image":
        return (
          <>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="src">URL de la imagen</Label>
                <Input
                  id="src"
                  value={props.src || ""}
                  onChange={(e) => updateComponent(selectedId, { src: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="alt">Texto alternativo</Label>
                <Input
                  id="alt"
                  value={props.alt || ""}
                  onChange={(e) => updateComponent(selectedId, { alt: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="width">Ancho</Label>
                <Input
                  id="width"
                  value={props.width || "100%"}
                  onChange={(e) => updateComponent(selectedId, { width: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="height">Alto</Label>
                <Input
                  id="height"
                  value={props.height || "auto"}
                  onChange={(e) => updateComponent(selectedId, { height: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="alignment">Alineación</Label>
                <Select
                  value={props.alignment || "center"}
                  onValueChange={(value) => updateComponent(selectedId, { alignment: value })}
                >
                  <SelectTrigger id="alignment">
                    <SelectValue placeholder="Seleccionar alineación" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="left">Izquierda</SelectItem>
                    <SelectItem value="center">Centro</SelectItem>
                    <SelectItem value="right">Derecha</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </>
        )

      case "container":
        return (
          <>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="backgroundColor">Color de fondo</Label>
                <div className="flex">
                  <Input
                    id="backgroundColor"
                    type="color"
                    className="w-12 p-1 h-10"
                    value={props.backgroundColor || "#FFFFFF"}
                    onChange={(e) => updateComponent(selectedId, { backgroundColor: e.target.value })}
                  />
                  <Input
                    type="text"
                    className="flex-1 ml-2"
                    value={props.backgroundColor || "#FFFFFF"}
                    onChange={(e) => updateComponent(selectedId, { backgroundColor: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Padding (px)</Label>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="paddingTop" className="text-xs">
                      Superior
                    </Label>
                    <Slider
                      id="paddingTop"
                      min={0}
                      max={100}
                      step={1}
                      value={[props.paddingTop || 0]}
                      onValueChange={([value]) => updateComponent(selectedId, { paddingTop: value })}
                      className="mt-1"
                    />
                    <div className="text-right text-xs text-gray-400 mt-1">{props.paddingTop || 0}px</div>
                  </div>
                  <div>
                    <Label htmlFor="paddingRight" className="text-xs">
                      Derecha
                    </Label>
                    <Slider
                      id="paddingRight"
                      min={0}
                      max={100}
                      step={1}
                      value={[props.paddingRight || 0]}
                      onValueChange={([value]) => updateComponent(selectedId, { paddingRight: value })}
                      className="mt-1"
                    />
                    <div className="text-right text-xs text-gray-400 mt-1">{props.paddingRight || 0}px</div>
                  </div>
                  <div>
                    <Label htmlFor="paddingBottom" className="text-xs">
                      Inferior
                    </Label>
                    <Slider
                      id="paddingBottom"
                      min={0}
                      max={100}
                      step={1}
                      value={[props.paddingBottom || 0]}
                      onValueChange={([value]) => updateComponent(selectedId, { paddingBottom: value })}
                      className="mt-1"
                    />
                    <div className="text-right text-xs text-gray-400 mt-1">{props.paddingBottom || 0}px</div>
                  </div>
                  <div>
                    <Label htmlFor="paddingLeft" className="text-xs">
                      Izquierda
                    </Label>
                    <Slider
                      id="paddingLeft"
                      min={0}
                      max={100}
                      step={1}
                      value={[props.paddingLeft || 0]}
                      onValueChange={([value]) => updateComponent(selectedId, { paddingLeft: value })}
                      className="mt-1"
                    />
                    <div className="text-right text-xs text-gray-400 mt-1">{props.paddingLeft || 0}px</div>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Margen (px)</Label>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="marginTop" className="text-xs">
                      Superior
                    </Label>
                    <Slider
                      id="marginTop"
                      min={0}
                      max={100}
                      step={1}
                      value={[props.marginTop || 0]}
                      onValueChange={([value]) => updateComponent(selectedId, { marginTop: value })}
                      className="mt-1"
                    />
                    <div className="text-right text-xs text-gray-400 mt-1">{props.marginTop || 0}px</div>
                  </div>
                  <div>
                    <Label htmlFor="marginBottom" className="text-xs">
                      Inferior
                    </Label>
                    <Slider
                      id="marginBottom"
                      min={0}
                      max={100}
                      step={1}
                      value={[props.marginBottom || 0]}
                      onValueChange={([value]) => updateComponent(selectedId, { marginBottom: value })}
                      className="mt-1"
                    />
                    <div className="text-right text-xs text-gray-400 mt-1">{props.marginBottom || 0}px</div>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="borderRadius">Radio de borde (px)</Label>
                <Slider
                  id="borderRadius"
                  min={0}
                  max={50}
                  step={1}
                  value={[props.borderRadius || 0]}
                  onValueChange={([value]) => updateComponent(selectedId, { borderRadius: value })}
                />
                <div className="text-right text-xs text-gray-400">{props.borderRadius || 0}px</div>
              </div>
            </div>
          </>
        )

      case "columns":
        return (
          <>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="columns">Número de columnas</Label>
                <Select
                  value={props.columnCount?.toString() || "2"}
                  onValueChange={(value) => updateComponent(selectedId, { columnCount: Number.parseInt(value) })}
                >
                  <SelectTrigger id="columns">
                    <SelectValue placeholder="Seleccionar número de columnas" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 Columna</SelectItem>
                    <SelectItem value="2">2 Columnas</SelectItem>
                    <SelectItem value="3">3 Columnas</SelectItem>
                    <SelectItem value="4">4 Columnas</SelectItem>
                    <SelectItem value="6">6 Columnas</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="gap">Espacio entre columnas (px)</Label>
                <Slider
                  id="gap"
                  min={0}
                  max={50}
                  step={1}
                  value={[props.gap || 16]}
                  onValueChange={([value]) => updateComponent(selectedId, { gap: value })}
                />
                <div className="text-right text-xs text-gray-400">{props.gap || 16}px</div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="backgroundColor">Color de fondo</Label>
                <div className="flex">
                  <Input
                    id="backgroundColor"
                    type="color"
                    className="w-12 p-1 h-10"
                    value={props.backgroundColor || "#FFFFFF"}
                    onChange={(e) => updateComponent(selectedId, { backgroundColor: e.target.value })}
                  />
                  <Input
                    type="text"
                    className="flex-1 ml-2"
                    value={props.backgroundColor || "#FFFFFF"}
                    onChange={(e) => updateComponent(selectedId, { backgroundColor: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Padding (px)</Label>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="paddingTop" className="text-xs">
                      Superior
                    </Label>
                    <Slider
                      id="paddingTop"
                      min={0}
                      max={100}
                      step={1}
                      value={[props.paddingTop || 0]}
                      onValueChange={([value]) => updateComponent(selectedId, { paddingTop: value })}
                      className="mt-1"
                    />
                    <div className="text-right text-xs text-gray-400 mt-1">{props.paddingTop || 0}px</div>
                  </div>
                  <div>
                    <Label htmlFor="paddingRight" className="text-xs">
                      Derecha
                    </Label>
                    <Slider
                      id="paddingRight"
                      min={0}
                      max={100}
                      step={1}
                      value={[props.paddingRight || 0]}
                      onValueChange={([value]) => updateComponent(selectedId, { paddingRight: value })}
                      className="mt-1"
                    />
                    <div className="text-right text-xs text-gray-400 mt-1">{props.paddingRight || 0}px</div>
                  </div>
                  <div>
                    <Label htmlFor="paddingBottom" className="text-xs">
                      Inferior
                    </Label>
                    <Slider
                      id="paddingBottom"
                      min={0}
                      max={100}
                      step={1}
                      value={[props.paddingBottom || 0]}
                      onValueChange={([value]) => updateComponent(selectedId, { paddingBottom: value })}
                      className="mt-1"
                    />
                    <div className="text-right text-xs text-gray-400 mt-1">{props.paddingBottom || 0}px</div>
                  </div>
                  <div>
                    <Label htmlFor="paddingLeft" className="text-xs">
                      Izquierda
                    </Label>
                    <Slider
                      id="paddingLeft"
                      min={0}
                      max={100}
                      step={1}
                      value={[props.paddingLeft || 0]}
                      onValueChange={([value]) => updateComponent(selectedId, { paddingLeft: value })}
                      className="mt-1"
                    />
                    <div className="text-right text-xs text-gray-400 mt-1">{props.paddingLeft || 0}px</div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )

      default:
        return (
          <div className="p-4 text-center">
            <p className="text-gray-400">No hay propiedades disponibles para este componente</p>
          </div>
        )
    }
  }

  return (
    <div className="w-80 h-full flex flex-col bg-gray-900 border-l border-gray-800">
      <div className="flex justify-between items-center p-4 border-b border-gray-800">
        <h2 className="text-sm font-medium text-white">
          Propiedades: {selectedComponent.type.charAt(0).toUpperCase() + selectedComponent.type.slice(1)}
        </h2>
        <Button
          variant="ghost"
          size="icon"
          className="text-gray-400 hover:text-white"
          onClick={() => setIsCollapsed(true)}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex-1 overflow-y-auto">
        <Tabs defaultValue="content">
          <TabsList className="w-full justify-start rounded-none border-b border-gray-800 bg-transparent p-0">
            <TabsTrigger
              value="content"
              className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-purple-500 data-[state=active]:bg-transparent"
            >
              Contenido
            </TabsTrigger>
            <TabsTrigger
              value="style"
              className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-purple-500 data-[state=active]:bg-transparent"
            >
              Estilo
            </TabsTrigger>
            <TabsTrigger
              value="advanced"
              className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-purple-500 data-[state=active]:bg-transparent"
            >
              Avanzado
            </TabsTrigger>
          </TabsList>
          <TabsContent value="content" className="p-4">
            {renderPropertyControls()}
          </TabsContent>
          <TabsContent value="style" className="p-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Padding (px)</Label>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="paddingTop" className="text-xs">
                      Superior
                    </Label>
                    <Slider
                      id="paddingTop"
                      min={0}
                      max={100}
                      step={1}
                      value={[selectedComponent.props.paddingTop || 0]}
                      onValueChange={([value]) => updateComponent(selectedId, { paddingTop: value })}
                      className="mt-1"
                    />
                    <div className="text-right text-xs text-gray-400 mt-1">
                      {selectedComponent.props.paddingTop || 0}px
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="paddingRight" className="text-xs">
                      Derecha
                    </Label>
                    <Slider
                      id="paddingRight"
                      min={0}
                      max={100}
                      step={1}
                      value={[selectedComponent.props.paddingRight || 0]}
                      onValueChange={([value]) => updateComponent(selectedId, { paddingRight: value })}
                      className="mt-1"
                    />
                    <div className="text-right text-xs text-gray-400 mt-1">
                      {selectedComponent.props.paddingRight || 0}px
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="paddingBottom" className="text-xs">
                      Inferior
                    </Label>
                    <Slider
                      id="paddingBottom"
                      min={0}
                      max={100}
                      step={1}
                      value={[selectedComponent.props.paddingBottom || 0]}
                      onValueChange={([value]) => updateComponent(selectedId, { paddingBottom: value })}
                      className="mt-1"
                    />
                    <div className="text-right text-xs text-gray-400 mt-1">
                      {selectedComponent.props.paddingBottom || 0}px
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="paddingLeft" className="text-xs">
                      Izquierda
                    </Label>
                    <Slider
                      id="paddingLeft"
                      min={0}
                      max={100}
                      step={1}
                      value={[selectedComponent.props.paddingLeft || 0]}
                      onValueChange={([value]) => updateComponent(selectedId, { paddingLeft: value })}
                      className="mt-1"
                    />
                    <div className="text-right text-xs text-gray-400 mt-1">
                      {selectedComponent.props.paddingLeft || 0}px
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Margen (px)</Label>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="marginTop" className="text-xs">
                      Superior
                    </Label>
                    <Slider
                      id="marginTop"
                      min={0}
                      max={100}
                      step={1}
                      value={[selectedComponent.props.marginTop || 0]}
                      onValueChange={([value]) => updateComponent(selectedId, { marginTop: value })}
                      className="mt-1"
                    />
                    <div className="text-right text-xs text-gray-400 mt-1">
                      {selectedComponent.props.marginTop || 0}px
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="marginBottom" className="text-xs">
                      Inferior
                    </Label>
                    <Slider
                      id="marginBottom"
                      min={0}
                      max={100}
                      step={1}
                      value={[selectedComponent.props.marginBottom || 0]}
                      onValueChange={([value]) => updateComponent(selectedId, { marginBottom: value })}
                      className="mt-1"
                    />
                    <div className="text-right text-xs text-gray-400 mt-1">
                      {selectedComponent.props.marginBottom || 0}px
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="borderRadius">Radio de borde (px)</Label>
                <Slider
                  id="borderRadius"
                  min={0}
                  max={50}
                  step={1}
                  value={[selectedComponent.props.borderRadius || 0]}
                  onValueChange={([value]) => updateComponent(selectedId, { borderRadius: value })}
                />
                <div className="text-right text-xs text-gray-400">{selectedComponent.props.borderRadius || 0}px</div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="advanced" className="p-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="customClass">Clase CSS personalizada</Label>
                <Input
                  id="customClass"
                  value={selectedComponent.props.customClass || ""}
                  onChange={(e) => updateComponent(selectedId, { customClass: e.target.value })}
                  placeholder="Ej: my-custom-class"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="customId">ID personalizado</Label>
                <Input
                  id="customId"
                  value={selectedComponent.props.customId || ""}
                  onChange={(e) => updateComponent(selectedId, { customId: e.target.value })}
                  placeholder="Ej: my-custom-id"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="enableAnimation"
                  checked={selectedComponent.props.enableAnimation || false}
                  onCheckedChange={(checked) => updateComponent(selectedId, { enableAnimation: checked })}
                />
                <Label htmlFor="enableAnimation">Habilitar animación</Label>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
