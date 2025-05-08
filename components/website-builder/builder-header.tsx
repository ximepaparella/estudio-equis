"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, ArrowRight, ComputerIcon as Desktop, Tablet, Smartphone, Save, Eye, History } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useBuilderStore } from "@/lib/builder-store"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function BuilderHeader() {
  const router = useRouter()
  const { deviceView, setDeviceView, saveHistory, undo, redo } = useBuilderStore()
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = async () => {
    setIsSaving(true)
    // Simulate saving
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsSaving(false)
    saveHistory()
  }

  const handlePreview = () => {
    // Implement preview functionality
    window.open("/preview", "_blank")
  }

  return (
    <div className="h-16 border-b border-gray-800 bg-gray-900 flex items-center justify-between px-4">
      <div className="flex items-center space-x-4">
        <Button variant="outline" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-lg font-medium text-white">Editor de Sitio Web</h1>
      </div>

      <div className="flex items-center space-x-2">
        <div className="bg-gray-800 rounded-md p-1 flex">
          <Button
            variant="ghost"
            size="icon"
            className={`${deviceView === "desktop" ? "bg-gray-700" : ""}`}
            onClick={() => setDeviceView("desktop")}
          >
            <Desktop className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className={`${deviceView === "tablet" ? "bg-gray-700" : ""}`}
            onClick={() => setDeviceView("tablet")}
          >
            <Tablet className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className={`${deviceView === "mobile" ? "bg-gray-700" : ""}`}
            onClick={() => setDeviceView("mobile")}
          >
            <Smartphone className="h-4 w-4" />
          </Button>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <History className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Historial</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={undo}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              <span>Deshacer</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={redo}>
              <ArrowRight className="mr-2 h-4 w-4" />
              <span>Rehacer</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <span>Versión 1 - Hace 5 minutos</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <span>Versión 2 - Hace 10 minutos</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <span>Versión 3 - Hace 15 minutos</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button variant="outline" size="icon" onClick={undo}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon" onClick={redo}>
          <ArrowRight className="h-4 w-4" />
        </Button>

        <Button variant="outline" onClick={handlePreview}>
          <Eye className="mr-2 h-4 w-4" />
          <span>Vista previa</span>
        </Button>
        <Button onClick={handleSave} disabled={isSaving}>
          <Save className="mr-2 h-4 w-4" />
          <span>{isSaving ? "Guardando..." : "Guardar"}</span>
        </Button>
      </div>
    </div>
  )
}
