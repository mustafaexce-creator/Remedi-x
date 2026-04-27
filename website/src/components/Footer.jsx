import { Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const links = [
    { label: 'Services', href: '#services' },
    { label: 'Why Us', href: '#why' },
    { label: 'Our Work', href: '#work' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <footer className="relative border-t border-border/30 bg-navy/30">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <a href="#" className="inline-block mb-5">
              <img
                src="/remedix-logo.svg"
                alt="Remedi-X Solutions"
                className="h-10"
              />
            </a>
            <p className="text-text-secondary text-sm leading-relaxed max-w-xs">
              Turn missed opportunities into customers with professional websites,
              AI chatbots, and smart business automations.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading text-sm font-bold text-text-primary uppercase tracking-wider mb-5">
              Quick Links
            </h4>
            <ul className="flex flex-col gap-3">
              {links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-text-secondary hover:text-purple-light transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-heading text-sm font-bold text-text-primary uppercase tracking-wider mb-5">
              Get In Touch
            </h4>
            <ul className="flex flex-col gap-4">
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-purple flex-shrink-0" />
                <span className="text-sm text-text-secondary">Mamoon@remedixsolutions.com</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-purple flex-shrink-0" />
                <span className="text-sm text-text-secondary">Contact us for a quote</span>
              </li>
              <li className="flex items-center gap-3">
                <MapPin size={16} className="text-purple flex-shrink-0" />
                <span className="text-sm text-text-secondary">Remote — Serving businesses everywhere</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border/20 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-text-muted">
            &copy; {currentYear} Remedi-X Solutions. All rights reserved.
          </p>
          <p className="text-xs text-text-muted">
            Designed with <span className="text-purple">♥</span> by Remedi-X
          </p>
        </div>
      </div>
    </footer>
  );
}
