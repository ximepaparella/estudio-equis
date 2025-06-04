"use client"

import type React from "react"
import { useRef, useState } from "react"
import Image from "next/image"
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion"
import {
  ArrowRight,
  ChevronDown,
  Code,
  Users,
  Target,
  Brain,
  Rocket,
  Star,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  TrendingUp,
  Award,
  Globe,
  MessageSquare,
  Calendar,
  ArrowUpRight,
  Coffee,
  Clock,
  MapPin,
  AlertTriangle,
  Layers,
  Briefcase,
  Lightbulb,
  GraduationCap,
  Zap,
  Building,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

export default function CodeRoots() {
  const [activeTestimonial, setActiveTestimonial] = useState(0)
  const [showVideo, setShowVideo] = useState(false)
  const [activeMonth, setActiveMonth] = useState(new Date().getMonth())

  const { scrollY } = useScroll()
  const heroRef = useRef<HTMLDivElement>(null)
  const problemsRef = useRef<HTMLDivElement>(null)
  const marketProblemsRef = useRef<HTMLDivElement>(null)
  const solutionRef = useRef<HTMLDivElement>(null)
  const portfolioRef = useRef<HTMLDivElement>(null)
  const programRef = useRef<HTMLDivElement>(null)
  const communityRef = useRef<HTMLDivElement>(null)
  const eventsRef = useRef<HTMLDivElement>(null)
  const contactRef = useRef<HTMLDivElement>(null)

  const problemsInView = useInView(problemsRef, { once: true, amount: 0.2 })
  const marketProblemsInView = useInView(marketProblemsRef, { once: true, amount: 0.2 })
  const solutionInView = useInView(solutionRef, { once: true, amount: 0.2 })
  const portfolioInView = useInView(portfolioRef, { once: true, amount: 0.2 })
  const programInView = useInView(programRef, { once: true, amount: 0.2 })
  const communityInView = useInView(communityRef, { once: true, amount: 0.2 })
  const eventsInView = useInView(eventsRef, { once: true, amount: 0.2 })

  const heroY = useTransform(scrollY, [0, 300], [0, 150])
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0.3])

  const problems = [
    {
      icon: <Target className="h-8 w-8 text-red-400" />,
      title: "Las empresas no quieren perfiles junior sin experiencia",
      description: "Existe una brecha entre la formación y las expectativas del mercado laboral",
      color: "from-red-500 to-pink-500",
    },
    {
      icon: <Code className="h-8 w-8 text-pink-400" />,
      title: "Los bootcamps no forman bases sólidas",
      description: "Falta trabajo en equipo real y práctica profesional estructurada",
      color: "from-pink-500 to-purple-500",
    },
    {
      icon: <Brain className="h-8 w-8 text-purple-400" />,
      title: "IA sin fundamentos técnicos es riesgoso",
      description: "El uso de inteligencia artificial requiere bases técnicas sólidas",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: <Users className="h-8 w-8 text-blue-400" />,
      title: "No hay espacios reales para practicar",
      description: "Falta el puente entre el bootcamp y el primer trabajo real",
      color: "from-blue-500 to-cyan-500",
    },
  ]

  const marketProblems = [
    {
      icon: <AlertTriangle className="h-8 w-8 text-red-400" />,
      title: "La brecha entre la formación tradicional y las necesidades reales del mercado tech",
      description: "El problema es real",
      color: "from-red-500 to-pink-500",
    },
    {
      icon: <Briefcase className="h-8 w-8 text-pink-400" />,
      title: "Las empresas no contratan perfiles junior sin experiencia práctica en proyectos reales",
      description: "Sin experiencia real",
      color: "from-pink-500 to-purple-500",
    },
    {
      icon: <GraduationCap className="h-8 w-8 text-purple-400" />,
      title: "Los bootcamps no enseñan trabajo en equipo ni metodologías profesionales",
      description: "Formación incompleta",
      color: "from-purple-500 to-blue-500",
    },
    {
      icon: <Brain className="h-8 w-8 text-blue-400" />,
      title: "Usar inteligencia artificial sin bases técnicas sólidas es riesgoso y limitante",
      description: "IA sin fundamentos",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: <Layers className="h-8 w-8 text-cyan-400" />,
      title: "No hay espacios reales para practicar y desarrollar habilidades técnicas",
      description: "Falta de práctica",
      color: "from-cyan-500 to-teal-500",
    },
    {
      icon: <Lightbulb className="h-8 w-8 text-teal-400" />,
      title: "Existe un gap entre el bootcamp y el primer trabajo profesional",
      description: "Vacío formativo",
      color: "from-teal-500 to-green-500",
    },
    {
      icon: <Zap className="h-8 w-8 text-green-400" />,
      title: "Sin mentoría y feedback técnico, el crecimiento profesional se estanca",
      description: "Crecimiento limitado",
      color: "from-green-500 to-emerald-500",
    },
  ]

  const solutions = [
    {
      icon: <Rocket className="h-10 w-10 text-white" />,
      title: "Entrenamiento AI-First",
      description: "Formamos talento técnico con enfoque en inteligencia artificial desde el primer día",
      features: ["Fundamentos sólidos", "Práctica guiada", "Mentalidad técnica", "IA aplicada"],
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: <Users className="h-10 w-10 text-white" />,
      title: "Proyectos Reales",
      description: "Cohortes con proyectos reales, feedback técnico y trabajo en equipo colaborativo",
      features: ["Equipos funcionales", "Mentoría activa", "Entregables reales", "QA profesional"],
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: <TrendingUp className="h-10 w-10 text-white" />,
      title: "Conexión Empresarial",
      description: "Las empresas contratan micro-equipos con mentor para tareas y proyectos reales",
      features: ["Equipos curados", "Seguimiento continuo", "Resultados medibles", "Bajo riesgo"],
      color: "from-green-500 to-teal-500",
    },
  ]

  const portfolioProjects = [
    {
      id: 1,
      title: "HealthTrack AI",
      category: "Healthcare",
      description: "Plataforma de seguimiento médico con integración de IA para predicción de patrones de salud",
      image: "/placeholder.svg?height=400&width=600&text=HealthTrack+AI",
      techStack: ["React", "Node.js", "TensorFlow", "MongoDB"],
      color: "from-purple-500 to-pink-500",
    },
    {
      id: 2,
      title: "EcoFinance",
      category: "Fintech",
      description: "Sistema de gestión financiera para empresas con enfoque en sostenibilidad y reportes ESG",
      image: "/placeholder.svg?height=400&width=600&text=EcoFinance",
      techStack: ["Vue.js", "Django", "PostgreSQL", "Docker"],
      color: "from-blue-500 to-cyan-500",
    },
    {
      id: 3,
      title: "LogiSmart",
      category: "Logistics",
      description: "Optimización de rutas de distribución con algoritmos de machine learning y tracking en tiempo real",
      image: "/placeholder.svg?height=400&width=600&text=LogiSmart",
      techStack: ["React Native", "Python", "AWS", "GraphQL"],
      color: "from-green-500 to-teal-500",
    },
    {
      id: 4,
      title: "EduConnect",
      category: "Education",
      description:
        "Plataforma educativa que conecta estudiantes con mentores especializados mediante matching inteligente",
      image: "/placeholder.svg?height=400&width=600&text=EduConnect",
      techStack: ["Next.js", "Firebase", "Tailwind", "WebRTC"],
      color: "from-pink-500 to-purple-500",
    },
    {
      id: 5,
      title: "RetailVision",
      category: "Retail",
      description: "Sistema de análisis de comportamiento de clientes en tiendas físicas mediante visión computacional",
      image: "/placeholder.svg?height=400&width=600&text=RetailVision",
      techStack: ["Angular", "Python", "OpenCV", "Azure"],
      color: "from-yellow-500 to-orange-500",
    },
    {
      id: 6,
      title: "GreenCity",
      category: "Smart Cities",
      description: "Plataforma IoT para monitoreo y optimización de recursos urbanos con enfoque en sostenibilidad",
      image: "/placeholder.svg?height=400&width=600&text=GreenCity",
      techStack: ["React", "Node.js", "InfluxDB", "MQTT"],
      color: "from-teal-500 to-green-500",
    },
  ]

  const testimonials = [
    {
      quote:
        "CodeRoots me dio la experiencia real que necesitaba. Ahora trabajo en una startup y me siento preparado para cualquier desafío técnico.",
      author: "María González",
      role: "Frontend Developer",
      company: "TechStartup",
      imageSrc: "/placeholder.svg?height=100&width=100&text=MG",
      color: "from-purple-500 to-pink-500",
      rating: 5,
    },
    {
      quote:
        "La mentoría y los proyectos reales fueron clave para mi crecimiento. Pasé de junior a semi-senior en 6 meses.",
      author: "Carlos Ruiz",
      role: "Backend Developer",
      company: "InnovateLab",
      imageSrc: "/placeholder.svg?height=100&width=100&text=CR",
      color: "from-blue-500 to-cyan-500",
      rating: 5,
    },
    {
      quote: "Como empresa, CodeRoots nos proporcionó equipos preparados que entregaron resultados desde el día uno.",
      author: "Ana Martínez",
      role: "CTO",
      company: "Digital Agency",
      imageSrc: "/placeholder.svg?height=100&width=100&text=AM",
      color: "from-green-500 to-teal-500",
      rating: 5,
    },
  ]

  const programs = [
    {
      title: "Tracks Técnicos",
      description: "Especialización en Frontend, Backend, QA, UX/UI y DevOps",
      icon: <Code className="h-8 w-8 text-purple-400" />,
      features: ["Mentoría 1:1", "Proyectos reales", "Feedback técnico", "Portafolio profesional"],
      duration: "3-6 meses",
      level: "Junior a Semi-Senior",
      color: "from-purple-500 to-pink-500",
    },
    {
      title: "Liderazgo Técnico",
      description: "Formación en gestión de equipos y arquitectura de software",
      icon: <Award className="h-8 w-8 text-blue-400" />,
      features: ["Tech Leads", "Managers", "Project Leads", "Product Management"],
      duration: "6-12 meses",
      level: "Semi-Senior a Senior",
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "High Level Track",
      description: "Formación avanzada para roles de liderazgo estratégico",
      icon: <Building className="h-8 w-8 text-green-400" />,
      features: ["CPO", "CTO", "Founder", "Architects"],
      duration: "8-12 meses",
      level: "Senior a Executive",
      color: "from-green-500 to-teal-500",
    },
    {
      title: "AI-First Development",
      description: "Integración de IA en desarrollo con fundamentos sólidos",
      icon: <Brain className="h-8 w-8 text-pink-400" />,
      features: ["Machine Learning", "AI Tools", "Automation", "Ethical AI"],
      duration: "4-8 meses",
      level: "Todos los niveles",
      color: "from-pink-500 to-purple-500",
    },
  ]

  const months = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ]

  const events = {
    0: [
      // January
      {
        title: "Introducción a AI-First Development",
        type: "Talk",
        date: "15 Enero, 2025",
        time: "18:00 - 20:00",
        location: "Online",
        speaker: "Dr. Ana Martínez",
        color: "from-purple-500 to-pink-500",
      },
      {
        title: "Networking: Tech Leads & Juniors",
        type: "Networking",
        date: "22 Enero, 2025",
        time: "19:00 - 21:00",
        location: "WeWork Reforma, CDMX",
        speaker: "CodeRoots Community",
        color: "from-blue-500 to-cyan-500",
      },
    ],
    1: [
      // February
      {
        title: "Workshop: Arquitectura de Software",
        type: "Workshop",
        date: "5 Febrero, 2025",
        time: "17:00 - 20:00",
        location: "Online",
        speaker: "Ing. Roberto Sánchez",
        color: "from-green-500 to-teal-500",
      },
      {
        title: "Fogón Técnico: Clean Code",
        type: "Discussion",
        date: "18 Febrero, 2025",
        time: "18:30 - 20:30",
        location: "Café Coyoacán, CDMX",
        speaker: "CodeRoots Mentors",
        color: "from-pink-500 to-purple-500",
      },
    ],
    2: [
      // March
      {
        title: "AI Ethics in Development",
        type: "Talk",
        date: "8 Marzo, 2025",
        time: "18:00 - 19:30",
        location: "Online",
        speaker: "Dra. Lucía Ramírez",
        color: "from-purple-500 to-pink-500",
      },
      {
        title: "Hackathon: Soluciones AI-First",
        type: "Hackathon",
        date: "20-22 Marzo, 2025",
        time: "Todo el día",
        location: "Campus CodeRoots, CDMX",
        speaker: "Múltiples mentores",
        color: "from-blue-500 to-cyan-500",
      },
    ],
    3: [
      // April
      {
        title: "Masterclass: React Avanzado",
        type: "Workshop",
        date: "12 Abril, 2025",
        time: "10:00 - 14:00",
        location: "Online",
        speaker: "Carlos Vega, Sr. Frontend",
        color: "from-green-500 to-teal-500",
      },
      {
        title: "Networking: Tech Recruiters",
        type: "Networking",
        date: "25 Abril, 2025",
        time: "19:00 - 21:00",
        location: "Hotel W, CDMX",
        speaker: "CodeRoots + Tech Companies",
        color: "from-pink-500 to-purple-500",
      },
    ],
    4: [
      // May
      {
        title: "Workshop: CI/CD Pipelines",
        type: "Workshop",
        date: "10 Mayo, 2025",
        time: "16:00 - 19:00",
        location: "Online",
        speaker: "Ing. Fernando López, DevOps",
        color: "from-purple-500 to-pink-500",
      },
      {
        title: "Fogón Técnico: Microservicios",
        type: "Discussion",
        date: "22 Mayo, 2025",
        time: "18:30 - 20:30",
        location: "Café Roma, CDMX",
        speaker: "CodeRoots Architects",
        color: "from-blue-500 to-cyan-500",
      },
    ],
    5: [
      // June
      {
        title: "AI Tools for Developers",
        type: "Talk",
        date: "7 Junio, 2025",
        time: "18:00 - 19:30",
        location: "Online",
        speaker: "Miguel Torres, AI Engineer",
        color: "from-green-500 to-teal-500",
      },
      {
        title: "Demo Day: Proyectos CodeRoots",
        type: "Showcase",
        date: "28 Junio, 2025",
        time: "16:00 - 20:00",
        location: "Campus CodeRoots, CDMX",
        speaker: "Equipos CodeRoots",
        color: "from-pink-500 to-purple-500",
      },
    ],
  }

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
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black"></div>
          <Image
            src="/placeholder.svg?height=1080&width=1920&text=CodeRoots+Background"
            alt="CodeRoots background"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-full h-full">
            {Array.from({ length: 15 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full bg-gradient-to-r from-purple-900/20 to-pink-900/20"
                style={{
                  width: Math.random() * 200 + 50,
                  height: Math.random() * 200 + 50,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3],
                  rotate: [0, 180, 360],
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

        <div className="relative z-10 container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex items-center gap-3 mb-6"
              >
                <Badge className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 text-purple-300 border-purple-500/30">
                  AI-FIRST COMMUNITY
                </Badge>
                <Badge className="bg-gradient-to-r from-green-600/20 to-teal-600/20 text-green-300 border-green-500/30">
                  REAL PROJECTS
                </Badge>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-6xl md:text-8xl font-bold mb-6"
              >
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
                  Code
                </span>
                <span className="text-white">Roots</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="text-xl md:text-2xl mb-4 text-gray-300 max-w-xl"
              >
                Formar talento real desde la raíz
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="text-lg mb-8 text-gray-400 max-w-xl"
              >
                Comunidad AI-First de formación, mentoría y experiencia laboral real para desarrolladores en sus
                primeros años de carrera.
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
                  onClick={() => scrollToSection(programRef)}
                >
                  <span className="relative z-10 flex items-center">
                    Únete a la Comunidad
                    <motion.span
                      className="inline-block ml-2"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                    >
                      <ArrowRight className="h-4 w-4" />
                    </motion.span>
                  </span>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-purple-500 text-purple-400 hover:bg-purple-950/30 group"
                  onClick={() => scrollToSection(solutionRef)}
                >
                  <span className="relative z-10 flex items-center">
                    Conoce Más
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

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
                className="flex items-center gap-6 mt-8"
              >
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-purple-400" />
                  <span className="text-sm text-gray-400">200+ Desarrolladores</span>
                </div>
                <div className="flex items-center gap-2">
                  <Rocket className="h-5 w-5 text-green-400" />
                  <span className="text-sm text-gray-400">50+ Proyectos Reales</span>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="hidden lg:block relative"
            >
              <div className="relative h-[600px] w-[600px]">
                {/* Main floating card */}
                <motion.div
                  className="absolute top-0 left-0 h-80 w-80 rounded-2xl overflow-hidden shadow-2xl"
                  animate={{ y: [0, -20, 0], rotate: [0, 3, 0] }}
                  transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/30 to-pink-500/30"></div>
                  <div className="p-8 h-full flex flex-col justify-center">
                    <Code className="h-16 w-16 text-purple-400 mb-4" />
                    <h3 className="text-2xl font-bold mb-2">AI-First</h3>
                    <p className="text-gray-300">Desarrollo con inteligencia artificial desde el primer día</p>
                  </div>
                </motion.div>

                {/* Secondary floating card */}
                <motion.div
                  className="absolute bottom-0 right-0 h-72 w-72 rounded-2xl overflow-hidden shadow-2xl"
                  animate={{ y: [0, 15, 0], rotate: [0, -3, 0] }}
                  transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 to-cyan-500/30"></div>
                  <div className="p-6 h-full flex flex-col justify-center">
                    <Users className="h-12 w-12 text-blue-400 mb-4" />
                    <h3 className="text-xl font-bold mb-2">Comunidad</h3>
                    <p className="text-gray-300 text-sm">Mentoría activa y trabajo colaborativo</p>
                  </div>
                </motion.div>

                {/* Accent floating card */}
                <motion.div
                  className="absolute top-32 right-16 h-56 w-56 rounded-2xl overflow-hidden shadow-2xl"
                  animate={{ y: [0, -10, 0], rotate: [0, 2, 0] }}
                  transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500/30 to-teal-500/30"></div>
                  <div className="p-6 h-full flex flex-col justify-center">
                    <Rocket className="h-10 w-10 text-green-400 mb-3" />
                    <h3 className="text-lg font-bold mb-2">Proyectos Reales</h3>
                    <p className="text-gray-300 text-xs">Experiencia práctica con empresas</p>
                  </div>
                </motion.div>

                {/* Stats floating element */}
                <motion.div
                  className="absolute bottom-16 left-16 bg-gradient-to-br from-purple-600 to-pink-600 p-6 rounded-xl shadow-xl"
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-white/20 p-3 rounded-lg">
                      <TrendingUp className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="text-white font-bold text-lg">95%</p>
                      <p className="text-white/80 text-sm">Empleabilidad</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer"
          onClick={() => scrollToSection(problemsRef)}
        >
          <ChevronDown className="h-10 w-10 text-purple-400" />
        </motion.div>
      </section>

      {/* Problems Section */}
      <section ref={problemsRef} className="py-20 px-4 md:px-8 bg-gradient-to-b from-black to-gray-900 relative">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={problemsInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-7xl mx-auto relative z-10"
        >
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={problemsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 px-4 py-1 rounded-full text-sm text-purple-300 mb-4 inline-block"
            >
              PROBLEMAS QUE ABORDAMOS
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={problemsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-6xl font-bold mb-6"
            >
              La{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">Brecha</span>{" "}
              del Talento
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={problemsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl text-gray-400 max-w-3xl mx-auto"
            >
              Identificamos y solucionamos los principales obstáculos que enfrentan los desarrolladores junior
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {problems.map((problem, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={problemsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                className={`bg-gradient-to-br ${problem.color} p-[1px] rounded-xl overflow-hidden h-full`}
              >
                <div className="bg-gray-900/90 p-8 rounded-xl h-full flex flex-col backdrop-blur-sm">
                  <div className="flex items-center mb-4">
                    <div
                      className={`h-16 w-16 rounded-xl bg-gradient-to-br ${problem.color} flex items-center justify-center mr-4`}
                    >
                      {problem.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2">{problem.title}</h3>
                    </div>
                  </div>
                  <p className="text-gray-300 leading-relaxed">{problem.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Market Problems Section */}
      <section ref={marketProblemsRef} className="py-20 px-4 md:px-8 bg-gray-900 relative">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={marketProblemsInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-7xl mx-auto relative z-10"
        >
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={marketProblemsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-r from-red-600/20 to-pink-600/20 px-4 py-1 rounded-full text-sm text-red-300 mb-4 inline-block"
            >
              PROBLEMA IDENTIFICADO
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={marketProblemsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-6xl font-bold mb-6"
            >
              Realidad del{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-pink-500">Mercado</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={marketProblemsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl text-gray-400 max-w-3xl mx-auto"
            >
              Datos reales sobre los desafíos que enfrenta el talento tech en Latinoamérica
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {marketProblems.map((problem, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={marketProblemsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                whileHover={{
                  y: -5,
                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                  transition: { duration: 0.3 },
                }}
                className={`bg-gradient-to-br ${problem.color} p-[1px] rounded-xl overflow-hidden h-full`}
              >
                <div className="bg-gray-900/90 p-6 rounded-xl h-full flex flex-col backdrop-blur-sm">
                  <div className="flex items-center mb-3">
                    <div
                      className={`h-12 w-12 rounded-lg bg-gradient-to-br ${problem.color} flex items-center justify-center mr-3`}
                    >
                      {problem.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold">{problem.description}</h3>
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed">{problem.title}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Solution Section */}
      <section ref={solutionRef} className="py-20 px-4 md:px-8 bg-black relative">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={solutionInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-7xl mx-auto relative z-10"
        >
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={solutionInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-r from-green-600/20 to-teal-600/20 px-4 py-1 rounded-full text-sm text-green-300 mb-4 inline-block"
            >
              NUESTRA SOLUCIÓN
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={solutionInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-6xl font-bold mb-6"
            >
              Formación{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-teal-500">
                Integral
              </span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={solutionInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl text-gray-400 max-w-3xl mx-auto"
            >
              Un ecosistema completo que conecta talento, empresas y proyectos reales
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {solutions.map((solution, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={solutionInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                className={`bg-gradient-to-br ${solution.color} p-[1px] rounded-xl overflow-hidden h-full`}
              >
                <div className="bg-gray-900/90 p-8 rounded-xl h-full flex flex-col backdrop-blur-sm">
                  <div
                    className={`h-16 w-16 rounded-xl bg-gradient-to-br ${solution.color} flex items-center justify-center mb-6`}
                  >
                    {solution.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{solution.title}</h3>
                  <p className="text-gray-300 mb-6 flex-1">{solution.description}</p>

                  <div className="space-y-2">
                    {solution.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-400" />
                        <span className="text-sm text-gray-300">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Portfolio Projects Section */}
      <section ref={portfolioRef} className="py-20 px-4 md:px-8 bg-gradient-to-b from-black to-gray-900 relative">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={portfolioInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-7xl mx-auto relative z-10"
        >
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={portfolioInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 px-4 py-1 rounded-full text-sm text-purple-300 mb-4 inline-block"
            >
              PORTFOLIO DE PROYECTOS
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={portfolioInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-6xl font-bold mb-6"
            >
              Lo que{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
                Construimos
              </span>{" "}
              Juntos
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={portfolioInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl text-gray-400 max-w-3xl mx-auto"
            >
              Proyectos reales, desafíos técnicos y soluciones concretas
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolioProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                animate={portfolioInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                className="group cursor-pointer relative h-[400px]"
              >
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
                    <h3 className="text-2xl font-bold mb-2 text-white">{project.title}</h3>
                    <p className="text-sm text-gray-300 mb-4">{project.description}</p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.techStack.map((tech, idx) => (
                        <span key={idx} className="text-xs bg-gray-800/80 px-2 py-1 rounded-full">
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center text-white font-medium">
                      Ver Proyecto <ArrowRight className="ml-2 h-4 w-4" />
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
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90 text-white">
              Ver Todos los Proyectos <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </motion.div>
      </section>

      {/* Programs Section */}
      <section ref={programRef} className="py-20 px-4 md:px-8 bg-gradient-to-b from-gray-900 to-black relative">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={programInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-7xl mx-auto relative z-10"
        >
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={programInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 px-4 py-1 rounded-full text-sm text-purple-300 mb-4 inline-block"
            >
              PROGRAMAS DE FORMACIÓN
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={programInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-6xl font-bold mb-6"
            >
              Tracks{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
                Especializados
              </span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={programInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl text-gray-400 max-w-3xl mx-auto"
            >
              Rutas de aprendizaje diseñadas para acelerar tu crecimiento profesional
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-8">
            {programs.map((program, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={programInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                className={`bg-gradient-to-br ${program.color} p-[1px] rounded-xl overflow-hidden h-full`}
              >
                <div className="bg-gray-900/90 p-8 rounded-xl h-full flex flex-col backdrop-blur-sm">
                  <div className="flex items-center mb-6">
                    <div
                      className={`h-16 w-16 rounded-xl bg-gradient-to-br ${program.color} flex items-center justify-center mr-4`}
                    >
                      {program.icon}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-1">{program.title}</h3>
                      <div className="flex gap-2">
                        <Badge variant="outline" className="text-xs">
                          {program.duration}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {program.level}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-300 mb-6 flex-1">{program.description}</p>

                  <div className="space-y-2 mb-6">
                    {program.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-400" />
                        <span className="text-sm text-gray-300">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Button className="w-full bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-600 hover:to-gray-500">
                    Más Información
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Events Calendar Section */}
      <section ref={eventsRef} className="py-20 px-4 md:px-8 bg-black relative">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={eventsInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-7xl mx-auto relative z-10"
        >
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={eventsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-r from-blue-600/20 to-cyan-600/20 px-4 py-1 rounded-full text-sm text-blue-300 mb-4 inline-block"
            >
              CALENDARIO DE EVENTOS
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={eventsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-6xl font-bold mb-6"
            >
              Próximos{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-500">Eventos</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={eventsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl text-gray-400 max-w-3xl mx-auto"
            >
              Charlas, workshops y networking para impulsar tu carrera
            </motion.p>
          </div>

          {/* Month Selector */}
          <div className="flex justify-center mb-10 overflow-x-auto pb-4">
            <div className="flex space-x-2">
              {months.slice(0, 6).map((month, idx) => (
                <motion.button
                  key={idx}
                  onClick={() => setActiveMonth(idx)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    activeMonth === idx
                      ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white"
                      : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {month}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Events Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeMonth}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              {events[activeMonth as keyof typeof events]?.map((event, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  whileHover={{
                    y: -5,
                    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                    transition: { duration: 0.3 },
                  }}
                  className={`bg-gradient-to-br ${event.color} p-[1px] rounded-xl overflow-hidden`}
                >
                  <Card className="bg-gray-900/90 border-0 h-full backdrop-blur-sm">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div>
                          <Badge className={`mb-2 bg-gradient-to-r ${event.color} border-0`}>{event.type}</Badge>
                          <h3 className="text-xl font-bold mb-2 text-white">{event.title}</h3>
                        </div>
                        <div
                          className={`h-12 w-12 rounded-lg bg-gradient-to-br ${event.color} flex items-center justify-center`}
                        >
                          {event.type === "Talk" && <MessageSquare className="h-6 w-6 text-white" />}
                          {event.type === "Workshop" && <Code className="h-6 w-6 text-white" />}
                          {event.type === "Networking" && <Users className="h-6 w-6 text-white" />}
                          {event.type === "Discussion" && <Coffee className="h-6 w-6 text-white" />}
                          {event.type === "Hackathon" && <Rocket className="h-6 w-6 text-white" />}
                          {event.type === "Showcase" && <Award className="h-6 w-6 text-white" />}
                        </div>
                      </div>

                      <div className="mt-4 space-y-2">
                        <div className="flex items-center text-gray-300">
                          <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                          <span>{event.date}</span>
                        </div>
                        <div className="flex items-center text-gray-300">
                          <Clock className="h-4 w-4 mr-2 text-gray-400" />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center text-gray-300">
                          <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                          <span>{event.location}</span>
                        </div>
                        <div className="flex items-center text-gray-300">
                          <Users className="h-4 w-4 mr-2 text-gray-400" />
                          <span>{event.speaker}</span>
                        </div>
                      </div>

                      <Button className="w-full mt-6 bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-600 hover:to-gray-500">
                        Registrarme
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          <div className="text-center mt-12">
            <Button variant="outline" className="border-blue-500 text-blue-400 hover:bg-blue-950/30">
              Ver Todos los Eventos
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </motion.div>
      </section>

      {/* Community Activities */}
      <section ref={communityRef} className="py-20 px-4 md:px-8 bg-gradient-to-b from-gray-900 to-black relative">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={communityInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-7xl mx-auto relative z-10"
        >
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={communityInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-r from-blue-600/20 to-cyan-600/20 px-4 py-1 rounded-full text-sm text-blue-300 mb-4 inline-block"
            >
              ACTIVIDADES Y CULTURA
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={communityInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-6xl font-bold mb-6"
            >
              Comunidad{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-500">Activa</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={communityInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl text-gray-400 max-w-3xl mx-auto"
            >
              Espacios de aprendizaje, networking y crecimiento profesional
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <MessageSquare className="h-8 w-8 text-purple-400" />,
                title: "Charlas Semanales",
                description: "Especialistas en Frontend, Backend, QA, UX y AI",
                color: "from-purple-500 to-pink-500",
              },
              {
                icon: <Coffee className="h-8 w-8 text-pink-400" />,
                title: "Fogones Técnicos",
                description: "Lectura, debate y arquitectura de software",
                color: "from-pink-500 to-purple-500",
              },
              {
                icon: <Users className="h-8 w-8 text-blue-400" />,
                title: "Mentoría Cruzada",
                description: "Círculos de apoyo y feedback técnico",
                color: "from-blue-500 to-cyan-500",
              },
              {
                icon: <Target className="h-8 w-8 text-green-400" />,
                title: "OKRs Individuales",
                description: "Seguimiento personalizado de objetivos",
                color: "from-green-500 to-teal-500",
              },
              {
                icon: <Calendar className="h-8 w-8 text-cyan-400" />,
                title: "Meetups Locales",
                description: "Eventos presenciales y networking",
                color: "from-cyan-500 to-blue-500",
              },
              {
                icon: <Globe className="h-8 w-8 text-purple-400" />,
                title: "Coworking Virtual",
                description: "Espacios de trabajo colaborativo online",
                color: "from-purple-500 to-pink-500",
              },
            ].map((activity, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={communityInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                whileHover={{ y: -5, transition: { duration: 0.3 } }}
                className={`bg-gradient-to-br ${activity.color} p-[1px] rounded-xl overflow-hidden`}
              >
                <div className="bg-gray-900/90 p-6 rounded-xl h-full backdrop-blur-sm">
                  <div
                    className={`h-12 w-12 rounded-lg bg-gradient-to-br ${activity.color} flex items-center justify-center mb-4`}
                  >
                    {activity.icon}
                  </div>
                  <h3 className="text-lg font-bold mb-2">{activity.title}</h3>
                  <p className="text-gray-300 text-sm">{activity.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 md:px-8 bg-black relative">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 px-4 py-1 rounded-full text-sm text-purple-300 mb-4 inline-block">
              TESTIMONIOS
            </div>
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Historias de{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">Éxito</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">Conoce las experiencias de nuestra comunidad</p>
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
                        <p className="text-purple-400">{testimonials[activeTestimonial].role}</p>
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
        </div>
      </section>

      {/* Final CTA Section - Mentors & Companies */}
      <section className="py-20 px-4 md:px-8 bg-gradient-to-b from-black to-gray-900 relative">
        <div className="max-w-5xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold mb-6 text-white"
          >
            ¿Querés sumar tu{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-green-500">
              experiencia
            </span>{" "}
            o tu{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-cyan-500">empresa</span>?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl text-gray-300 mb-12 max-w-4xl mx-auto"
          >
            Buscamos mentores, líderes y empresas que quieran formar parte del futuro del talento tech.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-6 justify-center"
          >
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-8 py-4 text-lg font-semibold"
            >
              <Users className="mr-3 h-5 w-5" />
              Quiero ser mentor/a
            </Button>
            <Button
              size="lg"
              className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white px-8 py-4 text-lg font-semibold"
            >
              <Building className="mr-3 h-5 w-5" />
              Soy una empresa
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-12"
          >
            <div className="text-center">
              <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 p-8 rounded-xl backdrop-blur-sm border border-blue-500/20">
                <Users className="h-12 w-12 text-blue-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-3 text-white">Para Mentores</h3>
                <p className="text-gray-300 text-sm">
                  Comparte tu experiencia, guía el crecimiento de nuevos talentos y forma parte de una comunidad que
                  está transformando la industria tech.
                </p>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-gradient-to-br from-green-500/20 to-teal-500/20 p-8 rounded-xl backdrop-blur-sm border border-green-500/20">
                <Building className="h-12 w-12 text-green-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-3 text-white">Para Empresas</h3>
                <p className="text-gray-300 text-sm">
                  Accede a equipos curados con mentoría activa, reduce riesgos de contratación y contribuye al
                  desarrollo del talento tech.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section ref={contactRef} className="py-20 px-4 md:px-8 bg-gradient-to-r from-purple-900/20 to-pink-900/20">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            ¿Listo para{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">Crecer</span>?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Únete a CodeRoots y transforma tu carrera con proyectos reales, mentoría activa y una comunidad que te
            impulsa.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90 text-white">
              Aplicar Ahora
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" className="border-purple-500 text-purple-400 hover:bg-purple-950/30">
              Agenda una Demo
              <Calendar className="ml-2 h-4 w-4" />
            </Button>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400 mb-2">200+</div>
              <div className="text-gray-400">Desarrolladores Activos</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">95%</div>
              <div className="text-gray-400">Tasa de Empleabilidad</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2">50+</div>
              <div className="text-gray-400">Proyectos Completados</div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
