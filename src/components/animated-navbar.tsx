"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useState, useEffect } from "react";
import { Link } from '@tanstack/react-router';
import { Menu, Shield, X } from 'lucide-react';
import { OSINTButton } from '@/components/ui/osint-button';
import { cn } from '@/lib/utils';

export function AnimatedNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();

  // Transform values based on scroll
  const navbarBackground = useTransform(
    scrollY,
    [0, 100],
    ["rgba(0, 0, 0, 0.2)", "rgba(139, 92, 246, 0.1)"]
  );

  const navbarScale = useTransform(scrollY, [0, 100], [1, 0.95]);
  const navbarBorderRadius = useTransform(scrollY, [0, 100], ["0px", "50px"]);
  const navbarPadding = useTransform(scrollY, [0, 100], ["20px", "12px"]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/_authenticated/services' },
    { name: 'Features', href: '#features' },
    { name: 'Demo', href: '#demo' },
    { name: 'About', href: '#about' }
  ];

  return (
    <>
      {/* Fixed navbar container */}
      <div className="fixed top-0 left-0 right-0 z-50 px-4 py-4">
        <motion.nav
          style={{
            backgroundColor: navbarBackground,
            scale: navbarScale,
            borderRadius: navbarBorderRadius,
            paddingLeft: navbarPadding,
            paddingRight: navbarPadding,
          }}
          className={cn(
            "mx-auto max-w-4xl transition-all duration-300",
            "backdrop-blur-md border border-white/10 shadow-lg",
            isScrolled ? "shadow-purple-500/20 bg-gradient-to-b from-purple-700 to-slate-950/80" : "shadow-black/20"
          )}
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className={cn(
            "flex items-center justify-between px-4 transition-all duration-300",
            isScrolled ? "h-12" : "h-16"
          )}>
            {/* Logo Section */}
            <motion.div 
              className="flex items-center gap-3"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <motion.div
                className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.8 }}
              >
                <Shield className="w-5 h-5 text-white" />
              </motion.div>
              <Link to="/" className="text-lg font-bold text-white tracking-wide">
                Aegis <span className="text-purple-400">OSINT</span>
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  {item.href.startsWith('#') ? (
                    <a
                      href={item.href}
                      className="text-gray-300 hover:text-white transition-all duration-300 text-sm font-medium relative group"
                    >
                      {item.name}
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-blue-400 transition-all duration-300 group-hover:w-full"></span>
                    </a>
                  ) : (
                    <Link
                      to={item.href}
                      className="text-gray-300 hover:text-white transition-all duration-300 text-sm font-medium relative group"
                    >
                      {item.name}
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-blue-400 transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                  )}
                </motion.div>
              ))}
            </div>

            {/* CTA Button */}
            <motion.div
              className="hidden md:block"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.6 }}
            >
              <OSINTButton
                variant={isScrolled ? "secondary" : "outline"}
                size="sm"
                animate={true}
                className={cn(
                  "transition-all duration-300",
                  !isScrolled && "border-0 bg-transparent backdrop-blur-none shadow-none hover:bg-white/10 px-4 py-2"
                )}
              >
                Get Started
              </OSINTButton>
            </motion.div>

            {/* Mobile Menu Button */}
            <motion.button
              className="md:hidden w-10 h-10 flex items-center justify-center rounded-lg bg-gray-800/50 hover:bg-gray-700/50 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                animate={{ rotate: isMenuOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {isMenuOpen ? (
                  <X className="w-5 h-5 text-white" />
                ) : (
                  <Menu className="w-5 h-5 text-white" />
                )}
              </motion.div>
            </motion.button>
          </div>

          {/* Mobile Menu */}
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: isMenuOpen ? 'auto' : 0,
              opacity: isMenuOpen ? 1 : 0
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden overflow-hidden border-t border-white/10"
          >
            <div className="p-4 space-y-3">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ 
                    opacity: isMenuOpen ? 1 : 0, 
                    x: isMenuOpen ? 0 : -20 
                  }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  {item.href.startsWith('#') ? (
                    <a
                      href={item.href}
                      className="block text-gray-300 hover:text-white transition-colors py-2 text-sm font-medium"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </a>
                  ) : (
                    <Link
                      to={item.href}
                      className="block text-gray-300 hover:text-white transition-colors py-2 text-sm font-medium"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  )}
                </motion.div>
              ))}
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: isMenuOpen ? 1 : 0, 
                  y: isMenuOpen ? 0 : 20 
                }}
                transition={{ duration: 0.3, delay: 0.2 }}
                className="pt-3 border-t border-white/10"
              >
                <OSINTButton
                  variant="primary"
                  size="md"
                  className="w-full"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Get Started
                </OSINTButton>
              </motion.div>
            </div>
          </motion.div>
        </motion.nav>
      </div>
    </>
  );
}

export default AnimatedNavbar;
