"use client";

import { motion } from "motion/react";
import { 
  Shield, 
  Mail, 
  Github, 
  Twitter, 
  Linkedin,
  Globe,
  ArrowUp,
  Eye,
  Database,
  Search,
  Users,
  Newspaper,
  Image as ImageIcon
} from "lucide-react";

export function AnimatedFooter() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  const footerLinks = {
    services: [
      { name: "Email Analysis", href: "/services/email", icon: Mail },
      { name: "Image Search", href: "/services/image", icon: ImageIcon },
      { name: "News Analysis", href: "/services/news", icon: Newspaper },
      { name: "Social Media", href: "/services/social", icon: Users },
      { name: "Dark Web Monitor", href: "/services/darkweb", icon: Eye },
      { name: "Government Records", href: "/services/government", icon: Database }
    ],
    company: [
      { name: "About Us", href: "/about" },
      { name: "Documentation", href: "/docs" },
      { name: "API Reference", href: "/api" },
      { name: "Case Studies", href: "/cases" },
      { name: "Security", href: "/security" },
      { name: "Privacy Policy", href: "/privacy" }
    ],
    support: [
      { name: "Help Center", href: "/help" },
      { name: "Contact Support", href: "/support" },
      { name: "Training", href: "/training" },
      { name: "Enterprise", href: "/enterprise" },
      { name: "Status", href: "/status" },
      { name: "Community", href: "/community" }
    ]
  };

  const socialLinks = [
    { name: "GitHub", href: "#", icon: Github, color: "hover:text-gray-400" },
    { name: "Twitter", href: "#", icon: Twitter, color: "hover:text-blue-400" },
    { name: "LinkedIn", href: "#", icon: Linkedin, color: "hover:text-blue-600" },
    { name: "Website", href: "#", icon: Globe, color: "hover:text-green-400" }
  ];

  return (
    <footer className="relative bg-black border-t border-gray-800/50 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="h-full w-full bg-[linear-gradient(to_right,rgba(139,92,246,0.3)_1px,transparent_1px),linear-gradient(to_bottom,rgba(139,92,246,0.2)_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
        </div>
        
        {/* Floating data streams */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-full w-px bg-gradient-to-b from-transparent via-purple-400/20 to-transparent"
            style={{ left: `${15 + i * 15}%` }}
            animate={{
              opacity: [0.2, 0.8, 0.2],
              scaleY: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          />
        ))}
        
        {/* Glowing orbs */}
        <motion.div 
          className="absolute top-20 left-1/4 h-32 w-32 rounded-full bg-purple-600/10 blur-[60px]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div 
          className="absolute bottom-20 right-1/3 h-24 w-24 rounded-full bg-blue-500/10 blur-[50px]"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.5, 0.2]
          }}
          transition={{ duration: 5, repeat: Infinity, delay: 1 }}
        />
      </div>

      <div className="relative z-10 px-4 mx-auto max-w-7xl">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {/* Brand Section */}
            <motion.div 
              className="lg:col-span-2"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-6">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.8 }}
                  className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center"
                >
                  <Shield className="w-6 h-6 text-white" />
                </motion.div>
                <div>
                  <h3 className="text-xl font-bold text-white">Aegis OSINT</h3>
                  <p className="text-gray-400 text-sm">Intelligence Platform</p>
                </div>
              </div>
              
              <p className="text-gray-300 text-sm leading-relaxed mb-6 max-w-md">
                Advanced Open Source Intelligence gathering platform designed for security professionals, 
                investigators, and researchers worldwide.
              </p>
              
              {/* Social Links */}
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.1, y: -2 }}
                    className={`w-10 h-10 bg-gray-800/50 hover:bg-gray-700/50 rounded-lg flex items-center justify-center text-gray-400 transition-all duration-300 ${social.color}`}
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Services Links */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h4 className="text-white font-semibold mb-6 flex items-center gap-2">
                <Search className="w-4 h-4 text-purple-400" />
                Services
              </h4>
              <ul className="space-y-3">
                {footerLinks.services.map((link, index) => (
                  <motion.li 
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 + index * 0.05 }}
                    viewport={{ once: true }}
                  >
                    <a 
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors duration-300 text-sm flex items-center gap-2 group"
                    >
                      <link.icon className="w-3 h-3 text-purple-400/60 group-hover:text-purple-400 transition-colors" />
                      <span className="group-hover:translate-x-1 transition-transform duration-200">
                        {link.name}
                      </span>
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Company Links */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h4 className="text-white font-semibold mb-6">Company</h4>
              <ul className="space-y-3">
                {footerLinks.company.map((link, index) => (
                  <motion.li 
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.4 + index * 0.05 }}
                    viewport={{ once: true }}
                  >
                    <a 
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-all duration-300 text-sm hover:translate-x-1 inline-block transform"
                    >
                      {link.name}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Support Links */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <h4 className="text-white font-semibold mb-6">Support</h4>
              <ul className="space-y-3">
                {footerLinks.support.map((link, index) => (
                  <motion.li 
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.5 + index * 0.05 }}
                    viewport={{ once: true }}
                  >
                    <a 
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-all duration-300 text-sm hover:translate-x-1 inline-block transform"
                    >
                      {link.name}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>

        {/* Bottom Section */}
        <motion.div 
          className="border-t border-gray-800/50 py-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-400 text-sm">
              © {currentYear} Aegis OSINT. All rights reserved. Built for intelligence professionals.
            </div>
            
            <div className="flex items-center gap-6">
              <a href="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">
                Terms of Service
              </a>
              <a href="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">
                Privacy Policy
              </a>
              
              {/* Scroll to top button */}
              <motion.button
                onClick={scrollToTop}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 bg-gray-800/50 hover:bg-purple-600/50 rounded-lg flex items-center justify-center text-gray-400 hover:text-white transition-all duration-300"
              >
                <ArrowUp className="w-4 h-4" />
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Security Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center pb-8"
        >
          <div className="inline-flex items-center gap-2 bg-gray-900/50 px-4 py-2 rounded-full border border-gray-800/50 backdrop-blur-sm">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-gray-400 text-xs">Secure Intelligence Operations</span>
            <Shield className="w-3 h-3 text-gray-400" />
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
