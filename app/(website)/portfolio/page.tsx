"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { ArrowRight, X, Filter, Search, Grid3X3, Layout } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PortfolioCard, type PortfolioProject, type Category } from "@/components/portfolio/PortfolioCard"

type ViewMode = "grid" | "masonry"

export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState<Category>("all")
  const [viewMode, setViewMode] = useState<ViewMode>("grid")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null)
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

  const projects: PortfolioProject[] = [
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
                <PortfolioCard
                  key={project.id}
                  project={project}
                  variant="compact"
                  animationDelay={index * 0.2}
                />
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
              <PortfolioCard
                key={project.id}
                project={project}
                variant="featured"
                onSelect={setSelectedProject}
                animationDelay={index * 0.1}
              />
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
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className={`border-gray-700 ${viewMode === "masonry" ? "bg-gray-800" : "bg-transparent"}`}
                  onClick={() => setViewMode("masonry")}
                >
                  <Layout className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <PortfolioCard
                key={project.id}
                project={project}
                onSelect={setSelectedProject}
                animationDelay={index * 0.1}
              />
            ))}
          </div>
        </motion.div>
      </section>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-4xl bg-gray-900 rounded-xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
                onClick={() => setSelectedProject(null)}
              >
                <X className="h-6 w-6" />
              </button>

              <div className="relative h-[400px] md:h-[500px]">
                <Image
                  src={selectedProject.image || "/placeholder.svg"}
                  alt={selectedProject.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
              </div>

              <div className="p-8">
                <h2 className="text-3xl font-bold mb-4">{selectedProject.title}</h2>
                <p className="text-gray-300 mb-6">Client: {selectedProject.client}</p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedProject.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 rounded-full bg-white/10 text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4">
                  <Button
                    className={`bg-gradient-to-r ${selectedProject.color} hover:opacity-90 text-white`}
                  >
                    View Live Project <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button variant="outline">View Case Study</Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
