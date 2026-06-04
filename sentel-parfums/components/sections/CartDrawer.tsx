'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, Plus, Minus, ShoppingBag, Truck, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { useCartStore } from '@/lib/store'
import { formatPrice } from '@/lib/utils'

export function CartDrawer() {
  const { items, isCartOpen, setCartOpen, removeFromCart, updateQuantity, getCartTotal } = useCartStore()
  const total = getCartTotal()
  const freeShippingThreshold = 250
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - total)

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCartOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-surface border-l border-border z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-5 h-5 text-primary" />
                <h2 className="font-display text-xl font-semibold">Votre Panier</h2>
                <span className="text-sm text-text-muted">({items.length} article{items.length !== 1 ? 's' : ''})</span>
              </div>
              <button
                onClick={() => setCartOpen(false)}
                className="p-2 rounded-lg hover:bg-surface-elevated transition-colors"
                aria-label="Fermer le panier"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {items.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingBag className="w-16 h-16 text-text-muted mx-auto mb-4" />
                  <p className="text-text-secondary mb-2">Votre panier est vide</p>
                  <p className="text-sm text-text-muted mb-6">Découvrez nos parfums exceptionnels</p>
                  <button
                    onClick={() => setCartOpen(false)}
                    className="btn-outline text-sm"
                  >
                    Continuer les achats
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    className="flex gap-4 p-3 rounded-xl bg-surface-elevated border border-border"
                  >
                    {/* Image */}
                    <div className="relative w-20 h-20 rounded-lg overflow-hidden shrink-0 bg-background">
                      {item.product.images[0] ? (
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-text-muted text-xs">
                          No img
                        </div>
                      )}
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-sm truncate">{item.product.name}</h3>
                      <p className="text-xs text-text-muted mb-1">
                        Inspiré par {item.product.brand_inspiration}
                      </p>
                      <p className="text-xs text-primary mb-2">{item.size}</p>

                      <div className="flex items-center justify-between">
                        {/* Quantity */}
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 rounded hover:bg-background transition-colors"
                            aria-label="Diminuer la quantité"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 rounded hover:bg-background transition-colors"
                            aria-label="Augmenter la quantité"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Price */}
                        <span className="font-semibold text-sm">
                          {formatPrice(
                            (item.product.sizes.find((s) => s.size === item.size)?.price || item.product.price) *
                              item.quantity
                          )}
                        </span>
                      </div>
                    </div>

                    {/* Remove */}
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-1 rounded hover:bg-background transition-colors self-start text-text-muted hover:text-red-400"
                      aria-label="Supprimer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 border-t border-border space-y-4">
                {/* Free shipping */}
                {remainingForFreeShipping > 0 ? (
                  <div className="flex items-center gap-2 text-sm text-text-secondary">
                    <Truck className="w-4 h-4 text-primary" />
                    <span>Plus que {formatPrice(remainingForFreeShipping)} pour la livraison gratuite</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-sm text-primary">
                    <Truck className="w-4 h-4" />
                    <span>Livraison gratuite !</span>
                  </div>
                )}

                {/* Subtotal */}
                <div className="flex items-center justify-between text-lg">
                  <span className="text-text-secondary">Sous-total</span>
                  <span className="font-display font-semibold text-xl">{formatPrice(total)}</span>
                </div>

                {/* Checkout button */}
                <Link
                  href="/checkout"
                  onClick={() => setCartOpen(false)}
                  className="btn-primary w-full flex items-center justify-center gap-2"
                >
                  Passer la commande
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <button
                  onClick={() => setCartOpen(false)}
                  className="w-full text-center text-sm text-text-muted hover:text-primary transition-colors"
                >
                  Continuer les achats
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
