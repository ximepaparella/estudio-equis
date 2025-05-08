"use client"

import { useEffect } from "react"
import { useParams } from "next/navigation"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import { useWebsiteStore } from "@/lib/website-store"
import { useBuilderStore } from "@/lib/builder-store"
import { BuilderHeader } from "@/components/website-builder/builder-header"
import { ComponentsSidebar } from "@/components/website-builder/components-sidebar"
import { Canvas } from "@/components/website-builder/canvas"
import { PropertiesSidebar } from "@/components/website-builder/properties-sidebar"

export default function BuilderPage() {
  const params = useParams()
  const websiteId = params.id as string
  const { websites, selectWebsite } = useWebsiteStore()
  const { deviceView } = useBuilderStore()

  const website = websites.find((site) => site.id === websiteId)

  useEffect(() => {
    if (websiteId) {
      selectWebsite(websiteId)
    }

    // Load components from API or localStorage here
    // For now, we'll just use the empty state

    return () => {
      selectWebsite(null)
    }
  }, [websiteId, selectWebsite])

  if (!website) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-900">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white">Website not found</h1>
          <p className="mt-2 text-gray-400">
            The website you're looking for doesn't exist or you don't have access to it.
          </p>
        </div>
      </div>
    )
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex h-screen flex-col bg-gray-900">
        <BuilderHeader websiteName={website.name} websiteId={website.id} />

        <div className="flex flex-1 overflow-hidden">
          <div className="w-1/5 overflow-y-auto">
            <ComponentsSidebar />
          </div>

          <div className="w-3/5 overflow-y-auto">
            <Canvas deviceView={deviceView} />
          </div>

          <div className="w-1/5 overflow-y-auto border-l border-gray-800">
            <PropertiesSidebar />
          </div>
        </div>
      </div>
    </DndProvider>
  )
}
