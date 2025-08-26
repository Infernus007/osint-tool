import { motion } from 'framer-motion'
import { 
  Shield, 
  Search, 
  Database, 
  Eye, 
  Lock, 
  Globe,
  Users,
  FileText,
  Zap,
  Target,
  Radar,
  Activity,
  Cpu,
  Network,
  Scan,
  AlertTriangle
} from 'lucide-react'

export const BottomMarquee = () => {
  const marqueeItems = [
    { icon: Shield, text: "Advanced Threat Detection" },
    { icon: Search, text: "Deep Web Intelligence" },
    { icon: Database, text: "Data Correlation Engine" },
    { icon: Eye, text: "24/7 Monitoring" },
    { icon: Lock, text: "Encrypted Communications" },
    { icon: Globe, text: "Global Intelligence Network" },
    { icon: Users, text: "Social Media Analysis" },
    { icon: FileText, text: "Document Forensics" },
    { icon: Zap, text: "Real-time Processing" },
    { icon: Target, text: "Precision Targeting" },
    { icon: Radar, text: "Threat Radar" },
    { icon: Activity, text: "Live Intelligence Feed" },
    { icon: Cpu, text: "AI-Powered Analysis" },
    { icon: Network, text: "Network Mapping" },
    { icon: Scan, text: "Digital Fingerprinting" },
    { icon: AlertTriangle, text: "Risk Assessment" }
  ]

  // Duplicate items for seamless loop
  const duplicatedItems = [...marqueeItems, ...marqueeItems]

  return (
    <section className="relative py-16 bg-gradient-to-b from-black via-slate-950 to-slate-900 overflow-hidden border-t border-slate-800/30">
      {/* Background Effects */}
      <div className="absolute inset-0">
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="h-full w-full bg-[linear-gradient(to_right,rgba(139,92,246,0.4)_1px,transparent_1px),linear-gradient(to_bottom,rgba(139,92,246,0.3)_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
        </div>

        {/* Flowing particles */}
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute w-1 h-1 bg-purple-400/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, 100, 200],
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "linear"
            }}
          />
        ))}

        {/* Gradient overlays */}
        <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-black to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-slate-900 to-transparent"></div>
      </div>

      <div className="relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            <span className="bg-gradient-to-r from-slate-200 via-purple-200 to-cyan-200 bg-clip-text text-transparent">
              Powered by Advanced Intelligence
            </span>
          </h3>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Cutting-edge capabilities that make our OSINT platform the industry standard
          </p>
        </motion.div>

        {/* Main Marquee */}
        <div className="relative">
          <div className="flex overflow-hidden">
            <motion.div
              className="flex gap-8 py-4"
              animate={{
                x: [0, -1920],
              }}
              transition={{
                duration: 40,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{ width: 'max-content' }}
            >
              {duplicatedItems.map((item, index) => (
                <motion.div
                  key={`marquee-item-${index}`}
                  className="flex items-center gap-4 px-6 py-4 bg-slate-900/40 backdrop-blur-sm border border-slate-700/30 rounded-xl whitespace-nowrap min-w-max"
                  whileHover={{ 
                    scale: 1.05,
                    backgroundColor: "rgba(139, 92, 246, 0.1)",
                    borderColor: "rgba(139, 92, 246, 0.3)"
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="p-2 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-lg">
                    <item.icon className="h-5 w-5 text-purple-400" />
                  </div>
                  <span className="text-slate-200 font-medium text-sm">
                    {item.text}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Fade edges */}
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black via-slate-950 to-transparent pointer-events-none"></div>
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-slate-900 via-slate-950 to-transparent pointer-events-none"></div>
        </div>

        {/* Counter Marquee */}
        <div className="relative mt-8">
          <div className="flex overflow-hidden">
            <motion.div
              className="flex gap-8 py-4"
              animate={{
                x: [-1920, 0],
              }}
              transition={{
                duration: 35,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{ width: 'max-content' }}
            >
              {duplicatedItems.reverse().map((item, index) => (
                <motion.div
                  key={`counter-marquee-item-${index}`}
                  className="flex items-center gap-3 px-5 py-3 bg-slate-800/30 backdrop-blur-sm border border-slate-600/20 rounded-lg whitespace-nowrap min-w-max"
                  whileHover={{ 
                    scale: 1.05,
                    backgroundColor: "rgba(59, 130, 246, 0.1)",
                    borderColor: "rgba(59, 130, 246, 0.3)"
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="p-1.5 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 rounded">
                    <item.icon className="h-4 w-4 text-blue-400" />
                  </div>
                  <span className="text-slate-300 font-medium text-xs">
                    {item.text}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Fade edges */}
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black via-slate-950 to-transparent pointer-events-none"></div>
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-slate-900 via-slate-950 to-transparent pointer-events-none"></div>
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
        >
          {[
            { value: "99.9%", label: "Uptime Guarantee" },
            { value: "< 100ms", label: "Response Time" },
            { value: "256-bit", label: "Encryption" },
            { value: "24/7", label: "Support" }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-2xl md:text-3xl font-bold text-white mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-slate-400">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Bottom border glow */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent"></div>
    </section>
  )
}
