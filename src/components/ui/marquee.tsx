"use client"

import type { JSX } from "react"
import { useEffect, useId, useRef, useState } from "react"
import { motion, useAnimation, useInView } from "motion/react"
import {
  Shield,
  Search,
  Database,
  Eye,
  Globe,
  Zap,
  Target,
  Scan,
  Users,
  Mail,
  Newspaper,
  Image as ImageIcon,
  Activity,
  Lock,
  Network,
  Radar,
} from "lucide-react"

import { cn } from "@/lib/utils"

interface MarqueeProps {
  className?: string
  reverse?: boolean
  pauseOnHover?: boolean
  children?: React.ReactNode
  vertical?: boolean
  repeat?: number
  [key: string]: unknown
}

function Marquee({
  className,
  reverse,
  pauseOnHover = false,
  children,
  vertical = false,
  repeat = 4,
  ...props
}: MarqueeProps) {
  return (
    <div
      {...props}
      className={cn(
        "group flex overflow-hidden p-2 [--duration:40s] [--gap:1rem] [gap:var(--gap)]",
        {
          "flex-row": !vertical,
          "flex-col": vertical,
        },
        className
      )}
    >
      {Array(repeat)
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            className={cn("flex shrink-0 justify-around [gap:var(--gap)]", {
              "animate-marquee flex-row": !vertical,
              "animate-marquee-vertical flex-col": vertical,
              "group-hover:[animation-play-state:paused]": pauseOnHover,
              "[animation-direction:reverse]": reverse,
            })}
          >
            {children}
          </div>
        ))}
    </div>
  )
}

// OSINT-themed tiles with appropriate icons and gradients
const osintTiles = [
  {
    icon: <Shield className="size-full" />,
    bg: (
      <div className="pointer-events-none absolute left-1/2 top-1/2 size-1/2 -translate-x-1/2 -translate-y-1/2 overflow-visible rounded-full bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 opacity-70 blur-md"></div>
    ),
  },
  {
    icon: <Search className="size-full" />,
    bg: (
      <div className="pointer-events-none absolute left-1/2 top-1/2 size-1/2 -translate-x-1/2 -translate-y-1/2 overflow-visible rounded-full bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 opacity-70 blur-md"></div>
    ),
  },
  {
    icon: <Database className="size-full" />,
    bg: (
      <div className="pointer-events-none absolute left-1/2 top-1/2 size-1/2 -translate-x-1/2 -translate-y-1/2 overflow-visible rounded-full bg-gradient-to-r from-green-500 via-teal-500 to-emerald-600 opacity-70 blur-md"></div>
    ),
  },
  {
    icon: <Eye className="size-full" />,
    bg: (
      <div className="pointer-events-none absolute left-1/2 top-1/2 size-1/2 -translate-x-1/2 -translate-y-1/2 overflow-visible rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-red-500 opacity-70 blur-md"></div>
    ),
  },
  {
    icon: <Globe className="size-full" />,
    bg: (
      <div className="pointer-events-none absolute left-1/2 top-1/2 size-1/2 -translate-x-1/2 -translate-y-1/2 overflow-visible rounded-full bg-gradient-to-r from-purple-600 via-violet-600 to-purple-700 opacity-70 blur-md"></div>
    ),
  },
  {
    icon: <Zap className="size-full" />,
    bg: (
      <div className="pointer-events-none absolute left-1/2 top-1/2 size-1/2 -translate-x-1/2 -translate-y-1/2 overflow-visible rounded-full bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-600 opacity-70 blur-md"></div>
    ),
  },
  {
    icon: <Target className="size-full" />,
    bg: (
      <div className="pointer-events-none absolute left-1/2 top-1/2 size-1/2 -translate-x-1/2 -translate-y-1/2 overflow-visible rounded-full bg-gradient-to-r from-red-500 via-orange-500 to-pink-500 opacity-70 blur-md"></div>
    ),
  },
  {
    icon: <Scan className="size-full" />,
    bg: (
      <div className="pointer-events-none absolute left-1/2 top-1/2 size-1/2 -translate-x-1/2 -translate-y-1/2 overflow-visible rounded-full bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500 opacity-70 blur-md"></div>
    ),
  },
  {
    icon: <Users className="size-full" />,
    bg: (
      <div className="pointer-events-none absolute left-1/2 top-1/2 size-1/2 -translate-x-1/2 -translate-y-1/2 overflow-visible rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-70 blur-md"></div>
    ),
  },
  {
    icon: <Mail className="size-full" />,
    bg: (
      <div className="pointer-events-none absolute left-1/2 top-1/2 size-1/2 -translate-x-1/2 -translate-y-1/2 overflow-visible rounded-full bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 opacity-70 blur-md"></div>
    ),
  },
  {
    icon: <Newspaper className="size-full" />,
    bg: (
      <div className="pointer-events-none absolute left-1/2 top-1/2 size-1/2 -translate-x-1/2 -translate-y-1/2 overflow-visible rounded-full bg-gradient-to-r from-slate-500 via-gray-500 to-zinc-500 opacity-70 blur-md"></div>
    ),
  },
  {
    icon: <ImageIcon className="size-full" />,
    bg: (
      <div className="pointer-events-none absolute left-1/2 top-1/2 size-1/2 -translate-x-1/2 -translate-y-1/2 overflow-visible rounded-full bg-gradient-to-r from-violet-500 via-purple-500 to-indigo-500 opacity-70 blur-md"></div>
    ),
  },
  {
    icon: <Activity className="size-full" />,
    bg: (
      <div className="pointer-events-none absolute left-1/2 top-1/2 size-1/2 -translate-x-1/2 -translate-y-1/2 overflow-visible rounded-full bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 opacity-70 blur-md"></div>
    ),
  },
  {
    icon: <Lock className="size-full" />,
    bg: (
      <div className="pointer-events-none absolute left-1/2 top-1/2 size-1/2 -translate-x-1/2 -translate-y-1/2 overflow-visible rounded-full bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 opacity-70 blur-md"></div>
    ),
  },
  {
    icon: <Network className="size-full" />,
    bg: (
      <div className="pointer-events-none absolute left-1/2 top-1/2 size-1/2 -translate-x-1/2 -translate-y-1/2 overflow-visible rounded-full bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 opacity-70 blur-md"></div>
    ),
  },
  {
    icon: <Radar className="size-full" />,
    bg: (
      <div className="pointer-events-none absolute left-1/2 top-1/2 size-1/2 -translate-x-1/2 -translate-y-1/2 overflow-visible rounded-full bg-gradient-to-r from-lime-500 via-green-500 to-emerald-500 opacity-70 blur-md"></div>
    ),
  },
]

function shuffleArray<T>(array: T[]): T[] {
  let currentIndex = array.length
  let randomIndex
  // While there remain elements to shuffle.
  while (currentIndex !== 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex--
    // And swap it with the current element.
    ;[array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ]
  }
  return array
}

function Card(card: { icon: JSX.Element; bg: JSX.Element }) {
  const id = useId()
  const controls = useAnimation()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (inView) {
      controls.start({
        opacity: 1,
        transition: { delay: Math.random() * 2, ease: "easeOut", duration: 1 },
      })
    }
  }, [controls, inView])

  return (
    <motion.div
      key={id}
      ref={ref}
      initial={{ opacity: 0 }}
      animate={controls}
      className={cn(
        "relative size-20 cursor-pointer overflow-hidden rounded-2xl border p-4",
        "bg-gray-900/50 border-gray-800/50 [box-shadow:0_0_0_1px_rgba(139,92,246,.1),0_2px_4px_rgba(0,0,0,.3),0_12px_24px_rgba(139,92,246,.1)]",
        "transform-gpu hover:bg-gray-900/70 transition-all duration-300",
        "dark:bg-gray-900/30 dark:[border:1px_solid_rgba(139,92,246,.2)] dark:[box-shadow:0_-20px_80px_-20px_#8b5cf620_inset]"
      )}
      whileHover={{ 
        scale: 1.05, 
        y: -2,
        boxShadow: "0 0 0 1px rgba(139,92,246,.2), 0 4px 8px rgba(0,0,0,.4), 0 16px 32px rgba(139,92,246,.15)"
      }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="relative z-10 text-purple-300">
        {card.icon}
      </div>
      {card.bg}
    </motion.div>
  )
}

export function OSINTMarquee() {
  const [randomTiles1, setRandomTiles1] = useState<typeof osintTiles>([])
  const [randomTiles2, setRandomTiles2] = useState<typeof osintTiles>([])
  const [randomTiles3, setRandomTiles3] = useState<typeof osintTiles>([])
  const [randomTiles4, setRandomTiles4] = useState<typeof osintTiles>([])

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Ensures this runs client-side
      setRandomTiles1(shuffleArray([...osintTiles]))
      setRandomTiles2(shuffleArray([...osintTiles]))
      setRandomTiles3(shuffleArray([...osintTiles]))
      setRandomTiles4(shuffleArray([...osintTiles]))
    }
  }, [])

  return (
    <section className="relative bg-black py-20 overflow-hidden" id="osint-marquee">
      {/* Background decoration matching your theme */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.05)_0%,transparent_50%)]"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/20 to-transparent"></div>
      
      {/* Noise texture for consistency with your hero */}
      <svg className="absolute inset-0 h-full w-full opacity-10">
        <filter id="marquee-noise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.6"
            numOctaves="2"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.1" />
          </feComponentTransfer>
        </filter>
        <rect width="100%" height="100%" filter="url(#marquee-noise)" />
      </svg>

      <div className="relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-gray-900/50 text-white ring-gray-800 relative mx-auto mb-6 w-fit rounded-full rounded-bl-[2px] px-4 py-2 text-sm ring border border-gray-800/50 backdrop-blur-sm"
          >
            <span className="relative z-1 flex items-center gap-2">
              <Activity className="w-4 h-4 text-purple-400" />
              Intelligence Suite
            </span>
            <span className="from-purple-500/0 via-purple-500 to-purple-500/0 absolute -bottom-px left-1/2 h-px w-2/5 -translate-x-1/2 bg-gradient-to-r"></span>
            <span className="absolute inset-0 bg-[radial-gradient(30%_40%_at_50%_100%,rgba(139,92,246,0.25)_0%,transparent_100%)]"></span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-white mb-6 text-center text-4xl lg:text-5xl font-bold leading-tight"
          >
            Powered by
            <br />
            <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              OSINT Intelligence
            </span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-gray-300 mx-auto max-w-2xl text-center text-lg leading-relaxed mb-12"
          >
            Comprehensive OSINT tools for threat intelligence, digital forensics, and investigative research
          </motion.p>
        </div>

        {/* Marquee Section */}
        <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
          <Marquee
            reverse
            className="-delay-[200ms] [--duration:25s]"
            repeat={3}
            pauseOnHover={true}
          >
            {randomTiles1.map((tile, idx) => (
              <Card key={`row1-${idx}`} {...tile} />
            ))}
          </Marquee>
          
          <Marquee reverse className="[--duration:35s]" repeat={3} pauseOnHover={true}>
            {randomTiles2.map((tile, idx) => (
              <Card key={`row2-${idx}`} {...tile} />
            ))}
          </Marquee>
          
          <Marquee
            reverse
            className="-delay-[200ms] [--duration:30s]"
            repeat={3}
            pauseOnHover={true}
          >
            {randomTiles3.map((tile, idx) => (
              <Card key={`row3-${idx}`} {...tile} />
            ))}
          </Marquee>
          
          <Marquee reverse className="[--duration:40s]" repeat={3} pauseOnHover={true}>
            {randomTiles4.map((tile, idx) => (
              <Card key={`row4-${idx}`} {...tile} />
            ))}
          </Marquee>
          
          {/* Center overlay with gradient */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/80"></div>
          </div>
          
          {/* Glowing center accent */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="h-32 w-32 rounded-full bg-purple-600/20 blur-[60px] animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
