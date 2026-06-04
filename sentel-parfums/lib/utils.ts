import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'MAD',
    minimumFractionDigits: 0,
  }).format(price)
}

export function generateSessionId(): string {
  if (typeof window !== 'undefined') {
    const existing = localStorage.getItem('session_id')
    if (existing) return existing
    const newId = `sess_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`
    localStorage.setItem('session_id', newId)
    return newId
  }
  return ''
}

export function getSessionId(): string | null {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('session_id')
  }
  return null
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength) + '...'
}

export function debounce<T extends (...args: unknown[]) => void>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout>
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => fn(...args), delay)
  }
}

export const scentFamilies = [
  'Floral',
  'Woody',
  'Oriental',
  'Fresh',
  'Citrus',
  'Gourmand',
  'Aromatic',
  'Chypre',
]

export const genders = ['Masculin', 'Féminin', 'Unisexe']

export const brandLogos = [
  { name: 'Tom Ford', initial: 'TF' },
  { name: 'Chanel', initial: 'CH' },
  { name: 'Louis Vuitton', initial: 'LV' },
  { name: 'Kayali', initial: 'KA' },
  { name: 'YSL', initial: 'YS' },
  { name: 'Prada', initial: 'PR' },
]
