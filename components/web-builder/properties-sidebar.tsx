"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
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
          <h3 className="text-lg font-medium text-white mb-2">Properties</h3>
          <p className="text-gray-400">Select a component to edit its properties</p>
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
        <h3 className="text-lg font-medium text-white">Properties</h3>
        <p className="text-sm text-gray-400">Editing: {getComponentName(selectedComponent.type)}</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
        <TabsList className="bg-gray-900 border-b border-gray-800 p-0 h-auto">
          <TabsTrigger
            value="content"
            className="data-[state=active]:bg-transparent data-[state=active]:text-purple-400 data-[state=active]:border-b-2 data-[state=active]:border-purple-400 rounded-none px-4 py-2 text-gray-400"
          >
            Content
          </TabsTrigger>
          <TabsTrigger
            value="style"
            className="data-[state=active]:bg-transparent data-[state=active]:text-purple-400 data-[state=active]:border-b-2 data-[state=active]:border-purple-400 rounded-none px-4 py-2 text-gray-400"
          >
            Style
          </TabsTrigger>
          <TabsTrigger
            value="advanced"
            className="data-[state=active]:bg-transparent data-[state=active]:text-purple-400 data-[state=active]:border-b-2 data-[state=active]:border-purple-400 rounded-none px-4 py-2 text-gray-400"
          >
            Advanced
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
                Custom CSS Class
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
                Custom ID
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
                Animation
              </Label>
              <Select
                value={selectedComponent.props.animation || "none"}
                onValueChange={(value) => handleChange("animation", value)}
              >
                <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                  <SelectValue placeholder="None" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700 text-white">
                  <SelectItem value="none">None</SelectItem>
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

function getComponentName(componentType: string): string {
  switch (componentType) {
    case "hero":
      return "Hero with Title and Image"
    case "icons-section":
      return "Icons Section"
    case "background-section":
      return "Background Section"
    case "heading":
      return "Heading"
    case "paragraph":
      return "Paragraph"
    case "button":
      return "Button"
    case "image":
      return "Image"
    case "gallery":
      return "Gallery"
    case "testimonial":
      return "Testimonial"
    default:
      return "Component"
  }
}

function renderContentProperties(type: string, props: any, handleChange: (key: string, value: any) => void) {
  switch (type) {
    case "hero":
      return (
        <div className="space-y-4">
          <div>
            <Label htmlFor="hero-title" className="text-white">
              Title
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
              Subtitle
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
              Background Image
            </Label>
            <div className="flex items-center gap-2">
              <Input
                id="hero-image"
                value={props.backgroundImage || ""}
                onChange={(e) => handleChange("backgroundImage", e.target.value)}
                className="bg-gray-800 border-gray-700 text-white"
              />
              <Button variant="outline" className="border-gray-700 text-gray-300">
                Upload
              </Button>
            </div>
          </div>
          <div>
            <Label htmlFor="hero-button-text" className="text-white">
              Button Text
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
              Button URL
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
              Text
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
    default:
      return (
        <div className="space-y-4">
          <div>
            <Label htmlFor="title" className="text-white">
              Title
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
              Description
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
          Background Color
        </Label>
        <div className="flex items-center gap-2">
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
          Text Color
        </Label>
        <div className="flex items-center gap-2">
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
      <div>
        <Label htmlFor="padding" className="text-white">
          Padding
        </Label>
        <div className="grid grid-cols-4 gap-2">
          <div>
            <Label htmlFor="padding-top" className="text-xs text-gray-400">
              Top
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
              Right
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
              Bottom
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
              Left
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
        <Label htmlFor="border-radius" className="text-white">
          Border Radius
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
