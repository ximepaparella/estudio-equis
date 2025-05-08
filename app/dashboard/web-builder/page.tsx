"use client"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Search, Plus, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function WebBuilderPage() {
  const sites = [
    {
      id: 1,
      name: "Mi Tienda Online",
      lastEdited: "2 days ago",
      modules: 9,
      type: "Website",
      image: "/placeholder.svg?height=200&width=300&text=Mi+Tienda+Online",
    },
    {
      id: 2,
      name: "Personal Portfolio",
      lastEdited: "1 week ago",
      modules: 0,
      type: "Website",
      image: "/placeholder.svg?height=200&width=300&text=Portfolio+Personal",
    },
    {
      id: 3,
      name: "Travel Blog",
      lastEdited: "2 weeks ago",
      modules: 0,
      type: "Website",
      image: "/placeholder.svg?height=200&width=300&text=Blog+de+Viajes",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white">My Sites</h1>
          <p className="text-gray-400">Manage and edit your websites</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              type="search"
              placeholder="Search sites..."
              className="pl-8 bg-gray-900 border-gray-700 text-white"
            />
          </div>
          <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90 text-white">
            <Plus className="mr-2 h-4 w-4" />
            Create new site
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="bg-gray-900 border-b border-gray-800 p-0 h-auto">
          <TabsTrigger
            value="all"
            className="data-[state=active]:bg-transparent data-[state=active]:text-purple-400 data-[state=active]:border-b-2 data-[state=active]:border-purple-400 rounded-none px-4 py-2 text-gray-400"
          >
            All
          </TabsTrigger>
          <TabsTrigger
            value="recent"
            className="data-[state=active]:bg-transparent data-[state=active]:text-purple-400 data-[state=active]:border-b-2 data-[state=active]:border-purple-400 rounded-none px-4 py-2 text-gray-400"
          >
            Recent
          </TabsTrigger>
          <TabsTrigger
            value="favorites"
            className="data-[state=active]:bg-transparent data-[state=active]:text-purple-400 data-[state=active]:border-b-2 data-[state=active]:border-purple-400 rounded-none px-4 py-2 text-gray-400"
          >
            Favorites
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sites.map((site) => (
              <motion.div
                key={site.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden"
              >
                <div className="relative h-40 bg-gray-800">
                  <Image src={site.image || "/placeholder.svg"} alt={site.name} fill className="object-cover" />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 text-white bg-black/40 hover:bg-black/60"
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-white">{site.name}</h3>
                  <p className="text-sm text-gray-400">Edited: {site.lastEdited}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded-full">
                      {site.modules} modules
                    </span>
                    <span className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded-full">{site.type}</span>
                  </div>
                  <Link href={`/dashboard/web-builder/${site.id}`}>
                    <Button className="w-full mt-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90 text-white">
                      Edit site
                    </Button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="recent">
          <div className="text-center py-10 text-gray-400">No recent sites</div>
        </TabsContent>

        <TabsContent value="favorites">
          <div className="text-center py-10 text-gray-400">No favorite sites</div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
