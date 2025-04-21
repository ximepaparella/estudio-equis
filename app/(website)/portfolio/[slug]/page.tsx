"use client"

import { useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { ArrowLeft, Calendar, User, Tag, ArrowRight, ChevronRight, ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

// This would typically come from a CMS or API
const getProjectData = (slug: string) => {
  // Mock data - in a real app, you'd fetch this from an API
  const projects = [
    {
      id: "project-1",
      title: "E-commerce Platform Redesign",
      client: "Fashion Retailer",
      date: "January 2023",
      category: ["Web Development", "UX/UI Design"],
      tags: ["E-commerce", "React", "Node.js", "Responsive Design"],
      description:
        "A complete redesign and development of an e-commerce platform for a fashion retailer, focusing on improving user experience, conversion rates, and mobile responsiveness.",
      challenge:
        "The client's existing e-commerce platform was outdated, had poor mobile performance, and suffered from low conversion rates. They needed a modern, responsive solution that would improve the shopping experience and increase sales.",
      solution:
        "We designed and developed a custom e-commerce platform using React for the frontend and Node.js for the backend. The new platform features a clean, intuitive interface, advanced filtering options, personalized recommendations, and a streamlined checkout process.",
      results:
        "The new platform resulted in a 45% increase in mobile conversions, a 30% reduction in cart abandonment, and a 25% increase in average order value. Page load times were reduced by 60%, significantly improving the overall user experience.",
      testimonial: {
        quote:
          "The team delivered an exceptional e-commerce platform that exceeded our expectations. The new design has significantly improved our conversion rates and customer satisfaction.",
        author: "Sarah Johnson",
        role: "Marketing Director, Fashion Retailer",
      },
      images: [
        "/placeholder.svg?height=600&width=1200&text=Project+Overview",
        "/placeholder.svg?height=600&width=1200&text=Mobile+View",
        "/placeholder.svg?height=600&width=1200&text=Desktop+View",
        "/placeholder.svg?height=600&width=1200&text=Checkout+Process",
      ],
      color: "from-purple-500 to-pink-500",
      nextProject: "project-2",
      prevProject: "project-9",
    },
    {
      id: "project-2",
      title: "Financial Services Mobile App",
      client: "Banking Institution",
      date: "March 2023",
      category: ["Mobile Development", "UX/UI Design"],
      tags: ["Mobile App", "FinTech", "iOS", "Android", "React Native"],
      description:
        "A comprehensive mobile banking application that provides users with secure access to their accounts, transaction history, and financial tools.",
      challenge:
        "The client needed a secure, user-friendly mobile application that would allow customers to manage their finances on the go while maintaining the highest standards of security and compliance.",
      solution:
        "We developed a cross-platform mobile application using React Native, with a focus on security, performance, and user experience. The app includes features such as biometric authentication, real-time transaction monitoring, and personalized financial insights.",
      results:
        "The app has been downloaded over 100,000 times since launch, with a 4.8/5 rating on app stores. User engagement has increased by 60%, and the client has seen a 40% reduction in call center volume for routine transactions.",
      testimonial: {
        quote:
          "This mobile app has transformed how our customers interact with our services. The team's attention to security and user experience was exceptional.",
        author: "Michael Chen",
        role: "CTO, Banking Institution",
      },
      images: [
        "/placeholder.svg?height=600&width=1200&text=App+Overview",
        "/placeholder.svg?height=600&width=1200&text=Login+Screen",
        "/placeholder.svg?height=600&width=1200&text=Dashboard",
        "/placeholder.svg?height=600&width=1200&text=Transaction+History",
      ],
      color: "from-blue-500 to-cyan-500",
      nextProject: "project-3",
      prevProject: "project-1",
    },
    // Additional projects would be defined here
  ]

  // Find the project by slug
  const project = projects.find((p) => p.id === slug) || projects[0]
  return project
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const { slug } = params
  const project = getProjectData(slug)
  const [activeImageIndex, setActiveImageIndex] = useState(0)

  const overviewRef = useRef<HTMLDivElement>(null)
  const imagesRef = useRef<HTMLDivElement>(null)
  const testimonialRef = useRef<HTMLDivElement>(null)

  const overviewInView = useInView(overviewRef, { once: true, amount: 0.2 })
  const imagesInView = useInView(imagesRef, { once: true, amount: 0.2 })
  const testimonialInView = useInView(testimonialRef, { once: true, amount: 0.2 })

  return (
    <main className="flex flex-col min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative h-[70vh] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black"></div>
          <Image
            src={project.images[0] || "/placeholder.svg"}
            alt={project.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="relative z-10 h-full flex flex-col justify-end p-6 md:p-12 max-w-7xl mx-auto">
          <Link
            href="/portfolio"
            className="flex items-center text-purple-400 mb-6 hover:text-purple-300 transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Portfolio
          </Link>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500"
          >
            {project.title}
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-wrap gap-4 mb-6"
          >
            <div className="flex items-center text-gray-300">
              <User className="mr-2 h-4 w-4 text-purple-400" />
              {project.client}
            </div>
            <div className="flex items-center text-gray-300">
              <Calendar className="mr-2 h-4 w-4 text-purple-400" />
              {project.date}
            </div>
            <div className="flex items-center text-gray-300">
              <Tag className="mr-2 h-4 w-4 text-purple-400" />
              {project.category.join(", ")}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Project Overview */}
      <section
        ref={overviewRef}
        className="py-20 px-4 md:px-8 bg-gradient-to-b from-black to-gray-900 relative overflow-hidden"
      >
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-full h-full">
            {Array.from({ length: 10 }).map((_, i) => (
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
          initial={{ opacity: 0, y: 50 }}
          animate={overviewInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-7xl mx-auto relative z-10"
        >
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Project{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
                Overview
              </span>
            </h2>
            <p className="text-xl text-gray-300 mb-12 max-w-4xl">{project.description}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                className={`bg-gradient-to-br ${project.color} p-[1px] rounded-xl overflow-hidden`}
              >
                <div className="bg-gray-900 p-8 h-full rounded-xl">
                  <h3 className="text-2xl font-bold mb-4">The Challenge</h3>
                  <p className="text-gray-300">{project.challenge}</p>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                className={`bg-gradient-to-br ${project.color} p-[1px] rounded-xl overflow-hidden`}
              >
                <div className="bg-gray-900 p-8 h-full rounded-xl">
                  <h3 className="text-2xl font-bold mb-4">Our Solution</h3>
                  <p className="text-gray-300">{project.solution}</p>
                </div>
              </motion.div>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-4">Results</h3>
            <p className="text-gray-300 mb-8">{project.results}</p>

            <div className="flex flex-wrap gap-3 mb-12">
              {project.tags.map((tag, index) => (
                <motion.span
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className={`bg-gradient-to-r ${project.color} bg-clip-text text-transparent px-3 py-1 rounded-full border border-gray-700`}
                >
                  {tag}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* Project Images */}
      <section ref={imagesRef} className="py-20 px-4 md:px-8 bg-gray-900">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={imagesInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-7xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            Project{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">Gallery</span>
          </h2>

          <div className="relative">
            <div className="relative h-[60vh] rounded-xl overflow-hidden mb-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeImageIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={project.images[activeImageIndex] || "/placeholder.svg"}
                    alt={`Project image ${activeImageIndex + 1}`}
                    fill
                    className="object-cover"
                  />
                </motion.div>
              </AnimatePresence>

              <button
                className="absolute left-4 top-1/2 transform -translate-y-1/2 h-10 w-10 rounded-full bg-black/50 flex items-center justify-center text-white/70 hover:text-white hover:bg-black/70 transition-colors z-10"
                onClick={() => setActiveImageIndex((prev) => (prev === 0 ? project.images.length - 1 : prev - 1))}
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                className="absolute right-4 top-1/2 transform -translate-y-1/2 h-10 w-10 rounded-full bg-black/50 flex items-center justify-center text-white/70 hover:text-white hover:bg-black/70 transition-colors z-10"
                onClick={() => setActiveImageIndex((prev) => (prev === project.images.length - 1 ? 0 : prev + 1))}
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>

            <div className="flex gap-4 overflow-x-auto pb-4">
              {project.images.map((image, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`relative h-20 w-32 rounded-lg overflow-hidden cursor-pointer flex-shrink-0 ${
                    activeImageIndex === index ? `ring-2 ring-offset-2 ring-offset-gray-900 ring-purple-500` : ""
                  }`}
                  onClick={() => setActiveImageIndex(index)}
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`Thumbnail ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* Testimonial */}
      <section ref={testimonialRef} className="py-20 px-4 md:px-8 bg-black">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={testimonialInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <div className={`bg-gradient-to-r ${project.color} p-[1px] rounded-xl overflow-hidden`}>
            <div className="bg-gradient-to-br from-gray-900 to-black p-8 md:p-12 rounded-xl">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={testimonialInView ? { scale: 1, opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <svg
                  className="h-12 w-12 text-purple-400 mb-6"
                  fill="currentColor"
                  viewBox="0 0 32 32"
                  aria-hidden="true"
                >
                  <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                </svg>
              </motion.div>

              <motion.blockquote
                initial={{ opacity: 0, y: 20 }}
                animate={testimonialInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="text-xl md:text-2xl font-medium text-white mb-6"
              >
                "{project.testimonial.quote}"
              </motion.blockquote>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={testimonialInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="flex items-center"
              >
                <div
                  className={`h-12 w-12 rounded-full bg-gradient-to-br ${project.color} flex items-center justify-center mr-4`}
                >
                  <User className="h-6 w-6 text-white" />
                </div>
                <div>
                  <div className="font-bold">{project.testimonial.author}</div>
                  <div className="text-gray-400">{project.testimonial.role}</div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Related Projects */}
      <section className="py-20 px-4 md:px-8 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">
            Related{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">Projects</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <motion.div
                key={item}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                className="group cursor-pointer"
              >
                <div className="relative h-64 rounded-t-xl overflow-hidden">
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}
                  ></div>
                  <Image
                    src={`/placeholder.svg?height=400&width=600&text=Related+${item}`}
                    alt={`Related project ${item}`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="bg-gray-900 p-6 rounded-b-xl border border-gray-800 border-t-0">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-purple-400 transition-colors duration-300">
                    Related Project {item}
                  </h3>
                  <p className="text-gray-400 mb-4">Client Name</p>
                  <div className="flex items-center text-purple-400 font-medium">
                    View Project <ArrowRight className="ml-2 h-4 w-4" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Navigation */}
      <section className="py-12 px-4 md:px-8 bg-gray-900 border-t border-gray-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center">
          <Link href={`/portfolio/${project.prevProject}`}>
            <Button variant="outline" className="mb-4 sm:mb-0 border-purple-500 text-purple-400 hover:bg-purple-950/30">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Previous Project
            </Button>
          </Link>

          <Link href="/portfolio">
            <Button variant="outline" className="mb-4 sm:mb-0 border-gray-700 text-gray-300 hover:bg-gray-800">
              All Projects
            </Button>
          </Link>

          <Link href={`/portfolio/${project.nextProject}`}>
            <Button className={`bg-gradient-to-r ${project.color} hover:opacity-90 text-white`}>
              Next Project
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 md:px-8 bg-black">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Your Project?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Let's create something amazing together. Contact us to discuss your project and bring your vision to life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" className={`bg-gradient-to-r ${project.color} hover:opacity-90 text-white`}>
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
