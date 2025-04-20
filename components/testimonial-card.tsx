"use client"

import Image from "next/image"
import { motion } from "framer-motion"

interface TestimonialCardProps {
  quote: string
  author: string
  company: string
  imageSrc: string
  color?: string
}

export default function TestimonialCard({
  quote,
  author,
  company,
  imageSrc,
  color = "from-purple-600 to-pink-600",
}: TestimonialCardProps) {
  return (
    <motion.div
      whileHover={{ y: -10, transition: { duration: 0.3 } }}
      className={`bg-gradient-to-br ${color} p-[1px] rounded-xl overflow-hidden h-full`}
    >
      <div className="bg-gray-900/90 p-6 rounded-xl h-full flex flex-col backdrop-blur-sm">
        <div className="mb-4">
          <svg className="h-8 w-8 text-white" fill="currentColor" viewBox="0 0 32 32" aria-hidden="true">
            <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
          </svg>
        </div>

        <p className="text-gray-300 mb-6 flex-grow">{quote}</p>

        <div className="flex items-center">
          <div className="relative h-10 w-10 rounded-full overflow-hidden mr-3">
            <Image src={imageSrc || "/placeholder.svg"} alt={author} fill className="object-cover" />
          </div>
          <div>
            <h4 className="font-medium">{author}</h4>
            <p className="text-sm text-gray-400">{company}</p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
