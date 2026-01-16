import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-SG', {
    style: 'currency',
    currency: 'SGD',
  }).format(amount)
}

export function calculateGST(amount: number): { subtotal: number; gst: number; total: number } {
  // Singapore GST is 9%
  // We need to work backwards from total to ensure precision
  const total = Math.round(amount * 100) / 100
  const gst = Math.round((total / 1.09) * 0.09 * 100) / 100
  const subtotal = Math.round((total - gst) * 100) / 100

  return { subtotal, gst, total }
}
