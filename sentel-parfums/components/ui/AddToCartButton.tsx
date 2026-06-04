'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingBag, Check, Plus, Minus } from 'lucide-react'
import type { Product } from '@/types'
import { useCartStore } from '@/lib/store'
import { toast } from './Toaster'
import { SizeSelector } from './SizeSelector'

interface AddToCartButtonProps {
  product: Product
  showSizeSelector?: boolean
  fullWidth?: boolean
  variant?: 'primary' | 'outline'
}

export function AddToCartButton({
  product,
  showSizeSelector = true,
  fullWidth = false,
  variant = 'primary',
}: AddToCartButtonProps) {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]?.size || '50ml')
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)
  const addToCart = useCartStore((s) => s.addToCart)

  const handleAdd = () => {
    addToCart(product, selectedSize, quantity)
    setAdded(true)
    toast(`${product.name} ajouté au panier`, 'success')
    setTimeout(() => setAdded(false), 2000)
  }

  const buttonClasses =
    variant === 'primary'
      ? 'btn-primary'
      : 'btn-outline'

  return (
    <div className={`space-y-4 ${fullWidth ? 'w-full' : ''}`}>
      {showSizeSelector && (
        <SizeSelector
          sizes={product.sizes}
          selected={selectedSize}
          onSelect={setSelectedSize}
        />
      )}

      <div className="flex items-center gap-4">
        {/* Quantity */}
        <div className="flex items-center gap-2 bg-surface-elevated rounded-lg border border-border p-1">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="p-2 rounded hover:bg-background transition-colors"
            aria-label="Diminuer"
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="w-8 text-center font-medium">{quantity}</span>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="p-2 rounded hover:bg-background transition-colors"
            aria-label="Augmenter"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        {/* Add button */}
        <motion.button
          onClick={handleAdd}
          className={`${buttonClasses} ${fullWidth ? 'flex-1' : ''} flex items-center justify-center gap-2`}
          whileTap={{ scale: 0.97 }}
        >
          <AnimatePresence mode="wait">
            {added ? (
              <motion.span
                key="added"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                className="flex items-center gap-2"
              >
                <Check className="w-4 h-4" />
                Ajouté
              </motion.span>
            ) : (
              <motion.span
                key="add"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                className="flex items-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                Ajouter au panier
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </div>
  )
}
