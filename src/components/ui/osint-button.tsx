import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface OSINTButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
  onClick?: () => void;
  href?: string;
  disabled?: boolean;
  animate?: boolean;
}

export const OSINTButton: React.FC<OSINTButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  className,
  icon: Icon = ArrowRight,
  iconPosition = 'right',
  onClick,
  href,
  disabled = false,
  animate = true,
}) => {
  const baseClasses = cn(
    "group relative inline-flex items-center justify-center font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-black disabled:opacity-50 disabled:cursor-not-allowed",
    {
      // Size variants
      'px-4 py-2 text-sm': size === 'sm',
      'px-6 py-3 text-base': size === 'md', 
      'px-6 py-6 text-lg': size === 'lg',
      // Style variants
      'rounded-full border-t border-purple-400 bg-gradient-to-b from-purple-700 to-slate-950/80 text-white shadow-lg shadow-purple-600/20 hover:shadow-purple-600/40': variant === 'primary',
      'rounded-full border border-purple-500/30 bg-transparent text-white hover:bg-purple-500/10 hover:text-white': variant === 'outline',
      'rounded-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-2xl border border-blue-400/30 hover:scale-105': variant === 'secondary',
    },
    className
  );

  const iconClasses = cn(
    "transition-transform duration-300",
    {
      'h-3 w-3': size === 'sm',
      'h-4 w-4': size === 'md',
      'h-5 w-5': size === 'lg',
      'ml-2 group-hover:translate-x-1': iconPosition === 'right',
      'mr-2 group-hover:-translate-x-1': iconPosition === 'left',
    }
  );

  const content = (
    <>
      {iconPosition === 'left' && Icon && (
        <Icon className={iconClasses} />
      )}
      {children}
      {iconPosition === 'right' && Icon && (
        <Icon className={iconClasses} />
      )}
    </>
  );

  const MotionComponent = animate ? motion.button : 'button';

  if (href) {
    const MotionLink = animate ? motion.a : 'a';
    return (
      <MotionLink
        href={href}
        className={baseClasses}
        whileHover={animate ? { scale: variant === 'secondary' ? 1.05 : 1.02 } : undefined}
        whileTap={animate ? { scale: 0.98 } : undefined}
        onClick={onClick}
      >
        {content}
      </MotionLink>
    );
  }

  return (
    <MotionComponent
      className={baseClasses}
      onClick={onClick}
      disabled={disabled}
      whileHover={animate ? { scale: variant === 'secondary' ? 1.05 : 1.02 } : undefined}
      whileTap={animate ? { scale: 0.98 } : undefined}
    >
      {content}
    </MotionComponent>
  );
};
