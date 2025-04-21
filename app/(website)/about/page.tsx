"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion, useInView } from "framer-motion"
import { CheckCircle2, Users, Target, Rocket } from "lucide-react"
import TeamMember from "@/components/team-member"
import { Button } from "@/components/ui/button"

export default function AboutPage() {
  const heroRef = useRef<HTMLDivElement>(null)
  const historyRef = useRef<HTMLDivElement>(null)
  const missionRef = useRef<HTMLDivElement>(null)
  const teamRef = useRef<HTMLDivElement>(null)

  const heroInView = useInView(heroRef, { once: true, amount: 0.2 })
  const historyInView = useInView(historyRef, { once: true, amount: 0.2 })
  const missionInView = useInView(missionRef, { once: true, amount: 0.2 })
  const teamInView = useInView(teamRef, { once: true, amount: 0.2 })

  const teamMembers = [
    {
      name: "Alex Johnson",
      role: "Founder & CEO",
      bio: "With over 15 years of experience in software development and business leadership, Alex founded the agency with a vision to create innovative digital solutions.",
      imageSrc: "/placeholder.svg?height=400&width=400&text=Alex",
      color: "from-purple-500 to-pink-500",
    },
    {
      name: "Sarah Chen",
      role: "Creative Director",
      bio: "Sarah brings 10+ years of design expertise, having worked with global brands to create award-winning digital experiences and visual identities.",
      imageSrc: "/placeholder.svg?height=400&width=400&text=Sarah",
      color: "from-blue-500 to-cyan-500",
    },
    {
      name: "Michael Rodriguez",
      role: "Lead Developer",
      bio: "Michael is a full-stack developer with expertise in multiple programming languages and frameworks, leading our technical implementations.",
      imageSrc: "/placeholder.svg?height=400&width=400&text=Michael",
      color: "from-green-500 to-teal-500",
    },
    {
      name: "Emma Wilson",
      role: "UX/UI Designer",
      bio: "Emma specializes in creating intuitive user experiences and interfaces that balance aesthetics with functionality.",
      imageSrc: "/placeholder.svg?height=400&width=400&text=Emma",
      color: "from-orange-500 to-amber-500",
    },
    {
      name: "David Park",
      role: "Project Manager",
      bio: "David ensures our projects are delivered on time and within budget, with a focus on clear communication and client satisfaction.",
      imageSrc: "/placeholder.svg?height=400&width=400&text=David",
      color: "from-red-500 to-rose-500",
    },
    {
      name: "Olivia Martinez",
      role: "Marketing Specialist",
      bio: "Olivia develops strategic marketing plans that help our clients reach their target audiences and achieve their business goals.",
      imageSrc: "/placeholder.svg?height=400&width=400&text=Olivia",
      color: "from-violet-500 to-purple-500",
    },
    {
      name: "James Wilson",
      role: "Backend Developer",
      bio: "James specializes in building robust, scalable backend systems that power our clients' applications.",
      imageSrc: "/placeholder.svg?height=400&width=400&text=James",
      color: "from-fuchsia-500 to-pink-500",
    },
    {
      name: "Sophia Lee",
      role: "Content Strategist",
      bio: "Sophia creates compelling content strategies that engage audiences and drive conversions for our clients.",
      imageSrc: "/placeholder.svg?height=400&width=400&text=Sophia",
      color: "from-sky-500 to-indigo-500",
    },
  ]

  return (
    <main className="flex flex-col min-h-screen bg-black text-white overflow-hidden">
      {/* Hero Section */}
      <section ref={heroRef} className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black"></div>
          <Image
            src="/placeholder.svg?height=600&width=1200&text=About+Us"
            alt="About Us"
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
            About Us
          </h1>
          <p className="text-xl md:text-2xl text-gray-300">Get to know our team and our story</p>
        </motion.div>
      </section>

      {/* Our History */}
      <section ref={historyRef} className="py-20 px-4 md:px-8 bg-gradient-to-b from-black to-gray-900 relative">
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
          animate={historyInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-7xl mx-auto relative z-10"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Our{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
                  History
                </span>
              </h2>
              <div className="space-y-4 text-gray-300">
                <p>
                  Founded in 2015, our creative agency began as a small team of passionate designers and developers with
                  a shared vision: to create digital experiences that make a difference.
                </p>
                <p>
                  What started as a three-person operation in a small office has grown into a full-service digital
                  agency with a team of over 30 talented professionals across design, development, strategy, and
                  marketing.
                </p>
                <p>
                  Throughout our journey, we've remained committed to our core values of innovation, quality, and client
                  satisfaction. We've had the privilege of working with clients ranging from ambitious startups to
                  established enterprises across various industries.
                </p>
                <p>
                  Our growth has been organic, built on successful projects, word-of-mouth referrals, and long-term
                  client relationships. We're proud of our history and excited about our future as we continue to push
                  the boundaries of what's possible in digital.
                </p>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-6">
                {[
                  { number: "200+", label: "Projects Completed" },
                  { number: "30+", label: "Team Members" },
                  { number: "15+", label: "Industry Awards" },
                  { number: "8", label: "Years of Excellence" },
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ y: -5, scale: 1.05 }}
                    className="flex flex-col items-center text-center bg-gray-800/50 p-4 rounded-xl border border-gray-700"
                  >
                    <span className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500 mb-2">
                      {stat.number}
                    </span>
                    <span className="text-gray-400">{stat.label}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="relative h-[500px] rounded-xl overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20"></div>
              <Image
                src="/placeholder.svg?height=500&width=600&text=Our+Journey"
                alt="Our Journey"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Mission and Vision */}
      <section ref={missionRef} className="py-20 px-4 md:px-8 bg-gray-900 relative">
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
          animate={missionInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-7xl mx-auto relative z-10"
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Mission &{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">Vision</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">Guided by purpose, driven by innovation</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div
              whileHover={{ y: -10 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="bg-gradient-to-br from-purple-500 to-pink-500 p-[1px] rounded-xl overflow-hidden"
            >
              <div className="bg-gray-800/90 p-8 rounded-xl h-full backdrop-blur-sm">
                <div className="flex items-center mb-6">
                  <div className="h-12 w-12 rounded-full bg-purple-900/50 flex items-center justify-center mr-4">
                    <Target className="h-6 w-6 text-purple-400" />
                  </div>
                  <h3 className="text-2xl font-bold">Our Mission</h3>
                </div>
                <p className="text-gray-300 mb-6">
                  To empower businesses through innovative digital solutions that drive growth, enhance user
                  experiences, and solve complex challenges. We combine technical expertise with creative thinking to
                  deliver results that exceed expectations.
                </p>
                <ul className="space-y-3">
                  {["Client-centered approach", "Technical excellence", "Creative innovation"].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-purple-400 mr-3 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ y: -10 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="bg-gradient-to-br from-pink-500 to-purple-500 p-[1px] rounded-xl overflow-hidden"
            >
              <div className="bg-gray-800/90 p-8 rounded-xl h-full backdrop-blur-sm">
                <div className="flex items-center mb-6">
                  <div className="h-12 w-12 rounded-full bg-purple-900/50 flex items-center justify-center mr-4">
                    <Rocket className="h-6 w-6 text-purple-400" />
                  </div>
                  <h3 className="text-2xl font-bold">Our Vision</h3>
                </div>
                <p className="text-gray-300 mb-6">
                  To be recognized globally as a leading digital agency that transforms businesses through technology
                  and creativity. We aspire to shape the future of digital experiences and set new standards for
                  innovation in our industry.
                </p>
                <ul className="space-y-3">
                  {["Industry leadership", "Continuous innovation", "Global impact"].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-purple-400 mr-3 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>

          <div className="mt-16 bg-gradient-to-r from-purple-900/20 to-pink-900/20 p-8 rounded-xl border border-purple-800/30">
            <div className="flex items-center mb-6">
              <div className="h-12 w-12 rounded-full bg-purple-900/50 flex items-center justify-center mr-4">
                <Users className="h-6 w-6 text-purple-400" />
              </div>
              <h3 className="text-2xl font-bold">Our Values</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  title: "Innovation",
                  description: "We embrace new technologies and creative approaches to solve complex problems.",
                  color: "from-purple-500 to-pink-500",
                },
                {
                  title: "Excellence",
                  description:
                    "We strive for the highest quality in everything we do, from code to design to client service.",
                  color: "from-blue-500 to-cyan-500",
                },
                {
                  title: "Collaboration",
                  description: "We believe in the power of teamwork, both internally and with our clients.",
                  color: "from-green-500 to-teal-500",
                },
                {
                  title: "Integrity",
                  description: "We operate with honesty, transparency, and ethical practices in all our relationships.",
                  color: "from-orange-500 to-amber-500",
                },
              ].map((value, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -5, scale: 1.05 }}
                  className={`bg-gradient-to-br ${value.color} p-[1px] rounded-xl overflow-hidden`}
                >
                  <div className="bg-gray-800/90 p-6 rounded-xl h-full backdrop-blur-sm">
                    <h4 className="text-xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
                      {value.title}
                    </h4>
                    <p className="text-gray-300">{value.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* Our Team */}
      <section ref={teamRef} className="py-20 px-4 md:px-8 bg-black relative">
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
          animate={teamInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-7xl mx-auto relative z-10"
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Meet Our{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">Team</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">The talented people behind our success</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <TeamMember
                key={index}
                name={member.name}
                role={member.role}
                bio={member.bio}
                imageSrc={member.imageSrc}
                showBio
                color={member.color}
              />
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
            <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90 text-white">
              Get in Touch
            </Button>
            <Button size="lg" variant="outline" className="border-purple-500 text-purple-400 hover:bg-purple-950/30">
              View Our Work
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
