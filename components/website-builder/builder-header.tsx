"use client"

import { useRouter } from "next/navigation"
import { ArrowLeft, Monitor, Tablet, Smartphone, Save, Eye, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useBuilderStore } from "@/lib/builder-store"

interface BuilderHeaderProps {
  websiteName: string
  websiteId: string
}

export function BuilderHeader({ websiteName, websiteId }: BuilderHeaderProps) {
  const router = useRouter()
  const { deviceView, setDeviceView } = useBuilderStore()

  return (
    <header className="flex h-14 items-center justify-between border-b border-gray-800 bg-gray-900 px-4">
      <div className="flex items-center">
        <Button
          variant="ghost"
          size="icon"
          className="mr-2 text-gray-400 hover:text-white"
          onClick={() => router.push("/dashboard/websites")}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex items-center">
          <span className="text-sm font-medium text-white">{websiteName}</span>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <div className="flex items-center rounded-md border border-gray-700 bg-gray-800 p-1">
          <Button
            variant="ghost"
            size="icon"
            className={`h-8 w-8 ${deviceView === "desktop" ? "bg-gray-700 text-white" : "text-gray-400"}`}
            onClick={() => setDeviceView("desktop")}
          >
            <Monitor className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className={`h-8 w-8 ${deviceView === "tablet" ? "bg-gray-700 text-white" : "text-gray-400"}`}
            onClick={() => setDeviceView("tablet")}
          >
            <Tablet className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className={`h-8 w-8 ${deviceView === "mobile" ? "bg-gray-700 text-white" : "text-gray-400"}`}
            onClick={() => setDeviceView("mobile")}
          >
            <Smartphone className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" className="text-gray-300 border-gray-700">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Anterior
          </Button>
          <Button variant="outline" size="sm" className="text-gray-300 border-gray-700">
            Siguiente
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>

        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" className="text-gray-300 border-gray-700">
            <Save className="h-4 w-4 mr-2" />
            Guardar
          </Button>
          <Button variant="outline" size="sm" className="text-gray-300 border-gray-700">
            <Eye className="h-4 w-4 mr-2" />
            Vista previa
          </Button>
          <Button size="sm" className="bg-purple-600 hover:bg-purple-700 text-white">
            Publicar
          </Button>
        </div>
      </div>
    </header>
  )
}
