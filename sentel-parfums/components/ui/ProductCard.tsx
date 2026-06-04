'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Heart, ShoppingBag, Star } from 'lucide-react'
import type { Product } from '@/types'
import { formatPrice } from '@/lib/utils'
import { useCartStore } from '@/lib/store'
import { toast } from './Toaster'
import { GlowCard } from './GlowCard'

interface ProductCardProps {
  product: Product
  index?: number
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]?.size || '50ml')
  const [isWishlisted, setIsWishlisted] = useState(false)
  const addToCart = useCartStore((s) => s.addToCart)

  const currentPrice = product.sizes.find((s) => s.size === selectedSize)?.price || product.price

  const handleAddToCart = () => {
    addToCart(product, selectedSize)
    toast(`${product.name} ajouté au panier`, 'success')
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
    >
      <GlowCard className="group h-full flex flex-col">
        {/* Image */}
        <Link href={`/products/${product.id}`} className="relative aspect-square overflow-hidden block">
          {product.images[0] ? (
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
          ) : (
            <div className="w-full h-full bg-surface-elevated flex items-center justify-center text-text-muted">
              <span className="text-sm">Image à venir</span>
            </div>
          )}

          {/* Wishlist button */}
          <button
            onClick={(e) => {
              e.preventDefault()
              setIsWishlisted(!isWishlisted)
            }}
            className="absolute top-3 right-3 p-2 rounded-full bg-background/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
            aria-label={isWishlisted ? 'Retirer des favoris' : 'Ajouter aux favoris'}
          >
            <Heart
              className={`w-4 h-4 transition-colors ${isWishlisted ? 'fill-red-400 text-red-400' : 'text-text-secondary'}`}
            />
          </button>

          {/* Featured badge */}
          {product.featured && (
            <span className="absolute top-3 left-3 px-2 py-1 bg-primary/90 text-background text-[10px] font-bold uppercase tracking-wider rounded">
              Populaire
            </span>
          )}

          {/* Quick add overlay */}
          <div className="absolute inset-x-0 bottom-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <button
              onClick={(e) => {
                e.preventDefault()
                handleAddToCart()
              }}
              className="w-full btn-primary py-2.5 text-sm flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-4 h-4" />
              Ajouter au panier
            </button>
          </div>
        </Link>

        {/* Content */}
        <div className="p-4 flex flex-col flex-1">
          <Link href={`/products/${product.id}`}>
            <p className="text-xs text-primary font-medium uppercase tracking-wider mb-1">
              Inspiré par {product.brand_inspiration}
            </p>
            <h3 className="font-display font-semibold text-base mb-1 group-hover:text-primary transition-colors">
              {product.name}
            </h3>
          </Link>

          {/* Rating */}
          <div className="flex items-center gap-1 mb-3">
            <Star className="w-3.5 h-3.5 fill-primary text-primary" />
            <span className="text-xs text-text-secondary">4.9</span>
            <span className="text-xs text-text-muted">(128 avis)</span>
          </div>

          {/* Size selector */}
          <div className="flex gap-1.5 mb-3">
            {product.sizes.map((sizeOption) => (
              <button
                key={sizeOption.size}
                onClick={() => setSelectedSize(sizeOption.size)}
                className={`px-2 py-1 text-[11px] rounded border transition-all ${
                  selectedSize === sizeOption.size
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-border text-text-muted hover:border-text-secondary'
                }`}
              >
                {sizeOption.size}
              </button>
            ))}
          </div>

          {/* Price */}
          <div className="mt-auto flex items-center justify-between">
            <span className="font-display font-bold text-lg">{formatPrice(currentPrice)}</span>
            <button
              onClick={handleAddToCart}
              className="p-2 rounded-lg bg-surface-elevated hover:bg-primary hover:text-background transition-colors"
              aria-label="Ajouter au panier"
            >
              <ShoppingBag className="w-4 h-4" />
            </button>
          </div>
        </div>
      </GlowCard>
    </motion.div>
  )
}
