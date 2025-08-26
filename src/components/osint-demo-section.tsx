import { motion } from "motion/react";
import { useState } from "react";
import { 
  Play, 
  Mail, 
  Image as ImageIcon, 
  Newspaper, 
  Users, 
  Shield, 
  Globe,
  ArrowRight,
  Search,
  CheckCircle,
  Activity,
  Database,
  Eye,
  Zap
} from "lucide-react";
import { cn } from "@/lib/utils";
import { OSINTButton } from "@/components/ui/osint-button";

// Color mapping for consistent styling
const colorMap = {
  blue: 'text-blue-400',
  purple: 'text-purple-400',
  red: 'text-red-400',
  green: 'text-green-400',
  orange: 'text-orange-400',
  cyan: 'text-cyan-400'
} as const;

interface DemoExample {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: keyof typeof colorMap;
  gradient: string;
  mockData: {
    input: string;
    results: Array<{
      label: string;
      value: string;
      status?: 'found' | 'clean' | 'warning' | 'error';
    }>;
    processing?: boolean;
  };
}

const demoExamples: DemoExample[] = [
  {
    id: 'email',
    title: 'Email Analysis',
    description: 'Analyze email addresses for breach exposure and domain intelligence',
    icon: Mail,
    color: 'blue',
    gradient: 'from-blue-500/20 to-blue-600/10',
    mockData: {
      input: 'example@company.com',
      results: [
        { label: 'Breach Status', value: '2 breaches found', status: 'warning' },
        { label: 'Domain Age', value: '8 years', status: 'found' },
        { label: 'MX Records', value: 'Valid', status: 'found' },
        { label: 'Social Profiles', value: '3 profiles linked', status: 'found' }
      ]
    }
  },
  {
    id: 'social',
    title: 'Social Media',
    description: 'Discover social media profiles and analyze public information',
    icon: Users,
    color: 'purple',
    gradient: 'from-purple-500/20 to-purple-600/10',
    mockData: {
      input: '+1234567890',
      results: [
        { label: 'Facebook', value: 'Profile found', status: 'found' },
        { label: 'Instagram', value: 'No public profile', status: 'clean' },
        { label: 'LinkedIn', value: 'Business profile', status: 'found' },
        { label: 'Twitter/X', value: 'Account suspended', status: 'warning' }
      ]
    }
  },
  {
    id: 'darkweb',
    title: 'Dark Web Monitor',
    description: 'Monitor dark web forums and marketplaces for threats',
    icon: Shield,
    color: 'red',
    gradient: 'from-red-500/20 to-red-600/10',
    mockData: {
      input: 'company-credentials',
      results: [
        { label: 'Forums Scanned', value: '47 markets', status: 'found' },
        { label: 'Mentions Found', value: '3 recent posts', status: 'warning' },
        { label: 'Credential Leaks', value: 'None detected', status: 'clean' },
        { label: 'Threat Level', value: 'Medium', status: 'warning' }
      ]
    }
  },
  {
    id: 'government',
    title: 'Government Records',
    description: 'Access public records from Indian government databases',
    icon: Globe,
    color: 'green',
    gradient: 'from-green-500/20 to-green-600/10',
    mockData: {
      input: 'DL1234567890123',
      results: [
        { label: 'VAHAN Record', value: 'Vehicle found', status: 'found' },
        { label: 'Registration Date', value: '15-Mar-2020', status: 'found' },
        { label: 'Owner Details', value: 'Available', status: 'found' },
        { label: 'Compliance Status', value: 'Active', status: 'found' }
      ]
    }
  },
  {
    id: 'image',
    title: 'Reverse Image Search',
    description: 'Find image sources and detect manipulations across the web',
    icon: ImageIcon,
    color: 'orange',
    gradient: 'from-orange-500/20 to-orange-600/10',
    mockData: {
      input: 'suspicious-image.jpg',
      results: [
        { label: 'Original Source', value: 'Getty Images 2019', status: 'found' },
        { label: 'Duplicates Found', value: '23 websites', status: 'found' },
        { label: 'Modification', value: 'Digital watermark removed', status: 'warning' },
        { label: 'First Seen', value: '2 years ago', status: 'found' }
      ]
    }
  },
  {
    id: 'news',
    title: 'News Analysis',
    description: 'Monitor news articles and extract key intelligence',
    icon: Newspaper,
    color: 'cyan',
    gradient: 'from-cyan-500/20 to-cyan-600/10',
    mockData: {
      input: 'cybersecurity breach 2024',
      results: [
        { label: 'Articles Found', value: '156 articles', status: 'found' },
        { label: 'Sentiment Score', value: '-0.65 (Negative)', status: 'warning' },
        { label: 'Key Entities', value: '12 companies', status: 'found' },
        { label: 'Trending Topics', value: 'Data breach, AI security', status: 'found' }
      ]
    }
  }
];

const StatusIcon = ({ status }: { status?: string }) => {
  switch (status) {
    case 'found':
      return <CheckCircle className="w-4 h-4 text-green-400" />;
    case 'warning':
      return <Activity className="w-4 h-4 text-yellow-400" />;
    case 'error':
      return <Shield className="w-4 h-4 text-red-400" />;
    case 'clean':
      return <CheckCircle className="w-4 h-4 text-blue-400" />;
    default:
      return <Database className="w-4 h-4 text-gray-400" />;
  }
};

const DemoCard = ({ demo, isActive, onClick }: { 
  demo: DemoExample; 
  isActive: boolean; 
  onClick: () => void; 
}) => {
  const IconComponent = demo.icon;
  
  return (
    <motion.div
      className={cn(
        "relative p-6 rounded-xl border transition-all duration-300 cursor-pointer group",
        isActive 
          ? "border-purple-500/50 bg-gray-900/80 shadow-lg shadow-purple-500/20" 
          : "border-gray-800/50 bg-gray-900/30 hover:border-gray-700/50 hover:bg-gray-900/50"
      )}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className={cn(
          "p-3 rounded-lg bg-gradient-to-br",
          demo.gradient
        )}>
          <IconComponent className="w-6 h-6 text-purple-400" />
        </div>
        {isActive && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="p-1 rounded-full bg-purple-500/20"
          >
            <Play className="w-4 h-4 text-purple-400 fill-current" />
          </motion.div>
        )}
      </div>
      
      <h3 className="text-white font-semibold text-lg mb-2">{demo.title}</h3>
      <p className="text-gray-400 text-sm leading-relaxed mb-4">{demo.description}</p>
      
      <div className="flex items-center gap-2 text-sm">
        <Eye className="w-4 h-4 text-purple-400" />
        <span className="text-purple-400">
          {isActive ? 'Running Demo' : 'Click to Demo'}
        </span>
        <ArrowRight className={cn(
          "w-4 h-4 transition-transform",
          isActive ? "text-purple-400 translate-x-1" : "text-gray-500 group-hover:translate-x-1"
        )} />
      </div>
    </motion.div>
  );
};

const DemoResults = ({ demo }: { demo: DemoExample }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  
  return (
    <div className="space-y-6">
      {/* Input Section */}
      <div className="p-6 rounded-xl bg-gray-900/50 border border-gray-800/50">
        <div className="flex items-center gap-3 mb-4">
          <Search className="w-5 h-5 text-purple-400" />
          <h4 className="text-white font-medium">Input</h4>
        </div>
        <div className="p-3 rounded-lg bg-gray-800/50 border border-gray-700/50">
          <code className="text-green-400 font-mono text-sm">{demo.mockData.input}</code>
        </div>
      </div>

      {/* Processing Animation */}
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: isProcessing ? 1 : 0, height: isProcessing ? 'auto' : 0 }}
        className="overflow-hidden"
      >
        <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
          <div className="flex items-center gap-3">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <Zap className="w-5 h-5 text-blue-400" />
            </motion.div>
            <span className="text-blue-400 font-medium">Processing investigation...</span>
          </div>
        </div>
      </motion.div>

      {/* Results Section */}
      <div className="p-6 rounded-xl bg-gray-900/50 border border-gray-800/50">
        <div className="flex items-center gap-3 mb-4">
          <Database className="w-5 h-5 text-purple-400" />
          <h4 className="text-white font-medium">Results</h4>
          <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full">
            Live Demo
          </span>
        </div>
        
        <div className="space-y-3">
          {demo.mockData.results.map((result, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between p-3 rounded-lg bg-gray-800/50 border border-gray-700/30"
            >
              <div className="flex items-center gap-3">
                <StatusIcon status={result.status} />
                <span className="text-gray-300 font-medium">{result.label}</span>
              </div>
              <span className={cn(
                "text-sm font-mono",
                result.status === 'found' && "text-green-400",
                result.status === 'warning' && "text-yellow-400",
                result.status === 'error' && "text-red-400",
                result.status === 'clean' && "text-blue-400",
                !result.status && "text-gray-400"
              )}>
                {result.value}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Action Button */}
      <OSINTButton
        variant="primary"
        size="md"
        className="w-full"
        onClick={() => {
          setIsProcessing(true);
          setTimeout(() => setIsProcessing(false), 3000);
        }}
      >
        Run Full Investigation
      </OSINTButton>
    </div>
  );
};

export default function OSINTDemoSection() {
  const [activeDemo, setActiveDemo] = useState<string>(demoExamples[0].id);
  
  const activeDemoData = demoExamples.find(demo => demo.id === activeDemo) || demoExamples[0];
  const ActiveIcon = activeDemoData.icon;

  return (
    <section className="relative py-24 bg-black overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 h-64 w-64 rounded-full bg-purple-600/10 blur-[100px]"></div>
        <div className="absolute bottom-1/4 right-1/4 h-64 w-64 rounded-full bg-blue-600/10 blur-[100px]"></div>
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="h-full w-full bg-[linear-gradient(to_right,rgba(139,92,246,0.3)_1px,transparent_1px),linear-gradient(to_bottom,rgba(139,92,246,0.2)_1px,transparent_1px)] bg-[size:3rem_3rem]"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Activity className="w-6 h-6 text-purple-400" />
            <span className="text-purple-400 font-medium">Live Demonstrations</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            See OSINT Tools in{" "}
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Action
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Explore interactive demonstrations of our investigation capabilities. 
            Each tool provides real-time intelligence gathering and analysis.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Demo Cards */}
          <div className="lg:col-span-1 space-y-4">
            {demoExamples.map((demo, index) => (
              <motion.div
                key={demo.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <DemoCard
                  demo={demo}
                  isActive={activeDemo === demo.id}
                  onClick={() => setActiveDemo(demo.id)}
                />
              </motion.div>
            ))}
          </div>

          {/* Demo Results */}
          <div className="lg:col-span-2">
            <motion.div
              key={activeDemo}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="sticky top-8"
            >
              <div className="p-8 rounded-2xl bg-gray-900/30 border border-gray-800/50 backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className={cn(
                    "p-3 rounded-lg bg-gradient-to-br",
                    activeDemoData.gradient
                  )}>
                    <ActiveIcon className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">{activeDemoData.title}</h3>
                    <p className="text-gray-400">{activeDemoData.description}</p>
                  </div>
                </div>
                
                <DemoResults demo={activeDemoData} />
              </div>
            </motion.div>
          </div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16 p-8 rounded-2xl bg-gradient-to-r from-purple-900/30 to-blue-900/30 border border-purple-500/20"
        >
          <h3 className="text-2xl font-bold text-white mb-4">
            Ready to Start Your Investigation?
          </h3>
          <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
            Access the full suite of OSINT tools with advanced features, 
            real-time monitoring, and comprehensive reporting capabilities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <OSINTButton
              variant="primary"
              size="md"
            >
              Start Free Trial
            </OSINTButton>
            <OSINTButton
              variant="outline"
              size="md"
            >
              View Pricing
            </OSINTButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
