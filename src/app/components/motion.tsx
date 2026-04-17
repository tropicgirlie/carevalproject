import { motion, useInView, useSpring, useMotionValue, useTransform, type Variants } from 'motion/react';
import { useRef, useEffect, useState, type ReactNode } from 'react';

// ── Fade In on scroll ──
export function FadeIn({
  children,
  delay = 0,
  direction = 'up',
  className = '',
  duration = 0.6,
}: {
  children: ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  className?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  const directionOffset = {
    up: { y: 40 },
    down: { y: -40 },
    left: { x: 40 },
    right: { x: -40 },
    none: {},
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, ...directionOffset[direction] }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration, delay, ease: [0.25, 0.4, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ── Stagger container ──
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.4, 0.25, 1] },
  },
};

export function StaggerContainer({
  children,
  className = '',
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <motion.div
      ref={ref}
      variants={{
        hidden: { opacity: 0 },
        show: {
          opacity: 1,
          transition: { staggerChildren: 0.1, delayChildren: delay },
        },
      }}
      initial="hidden"
      animate={isInView ? 'show' : 'hidden'}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div variants={staggerItem} className={className}>
      {children}
    </motion.div>
  );
}

// ── Animated counter ──
export function AnimatedCounter({
  value,
  decimals = 1,
  duration = 1.5,
  className = '',
}: {
  value: number;
  decimals?: number;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const motionVal = useMotionValue(0);
  const springVal = useSpring(motionVal, { duration: duration * 1000, bounce: 0 });
  const display = useTransform(springVal, (v) => v.toFixed(decimals));
  const [displayText, setDisplayText] = useState('0');

  useEffect(() => {
    if (isInView) {
      motionVal.set(value);
    }
  }, [isInView, value, motionVal]);

  useEffect(() => {
    const unsub = display.on('change', (v) => setDisplayText(v));
    return unsub;
  }, [display]);

  return (
    <span ref={ref} className={className}>
      {displayText}
    </span>
  );
}

// ── Page transition wrapper ──
export function PageTransition({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.35, ease: [0.25, 0.4, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ── Hover scale card ──
export function HoverCard({
  children,
  className = '',
  scale = 1.02,
}: {
  children: ReactNode;
  className?: string;
  scale?: number;
}) {
  return (
    <motion.div
      whileHover={{ scale, y: -4 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ── Floating dots background ──
export function FloatingDots({ count = 20 }: { count?: number }) {
  const dots = Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 2,
    duration: Math.random() * 15 + 10,
    delay: Math.random() * 5,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {dots.map((dot) => (
        <motion.div
          key={dot.id}
          className="absolute rounded-full bg-primary/[0.07]"
          style={{
            left: `${dot.x}%`,
            top: `${dot.y}%`,
            width: dot.size,
            height: dot.size,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 15, 0],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: dot.duration,
            delay: dot.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

// ── Gradient text ──
export function GradientText({
  children,
  className = '',
  from = '#0D9488',
  to = '#14B8A6',
}: {
  children: ReactNode;
  className?: string;
  from?: string;
  to?: string;
}) {
  return (
    <span
      className={`bg-clip-text text-transparent ${className}`}
      style={{
        backgroundImage: `linear-gradient(135deg, ${from}, ${to})`,
      }}
    >
      {children}
    </span>
  );
}

// ── Animated progress bar ──
export function AnimatedProgress({
  value,
  className = '',
  barClassName = '',
  height = 'h-2',
}: {
  value: number;
  className?: string;
  barClassName?: string;
  height?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div ref={ref} className={`${height} bg-warm-grey rounded-full overflow-hidden ${className}`}>
      <motion.div
        className={`h-full rounded-full ${barClassName || 'gradient-accent'}`}
        initial={{ width: 0 }}
        animate={isInView ? { width: `${value}%` } : { width: 0 }}
        transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.4, 0.25, 1] }}
      />
    </div>
  );
}

// ── Pulse glow ──
export function PulseGlow({
  children,
  active = false,
  color = 'rgba(234, 88, 12, 0.3)',
  className = '',
}: {
  children: ReactNode;
  active?: boolean;
  color?: string;
  className?: string;
}) {
  return (
    <motion.div
      className={`relative ${className}`}
      animate={
        active
          ? {
              boxShadow: [
                `0 0 0 0 ${color}`,
                `0 0 0 8px transparent`,
              ],
            }
          : {}
      }
      transition={active ? { duration: 1.5, repeat: Infinity } : {}}
    >
      {children}
    </motion.div>
  );
}
