"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

interface DepthSelectionProps {
  topic: string
  onNext: (depth: string) => void
  onBack: () => void
  error?: string
}

const depthOptions = [
  {
    value: "simple",
    label: "Simple",
    emoji: "🌱",
    description: "Explain like I'm five",
    colorClass: "bg-green-400",
    textColorClass: "text-green-50"
  },
  {
    value: "normal", 
    label: "Normal",
    emoji: "🌿",
    description: "High school level",
    colorClass: "bg-green-500",
    textColorClass: "text-green-100"
  },
  {
    value: "advanced",
    label: "Advanced",
    emoji: "🌳",
    description: "PhD/Researcher level",
    colorClass: "bg-green-600",
    textColorClass: "text-green-100"
  }
]

export default function DepthSelection({ topic, onNext, onBack, error }: DepthSelectionProps) {
  const [depth, setDepth] = useState("normal")

  const handleSubmit = () => {
    console.log('🚀 Depth selection submitted:', depth)
    onNext(depth)
  }

  return (
    <div className="min-h-screen flex flex-col p-6 bg-white">
      <button 
        onClick={onBack}
        className="mb-8 p-3 rounded-full hover:bg-gray-100 self-start transition-colors"
      >
        <ArrowLeft className="w-6 h-6" />
      </button>
      
      <div className="flex-1 flex flex-col items-center justify-center pb-24">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold">
              How deep?
            </h1>
            <p className="text-lg text-gray-600">
              Learning: {topic}
            </p>
          </div>
          
          {error && (
            <div className="p-4 rounded-2xl bg-red-50 border border-red-200">
              <p className="text-red-600 text-center">{error}</p>
            </div>
          )}
          
          <div className="space-y-4">
            {depthOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setDepth(option.value)}
                className={`w-full p-6 rounded-2xl transition-all ${
                  depth === option.value
                    ? `${option.colorClass} text-white scale-105`
                    : "bg-gray-50 hover:bg-gray-100"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="text-left">
                    <div className="text-xl font-semibold">{option.label}</div>
                    <div className={`text-sm mt-1 ${
                      depth === option.value ? option.textColorClass : "text-gray-500"
                    }`}>
                      {option.description}
                    </div>
                  </div>
                  <span className="text-3xl ml-4">{option.emoji}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
      
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-white">
        <div className="max-w-md mx-auto">
          <Button 
            onClick={handleSubmit}
            className="w-full h-16 text-xl rounded-2xl bg-green-500 hover:bg-green-600 transition-colors"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}