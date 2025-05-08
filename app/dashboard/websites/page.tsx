"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Search, Plus, MoreVertical, Edit, Eye, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
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
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Websites</h2>
          <p className="text-muted-foreground">Manage your client websites and landing pages</p>
        </div>
        <Button onClick={() => router.push("/dashboard/websites/new")}>
          <Plus className="mr-2 h-4 w-4" />
          Create Website
        </Button>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-1 items-center space-x-2">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search websites..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-9">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setStatusFilter("all")}>All</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter("published")}>Published</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter("draft")}>Draft</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant={statusFilter === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setStatusFilter("all")}
          >
            All
          </Button>
          <Button
            variant={statusFilter === "published" ? "default" : "outline"}
            size="sm"
            onClick={() => setStatusFilter("published")}
          >
            Published
          </Button>
          <Button
            variant={statusFilter === "draft" ? "default" : "outline"}
            size="sm"
            onClick={() => setStatusFilter("draft")}
          >
            Draft
          </Button>
        </div>
      </div>

      {filteredWebsites.length === 0 ? (
        <div className="flex h-[450px] shrink-0 items-center justify-center rounded-md border border-dashed">
          <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
            <h3 className="mt-4 text-lg font-semibold">No websites found</h3>
            <p className="mb-4 mt-2 text-sm text-muted-foreground">
              {searchQuery
                ? "No websites match your search criteria. Try a different search term."
                : "You haven't created any websites yet. Create one to get started."}
            </p>
            <Button onClick={() => router.push("/dashboard/websites/new")}>
              <Plus className="mr-2 h-4 w-4" />
              Create Website
            </Button>
          </div>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredWebsites.map((website) => (
            <Card key={website.id} className="overflow-hidden">
              <div className="relative aspect-video">
                <img
                  src={website.thumbnail || "/placeholder.svg?height=200&width=400"}
                  alt={website.name}
                  className="h-full w-full object-cover"
                />
                <div className="absolute top-2 right-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="bg-black/50 text-white hover:bg-black/70">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => router.push(`/dashboard/websites/builder/${website.id}`)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => router.push(`/preview/${website.slug}`)}>
                        <Eye className="mr-2 h-4 w-4" />
                        Preview
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              <CardHeader className="p-4 pb-0">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">{website.name}</CardTitle>
                  <Badge variant={website.status === "published" ? "default" : "secondary"}>
                    {website.status === "published" ? "Published" : "Draft"}
                  </Badge>
                </div>
                <CardDescription>
                  Last edited {formatDistanceToNow(website.lastEdited, { addSuffix: true })}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4 pt-2">
                <div className="text-sm text-muted-foreground">{website.modules} modules</div>
              </CardContent>
              <CardFooter className="p-4 pt-0 flex justify-between gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => router.push(`/preview/${website.slug}`)}
                >
                  <Eye className="mr-2 h-4 w-4" />
                  Preview
                </Button>
                <Button
                  size="sm"
                  className="flex-1"
                  onClick={() => router.push(`/dashboard/websites/builder/${website.id}`)}
                >
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
