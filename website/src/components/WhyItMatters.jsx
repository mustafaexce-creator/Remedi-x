import { useEffect, useRef } from 'react';
import { ShieldCheck, TrendingUp, HeartHandshake, CheckCircle2 } from 'lucide-react';

const reasons = [
  {
    icon: <ShieldCheck size={22} />,
    title: 'First Impressions Matter',
    text: 'A weak website and slow responses quietly cost you business every single day.',
  },
  {
    icon: <TrendingUp size={22} />,
    title: 'Capture Every Lead',
    text: 'Missed calls and unanswered messages mean lost customers. We fix that.',
  },
  {
    icon: <HeartHandshake size={22} />,
    title: 'Better Customer Experience',
    text: 'Cleaner follow-up, faster responses, and systems that work while you sleep.',
  },
];

const bullets = ['Websites', 'Chatbots', 'Text & Email Systems', 'Forms & Intake'];

export default function WhyItMatters() {
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
    <section ref={sectionRef} id="why" className="relative py-28 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-surface via-navy/30 to-surface pointer-events-none" />
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple/8 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Side */}
          <div className="text-center lg:text-left">
            <p className="reveal opacity-0 text-purple font-semibold text-sm tracking-widest uppercase mb-4">
              Why It Matters
            </p>
            <h2 className="reveal opacity-0 delay-100 font-heading text-4xl sm:text-5xl font-bold text-text-primary mb-6 leading-tight">
              We help you make a{' '}
              <span className="bg-gradient-to-r from-purple to-purple-light bg-clip-text text-transparent">
                better first impression
              </span>{' '}
              and build a stronger system behind the scenes.
            </h2>
            <p className="reveal opacity-0 delay-200 text-text-secondary text-lg leading-relaxed mb-10 max-w-2xl mx-auto lg:mx-0">
              A weak website, missed calls, and slow responses can quietly cost you
              business. We build the digital infrastructure that keeps your pipeline
              healthy and your customers happy.
            </p>

            {/* Bullet List */}
            <div className="reveal opacity-0 delay-300 inline-block text-left">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                {bullets.map((item, i) => (
                  <div key={i} className="flex items-center gap-3 group">
                    <CheckCircle2
                      size={18}
                      className="text-purple flex-shrink-0 group-hover:scale-110 transition-transform"
                    />
                    <span className="text-text-primary text-sm font-medium group-hover:text-purple-light transition-colors">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side — Reason Cards */}
          <div className="flex flex-col gap-6">
            {reasons.map((reason, i) => (
              <div
                key={i}
                className={`reveal opacity-0 delay-${(i + 2) * 100} glass rounded-2xl p-6 hover:border-purple/25 transition-all duration-500 hover:-translate-y-1 hover:shadow-lg hover:shadow-purple/10 group`}
              >
                <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4">
                  <div className="w-11 h-11 rounded-xl bg-purple/10 border border-purple/15 flex items-center justify-center text-purple flex-shrink-0 group-hover:bg-purple/20 transition-all duration-300">
                    {reason.icon}
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-bold text-text-primary mb-2 group-hover:text-purple-light transition-colors">
                      {reason.title}
                    </h3>
                    <p className="text-text-secondary text-sm leading-relaxed">
                      {reason.text}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
