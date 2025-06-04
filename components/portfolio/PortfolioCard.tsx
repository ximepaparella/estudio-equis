"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export type Category = "all" | "web" | "mobile" | "design" | "branding"

export interface PortfolioProject {
  id: number
  title: string
  category: Category[]
  image: string
  client: string
  tags: string[]
  featured?: boolean
  color: string
  description?: string
  techStack?: string[]
}

interface PortfolioCardProps {
  project: PortfolioProject
  onSelect?: (project: PortfolioProject) => void
  animationDelay?: number
  variant?: "default" | "featured" | "compact"
  className?: string
}

export function PortfolioCard({
  project,
  onSelect,
  animationDelay = 0,
  variant = "default",
  className = "",
}: PortfolioCardProps) {
  const handleClick = () => {
    if (onSelect) {
      onSelect(project)
    }
  }

  const renderTags = () => (
    <div className="flex flex-wrap gap-2 mb-3">
      {project.tags.map((tag, tagIndex) => (
        <span
          key={tagIndex}
          className="text-xs bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full"
        >
          {tag}
        </span>
      ))}
    </div>
  )

  const renderContent = () => (
    <div className="absolute bottom-0 left-0 p-8 w-full">
      {renderTags()}
      <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
      <p className="text-gray-300 mb-4">Client: {project.client}</p>
      {onSelect && (
        <Button
          className={`bg-gradient-to-r ${project.color} hover:opacity-90 text-white`}
          onClick={(e) => {
            e.stopPropagation()
            handleClick()
          }}
        >
          View Project <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      )}
    </div>
  )

  if (variant === "compact") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: animationDelay }}
        className={`relative h-full rounded-xl overflow-hidden ${className}`}
        style={{
          perspective: "1000px",
          transformStyle: "preserve-3d",
        }}
      >
        <div
          className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-30`}
          style={{ transform: "translateZ(-10px)" }}
        />
        <Image
          src={project.image || "/placeholder.svg"}
          alt={project.title}
          fill
          className="object-cover"
          style={{ transform: "translateZ(0)" }}
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"
          style={{ transform: "translateZ(10px)" }}
        >
          <div className="absolute bottom-0 left-0 p-4">
            <h3 className="text-lg font-bold">{project.title}</h3>
            <p className="text-sm text-gray-300">{project.client}</p>
          </div>
        </div>
      </motion.div>
    )
  }

  if (variant === "featured") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: animationDelay }}
        className={`relative group h-[500px] ${className}`}
        onClick={handleClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            handleClick()
          }
        }}
        aria-label={`View details for ${project.title}`}
      >
        <div
          className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-100 rounded-xl transition-opacity duration-300`}
        />
        <div className="relative h-full rounded-xl overflow-hidden">
          <Image
            src={project.image || "/placeholder.svg"}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {renderContent()}
          </div>
        </div>

        <motion.div
          className="absolute -bottom-6 -right-6 h-24 w-24 rounded-full bg-gradient-to-br from-black/80 to-black/60 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <div
            className={`h-16 w-16 rounded-full bg-gradient-to-br ${project.color} flex items-center justify-center`}
          >
            <ArrowRight className="h-6 w-6 text-white" />
          </div>
        </motion.div>
      </motion.div>
    )
  }

  // Default variant
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: animationDelay }}
      className={`relative group h-[400px] rounded-xl overflow-hidden ${className}`}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          handleClick()
        }
      }}
      aria-label={`View details for ${project.title}`}
    >
      <div
        className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
      />
      <Image
        src={project.image || "/placeholder.svg"}
        alt={project.title}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        {renderContent()}
      </div>
    </motion.div>
  )
}
