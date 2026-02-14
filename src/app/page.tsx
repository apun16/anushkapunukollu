import Image from "next/image";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

export default function Home() {
  return (
    <div className="min-h-screen geometric-pattern" style={{ backgroundColor: 'var(--color-background, #ffffff)' }}>
      <main className="max-w-5xl mx-auto px-6 py-8">
        <Navbar currentPage="home" />
        
        <div className="mb-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
            <h1 className="text-5xl font-light leading-tight" style={{ fontFamily: 'Satoshi-Light, Satoshi-Variable, system-ui, sans-serif' }}>
              Hi, I&apos;m <span className="text-[var(--color-dark)] font-bold">Anushka.</span>
            </h1>
          </div>
          <p className="text-xl leading-relaxed w-full" style={{ fontFamily: 'Sora, system-ui, sans-serif', color: 'var(--color-foreground)' }}>
              Student at UWaterloo exploring the intersection of finance, product, and tech. I focus on using technology to make information, tools, and systems more accessible.
          </p>
        </div>
        <div className="mb-4">
          <h2 className="text-xl font-bold mb-2" style={{ fontFamily: 'Satoshi-Bold, Satoshi-Variable, system-ui, sans-serif' }}>
            <span className="text-[var(--color-primary)]">CURRENTLY</span>
          </h2>
          <div className="space-y-2">
            <div className="flex items-start gap-4">
              <span className="text-[var(--color-accent)] text-base mt-1 font-mono font-semibold">01</span>
              <div>
                <p className="text-lg leading-relaxed" style={{ fontFamily: 'Sora, system-ui, sans-serif' }}>
                  Computer Science @ <a href="https://uwaterloo.ca" target="_blank" rel="noopener noreferrer" className="underline underline-offset-6 hover:bg-[var(--color-light)] transition-all duration-300 rounded-sm highlight-reveal">University of Waterloo</a> as a Ted Rogers Future Leader Scholar
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <span className="text-[var(--color-secondary)] text-base mt-1 font-mono font-semibold">02</span>
              <div>
                <p className="text-lg leading-relaxed" style={{ fontFamily: 'Sora, system-ui, sans-serif' }}>
                  spending time <a href="https://devpost.com/anushka16" target="_blank" rel="noopener noreferrer" className="underline underline-offset-6 hover:bg-[var(--color-light)] transition-all duration-300 rounded-sm highlight-reveal">hacking</a> + <a href="https://cemc.uwaterloo.ca/sites/default/files/documents/2025/ciw_summary.pdf" target="_blank" rel="noopener noreferrer" className="underline underline-offset-6 hover:bg-[var(--color-light)] transition-all duration-300 rounded-sm highlight-reveal">competitive programming</a> + going down rabbit holes about random ideas at 3AM
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-5">
          <h2 className="text-xl font-bold mb-4" style={{ fontFamily: 'Satoshi-Bold, Satoshi-Variable, system-ui, sans-serif' }}>
            <span className="text-[var(--color-primary)]">IN THE PAST</span>
          </h2>
          <div className="space-y-3">
            <div className="flex items-start gap-4">
              <span className="text-[var(--color-accent)] text-base mt-1 font-mono font-semibold">01</span>
              <div>
                <p className="text-lg leading-relaxed" style={{ fontFamily: 'Sora, system-ui, sans-serif' }}>
                  developed tools that distribute multilingual content for some of my favourite creators @ <a href="https://www.aviewint.com/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-6 hover:bg-[var(--color-light)] transition-all duration-300 rounded-sm highlight-reveal">Aview International</a>
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <span className="text-[var(--color-accent)] text-base mt-1 font-mono font-semibold">02</span>
              <div>
                <p className="text-lg leading-relaxed" style={{ fontFamily: 'Sora, system-ui, sans-serif' }}>
                  was a future tech intern @ <a href="https://www.nokia.com/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-6 hover:bg-[var(--color-light)] transition-all duration-300 rounded-sm highlight-reveal">Nokia</a> on their NSP Analytics team
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <span className="text-[var(--color-primary)] text-base mt-1 font-mono font-semibold">03</span>
              <div>
                <p className="text-lg leading-relaxed" style={{ fontFamily: 'Sora, system-ui, sans-serif' }}>
                  built a biodegradable hydrogel using sugarcane bagasse to help revitalize degraded soil; created to find an alternative to chemical fertilizers <a href="https://marginalrevolution.com/marginalrevolution/2025/11/emergent-ventures-india-13th-cohort.html" target="_blank" rel="noopener noreferrer" className="underline underline-offset-6 hover:bg-[var(--color-light)] transition-all duration-300 rounded-sm highlight-reveal">[backed by Emergent Ventures]</a>.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <span className="text-[var(--color-secondary)] text-base mt-1 font-mono font-semibold">04</span>
              <div>
                <p className="text-lg leading-relaxed" style={{ fontFamily: 'Sora, system-ui, sans-serif' }}>
                  led 2 national financial literacy non-profits: <a href="http://fusesociety.ca/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-6 hover:bg-[var(--color-light)] transition-all duration-300 rounded-sm highlight-reveal">the FUSE Society</a> & <a href="https://targetalpha.ca/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-6 hover:bg-[var(--color-light)] transition-all duration-300 rounded-sm highlight-reveal">Target Alpha</a>. collectively reached 10,000 high school students & partnered with TD, Binance, + more!
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <span className="text-[var(--color-light)] text-base mt-1 font-mono font-semibold">05</span>
              <div>
                <p className="text-lg leading-relaxed" style={{ fontFamily: 'Sora, system-ui, sans-serif' }}>
                  photographed objects in daily life + awarded by the <a href="https://www.artandwriting.org/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-6 hover:bg-[var(--color-light)] transition-all duration-300 rounded-sm highlight-reveal">Scholastic Art & Writing Awards</a>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <a 
            href="/portfolio" 
            className="group inline-flex items-center justify-center px-6 py-3 rounded-none transition-colors duration-200 text-base font-medium tracking-wide bg-[var(--color-accent)] hover:bg-[var(--color-primary)] text-white"
            style={{ fontFamily: 'Sora, system-ui, sans-serif' }}
          >
            <span>see more</span>
            <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
          <a 
            href="mailto:anushka.punukollu@uwaterloo.ca" 
            className="group inline-flex items-center justify-center px-6 py-3 rounded-none transition-colors duration-200 text-base font-medium tracking-wide border text-[var(--color-primary)] border-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white"
            style={{ fontFamily: 'Sora, system-ui, sans-serif' }}
          >
            <span>contact me</span>
            <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </a>
        </div>

        <div className="w-full mb-4">
          <hr style={{ borderColor: 'var(--color-border)' }} />
        </div>

        <Footer />
      </main>
    </div>
  );
}