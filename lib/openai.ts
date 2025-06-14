import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
})

export interface LessonPlanData {
  id: string
  title: string
  description: string
  duration: number
}

export async function generateLessonPlan(topic: string, depth: string): Promise<LessonPlanData[]> {
  console.log('🤖 OpenAI generateLessonPlan called with:')
  console.log('  - Topic:', topic)
  console.log('  - Depth:', depth)
  
  const depthContext = {
    simple: "Explain like I'm 5 years old - use very simple language, basic concepts, and relatable examples",
    normal: "High school level - use clear explanations with some technical terms, practical examples",
    advanced: "PhD/Researcher level - use technical language, advanced concepts, and detailed analysis"
  }
  
  console.log('📄 Using depth context:', depthContext[depth as keyof typeof depthContext])

  const prompt = `Create a comprehensive audio learning plan for the topic: "${topic}"

Learning level: ${depthContext[depth as keyof typeof depthContext]}

Generate exactly 10-15 lessons that build upon each other logically. Each lesson should be 3-5 minutes long and designed for audio consumption.

For each lesson, provide:
1. A clear, engaging title (max 4 words) that hints at the key insight
2. A detailed description (2-3 sentences) explaining the specific learning outcome and why this lesson matters in the overall journey
3. Duration in minutes (3-5 minutes each) - shorter for foundational concepts, longer for complex applications

Design principles:
- Start with concrete examples before abstract concepts
- Each lesson should answer one clear question or solve one specific problem
- Build curiosity for the next lesson (create natural progression hooks)
- Use storytelling and analogies appropriate for audio learning
- Ensure each lesson delivers a satisfying "aha moment" or practical insight

Return the response as a JSON array with this exact structure:
[
  {
    "id": "1",
    "title": "lesson title",
    "description": "detailed description of what this lesson covers and why it's important",
    "duration": 4
  }
]

The lesson sequence should feel like a guided journey from "I've never heard of this" to "I understand how to use this in my life/work."`

  console.log('📝 Generated prompt:')
  console.log(prompt)
  console.log('\n🚀 Sending request to OpenAI...')
  
  try {
    const requestConfig = {
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are an expert educational content creator. Generate engaging, well-structured lesson plans that build knowledge progressively."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 2000
    }
    
    console.log('⚙️ OpenAI request config:', {
      model: requestConfig.model,
      temperature: requestConfig.temperature,
      max_tokens: requestConfig.max_tokens,
      messages_count: requestConfig.messages.length
    })
    
    const completion = await openai.chat.completions.create(requestConfig)

    console.log('✅ OpenAI API call completed successfully')
    console.log('📊 Usage stats:', {
      prompt_tokens: completion.usage?.prompt_tokens,
      completion_tokens: completion.usage?.completion_tokens,
      total_tokens: completion.usage?.total_tokens
    })
    
    const response = completion.choices[0]?.message?.content
    console.log('💬 Raw OpenAI response:')
    console.log(response)
    
    if (!response) {
      console.error('❌ No response content from OpenAI')
      throw new Error('No response from OpenAI')
    }

    console.log('🔄 Parsing JSON response...')
    // Parse the JSON response
    const lessons = JSON.parse(response) as LessonPlanData[]
    
    console.log('📚 Parsed lessons:')
    lessons.forEach((lesson, index) => {
      console.log(`  ${index + 1}. ${lesson.title} (${lesson.duration}m)`)
      console.log(`     ${lesson.description.substring(0, 100)}${lesson.description.length > 100 ? '...' : ''}`)
    })
    
    // Validate the response structure
    if (!Array.isArray(lessons) || lessons.length === 0) {
      console.error('❌ Invalid lesson plan format - not an array or empty')
      throw new Error('Invalid lesson plan format')
    }
    
    console.log('✅ Lesson plan validation passed:', lessons.length, 'lessons generated')
    return lessons
  } catch (error) {
    console.error('💥 Error in generateLessonPlan:')
    console.error('Error type:', error instanceof Error ? error.constructor.name : typeof error)
    console.error('Error message:', error instanceof Error ? error.message : String(error))
    if (error instanceof Error && error.stack) {
      console.error('Stack trace:', error.stack)
    }
    throw new Error('Failed to generate lesson plan. Please try again.')
  }
}