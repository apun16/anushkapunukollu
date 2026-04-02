import Navbar from "../components/navbar";
import Footer from "../components/footer";

const H = "Satoshi-Bold, Satoshi-Variable, system-ui, sans-serif";
const B = "Sora, system-ui, sans-serif";

const currentExperiences = [
  {
    num: "01",
    color: "var(--color-accent)",
    content: (
      <>
        Computer Science @ <a href="https://uwaterloo.ca" target="_blank" rel="noopener noreferrer" className="profile-link-tape" data-tape="accent">University of Waterloo</a> as a Ted Rogers Future Leader Scholar
      </>
    )
  },
  {
    num: "02",
    color: "var(--color-secondary)",
    content: (
      <>
        spending time <a href="https://devpost.com/anushka16" target="_blank" rel="noopener noreferrer" className="profile-link-tape" data-tape="secondary">hacking</a> + <a href="https://cemc.uwaterloo.ca/sites/default/files/documents/2025/ciw_summary.pdf" target="_blank" rel="noopener noreferrer" className="profile-link-tape" data-tape="secondary">competitive programming</a> + going down rabbit holes about random ideas at 3AM
      </>
    )
  }
];

const pastExperiences = [
  {
    num: "01",
    color: "var(--color-accent)",
    content: (
      <>
        developed tools that distribute multilingual content for some of my favourite creators @ <a href="https://www.aviewint.com/" target="_blank" rel="noopener noreferrer" className="profile-link-tape" data-tape="accent">Aview International</a>
      </>
    )
  },
  {
    num: "02",
    color: "var(--color-accent)",
    content: (
      <>
        was a future tech intern @ <a href="https://www.nokia.com/" target="_blank" rel="noopener noreferrer" className="profile-link-tape" data-tape="accent">Nokia</a> on their NSP Analytics team
      </>
    )
  },
  {
    num: "03",
    color: "var(--color-primary)",
    content: (
      <>
        built a biodegradable hydrogel using sugarcane bagasse to help revitalize degraded soil; created to find an alternative to chemical fertilizers <a href="https://marginalrevolution.com/marginalrevolution/2025/11/emergent-ventures-india-13th-cohort.html" target="_blank" rel="noopener noreferrer" className="profile-link-tape" data-tape="primary">[backed by Emergent Ventures]</a>.
      </>
    )
  },
  {
    num: "04",
    color: "var(--color-secondary)",
    content: (
      <>
        led 2 national financial literacy non-profits: <a href="http://fusesociety.ca/" target="_blank" rel="noopener noreferrer" className="profile-link-tape" data-tape="secondary">the FUSE Society</a> & <a href="https://targetalpha.ca/" target="_blank" rel="noopener noreferrer" className="profile-link-tape" data-tape="secondary">Target Alpha</a>. collectively reached 10,000 high school students & partnered with TD, Binance, + more!
      </>
    )
  },
  {
    num: "05",
    color: "var(--color-light)",
    content: (
      <>
        photographed objects in daily life + awarded by the <a href="https://www.artandwriting.org/" target="_blank" rel="noopener noreferrer" className="profile-link-tape" data-tape="light">Scholastic Art & Writing Awards</a>
      </>
    )
  }
];

export default function Home() {
  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "var(--color-background, #ffffff)" }}
    >
      <main className="max-w-5xl mx-auto px-6 py-8 w-full">
        <Navbar currentPage="home" />

        <div className="mb-8">
          <h1
            className="text-3xl font-bold mb-2 leading-tight"
            style={{ fontFamily: H, color: "var(--color-dark)" }}
          >
            Hi, I&apos;m <span className="text-[var(--color-primary)]">Anushka.</span>
          </h1>
          <p
            className="text-sm leading-relaxed w-full mb-3"
            style={{ fontFamily: B, color: "var(--color-muted)" }}
          >
            Student at UWaterloo exploring the intersection of finance, product, and infra. I focus on using technology to make information, tools, and systems more accessible.
          </p>
        </div>
        <div className="mb-8">
          <h2
            className="text-xl font-bold mb-3 leading-tight"
            style={{ fontFamily: H, color: "var(--color-dark)" }}
          >
            <span className="text-[var(--color-primary)]">CURRENTLY</span>
          </h2>
          <div className="space-y-2">
            {currentExperiences.map((exp, idx) => (
              <div key={idx} className="flex items-start gap-4">
                <span className="text-sm mt-0.5 font-mono font-semibold" style={{ color: exp.color }}>{exp.num}</span>
                <div>
                  <p className="text-sm leading-relaxed" style={{ fontFamily: B, color: "var(--color-foreground)" }}>
                    {exp.content}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <h2
            className="text-xl font-bold mb-3 leading-tight"
            style={{ fontFamily: H, color: "var(--color-dark)" }}
          >
            <span className="text-[var(--color-primary)]">IN THE PAST</span>
          </h2>
          <div className="space-y-3">
            {pastExperiences.map((exp, idx) => (
              <div key={idx} className="flex items-start gap-4">
                <span className="text-sm mt-0.5 font-mono font-semibold" style={{ color: exp.color }}>{exp.num}</span>
                <div>
                  <p className="text-sm leading-relaxed" style={{ fontFamily: B, color: "var(--color-foreground)" }}>
                    {exp.content}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <a 
            href="/work" 
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
