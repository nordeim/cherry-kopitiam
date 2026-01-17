'use client'

import * as React from 'react'
import { RetroButton } from '@/components/ui/retro/button'

const HeritageSection = () => {
  return (
    <section id="heritage" className="relative bg-sunrise-amber section">
      {/* Wood Grain Texture */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(61, 43, 31, 0.03) 2px, rgba(61, 43, 31, 0.03) 4px)`,
        }}
      />

      <div className="container relative z-10">
        <div className="text-center mb-12 fade-in">
          <h2 className="heading-2 mb-3 text-espresso-dark">Our Kopitiam Heritage</h2>
          <p className="text-lg text-mocha-medium max-w-md mx-auto">
            Preserving Singapore&apos;s coffee culture since 1973
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="fade-in">
            <p className="text-xl text-espresso-dark leading-relaxed mb-6">
              <span className="float-left font-display text-6xl font-bold text-terracotta-warm leading-[0.8] mr-3 mt-[-4px]">
                I
              </span>
              n 1973, Uncle Lim opened his first kopitiam stall at Tiong Bahru Market. 
              With nothing but a trusty coffee sock, a worn marble table, and recipes 
              passed down through generations, he began serving what would become 
              Singapore&apos;s most beloved morning ritual.
            </p>

            {/* Quote */}
            <div className="bg-white/30 rounded-xl p-8 my-8 relative border-3 border-dashed border-terracotta-warm">
              <span className="absolute -top-6 left-6 font-display text-8xl text-terracotta-warm opacity-50 leading-none">
                &quot;
              </span>
              <blockquote className="font-display text-xl italic text-espresso-dark leading-relaxed mb-4">
                &quot;The kopitiam is more than just a place to drink coffee. It&apos;s where 
                lawyers and laborers sit side by side, where deals are made and 
                friendships are forged over steaming cups of kopi.&quot;
              </blockquote>
              <footer className="font-bold text-terracotta-warm">
                — Uncle Lim, Founder
              </footer>
            </div>

            <p className="text-espresso-dark leading-relaxed mb-8">
              Today, Morning Brew Collective honors that legacy. Our coffee beans 
              are still roasted in small batches using Uncle Lim&apos;s original 1970s 
              roaster. Our kaya is made fresh daily. Every cup tells a story of 
              Singapore&apos;s multicultural soul.
            </p>

            {/* Values */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { icon: '☕', title: 'Authentic Recipes', desc: "Uncle Lim's 1973 recipes" },
                { icon: '🤝', title: 'Community First', desc: 'Three generations served' },
                { icon: '🌱', title: 'Sustainable', desc: 'ASEAN farmer partnerships' },
              ].map((value) => (
                <div key={value.title} className="text-center p-4 bg-white/20 rounded-xl">
                  <div className="text-4xl mb-2">{value.icon}</div>
                  <h4 className="font-display font-bold text-espresso-dark text-sm mb-1">{value.title}</h4>
                  <p className="text-xs text-mocha-medium">{value.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Gallery - Polaroid Style */}
          <div className="grid grid-cols-2 gap-4 fade-in">
            {[
              { year: '1973', caption: "Uncle Lim's first stall" },
              { year: '1980s', caption: 'Vintage cup collection' },
              { year: 'Today', caption: 'Modern Tiong Bahru café', fullWidth: true },
            ].map((photo, i) => (
              <div
                key={photo.year}
                className={`bg-cream-white p-3 pb-8 rounded-md shadow-lg hover:rotate-0 hover:scale-105 transition-all duration-300 ${
                  photo.fullWidth ? 'col-span-2' : ''
                } ${i === 0 ? '-rotate-2' : i === 1 ? 'rotate-3' : '-rotate-1'}`}
              >
                <div
                  className={`bg-gradient-to-br from-honey-light to-cinnamon-glow rounded-sm flex items-center justify-center text-mocha-medium font-display font-bold ${
                    photo.fullWidth ? 'h-40 text-4xl' : 'h-32 text-3xl'
                  }`}
                >
                  {photo.year}
                </div>
                <p className="text-center font-display text-sm text-mocha-medium mt-3">
                  {photo.caption}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 bg-espresso-dark text-cream-white rounded-2xl p-10 text-center fade-in">
          <h3 className="heading-3 mb-3 text-cream-white">Join Our Morning Tradition</h3>
          <p className="opacity-90 max-w-md mx-auto mb-6">
            Experience the authentic kopitiam culture. Every visit includes a 
            complimentary taste of our signature kaya.
          </p>
          <RetroButton variant="secondary" asChild>
            <a href="#locations">Visit Us Today</a>
          </RetroButton>
        </div>
      </div>

      {/* Wave Divider */}
      <div className="absolute bottom-0 left-0 right-0 h-20">
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="w-full h-full">
          <path d="M0,40 C360,120 720,0 1080,80 C1260,120 1380,60 1440,40 L1440,120 L0,120 Z" fill="#8FA68A" />
        </svg>
      </div>
    </section>
  )
}

export { HeritageSection }