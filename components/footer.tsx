"use client"

import type React from "react"

import { useState, useRef } from "react"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { ArrowRight, ChevronUp, Send, Twitter, Facebook, Instagram, Linkedin, Github, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Footer() {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const footerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(footerRef, { once: true, amount: 0.3 })

  const currentYear = new Date().getFullYear()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitted(true)
      setEmail("")

      // Reset after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false)
      }, 3000)
    }, 500)
  }

  const footerLinks = [
    {
      title: "Company",
      links: [
        { label: "About", href: "/about" },
        { label: "Services", href: "/services" },
        { label: "Portfolio", href: "/portfolio" },
        { label: "Careers", href: "#" },
        { label: "Contact", href: "/contact" },
      ],
    },
    {
      title: "Services",
      links: [
        { label: "UX/UI Design", href: "/services" },
        { label: "Web Development", href: "/services" },
        { label: "Mobile Apps", href: "/services" },
        { label: "Branding", href: "/services" },
        { label: "Digital Marketing", href: "/services" },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "Blog", href: "#" },
        { label: "Case Studies", href: "#" },
        { label: "Testimonials", href: "#" },
        { label: "FAQ", href: "#" },
        { label: "Privacy Policy", href: "#" },
      ],
    },
  ]

  const socialLinks = [
    {
      icon: <Twitter className="h-5 w-5" />,
      href: "https://twitter.com",
      label: "Twitter",
      color: "from-blue-400 to-blue-600",
    },
    {
      icon: <Facebook className="h-5 w-5" />,
      href: "https://facebook.com",
      label: "Facebook",
      color: "from-blue-600 to-blue-800",
    },
    {
      icon: <Instagram className="h-5 w-5" />,
      href: "https://instagram.com",
      label: "Instagram",
      color: "from-pink-500 to-purple-600",
    },
    {
      icon: <Linkedin className="h-5 w-5" />,
      href: "https://linkedin.com",
      label: "LinkedIn",
      color: "from-blue-500 to-blue-700",
    },
    {
      icon: <Github className="h-5 w-5" />,
      href: "https://github.com",
      label: "GitHub",
      color: "from-gray-700 to-gray-900",
    },
  ]

  return (
    <footer ref={footerRef} className="relative bg-black text-white overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-full h-full">
          {Array.from({ length: 15 }).map((_, i) => (
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

      {/* Top Wave */}
      <div className="relative">
        <svg className="w-full h-24 fill-current text-gray-900" viewBox="0 0 1440 120" preserveAspectRatio="none">
          <path d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"></path>
        </svg>
      </div>

      {/* Newsletter Section */}
      <div className="relative z-10 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-7xl mx-auto px-4 md:px-6 pt-12 pb-20">
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 p-[1px] rounded-2xl overflow-hidden"
            >
              <div className="bg-black/80 backdrop-blur-sm rounded-2xl p-8 md:p-12 relative overflow-hidden">
                {/* Decorative Elements */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
                  <motion.div
                    className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
                  />
                  <motion.div
                    className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-full"
                    animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.5, 0.2] }}
                    transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY }}
                  />
                </div>

                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                  <div className="md:w-1/2">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.6, delay: 0.2 }}
                    >
                      <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Stay in the{" "}
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
                          creative loop
                        </span>
                      </h2>
                      <p className="text-gray-300 mb-4 max-w-md">
                        Subscribe to our newsletter for exclusive insights, project updates, and creative inspiration
                        delivered directly to your inbox.
                      </p>
                    </motion.div>
                  </div>

                  <div className="md:w-1/2 w-full">
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.6, delay: 0.4 }}
                    >
                      <form onSubmit={handleSubmit} className="relative">
                        {isSubmitted ? (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-green-900/20 border border-green-700 rounded-lg p-4 text-center"
                          >
                            <p className="text-green-400 flex items-center justify-center">
                              <Mail className="mr-2 h-5 w-5" />
                              Thanks for subscribing!
                            </p>
                          </motion.div>
                        ) : (
                          <div className="flex flex-col sm:flex-row gap-3">
                            <div className="relative flex-grow">
                              <Input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                required
                                className="bg-gray-800/50 border-gray-700 text-white pl-4 pr-10 py-6 rounded-lg w-full focus:border-purple-500 focus:ring-purple-500"
                              />
                              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                <motion.div
                                  animate={{ y: [0, -3, 0] }}
                                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                                >
                                  <Mail className="h-5 w-5 text-gray-400" />
                                </motion.div>
                              </div>
                            </div>
                            <Button
                              type="submit"
                              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90 text-white py-6 px-6 rounded-lg whitespace-nowrap"
                            >
                              Subscribe <Send className="ml-2 h-4 w-4" />
                            </Button>
                          </div>
                        )}
                      </form>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Floating Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="absolute -top-10 -right-5 md:top-0 md:-right-10 bg-gradient-to-r from-purple-600 to-pink-600 px-4 py-2 rounded-lg shadow-xl transform rotate-12"
            >
              <span className="text-white font-medium text-sm">Join 5,000+ subscribers</span>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Logo and Social */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Link href="/" className="inline-block mb-6">
                <span className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
                  CREATIVE
                </span>
              </Link>
              <p className="text-gray-400 mb-8 max-w-md">
                We craft innovative software and creative experiences that transform businesses and captivate audiences.
              </p>

              <div className="flex flex-wrap gap-3">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`bg-gradient-to-br ${social.color} p-[1px] rounded-full group`}
                    whileHover={{ y: -5, scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <div className="bg-gray-900 hover:bg-gray-800 h-10 w-10 rounded-full flex items-center justify-center transition-colors">
                      <span className="text-white group-hover:text-white/90">{social.icon}</span>
                    </div>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Links */}
          {footerLinks.map((column, columnIndex) => (
            <motion.div
              key={columnIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + columnIndex * 0.1 }}
            >
              <h4 className="text-lg font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
                {column.title}
              </h4>
              <ul className="space-y-4">
                {column.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-purple-400 transition-colors flex items-center group"
                    >
                      <span className="relative">
                        {link.label}
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-500 group-hover:w-full transition-all duration-300"></span>
                      </span>
                      <motion.span
                        className="inline-block ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        animate={{ x: [0, 3, 0] }}
                        transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                      >
                        <ArrowRight className="h-3 w-3" />
                      </motion.span>
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom Section */}
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="border-t border-gray-800 py-8 flex flex-col md:flex-row justify-between items-center">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mb-4 md:mb-0 flex items-center"
            >
              <p className="text-gray-500 text-sm">&copy; {currentYear} Creative Agency. All rights reserved.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex flex-wrap gap-6"
            >
              {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((item, index) => (
                <Link
                  key={index}
                  href="#"
                  className="text-gray-500 hover:text-purple-400 text-sm transition-colors relative group"
                >
                  <span className="relative">
                    {item}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-500 group-hover:w-full transition-all duration-300"></span>
                  </span>
                </Link>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      <div className="absolute bottom-8 right-8 z-20">
        <motion.button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="bg-gradient-to-r from-purple-600 to-pink-600 p-3 rounded-full shadow-lg"
        >
          <ChevronUp className="h-5 w-5 text-white" />
        </motion.button>
      </div>
    </footer>
  )
}
