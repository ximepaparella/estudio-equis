"use client"

import { useRef, useState, useEffect } from "react"
import Image from "next/image"
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion"
import {
  Code,
  Lightbulb,
  Smartphone,
  BarChart,
  Database,
  Layers,
  PenTool,
  Briefcase,
  X,
  Plus,
  ArrowRight,
  ChevronDown,
  Zap,
  ArrowUpRight,
  Star,
  Play,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import ServiceCard from "@/components/service-card"
import ContactCTA from "@/components/contact-cta"
import { TestimonialCard } from "@/components/testimonials/TestimonialCard"
import { testimonials } from "@/data/testimonials"

export default function ServicesPage() {
  const { scrollY } = useScroll()
  const [selectedService, setSelectedService] = useState<number | null>(null)
  const [activeTestimonial, setActiveTestimonial] = useState(0)

  const servicesRef = useRef<HTMLDivElement>(null)
  const processRef = useRef<HTMLDivElement>(null)
  const testimonialsRef = useRef<HTMLDivElement>(null)

  const servicesInView = useInView(servicesRef, { once: true, amount: 0.1 })
  const processInView = useInView(processRef, { once: true, amount: 0.1 })
  const testimonialsInView = useInView(testimonialsRef, { once: true, amount: 0.2 })

  const services = [
    {
      icon: <Lightbulb className="h-10 w-10" />,
      title: "UX/UI Design",
      description:
        "We create intuitive, engaging, and accessible user experiences that delight your customers and achieve your business goals.",
      features: [
        "User Research & Testing",
        "Wireframing & Prototyping",
        "Visual Design",
        "Interaction Design",
        "Usability Testing",
      ],
      color: "from-purple-500 to-pink-500",
      image: "/placeholder.svg?height=600&width=800&text=UX/UI+Design",
    },
    {
      icon: <Code className="h-10 w-10" />,
      title: "Software Development",
      description:
        "Our expert developers build custom software solutions that are scalable, secure, and tailored to your specific business needs.",
      features: ["Web Applications", "Custom Software", "API Development", "E-commerce Solutions", "CMS Development"],
      color: "from-blue-500 to-cyan-500",
      image: "/placeholder.svg?height=600&width=800&text=Software+Development",
    },
    {
      icon: <Smartphone className="h-10 w-10" />,
      title: "Mobile Applications",
      description:
        "We develop native and cross-platform mobile apps that provide seamless experiences across all devices and platforms.",
      features: [
        "iOS Development",
        "Android Development",
        "Cross-platform Solutions",
        "Mobile UI/UX Design",
        "App Store Optimization",
      ],
      color: "from-green-500 to-teal-500",
      image: "/placeholder.svg?height=600&width=800&text=Mobile+Applications",
    },
    {
      icon: <Briefcase className="h-10 w-10" />,
      title: "Project Management",
      description:
        "Our experienced project managers ensure your project is delivered on time, within budget, and to the highest standards.",
      features: [
        "Agile Methodology",
        "Sprint Planning",
        "Resource Allocation",
        "Risk Management",
        "Continuous Delivery",
      ],
      color: "from-orange-500 to-amber-500",
      image: "/placeholder.svg?height=600&width=800&text=Project+Management",
    },
    {
      icon: <Database className="h-10 w-10" />,
      title: "Database Solutions",
      description:
        "We design and implement database solutions that are optimized for performance, security, and scalability.",
      features: [
        "Database Design",
        "Data Migration",
        "Performance Optimization",
        "Cloud Database Solutions",
        "Database Security",
      ],
      color: "from-red-500 to-rose-500",
      image: "/placeholder.svg?height=600&width=800&text=Database+Solutions",
    },
    {
      icon: <BarChart className="h-10 w-10" />,
      title: "Digital Marketing",
      description:
        "We help you reach your target audience and achieve your marketing goals through data-driven digital strategies.",
      features: [
        "SEO & Content Marketing",
        "Social Media Marketing",
        "Email Marketing",
        "PPC Advertising",
        "Analytics & Reporting",
      ],
      color: "from-violet-500 to-purple-500",
      image: "/placeholder.svg?height=600&width=800&text=Digital+Marketing",
    },
    {
      icon: <PenTool className="h-10 w-10" />,
      title: "Branding & Identity",
      description:
        "We create compelling brand identities that communicate your values and resonate with your target audience.",
      features: ["Logo Design", "Brand Strategy", "Visual Identity", "Brand Guidelines", "Rebranding"],
      color: "from-fuchsia-500 to-pink-500",
      image: "/placeholder.svg?height=600&width=800&text=Branding",
    },
    {
      icon: <Layers className="h-10 w-10" />,
      title: "Cloud Solutions",
      description:
        "We help you leverage the power of cloud computing to improve efficiency, scalability, and security.",
      features: [
        "Cloud Migration",
        "AWS/Azure/GCP Solutions",
        "Serverless Architecture",
        "DevOps Implementation",
        "Cloud Security",
      ],
      color: "from-sky-500 to-indigo-500",
      image: "/placeholder.svg?height=600&width=800&text=Cloud+Solutions",
    },
  ]

  const processSteps = [
    {
      number: "01",
      title: "Discovery",
      description:
        "We start by understanding your business, goals, and challenges through in-depth consultations and research.",
    },
    {
      number: "02",
      title: "Strategy",
      description:
        "Based on our findings, we develop a comprehensive strategy tailored to your specific needs and objectives.",
    },
    {
      number: "03",
      title: "Design",
      description:
        "Our designers create intuitive, engaging, and visually appealing concepts that align with your brand identity.",
    },
    {
      number: "04",
      title: "Development",
      description: "Our developers bring the designs to life, building robust, scalable, and secure solutions.",
    },
    {
      number: "05",
      title: "Testing",
      description: "We rigorously test all aspects of the solution to ensure quality, performance, and security.",
    },
    {
      number: "06",
      title: "Launch",
      description: "Once approved, we deploy your solution and provide support to ensure a smooth launch.",
    },
    {
      number: "07",
      title: "Maintenance",
      description: "We offer ongoing maintenance and support to keep your solution running smoothly and up-to-date.",
    },
  ]

  const rotateY = useTransform(scrollY, [0, 1000], [0, 360])
  const scale = useTransform(scrollY, [0, 500], [1, 1.5])
  const opacity = useTransform(scrollY, [0, 300, 600], [0, 1, 0])

  return (
    <main className="flex flex-col min-h-screen bg-black text-white overflow-hidden">
      {/* Hero Section with 3D Effect */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black"></div>
          <Image
            src="/placeholder.svg?height=1080&width=1920&text=Services"
            alt="Services"
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
              Our Services
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
              Innovative solutions for the digital age
            </p>
          </motion.div>

          <motion.div style={{ rotateY, scale, opacity }} className="w-40 h-40 mx-auto relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full opacity-30 animate-pulse"></div>
            <div className="absolute inset-2 bg-black rounded-full flex items-center justify-center">
              <span className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
                7+
              </span>
            </div>
          </motion.div>
        </div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer"
          onClick={() => servicesRef.current?.scrollIntoView({ behavior: "smooth" })}
        >
          <ArrowRight className="h-10 w-10 text-purple-400 rotate-90" />
        </motion.div>
      </section>

      {/* Services Hexagon Grid */}
      <section ref={servicesRef} className="py-20 relative z-10 bg-gradient-to-b from-black via-gray-900 to-black">
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
          animate={servicesInView ? { opacity: 1 } : {}}
          transition={{ duration: 1 }}
          className="container mx-auto px-4 relative z-10"
        >
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 50 }}
              animate={servicesInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-5xl font-bold mb-6"
            >
              What We{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">Offer</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 50 }}
              animate={servicesInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-gray-300 max-w-3xl mx-auto"
            >
              Comprehensive digital solutions tailored to your business needs
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={servicesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.3 },
                }}
                className="relative group"
                onClick={() => setSelectedService(index)}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-100 rounded-xl transition-opacity duration-300`}
                ></div>
                <div className="relative h-80 bg-gray-800/50 rounded-xl p-6 border border-gray-700 overflow-hidden flex flex-col justify-between z-10 backdrop-blur-sm">
                  <div>
                    <div className="h-16 w-16 rounded-xl bg-gradient-to-br from-gray-800 to-gray-700 flex items-center justify-center mb-4 group-hover:bg-transparent transition-colors duration-300">
                      <div className="text-white group-hover:text-white transition-colors duration-300">
                        {service.icon}
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold mb-3 group-hover:text-white transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="text-gray-400 group-hover:text-white/90 transition-colors duration-300 line-clamp-3">
                      {service.description}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    className="mt-4 self-start text-white/70 group-hover:text-white group-hover:bg-white/10 transition-colors duration-300"
                  >
                    Learn More <Plus className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Service Detail Modal */}
      <AnimatePresence>
        {selectedService !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            onClick={() => setSelectedService(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25 }}
              className="relative w-full max-w-4xl bg-gradient-to-br from-gray-900 to-black rounded-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-4 right-4 z-10 h-10 w-10 rounded-full bg-black/50 flex items-center justify-center text-white/70 hover:text-white hover:bg-black/70 transition-colors"
                onClick={() => setSelectedService(null)}
              >
                <X className="h-5 w-5" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="relative h-64 md:h-full">
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${services[selectedService].color} opacity-30`}
                  ></div>
                  <Image
                    src={services[selectedService].image || "/placeholder.svg"}
                    alt={services[selectedService].title}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="p-8">
                  <div
                    className={`inline-flex items-center justify-center h-16 w-16 rounded-xl bg-gradient-to-br ${services[selectedService].color} mb-6`}
                  >
                    <div className="text-white">{services[selectedService].icon}</div>
                  </div>
                  <h3 className="text-3xl font-bold mb-4">{services[selectedService].title}</h3>
                  <p className="text-gray-300 mb-6">{services[selectedService].description}</p>

                  <h4 className="text-xl font-semibold mb-4">Key Features</h4>
                  <ul className="space-y-3 mb-8">
                    {services[selectedService].features.map((feature, idx) => (
                      <motion.li
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="flex items-start"
                      >
                        <div
                          className={`h-6 w-6 rounded-full bg-gradient-to-br ${services[selectedService].color} flex items-center justify-center mr-3 mt-0.5 flex-shrink-0`}
                        >
                          <svg
                            width="12"
                            height="12"
                            viewBox="0 0 12 12"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M10 3L4.5 8.5L2 6"
                              stroke="white"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                        <span>{feature}</span>
                      </motion.li>
                    ))}
                  </ul>

                  <Button className={`bg-gradient-to-r ${services[selectedService].color} hover:opacity-90 text-white`}>
                    Request a Consultation
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Our Process - 3D Cards */}
      <section ref={processRef} className="py-20 px-4 md:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={processInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Our{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
                Process
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              A structured approach to delivering exceptional results
            </p>
          </motion.div>

          <div className="relative">
            {/* Connecting Line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-500 via-pink-500 to-purple-500 hidden md:block"></div>

            <div className="space-y-32">
              {processSteps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  animate={processInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className={`flex flex-col ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} items-center gap-8`}
                >
                  <div className="w-full md:w-1/2 relative">
                    <motion.div
                      whileHover={{ rotateY: 15, rotateX: 10, scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className={`bg-gradient-to-br ${index % 2 === 0 ? "from-purple-500 to-pink-500" : "from-pink-500 to-purple-500"} p-[2px] rounded-2xl`}
                    >
                      <div className="bg-gray-900 rounded-2xl p-8 h-full backdrop-blur-sm">
                        <div className="flex items-center mb-6">
                          <div className="h-16 w-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mr-4">
                            <span className="text-2xl font-bold text-white">{step.number}</span>
                          </div>
                          <h3 className="text-2xl font-bold">{step.title}</h3>
                        </div>
                        <p className="text-gray-300 text-lg">{step.description}</p>
                      </div>
                    </motion.div>
                  </div>

                  <div className="w-full md:w-1/2 flex justify-center">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="relative h-64 w-64 md:h-80 md:w-80"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full animate-pulse"></div>
                      <div
                        className="absolute inset-4 bg-gradient-to-br from-purple-500/30 to-pink-500/30 rounded-full animate-pulse"
                        style={{ animationDelay: "300ms" }}
                      ></div>
                      <div
                        className="absolute inset-8 bg-gradient-to-br from-purple-500/40 to-pink-500/40 rounded-full animate-pulse"
                        style={{ animationDelay: "600ms" }}
                      ></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
                          {step.number}
                        </span>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Service Selector */}
      <section className="py-20 px-4 md:px-8 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Find Your{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
                Perfect Solution
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Explore our services and discover the perfect fit for your business needs
            </p>
          </div>

          <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-800">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold mb-4">I need help with...</h3>
                  <div className="space-y-3">
                    {["Brand Identity", "Web Development", "Mobile App", "Digital Marketing", "UX/UI Design"].map(
                      (item, index) => (
                        <motion.div
                          key={index}
                          whileHover={{ x: 5 }}
                          className="flex items-center p-3 rounded-lg hover:bg-gray-800/50 cursor-pointer transition-colors"
                        >
                          <div className="h-4 w-4 rounded-full border-2 border-purple-500 mr-3"></div>
                          <span>{item}</span>
                        </motion.div>
                      ),
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-bold mb-4">My budget is...</h3>
                  <div className="space-y-3">
                    {["$5,000 - $10,000", "$10,000 - $25,000", "$25,000 - $50,000", "$50,000+"].map((item, index) => (
                      <motion.div
                        key={index}
                        whileHover={{ x: 5 }}
                        className="flex items-center p-3 rounded-lg hover:bg-gray-800/50 cursor-pointer transition-colors"
                      >
                        <div className="h-4 w-4 rounded-full border-2 border-purple-500 mr-3"></div>
                        <span>{item}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold mb-4">My timeline is...</h3>
                  <div className="space-y-3">
                    {["1-2 months", "3-6 months", "6+ months"].map((item, index) => (
                      <motion.div
                        key={index}
                        whileHover={{ x: 5 }}
                        className="flex items-center p-3 rounded-lg hover:bg-gray-800/50 cursor-pointer transition-colors"
                      >
                        <div className="h-4 w-4 rounded-full border-2 border-purple-500 mr-3"></div>
                        <span>{item}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-bold mb-4">My industry is...</h3>
                  <div className="space-y-3">
                    {["Technology", "Healthcare", "Finance", "Education", "E-commerce", "Other"].map((item, index) => (
                      <motion.div
                        key={index}
                        whileHover={{ x: 5 }}
                        className="flex items-center p-3 rounded-lg hover:bg-gray-800/50 cursor-pointer transition-colors"
                      >
                        <div className="h-4 w-4 rounded-full border-2 border-purple-500 mr-3"></div>
                        <span>{item}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded-xl p-6 flex flex-col">
                <h3 className="text-2xl font-bold mb-4">Recommended Services</h3>
                <div className="flex-grow space-y-4 mb-6">
                  {["UX/UI Design", "Web Development", "Branding & Identity"].map((service, index) => (
                    <div key={index} className="flex items-center p-3 bg-black/20 rounded-lg">
                      <div className="h-8 w-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mr-3">
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M11.6667 3.5L5.25 9.91667L2.33333 7"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <span className="font-medium">{service}</span>
                    </div>
                  ))}
                </div>
                <div className="text-center">
                  <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90 text-white w-full">
                    Get Custom Quote
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Carousel - Copied from Homepage */}
      <section ref={testimonialsRef} className="py-20 px-4 md:px-8 bg-black relative">
        <div className="max-w-7xl mx-auto relative z-10">
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
                    className="absolute inset-0 flex flex-col md:flex-row items-center"
                  >
                    <TestimonialCard testimonial={testimonials[activeTestimonial]} />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            <div className="flex justify-center mt-8 gap-4">
              <button
                onClick={() => setActiveTestimonial((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))}
                className="bg-gray-800 hover:bg-gray-700 p-2 rounded-full transition-colors"
                aria-label="Previous Testimonial"
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
                    aria-label={`Testimonial ${index + 1}`}
                  />
                ))}
              </div>
              <button
                onClick={() => setActiveTestimonial((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))}
                className="bg-gray-800 hover:bg-gray-700 p-2 rounded-full transition-colors"
                aria-label="Next Testimonial"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <ContactCTA />
    </main>
  )
}
