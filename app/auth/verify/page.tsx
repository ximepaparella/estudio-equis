"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowRight, ArrowLeft, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function VerifyPage() {
  const [code, setCode] = useState(["", "", "", "", "", ""])
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [timer, setTimer] = useState(60)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  useEffect(() => {
    if (timer > 0 && !isSubmitted) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1)
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [timer, isSubmitted])

  const handleChange = (index: number, value: string) => {
    // Only allow numbers
    if (value && !/^\d+$/.test(value)) return

    const newCode = [...code]
    newCode[index] = value

    setCode(newCode)

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // Move to previous input on backspace if current input is empty
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData("text/plain").trim()

    // Check if pasted content is a 6-digit number
    if (/^\d{6}$/.test(pastedData)) {
      const digits = pastedData.split("")
      setCode(digits)

      // Focus the last input
      inputRefs.current[5]?.focus()
    }
  }

  const resetTimer = () => {
    setTimer(60)
    // Here you would typically resend the code
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Check if code is complete
    if (code.every((digit) => digit !== "")) {
      // Handle verification logic here
      console.log("Verification code:", code.join(""))
      setIsSubmitted(true)
      // In a real app, this would verify the code and redirect to password reset
      setTimeout(() => {
        window.location.href = "/auth/login"
      }, 2000)
    }
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
            <h1 className="text-3xl font-bold text-white mb-2">Verification code</h1>
            <p className="text-gray-400">Enter the 6-digit code sent to your email</p>
          </div>

          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex justify-between mb-4">
                {code.map((digit, index) => (
                  <div key={index} className="w-12">
                    <Input
                      ref={(el) => (inputRefs.current[index] = el)}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      onPaste={index === 0 ? handlePaste : undefined}
                      className="bg-gray-800/50 border-gray-700 text-white text-center text-xl py-6 rounded-lg w-full focus:border-purple-500 focus:ring-purple-500"
                      autoFocus={index === 0}
                    />
                  </div>
                ))}
              </div>

              <div className="text-center mb-6">
                <p className="text-gray-400 text-sm mb-2">
                  Didn&apos;t receive a code? {timer > 0 ? `Resend in ${timer}s` : ""}
                </p>
                {timer === 0 && (
                  <button
                    type="button"
                    onClick={resetTimer}
                    className="text-purple-400 hover:text-purple-300 transition-colors inline-flex items-center"
                  >
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Resend code
                  </button>
                )}
              </div>

              <Button
                type="submit"
                disabled={!code.every((digit) => digit !== "")}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90 text-white py-6 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Verify code
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>

              <div className="text-center">
                <Link
                  href="/auth/recovery"
                  className="inline-flex items-center text-purple-400 hover:text-purple-300 transition-colors"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to recovery
                </Link>
              </div>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-green-900/20 border border-green-700 rounded-lg p-6 text-center"
            >
              <div className="bg-green-900/30 rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4">
                <svg
                  className="h-8 w-8 text-green-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-white mb-2">Verification successful</h2>
              <p className="text-gray-300 mb-6">Redirecting you to login...</p>
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
          src="/placeholder.svg?height=1080&width=1080&text=Verification"
          alt="Verification"
          fill
          className="object-cover z-0"
        />
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <div className="bg-black/60 backdrop-blur-sm p-8 rounded-xl max-w-md text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Almost there!</h2>
            <p className="text-gray-300">
              Enter the verification code to confirm your identity and reset your password.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
