'use client'

import { motion } from 'framer-motion'
import { type ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface GlowCardProps {
  children: ReactNode
  className?: string
  hoverScale?: number
}

export function GlowCard({ children, className, hoverScale = 1.02 }: GlowCardProps) {
  return (
    <motion.div
      whileHover={{ scale: hoverScale }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={cn(
        'relative bg-surface rounded-2xl border border-border overflow-hidden',
        'transition-shadow duration-300 hover:shadow-glow hover:border-primary/20',
        className
      )}
    >
      {children}
    </motion.div>
  )
}
