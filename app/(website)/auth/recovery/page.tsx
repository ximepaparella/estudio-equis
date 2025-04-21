"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowRight, Mail, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function RecoveryPage() {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle recovery logic here
    console.log("Recovery request for:", email)
    setIsSubmitted(true)
    // In a real app, this would send a verification code to the email
  }

  return (
    <div className="min-h-screen bg-black flex flex-col md:flex-row">
      {/* Left Side - Form */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 md:p-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="mb-8 text-center md:text-left">
            <Link href="/" className="inline-block mb-6">
              <span className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
                CREATIVE
              </span>
            </Link>
            <h1 className="text-3xl font-bold text-white mb-2">Reset your password</h1>
            <p className="text-gray-400">Enter your email and we&apos;ll send you a code to reset your password</p>
          </div>

          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                  Email
                </label>
                <div className="relative">
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    required
                    className="bg-gray-800/50 border-gray-700 text-white pl-10 py-6 rounded-lg w-full focus:border-purple-500 focus:ring-purple-500"
                  />
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90 text-white py-6 rounded-lg"
              >
                Send reset code
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>

              <div className="text-center">
                <Link
                  href="/auth/login"
                  className="inline-flex items-center text-purple-400 hover:text-purple-300 transition-colors"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to login
                </Link>
              </div>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-gray-800/50 border border-gray-700 rounded-lg p-6 text-center"
            >
              <div className="bg-green-900/20 rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4">
                <Mail className="h-8 w-8 text-green-400" />
              </div>
              <h2 className="text-xl font-bold text-white mb-2">Check your email</h2>
              <p className="text-gray-300 mb-6">
                We&apos;ve sent a password reset code to <span className="text-purple-400">{email}</span>
              </p>
              <Link href="/auth/verify">
                <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90 text-white py-6 rounded-lg">
                  Enter verification code
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Right Side - Image */}
      <div className="hidden md:block w-1/2 relative bg-gray-900">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-pink-900/20 z-10"></div>
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-full h-full">
            {Array.from({ length: 10 }).map((_, i) => (
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
        <Image
          src="/placeholder.svg?height=1080&width=1080&text=Password+Recovery"
          alt="Password Recovery"
          fill
          className="object-cover z-0"
        />
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <div className="bg-black/60 backdrop-blur-sm p-8 rounded-xl max-w-md text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Account Recovery</h2>
            <p className="text-gray-300">
              We&apos;ll help you reset your password and get back to your creative projects.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
