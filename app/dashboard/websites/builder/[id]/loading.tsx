import { Skeleton } from "@/components/ui/skeleton"

export default function BuilderLoading() {
  return (
    <div className="flex h-screen flex-col bg-gray-900">
      <div className="flex h-14 items-center justify-between border-b border-gray-800 bg-gray-900 px-4">
        <div className="flex items-center">
          <Skeleton className="h-8 w-8 mr-2" />
          <Skeleton className="h-5 w-40" />
        </div>

        <div className="flex items-center space-x-2">
          <Skeleton className="h-10 w-32" />
          <Skeleton className="h-10 w-48" />
          <Skeleton className="h-10 w-48" />
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        <div className="w-1/5 border-r border-gray-800 p-4">
          <Skeleton className="h-10 w-full mb-4" />
          <div className="space-y-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-16 w-full" />
            ))}
          </div>
        </div>

        <div className="w-3/5 p-8 flex justify-center">
          <Skeleton className="h-[500px] w-full max-w-4xl rounded-lg" />
        </div>

        <div className="w-1/5 border-l border-gray-800 p-4">
          <Skeleton className="h-8 w-full mb-4" />
          <div className="space-y-3">
            {Array.from({ length: 8 }).map((_, i) => (
              <Skeleton key={i} className="h-10 w-full" />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
