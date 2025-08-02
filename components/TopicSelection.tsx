"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

interface TopicSelectionProps {
  onNext: (topic: string) => void
}

export default function TopicSelection({ onNext }: TopicSelectionProps) {
  const [topic, setTopic] = useState("")

  const handleSubmit = () => {
    const trimmedTopic = topic.trim()
    console.log('📝 Topic submission attempt:', trimmedTopic)
    if (trimmedTopic) {
      console.log('✅ Valid topic, calling onNext')
      onNext(trimmedTopic)
    } else {
      console.log('❌ Empty topic, submission blocked')
    }
  }

  return (
    <div className="min-h-screen flex flex-col p-6 bg-white">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold flex items-center justify-center gap-2">
          <span>Learnify</span>
          <span>🤓</span>
        </h2>
      </div>
      
      <div className="flex-1 flex flex-col items-center justify-center pb-24">
        <div className="w-full max-w-md space-y-8">
          <h1 className="text-3xl font-semibold text-center">
            What do you want to learn?
          </h1>
          
          <textarea
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Type anything..."
            className="w-full p-6 text-xl rounded-2xl bg-gray-50 border-0 focus:outline-none focus:ring-4 focus:ring-blue-200 resize-none h-32 placeholder:text-gray-400"
            autoFocus
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault()
                handleSubmit()
              }
            }}
          />
        </div>
      </div>
      
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-white">
        <div className="max-w-md mx-auto">
          <Button 
            onClick={handleSubmit} 
            disabled={!topic.trim()}
            className="w-full h-16 text-xl rounded-2xl bg-green-500 hover:bg-green-600 disabled:bg-gray-200 disabled:text-gray-400 transition-colors"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}