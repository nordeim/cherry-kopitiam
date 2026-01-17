'use client'

import * as React from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import Link from 'next/link'
import { ShoppingBag, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useCartStore } from '@/stores/cart-store'
import { RetroButton } from '@/components/ui/retro/button'

const Header = () => {
  const [isScrolled, setIsScrolled] = React.useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)
  const itemCount = useCartStore((state) => state.getItemCount())
  const toggleCart = useCartStore((state) => state.toggleCart)

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { href: '#menu', label: 'Menu' },
    { href: '#heritage', label: 'Our Story' },
    { href: '#locations', label: 'Visit Us' },
    { href: '#order', label: 'Order' },
  ]

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-espresso-dark/95 backdrop-blur-md border-b-3 border-sunrise-amber'
          : 'bg-transparent'
      )}
    >
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex flex-col gap-1 group">
          <span className="font-display text-xl font-bold text-cream-white tracking-tight">
            Morning Brew
          </span>
          <span className="font-display text-xs font-semibold text-sunrise-amber uppercase tracking-[0.15em]">
            Collective
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative font-semibold text-cream-white px-4 py-2 rounded-full transition-colors hover:text-sunrise-amber"
            >
              {link.label}
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-sunrise-amber scale-x-0 transition-transform group-hover:scale-x-100" />
            </a>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <button
            onClick={toggleCart}
            className="relative w-12 h-12 flex items-center justify-center rounded-full bg-sunrise-amber/15 hover:bg-sunrise-amber transition-all hover:scale-110"
            aria-label={`Shopping cart, ${itemCount} items`}
          >
            <ShoppingBag className="w-5 h-5 stroke-cream-white stroke-2 fill-none" />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 min-w-5 h-5 bg-coral-pop text-white text-xs font-bold rounded-full flex items-center justify-center border-2 border-espresso-dark">
                {itemCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Toggle */}
          <DialogPrimitive.Root open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <DialogPrimitive.Trigger asChild>
              <button
                className="md:hidden flex flex-col gap-1.5 p-2"
                aria-label="Toggle menu"
              >
                <span className={cn(
                  'w-6 h-0.5 bg-cream-white rounded-full transition-all',
                  isMobileMenuOpen && 'rotate-45 translate-y-2'
                )} />
                <span className={cn(
                  'w-6 h-0.5 bg-cream-white rounded-full transition-all',
                  isMobileMenuOpen && 'opacity-0'
                )} />
                <span className={cn(
                  'w-6 h-0.5 bg-cream-white rounded-full transition-all',
                  isMobileMenuOpen && '-rotate-45 -translate-y-2'
                )} />
              </button>
            </DialogPrimitive.Trigger>

            <DialogPrimitive.Portal>
              <DialogPrimitive.Overlay className="fixed inset-0 bg-espresso-dark z-50 animate-fade-in" />
              <DialogPrimitive.Content className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-8 p-8">
                {navLinks.map((link) => (
                  <DialogPrimitive.Close asChild key={link.href}>
                    <a
                      href={link.href}
                      className="font-display text-3xl font-bold text-cream-white hover:text-sunrise-amber transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.label}
                    </a>
                  </DialogPrimitive.Close>
                ))}
                <DialogPrimitive.Close asChild>
                  <RetroButton variant="secondary" size="lg" className="mt-4">
                    <X className="w-5 h-5" />
                    Close Menu
                  </RetroButton>
                </DialogPrimitive.Close>
              </DialogPrimitive.Content>
            </DialogPrimitive.Portal>
          </DialogPrimitive.Root>
        </div>
      </div>
    </header>
  )
}

export { Header }
