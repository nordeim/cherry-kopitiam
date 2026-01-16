'use client'

import * as React from 'react'
import { Plus } from 'lucide-react'
import { RetroCard } from '@/components/ui/retro/card'
import { RetroButton } from '@/components/ui/retro/button'
import { useCartStore } from '@/stores/cart-store'
import { cn } from '@/lib/utils'

interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  category: 'coffee' | 'tea' | 'food'
  tag: string
  spiceLevel: string
  icon?: string
}

const menuItems: MenuItem[] = [
  {
    id: 'kopi',
    name: 'Traditional Kopi',
    description: 'Strong coffee brewed with margarine and sugar, served with evaporated milk — the authentic Singaporean way.',
    price: 3.50,
    category: 'coffee',
    tag: 'House Specialty',
    spiceLevel: '★★☆',
  },
  {
    id: 'kopi-c',
    name: 'Kopi-C',
    description: 'Coffee with evaporated milk and sugar. Creamy, sweet, and perfectly balanced for your morning ritual.',
    price: 3.20,
    category: 'coffee',
    tag: 'Best Seller',
    spiceLevel: '★☆☆',
  },
  {
    id: 'kopi-o',
    name: 'Kopi-O',
    description: 'Strong black coffee with sugar. Bold, intense, and unapologetically Singaporean.',
    price: 3.00,
    category: 'coffee',
    tag: 'Authentic',
    spiceLevel: '★★★',
  },
  {
    id: 'teh-tarik',
    name: 'Teh Tarik',
    description: 'Pulled tea with condensed milk. Smooth, creamy, and served with that signature frothy top.',
    price: 3.20,
    category: 'tea',
    tag: 'Malaysian Heritage',
    spiceLevel: '☆☆☆',
  },
  {
    id: 'kaya-toast',
    name: 'Kaya Toast Set',
    description: 'Crispy toast with house-made coconut jam and butter. Served with soft-boiled eggs and your choice of kopi.',
    price: 5.50,
    category: 'food',
    tag: 'Breakfast Classic',
    spiceLevel: '☆☆☆',
  },
  {
    id: 'roti-prata',
    name: 'Roti Prata',
    description: 'Flaky, crispy flatbread served with curry dipping sauce. The perfect pairing with any hot beverage.',
    price: 5.00,
    category: 'food',
    tag: 'Indian Influence',
    spiceLevel: '★★☆',
  },
]

const MenuSection = () => {
  const [activeFilter, setActiveFilter] = React.useState<'all' | 'coffee' | 'tea' | 'food'>('all')
  const addItem = useCartStore((state) => state.addItem)

  const filteredItems = activeFilter === 'all'
    ? menuItems
    : menuItems.filter((item) => item.category === activeFilter)

  const handleAddToCart = (item: MenuItem) => {
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      category: item.category,
    })
  }

  return (
    <section id="menu" className="relative bg-terracotta-warm text-cream-white section">
      {/* Arc Pattern Background */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Cpath d='M0 60 Q30 30 60 60' fill='none' stroke='%23E8A857' stroke-width='2' opacity='0.08'/%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="container relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 fade-in">
          <h2 className="heading-2 mb-3 text-cream-white">Our Signature Brews</h2>
          <p className="text-lg opacity-90 max-w-md mx-auto">
            Crafted with beans roasted in-house since 1973
          </p>
          <div className="flex items-center justify-center gap-4 mt-4">
            <span className="w-16 h-0.5 bg-sunrise-amber rounded-full" />
            <svg className="w-8 h-8 fill-sunrise-amber" viewBox="0 0 32 32">
              <path d="M16 2C9.4 2 4 7.4 4 14c0 5.2 3.4 9.6 8 11.2V26h8v-0.8c4.6-1.6 8-6 8-11.2 0-6.6-5.4-12-12-12zm0 4c4.4 0 8 3.6 8 8s-3.6 8-8 8-8-3.6-8-8 3.6-8 8-8z" />
            </svg>
            <span className="w-16 h-0.5 bg-sunrise-amber rounded-full" />
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-10 fade-in">
          {(['all', 'coffee', 'tea', 'food'] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={cn(
                'px-6 py-3 rounded-full font-semibold text-sm transition-all border-2',
                activeFilter === filter
                  ? 'bg-sunrise-amber text-espresso-dark border-sunrise-amber'
                  : 'bg-white/10 text-cream-white border-transparent hover:bg-white/20'
              )}
            >
              {filter.charAt(0).toUpperCase() + filter.slice(1)}
            </button>
          ))}
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, index) => (
            <MenuCard key={item.id} item={item} index={index} onAddToCart={handleAddToCart} />
          ))}
        </div>

        {/* Footer Link */}
        <div className="text-center mt-12 fade-in">
          <a
            href="#order"
            className="inline-flex items-center gap-2 font-display text-xl font-bold text-cream-white px-6 py-3 border-2 border-cream-white rounded-full hover:bg-cream-white hover:text-terracotta-warm transition-all"
          >
            View Full Menu →
          </a>
        </div>
      </div>

      {/* Wave Divider */}
      <div className="absolute bottom-0 left-0 right-0 h-20">
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="w-full h-full">
          <path d="M0,64 C480,0 960,120 1440,64 L1440,120 L0,120 Z" fill="#E8A857" />
        </svg>
      </div>
    </section>
  )
}

const MenuCard = ({ item, index, onAddToCart }: { item: MenuItem; index: number; onAddToCart: (item: MenuItem) => void }) => {
  return (
    <article
      className="fade-in"
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <RetroCard variant="menu" className="h-full flex flex-col group">
        {/* Image Area */}
        <div className="h-48 bg-gradient-to-br from-honey-light to-butter-toast flex items-center justify-center relative overflow-hidden">
          {item.category === 'coffee' && (
            <div className="flex gap-3">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="w-4 h-6 bg-mocha-medium rounded-full relative animate-bean-bounce"
                  style={{ animationDelay: `${i * 0.2}s` }}
                >
                  <div className="absolute top-[30%] left-1/2 -translate-x-1/2 w-0.5 h-[40%] bg-espresso-dark rounded-full" />
                </div>
              ))}
            </div>
          )}
          {item.category === 'tea' && <span className="text-5xl">🍵</span>}
          {item.category === 'food' && <span className="text-5xl">{item.name.includes('Kaya') ? '🍞' : '🥐'}</span>}
        </div>

        {/* Content */}
        <div className="p-6 flex-1 flex flex-col text-espresso-dark">
          <div className="flex justify-between items-start mb-3">
            <h3 className="font-display text-xl font-bold">{item.name}</h3>
            <span className="font-display text-lg font-bold text-terracotta-warm bg-honey-light px-3 py-1 rounded-full">
              ${item.price.toFixed(2)}
            </span>
          </div>

          <p className="text-mocha-medium text-sm mb-4 leading-relaxed">
            {item.description}
          </p>

          <div className="flex justify-between items-center mb-4">
            <span className="text-xs font-bold text-cream-white bg-coral-pop px-3 py-1 rounded-full uppercase tracking-wider">
              {item.tag}
            </span>
            <span className="text-sm">{item.spiceLevel}</span>
          </div>

          <button
            onClick={() => onAddToCart(item)}
            className="mt-auto w-full py-4 bg-espresso-dark text-cream-white rounded-lg font-bold text-sm flex items-center justify-center gap-2 transition-all hover:bg-coral-pop group-hover:scale-[1.02]"
          >
            <span className="w-5 h-5 bg-sunrise-amber rounded-full flex items-center justify-center text-espresso-dark text-sm font-bold">
              <Plus className="w-3 h-3" />
            </span>
            Add to Cart
          </button>
        </div>
      </RetroCard>
    </article>
  )
}

export { MenuSection }
