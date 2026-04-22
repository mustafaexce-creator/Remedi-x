import { useEffect, useRef } from 'react';
import { Globe, Bot, Workflow, ArrowUpRight } from 'lucide-react';

const services = [
  {
    icon: <Globe size={28} />,
    title: 'Website Creation & Redesign',
    description:
      'Professional websites that make your business look modern, trustworthy, and ready to grow. From landing pages to full web platforms.',
    features: ['Custom Design', 'Mobile-First', 'SEO Optimized', 'Fast Loading'],
  },
  {
    icon: <Bot size={28} />,
    title: 'AI Chatbots',
    description:
      'Guide visitors, answer questions, capture leads, and respond 24/7 on your website or social pages. Never miss a conversation again.',
    features: ['24/7 Support', 'Lead Capture', 'Multi-Platform', 'Smart Replies'],
  },
  {
    icon: <Workflow size={28} />,
    title: 'Business Automations',
    description:
      'Email follow-up, intake forms, text automations, and call-to-text systems that save time and keep your pipeline flowing.',
    features: ['Email Sequences', 'Text Automation', 'Intake Forms', 'Call-to-Text'],
  },
];

export default function Services() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('animate-fade-in-up');
        });
      },
      { threshold: 0.1 }
    );
    const items = sectionRef.current?.querySelectorAll('.reveal');
    items?.forEach((el) => observer.observe(el));
    return () => items?.forEach((el) => observer.unobserve(el));
  }, []);

  return (
    <section ref={sectionRef} id="services" className="relative py-28 overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-purple/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-20">
          <p className="reveal opacity-0 text-purple font-semibold text-sm tracking-widest uppercase mb-4">
            What We Help With
          </p>
          <h2 className="reveal opacity-0 delay-100 font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-text-primary mb-6">
            Simple Systems.{' '}
            <span className="bg-gradient-to-r from-purple to-purple-light bg-clip-text text-transparent">
              Real Results.
            </span>
          </h2>
          <p className="reveal opacity-0 delay-200 max-w-xl mx-auto text-text-secondary text-lg">
            Perfect for businesses that want to grow without doing everything manually.
          </p>
        </div>

        {/* Service Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <div
              key={i}
              className={`reveal opacity-0 delay-${(i + 2) * 100} group relative glass rounded-3xl p-8 hover:border-purple/30 transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl hover:shadow-purple/10`}
            >
              {/* Glow on hover */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-purple/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <div className="relative z-10">
                {/* Icon */}
                <div className="w-14 h-14 rounded-2xl bg-purple/10 border border-purple/20 flex items-center justify-center text-purple mb-6 group-hover:bg-purple/20 group-hover:scale-110 transition-all duration-300">
                  {service.icon}
                </div>

                {/* Title */}
                <h3 className="font-heading text-xl font-bold text-text-primary mb-4 group-hover:text-purple-light transition-colors duration-300">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-text-secondary text-sm leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* Feature Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {service.features.map((feat, j) => (
                    <span
                      key={j}
                      className="px-3 py-1 rounded-full text-xs font-medium bg-purple/8 text-purple-light border border-purple/10"
                    >
                      {feat}
                    </span>
                  ))}
                </div>

                {/* Link */}
                <a
                  href="#contact"
                  className="inline-flex items-center gap-1 text-sm font-semibold text-purple hover:text-purple-light transition-colors group/link"
                >
                  Learn more
                  <ArrowUpRight
                    size={14}
                    className="transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
                  />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
