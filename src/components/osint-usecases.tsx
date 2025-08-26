"use client";
import { motion } from "motion/react";
import {
  Shield,
  Search,
  FileText,
  BarChart3,
  Target,
  Eye,
  CheckCircle,
  TrendingUp,
  Users,
  Database,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { OSINTButton } from '@/components/ui/osint-button';

// Define the use case item type
type UseCaseItem = {
  title: string;
  description: string;
  applications: string[];
  icon: LucideIcon;
  color: string;
  bgGradient: string;
};

// Use cases data with icons and colors
const useCases: UseCaseItem[] = [
  {
    title: "Cybersecurity Teams",
    description: "Threat intelligence and incident response",
    applications: ["Threat Hunting", "IOC Analysis", "Attribution"],
    icon: Shield,
    color: "text-red-400",
    bgGradient: "from-red-500/10 to-red-600/5"
  },
  {
    title: "Investigators", 
    description: "Digital forensics and evidence gathering",
    applications: ["Background Checks", "Asset Discovery", "Timeline Analysis"],
    icon: Search,
    color: "text-blue-400",
    bgGradient: "from-blue-500/10 to-blue-600/5"
  },
  {
    title: "Journalists",
    description: "Source verification and fact-checking",
    applications: ["Source Validation", "Story Research", "Content Verification"],
    icon: FileText,
    color: "text-green-400",
    bgGradient: "from-green-500/10 to-green-600/5"
  },
  {
    title: "Researchers",
    description: "Academic and market research",
    applications: ["Trend Analysis", "Social Research", "Data Mining"],
    icon: BarChart3,
    color: "text-purple-400",
    bgGradient: "from-purple-500/10 to-purple-600/5"
  }
];

// Application icons mapping
const applicationIcons: Record<string, LucideIcon> = {
  "Threat Hunting": Target,
  "IOC Analysis": Eye,
  "Attribution": Shield,
  "Background Checks": Search,
  "Asset Discovery": Database,
  "Timeline Analysis": TrendingUp,
  "Source Validation": CheckCircle,
  "Story Research": FileText,
  "Content Verification": CheckCircle,
  "Trend Analysis": TrendingUp,
  "Social Research": Users,
  "Data Mining": Database,
};

// UseCase card component
const UseCaseCard = ({ useCase, index }: { useCase: UseCaseItem; index: number }) => {
  const Icon = useCase.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      className="h-full"
    >
      <div
        className={cn(
          'relative h-full rounded-2xl p-6 text-sm',
          'bg-gray-900/50 ring-gray-800 ring border border-gray-800/50 backdrop-blur-sm',
          'hover:bg-gray-900/70 transition-all duration-300',
          'bg-gradient-to-br', useCase.bgGradient
        )}
      >
        {/* Icon */}
        <div className={cn("mb-4 text-[2.5rem]", useCase.color)}>
          <Icon />
        </div>

        {/* Title */}
        <h3 className="text-white mb-3 text-xl font-bold">{useCase.title}</h3>
        
        {/* Description */}
        <p className="text-gray-300 text-base mb-6 leading-relaxed">
          {useCase.description}
        </p>
        
        {/* Applications */}
        <div className="space-y-3">
          <h4 className="text-gray-200 text-sm font-semibold uppercase tracking-wide">
            Key Applications
          </h4>
          {useCase.applications.map((application, appIndex) => {
            const AppIcon = applicationIcons[application] || Target;
            return (
              <motion.div 
                key={appIndex} 
                className="flex items-center gap-3 group"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: (index * 0.1) + (appIndex * 0.05) }}
                viewport={{ once: true }}
              >
                <div className={cn(
                  "w-5 h-5 transition-colors duration-200",
                  useCase.color,
                  "group-hover:scale-110"
                )}>
                  <AppIcon className="w-full h-full" />
                </div>
                <span className="text-gray-300 group-hover:text-white transition-colors duration-200">
                  {application}
                </span>
              </motion.div>
            );
          })}
        </div>
        
        {/* Decorative elements */}
        <span className={cn(
          "absolute -bottom-px left-1/2 h-px w-3/4 -translate-x-1/2 bg-gradient-to-r opacity-60",
          `from-${useCase.color.split('-')[1]}-500/0 via-${useCase.color.split('-')[1]}-500 to-${useCase.color.split('-')[1]}-500/0`
        )}></span>
        <span className="absolute inset-0 bg-[radial-gradient(30%_8%_at_50%_100%,rgba(139,92,246,0.1)_0%,transparent_100%)] opacity-40"></span>
      </div>
    </motion.div>
  );
};

export default function OSINTUseCases() {
  return (
    <section className="bg-black py-20 relative overflow-hidden" id="usecases">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.05)_0%,transparent_50%)]"></div>
      
      <div className="mx-6 max-w-7xl relative z-10 max-[300px]:mx-4 min-[1400px]:mx-auto">
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
              <Users className="w-4 h-4 text-purple-400" />
              Use Cases
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
            Empowering
            <br />
            <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Every Professional
            </span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-gray-300 mx-auto max-w-2xl text-center text-lg leading-relaxed"
          >
            Our OSINT platform serves diverse professionals across industries, providing specialized tools and insights for their unique intelligence gathering needs.
          </motion.p>
        </div>

        {/* Use Cases Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {useCases.map((useCase, index) => (
            <UseCaseCard 
              key={`usecase-${index}`} 
              useCase={useCase} 
              index={index}
            />
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <OSINTButton variant="primary" size="md" icon={Search}>
            Discover Your Use Case
          </OSINTButton>
        </motion.div>
      </div>
    </section>
  );
}
