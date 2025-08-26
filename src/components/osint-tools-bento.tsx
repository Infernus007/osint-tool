"use client";

import { motion } from "motion/react";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { 
  Mail, 
  Image as ImageIcon, 
  Newspaper, 
  Users, 
  Shield, 
  Globe,
  ArrowRight,
  Activity
} from "lucide-react";
import { OSINTButton } from "@/components/ui/osint-button";

// Modern SVG Graphics for each tool
const EmailAnalysisGraphic = () => (
  <div className="flex h-full w-full items-center justify-center overflow-hidden">
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="relative"
    >
      <svg
        width="120"
        height="100"
        viewBox="0 0 120 100"
        className="drop-shadow-lg"
        fill="none"
      >
        <defs>
          <linearGradient id="emailGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#1E40AF" stopOpacity="0.6" />
          </linearGradient>
          <filter id="emailGlow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Main email body */}
        <motion.rect 
          x="15" y="30" width="90" height="60" rx="8" 
          fill="url(#emailGrad)" 
          filter="url(#emailGlow)"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        />
        
        {/* Email fold line */}
        <motion.path 
          d="M20 38 L60 58 L100 38" 
          stroke="rgba(255,255,255,0.9)" 
          strokeWidth="2.5" 
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        />
        
        {/* Threat indicator */}
        <motion.circle 
          cx="95" cy="20" r="10" 
          fill="#EF4444"
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.2, 1] }}
          transition={{ duration: 0.6, delay: 0.8 }}
        />
        <motion.text 
          x="95" y="25" 
          textAnchor="middle" 
          className="text-xs fill-white font-bold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          !
        </motion.text>
        
        {/* Content lines with staggered animation */}
        <motion.rect 
          x="25" y="45" width="35" height="3" 
          fill="rgba(255,255,255,0.7)"
          initial={{ width: 0 }}
          animate={{ width: 35 }}
          transition={{ duration: 0.5, delay: 1.2 }}
        />
        <motion.rect 
          x="25" y="52" width="50" height="3" 
          fill="rgba(255,255,255,0.5)"
          initial={{ width: 0 }}
          animate={{ width: 50 }}
          transition={{ duration: 0.5, delay: 1.4 }}
        />
        <motion.rect 
          x="25" y="59" width="30" height="3" 
          fill="rgba(255,255,255,0.4)"
          initial={{ width: 0 }}
          animate={{ width: 30 }}
          transition={{ duration: 0.5, delay: 1.6 }}
        />
        
        {/* Scanning line effect */}
        <motion.line 
          x1="15" y1="70" x2="105" y2="70" 
          stroke="#10B981" 
          strokeWidth="2"
          initial={{ x2: 15 }}
          animate={{ x2: 105 }}
          transition={{ duration: 1.5, delay: 2, repeat: Infinity, repeatType: "reverse" }}
        />
      </svg>
    </motion.div>
  </div>
);

const ImageSearchGraphic = () => (
  <div className="flex h-full w-full items-center justify-center overflow-hidden">
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="relative"
    >
      <svg
        width="120"
        height="100"
        viewBox="0 0 120 100"
        className="drop-shadow-lg"
        fill="none"
      >
        <defs>
          <linearGradient id="imageGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#6D28D9" stopOpacity="0.6" />
          </linearGradient>
          <filter id="imageGlow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Main image frame */}
        <motion.rect 
          x="20" y="20" width="80" height="60" rx="10" 
          fill="url(#imageGrad)" 
          filter="url(#imageGlow)"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        />
        
        {/* Image content - mountain scene */}
        <motion.circle 
          cx="35" cy="35" r="8" 
          fill="rgba(255,255,255,0.8)"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.4, delay: 0.8 }}
        />
        <motion.path 
          d="M25 65 L40 50 L55 60 L75 45 L95 55 L95 75 L25 75 Z" 
          fill="rgba(255,255,255,0.6)"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, delay: 1 }}
        />
        
        {/* Search radar effect */}
        <motion.circle 
          cx="85" cy="30" r="18" 
          fill="none" 
          stroke="#10B981" 
          strokeWidth="2"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ 
            scale: [0, 1.2, 1], 
            opacity: [0, 1, 0.7] 
          }}
          transition={{ duration: 1, delay: 1.5 }}
        />
        <motion.circle 
          cx="85" cy="30" r="12" 
          fill="none" 
          stroke="#10B981" 
          strokeWidth="2"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 1.8 }}
        />
        <motion.circle 
          cx="85" cy="30" r="6" 
          fill="#10B981"
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.8, 1, 0.8]
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity,
            delay: 2
          }}
        />
        
        {/* Scan lines */}
        {[0, 1, 2].map((i) => (
          <motion.line 
            key={i}
            x1="25" y1={40 + i * 8} 
            x2="70" y2={40 + i * 8} 
            stroke="rgba(16,185,129,0.6)" 
            strokeWidth="1"
            initial={{ x2: 25 }}
            animate={{ x2: 70 }}
            transition={{ 
              duration: 0.8, 
              delay: 2.2 + i * 0.2,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
        ))}
      </svg>
    </motion.div>
  </div>
);

const NewsAnalysisGraphic = () => (
  <div className="flex h-full w-full items-center justify-center overflow-hidden">
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="relative"
    >
      <svg
        width="120"
        height="100"
        viewBox="0 0 120 100"
        className="drop-shadow-lg"
        fill="none"
      >
        <defs>
          <linearGradient id="newsGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10B981" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#047857" stopOpacity="0.6" />
          </linearGradient>
          <filter id="newsGlow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Main newspaper */}
        <motion.rect 
          x="25" y="20" width="70" height="60" rx="6" 
          fill="url(#newsGrad)" 
          filter="url(#newsGlow)"
          initial={{ y: 100 }}
          animate={{ y: 20 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        />
        
        {/* Newspaper header */}
        <motion.rect 
          x="30" y="28" width="60" height="4" 
          fill="rgba(255,255,255,0.9)"
          initial={{ width: 0 }}
          animate={{ width: 60 }}
          transition={{ duration: 0.6, delay: 1 }}
        />
        
        {/* Article content lines with staggered animation */}
        {[0, 1, 2, 3].map((i) => (
          <motion.rect 
            key={i}
            x="30" y={38 + i * 6} 
            width={45 - i * 3} height="2" 
            fill={`rgba(255,255,255,${0.7 - i * 0.1})`}
            initial={{ width: 0 }}
            animate={{ width: 45 - i * 3 }}
            transition={{ duration: 0.4, delay: 1.2 + i * 0.1 }}
          />
        ))}
        
        {/* Image placeholder */}
        <motion.rect 
          x="72" y="38" width="15" height="20" 
          fill="rgba(255,255,255,0.5)" rx="2"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.4, delay: 1.6 }}
        />
        
        {/* AI Analysis badge */}
        <motion.circle 
          cx="100" cy="25" r="12" 
          fill="#F59E0B"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.6, delay: 2 }}
        />
        <motion.text 
          x="100" y="30" 
          textAnchor="middle" 
          className="text-xs fill-white font-bold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
        >
          AI
        </motion.text>
        
        {/* Analysis flow lines */}
        <motion.path 
          d="M88 30 Q 83 35 88 40 Q 93 45 88 50" 
          stroke="#F59E0B" 
          strokeWidth="2" 
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, delay: 3, repeat: Infinity, repeatType: "reverse" }}
        />
        
        {/* Sentiment indicators */}
        <motion.circle 
          cx="15" cy="30" r="4" 
          fill="#10B981"
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.2, 1] }}
          transition={{ duration: 0.5, delay: 3.5 }}
        />
        <motion.circle 
          cx="15" cy="45" r="4" 
          fill="#EF4444"
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.2, 1] }}
          transition={{ duration: 0.5, delay: 3.7 }}
        />
        <motion.circle 
          cx="15" cy="60" r="4" 
          fill="#F59E0B"
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.2, 1] }}
          transition={{ duration: 0.5, delay: 3.9 }}
        />
      </svg>
    </motion.div>
  </div>
);

const SocialMediaGraphic = () => (
  <div className="flex h-full w-full items-center justify-center overflow-hidden">
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="relative flex items-center justify-center"
    >
      <svg
        width="120"
        height="100"
        viewBox="0 0 120 100"
        className="drop-shadow-lg mx-auto"
        fill="none"
      >
        <defs>
          <linearGradient id="socialGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#EC4899" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#BE185D" stopOpacity="0.6" />
          </linearGradient>
          <filter id="socialGlow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Network nodes with staggered animation */}
        <motion.circle 
          cx="40" cy="35" r="10" 
          fill="url(#socialGrad)" 
          filter="url(#socialGlow)"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        />
        <motion.circle 
          cx="80" cy="35" r="10" 
          fill="url(#socialGrad)" 
          filter="url(#socialGlow)"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        />
        <motion.circle 
          cx="60" cy="55" r="12" 
          fill="url(#socialGrad)" 
          filter="url(#socialGlow)"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        />
        <motion.circle 
          cx="35" cy="75" r="8" 
          fill="url(#socialGrad)" 
          filter="url(#socialGlow)"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        />
        <motion.circle 
          cx="85" cy="75" r="8" 
          fill="url(#socialGrad)" 
          filter="url(#socialGlow)"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 1.0 }}
        />
        
        {/* Animated connections */}
        <motion.line 
          x1="40" y1="35" x2="60" y2="55" 
          stroke="#EC4899" 
          strokeWidth="3"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        />
        <motion.line 
          x1="80" y1="35" x2="60" y2="55" 
          stroke="#EC4899" 
          strokeWidth="3"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.8, delay: 1.4 }}
        />
        <motion.line 
          x1="60" y1="55" x2="35" y2="75" 
          stroke="#EC4899" 
          strokeWidth="3"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.8, delay: 1.6 }}
        />
        <motion.line 
          x1="60" y1="55" x2="85" y2="75" 
          stroke="#EC4899" 
          strokeWidth="3"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.8, delay: 1.8 }}
        />
        
        {/* Profile avatars */}
        <motion.circle 
          cx="40" cy="35" r="6" 
          fill="rgba(255,255,255,0.9)"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3, delay: 2 }}
        />
        <motion.circle 
          cx="80" cy="35" r="6" 
          fill="rgba(255,255,255,0.9)"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3, delay: 2.1 }}
        />
        <motion.circle 
          cx="60" cy="55" r="7" 
          fill="rgba(255,255,255,0.9)"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3, delay: 2.2 }}
        />
        <motion.circle 
          cx="35" cy="75" r="5" 
          fill="rgba(255,255,255,0.9)"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3, delay: 2.3 }}
        />
        <motion.circle 
          cx="85" cy="75" r="5" 
          fill="rgba(255,255,255,0.9)"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3, delay: 2.4 }}
        />
        
        {/* Activity pulse on main node */}
        <motion.circle 
          cx="60" cy="55" r="20" 
          fill="none" 
          stroke="#EC4899" 
          strokeWidth="1"
          animate={{ 
            scale: [1, 1.5, 1],
            opacity: [0.5, 0.1, 0.5]
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity,
            delay: 2.5 
          }}
        />
        
        {/* Data flow particles */}
        {[0, 1, 2].map((i) => (
          <motion.circle 
            key={i}
            cx="60" cy="55" r="2" 
            fill="#F59E0B"
            animate={{
              cx: [60, 40 + i * 20, 60],
              cy: [55, 35 + i * 20, 55],
              scale: [0, 1, 0]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              delay: 3 + i * 0.3 
            }}
          />
        ))}
      </svg>
    </motion.div>
  </div>
);

const DarkWebGraphic = () => (
  <div className="flex h-full w-full items-center justify-center overflow-hidden">
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="relative"
    >
      <svg
        width="120"
        height="100"
        viewBox="0 0 120 100"
        className="drop-shadow-lg"
        fill="none"
      >
        <defs>
          <linearGradient id="darkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#EF4444" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#B91C1C" stopOpacity="0.6" />
          </linearGradient>
          <filter id="darkGlow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Outer rotating ring */}
        <motion.circle 
          cx="60" cy="50" r="35" 
          fill="none" 
          stroke="url(#darkGrad)" 
          strokeWidth="2" 
          strokeDasharray="8,4"
          filter="url(#darkGlow)"
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Middle counter-rotating ring */}
        <motion.circle 
          cx="60" cy="50" r="25" 
          fill="none" 
          stroke="url(#darkGrad)" 
          strokeWidth="2" 
          strokeDasharray="6,3"
          animate={{ rotate: -360 }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Inner core */}
        <motion.circle 
          cx="60" cy="50" r="15" 
          fill="url(#darkGrad)" 
          filter="url(#darkGlow)"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        />
        
        {/* Threat indicators scattered around */}
        {[
          { x: 40, y: 30, delay: 1 },
          { x: 80, y: 35, delay: 1.2 },
          { x: 35, y: 65, delay: 1.4 },
          { x: 85, y: 70, delay: 1.6 },
          { x: 25, y: 50, delay: 1.8 },
          { x: 95, y: 50, delay: 2.0 }
        ].map((threat, i) => (
          <motion.circle 
            key={i}
            cx={threat.x} cy={threat.y} r="4" 
            fill="#EF4444"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: [0, 1.2, 1],
              opacity: [0, 1, 0.8]
            }}
            transition={{ duration: 0.5, delay: threat.delay }}
          />
        ))}
        
        {/* Warning symbol in center */}
        <motion.path 
          d="M57 42 L63 42 L63 52 L60 56 L57 52 Z" 
          fill="rgba(255,255,255,0.9)"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.4, delay: 2.2 }}
        />
        <motion.circle 
          cx="59" cy="46" r="1.5" 
          fill="#EF4444"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3, delay: 2.4 }}
        />
        <motion.circle 
          cx="61" cy="46" r="1.5" 
          fill="#EF4444"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3, delay: 2.6 }}
        />
        
        {/* Scanning waves */}
        <motion.circle 
          cx="60" cy="50" r="40" 
          fill="none" 
          stroke="#EF4444" 
          strokeWidth="1"
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.3, 0, 0.3]
          }}
          transition={{ 
            duration: 3, 
            repeat: Infinity,
            delay: 3 
          }}
        />
        
        {/* Data breach alerts */}
        {[0, 1, 2].map((i) => (
          <motion.rect 
            key={i}
            x={50 + i * 15} y={20 + i * 5} 
            width="8" height="3" 
            fill="#F59E0B"
            initial={{ opacity: 0, y: 30 + i * 5 }}
            animate={{ 
              opacity: [0, 1, 0],
              y: [30 + i * 5, 15 + i * 5, 10 + i * 5]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              delay: 3.5 + i * 0.3 
            }}
          />
        ))}
      </svg>
    </motion.div>
  </div>
);

const GovernmentGraphic = () => (
  <div className="flex h-full w-full items-center justify-center overflow-hidden">
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="relative"
    >
      <svg
        width="120"
        height="100"
        viewBox="0 0 120 100"
        className="drop-shadow-lg"
        fill="none"
      >
        <defs>
          <linearGradient id="govGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#D97706" stopOpacity="0.6" />
          </linearGradient>
          <filter id="govGlow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Government building base */}
        <motion.rect 
          x="30" y="55" width="60" height="30" 
          fill="url(#govGrad)" 
          filter="url(#govGlow)"
          initial={{ y: 100 }}
          animate={{ y: 55 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        />
        
        {/* Columns with staggered animation */}
        {[0, 1, 2, 3].map((i) => (
          <motion.rect 
            key={i}
            x={35 + i * 12} y="45" 
            width="8" height="40" 
            fill="rgba(255,255,255,0.7)"
            initial={{ height: 0, y: 85 }}
            animate={{ height: 40, y: 45 }}
            transition={{ duration: 0.6, delay: 1 + i * 0.1 }}
          />
        ))}
        
        {/* Triangular roof */}
        <motion.polygon 
          points="25,45 60,25 95,45" 
          fill="url(#govGrad)" 
          filter="url(#govGlow)"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6, delay: 1.5 }}
        />
        
        {/* Floating documents with complex animation */}
        <motion.g>
          <motion.rect 
            x="15" y="30" width="15" height="20" 
            fill="rgba(255,255,255,0.9)" 
            rx="2"
            animate={{ 
              y: [30, 25, 30],
              rotate: [0, 5, 0]
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity,
              delay: 2 
            }}
          />
          {/* Document lines */}
          {[0, 1, 2].map((i) => (
            <motion.line 
              key={i}
              x1="17" y1={35 + i * 4} 
              x2="27" y2={35 + i * 4} 
              stroke="#F59E0B" 
              strokeWidth="1"
              initial={{ x2: 17 }}
              animate={{ x2: 27 }}
              transition={{ duration: 0.5, delay: 2.5 + i * 0.1 }}
            />
          ))}
        </motion.g>
        
        <motion.g>
          <motion.rect 
            x="90" y="35" width="15" height="20" 
            fill="rgba(255,255,255,0.9)" 
            rx="2"
            animate={{ 
              y: [35, 30, 35],
              rotate: [0, -5, 0]
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity,
              delay: 2.5 
            }}
          />
          {/* Document lines */}
          {[0, 1, 2].map((i) => (
            <motion.line 
              key={i}
              x1="92" y1={40 + i * 4} 
              x2="102" y2={40 + i * 4} 
              stroke="#F59E0B" 
              strokeWidth="1"
              initial={{ x2: 92 }}
              animate={{ x2: 102 }}
              transition={{ duration: 0.5, delay: 3 + i * 0.1 }}
            />
          ))}
        </motion.g>
        
        {/* Digital data streams */}
        {[0, 1, 2].map((i) => (
          <motion.circle 
            key={i}
            cx="60" cy="35" r="2" 
            fill="#10B981"
            animate={{
              cx: [60, 22 + i * 35, 60],
              cy: [35, 40 + i * 5, 35],
              scale: [0, 1, 0],
              opacity: [0, 1, 0]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              delay: 3.5 + i * 0.4 
            }}
          />
        ))}
        
        {/* Security badge */}
        <motion.circle 
          cx="60" cy="70" r="8" 
          fill="#10B981"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.4, delay: 4 }}
        />
        <motion.path 
          d="M57 68 L59 70 L63 66" 
          stroke="white" 
          strokeWidth="2" 
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5, delay: 4.5 }}
        />
      </svg>
    </motion.div>
  </div>
);

export function OSINTToolsBento() {
  return (
    <section className="relative py-20 bg-black overflow-hidden" id="tools">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.05)_0%,transparent_50%)]"></div>
      
      <div className="relative z-10 px-4 mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-gray-900/50 text-white ring-gray-800 relative mx-auto mb-6 w-fit rounded-full rounded-bl-[2px] px-4 py-2 text-sm ring border border-gray-800/50 backdrop-blur-sm"
          >
            <span className="relative z-1 flex items-center gap-2">
              <Shield className="w-4 h-4 text-purple-400" />
              Intelligence Tools
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
            Professional
            <br />
            <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              OSINT Modules
            </span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-gray-300 mx-auto max-w-2xl text-center text-lg leading-relaxed"
          >
            Advanced intelligence gathering tools designed for security professionals, investigators, and researchers
          </motion.p>
        </div>

        {/* Bento Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <BentoGrid className="mx-auto md:auto-rows-[20rem]">
            <BentoGridItem
              className="md:col-span-2 hover:border-blue-500/30 group"
              title={
                <div className="flex items-center gap-2">
                  <Mail className="w-5 h-5 text-blue-400" />
                  Email Analysis
                </div>
              }
              description="Deep forensic analysis of email headers, metadata extraction, breach detection, and sender verification with advanced threat intelligence."
              header={<EmailAnalysisGraphic />}
              icon={
                <div className="flex items-center gap-2 mt-4">
                  <span className="text-xs bg-blue-500/20 text-blue-300 px-2 py-1 rounded-full">Active</span>
                  <ArrowRight className="w-4 h-4 text-blue-400 group-hover:translate-x-1 transition-transform" />
                </div>
              }
            />
            
            <BentoGridItem
              className="hover:border-purple-500/30 group"
              title={
                <div className="flex items-center gap-2">
                  <ImageIcon className="w-5 h-5 text-purple-400" />
                  Reverse Image
                </div>
              }
              description="Multi-engine reverse image search across Google, Yandex, Bing with metadata analysis and source tracking."
              header={<ImageSearchGraphic />}
              icon={
                <div className="flex items-center gap-2 mt-4">
                  <span className="text-xs bg-purple-500/20 text-purple-300 px-2 py-1 rounded-full">Active</span>
                  <ArrowRight className="w-4 h-4 text-purple-400 group-hover:translate-x-1 transition-transform" />
                </div>
              }
            />
            
            <BentoGridItem
              className="hover:border-green-500/30 group"
              title={
                <div className="flex items-center gap-2">
                  <Newspaper className="w-5 h-5 text-green-400" />
                  News Analysis
                </div>
              }
              description="Real-time news monitoring with AI-powered sentiment analysis and source credibility verification."
              header={<NewsAnalysisGraphic />}
              icon={
                <div className="flex items-center gap-2 mt-4">
                  <span className="text-xs bg-green-500/20 text-green-300 px-2 py-1 rounded-full">Active</span>
                  <ArrowRight className="w-4 h-4 text-green-400 group-hover:translate-x-1 transition-transform" />
                </div>
              }
            />
            
            <BentoGridItem
              className="md:col-span-2 hover:border-pink-500/30 group"
              title={
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-pink-400" />
                  Social Media Intelligence
                </div>
              }
              description="Comprehensive social media data collection from Facebook, Instagram, X, LinkedIn with profile analysis, network mapping, and content monitoring capabilities."
              header={<SocialMediaGraphic />}
              icon={
                <div className="flex items-center gap-2 mt-4">
                  <span className="text-xs bg-pink-500/20 text-pink-300 px-2 py-1 rounded-full">Active</span>
                  <ArrowRight className="w-4 h-4 text-pink-400 group-hover:translate-x-1 transition-transform" />
                </div>
              }
            />
            
            <BentoGridItem
              className="md:col-span-1 hover:border-red-500/30 group"
              title={
                <div className="flex items-center gap-2">
                  <Activity className="w-5 h-5 text-red-400" />
                  Dark Web Monitor
                </div>
              }
              description="Targeted scraping of dark web forums and marketplaces for threat intelligence and credential monitoring."
              header={<DarkWebGraphic />}
              icon={
                <div className="flex items-center gap-2 mt-4">
                  <span className="text-xs bg-red-500/20 text-red-300 px-2 py-1 rounded-full">Active</span>
                  <ArrowRight className="w-4 h-4 text-red-400 group-hover:translate-x-1 transition-transform" />
                </div>
              }
            />
            
            <BentoGridItem
              className="md:col-span-2 hover:border-yellow-500/30 group"
              title={
                <div className="flex items-center gap-2">
                  <Globe className="w-5 h-5 text-yellow-400" />
                  Government Records
                </div>
              }
              description="Access to public Indian government portals including VAHAN vehicle records, e-Courts case database, and official document retrieval systems."
              header={<GovernmentGraphic />}
              icon={
                <div className="flex items-center gap-2 mt-4">
                  <span className="text-xs bg-yellow-500/20 text-yellow-300 px-2 py-1 rounded-full">Active</span>
                  <ArrowRight className="w-4 h-4 text-yellow-400 group-hover:translate-x-1 transition-transform" />
                </div>
              }
            />
          </BentoGrid>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <OSINTButton
            variant="primary"
            size="md"
          >
            Access Intelligence Suite
          </OSINTButton>
        </motion.div>
      </div>
    </section>
  );
}
