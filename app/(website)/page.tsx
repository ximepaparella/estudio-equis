"use client"

import type React from "react"

import { useRef, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion"
import {
  ArrowRight,
  ChevronDown,
  Code,
  Lightbulb,
  Smartphone,
  Zap,
  ArrowUpRight,
  Star,
  Play,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import ContactForm from "@/components/contact-form"
import TeamMember from "@/components/team-member"

export default function Home() {
  const [activeTestimonial, setActiveTestimonial] = useState(0)
  const [showVideo, setShowVideo] = useState(false)

  const { scrollY } = useScroll()
  const heroRef = useRef<HTMLDivElement>(null)
  const servicesRef = useRef<HTMLDivElement>(null)
  const portfolioRef = useRef<HTMLDivElement>(null)
  const aboutRef = useRef<HTMLDivElement>(null)
  const testimonialsRef = useRef<HTMLDivElement>(null)
  const contactRef = useRef<HTMLDivElement>(null)

  const servicesInView = useInView(servicesRef, { once: true, amount: 0.2 })
  const portfolioInView = useInView(portfolioRef, { once: true, amount: 0.2 })
  const aboutInView = useInView(aboutRef, { once: true, amount: 0.2 })
  const testimonialsInView = useInView(testimonialsRef, { once: true, amount: 0.2 })

  const heroY = useTransform(scrollY, [0, 300], [0, 150])
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0.3])
  const heroScale = useTransform(scrollY, [0, 300], [1, 1.1])
  const heroRotate = useTransform(scrollY, [0, 500], [0, 5])
  const textGradient = useTransform(
    scrollY,
    [0, 300],
    ["linear-gradient(to right, #a78bfa, #ec4899, #f43f5e)", "linear-gradient(to right, #8b5cf6, #d946ef, #f43f5e)"],
  )

  const testimonials = [
    {
      quote:
        "Working with this team was a game-changer for our business. They delivered a solution that exceeded our expectations and transformed our digital presence.",
      author: "John Smith",
      company: "Tech Innovations",
      imageSrc: "/placeholder.svg?height=100&width=100&text=JS",
      color: "from-purple-500 to-pink-500",
      rating: 5,
    },
    {
      quote:
        "Their attention to detail and commitment to quality is unmatched. The final product was exactly what we needed, and the results speak for themselves.",
      author: "Maria Garcia",
      company: "Global Solutions",
      imageSrc: "/placeholder.svg?height=100&width=100&text=MG",
      color: "from-blue-500 to-cyan-500",
      rating: 5,
    },
    {
      quote:
        "Not only did they deliver an amazing product, but they were a pleasure to work with throughout the entire process. Highly recommended!",
      author: "David Lee",
      company: "Innovative Startups",
      imageSrc: "/placeholder.svg?height=100&width=100&text=DL",
      color: "from-green-500 to-teal-500",
      rating: 5,
    },
  ]

  const services = [
    {
      icon: <Lightbulb className="h-10 w-10 text-white" />,
      title: "UX/UI Design",
      description: "User-centered design that creates intuitive and engaging digital experiences",
      color: "from-purple-500 to-pink-500",
      features: ["User Research", "Wireframing", "Prototyping", "Visual Design"],
    },
    {
      icon: <Code className="h-10 w-10 text-white" />,
      title: "Software Development",
      description: "Custom software solutions built with the latest technologies and best practices",
      color: "from-blue-500 to-cyan-500",
      features: ["Web Applications", "API Development", "E-commerce", "CMS"],
    },
    {
      icon: <Smartphone className="h-10 w-10 text-white" />,
      title: "Mobile Applications",
      description: "Native and cross-platform mobile apps that deliver exceptional user experiences",
      color: "from-green-500 to-teal-500",
      features: ["iOS Development", "Android Development", "React Native", "Flutter"],
    },
  ]

  const projects = [
    {
      id: 1,
      title: "E-commerce Platform",
      category: "Web Development",
      image: "/placeholder.svg?height=400&width=600&text=Project+1",
      color: "from-purple-500 to-pink-500",
    },
    {
      id: 2,
      title: "Mobile Banking App",
      category: "Mobile Development",
      image: "/placeholder.svg?height=400&width=600&text=Project+2",
      color: "from-blue-500 to-cyan-500",
    },
    {
      id: 3,
      title: "Brand Identity",
      category: "Branding & Design",
      image: "/placeholder.svg?height=400&width=600&text=Project+3",
      color: "from-green-500 to-teal-500",
    },
  ]

  const scrollToSection = (elementRef: React.RefObject<HTMLElement>) => {
    window.scrollTo({
      top: elementRef.current?.offsetTop,
      behavior: "smooth",
    })
  }

  return (
    <main className="flex flex-col min-h-screen bg-black text-white overflow-hidden">
      {/* Hero Section */}
      <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black"></div>
          <Image
            src="/placeholder.svg?height=1080&width=1920&text=Creative+Agency"
            alt="Creative background"
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-full h-full">
            {Array.from({ length: 20 }).map((_, i) => (
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
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: Math.random() * 5 + 5,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
        </div>

        <div className="relative z-10 container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="inline-block bg-gradient-to-r from-purple-600/20 to-pink-600/20 px-4 py-1 rounded-full text-sm text-purple-300 mb-4"
              >
                AWARD-WINNING AGENCY
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-6xl md:text-8xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500"
              >
                Disruptive
                <br />
                Digital Solutions
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="text-xl md:text-2xl mb-8 text-gray-300 max-w-xl"
              >
                We craft innovative software and creative experiences that transform businesses and captivate audiences.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90 text-white group relative overflow-hidden"
                  onClick={() => scrollToSection(servicesRef)}
                >
                  <span className="relative z-10 flex items-center">
                    Explore Our Services
                    <motion.span
                      className="inline-block ml-2"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                    >
                      <ArrowRight className="h-4 w-4" />
                    </motion.span>
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-purple-500 text-purple-400 hover:bg-purple-950/30 group"
                  onClick={() => scrollToSection(portfolioRef)}
                >
                  <span className="relative z-10 flex items-center">
                    View Our Work
                    <motion.span
                      className="inline-block ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                    >
                      <ArrowUpRight className="h-4 w-4" />
                    </motion.span>
                  </span>
                </Button>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="hidden lg:block relative"
            >
              <div className="relative h-[500px] w-[500px]">
                <motion.div
                  className="absolute top-0 left-0 h-64 w-64 rounded-2xl overflow-hidden shadow-xl"
                  animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
                  transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20"></div>
                  <Image
                    src="/placeholder.svg?height=300&width=300&text=Design"
                    alt="Design"
                    fill
                    className="object-cover"
                  />
                </motion.div>

                <motion.div
                  className="absolute bottom-0 left-20 h-72 w-72 rounded-2xl overflow-hidden shadow-xl"
                  animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
                  transition={{ duration: 12, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-cyan-500/20"></div>
                  <Image
                    src="/placeholder.svg?height=300&width=300&text=Development"
                    alt="Development"
                    fill
                    className="object-cover"
                  />
                </motion.div>

                <motion.div
                  className="absolute top-20 right-0 h-56 w-56 rounded-2xl overflow-hidden shadow-xl"
                  animate={{ y: [0, 15, 0], rotate: [0, -3, 0] }}
                  transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-teal-500/20"></div>
                  <Image
                    src="/placeholder.svg?height=300&width=300&text=Innovation"
                    alt="Innovation"
                    fill
                    className="object-cover"
                  />
                </motion.div>

                <motion.div
                  className="absolute -bottom-10 right-10 bg-gradient-to-br from-purple-600 to-pink-600 p-4 rounded-xl shadow-xl"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY }}
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-white/20 p-2 rounded-lg">
                      <Zap className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="text-white font-bold">200+</p>
                      <p className="text-white/80 text-sm">Projects Completed</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Video Modal Button */}
        <div className="absolute bottom-20 right-10 z-20 hidden md:block">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-purple-600 to-pink-600 p-4 rounded-full flex items-center gap-3 group"
            onClick={() => setShowVideo(true)}
          >
            <Play className="h-6 w-6 text-white" />
            <span className="pr-2 font-medium">Watch Showreel</span>
          </motion.button>
        </div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer"
          onClick={() => scrollToSection(servicesRef)}
        >
          <ChevronDown className="h-10 w-10 text-purple-400" />
        </motion.div>
      </section>

      {/* Services Preview */}
      <section ref={servicesRef} className="py-20 px-4 md:px-8 bg-gradient-to-b from-black to-gray-900 relative">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-full h-full">
            {Array.from({ length: 10 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full bg-purple-900/10"
                style={{
                  width: Math.random() * 200 + 50,
                  height: Math.random() * 200 + 50,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  x: [0, Math.random() * 50 - 25],
                  y: [0, Math.random() * 50 - 25],
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
          animate={servicesInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-7xl mx-auto relative z-10"
        >
          <div className="text-center mb-16">
            <div className="inline-block">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={servicesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5 }}
                className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 px-4 py-1 rounded-full text-sm text-purple-300 mb-4 inline-block"
              >
                WHAT WE DO
              </motion.div>
            </div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={servicesInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-6xl font-bold mb-6"
            >
              Our{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
                Services
              </span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={servicesInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl text-gray-400 max-w-3xl mx-auto"
            >
              We deliver cutting-edge solutions tailored to your business needs
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={servicesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                className={`bg-gradient-to-br ${service.color} p-[1px] rounded-xl overflow-hidden h-full`}
              >
                <div className="bg-gray-900/90 p-8 rounded-xl h-full flex flex-col backdrop-blur-sm">
                  <div
                    className={`h-16 w-16 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-6`}
                  >
                    <div className="text-white">{service.icon}</div>
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
                  <p className="text-gray-300 mb-6">{service.description}</p>

                  <div className="mt-auto">
                    <div className="flex flex-wrap gap-2 mb-6">
                      {service.features.map((feature, idx) => (
                        <span key={idx} className="text-xs bg-gray-800 px-3 py-1 rounded-full border border-gray-700">
                          {feature}
                        </span>
                      ))}
                    </div>

                    <Link href="/services" className="inline-flex items-center text-white font-medium group">
                      <span>Learn More</span>
                      <span className="ml-2 transform group-hover:translate-x-1 transition-transform duration-300">
                        <ArrowRight className="h-4 w-4" />
                      </span>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/services">
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90 text-white">
                View All Services <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Portfolio Preview */}
      <section ref={portfolioRef} className="py-20 px-4 md:px-8 bg-gray-900 relative">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-full h-full">
            {Array.from({ length: 8 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full bg-purple-900/10"
                style={{
                  width: Math.random() * 200 + 50,
                  height: Math.random() * 200 + 50,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  x: [0, Math.random() * 50 - 25],
                  y: [0, Math.random() * 50 - 25],
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
          animate={portfolioInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-7xl mx-auto relative z-10"
        >
          <div className="text-center mb-16">
            <div className="inline-block">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={portfolioInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5 }}
                className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 px-4 py-1 rounded-full text-sm text-purple-300 mb-4 inline-block"
              >
                OUR WORK
              </motion.div>
            </div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={portfolioInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-6xl font-bold mb-6"
            >
              Featured{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
                Projects
              </span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={portfolioInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl text-gray-400 max-w-3xl mx-auto"
            >
              Explore our latest projects and creative solutions
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                animate={portfolioInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                className="group cursor-pointer relative h-[400px]"
              >
                <Link href={`/portfolio/project-${project.id}`}>
                  <motion.div
                    whileHover={{
                      y: -10,
                      transition: { duration: 0.3 },
                    }}
                    className="relative h-full rounded-xl overflow-hidden"
                  >
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}
                    ></div>
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                      <span
                        className={`inline-block text-xs bg-gradient-to-r ${project.color} bg-clip-text text-transparent px-2 py-1 rounded-full border border-gray-700 mb-2`}
                      >
                        {project.category}
                      </span>
                      <h3 className="text-2xl font-bold mb-4 text-white">{project.title}</h3>
                      <div className="flex items-center text-white font-medium">
                        View Project <ArrowRight className="ml-2 h-4 w-4" />
                      </div>
                    </div>
                  </motion.div>

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
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/portfolio">
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90 text-white">
                View All Projects <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* About Us Preview */}
      <section ref={aboutRef} className="py-20 px-4 md:px-8 bg-black relative">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-full h-full">
            {Array.from({ length: 8 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full bg-purple-900/10"
                style={{
                  width: Math.random() * 200 + 50,
                  height: Math.random() * 200 + 50,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  x: [0, Math.random() * 50 - 25],
                  y: [0, Math.random() * 50 - 25],
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
          animate={aboutInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-7xl mx-auto relative z-10"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={aboutInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-[1px] rounded-xl overflow-hidden">
                <div className="relative h-[500px] rounded-xl overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20"></div>
                  <Image
                    src="/placeholder.svg?height=500&width=600&text=Our+Team"
                    alt="Our Team"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              <motion.div
                className="absolute -bottom-8 -left-8 bg-gradient-to-br from-purple-600 to-pink-600 p-4 rounded-xl shadow-xl"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY }}
              >
                <div className="flex items-center gap-3">
                  <div className="bg-white/20 p-2 rounded-lg">
                    <Zap className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-bold">8+ Years</p>
                    <p className="text-white/80 text-sm">of Excellence</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={aboutInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="inline-block">
                <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 px-4 py-1 rounded-full text-sm text-purple-300 mb-4 inline-block">
                  WHO WE ARE
                </div>
              </div>
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                About{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">Us</span>
              </h2>
              <p className="text-xl text-gray-400 mb-6">
                We are a team of passionate creators, developers, and strategists dedicated to crafting exceptional
                digital experiences.
              </p>
              <p className="text-gray-400 mb-8">
                Founded in 2015, our agency has grown from a small team of dreamers to a full-service digital
                powerhouse. We combine technical expertise with creative vision to deliver solutions that drive business
                growth and user engagement.
              </p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  { label: "Innovation-driven", icon: <Zap className="h-5 w-5 text-purple-400" /> },
                  { label: "Client-focused", icon: <Zap className="h-5 w-5 text-purple-400" /> },
                  { label: "Results-oriented", icon: <Zap className="h-5 w-5 text-purple-400" /> },
                  { label: "Quality-obsessed", icon: <Zap className="h-5 w-5 text-purple-400" /> },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ y: -5, x: 5 }}
                    className="flex items-center bg-gradient-to-r from-purple-900/20 to-pink-900/20 p-[1px] rounded-xl overflow-hidden"
                  >
                    <div className="flex items-center bg-gray-900 px-4 py-3 rounded-xl w-full">
                      {item.icon}
                      <span className="ml-2">{item.label}</span>
                    </div>
                  </motion.div>
                ))}
              </div>

              <Link href="/about">
                <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90 text-white">
                  Learn More About Us <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </motion.div>
          </div>

          <div className="mt-20">
            <h3 className="text-2xl font-bold mb-8 text-center">
              Meet Our{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">Team</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { name: "Alex Johnson", role: "Founder & CEO", color: "from-purple-500 to-pink-500" },
                { name: "Sarah Chen", role: "Creative Director", color: "from-blue-500 to-cyan-500" },
                { name: "Michael Rodriguez", role: "Lead Developer", color: "from-green-500 to-teal-500" },
                { name: "Emma Wilson", role: "UX/UI Designer", color: "from-orange-500 to-amber-500" },
              ].map((member, index) => (
                <TeamMember
                  key={index}
                  name={member.name}
                  role={member.role}
                  imageSrc={`/placeholder.svg?height=300&width=300&text=${member.name.split(" ")[0]}`}
                  color={member.color}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* Testimonials */}
      <section ref={testimonialsRef} className="py-20 px-4 md:px-8 bg-gradient-to-b from-gray-900 to-black relative">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-full h-full">
            {Array.from({ length: 10 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full bg-purple-900/10"
                style={{
                  width: Math.random() * 200 + 50,
                  height: Math.random() * 200 + 50,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  x: [0, Math.random() * 50 - 25],
                  y: [0, Math.random() * 50 - 25],
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
          animate={testimonialsInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-7xl mx-auto relative z-10"
        >
          <div className="text-center mb-16">
            <div className="inline-block">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={testimonialsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5 }}
                className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 px-4 py-1 rounded-full text-sm text-purple-300 mb-4 inline-block"
              >
                TESTIMONIALS
              </motion.div>
            </div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={testimonialsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-6xl font-bold mb-6"
            >
              What Our{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
                Clients Say
              </span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={testimonialsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl text-gray-400 max-w-3xl mx-auto"
            >
              Don't just take our word for it - hear from some of our satisfied clients
            </motion.p>
          </div>

          <div className="relative">
            <div className="relative h-[400px] md:h-[300px] bg-gradient-to-br from-purple-900/20 to-pink-900/20 p-[1px] rounded-xl overflow-hidden">
              <div className="bg-gray-900/90 rounded-xl h-full backdrop-blur-sm relative overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTestimonial}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0 flex flex-col md:flex-row items-center p-6 md:p-12"
                  >
                    <div className="md:w-1/3 mb-6 md:mb-0 flex justify-center">
                      <div className="relative">
                        <div
                          className={`bg-gradient-to-br ${testimonials[activeTestimonial].color} p-[1px] rounded-full`}
                        >
                          <div className="relative h-24 w-24 rounded-full overflow-hidden">
                            <Image
                              src={testimonials[activeTestimonial].imageSrc || "/placeholder.svg"}
                              alt={testimonials[activeTestimonial].author}
                              fill
                              className="object-cover"
                            />
                          </div>
                        </div>
                        <div className="absolute -bottom-2 -right-2 bg-gray-900 rounded-full p-1">
                          <div
                            className={`bg-gradient-to-br ${testimonials[activeTestimonial].color} rounded-full p-1`}
                          >
                            <svg
                              className="h-6 w-6 text-white"
                              fill="currentColor"
                              viewBox="0 0 32 32"
                              aria-hidden="true"
                            >
                              <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="md:w-2/3 md:pl-8">
                      <p className="text-xl md:text-2xl font-medium mb-6">{testimonials[activeTestimonial].quote}</p>
                      <div>
                        <div className="flex items-center mb-2">
                          {Array.from({ length: testimonials[activeTestimonial].rating }).map((_, i) => (
                            <Star key={i} className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                          ))}
                        </div>
                        <h4 className="text-xl font-bold">{testimonials[activeTestimonial].author}</h4>
                        <p className="text-gray-400">{testimonials[activeTestimonial].company}</p>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            <div className="flex justify-center mt-8 gap-4">
              <button
                onClick={() => setActiveTestimonial((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))}
                className="bg-gray-800 hover:bg-gray-700 p-2 rounded-full transition-colors"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <div className="flex items-center gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveTestimonial(index)}
                    className={`h-3 w-3 rounded-full transition-colors ${
                      activeTestimonial === index ? "bg-purple-500" : "bg-gray-700"
                    }`}
                  />
                ))}
              </div>
              <button
                onClick={() => setActiveTestimonial((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))}
                className="bg-gray-800 hover:bg-gray-700 p-2 rounded-full transition-colors"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Contact Form */}
      <section ref={contactRef} className="py-20 px-4 md:px-8 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block">
              <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 px-4 py-1 rounded-full text-sm text-purple-300 mb-4 inline-block">
                CONTACT US
              </div>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Get In{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">Touch</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Ready to start your next project? Contact us today for a free consultation
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 p-[1px] rounded-xl">
              <div className="bg-gray-900 p-8 rounded-xl h-full">
                <ContactForm />
              </div>
            </div>

            <div className="flex flex-col justify-center">
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-4">Contact Information</h3>
                <p className="text-gray-400 mb-6">
                  Fill out the form or contact us directly using the information below
                </p>

                <div className="space-y-6">
                  {[
                    {
                      icon: (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-purple-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                          />
                        </svg>
                      ),
                      title: "Phone",
                      info: "+1 (555) 123-4567",
                      color: "from-purple-500 to-pink-500",
                    },
                    {
                      icon: (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-purple-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                      ),
                      title: "Email",
                      info: "info@creativeagency.com",
                      color: "from-blue-500 to-cyan-500",
                    },
                    {
                      icon: (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-purple-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                      ),
                      title: "Location",
                      info: "123 Innovation Street, Tech City, TC 10101",
                      color: "from-green-500 to-teal-500",
                    },
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ x: 5 }}
                      className={`bg-gradient-to-br ${item.color} p-[1px] rounded-xl overflow-hidden`}
                    >
                      <div className="flex items-start bg-gray-900 p-4 rounded-xl">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-800 flex items-center justify-center mr-4">
                          {item.icon}
                        </div>
                        <div>
                          <h4 className="text-lg font-medium">{item.title}</h4>
                          <p className="text-gray-400">{item.info}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-4">Follow Us</h3>
                <div className="flex space-x-4">
                  {["twitter", "facebook", "instagram", "linkedin"].map((social) => (
                    <motion.a
                      key={social}
                      whileHover={{ y: -5, scale: 1.1 }}
                      href={`https://${social}.com`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="h-12 w-12 rounded-full bg-gradient-to-br from-purple-500/30 to-pink-500/30 flex items-center justify-center hover:from-purple-500 hover:to-pink-500 transition-all duration-300"
                    >
                      <span className="sr-only">{social}</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                        />
                      </svg>
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
