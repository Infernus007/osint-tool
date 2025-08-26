import { createFileRoute } from '@tanstack/react-router'
import { OSINTMarquee } from '@/components/ui/marquee'

export const Route = createFileRoute('/_authenticated/services/')({
  component: () => (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-white mb-8 text-center">
          OSINT Services
        </h1>
        <p className="text-gray-300 text-center mb-12 max-w-2xl mx-auto">
          Comprehensive intelligence gathering and analysis services for security professionals and investigators.
        </p>
      </div>
      <OSINTMarquee />
    </div>
  ),
})
