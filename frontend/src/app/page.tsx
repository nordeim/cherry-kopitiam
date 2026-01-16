'use client'

import * as React from 'react'
import { Header } from '@/components/layout/header'
import { Hero } from '@/components/sections/hero'
import { MenuSection } from '@/components/sections/menu-section'
import { HeritageSection } from '@/components/sections/heritage-section'
import { LocationsSection } from '@/components/sections/locations-section'
import { Footer } from '@/components/layout/footer'

export default function HomePage() {
  // Intersection Observer for scroll animations
  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    )

    document.querySelectorAll('.fade-in').forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <main id="main-content">
      <Header />
      <Hero />
      <MenuSection />
      <HeritageSection />
      <LocationsSection />
      <Footer />
    </main>
  )
}
