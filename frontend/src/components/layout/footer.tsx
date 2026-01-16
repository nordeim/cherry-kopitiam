import * as React from 'react'
import { Phone, Mail, Clock, ArrowRight } from 'lucide-react'

const Footer = () => {
  return (
    <footer id="footer" className="bg-espresso-dark text-cream-white pt-16 relative">
      {/* Decorative Border */}
      <div
        className="absolute top-0 left-0 right-0 h-2"
        style={{
          background: `repeating-linear-gradient(90deg, 
            var(--color-sunrise-amber) 0px, 
            var(--color-sunrise-amber) 20px, 
            var(--color-terracotta-warm) 20px, 
            var(--color-terracotta-warm) 40px, 
            var(--color-coral-pop) 40px, 
            var(--color-coral-pop) 60px
          )`,
        }}
      />

      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* About */}
          <div className="fade-in">
            <h3 className="font-display text-lg font-bold text-sunrise-amber mb-4">
              About Us
            </h3>
            <p className="opacity-80 leading-relaxed">
              Since 1973, Morning Brew Collective has been serving Singapore's 
              best traditional kopitiam experience. Our recipes honor generations 
              of heritage.
            </p>
          </div>

          {/* Quick Links */}
          <div className="fade-in">
            <h3 className="font-display text-lg font-bold text-sunrise-amber mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {[
                { href: '#menu', label: '→ Menu' },
                { href: '#heritage', label: '→ Our Heritage' },
                { href: '#locations', label: '→ Locations' },
                { href: '#order', label: '→ Order Online' },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="opacity-80 hover:opacity-100 hover:text-sunrise-amber transition-all flex items-center gap-2 group"
                  >
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="fade-in">
            <h3 className="font-display text-lg font-bold text-sunrise-amber mb-4">
              Contact Us
            </h3>
            <ul className="space-y-3 opacity-80">
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5" />
                <span>+65 6789 1234</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5" />
                <span>hello@morningbrew.sg</span>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="w-5 h-5" />
                <span>Daily: 7AM - 8PM</span>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div className="fade-in">
            <h3 className="font-display text-lg font-bold text-sunrise-amber mb-4">
              Follow Us
            </h3>
            <div className="flex gap-3">
              {['FB', 'IG', 'TT'].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-sm font-bold hover:bg-sunrise-amber hover:text-espresso-dark transition-all hover:-translate-y-1"
                  aria-label={social === 'FB' ? 'Facebook' : social === 'IG' ? 'Instagram' : 'TikTok'}
                >
                  {social}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 py-6 text-center">
          <p className="opacity-60 text-sm mb-4">
            © 2026 Morning Brew Collective. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {['Halal Certified', 'Singapore Brand', 'Est. 1973'].map((badge) => (
              <span
                key={badge}
                className="text-xs px-4 py-2 bg-white/10 rounded-full opacity-80"
              >
                {badge}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

export { Footer }
