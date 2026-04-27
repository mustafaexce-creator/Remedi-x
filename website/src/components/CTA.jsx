import { useState, useEffect, useRef } from 'react';
import { ArrowRight, Sparkles, CheckCircle2, Loader2, AlertCircle } from 'lucide-react';

// The actual URL from Google Apps Script after deployment
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzcLnb5YwPrbJcNKcFQg3pVuhJdKnkyf828yBQkFsUSXzfbi4I2uip0Twitu5My1_04/exec';

export default function CTA() {
  const sectionRef = useRef(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [status, setStatus] = useState('idle'); // 'idle' | 'submitting' | 'success' | 'error'

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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id.replace('cta-', '')]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status === 'submitting') return;

    setStatus('submitting');

    try {
      const formBody = new FormData();
      for (const key in formData) {
        formBody.append(key, formData[key]);
      }

      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        body: formBody,
        mode: 'no-cors' // Required for basic Google Apps Script web apps
      });

      // Since mode is no-cors, we can't read the response. We assume success if fetch didn't throw.
      setStatus('success');
      setFormData({ name: '', email: '', phone: '', message: '' });

      // Reset success message after 5 seconds
      setTimeout(() => {
        setStatus('idle');
      }, 5000);

    } catch (error) {
      console.error('Error submitting form:', error);
      setStatus('error');

      setTimeout(() => {
        setStatus('idle');
      }, 5000);
    }
  };

  return (
    <section ref={sectionRef} id="contact" className="relative py-28 overflow-hidden">
      {/* Background glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-purple/8 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {/* Badge */}
        <div className="reveal opacity-0 inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-xs font-medium text-purple-light mb-8">
          <Sparkles size={14} />
          Ready to upgrade your business?
        </div>

        <h2 className="reveal opacity-0 delay-100 font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-text-primary mb-6 leading-tight">
          Let&apos;s Build Something{' '}
          <span className="bg-gradient-to-r from-purple to-purple-light bg-clip-text text-transparent">
            That Works
          </span>
        </h2>

        <p className="reveal opacity-0 delay-200 max-w-2xl mx-auto text-text-secondary text-lg mb-12">
          Simple systems. Cleaner follow-up. Better customer experience.
          Get in touch and let&apos;s talk about what your business needs.
        </p>

        {/* CTA Card */}
        <div className="reveal opacity-0 delay-300 glass-strong rounded-3xl p-10 sm:p-14 max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                id="cta-name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
                className="w-full px-5 py-4 rounded-xl bg-navy/60 border border-border text-text-primary placeholder:text-text-muted text-sm focus:outline-none focus:border-purple/50 focus:ring-2 focus:ring-purple/20 transition-all duration-300"
              />
              <input
                type="email"
                id="cta-email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="Your email"
                className="w-full px-5 py-4 rounded-xl bg-navy/60 border border-border text-text-primary placeholder:text-text-muted text-sm focus:outline-none focus:border-purple/50 focus:ring-2 focus:ring-purple/20 transition-all duration-300"
              />
            </div>
            <input
              type="tel"
              id="cta-phone"
              required
              value={formData.phone}
              onChange={handleChange}
              placeholder="Your phone number"
              className="w-full px-5 py-4 rounded-xl bg-navy/60 border border-border text-text-primary placeholder:text-text-muted text-sm focus:outline-none focus:border-purple/50 focus:ring-2 focus:ring-purple/20 transition-all duration-300"
            />
            <textarea
              id="cta-message"
              required
              rows={4}
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell us about your project..."
              className="w-full px-5 py-4 rounded-xl bg-navy/60 border border-border text-text-primary placeholder:text-text-muted text-sm focus:outline-none focus:border-purple/50 focus:ring-2 focus:ring-purple/20 transition-all duration-300 resize-none"
            />

            {status === 'success' && (
              <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center gap-2 text-green-600 text-sm font-medium animate-fade-in-up">
                <CheckCircle2 size={18} />
                Message sent successfully! We'll be in touch soon.
              </div>
            )}

            {status === 'error' && (
              <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center gap-2 text-red-600 text-sm font-medium animate-fade-in-up">
                <AlertCircle size={18} />
                Something went wrong. Please try again or email us directly.
              </div>
            )}

            <button
              type="submit"
              disabled={status === 'submitting'}
              className="group w-full inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base font-semibold bg-purple text-white hover:bg-purple-light transition-all duration-300 hover:shadow-xl hover:shadow-purple/30 hover:-translate-y-0.5 disabled:opacity-70 disabled:hover:translate-y-0 disabled:hover:shadow-none"
            >
              {status === 'submitting' ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  Send Message
                  <ArrowRight
                    size={18}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

