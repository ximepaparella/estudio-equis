interface ProcessStepProps {
  number: string
  title: string
  description: string
  isLast?: boolean
}

export default function ProcessStep({ number, title, description, isLast = false }: ProcessStepProps) {
  return (
    <div className="relative">
      <div className="flex items-start">
        <div className="flex-shrink-0 h-12 w-12 rounded-full bg-purple-900/50 border border-purple-500 flex items-center justify-center mr-4 z-10">
          <span className="text-lg font-bold text-purple-400">{number}</span>
        </div>
        <div>
          <h3 className="text-xl font-bold mb-2">{title}</h3>
          <p className="text-gray-300">{description}</p>
        </div>
      </div>

      {!isLast && (
        <div className="absolute top-12 bottom-0 left-6 w-0.5 bg-gradient-to-b from-purple-500 to-purple-900/30"></div>
      )}
    </div>
  )
}
