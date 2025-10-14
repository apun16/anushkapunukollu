import Image from "next/image";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <main className="max-w-3xl mx-auto px-6 py-8">
        <Navbar currentPage="home" />
        
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
            <h1 className="text-5xl font-light leading-tight" style={{ fontFamily: 'Satoshi-Light, Satoshi-Variable, system-ui, sans-serif' }}>
              Hi I&apos;m <span className="text-[#00674F] font-bold">Anushka.</span>
            </h1>
            <div className="flex gap-3 mt-4 sm:mt-0">
              <a 
                href="https://linkedin.com/in/anushkapunukollu" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a 
                href="https://github.com/apun16" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
              <a 
                href="/resume.pdf" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </a>
            </div>
          </div>
          <p className="text-lg text-gray-700 leading-relaxed max-w-2xl" style={{ fontFamily: 'Sora, system-ui, sans-serif' }}>
            I&apos;m interested in the intersection of finance, product, and machine learning - especially how intelligence can be applied to make information, tools, and systems more accessible. Currently studying <span className="font-bold text-[#543787]">Computer Science</span> at the <span className="font-semibold text-[#543787]">University of Waterloo</span>, I&apos;m focused on building projects that help people learn, create, and make better decisions.
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-lg font-bold mb-4" style={{ fontFamily: 'Satoshi-Bold, Satoshi-Variable, system-ui, sans-serif' }}>
            <span className="text-[#543787]">CURRENTLY</span>
          </h2>
          <div className="space-y-3">
            <div className="flex items-start gap-4">
              <span className="text-[#7CB8C0] text-sm mt-1 font-mono font-semibold">01</span>
              <div>
                <p className="text-base leading-relaxed" style={{ fontFamily: 'Sora, system-ui, sans-serif' }}>
                  CS @ <a href="https://uwaterloo.ca" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:bg-[#FEB737] transition-all duration-300 rounded-sm highlight-reveal">University of Waterloo</a> as a Ted Rogers Future Leader Scholar
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <span className="text-[#543787] text-sm mt-1 font-mono font-semibold">02</span>
              <div>
                <p className="text-base leading-relaxed" style={{ fontFamily: 'Sora, system-ui, sans-serif' }}>
                  spending time <a href="https://devpost.com/anushka16" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:bg-[#FEB737] transition-all duration-300 rounded-sm highlight-reveal">hacking</a> + <span className="underline underline-offset-4 hover:bg-[#FEB737] transition-all duration-300 rounded-sm cursor-default highlight-reveal">competitive programming</span> + going down rabbit holes about different ideas at 3AM
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-lg font-bold mb-4" style={{ fontFamily: 'Satoshi-Bold, Satoshi-Variable, system-ui, sans-serif' }}>
            <span className="text-[#543787]">IN THE PAST</span>
          </h2>
          <div className="space-y-3">
            <div className="flex items-start gap-4">
              <span className="text-[#FEB737] text-sm mt-1 font-mono font-semibold">01</span>
              <div>
                <p className="text-base leading-relaxed" style={{ fontFamily: 'Sora, system-ui, sans-serif' }}>
                  developed tools that distribute multilingual content for some of my favourite creators as a software engineering intern @ <a href="https://www.aviewint.com/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:bg-[#D4E0F0] transition-all duration-300 rounded-sm highlight-reveal">Aview International</a>
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <span className="text-[#B76E79] text-sm mt-1 font-mono font-semibold">02</span>
              <div>
                <p className="text-base leading-relaxed" style={{ fontFamily: 'Sora, system-ui, sans-serif' }}>
                  was a future tech software engineering intern @ <a href="https://www.nokia.com/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:bg-[#D4E0F0] transition-all duration-300 rounded-sm highlight-reveal">Nokia</a> on their Network Service Platform&apos;s Analytics team
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <span className="text-[#00674F] text-sm mt-1 font-mono font-semibold">03</span>
              <div>
                <p className="text-base leading-relaxed" style={{ fontFamily: 'Sora, system-ui, sans-serif' }}>
                  built a biodegradable hydrogel using sugarcane bagasse (a byproduct of extracting juice from sugarcane) to help revitalize degraded soil; created to find an alternative to chemical fertilizers
                </p>
                <div className="ml-6 mt-2">
                  <div className="flex items-start">
                    <span className="mr-3 text-[#FEB737] text-lg">•</span>
                    <span className="text-base leading-relaxed" style={{ fontFamily: 'Sora, system-ui, sans-serif' }}>raised $30k+ from Emergent Ventures, the 1517 fund, and Rideau Hall Foundation</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <span className="text-[#008B8B] text-sm mt-1 font-mono font-semibold">04</span>
              <div>
                <p className="text-base leading-relaxed" style={{ fontFamily: 'Sora, system-ui, sans-serif' }}>
                  led 2 national financial literacy non-profits: <a href="http://fusesociety.ca/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:bg-[#D4E0F0] transition-all duration-300 rounded-sm highlight-reveal">the FUSE Society</a> & <a href="https://targetalpha.ca/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:bg-[#D4E0F0] transition-all duration-300 rounded-sm highlight-reveal">Target Alpha</a>. collectively reached 10,000 high school students and partnered with TD, Binance, & others!
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <span className="text-[#708090] text-sm mt-1 font-mono font-semibold">05</span>
              <div>
                <p className="text-base leading-relaxed" style={{ fontFamily: 'Sora, system-ui, sans-serif' }}>
                  photographed objects in daily life and was awarded by the <a href="https://www.artandwriting.org/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:bg-[#D4E0F0] transition-all duration-300 rounded-sm highlight-reveal">Scholastic Art & Writing Awards</a>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <a 
            href="/portfolio" 
            className="group inline-flex items-center justify-center px-6 py-3 bg-[#543787] text-white rounded-none hover:bg-[#00674F] transition-colors duration-200 text-sm font-medium tracking-wide"
            style={{ fontFamily: 'Sora, system-ui, sans-serif' }}
          >
            <span>see more</span>
            <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
          <a 
            href="mailto:anushka.punukollu@uwaterloo.ca" 
            className="group inline-flex items-center justify-center px-6 py-3 border border-[#543787] text-[#543787] rounded-none hover:bg-[#543787] hover:text-white transition-colors duration-200 text-sm font-medium tracking-wide"
            style={{ fontFamily: 'Sora, system-ui, sans-serif' }}
          >
            <span>contact me</span>
            <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </a>
        </div>

        <div className="w-full mb-8">
          <hr className="border-gray-300" />
        </div>

        <Footer />
      </main>
    </div>
  );
}