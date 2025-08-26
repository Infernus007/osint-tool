import { easeInOut, motion, spring } from 'motion/react';
import { OSINTButton } from '@/components/ui/osint-button';
import {
  ArrowRight,
  Database,
  Zap,
  ArrowUpRight,
  Mail,
  Newspaper,
  Image as ImageIcon,
} from 'lucide-react';
import { World } from '@/components/globe';
import { sampleArcs , globeConfig } from '@/data/osint-data';
import { TextHoverEffect } from '@/components/ui/text-hover-effect';

export default function AppHero() {
  // State for animated counters - removed false stats

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: spring, stiffness: 100 },
    },
  };

  // Floating animation for the cube (reserved)
  // const floatingAnimation = {
  //   y: [0, -10, 0],
  //   transition: {
  //     duration: 4,
  //     repeat: Infinity,
  //     ease: easeInOut,
  //   },
  // };

  // Rotation animation for the orbital ring (reserved)
  // const rotateAnimation = {
  //   rotate: 360,
  //   transition: {
  //     duration: 20,
  //     repeat: Infinity,
  //     ease: 'linear',
  //   },
  // };

  // Glowing effect animation
  const glowAnimation = {
    opacity: [0.5, 0.8, 0.5],
    scale: [1, 1.05, 1],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: easeInOut,
    },
  };

  // Tooltip animation (reserved)
  // const tooltipVariants = {
  //   hidden: { opacity: 0, scale: 0.8 },
  //   visible: {
  //     opacity: 1,
  //     scale: 1,
  //     transition: {
  //       type: spring,
  //       stiffness: 100,
  //       delay: 1.2,
  //     },
  //   },
  // };

  // Badge pulse animation (reserved)
  // const badgePulse = {
  //   scale: [1, 1.05, 1],
  //   opacity: [0.9, 1, 0.9],
  //   transition: {
  //     duration: 2,
  //     repeat: Infinity,
  //     ease: 'easeInOut',
  //   },
  // };

  return (
    <section className="relative flex min-h-screen w-full flex-col items-center overflow-hidden bg-black py-16 text-white sm:px-6 lg:px-8 lg:py-2">
      <div className="absolute inset-0 z-0 h-full w-full rotate-180 items-center px-5 py-24 opacity-80 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>
      <svg
        id="noice"
        className="absolute inset-0 z-10 h-full w-full opacity-30"
      >
        <filter id="noise-filter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="1.34"
            numOctaves="4"
            stitchTiles="stitch"
          ></feTurbulence>
          <feColorMatrix type="saturate" values="0"></feColorMatrix>
          <feComponentTransfer>
            <feFuncR type="linear" slope="0.46"></feFuncR>
            <feFuncG type="linear" slope="0.46"></feFuncG>
            <feFuncB type="linear" slope="0.47"></feFuncB>
            <feFuncA type="linear" slope="0.37"></feFuncA>
          </feComponentTransfer>
          <feComponentTransfer>
            <feFuncR type="linear" slope="1.47" intercept="-0.23" />
            <feFuncG type="linear" slope="1.47" intercept="-0.23" />
            <feFuncB type="linear" slope="1.47" intercept="-0.23" />
          </feComponentTransfer>
        </filter>
        <rect width="100%" height="100%" filter="url(#noise-filter)"></rect>
      </svg>
      {/* Background effects */}
      <div className="absolute inset-0 z-0">
        {/* Radial gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/30 via-black/70 to-gray-950 blur-3xl"></div>

        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="h-full w-full bg-[linear-gradient(to_right,rgba(255,255,255,0.22)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.2)_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
        </div>

        {/* Enhanced futuristic glow spots */}
        <div className="absolute top-20 -left-20 h-80 w-80 rounded-full bg-purple-600/30 blur-[120px]"></div>
        <div className="absolute -right-20 bottom-20 h-80 w-80 rounded-full bg-blue-600/30 blur-[120px]"></div>
        <motion.div
          animate={glowAnimation}
          className="absolute top-1/3 left-1/4 h-60 w-60 rounded-full bg-indigo-500/20 blur-[100px]"
        ></motion.div>
        <motion.div
          animate={glowAnimation}
          className="absolute right-1/4 bottom-1/3 h-60 w-60 rounded-full bg-purple-500/20 blur-[100px]"
        ></motion.div>
        
        {/* Additional cyberpunk-style glows */}
        <motion.div
          animate={{
            opacity: [0.3, 0.7, 0.3],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/2 left-1/2 h-40 w-40 rounded-full bg-cyan-500/15 blur-[80px] -translate-x-1/2 -translate-y-1/2"
        ></motion.div>
        
        <motion.div
          animate={{
            opacity: [0.2, 0.6, 0.2],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute top-1/4 right-1/4 h-50 w-50 rounded-full bg-pink-500/10 blur-[90px]"
        ></motion.div>

        {/* Futuristic particle effects */}
        <div className="absolute inset-0 opacity-30">
          {Array.from({ length: 30 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-1 w-1 rounded-full"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                backgroundColor: ['#6366f1', '#8b5cf6', '#06b6d4', '#f59e0b'][Math.floor(Math.random() * 4)],
              }}
              animate={{
                opacity: [0.1, 0.9, 0.1],
                scale: [1, 2, 1],
                y: [0, -20, 0],
              }}
              transition={{
                duration: 4 + Math.random() * 3,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: Math.random() * 3,
              }}
            />
          ))}
        </div>
        
        {/* Data stream lines */}
        <div className="absolute inset-0 opacity-10">
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={`line-${i}`}
              className="absolute h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent"
              style={{
                top: `${20 + i * 10}%`,
                left: '0%',
                width: '100%',
              }}
              animate={{
                opacity: [0, 0.5, 0],
                scaleX: [0, 1, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.5,
              }}
            />
          ))}
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="fadein-blur relative z-0 mx-auto mb-10 h-[400px] w-[400px] lg:absolute lg:top-1/2 lg:right-1/2 lg:mx-0 lg:mb-0 lg:h-[650px] lg:w-[650px] lg:translate-x-1/2 lg:-translate-y-2/3"
      >
        {/* Globe container with grid effect */}
        <div className="absolute inset-2 h-full w-full">
                 <World data={sampleArcs} globeConfig={globeConfig} />
        </div>
        
        {/* Social Media Intelligence */}
        <motion.div
          initial={{ opacity: 0, x: -30, y: -10, scale: 0.6 }}
          animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
          transition={{ 
            delay: 1.8, 
            duration: 1.2, 
            ease: [0.25, 0.46, 0.45, 0.94],
            type: "spring",
            stiffness: 120,
            damping: 12
          }}
          className="absolute top-8 left-4 rounded-lg border border-purple-500/30 bg-black/80 p-2 backdrop-blur-md lg:top-1/4 lg:-left-20"
        >
          <div className="flex items-center gap-2">
            <Zap className="h-4 w-4 text-purple-400" />
            <span className="text-xs font-medium text-purple-200">
              Social Media Intel
            </span>
          </div>
        </motion.div>

        {/* Dark Web Intelligence */}
        <motion.div
          initial={{ opacity: 0, x: 30, y: -10, scale: 0.6 }}
          animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
          transition={{ 
            delay: 2.0, 
            duration: 1.2, 
            ease: [0.25, 0.46, 0.45, 0.94],
            type: "spring",
            stiffness: 120,
            damping: 12
          }}
          className="absolute top-1/2 right-4 rounded-lg border border-blue-500/30 bg-black/80 p-2 backdrop-blur-md lg:-right-24"
        >
          <div className="flex items-center gap-2">
            <Database className="h-4 w-4 text-blue-400" />
            <span className="text-xs font-medium text-blue-200">
              Dark Web Monitor
            </span>
          </div>
        </motion.div>

        {/* Email Analysis */}
        <motion.div
          initial={{ opacity: 0, x: -20, y: 30, scale: 0.6 }}
          animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
          transition={{ 
            delay: 2.2, 
            duration: 1.2, 
            ease: [0.25, 0.46, 0.45, 0.94],
            type: "spring",
            stiffness: 120,
            damping: 12
          }}
          className="absolute bottom-8 left-4 rounded-lg border border-yellow-500/30 bg-black/80 p-2 backdrop-blur-md lg:bottom-1/4 lg:left-8"
        >
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4 text-yellow-400" />
            <span className="text-xs font-medium text-yellow-200">
              Email Analysis
            </span>
          </div>
        </motion.div>

        {/* News Intelligence */}
        <motion.div
          initial={{ opacity: 0, x: 20, y: -30, scale: 0.6 }}
          animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
          transition={{ 
            delay: 2.4, 
            duration: 1.2, 
            ease: [0.25, 0.46, 0.45, 0.94],
            type: "spring",
            stiffness: 120,
            damping: 12
          }}
          className="absolute top-16 right-4 rounded-lg border border-green-500/30 bg-black/80 p-2 backdrop-blur-md lg:top-1/4 lg:right-1/4"
        >
          <div className="flex items-center gap-2">
            <Newspaper className="h-4 w-4 text-green-400" />
            <span className="text-xs font-medium text-green-200">
              News Monitor
            </span>
          </div>
        </motion.div>

        {/* Reverse Image Search */}
        <motion.div
          initial={{ opacity: 0, x: 25, y: 25, scale: 0.6, rotate: -15 }}
          animate={{ opacity: 1, x: 0, y: 0, scale: 1, rotate: 0 }}
          transition={{ 
            delay: 2.6, 
            duration: 1.2, 
            ease: [0.25, 0.46, 0.45, 0.94],
            type: "spring",
            stiffness: 140,
            damping: 14
          }}
          className="absolute bottom-16 right-4 rounded-lg border border-pink-500/30 bg-black/80 p-2 backdrop-blur-md lg:bottom-1/4 lg:right-1/4"
        >
          <div className="flex items-center gap-2">
            <ImageIcon className="h-4 w-4 text-pink-400" />
            <span className="text-xs font-medium text-pink-200">
              Image Search
            </span>
          </div>
        </motion.div>
      </motion.div>

      {/* Main Content Area */}
      <motion.main
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 mb-10 flex w-full max-w-[1450px] flex-grow flex-col items-center justify-center px-4 text-center sm:px-8 lg:mb-0 lg:items-start lg:justify-end lg:text-left"
      >
        <motion.div className="flex w-full flex-col items-center justify-between lg:flex-row lg:items-start">
          <div className="w-full lg:w-auto">
            <motion.div
              variants={itemVariants}
              className="mb-4 inline-flex items-center rounded-full border border-purple-500/30 bg-purple-500/10 px-3 py-1 text-sm text-purple-300"
            >
              <span className="mr-2 rounded-full bg-purple-500 px-2 py-0.5 text-xs font-semibold text-white">
                New
              </span>
              OSINT Intelligence Suite
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="mb-6 text-left"
            >
              {/* OSINT Tool with text hover effect - 60% */}
              <div className="h-20 md:h-28 lg:h-32 mb-2">
                <TextHoverEffect 
                  text="OSINT Tool" 
                  automatic={true}
                  duration={0.5}
                />
              </div>
              {/* Regular styled text - 40% */}
              <div className="bg-gradient-to-r from-white/70 via-white to-slate-500/80 bg-clip-text text-2xl leading-tight text-transparent sm:text-3xl md:text-4xl lg:text-5xl text-left">
                <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Automated and Actionable
                </span>
              </div>
            </motion.h1>

            {/* Enhanced OSINT Platform Description */}
            <motion.div
              variants={itemVariants}
              className="mb-6 flex flex-wrap justify-center gap-4 md:gap-6 lg:justify-start"
            >
              <div className="rounded-lg border border-purple-500/20 bg-black/40 px-4 py-2 backdrop-blur-sm">
                <p className="text-sm font-medium text-purple-300">Real-time</p>
                <p className="text-xs text-gray-400">Data Collection</p>
              </div>
              <div className="rounded-lg border border-blue-500/20 bg-black/40 px-4 py-2 backdrop-blur-sm">
                <p className="text-sm font-medium text-blue-300">Advanced</p>
                <p className="text-xs text-gray-400">Analytics</p>
              </div>
              <div className="rounded-lg border border-indigo-500/20 bg-black/40 px-4 py-2 backdrop-blur-sm">
                <p className="text-sm font-medium text-indigo-300">Threat</p>
                <p className="text-xs text-gray-400">Intelligence</p>
              </div>
            </motion.div>

            {/* Integration badges */}
            <motion.div
              variants={itemVariants}
              className="mb-8 flex flex-wrap items-center justify-center gap-2 lg:justify-start"
            >
              <span className="text-xs font-medium text-gray-400">
                Modules:
              </span>
              <div className="flex cursor-pointer items-center gap-2 rounded-full border border-slate-800 bg-slate-900/60 px-2 py-1 text-xs font-medium text-slate-300 backdrop-blur-sm transition-all hover:bg-purple-950">
                <div className="h-2 w-2 rounded-full bg-blue-400"></div>
                Social Media
              </div>
              <div className="flex cursor-pointer items-center gap-2 rounded-full border border-slate-800 bg-slate-900/60 px-2 py-1 text-xs font-medium text-slate-300 backdrop-blur-sm transition-all hover:bg-purple-950">
                <div className="h-2 w-2 rounded-full bg-purple-400"></div>
                Dark Web
              </div>
              <div className="flex cursor-pointer items-center gap-2 rounded-full border border-slate-800 bg-slate-900/60 px-2 py-1 text-xs font-medium text-slate-300 backdrop-blur-sm transition-all hover:bg-purple-950">
                <div className="h-2 w-2 rounded-full bg-green-400"></div>
                News
              </div>
              <div className="flex cursor-pointer items-center gap-2 rounded-full border border-slate-800 bg-slate-900/60 px-2 py-1 text-xs font-medium text-slate-300 backdrop-blur-sm transition-all hover:bg-purple-950">
                <div className="h-2 w-2 rounded-full bg-yellow-400"></div>
                Email
              </div>
              <div className="flex cursor-pointer items-center gap-2 rounded-full border border-slate-800 bg-slate-900/60 px-2 py-1 text-xs font-medium text-slate-300 backdrop-blur-sm transition-all hover:bg-purple-950">
                <div className="h-2 w-2 rounded-full bg-pink-400"></div>
                Images
              </div>
            </motion.div>
          </div>

          <div className="mt-6 flex flex-col items-center lg:mt-0 lg:items-end">
            <motion.p
              variants={itemVariants}
              className="mb-8 max-w-md px-6 text-center text-lg leading-relaxed text-slate-300/90 lg:text-end"
            >
              Comprehensive OSINT platform with social media scraping, email analysis, news monitoring, 
              reverse image search, and dark web intelligence capabilities.
            </motion.p>
            <motion.div
              variants={itemVariants}
              className="mb-8 flex flex-col flex-wrap gap-4 sm:flex-row lg:justify-end"
            >
              <OSINTButton variant="primary" size="md" icon={ArrowRight}>
                Get Started
              </OSINTButton>

              <OSINTButton variant="outline" size="md" icon={undefined}>
                Explore Modules
              </OSINTButton>
            </motion.div>

            {/* Social proof */}
            <motion.div
              variants={itemVariants}
              className="mx-auto flex items-center gap-3 rounded-full border border-slate-800 bg-slate-900/50 px-3 py-1 backdrop-blur-sm lg:mx-0 lg:ml-auto"
            >
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="h-6 w-6 overflow-hidden rounded-full border-2 border-slate-900 bg-slate-800"
                  >
                    <div className="h-full w-full bg-gradient-to-br from-purple-500 to-blue-600 opacity-80"></div>
                  </div>
                ))}
              </div>
                              <span className="text-xs text-slate-300">
                  <span className="font-semibold text-white">Advanced</span>{' '}
                  OSINT Platform
                </span>
              <ArrowUpRight className="h-3 w-3 text-purple-400" />
            </motion.div>
          </div>
        </motion.div>
      </motion.main>
      <div className="absolute right-auto -bottom-40 left-1/2 h-96 w-20 -translate-x-1/2 -rotate-45 rounded-full bg-gray-200/30 blur-[80px] lg:right-96 lg:left-auto lg:translate-x-0"></div>
      <div className="absolute right-auto -bottom-52 left-1/2 h-96 w-20 -translate-x-1/2 -rotate-45 rounded-full bg-gray-300/20 blur-[80px] lg:right-auto lg:left-auto lg:translate-x-0"></div>
      <div className="absolute right-auto -bottom-60 left-1/2 h-96 w-10 -translate-x-20 -rotate-45 rounded-full bg-gray-300/20 blur-[80px] lg:right-96 lg:left-auto lg:-translate-x-40"></div>
      
      {/* Bottom edge blur fade - positioned at very bottom edge */}
      <div className="absolute -bottom-16 left-0 right-0 h-20 bg-gradient-to-t from-black via-black/60 to-transparent pointer-events-none z-20"></div>
      <div className="absolute -bottom-8 left-0 right-0 h-12 bg-gradient-to-t from-black/95 to-transparent backdrop-blur-sm pointer-events-none z-20"></div>
    </section>
  );
}
