import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import WhyItMatters from './components/WhyItMatters';
import CTA from './components/CTA';
import Footer from './components/Footer';
import { SpeedInsights } from '@vercel/speed-insights/react';

export default function App() {
  return (
    <div className="min-h-screen bg-surface text-text-primary">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <WhyItMatters />
        <CTA />
      </main>
      <Footer />
      <SpeedInsights />
    </div>
  );
}
