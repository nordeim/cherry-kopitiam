import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cn } from '@/lib/utils'

export interface RetroButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  asChild?: boolean
}

const RetroButton = React.forwardRef<HTMLButtonElement, RetroButtonProps>(
  ({ className, variant = 'primary', size = 'md', asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
  
    const variants = {
      primary: 'bg-coral-pop text-white border-coral-pop hover:bg-terracotta-warm hover:border-terracotta-warm',
      secondary: 'border-espresso-dark text-espresso-dark hover:bg-espresso-dark hover:text-cream-white',
      ghost: 'bg-transparent border-transparent',
    }
  
    const sizes = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-3 text-base',
      lg: 'px-8 py-4 text-lg',
    }
  
    return (
      <Comp
        className={cn(
          'inline-flex items-center justify-center gap-2 rounded-full font-display font-bold uppercase tracking-wide transition-all duration-300 ease-smooth shadow-md hover:shadow-lg hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral-pop focus-visible:ring-offset-2',
          variants[variant],
          sizes[size],
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
RetroButton.displayName = 'RetroButton'

export { RetroButton }
