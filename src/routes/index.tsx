import { createFileRoute } from '@tanstack/react-router'
import AppHero from '@/components/app-hero'
import OSINTFeatures from '@/components/osint-features'
import OSINTUseCases from '@/components/osint-usecases'
import { OSINTMarquee } from '@/components/ui/marquee'
import { OSINTToolsBento } from '@/components/osint-tools-bento'
import { ContactSection } from '@/components/contact-section'
import { AnimatedFooter } from '@/components/animated-footer'
import { BottomMarquee } from '@/components/bottom-marquee'

export const Route = createFileRoute('/')({
  component: () => (
    <div className="min-h-screen bg-black">
      <AppHero />
      
      {/* Enhanced transition section with seamless blur and effects */}
      <div className="relative h-48 bg-black overflow-hidden">
        {/* Seamless background gradient that matches hero */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-slate-950/80 to-slate-900"></div>
        
        {/* Extended noise texture for continuity */}
        <svg className="absolute inset-0 h-full w-full opacity-20">
          <filter id="transition-noise">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.8"
              numOctaves="3"
              stitchTiles="stitch"
            />
            <feColorMatrix type="saturate" values="0" />
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.15" />
            </feComponentTransfer>
          </filter>
          <rect width="100%" height="100%" filter="url(#transition-noise)" />
        </svg>
        
        {/* Glowing orbs that fade into features */}
        <div className="absolute top-0 left-1/4 h-32 w-32 rounded-full bg-purple-600/20 blur-[60px] animate-pulse"></div>
        <div className="absolute top-1/2 right-1/3 h-24 w-24 rounded-full bg-blue-500/15 blur-[50px] animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-0 left-1/2 h-28 w-28 rounded-full bg-indigo-500/10 blur-[55px] animate-pulse" style={{ animationDelay: '2s' }}></div>
        
        {/* Subtle data streams flowing downward */}
        <div className="absolute inset-0 opacity-10">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={`stream-${i}`}
              className="absolute h-full w-px bg-gradient-to-b from-transparent via-purple-400/30 to-transparent"
              style={{
                left: `${15 + i * 15}%`,
                animation: `streamFlow 8s linear infinite`,
                animationDelay: `${i * 1.2}s`,
              }}
            />
          ))}
        </div>
        
        {/* Floating tech particles */}
        <div className="absolute inset-0 opacity-25">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={`particle-${i}`}
              className="absolute h-0.5 w-0.5 rounded-full bg-cyan-400"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animation: `techFloat ${4 + Math.random() * 3}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 3}s`,
              }}
            />
          ))}
        </div>
        
        {/* Grid pattern that fades out */}
        <div className="absolute inset-0 opacity-5">
          <div className="h-full w-full bg-[linear-gradient(to_right,rgba(139,92,246,0.3)_1px,transparent_1px),linear-gradient(to_bottom,rgba(139,92,246,0.2)_1px,transparent_1px)] bg-[size:3rem_3rem]"></div>
        </div>
        
        {/* Bottom fade to features */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-b from-transparent to-slate-900"></div>
      </div>        <OSINTFeatures />
      <OSINTToolsBento />
      <OSINTUseCases />
      <OSINTMarquee />
      <ContactSection />
      <AnimatedFooter />
      
      <style>{`
        @keyframes techFloat {
          0%, 100% { 
            transform: translateY(0px) translateX(0px) scale(1); 
            opacity: 0.3; 
          }
          25% { 
            transform: translateY(-8px) translateX(4px) scale(1.2); 
            opacity: 0.8; 
          }
          50% { 
            transform: translateY(-12px) translateX(-2px) scale(1.1); 
            opacity: 0.6; 
          }
          75% { 
            transform: translateY(-6px) translateX(-4px) scale(1.3); 
            opacity: 0.9; 
          }
        }
        
        @keyframes streamFlow {
          0% { 
            transform: translateY(-100%) scaleY(0.5); 
            opacity: 0; 
          }
          20% { 
            transform: translateY(-50%) scaleY(1); 
            opacity: 0.5; 
          }
          80% { 
            transform: translateY(50%) scaleY(1); 
            opacity: 0.3; 
          }
          100% { 
            transform: translateY(100%) scaleY(0.5); 
            opacity: 0; 
          }
        }
      `}</style>
    </div>
  ),
})
