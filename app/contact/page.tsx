"use client"

import { useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { Mail, Phone, MapPin, ExternalLink, ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import ContactForm from "@/components/contact-form"
import SocialLinks from "@/components/social-links"

interface FAQItem {
  question: string
  answer: string
}

export default function ContactPage() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null)

  const heroRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<HTMLDivElement>(null)
  const faqRef = useRef<HTMLDivElement>(null)

  const heroInView = useInView(heroRef, { once: true, amount: 0.2 })
  const formInView = useInView(formRef, { once: true, amount: 0.2 })
  const mapInView = useInView(mapRef, { once: true, amount: 0.2 })
  const faqInView = useInView(faqRef, { once: true, amount: 0.2 })

  const faqs: FAQItem[] = [
    {
      question: "What is your typical process for new projects?",
      answer:
        "Our process typically includes discovery, planning, design, development, testing, and launch phases. We start with understanding your business goals and requirements, then create a tailored solution to meet your needs.",
    },
    {
      question: "How long does a typical project take to complete?",
      answer:
        "Project timelines vary depending on scope and complexity. A simple website might take 4-6 weeks, while a complex web application could take 3-6 months. We'll provide a detailed timeline during our initial consultation.",
    },
    {
      question: "Do you offer maintenance and support after launch?",
      answer:
        "Yes, we offer ongoing maintenance and support packages to ensure your digital products continue to perform optimally. Our support includes regular updates, security patches, and technical assistance.",
    },
    {
      question: "What industries do you specialize in?",
      answer:
        "We've worked across various industries including e-commerce, healthcare, finance, education, and technology. Our diverse experience allows us to bring fresh perspectives and proven strategies to any project.",
    },
  ]

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index)
  }

  return (
    <main className="flex flex-col min-h-screen bg-black text-white overflow-hidden">
      {/* Hero Section */}
      <section ref={heroRef} className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black"></div>
          <Image
            src="/placeholder.svg?height=600&width=1200&text=Contact+Us"
            alt="Contact Us"
            fill
            className="object-cover"
            priority
          />
        </div>

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
          initial={{ opacity: 0, y: 20 }}
          animate={heroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center px-4 max-w-4xl mx-auto"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
            Contact Us
          </h1>
          <p className="text-xl md:text-2xl text-gray-300">Get in touch with our team</p>
        </motion.div>
      </section>

      {/* Contact Form and Info */}
      <section ref={formRef} className="py-20 px-4 md:px-8 bg-gradient-to-b from-black to-gray-900 relative">
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
          animate={formInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-7xl mx-auto relative z-10"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-6">
                Get In{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
                  Touch
                </span>
              </h2>
              <p className="text-gray-300 mb-8">
                Have a project in mind or want to learn more about our services? Fill out the form below or contact us
                directly using the information provided.
              </p>

              <div className="space-y-6 mb-8">
                {[
                  {
                    icon: <Phone className="h-5 w-5 text-purple-400" />,
                    title: "Phone",
                    content: "+1 (555) 123-4567",
                    color: "from-purple-500 to-pink-500",
                  },
                  {
                    icon: <Mail className="h-5 w-5 text-purple-400" />,
                    title: "Email",
                    content: "info@creativeagency.com",
                    color: "from-blue-500 to-cyan-500",
                  },
                  {
                    icon: <MapPin className="h-5 w-5 text-purple-400" />,
                    title: "Location",
                    content: "123 Innovation Street, Tech City, TC 10101",
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
                        <h3 className="text-lg font-medium mb-1">{item.title}</h3>
                        <p className="text-gray-400">{item.content}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mb-8">
                <h3 className="text-xl font-bold mb-4">Office Hours</h3>
                <div className="space-y-2 text-gray-300 bg-gray-800/50 p-4 rounded-xl border border-gray-700">
                  <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                  <p>Saturday: 10:00 AM - 2:00 PM</p>
                  <p>Sunday: Closed</p>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-4">Follow Us</h3>
                <SocialLinks />
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 p-[1px] rounded-xl">
              <div className="bg-gray-900 p-8 rounded-xl h-full">
                <h3 className="text-2xl font-bold mb-6">Send Us a Message</h3>
                <ContactForm />
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Map and Image */}
      <section ref={mapRef} className="py-20 px-4 md:px-8 bg-gray-900">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={mapInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-7xl mx-auto"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="relative h-[400px] rounded-xl overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20"></div>
              <Image
                src="/placeholder.svg?height=400&width=600&text=Map"
                alt="Office Location Map"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90 text-white px-4 py-2 rounded-md flex items-center transition-colors"
                >
                  View on Google Maps
                  <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="relative h-[400px] rounded-xl overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20"></div>
              <Image
                src="/placeholder.svg?height=400&width=600&text=Our+Office"
                alt="Our Office"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* FAQ */}
      <section ref={faqRef} className="py-20 px-4 md:px-8 bg-black relative">
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
          animate={faqInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto relative z-10"
        >
          <h2 className="text-3xl font-bold mb-12 text-center">
            Frequently Asked{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
              Questions
            </span>
          </h2>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={faqInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 p-[1px] rounded-xl overflow-hidden"
              >
                <div className="bg-gray-900 rounded-xl">
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="flex justify-between items-center w-full p-6 text-left"
                  >
                    <h3 className="text-xl font-bold">{faq.question}</h3>
                    {openFAQ === index ? (
                      <ChevronUp className="h-5 w-5 text-purple-400" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-purple-400" />
                    )}
                  </button>
                  <AnimatePresence>
                    {openFAQ === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="p-6 pt-0 text-gray-300 border-t border-gray-800">{faq.answer}</div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 md:px-8 bg-gradient-to-r from-purple-900/20 to-pink-900/20">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Your Project?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Let's create something amazing together. Contact us to discuss your project and bring your vision to life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90 text-white">
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
