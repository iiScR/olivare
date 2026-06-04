import { Hero } from '@/components/sections/Hero'
import { BrandStrip } from '@/components/sections/BrandStrip'
import { FeaturedProducts } from '@/components/sections/FeaturedProducts'
import { BundlePromo } from '@/components/sections/BundlePromo'
import { Reviews } from '@/components/sections/Reviews'

export default function HomePage() {
  return (
    <>
      <Hero />
      <BrandStrip />
      <FeaturedProducts />
      <BundlePromo />
      <Reviews />
    </>
  )
}
