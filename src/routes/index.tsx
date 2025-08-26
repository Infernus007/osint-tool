import { createFileRoute } from '@tanstack/react-router'
import AppHero from '@/components/app-hero'
import OSINTFeatures from '@/components/osint-features'
import OSINTUseCases from '@/components/osint-usecases'
import { OSINTMarquee } from '@/components/ui/marquee'
import { OSINTToolsBento } from '@/components/osint-tools-bento'
import { ContactSection } from '@/components/contact-section'
import { AnimatedFooter } from '@/components/animated-footer'
import OSINTDemoSection from '@/components/osint-demo-section'

export const Route = createFileRoute('/')({
  component: () => (
    <div className="min-h-screen bg-black">
      <AppHero />
      
      <div id="features">
        <OSINTFeatures />
      </div>
      <div id="tools">
        <OSINTToolsBento />
      </div>
      <div id="demo">
        <OSINTDemoSection />
      </div>
      <div id="about">
        <OSINTUseCases />
      </div>
      <div id="intelligence">
        <OSINTMarquee />
      </div>
      <div id="contact">
        <ContactSection />
      </div>
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
