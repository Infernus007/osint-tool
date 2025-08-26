"use client";
import { useScroll, useTransform } from "motion/react";
import React from "react";
import { motion } from "motion/react";
import {
  Mail,
  Users,
  Newspaper,
  Image as ImageIcon,
  Shield,
  Search,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { GoogleGeminiEffect } from '@/components/ui/google-gemini-effect';

// Define the feature item type
type FeatureItem = {
  icon: LucideIcon;
  title: string;
  description: string;
  capabilities: string[];
  position?: 'left' | 'right';
  cornerStyle?: string;
};

// Create feature data arrays for left and right columns
const leftFeatures: FeatureItem[] = [
  {
    icon: Mail,
    title: 'Email Analysis',
    description: 'Deep email intelligence and metadata extraction',
    capabilities: ['Header Analysis', 'Threat Detection', 'Sender Verification'],
    position: 'left',
    cornerStyle: 'sm:translate-x-4 sm:rounded-br-[2px]',
  },
  {
    icon: Users,
    title: 'Social Media Intelligence',
    description: 'Comprehensive social media data collection and analysis',
    capabilities: ['Profile Analysis', 'Network Mapping', 'Content Monitoring'],
    position: 'left',
    cornerStyle: 'sm:-translate-x-4 sm:rounded-br-[2px]',
  },
];

const rightFeatures: FeatureItem[] = [
  {
    icon: Newspaper,
    title: 'News Analysis',
    description: 'Real-time news monitoring and sentiment analysis',
    capabilities: ['Source Verification', 'Trend Analysis', 'Fact Checking'],
    position: 'right',
    cornerStyle: 'sm:-translate-x-4 sm:rounded-bl-[2px]',
  },
  {
    icon: ImageIcon,
    title: 'Reverse Image Search',
    description: 'Advanced image intelligence and reverse lookup',
    capabilities: ['Source Tracking', 'Duplicate Detection', 'Metadata Analysis'],
    position: 'right',
    cornerStyle: 'sm:translate-x-4 sm:rounded-bl-[2px]',
  },
];

// Feature card component
const FeatureCard = ({ feature }: { feature: FeatureItem }) => {
  const Icon = feature.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      viewport={{ once: true }}
    >
      <div
        className={cn(
          'relative rounded-2xl px-6 pt-6 pb-6 text-sm',
          'bg-gray-900/50 ring-gray-800 ring border border-gray-800/50 backdrop-blur-sm',
          'hover:bg-gray-900/70 transition-all duration-300',
          feature.cornerStyle,
        )}
      >
        <div className="text-purple-400 mb-4 text-[2rem]">
          <Icon />
        </div>
        <h3 className="text-white mb-3 text-xl font-semibold">{feature.title}</h3>
        <p className="text-gray-300 text-base text-pretty mb-4">
          {feature.description}
        </p>
        
        {/* Capabilities */}
        <div className="space-y-2">
          {feature.capabilities.map((capability, index) => (
            <div key={index} className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-purple-400"></div>
              <span className="text-gray-400 text-sm">{capability}</span>
            </div>
          ))}
        </div>
        
        {/* Decorative elements */}
        <span className="from-purple-500/0 via-purple-500 to-purple-500/0 absolute -bottom-px left-1/2 h-px w-1/2 -translate-x-1/2 bg-gradient-to-r opacity-60"></span>
        <span className="absolute inset-0 bg-[radial-gradient(30%_5%_at_50%_100%,rgba(139,92,246,0.15)_0%,transparent_100%)] opacity-60"></span>
      </div>
    </motion.div>
  );
};

export default function OSINTFeatures() {
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Enhanced path length transforms with proper timing for sticky effect
  const pathLengthFirst = useTransform(scrollYProgress, [0, 0.4], [0, 1]);
  const pathLengthSecond = useTransform(scrollYProgress, [0.1, 0.5], [0, 1]);
  const pathLengthThird = useTransform(scrollYProgress, [0.2, 0.6], [0, 1]);
  const pathLengthFourth = useTransform(scrollYProgress, [0.3, 0.7], [0, 1]);
  const pathLengthFifth = useTransform(scrollYProgress, [0.4, 0.8], [0, 1]);

  return (
    <div className="relative bg-black" ref={ref}>
      {/* Sticky Gemini Effect Background */}
      <GoogleGeminiEffect
        pathLengths={[
          pathLengthFirst,
          pathLengthSecond,
          pathLengthThird,
          pathLengthFourth,
          pathLengthFifth,
        ]}
        title="OSINT Intelligence"
        description="Advanced intelligence gathering powered by cutting-edge technology"
        className="sticky top-0 z-10"
      />
      
      {/* Content that scrolls over the sticky background */}
      <div className="relative z-20">
        {/* Spacer to allow background to show before content */}
        <div className="h-screen" />
        
        {/* Features Content */}
        <section className="bg-black pt-20 pb-20" id="features">
          <div className="mx-6 max-w-[1120px] pt-2 pb-16 max-[300px]:mx-4 min-[1150px]:mx-auto">
            <div className="flex flex-col-reverse gap-8 md:grid md:grid-cols-3">
              {/* Left column */}
              <div className="flex flex-col gap-8">
                {leftFeatures.map((feature, index) => (
                  <FeatureCard key={`left-feature-${index}`} feature={feature} />
                ))}
              </div>
              
              {/* Center column */}
              <div className="order-[1] mb-8 self-center sm:order-[0] md:mb-0">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  viewport={{ once: true }}
                  className="bg-gray-900/50 text-white ring-gray-800 relative mx-auto mb-6 w-fit rounded-full rounded-bl-[2px] px-4 py-2 text-sm ring border border-gray-800/50 backdrop-blur-sm"
                >
                  <span className="relative z-1 flex items-center gap-2">
                    <Shield className="w-4 h-4 text-purple-400" />
                    OSINT Features
                  </span>
                  <span className="from-purple-500/0 via-purple-500 to-purple-500/0 absolute -bottom-px left-1/2 h-px w-2/5 -translate-x-1/2 bg-gradient-to-r"></span>
                  <span className="absolute inset-0 bg-[radial-gradient(30%_40%_at_50%_100%,rgba(139,92,246,0.25)_0%,transparent_100%)]"></span>
                </motion.div>
      
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="text-white mb-4 text-center text-3xl sm:mb-4 md:text-[2.5rem] font-bold leading-tight"
                >
                  Intelligence
                  <br />
                  <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                    Gathering Suite
                  </span>
                </motion.h2>
      
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  viewport={{ once: true }}
                  className="text-gray-300 mx-auto max-w-[20rem] text-center text-pretty"
                >
                  Comprehensive OSINT tools designed for security professionals, investigators, and researchers
                </motion.p>
      
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  viewport={{ once: true }}
                  className="mt-6 flex justify-center"
                >
                  <button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-3 rounded-full font-medium transition-all duration-300 flex items-center gap-2">
                    <Search className="w-4 h-4" />
                    Explore Tools
                  </button>
                </motion.div>
              </div>
              
              {/* Right column */}
              <div className="flex flex-col gap-8">
                {rightFeatures.map((feature, index) => (
                  <FeatureCard key={`right-feature-${index}`} feature={feature} />
                ))}
              </div>
            </div>
          </div>
        </section>
        
        {/* Additional content to demonstrate the effect */}
        <section className="bg-black py-20">
          <div className="mx-6 max-w-[1120px] max-[300px]:mx-4 min-[1150px]:mx-auto">
            <div className="text-center text-gray-300">
              <p className="text-lg">Content continues to flow naturally below the sticky background effect.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
