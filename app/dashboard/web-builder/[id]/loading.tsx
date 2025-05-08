import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="fixed inset-0 bg-black flex flex-col z-50">
      {/* Top Bar */}
      <div className="h-14 border-b border-gray-800 flex items-center justify-between px-4 bg-gray-900">
        <Skeleton className="h-8 w-64 bg-gray-800" />
        <div className="flex items-center space-x-2">
          <Skeleton className="h-8 w-32 bg-gray-800" />
          <Skeleton className="h-8 w-24 bg-gray-800" />
          <Skeleton className="h-8 w-24 bg-gray-800" />
          <Skeleton className="h-8 w-24 bg-gray-800" />
        </div>
      </div>

      {/* Main Content - 3 Column Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar */}
        <div className="w-64 border-r border-gray-800 bg-gray-900 flex flex-col">
          <div className="p-4 border-b border-gray-800">
            <Skeleton className="h-10 w-full bg-gray-800" />
          </div>
          <div className="flex border-b border-gray-800">
            <Skeleton className="h-10 w-full bg-gray-800" />
          </div>
          <div className="flex-1 p-4 space-y-4">
            <Skeleton className="h-20 w-full bg-gray-800" />
            <Skeleton className="h-20 w-full bg-gray-800" />
            <Skeleton className="h-20 w-full bg-gray-800" />
            <Skeleton className="h-20 w-full bg-gray-800" />
          </div>
        </div>

        {/* Center - Canvas */}
        <div className="flex-1 bg-gray-800 flex items-center justify-center">
          <Skeleton className="h-[80%] w-[80%] bg-gray-700" />
        </div>

        {/* Right Sidebar */}
        <div className="w-80 border-l border-gray-800 bg-gray-900 flex flex-col">
          <div className="p-4 border-b border-gray-800">
            <Skeleton className="h-6 w-40 bg-gray-800" />
            <Skeleton className="h-4 w-32 mt-2 bg-gray-800" />
          </div>
          <div className="p-4 space-y-4">
            <Skeleton className="h-10 w-full bg-gray-800" />
            <Skeleton className="h-24 w-full bg-gray-800" />
            <Skeleton className="h-10 w-full bg-gray-800" />
            <Skeleton className="h-10 w-full bg-gray-800" />
          </div>
        </div>
      </div>
    </div>
  )
}
