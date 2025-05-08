"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Search, Plus, MoreVertical, Edit, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useWebsiteStore } from "@/lib/website-store"
import { formatDistanceToNow } from "date-fns"

export default function WebsitesPage() {
  const router = useRouter()
  const { websites } = useWebsiteStore()
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<"all" | "published" | "draft">("all")

  const filteredWebsites = websites.filter((website) => {
    const matchesSearch = website.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || website.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Websites</h2>
        <Button onClick={() => router.push("/dashboard/websites/new")}>
          <Plus className="mr-2 h-4 w-4" />
          Create Website
        </Button>
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search websites..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant={statusFilter === "all" ? "default" : "outline"} onClick={() => setStatusFilter("all")}>
          All
        </Button>
        <Button
          variant={statusFilter === "published" ? "default" : "outline"}
          onClick={() => setStatusFilter("published")}
        >
          Published
        </Button>
        <Button variant={statusFilter === "draft" ? "default" : "outline"} onClick={() => setStatusFilter("draft")}>
          Draft
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredWebsites.map((website) => (
          <div key={website.id} className="rounded-lg border bg-card text-card-foreground shadow-sm">
            <div className="relative">
              <img
                src={website.thumbnail || "/placeholder.svg"}
                alt={website.name}
                className="aspect-video w-full rounded-t-lg object-cover"
              />
              <div className="absolute top-2 right-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="bg-black/50 text-white hover:bg-black/70">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => router.push(`/dashboard/websites/${website.id}`)}>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Eye className="mr-2 h-4 w-4" />
                      Preview
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold">{website.name}</h3>
              <div className="mt-2 flex items-center justify-between text-sm text-gray-500">
                <div>Edited: {formatDistanceToNow(website.lastEdited, { addSuffix: true })}</div>
                <div className="flex items-center">
                  <span
                    className={`mr-2 h-2 w-2 rounded-full ${website.status === "published" ? "bg-green-500" : "bg-amber-500"}`}
                  ></span>
                  {website.status === "published" ? "Published" : "Draft"}
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <div className="text-sm text-gray-500">{website.modules} modules</div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" onClick={() => router.push(`/preview/${website.slug}`)}>
                    <Eye className="mr-2 h-4 w-4" />
                    Preview
                  </Button>
                  <Button size="sm" onClick={() => router.push(`/dashboard/websites/builder/${website.id}`)}>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
