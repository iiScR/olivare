'use client'

import { cn } from '@/lib/utils'
import type { ProductSize } from '@/types'

interface SizeSelectorProps {
  sizes: ProductSize[]
  selected: string
  onSelect: (size: string) => void
  className?: string
}

export function SizeSelector({ sizes, selected, onSelect, className }: SizeSelectorProps) {
  return (
    <div className={cn('flex gap-2', className)}>
      {sizes.map((sizeOption) => (
        <button
          key={sizeOption.size}
          onClick={() => onSelect(sizeOption.size)}
          className={cn(
            'relative px-4 py-2.5 rounded-lg border text-sm font-medium transition-all duration-200',
            selected === sizeOption.size
              ? 'border-primary bg-primary/10 text-primary shadow-glow'
              : 'border-border text-text-secondary hover:border-text-secondary hover:bg-surface-elevated'
          )}
        >
          {sizeOption.size}
          {selected === sizeOption.size && (
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-primary rounded-full" />
          )}
        </button>
      ))}
    </div>
  )
}
