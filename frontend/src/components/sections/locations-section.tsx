'use client'

import * as React from 'react'
import { MapPin, Clock, ArrowRight } from 'lucide-react'
import { RetroButton } from '@/components/ui/retro/button'
import { RetroCard } from '@/components/ui/retro/card'

const locations = [
  {
    id: 'tiong-bahru',
    name: 'Tiong Bahru',
    badge: 'Flagship',
    address: '55 Tiong Bahru Road, #01-55',
    hours: 'Daily: 7:00 AM - 8:00 PM',
    features: ['🍳 Full Breakfast Menu', '♿ Wheelchair Accessible', '🅿️ Parking Available'],
    icon: '☕',
  },
  {
    id: 'joo-chiat',
    name: 'Joo Chiat',
    badge: 'Peranakan',
    address: '48 Joo Chiat Road',
    hours: 'Daily: 8:00 AM - 9:00 PM',
    features: ['🎨 Peranakan Decor', '📸 Instagram Famous', '🎵 Live Music (Weekends)'],
    icon: '🏠',
  },
  {
    id: 'jurong',
    name: 'Jurong Lake',
    badge: 'Modern',
    address: '101 Jurong Lake Street, #01-12',
    hours: 'Daily: 7:30 AM - 10:00 PM',
    features: ['💻 Co-working Space', '⚡ Fast Charging', '🌿 Green Terrace'],
    icon: '🌳',
  },
]

const LocationsSection = () => {
  return (
    <section id="locations" className="relative bg-sage-fresh section">
      {/* Circles Texture */}
      <div
        className="absolute inset-0 opacity-15"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='40' fill='none' stroke='%23E8A857' stroke-width='1' opacity='0.1'/%3E%3Ccircle cx='50' cy='50' r='30' fill='none' stroke='%23D4693B' stroke-width='1' opacity='0.08'/%3E%3Ccircle cx='50' cy='50' r='20' fill='none' stroke='%23C68642' stroke-width='1' opacity='0.06'/%3E%3C/svg%3E")`,
          backgroundSize: '100px 100px',
        }}
      />

      <div className="container relative z-10">
        <div className="text-center mb-12 fade-in">
          <h2 className="heading-2 mb-3 text-cream-white">Find Your Nearest Kopitiam</h2>
          <p className="text-lg text-cream-white/90 max-w-md mx-auto">
            Three locations across Singapore, each with its own unique character
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {locations.map((location, index) => (
            <article
              key={location.id}
              className="fade-in"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <RetroCard variant="location" className="h-full flex flex-col group hover:-translate-y-2 transition-transform">
                {/* Header */}
                <div className="flex justify-between items-center p-4 bg-espresso-dark">
                  <h3 className="font-display text-lg font-bold text-cream-white">
                    {location.name}
                  </h3>
                  <span className="text-xs font-bold text-espresso-dark bg-sunrise-amber px-3 py-1 rounded-full uppercase tracking-wider">
                    {location.badge}
                  </span>
                </div>

                {/* Image */}
                <div className="h-40 bg-gradient-to-br from-sage-fresh to-honey-light flex items-center justify-center text-5xl">
                  {location.icon}
                </div>

                {/* Details */}
                <div className="p-6">
                  <p className="font-semibold text-espresso-dark mb-2">{location.address}</p>
                  <p className="text-mocha-medium text-sm mb-4 flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    {location.hours}
                  </p>

                  <div className="space-y-2">
                    {location.features.map((feature) => (
                      <p key={feature} className="text-sm text-mocha-medium flex items-center gap-2">
                        {feature}
                      </p>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="p-4 bg-vintage-paper border-t-2 border-dashed border-butter-toast flex gap-3 mt-auto">
                  <a
                    href="#"
                    className="flex-1 text-center py-3 rounded-md font-semibold text-sm bg-espresso-dark text-cream-white hover:bg-coral-pop transition-colors"
                  >
                    Get Directions
                  </a>
                  <a
                    href="#"
                    className="flex-1 text-center py-3 rounded-md font-semibold text-sm border-2 border-espresso-dark text-espresso-dark hover:bg-espresso-dark hover:text-cream-white transition-colors"
                  >
                    Reserve
                  </a>
                </div>
              </RetroCard>
            </article>
          ))}
        </div>

        {/* Map Placeholder */}
        <div className="mt-12 h-80 bg-white/20 rounded-2xl border-3 border-dashed border-white/30 flex flex-col items-center justify-center fade-in">
          <MapPin className="w-12 h-12 text-cream-white mb-4" />
          <h3 className="heading-4 text-cream-white mb-2">Interactive Store Locator</h3>
          <p className="text-cream-white/80 mb-6">Click on any marker to view details</p>
          <div className="flex gap-8">
            <div className="w-6 h-6 bg-coral-pop rounded-full shadow-[0_0_0_8px_rgba(255,123,84,0.3),0_0_0_16px_rgba(255,123,84,0.1)] animate-marker-pulse" />
            <div
              className="w-6 h-6 bg-coral-pop rounded-full shadow-[0_0_0_8px_rgba(255,123,84,0.3),0_0_0_16px_rgba(255,123,84,0.1)] animate-marker-pulse"
              style={{ animationDelay: '0.3s' }}
            />
            <div
              className="w-6 h-6 bg-coral-pop rounded-full shadow-[0_0_0_8px_rgba(255,123,84,0.3),0_0_0_16px_rgba(255,123,84,0.1)] animate-marker-pulse"
              style={{ animationDelay: '0.6s' }}
            />
          </div>
        </div>

        <div className="text-center mt-8 text-cream-white fade-in">
          <p className="mb-4">
            Can't visit? Order via <strong>GrabFood</strong>, <strong>FoodPanda</strong>, or <strong>Deliveroo</strong>.
          </p>
          <RetroButton asChild>
            <a href="#order">Order Delivery</a>
          </RetroButton>
        </div>
      </div>

      {/* Wave Divider */}
      <div className="absolute bottom-0 left-0 right-0 h-20">
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="w-full h-full">
          <path d="M0,80 C480,20 960,100 1440,40 L1440,120 L0,120 Z" fill="#3D2B1F" />
        </svg>
      </div>
    </section>
  )
}

export { LocationsSection }
