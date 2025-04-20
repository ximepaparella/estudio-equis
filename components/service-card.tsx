"use client"

import type React from "react"

import { motion } from "framer-motion"
import { Check } from "lucide-react"

interface ServiceCardProps {
  icon: React.ReactNode
  title: string
  description: string
  features?: string[]
  detailed?: boolean
  color?: string
}

export default function ServiceCard({
  icon,
  title,
  description,
  features,
  detailed = false,
  color = "from-purple-600 to-pink-600",
}: ServiceCardProps) {
  return (
    <motion.div
      whileHover={{ y: -10, transition: { duration: 0.3 } }}
      className={`bg-gray-800/50 p-6 rounded-lg border border-gray-700 ${detailed ? "h-full flex flex-col" : ""}`}
    >
      <div className={`h-12 w-12 rounded-full bg-gradient-to-br ${color} flex items-center justify-center mb-4`}>
        <div className="text-white">{icon}</div>
      </div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-gray-300 mb-4">{description}</p>

      {features && features.length > 0 && (
        <ul className={`space-y-2 ${detailed ? "mt-auto pt-4" : ""}`}>
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <Check className="h-5 w-5 text-purple-400 mr-2 mt-0.5" />
              <span className="text-gray-300">{feature}</span>
            </li>
          ))}
        </ul>
      )}
    </motion.div>
  )
}
