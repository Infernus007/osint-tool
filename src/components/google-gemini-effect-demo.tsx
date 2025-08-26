"use client";
import { useScroll, useTransform } from "motion/react";
import React from "react";
import { GoogleGeminiEffect } from "./ui/google-gemini-effect";

export function GoogleGeminiEffectDemo() {
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Optimized timing for bright glowing beam effect that starts after hero and finishes before features
  // The beam should be fully visible during the scroll but not throughout the entire page
  const pathLengthFirst = useTransform(scrollYProgress, [0.2, 0.7], [0, 1.3]);
  const pathLengthSecond = useTransform(scrollYProgress, [0.25, 0.75], [0, 1.3]);
  const pathLengthThird = useTransform(scrollYProgress, [0.3, 0.8], [0, 1.3]);
  const pathLengthFourth = useTransform(scrollYProgress, [0.35, 0.85], [0, 1.3]);
  const pathLengthFifth = useTransform(scrollYProgress, [0.4, 0.9], [0, 1.3]);

  return (
    <div
      className="h-[300vh] bg-gradient-to-b from-black via-slate-900 to-black w-full relative overflow-hidden"
      ref={ref}
    >
      {/* Hero Content Section */}
      <div className="h-screen flex items-center justify-center relative z-20">
        <div className="text-center px-4">
          <h1 className="text-5xl md:text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-200 to-cyan-200 mb-6">
            Intelligence Platform
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 max-w-4xl mx-auto leading-relaxed">
            Experience next-generation OSINT capabilities with our advanced intelligence gathering platform
          </p>
        </div>
      </div>

      {/* Glowing Beam Effect Section */}
      <div className="h-screen relative">
        <GoogleGeminiEffect
          pathLengths={[
            pathLengthFirst,
            pathLengthSecond,
            pathLengthThird,
            pathLengthFourth,
            pathLengthFifth,
          ]}
          title="Advanced OSINT"
          description="Unlock the power of intelligence gathering with our cutting-edge platform designed for professionals"
          className="sticky top-0"
        />
      </div>

      {/* Features Content Section */}
      <div className="h-screen flex items-center justify-center relative z-20 bg-gradient-to-b from-transparent via-slate-900/80 to-black">
        <div className="text-center px-4">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-8">
            Discover Our Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-slate-800/50 p-6 rounded-lg border border-blue-500/20">
              <h3 className="text-xl font-semibold text-blue-400 mb-4">Social Intelligence</h3>
              <p className="text-slate-300">Advanced social media monitoring and analysis</p>
            </div>
            <div className="bg-slate-800/50 p-6 rounded-lg border border-purple-500/20">
              <h3 className="text-xl font-semibold text-purple-400 mb-4">Dark Web Scanning</h3>
              <p className="text-slate-300">Deep web intelligence and threat detection</p>
            </div>
            <div className="bg-slate-800/50 p-6 rounded-lg border border-cyan-500/20">
              <h3 className="text-xl font-semibold text-cyan-400 mb-4">Real-time Analytics</h3>
              <p className="text-slate-300">Instant intelligence processing and reporting</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
