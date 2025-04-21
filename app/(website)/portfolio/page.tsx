"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { ArrowRight, X, Filter, Search, Grid3X3, Layout } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

type Category = "all" | "web" | "mobile" | "design" | "branding"
type ViewMode = "grid" | "masonry"

interface Project {
  id: number
  title: string
  category: Category[]
  image: string
  client: string
  tags: string[]
  featured?: boolean
  color: string
}

export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState<Category>("all")
  const [viewMode, setViewMode] = useState<ViewMode>("grid")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  const portfolioRef = useRef<HTMLDivElement>(null)
  const featuredRef = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll()

  const portfolioInView = useInView(portfolioRef, { once: true, amount: 0.1 })
  const featuredInView = useInView(featuredRef, { once: true, amount: 0.1 })

  const rotateY = useTransform(scrollY, [0, 500], [0, 15])
  const scale = useTransform(scrollY, [0, 300], [1, 1.1])

  const categories: { value: Category; label: string; color: string }[] = [
    { value: "all", label: "All Projects", color: "from-purple-500 to-pink-500" },
    { value: "web", label: "Web Development", color: "from-blue-500 to-cyan-500" },
    { value: "mobile", label: "Mobile Apps", color: "from-green-500 to-teal-500" },
    { value: "design", label: "UX/UI Design", color: "from-orange-500 to-amber-500" },
    { value: "branding", label: "Branding", color: "from-red-500 to-rose-500" },
  ]

  const projects: Project[] = [
    {
      id: 1,
      title: "E-commerce Platform Redesign",
      category: ["web", "design"],
      image: "/placeholder.svg?height=600&width=800&text=E-commerce+Project",
      client: "Fashion Retailer",
      tags: ["E-commerce", "UX/UI Design", "Web Development"],
      featured: true,
      color: "from-purple-500 to-pink-500",
    },
    {
      id: 2,
      title: "Financial Services Mobile App",
      category: ["mobile", "design"],
      image: "/placeholder.svg?height=600&width=800&text=Finance+App",
      client: "Banking Institution",
      tags: ["Mobile App", "FinTech", "UX/UI Design"],
      featured: true,
      color: "from-blue-500 to-cyan-500",
    },
    {
      id: 3,
      title: "Healthcare Provider Platform",
      category: ["web", "design"],
      image: "/placeholder.svg?height=600&width=800&text=Healthcare+Platform",
      client: "Medical Services",
      tags: ["Web Application", "Healthcare", "UX/UI Design"],
      color: "from-green-500 to-teal-500",
    },
    {
      id: 4,
      title: "Restaurant Ordering System",
      category: ["web", "mobile"],
      image: "/placeholder.svg?height=600&width=800&text=Restaurant+App",
      client: "Restaurant Chain",
      tags: ["Web Application", "Mobile App", "E-commerce"],
      color: "from-orange-500 to-amber-500",
    },
    {
      id: 5,
      title: "Fitness Tracking Application",
      category: ["mobile", "design"],
      image: "/placeholder.svg?height=600&width=800&text=Fitness+App",
      client: "Wellness Company",
      tags: ["Mobile App", "Health Tech", "UX/UI Design"],
      color: "from-red-500 to-rose-500",
    },
    {
      id: 6,
      title: "Corporate Brand Identity",
      category: ["branding", "design"],
      image: "/placeholder.svg?height=600&width=800&text=Brand+Identity",
      client: "Technology Startup",
      tags: ["Branding", "Logo Design", "Visual Identity"],
      featured: true,
      color: "from-violet-500 to-purple-500",
    },
    {
      id: 7,
      title: "Real Estate Listing Platform",
      category: ["web", "design"],
      image: "/placeholder.svg?height=600&width=800&text=Real+Estate+Platform",
      client: "Property Management Firm",
      tags: ["Web Application", "Real Estate", "UX/UI Design"],
      color: "from-fuchsia-500 to-pink-500",
    },
    {
      id: 8,
      title: "Educational Learning Platform",
      category: ["web", "mobile"],
      image: "/placeholder.svg?height=600&width=800&text=Learning+Platform",
      client: "Educational Institution",
      tags: ["Web Application", "Mobile App", "EdTech"],
      color: "from-sky-500 to-indigo-500",
    },
    {
      id: 9,
      title: "Travel Booking Application",
      category: ["web", "mobile", "design"],
      image: "/placeholder.svg?height=600&width=800&text=Travel+App",
      client: "Travel Agency",
      tags: ["Web Application", "Mobile App", "UX/UI Design"],
      color: "from-emerald-500 to-teal-500",
    },
  ]

  const filteredProjects = projects
    .filter((project) => activeCategory === "all" || project.category.includes(activeCategory))
    .filter(
      (project) =>
        searchQuery === "" ||
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())),
    )

  const featuredProjects = projects.filter((project) => project.featured)

  useEffect(() => {
    // Prevent scrolling when project modal is open
    if (selectedProject) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [selectedProject])

  return (
    <main className="flex flex-col min-h-screen bg-black text-white overflow-hidden">
      {/* Hero Section with 3D Effect */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black"></div>
          <Image
            src="/placeholder.svg?height=1080&width=1920&text=Our+Portfolio"
            alt="Portfolio"
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="relative z-10 container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
              Our Portfolio
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
              Explore our creative work and innovative solutions
            </p>
          </motion.div>

          <motion.div style={{ rotateY, scale }} className="relative w-full max-w-4xl mx-auto h-64 md:h-80">
            <div className="absolute inset-0 grid grid-cols-3 gap-4">
              {featuredProjects.slice(0, 3).map((project, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  className="relative h-full rounded-xl overflow-hidden"
                  style={{
                    perspective: "1000px",
                    transformStyle: "preserve-3d",
                  }}
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-30`}
                    style={{ transform: "translateZ(-10px)" }}
                  ></div>
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
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer"
          onClick={() => portfolioRef.current?.scrollIntoView({ behavior: "smooth" })}
        >
          <ArrowRight className="h-10 w-10 text-purple-400 rotate-90" />
        </motion.div>
      </section>

      {/* Featured Projects */}
      <section ref={featuredRef} className="py-20 relative z-10 bg-gradient-to-b from-black via-gray-900 to-black">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-full h-full">
            {Array.from({ length: 15 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full bg-purple-900/10"
                style={{
                  width: Math.random() * 300 + 50,
                  height: Math.random() * 300 + 50,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  x: [0, Math.random() * 100 - 50],
                  y: [0, Math.random() * 100 - 50],
                }}
                transition={{
                  duration: Math.random() * 10 + 10,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={featuredInView ? { opacity: 1 } : {}}
          transition={{ duration: 1 }}
          className="container mx-auto px-4 relative z-10"
        >
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 50 }}
              animate={featuredInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-5xl font-bold mb-6"
            >
              Featured{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
                Projects
              </span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 50 }}
              animate={featuredInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-gray-300 max-w-3xl mx-auto"
            >
              Our most impactful and innovative work
            </motion.p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                animate={featuredInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative group h-[500px]"
                onClick={() => setSelectedProject(project)}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-100 rounded-xl transition-opacity duration-300`}
                ></div>
                <div className="relative h-full rounded-xl overflow-hidden">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 p-8 w-full">
                      <div className="flex flex-wrap gap-2 mb-3">
                        {project.tags.map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className={`text-xs bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                      <p className="text-gray-300 mb-4">Client: {project.client}</p>
                      <Button
                        className={`bg-gradient-to-r ${project.color} hover:opacity-90 text-white`}
                        onClick={(e) => {
                          e.stopPropagation()
                          setSelectedProject(project)
                        }}
                      >
                        View Project <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
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
            ))}
          </div>
        </motion.div>
      </section>

      {/* Portfolio Grid with Filters */}
      <section ref={portfolioRef} className="py-20 px-4 md:px-8 bg-black">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={portfolioInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-7xl mx-auto"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-2">
                All{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
                  Projects
                </span>
              </h2>
              <p className="text-gray-400">Explore our complete portfolio of work</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search projects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-gray-900 border-gray-700 text-white w-full sm:w-64"
                />
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className={`border-gray-700 ${viewMode === "grid" ? "bg-gray-800" : "bg-transparent"}`}
                  onClick={() => setViewMode("grid")}
                >
                  <Grid3X3 className="h-4 w-4" />
                  <span className="sr-only">Grid view</span>
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className={`border-gray-700 ${viewMode === "masonry" ? "bg-gray-800" : "bg-transparent"}`}
                  onClick={() => setViewMode("masonry")}
                >
                  <Layout className="h-4 w-4" />
                  <span className="sr-only">Masonry view</span>
                </Button>
                <Button
                  variant="outline"
                  className="border-gray-700 flex items-center gap-2"
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                >
                  <Filter className="h-4 w-4" />
                  <span className="hidden sm:inline">Filter</span>
                </Button>
              </div>
            </div>
          </div>

          {/* Category Filter */}
          <AnimatePresence>
            {isFilterOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden mb-8"
              >
                <div className="p-6 bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-800">
                  <h3 className="text-lg font-bold mb-4">Filter by Category</h3>
                  <div className="flex flex-wrap gap-3">
                    {categories.map((category) => (
                      <motion.button
                        key={category.value}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setActiveCategory(category.value)}
                        className={`px-4 py-2 rounded-full transition-all duration-300 ${
                          activeCategory === category.value
                            ? `bg-gradient-to-r ${category.color} text-white`
                            : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                        }`}
                      >
                        {category.label}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Projects Grid */}
          {filteredProjects.length === 0 ? (
            <div className="text-center py-20">
              <h3 className="text-2xl font-bold mb-4">No projects found</h3>
              <p className="text-gray-400 mb-6">Try adjusting your search or filter criteria</p>
              <Button
                variant="outline"
                className="border-purple-500 text-purple-400 hover:bg-purple-950/30"
                onClick={() => {
                  setActiveCategory("all")
                  setSearchQuery("")
                }}
              >
                Reset Filters
              </Button>
            </div>
          ) : viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={portfolioInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  whileHover={{ y: -10, transition: { duration: 0.3 } }}
                  className="group cursor-pointer"
                  onClick={() => setSelectedProject(project)}
                >
                  <div className="relative h-64 rounded-t-xl overflow-hidden">
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}
                    ></div>
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="bg-gray-900 p-6 rounded-b-xl border border-gray-800 border-t-0">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {project.tags.slice(0, 2).map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className={`text-xs bg-gradient-to-r ${project.color} bg-clip-text text-transparent px-2 py-1 rounded-full border border-gray-700`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-xl font-bold mb-2 group-hover:text-purple-400 transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="text-gray-400 mb-4">Client: {project.client}</p>
                    <div className="flex items-center text-purple-400 font-medium">
                      View Project <ArrowRight className="ml-2 h-4 w-4" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={portfolioInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  whileHover={{ y: -10, transition: { duration: 0.3 } }}
                  className="group cursor-pointer break-inside-avoid"
                  onClick={() => setSelectedProject(project)}
                >
                  <div className="relative h-[300px] rounded-t-xl overflow-hidden">
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}
                    ></div>
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="bg-gray-900 p-6 rounded-b-xl border border-gray-800 border-t-0">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {project.tags.slice(0, 2).map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className={`text-xs bg-gradient-to-r ${project.color} bg-clip-text text-transparent px-2 py-1 rounded-full border border-gray-700`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-xl font-bold mb-2 group-hover:text-purple-400 transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="text-gray-400 mb-4">Client: {project.client}</p>
                    <div className="flex items-center text-purple-400 font-medium">
                      View Project <ArrowRight className="ml-2 h-4 w-4" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </section>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25 }}
              className="relative w-full max-w-6xl max-h-[90vh] overflow-auto bg-gradient-to-br from-gray-900 to-black rounded-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-4 right-4 z-10 h-10 w-10 rounded-full bg-black/50 flex items-center justify-center text-white/70 hover:text-white hover:bg-black/70 transition-colors"
                onClick={() => setSelectedProject(null)}
              >
                <X className="h-5 w-5" />
              </button>

              <div className="relative h-[50vh] overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-br ${selectedProject.color} opacity-30`}></div>
                <Image
                  src={selectedProject.image || "/placeholder.svg"}
                  alt={selectedProject.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent">
                  <div className="absolute bottom-0 left-0 p-8">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {selectedProject.tags.map((tag, tagIndex) => (
                        <span key={tagIndex} className={`text-xs bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full`}>
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold mb-2">{selectedProject.title}</h2>
                    <p className="text-xl text-gray-300">Client: {selectedProject.client}</p>
                  </div>
                </div>
              </div>

              <div className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-2xl font-bold mb-4">Project Overview</h3>
                    <p className="text-gray-300 mb-6">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit
                      arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut
                      in nulla enim. Phasellus molestie magna non est bibendum non venenatis nisl tempor.
                    </p>

                    <h3 className="text-2xl font-bold mb-4">The Challenge</h3>
                    <p className="text-gray-300 mb-6">
                      Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium,
                      totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae
                      dicta sunt explicabo.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold mb-4">Our Solution</h3>
                    <p className="text-gray-300 mb-6">
                      Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur
                      magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem
                      ipsum quia dolor sit amet.
                    </p>

                    <h3 className="text-2xl font-bold mb-4">The Results</h3>
                    <p className="text-gray-300">
                      At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum
                      deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non
                      provident.
                    </p>
                  </div>
                </div>

                <div className="mt-8">
                  <h3 className="text-2xl font-bold mb-4">Project Gallery</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[1, 2, 3].map((item) => (
                      <div key={item} className="relative h-48 rounded-lg overflow-hidden">
                        <Image
                          src={`/placeholder.svg?height=300&width=400&text=Gallery+${item}`}
                          alt={`Gallery image ${item}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-12 flex justify-center">
                  <Link href={`/portfolio/project-${selectedProject.id}`}>
                    <Button className={`bg-gradient-to-r ${selectedProject.color} hover:opacity-90 text-white`}>
                      View Full Case Study <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Call to Action */}
      <section className="py-20 px-4 md:px-8 bg-gradient-to-r from-purple-900/20 to-pink-900/20">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Your Project?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Let's create something amazing together. Contact us to discuss your project and bring your vision to life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" className="bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90 text-white">
                Get in Touch
              </Button>
            </Link>
            <Link href="/services">
              <Button size="lg" variant="outline" className="border-purple-500 text-purple-400 hover:bg-purple-950/30">
                Explore Our Services
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
