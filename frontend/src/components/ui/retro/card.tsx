import * as React from 'react'
import { cn } from '@/lib/utils'

export interface RetroCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'menu' | 'location' | 'polaroid'
}

const RetroCard = React.forwardRef<HTMLDivElement, RetroCardProps>(
  ({ className, variant = 'menu', children, ...props }, ref) => {
    const variants = {
      menu: 'bg-cream-white rounded-lg shadow-lg overflow-hidden border-t-4 border-dashed border-sunrise-amber hover:-translate-y-2 hover:rotate-1',
      location: 'bg-cream-white rounded-xl shadow-lg overflow-hidden',
      polaroid: 'bg-cream-white p-3 pb-8 rounded-md shadow-lg rotate-2 hover:rotate-0 hover:scale-105 transition-all duration-300',
    }
  
    return (
      <div
        ref={ref}
        className={cn(variants[variant], className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)
RetroCard.displayName = 'RetroCard'

export { RetroCard }
