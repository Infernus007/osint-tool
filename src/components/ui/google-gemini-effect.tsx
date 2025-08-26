"use client";
import { cn } from "@/lib/utils";
import { motion, type MotionValue } from "motion/react";

const transition = {
  duration: 0.1,
  ease: "easeInOut" as const,
};

export const GoogleGeminiEffect = ({
  pathLengths,
  title,
  description,
  className,
}: {
  pathLengths: MotionValue[];
  title?: string;
  description?: string;
  className?: string;
}) => {
  return (
    <div className={cn("relative h-[100vh] overflow-hidden", className)}>
      <div className="absolute inset-0 bg-gradient-to-b from-black via-slate-900/50 to-black" />
      
      {/* Central content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        <p className="text-4xl md:text-7xl font-bold pb-4 bg-clip-text text-transparent bg-gradient-to-b from-blue-400 via-purple-400 to-cyan-400 drop-shadow-2xl">
          {title || `Next-Gen OSINT`}
        </p>
        <p className="text-lg md:text-xl font-normal text-slate-300 mt-4 max-w-2xl mx-auto leading-relaxed">
          {description ||
            `Experience the power of advanced intelligence gathering with our cutting-edge platform`}
        </p>
        <button className="font-bold bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-full px-8 py-3 mt-8 z-30 text-white shadow-2xl transition-all duration-300 hover:scale-105 border border-blue-400/30">
          OSINT Platform
        </button>
      </div>
      
      {/* Glowing beam effects */}
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 1440 890"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0 w-full h-full"
      >
        <defs>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="coloredBlur"/>
            <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="innerBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="innerBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          
          <filter id="innerGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="coloredBlur"/>
            <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="sharpBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="sharpBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>

          <filter id="strongGlow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="15" result="bigBlur"/>
            <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="medBlur"/>
            <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="smallBlur"/>
            <feMerge>
              <feMergeNode in="bigBlur"/>
              <feMergeNode in="medBlur"/>
              <feMergeNode in="smallBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>

          <linearGradient id="beamGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.8"/>
            <stop offset="25%" stopColor="#06B6D4" stopOpacity="1"/>
            <stop offset="50%" stopColor="#8B5CF6" stopOpacity="1"/>
            <stop offset="75%" stopColor="#06B6D4" stopOpacity="1"/>
            <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.8"/>
          </linearGradient>
          
          <linearGradient id="beamGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.8"/>
            <stop offset="25%" stopColor="#A855F7" stopOpacity="1"/>
            <stop offset="50%" stopColor="#3B82F6" stopOpacity="1"/>
            <stop offset="75%" stopColor="#A855F7" stopOpacity="1"/>
            <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.8"/>
          </linearGradient>
          
          <linearGradient id="beamGradient3" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.6"/>
            <stop offset="50%" stopColor="#F59E0B" stopOpacity="1"/>
            <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.6"/>
          </linearGradient>
        </defs>

        {/* Primary DNA Double Helix */}
        {/* Main spiral strand 1 */}
        <motion.path
          d="M0 445C80 420, 160 400, 240 420C320 445, 400 465, 480 445C560 420, 640 400, 720 420C800 445, 880 465, 960 445C1040 420, 1120 400, 1200 420C1280 445, 1360 465, 1440 445"
          stroke="url(#beamGradient1)"
          strokeWidth="8"
          fill="none"
          filter="url(#glow)"
          initial={{ pathLength: 0, opacity: 0 }}
          style={{
            pathLength: pathLengths[0],
            opacity: pathLengths[0],
          }}
          transition={transition}
        />
        
        {/* Main spiral strand 2 */}
        <motion.path
          d="M0 445C80 470, 160 490, 240 470C320 445, 400 425, 480 445C560 470, 640 490, 720 470C800 445, 880 425, 960 445C1040 470, 1120 490, 1200 470C1280 445, 1360 425, 1440 445"
          stroke="url(#beamGradient2)"
          strokeWidth="8"
          fill="none"
          filter="url(#glow)"
          initial={{ pathLength: 0, opacity: 0 }}
          style={{
            pathLength: pathLengths[1],
            opacity: pathLengths[1],
          }}
          transition={transition}
        />

        {/* Secondary DNA Helix (inner spiral) */}
        <motion.path
          d="M0 445C60 430, 120 415, 180 430C240 445, 300 460, 360 445C420 430, 480 415, 540 430C600 445, 660 460, 720 445C780 430, 840 415, 900 430C960 445, 1020 460, 1080 445C1140 430, 1200 415, 1260 430C1320 445, 1380 460, 1440 445"
          stroke="url(#beamGradient1)"
          strokeWidth="5"
          fill="none"
          filter="url(#innerGlow)"
          initial={{ pathLength: 0, opacity: 0 }}
          style={{
            pathLength: pathLengths[2],
            opacity: pathLengths[2],
          }}
          transition={transition}
        />
        
        <motion.path
          d="M0 445C60 460, 120 475, 180 460C240 445, 300 430, 360 445C420 460, 480 475, 540 460C600 445, 660 430, 720 445C780 460, 840 475, 900 460C960 445, 1020 430, 1080 445C1140 460, 1200 475, 1260 460C1320 445, 1380 430, 1440 445"
          stroke="url(#beamGradient2)"
          strokeWidth="5"
          fill="none"
          filter="url(#innerGlow)"
          initial={{ pathLength: 0, opacity: 0 }}
          style={{
            pathLength: pathLengths[2],
            opacity: pathLengths[2],
          }}
          transition={transition}
        />

        {/* Tertiary DNA Helix (outer spiral) */}
        <motion.path
          d="M0 445C100 405, 200 365, 300 405C400 445, 500 485, 600 445C700 405, 800 365, 900 405C1000 445, 1100 485, 1200 445C1300 405, 1400 365, 1440 380"
          stroke="url(#beamGradient1)"
          strokeWidth="4"
          fill="none"
          filter="url(#innerGlow)"
          initial={{ pathLength: 0, opacity: 0 }}
          style={{
            pathLength: pathLengths[3],
            opacity: pathLengths[3],
          }}
          transition={transition}
        />
        
        <motion.path
          d="M0 445C100 485, 200 525, 300 485C400 445, 500 405, 600 445C700 485, 800 525, 900 485C1000 445, 1100 405, 1200 445C1300 485, 1400 525, 1440 510"
          stroke="url(#beamGradient2)"
          strokeWidth="4"
          fill="none"
          filter="url(#innerGlow)"
          initial={{ pathLength: 0, opacity: 0 }}
          style={{
            pathLength: pathLengths[3],
            opacity: pathLengths[3],
          }}
          transition={transition}
        />
        
        {/* Connecting bridges between helices */}
        <motion.path
          d="M120 432C120 458"
          stroke="url(#beamGradient3)"
          strokeWidth="2"
          fill="none"
          filter="url(#innerGlow)"
          initial={{ pathLength: 0, opacity: 0 }}
          style={{
            pathLength: pathLengths[4],
            opacity: pathLengths[4],
          }}
          transition={transition}
        />
        
        <motion.path
          d="M280 458C280 432"
          stroke="url(#beamGradient3)"
          strokeWidth="2"
          fill="none"
          filter="url(#innerGlow)"
          initial={{ pathLength: 0, opacity: 0 }}
          style={{
            pathLength: pathLengths[4],
            opacity: pathLengths[4],
          }}
          transition={transition}
        />
        
        <motion.path
          d="M440 432C440 458"
          stroke="url(#beamGradient3)"
          strokeWidth="2"
          fill="none"
          filter="url(#innerGlow)"
          initial={{ pathLength: 0, opacity: 0 }}
          style={{
            pathLength: pathLengths[4],
            opacity: pathLengths[4],
          }}
          transition={transition}
        />
        
        <motion.path
          d="M600 458C600 432"
          stroke="url(#beamGradient3)"
          strokeWidth="2"
          fill="none"
          filter="url(#innerGlow)"
          initial={{ pathLength: 0, opacity: 0 }}
          style={{
            pathLength: pathLengths[4],
            opacity: pathLengths[4],
          }}
          transition={transition}
        />
        
        <motion.path
          d="M760 432C760 458"
          stroke="url(#beamGradient3)"
          strokeWidth="2"
          fill="none"
          filter="url(#innerGlow)"
          initial={{ pathLength: 0, opacity: 0 }}
          style={{
            pathLength: pathLengths[4],
            opacity: pathLengths[4],
          }}
          transition={transition}
        />
        
        <motion.path
          d="M920 458C920 432"
          stroke="url(#beamGradient3)"
          strokeWidth="2"
          fill="none"
          filter="url(#innerGlow)"
          initial={{ pathLength: 0, opacity: 0 }}
          style={{
            pathLength: pathLengths[4],
            opacity: pathLengths[4],
          }}
          transition={transition}
        />
        
        <motion.path
          d="M1080 432C1080 458"
          stroke="url(#beamGradient3)"
          strokeWidth="2"
          fill="none"
          filter="url(#innerGlow)"
          initial={{ pathLength: 0, opacity: 0 }}
          style={{
            pathLength: pathLengths[4],
            opacity: pathLengths[4],
          }}
          transition={transition}
        />
        
        <motion.path
          d="M1240 458C1240 432"
          stroke="url(#beamGradient3)"
          strokeWidth="2"
          fill="none"
          filter="url(#innerGlow)"
          initial={{ pathLength: 0, opacity: 0 }}
          style={{
            pathLength: pathLengths[4],
            opacity: pathLengths[4],
          }}
          transition={transition}
        />

        {/* Complex multi-layered spiral patterns */}
        {/* Fine spiral details */}
        <motion.path
          d="M0 445C40 435, 80 425, 120 435C160 445, 200 455, 240 445C280 435, 320 425, 360 435C400 445, 440 455, 480 445C520 435, 560 425, 600 435C640 445, 680 455, 720 445C760 435, 800 425, 840 435C880 445, 920 455, 960 445C1000 435, 1040 425, 1080 435C1120 445, 1160 455, 1200 445C1240 435, 1280 425, 1320 435C1360 445, 1400 455, 1440 445"
          stroke="#06B6D4"
          strokeWidth="2"
          fill="none"
          filter="url(#innerGlow)"
          opacity="0.8"
          initial={{ pathLength: 0, opacity: 0 }}
          style={{
            pathLength: pathLengths[0],
            opacity: pathLengths[0],
          }}
          transition={transition}
        />
        
        <motion.path
          d="M0 445C40 455, 80 465, 120 455C160 445, 200 435, 240 445C280 455, 320 465, 360 455C400 445, 440 435, 480 445C520 455, 560 465, 600 455C640 445, 680 435, 720 445C760 455, 800 465, 840 455C880 445, 920 435, 960 445C1000 455, 1040 465, 1080 455C1120 445, 1160 435, 1200 445C1240 455, 1280 465, 1320 455C1360 445, 1400 435, 1440 445"
          stroke="#A855F7"
          strokeWidth="2"
          fill="none"
          filter="url(#innerGlow)"
          opacity="0.8"
          initial={{ pathLength: 0, opacity: 0 }}
          style={{
            pathLength: pathLengths[0],
            opacity: pathLengths[0],
          }}
          transition={transition}
        />

        {/* Wider amplitude spirals */}
        <motion.path
          d="M0 445C120 395, 240 345, 360 395C480 445, 600 495, 720 445C840 395, 960 345, 1080 395C1200 445, 1320 495, 1440 445"
          stroke="#3B82F6"
          strokeWidth="3"
          fill="none"
          filter="url(#innerGlow)"
          opacity="0.6"
          initial={{ pathLength: 0, opacity: 0 }}
          style={{
            pathLength: pathLengths[1],
            opacity: pathLengths[1],
          }}
          transition={transition}
        />
        
        <motion.path
          d="M0 445C120 495, 240 545, 360 495C480 445, 600 395, 720 445C840 495, 960 545, 1080 495C1200 445, 1320 395, 1440 445"
          stroke="#8B5CF6"
          strokeWidth="3"
          fill="none"
          filter="url(#innerGlow)"
          opacity="0.6"
          initial={{ pathLength: 0, opacity: 0 }}
          style={{
            pathLength: pathLengths[1],
            opacity: pathLengths[1],
          }}
          transition={transition}
        />

        {/* Ultra-fine detail spirals */}
        <motion.path
          d="M0 445C20 442, 40 439, 60 442C80 445, 100 448, 120 445C140 442, 160 439, 180 442C200 445, 220 448, 240 445C260 442, 280 439, 300 442C320 445, 340 448, 360 445C380 442, 400 439, 420 442C440 445, 460 448, 480 445C500 442, 520 439, 540 442C560 445, 580 448, 600 445C620 442, 640 439, 660 442C680 445, 700 448, 720 445C740 442, 760 439, 780 442C800 445, 820 448, 840 445C860 442, 880 439, 900 442C920 445, 940 448, 960 445C980 442, 1000 439, 1020 442C1040 445, 1060 448, 1080 445C1100 442, 1120 439, 1140 442C1160 445, 1180 448, 1200 445C1220 442, 1240 439, 1260 442C1280 445, 1300 448, 1320 445C1340 442, 1360 439, 1380 442C1400 445, 1420 448, 1440 445"
          stroke="#F59E0B"
          strokeWidth="1"
          fill="none"
          filter="url(#innerGlow)"
          opacity="0.9"
          initial={{ pathLength: 0, opacity: 0 }}
          style={{
            pathLength: pathLengths[2],
            opacity: pathLengths[2],
          }}
          transition={transition}
        />
        
        <motion.path
          d="M0 445C20 448, 40 451, 60 448C80 445, 100 442, 120 445C140 448, 160 451, 180 448C200 445, 220 442, 240 445C260 448, 280 451, 300 448C320 445, 340 442, 360 445C380 448, 400 451, 420 448C440 445, 460 442, 480 445C500 448, 520 451, 540 448C560 445, 580 442, 600 445C620 448, 640 451, 660 448C680 445, 700 442, 720 445C740 448, 760 451, 780 448C800 445, 820 442, 840 445C860 448, 880 451, 900 448C920 445, 940 442, 960 445C980 448, 1000 451, 1020 448C1040 445, 1060 442, 1080 445C1100 448, 1120 451, 1140 448C1160 445, 1180 442, 1200 445C1220 448, 1240 451, 1260 448C1280 445, 1300 442, 1320 445C1340 448, 1360 451, 1380 448C1400 445, 1420 442, 1440 445"
          stroke="#EC4899"
          strokeWidth="1"
          fill="none"
          filter="url(#innerGlow)"
          opacity="0.9"
          initial={{ pathLength: 0, opacity: 0 }}
          style={{
            pathLength: pathLengths[2],
            opacity: pathLengths[2],
          }}
          transition={transition}
        />
      </svg>
    </div>
  );
};
