"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Twitter, Facebook, Instagram, Linkedin, Github } from "lucide-react"

export default function SocialLinks() {
  const socialLinks = [
    {
      icon: <Twitter className="h-5 w-5" />,
      href: "https://twitter.com",
      label: "Twitter",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: <Facebook className="h-5 w-5" />,
      href: "https://facebook.com",
      label: "Facebook",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: <Instagram className="h-5 w-5" />,
      href: "https://instagram.com",
      label: "Instagram",
      color: "from-orange-500 to-red-500",
    },
    {
      icon: <Linkedin className="h-5 w-5" />,
      href: "https://linkedin.com",
      label: "LinkedIn",
      color: "from-blue-600 to-blue-400",
    },
    {
      icon: <Github className="h-5 w-5" />,
      href: "https://github.com",
      label: "GitHub",
      color: "from-gray-700 to-gray-500",
    },
  ]

  return (
    <div className="flex space-x-4">
      {socialLinks.map((social, index) => (
        <motion.div
          key={index}
          whileHover={{ y: -5, scale: 1.1 }}
          className={`bg-gradient-to-br ${social.color} p-[1px] rounded-full`}
        >
          <Link
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className="h-10 w-10 rounded-full bg-gray-900 flex items-center justify-center transition-colors"
            aria-label={social.label}
          >
            {social.icon}
          </Link>
        </motion.div>
      ))}
    </div>
  )
}
