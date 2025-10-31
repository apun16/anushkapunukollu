'use client';

import Navbar from "../../components/navbar";
import Footer from "../../components/footer";

export default function RabbitHoles() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-background, #ffffff)' }}>
      <main className="max-w-3xl mx-auto px-6 py-8">
        <Navbar currentPage="rabbit-holes" />
        
        <div className="mb-5">
          <h2 className="text-5xl font-light mb-4 leading-tight" style={{ fontFamily: 'Satoshi-Light, Satoshi-Variable, system-ui, sans-serif' }}>
            <span className="text-[var(--color-dark)] font-bold">rabbit holes</span>
          </h2>
          <p className="text-xl leading-relaxed max-w-2xl mb-2" style={{ fontFamily: 'Sora, system-ui, sans-serif', color: 'var(--color-foreground)' }}>
            work in progress :)
          </p>
        </div>

        <div className="mb-100">
          <h3 className="text-lg font-bold mb-4" style={{ fontFamily: 'Satoshi-Bold, Satoshi-Variable, system-ui, sans-serif', color: 'var(--color-foreground)' }}>
            current topics I&apos;m interested in 📜
          </h3>
          <ul className="space-y-2" style={{ fontFamily: 'Sora, system-ui, sans-serif' }}>
            <li className="flex items-start">
              <span className="mr-3 text-[var(--color-accent)] text-lg">•</span>
              <span className="text-base leading-relaxed" style={{ color: 'var(--color-foreground)' }}>dying languages</span>
            </li>
            <li className="flex items-start">
              <span className="mr-3 text-[var(--color-accent)] text-lg">•</span>
              <span className="text-base leading-relaxed" style={{ color: 'var(--color-foreground)' }}>how art historians use chemistry to date, authenticate, and catch forgeries</span>
            </li>
            <li className="flex items-start">
              <span className="mr-3 text-[var(--color-accent)] text-lg">•</span>
              <span className="text-base leading-relaxed" style={{ color: 'var(--color-foreground)' }}>ethics of progress</span>
            </li>
            <li className="flex items-start">
              <span className="mr-3 text-[var(--color-accent)] text-lg">•</span>
              <span className="text-base leading-relaxed" style={{ color: 'var(--color-foreground)' }}>the physical geography of the internet</span>
            </li>
            <li className="flex items-start">
              <span className="mr-3 text-[var(--color-accent)] text-lg">•</span>
              <span className="text-base leading-relaxed" style={{ color: 'var(--color-foreground)' }}>evolution of computing</span>
            </li>
            <li className="flex items-start">
              <span className="mr-3 text-[var(--color-accent)] text-lg">•</span>
              <span className="text-base leading-relaxed" style={{ color: 'var(--color-foreground)' }}>open source software</span>
            </li>
          </ul>
        </div>

        <div className="w-full mb-4">
          <hr style={{ borderColor: 'var(--color-border)' }} />
        </div>

        <Footer />
      </main>
    </div>
  );
}
