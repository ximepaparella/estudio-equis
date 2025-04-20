"use client"

import Image from "next/image"
import { motion } from "framer-motion"

interface TeamMemberProps {
  name: string
  role: string
  imageSrc: string
  bio?: string
  showBio?: boolean
  color?: string
}

export default function TeamMember({
  name,
  role,
  imageSrc,
  bio,
  showBio = false,
  color = "from-purple-500 to-pink-500",
}: TeamMemberProps) {
  return (
    <motion.div whileHover={{ y: -10, transition: { duration: 0.3 } }} className="group">
      <div className={`bg-gradient-to-br ${color} p-[1px] rounded-xl overflow-hidden`}>
        <div className="relative h-64 rounded-xl overflow-hidden">
          <Image
            src={imageSrc || "/placeholder.svg"}
            alt={name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
            <div className="p-4">
              <h3 className="text-xl font-bold text-white">{name}</h3>
              <p className="text-purple-300">{role}</p>
            </div>
          </div>
        </div>
      </div>

      <h3 className="text-lg font-bold mt-4">{name}</h3>
      <p className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500 mb-2">{role}</p>

      {showBio && bio && <p className="text-gray-400 text-sm">{bio}</p>}
    </motion.div>
  )
}
