'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

interface Brand {
  name: string
  slug: string
  image: string
}

const brands: Brand[] = [
  { name: 'Tom Ford', slug: 'tom-ford', image: '/images/brands/tom-ford.svg' },
  { name: 'Chanel', slug: 'chanel', image: '/images/brands/chanel.svg' },
  { name: 'Louis Vuitton', slug: 'louis-vuitton', image: '/images/brands/louis-vuitton.svg' },
  { name: 'Kayali', slug: 'kayali', image: '/images/brands/kayali.svg' },
  { name: 'YSL', slug: 'ysl', image: '/images/brands/ysl.svg' },
  { name: 'Prada', slug: 'prada', image: '/images/brands/prada.svg' },
]

function BrandLogo({ brand, index }: { brand: Brand; index: number }) {
  const [failed, setFailed] = useState(false)

  return (
    <motion.a
      href={`/products?brand=${encodeURIComponent(brand.name)}`}
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className="group relative flex items-center justify-center px-4 py-6"
    >
      {failed ? (
        <span className="font-display text-base font-semibold tracking-widest text-text-muted group-hover:text-primary transition-colors duration-500">
          {brand.name}
        </span>
      ) : (
        <img
          src={brand.image}
          alt={brand.name}
          className="h-7 w-auto max-w-[140px] object-contain opacity-35 brightness-200 transition-all duration-500 group-hover:opacity-100 group-hover:brightness-100 group-hover:drop-shadow-[0_0_12px_rgba(198,164,63,0.35)]"
          loading="lazy"
          onError={() => setFailed(true)}
        />
      )}
    </motion.a>
  )
}

export function BrandStrip() {
  return (
    <section className="section-padding py-14 border-y border-border bg-surface/50">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto"
      >
        <p className="text-center text-xs uppercase tracking-[0.25em] text-text-muted mb-10">
          Inspiré par les plus grandes maisons
        </p>

        <div className="grid grid-cols-3 sm:grid-cols-6 gap-6 items-center">
          {brands.map((brand, i) => (
            <BrandLogo key={brand.slug} brand={brand} index={i} />
          ))}
        </div>
      </motion.div>
    </section>
  )
}
