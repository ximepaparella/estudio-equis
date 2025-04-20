import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function ContactCTA() {
  return (
    <section className="py-20 px-4 md:px-8 bg-gradient-to-r from-purple-900/20 to-pink-900/20">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Your Project?</h2>
        <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
          Contact us today for a free consultation and let's discuss how we can help bring your vision to life.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/contact">
            <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white">
              Get in Touch
            </Button>
          </Link>
          <Link href="/portfolio">
            <Button size="lg" variant="outline" className="border-purple-500 text-purple-400 hover:bg-purple-950/30">
              View Our Work
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
