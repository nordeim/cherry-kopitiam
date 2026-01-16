'use client'

import * as React from 'react'
import { Star } from 'lucide-react'
import { RetroButton } from '@/components/ui/retro/button'

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center bg-gradient-sunrise overflow-hidden pt-20">
      {/* Sunburst Background */}
      <div
        className="absolute inset-0 opacity-60 animate-slow-rotate"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 800'%3E%3Cdefs%3E%3ClinearGradient id='sb' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23E8A857;stop-opacity:0.15'/%3E%3Cstop offset='100%25' style='stop-color:%23D4693B;stop-opacity:0.08'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cg fill='url(%23sb)'%3E%3Cpath d='M400 0L420 380L400 400L380 380Z'/%3E%3Cpath d='M400 0L420 380L400 400L380 380Z' transform='rotate(15 400 400)'/%3E%3Cpath d='M400 0L420 380L400 400L380 380Z' transform='rotate(30 400 400)'/%3E%3Cpath d='M400 0L420 380L400 400L380 380Z' transform='rotate(45 400 400)'/%3E%3Cpath d='M400 0L420 380L400 400L380 380Z' transform='rotate(60 400 400)'/%3E%3Cpath d='M400 0L420 380L400 400L380 380Z' transform='rotate(75 400 400)'/%3E%3Cpath d='M400 0L420 380L400 400L380 380Z' transform='rotate(90 400 400)'/%3E%3Cpath d='M400 0L420 380L400 400L380 380Z' transform='rotate(105 400 400)'/%3E%3Cpath d='M400 0L420 380L400 400L380 380Z' transform='rotate(120 400 400)'/%3E%3Cpath d='M400 0L420 380L400 400L380 380Z' transform='rotate(135 400 400)'/%3E%3Cpath d='M400 0L420 380L400 400L380 380Z' transform='rotate(150 400 400)'/%3E%3Cpath d='M400 0L420 380L400 400L380 380Z' transform='rotate(165 400 400)'/%3E%3Cpath d='M400 0L420 380L400 400L380 380Z' transform='rotate(180 400 400)'/%3E%3Cpath d='M400 0L420 380L400 400L380 380Z' transform='rotate(195 400 400)'/%3E%3Cpath d='M400 0L420 380L400 400L380 380Z' transform='rotate(210 400 400)'/%3E%3Cpath d='M400 0L420 380L400 400L380 380Z' transform='rotate(225 400 400)'/%3E%3Cpath d='M400 0L420 380L400 400L380 380Z' transform='rotate(240 400 400)'/%3E%3Cpath d='M400 0L420 380L400 400L380 380Z' transform='rotate(255 400 400)'/%3E%3Cpath d='M400 0L420 380L400 400L380 380Z' transform='rotate(270 400 400)'/%3E%3Cpath d='M400 0L420 380L400 400L380 380Z' transform='rotate(285 400 400)'/%3E%3Cpath d='M400 0L420 380L400 400L380 380Z' transform='rotate(300 400 400)'/%3E%3Cpath d='M400 0L420 380L400 400L380 380Z' transform='rotate(315 400 400)'/%3E%3Cpath d='M400 0L420 380L400 400L380 380Z' transform='rotate(330 400 400)'/%3E%3Cpath d='M400 0L420 380L400 400L380 380Z' transform='rotate(345 400 400)'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '800px 800px',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />

      {/* Decorative Circles */}
      <div
        className="absolute top-1/4 right-[-10%] w-[600px] h-[600px] opacity-40 rounded-full"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='40' fill='none' stroke='%23E8A857' stroke-width='1' opacity='0.1'/%3E%3Ccircle cx='50' cy='50' r='30' fill='none' stroke='%23D4693B' stroke-width='1' opacity='0.08'/%3E%3Ccircle cx='50' cy='50' r='20' fill='none' stroke='%23C68642' stroke-width='1' opacity='0.06'/%3E%3C/svg%3E")`,
          backgroundSize: '100px 100px',
        }}
      />

      <div className="container relative z-10">
        <div className="max-w-2xl fade-in">
          {/* Badge */}
          <div className="inline-flex items-center gap-3 bg-espresso-dark text-cream-white px-5 py-3 rounded-full font-display font-semibold text-sm mb-6 shadow-lg border-2 border-dashed border-sunrise-amber">
            <Star className="w-5 h-5 fill-sunrise-amber text-sunrise-amber" />
            <span>Est. 1973 • Singapore Heritage</span>
          </div>

          {/* Title */}
          <h1 className="heading-1 mb-6">
            Where Singapore's{' '}
            <span className="text-terracotta-warm italic block">
              Morning Ritual
            </span>{' '}
            Begins
          </h1>

          {/* Subtitle */}
          <p className="text-xl text-mocha-medium mb-8 max-w-lg">
            Experience the perfect blend of tradition and modernity in every cup. 
            Crafted with love since 1973, our kopi tells the story of Singapore's 
            kopitiam heritage.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 mb-12">
            <RetroButton size="lg" asChild>
              <a href="#menu">Explore Menu</a>
            </RetroButton>
            <RetroButton variant="secondary" size="lg" asChild>
              <a href="#order">Order Online</a>
            </RetroButton>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 pt-8 border-t-2 border-dashed border-cinnamon-glow">
            <div className="text-center">
              <span className="block font-display text-4xl md:text-5xl font-bold text-terracotta-warm">
                50+
              </span>
              <span className="text-sm font-semibold text-mocha-medium uppercase tracking-wider">
                Years of Craft
              </span>
            </div>
            <div className="text-center">
              <span className="block font-display text-4xl md:text-5xl font-bold text-terracotta-warm">
                1000+
              </span>
              <span className="text-sm font-semibold text-mocha-medium uppercase tracking-wider">
                Daily Brews
              </span>
            </div>
            <div className="text-center">
              <span className="block font-display text-4xl md:text-5xl font-bold text-terracotta-warm">
                3
              </span>
              <span className="text-sm font-semibold text-mocha-medium uppercase tracking-wider">
                Locations
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Coffee Cup Illustration */}
      <div
        className="absolute right-[5%] bottom-[10%] w-48 md:w-80 animate-gentle-float hidden lg:block"
        aria-hidden="true"
      >
        <svg viewBox="0 0 200 220" xmlns="http://www.w3.org/2000/svg">
          {/* Steam */}
          <g transform="translate(100, 20)">
            <circle className="animate-steam-rise" cx="-15" cy="0" r="6" fill="#FFF8E7" opacity="0.6" />
            <circle className="animate-steam-rise" cx="0" cy="-10" r="8" fill="#FFF8E7" opacity="0.5" style={{ animationDelay: '0.3s' }} />
            <circle className="animate-steam-rise" cx="15" cy="0" r="5" fill="#FFF8E7" opacity="0.6" style={{ animationDelay: '0.6s' }} />
          </g>
          {/* Cup Body */}
          <path d="M30 70 L40 180 Q100 200 160 180 L170 70" fill="#3D2B1F" />
          {/* Cup Top */}
          <ellipse cx="100" cy="70" rx="60" ry="15" fill="#6B4423" />
          <ellipse cx="100" cy="70" rx="55" ry="12" fill="#D4693B" />
          {/* Handle */}
          <path d="M165 90 Q200 90 200 130 Q200 170 165 170" fill="none" stroke="#3D2B1F" strokeWidth="12" strokeLinecap="round" />
          {/* Decorative Band */}
          <path d="M35 120 L165 120" stroke="#E8A857" strokeWidth="4" strokeDasharray="10 5" />
        </svg>
      </div>

      {/* Wave Divider */}
      <div className="absolute bottom-0 left-0 right-0 h-20">
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="w-full h-full">
          <path
            d="M0,64 C480,150 960,0 1440,64 L1440,120 L0,120 Z"
            fill="#D4693B"
          />
        </svg>
      </div>
    </section>
  )
}

export { Hero }
