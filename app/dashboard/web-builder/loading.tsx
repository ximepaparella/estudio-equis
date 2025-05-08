import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <Skeleton className="h-8 w-48 bg-gray-800" />
          <Skeleton className="h-4 w-64 mt-2 bg-gray-800" />
        </div>
        <div className="flex items-center gap-4">
          <Skeleton className="h-10 w-64 bg-gray-800" />
          <Skeleton className="h-10 w-40 bg-gray-800" />
        </div>
      </div>

      <div className="w-full border-b border-gray-800">
        <Skeleton className="h-10 w-64 bg-gray-800" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-72 rounded-xl bg-gray-800" />
        ))}
      </div>
    </div>
  )
}
