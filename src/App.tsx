import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Hero from './components/hero/Hero';
import MarqueeStrip from './components/hero/MarqueeStrip';
import ProblemSection from './components/sections/ProblemSection';
import HowItWorksTrustSection from './components/sections/HowItWorksTrustSection';
import CampusSection from './components/sections/CampusSection';
import SafetySection from './components/sections/SafetySection';
import FAQSection from './components/sections/FAQSection';
import JoinSection from './components/sections/JoinSection';

export function App() {
  return (
    <div className="min-h-screen bg-swap-bg text-swap-text flex flex-col selection:bg-swap-pink/30 selection:text-swap-primary overflow-x-hidden">
      {/* Sticky Pill-shaped Navigation */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Hero Section */}
        <Hero />

        {/* Slow Marquee Ribbon */}
        <MarqueeStrip />

        {/* 01 The Problem */}
        <ProblemSection />

        {/* 02 How It Works & Trust */}
        <HowItWorksTrustSection />

        {/* 03 Campus Tabs */}
        <CampusSection />

        {/* 04 Safety */}
        <SafetySection />

        {/* 05 FAQ */}
        <FAQSection />

        {/* Final Call to Action */}
        <JoinSection />
      </main>

      {/* Comprehensive Campus Footer */}
      <Footer />
    </div>
  );
}

export default App;

