import { useEffect, useRef } from 'react';
import { ArrowRight, Zap, Users, Clock } from 'lucide-react';

export default function Hero() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up');
          }
        });
      },
      { threshold: 0.1 }
    );
    const items = sectionRef.current?.querySelectorAll('.reveal');
    items?.forEach((el) => observer.observe(el));
    return () => items?.forEach((el) => observer.unobserve(el));
  }, []);

  const stats = [
    { icon: <Zap size={20} />, label: 'More Leads', value: '3x' },
    { icon: <Clock size={20} />, label: 'Faster Follow-Up', value: '24/7' },
    { icon: <Users size={20} />, label: 'Less Manual Work', value: '80%' },
  ];

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden"
    >
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-purple/10 rounded-full blur-[120px] animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-purple-dark/15 rounded-full blur-[100px] animate-float delay-300" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple/5 rounded-full blur-[150px]" />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(145,71,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(145,71,255,0.3) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        {/* Badge */}
        <div className="reveal opacity-0 inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-xs font-medium text-purple-light mb-8 hover:border-purple/30 transition-all duration-300">
          <span className="w-2 h-2 bg-purple rounded-full animate-pulse" />
          Website Creation • Chatbots • Business Automations
        </div>

        {/* Heading */}
        <h1 className="reveal opacity-0 delay-100 font-heading text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-extrabold leading-[1.05] tracking-tight mb-8">
          <span className="block text-text-primary">Turn Missed</span>
          <span className="block text-text-primary">Opportunities Into</span>
          <span className="block bg-gradient-to-r from-purple via-purple-light to-purple bg-clip-text text-transparent animate-gradient">
            Customers
          </span>
        </h1>

        {/* Subheading */}
        <p className="reveal opacity-0 delay-200 max-w-2xl mx-auto text-lg sm:text-xl text-text-secondary leading-relaxed mb-12">
          Build a stronger business presence with systems that help you respond
          faster, capture more leads, and save hours of manual work.
        </p>

        {/* CTA Buttons */}
        <div className="reveal opacity-0 delay-300 flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
          <a
            href="#contact"
            id="hero-cta-primary"
            className="group inline-flex items-center gap-2 px-8 py-4 rounded-full text-base font-semibold bg-purple text-white hover:bg-purple-light transition-all duration-300 hover:shadow-xl hover:shadow-purple/30 hover:-translate-y-1 animate-pulse-glow"
          >
            Get Your Free Consultation
            <ArrowRight
              size={18}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </a>
          <a
            href="#services"
            id="hero-cta-secondary"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-base font-semibold glass text-text-primary hover:border-purple/40 hover:text-purple-light transition-all duration-300 hover:-translate-y-1"
          >
            See What We Do
          </a>
        </div>

        {/* Stats */}
        <div className="reveal opacity-0 delay-400 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="glass rounded-2xl p-6 hover:border-purple/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-lg hover:shadow-purple/10 group"
            >
              <div className="flex items-center justify-center gap-2 mb-2">
                <span className="text-purple group-hover:text-purple-light transition-colors">
                  {stat.icon}
                </span>
                <span className="text-3xl font-bold font-heading text-text-primary">
                  {stat.value}
                </span>
              </div>
              <p className="text-sm text-text-secondary">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-surface to-transparent" />
    </section>
  );
}
