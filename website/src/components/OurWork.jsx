import { useEffect, useRef } from 'react';
import { ExternalLink, Globe, ArrowUpRight } from 'lucide-react';

const projects = [
  {
    title: 'Everlast Fences',
    tagline: 'Built Strong. Styled for Life.',
    description:
      'Expert exterior contracting specializing in premium fencing, decks, and concrete work for homes and businesses across WNY.',
    url: 'https://everlastfences.com',
    image: '/work-everlast.png',
  },
  {
    title: 'Buffalo Bargains',
    tagline: 'The Hunt is On.',
    description:
      'A premier liquidation outlet offering a unique bin-store shopping experience with daily price drops on name-brand electronics and home goods.',
    url: 'https://buffalobargains.com',
    image: '/work-buffalo.png',
  },
];

function ProjectCard({ project, index }) {
  return (
    <div className={`reveal opacity-0 delay-${(index + 2) * 100} group`}>
      {/* Browser Window Chrome */}
      <a
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        className="block relative rounded-2xl overflow-hidden border border-border/60 shadow-xl shadow-purple/5 transition-all duration-700 group-hover:shadow-2xl group-hover:shadow-purple/15 group-hover:-translate-y-3"
      >
        {/* Title Bar */}
        <div className="bg-navy-light/80 backdrop-blur-sm px-4 py-3 flex items-center gap-3 border-b border-border/40">
          {/* Traffic Lights */}
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-400/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-400/80" />
            <div className="w-3 h-3 rounded-full bg-green-400/80" />
          </div>
          {/* URL Bar */}
          <div className="flex-1 flex items-center gap-2 bg-white/60 rounded-lg px-3 py-1.5 text-xs text-text-muted font-mono">
            <Globe size={12} className="text-purple/60 flex-shrink-0" />
            <span className="truncate">{project.url.replace('https://', '')}</span>
          </div>
          {/* External Link Icon */}
          <ExternalLink size={12} className="text-purple/50 group-hover:text-purple transition-colors" />
        </div>

        {/* Screenshot */}
        <div className="relative w-full aspect-[16/9] overflow-hidden bg-navy-light">
          <img
            src={project.image}
            alt={`${project.title} website hero section`}
            className="w-full h-full object-cover object-top block transition-transform duration-[1.5s] ease-out group-hover:scale-105"
            loading="lazy"
          />
          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end justify-center pb-8">
            <span className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/95 text-sm font-semibold text-text-primary shadow-lg backdrop-blur-sm">
              Visit Live Site
              <ArrowUpRight size={16} className="text-purple" />
            </span>
          </div>
        </div>
      </a>

      {/* Project Info */}
      <div className="mt-6 px-1">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-3">
          <h3 className="font-heading text-xl font-bold text-text-primary">
            {project.title}
          </h3>
          <span className="text-sm font-medium text-text-muted italic">
            — {project.tagline}
          </span>
        </div>
        <p className="text-text-secondary text-sm leading-relaxed mb-4">
          {project.description}
        </p>
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-purple hover:text-purple-light transition-colors group/link"
        >
          Visit {project.title}
          <ArrowUpRight
            size={14}
            className="transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
          />
        </a>
      </div>
    </div>
  );
}

export default function OurWork() {
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
    <section ref={sectionRef} id="work" className="relative py-28 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-purple/5 rounded-full blur-[150px] -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-purple-dark/8 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-20">
          <p className="reveal opacity-0 text-purple font-semibold text-sm tracking-widest uppercase mb-4">
            Our Work
          </p>
          <h2 className="reveal opacity-0 delay-100 font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-text-primary mb-6">
            Projects That{' '}
            <span className="bg-gradient-to-r from-purple to-purple-light bg-clip-text text-transparent">
              Speak for Themselves
            </span>
          </h2>
          <p className="reveal opacity-0 delay-200 max-w-xl mx-auto text-text-secondary text-lg">
            Real businesses. Real results. See what we&apos;ve built for our clients.
          </p>
        </div>

        {/* Project Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {projects.map((project, i) => (
            <ProjectCard key={i} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
