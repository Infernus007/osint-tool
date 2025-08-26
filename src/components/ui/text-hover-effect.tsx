"use client";
import { useRef, useEffect, useState } from "react";
import { motion } from "motion/react";

export const TextHoverEffect = ({
  text,
  duration,
  automatic = false,
}: {
  text: string;
  duration?: number;
  automatic?: boolean;
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [maskPosition, setMaskPosition] = useState({ cx: "50%", cy: "50%" });
  const [isClient, setIsClient] = useState(false);
  
  // Generate unique IDs for this instance
  const uniqueId = useRef(Math.random().toString(36).substr(2, 9));
  const textGradientId = `textGradient-${uniqueId.current}`;
  const revealMaskId = `revealMask-${uniqueId.current}`;
  const textMaskId = `textMask-${uniqueId.current}`;

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (svgRef.current && cursor.x !== null && cursor.y !== null && !automatic) {
      const svgRect = svgRef.current.getBoundingClientRect();
      const cxPercentage = ((cursor.x - svgRect.left) / svgRect.width) * 100;
      const cyPercentage = ((cursor.y - svgRect.top) / svgRect.height) * 100;
      setMaskPosition({
        cx: `${cxPercentage}%`,
        cy: `${cyPercentage}%`,
      });
    }
  }, [cursor, automatic]);

  // Automatic animation effect
  useEffect(() => {
    if (automatic && isClient) {
      // Initial animation
      setHovered(true);
      
      const animatePosition = () => {
        const time = Date.now() * 0.001; // Convert to seconds
        const x = 50 + 30 * Math.sin(time * 0.5);
        const y = 50 + 20 * Math.cos(time * 0.3);
        setMaskPosition({
          cx: `${x}%`,
          cy: `${y}%`,
        });
      };

      const interval = setInterval(animatePosition, 50); // Smooth animation
      
      return () => clearInterval(interval);
    }
  }, [automatic, isClient]);

  if (!isClient) {
    return (
      <div className="w-full h-full flex items-center justify-start">
        <span className="text-4xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-white/70 via-white to-slate-500/80 bg-clip-text text-transparent">
          {text}
        </span>
      </div>
    );
  }

  return (
    <div className="w-full h-full relative overflow-hidden flex items-center">
      <svg
        ref={svgRef}
        width="100%"
        height="100%"
        viewBox="0 0 800 200"
        xmlns="http://www.w3.org/2000/svg"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onMouseMove={(e) => !automatic && setCursor({ x: e.clientX, y: e.clientY })}
        className="select-none"
        preserveAspectRatio="xMinYMid meet"
      >
        <defs>
          <linearGradient
            id={textGradientId}
            gradientUnits="userSpaceOnUse"
            cx="50%"
            cy="50%"
            r="25%"
          >
            <stop offset="0%" stopColor="#eab308" />
            <stop offset="25%" stopColor="#ef4444" />
            <stop offset="50%" stopColor="#3b82f6" />
            <stop offset="75%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>

          <motion.radialGradient
            id={revealMaskId}
            gradientUnits="userSpaceOnUse"
            r="30%"
            animate={maskPosition}
            transition={{ duration: duration ?? 0.3, ease: "easeOut" }}
          >
            <stop offset="0%" stopColor="white" />
            <stop offset="100%" stopColor="black" />
          </motion.radialGradient>
          
          <mask id={textMaskId}>
            <rect
              x="0"
              y="0"
              width="100%"
              height="100%"
              fill={`url(#${revealMaskId})`}
            />
          </mask>
        </defs>
        
        {/* Background stroke text */}
        <text
          x="0"
          y="50%"
          textAnchor="start"
          dominantBaseline="middle"
          strokeWidth="2"
          className="fill-transparent stroke-neutral-300/20 font-bold text-[70px] md:text-[90px] lg:text-[110px]"
          style={{ opacity: automatic || hovered ? 0.3 : 0 }}
        >
          {text}
        </text>
        
        {/* Animated stroke text */}
        <motion.text
          x="0"
          y="50%"
          textAnchor="start"
          dominantBaseline="middle"
          strokeWidth="1"
          className="fill-transparent stroke-neutral-400/40 font-bold text-[70px] md:text-[90px] lg:text-[110px]"
          initial={{ strokeDashoffset: 2000, strokeDasharray: 2000 }}
          animate={{
            strokeDashoffset: 0,
            strokeDasharray: 2000,
          }}
          transition={{
            duration: 4,
            ease: "easeInOut",
          }}
        >
          {text}
        </motion.text>
        
        {/* Gradient masked text */}
        <text
          x="0"
          y="50%"
          textAnchor="start"
          dominantBaseline="middle"
          stroke={`url(#${textGradientId})`}
          strokeWidth="2"
          mask={`url(#${textMaskId})`}
          className="fill-transparent font-bold text-[70px] md:text-[90px] lg:text-[110px]"
        >
          {text}
        </text>
      </svg>
    </div>
  );
};
