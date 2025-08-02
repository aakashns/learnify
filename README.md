# Learnify - AI Audio Learning Platform

**"Spotify for Learning"** - An endless stream of short, high-quality AI-generated audio tutorials tailored to your interests and understanding level.

![Learnify Screenshot](https://i.imgur.com/fPYXJSq.png)

🎧 **Live Demo**: [https://learnify.swiftace.org](https://learnify.swiftace.org)

## Overview

Learnify transforms any topic into bite-sized, engaging audio lessons (3-5 minutes each) using AI. Whether you're learning quantum physics or cooking techniques, Learnify adapts to your knowledge level and delivers personalized content you can listen to anywhere.

## Features

- **🎯 Adaptive Learning**: Choose from Simple (ELI5), Normal (High School), or Advanced (PhD/Researcher) difficulty levels
- **🤖 AI-Generated Content**: Powered by OpenAI GPT-4 for lesson planning and content generation
- **🎵 Text-to-Speech**: High-quality audio synthesis using Resemble AI
- **📱 Mobile-First Design**: Optimized for learning on the go
- **🔗 Seamless Flow**: From topic selection to audio playback in seconds
- **📖 Visual Learning**: Follow along with highlighted text as audio plays

## How It Works

1. **Enter a Topic**: What do you want to learn about?
2. **Choose Your Level**: Pick the complexity that matches your background
3. **AI Generates Plan**: Get a personalized curriculum of 10-15 short lessons
4. **Listen & Learn**: High-quality audio with synchronized text highlighting

## Technology Stack

- **Frontend**: Next.js 15 with App Router, TypeScript, Tailwind CSS
- **UI Components**: shadcn/ui with Lucide React icons
- **AI Integration**: OpenAI GPT-4 for content generation
- **Audio**: Resemble AI for text-to-speech synthesis
- **Deployment**: Vercel
- **Authentication**: Basic auth middleware

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/aakashns/learnify.git
cd learnify
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
# Add your OpenAI API key and other required variables
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Environment Variables

Create a `.env.local` file with:

```
OPENAI_API_KEY=your_openai_api_key_here
RESEMBLE_API_KEY=your_resemble_api_key_here
```

## Project Structure

```
learnify/
├── app/
│   ├── page.tsx              # Main app with screen navigation
│   ├── layout.tsx            # Root layout
│   └── api/                  # API routes
├── components/
│   ├── TopicSelection.tsx    # Topic input screen
│   ├── DepthSelection.tsx    # Learning depth selection
│   ├── LessonPlan.tsx        # Generated lesson display
│   ├── LessonContent.tsx     # Audio playback screen
│   └── AudioPlayer.tsx       # Audio controls
├── lib/
│   └── openai.ts            # OpenAI integration
└── middleware.ts            # Authentication middleware
```

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Built with [Next.js](https://nextjs.org)
- Powered by [OpenAI](https://openai.com)
- Audio synthesis by [Resemble AI](https://resemble.ai)
- UI components from [shadcn/ui](https://ui.shadcn.com)