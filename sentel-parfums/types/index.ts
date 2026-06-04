export interface Product {
  id: string
  name: string
  brand_inspiration: string
  description: string
  price: number
  sizes: ProductSize[]
  stock: number
  top_notes: string[]
  heart_notes: string[]
  base_notes: string[]
  longevity_hours: number
  scent_family: string
  images: string[]
  featured: boolean
  category_id: string | null
  created_at: string
  updated_at: string
}

export interface ProductSize {
  size: string
  price: number
}

export interface Category {
  id: string
  name: string
  slug: string
  created_at: string
}

export interface CartItem {
  id: string
  cart_id: string
  product_id: string
  product: Product
  quantity: number
  size: string
  created_at: string
}

export interface Cart {
  id: string
  user_id: string | null
  session_id: string | null
  items: CartItem[]
  created_at: string
}

export interface Order {
  id: string
  user_id: string | null
  total: number
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled'
  payment_method: string
  shipping_address: ShippingAddress
  created_at: string
  updated_at: string
}

export interface OrderItem {
  id: string
  order_id: string
  product_id: string
  product: Product
  quantity: number
  size: string
  price_at_time: number
}

export interface ShippingAddress {
  fullName: string
  phone: string
  address: string
  city: string
  postalCode: string
}

export interface Review {
  id: string
  product_id: string
  user_id: string | null
  name: string
  city: string
  rating: number
  comment: string
  image_url: string | null
  created_at: string
}

export type PaymentMethod = 'cod' | 'bank_transfer' | 'cmi'

export interface BundleSelection {
  productId: string
  size: string
}
