'use client';

import { Fragment, useEffect, useRef, useState, type CSSProperties } from 'react';
import Image from 'next/image';
import Navbar from '../../components/navbar';
import Footer from '../../components/footer';

const H = 'Satoshi-Bold, Satoshi-Variable, system-ui, sans-serif';
const B = 'Sora, system-ui, sans-serif';

function secondaryLinkLabel(url: string): string {
  const u = url.toLowerCase();
  if (u.includes('devpost.com')) return 'Devpost';
  if (u.includes('medium.com')) return 'Medium';
  if (u.includes('moonshot')) return 'Moonshot';
  if (u.includes('play6degrees')) return 'Live';
  return 'Link';
}

function SectionTitle({ label, className }: { label: string; className?: string }) {
  return (
    <div className={`flex items-center gap-3 sm:gap-4 ${className ?? 'mb-6'}`}>
      <h2
        className="text-3xl font-bold leading-tight shrink-0"
        style={{ fontFamily: H, color: 'var(--color-dark)' }}
      >
        {label.toLowerCase()}
      </h2>
      <div
        className="flex-1 min-w-[1.5rem] h-px opacity-50 self-center"
        style={{ backgroundColor: 'var(--color-muted)' }}
        aria-hidden
      />
    </div>
  );
}

function GitHubIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

function projectDescriptionPlainText(description: string): string {
  return description.replace(/\*\*(.+?)\*\*/g, '$1');
}

function ProjectDescription({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return (
    <>
      {parts.map((part, i) => {
        const m = /^\*\*(.+)\*\*$/.exec(part);
        if (m) {
          return (
            <strong
              key={i}
              className="font-semibold"
              style={{ color: 'var(--color-dark)' }}
            >
              {m[1]}
            </strong>
          );
        }
        return <Fragment key={i}>{part}</Fragment>;
      })}
    </>
  );
}

interface Project {
  id: number;
  title: string;
  description: string;
  languages: string[];
  imageSrc: string;
  githubUrl?: string;
  liveUrl?: string;
  demoVideo?: string;
}

const sampleProjects: Project[] = [
  {
    id: 1,
    title: 'Dextera',
    description:
      'Dextera is an iOS app that uses computer vision and audio processing to detect hand gestures and trigger piano notes in real time, allowing users with limited mobility to play without precise touch input. **Winner of Apple\'s Swift Student Challenge 2026!!**',
    languages: ['Swift', 'AVFoundation', 'AVAudioEngine', 'Vision', 'Swift Charts'],
    imageSrc: '/projects/Dextera.png',
    githubUrl: 'https://github.com/apun16/Dextera',
    liveUrl: 'https://www.wwdcscholars.com/s/228CEB5B-30BA-417A-97D0-5EBB44050B28/2026',
  },
  {
    id: 2,
    title: '6° Degrees',
    description:
      '6° Degrees is a semantic word connection game where players find optimal paths between any two words in six steps or less. **Reached 2,000+ players in 20+ countries.**',
    languages: ['Sentence Transformers', 'PyTorch', 'Python', 'TypeScript', 'React', 'Docker', 'Jest', 'pytest'],
    imageSrc: '/projects/6Degrees.png',
    githubUrl: 'https://github.com/apun16/6-Degrees/',
    liveUrl: 'https://www.play6degrees.com/',
  },
  {
    id: 3,
    title: 'LandLock',
    description:
      'LandLock is a **multi-agent land risk assessment platform** that helps people make informed decisions about where to live, build, and insure. Built in 36 hours for UofT Hacks.',
    languages: ['Python', 'FastAPI', 'LangGraph', 'CrewAI', 'Leaflet.js', 'TypeScript', 'React', 'BeautifulSoup'],
    imageSrc: '/projects/LandLock.png',
    githubUrl: 'https://github.com/apun16/landlock',
    liveUrl: 'https://devpost.com/software/landlock',
  },
  {
    id: 4,
    title: 'SucroSoil',
    description:
      'SucroSoil synthesizes biodegradable hydrogels from sugarcane bagasse to improve soil health. Using Bayesian regression to model compound ratios; **secured $40K+ funding from Emergent Ventures, 1517 Fund and others** to support R&D.',
    languages: ['Material Science', 'Hydrogels', 'Python', 'scikit-learn'],
    imageSrc: '/projects/SucroSoil_Thumbnail.png',
    liveUrl: 'https://devpost.com/software/sucrosoil',
  },
  {
    id: 5,
    title: 'Go Neural Network',
    description:
      'A Go-playing AI integrating a **dual-head CNN with residual blocks** and **Monte Carlo Tree Search (MCTS)**, inspired by AlphaGo. Includes ko rule, capture detection, and a CLI to play the model.',
    languages: ['Python', 'PyTorch', 'NumPy', 'Monte Carlo Tree Search'],
    imageSrc: '/projects/GoNeuralNetwork.png',
    githubUrl: 'https://github.com/apun16/Go-Neural-Network',
  },
  {
    id: 6,
    title: 'FakeSeek',
    description:
      'A deepfake detection tool that helps users find if their identity has been compromised via image analysis and web scraping. Built in 36 hours at **TechNova 2025 & placed 3rd overall.**',
    languages: ['Python', 'TypeScript', 'Auth0', 'MongoDB', 'BeautifulSoup'],
    imageSrc: '/projects/fakeseek_logo.png',
    githubUrl: 'https://github.com/apun16/FakeSeek.',
    liveUrl: 'https://devpost.com/software/fakeseek',
  },
];

type ExperienceCategoryId = 'professional' | 'extracurricular';

type ExperienceItem = {
  id: string;
  category: ExperienceCategoryId;
  logo: string;
  logoAlt: string;
  title: string;
  org: string;
  body: string;
  tags: string[];
  href: string;
};

const experienceCategories: { id: ExperienceCategoryId; label: string; accentBar: string }[] = [
  { id: 'professional', label: 'Professional', accentBar: 'var(--color-secondary)' },
  { id: 'extracurricular', label: 'Extracurricular', accentBar: 'var(--color-accent)' },
];

const experienceItems: ExperienceItem[] = [
  {
    id: 'aview',
    category: 'professional',
    logo: '/work/Aview_logo.jpeg',
    logoAlt: 'Aview International',
    title: 'Software Engineering Intern',
    org: 'Aview International',
    body: 'Built video distribution tools serving 300+ media creators, optimized pipelines to increase throughput by 30%, and automated content publishing, saving over 50 hours per month on post-processing.',
    tags: ['NestJS', 'TypeScript', 'JavaScript', 'MongoDB', 'Full Stack Development'],
    href: 'https://www.aviewint.com/',
  },
  {
    id: 'nokia',
    category: 'professional',
    logo: '/work/Nokia_logo.jpeg',
    logoAlt: 'Nokia',
    title: 'Software Engineering Intern',
    org: 'Nokia',
    body: "Worked on the Network Service Platform's Analytics team (Future Tech Program), migrating 10,000+ lines of legacy front-end code across 120+ files to improve load times and reduce bug reports.",
    tags: ['TypeScript', 'JavaScript', 'React', 'State Management', 'Jira', 'Confluence'],
    href: 'https://www.nokia.com/',
  },
  {
    id: 'fuse',
    category: 'extracurricular',
    logo: '/work/fuse_logo.jpeg',
    logoAlt: 'FUSE Society',
    title: 'CEO, Board Member',
    org: 'FUSE Society',
    body: 'Led a national financial literacy non-profit, reaching 6,000+ students by teaching a case-based business curriculum across 50 schools and hosting competitions in partnership with TD, Binance, and other organizations.',
    tags: ['Leadership', 'KPI Tracking', 'Fundraising', 'Non-Profit Strategy', 'Project Management'],
    href: 'http://fusesociety.ca/',
  },
  {
    id: 'targetalpha',
    category: 'extracurricular',
    logo: '/work/TargetAlpha_logo.jpeg',
    logoAlt: 'Target Alpha',
    title: 'Chief Financial Officer',
    org: 'Target Alpha Canada',
    body: 'Served as CFO, managing over $10K in funding and building partnerships with sponsors, including the University of Toronto and CPA Ontario; recognized by the Government of Ontario.',
    tags: ['Financial Planning', 'Microsoft Excel', 'Pitching', 'Sponsorships'],
    href: 'https://targetalpha.ca/',
  },
];

type RecognitionCategoryId = 'stem' | 'scholarships' | 'business' | 'design';

type RecognitionItem = {
  id: string;
  category: RecognitionCategoryId;
  title: string;
  summary: string;
  detail: string;
};

const recognitionCategories: { id: RecognitionCategoryId; label: string; dotColor: string }[] = [
  { id: 'stem', label: 'STEM', dotColor: 'var(--color-secondary)' },
  { id: 'scholarships', label: 'Scholarships', dotColor: 'var(--color-accent)' },
  { id: 'business', label: 'Business', dotColor: 'var(--color-primary)' },
  { id: 'design', label: 'Design', dotColor: 'var(--color-dark)' },
];

const recognitionItems: RecognitionItem[] = [
  {
    id: 'loran',
    category: 'scholarships',
    title: 'Loran Scholar Finalist',
    summary: '1 of 90 finalists out of 6,000+ applicants',
    detail: 'Recognized for demonstrated commitment to character, service, and leadership',
  },
  {
    id: 'bmo',
    category: 'scholarships',
    title: 'BMO200 William A. Downe Scholar',
    summary: 'Awarded in recognition of exceptional performance',
    detail: 'Excellence in academic achievement, leadership, and community contributions',
  },
  {
    id: 'egoi',
    category: 'stem',
    title: 'EGOI National Training Camp Qualifier',
    summary: 'Top 10 female competitive programmers out of 4,000+ participants',
    detail: 'Invitational camp based on Canadian Computing Contest scores',
  },
  {
    id: 'deca',
    category: 'business',
    title: 'DECA ICDC — 7th place internationally',
    summary: 'Placed 7th internationally out of 10,000+ total competitors',
    detail: 'Business Finance Series event',
  },
];

function CategoryDot({ color, className = 'h-2 w-2' }: { color: string; className?: string }) {
  return <span className={`inline-block shrink-0 rounded-full ${className}`} style={{ backgroundColor: color }} aria-hidden />;
}

function ProjectCard({ project }: { project: Project }) {
  const [hovered, setHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v || !project.demoVideo) return;
    if (hovered) {
      void v.play().catch(() => {});
    } else {
      v.pause();
      v.currentTime = 0;
    }
  }, [hovered, project.demoVideo]);

  const hasVideo = Boolean(project.demoVideo);

  return (
    <article
      className="work-surface-card rounded-none p-4 flex flex-col h-full"
      style={{
        backgroundColor: 'var(--color-background-light)',
        color: 'var(--color-foreground)',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative w-full h-44 sm:h-56 md:h-64 mb-3 overflow-hidden rounded-none" style={{ backgroundColor: 'var(--color-background)' }}>
        <Image
          src={project.imageSrc}
          alt={project.title}
          fill
          className={`object-cover transition-all duration-500 ease-out ${
            hasVideo && hovered ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
          } ${!hasVideo && hovered ? 'scale-[1.04]' : ''}`}
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        {project.demoVideo ? (
          <video
            ref={videoRef}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${
              hovered ? 'opacity-100' : 'opacity-0'
            }`}
            src={project.demoVideo}
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden
          />
        ) : null}
      </div>

      <div className="flex items-center justify-between gap-3 mb-3">
        <h3 className="text-base font-bold leading-tight min-w-0 flex-1 pr-1" style={{ fontFamily: H, color: 'var(--color-dark)' }}>
          {project.title}
        </h3>
        {(project.githubUrl || project.liveUrl) ? (
          <div className="flex items-center gap-1.5 shrink-0">
            {project.githubUrl ? (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="work-project-link inline-flex items-center justify-center p-2 rounded-none no-underline"
                aria-label={`${project.title} on GitHub`}
              >
                <GitHubIcon className="w-4 h-4" />
              </a>
            ) : null}
            {project.liveUrl ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="work-project-link inline-flex items-center justify-center p-2 rounded-none no-underline"
                aria-label={`${project.title} — ${secondaryLinkLabel(project.liveUrl)}`}
              >
                <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            ) : null}
          </div>
        ) : null}
      </div>

      <div className="flex flex-wrap gap-1.5 mb-4">
        {project.languages.map((language) => (
          <span
            key={language}
            className="px-2 py-0.5 rounded-none text-[0.65rem] font-medium border"
            style={{
              fontFamily: B,
              backgroundColor: 'var(--color-light)',
              color: 'var(--color-primary)',
              borderColor: 'var(--color-secondary)',
            }}
          >
            {language}
          </span>
        ))}
      </div>

      <p className="text-sm leading-relaxed flex-1" style={{ fontFamily: B, color: 'var(--color-muted)' }}>
        <ProjectDescription text={project.description} />
      </p>
    </article>
  );
}

export default function WorkPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [experienceFilter, setExperienceFilter] = useState<ExperienceCategoryId>('professional');
  const [recognitionFilter, setRecognitionFilter] = useState<RecognitionCategoryId>('stem');

  const filteredProjects = sampleProjects.filter(
    (project) =>
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      projectDescriptionPlainText(project.description).toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.languages.some((lang) => lang.toLowerCase().includes(searchTerm.toLowerCase())),
  );

  const activeExperienceCategory =
    experienceCategories.find((c) => c.id === experienceFilter) ?? experienceCategories[0];
  const filteredExperienceItems = experienceItems.filter((e) => e.category === experienceFilter);

  const activeRecognitionCategory =
    recognitionCategories.find((c) => c.id === recognitionFilter) ?? recognitionCategories[0];
  const filteredRecognitionItems = recognitionItems.filter((i) => i.category === recognitionFilter);

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-background)' }}>
      <main className="max-w-5xl mx-auto px-6 py-8">
        <Navbar currentPage="work" />

        <SectionTitle label="Projects" />

        <div className="mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search languages, projects, etc..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 pl-10 border rounded-none focus:outline-none focus:ring-2 focus:border-transparent"
              style={{
                borderColor: 'var(--color-border)',
                backgroundColor: 'var(--color-background)',
                color: 'var(--color-foreground)',
                fontFamily: B,
                '--tw-ring-color': 'color-mix(in srgb, var(--color-primary) 55%, transparent)',
              } as CSSProperties}
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none" style={{ color: 'var(--color-muted)' }}>
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-7 sm:mb-8">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        <SectionTitle label="Experience" className="mb-4" />

        <div
          className="flex flex-wrap items-baseline gap-x-6 gap-y-2 mb-5 sm:mb-6"
          role="group"
          aria-label="Filter experience by type"
        >
          {experienceCategories.map((cat) => {
            const isActive = experienceFilter === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setExperienceFilter(cat.id)}
                aria-pressed={isActive}
                data-tape={cat.id}
                data-active={isActive ? 'true' : 'false'}
                className={`work-exp-tab text-left transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-primary)] ${
                  isActive ? 'font-semibold text-[var(--color-dark)]' : 'font-normal text-[var(--color-muted)] hover:text-[var(--color-foreground)]'
                }`}
                style={{
                  fontFamily: B,
                  fontSize: '1rem',
                  lineHeight: 1.45,
                }}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        <section className="mb-8 sm:mb-9" aria-label={`${activeExperienceCategory.label} experience`}>
          {filteredExperienceItems.length === 0 ? (
            <p className="text-sm italic" style={{ fontFamily: B, color: 'var(--color-muted)' }}>
              —
            </p>
          ) : (
            <ul className="flex flex-col gap-6 sm:gap-7 list-none p-0 m-0">
              {filteredExperienceItems.map((exp) => (
                <li key={exp.id} className="flex gap-4 sm:gap-5 items-start">
                  <div className="relative w-11 h-11 sm:w-12 sm:h-12 shrink-0 rounded-none overflow-hidden border" style={{ borderColor: 'var(--color-border)' }}>
                    <Image src={exp.logo} alt={exp.logoAlt} fill className="object-cover" sizes="48px" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0">
                      <h3 className="text-base font-bold leading-tight" style={{ fontFamily: H, color: 'var(--color-dark)' }}>
                        {exp.title}
                      </h3>
                      <span className="text-sm leading-relaxed" style={{ fontFamily: B, color: 'var(--color-muted)' }}>
                        {exp.org}
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed mt-1.5" style={{ fontFamily: B, color: 'var(--color-muted)' }}>
                      {exp.body}
                    </p>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {exp.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded-none text-[0.65rem] font-medium border"
                          style={{
                            fontFamily: B,
                            backgroundColor: 'var(--color-light)',
                            color: 'var(--color-primary)',
                            borderColor: 'var(--color-secondary)',
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>

        <SectionTitle label="Awards & recognition" className="mb-4" />

        <div
          className="flex flex-wrap items-baseline gap-x-6 gap-y-2 mb-5 sm:mb-6"
          role="group"
          aria-label="Filter awards by category"
        >
          {recognitionCategories.map((cat) => {
            const isActive = recognitionFilter === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setRecognitionFilter(cat.id)}
                aria-pressed={isActive}
                data-tape={cat.id}
                data-active={isActive ? 'true' : 'false'}
                className={`work-exp-tab text-left transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-primary)] ${
                  isActive ? 'font-semibold text-[var(--color-dark)]' : 'font-normal text-[var(--color-muted)] hover:text-[var(--color-foreground)]'
                }`}
                style={{
                  fontFamily: B,
                  fontSize: '1rem',
                  lineHeight: 1.45,
                }}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        <section className="mb-6" aria-label={`${activeRecognitionCategory.label} awards`}>
          {filteredRecognitionItems.length === 0 ? (
            <p className="text-sm italic" style={{ fontFamily: B, color: 'var(--color-muted)' }}>
              —
            </p>
          ) : (
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6 list-none p-0 m-0">
              {filteredRecognitionItems.map((item) => (
                <li key={item.id} className="flex gap-3 items-start min-w-0">
                  <CategoryDot color={activeRecognitionCategory.dotColor} className="h-1.5 w-1.5 mt-[0.45rem] shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-bold leading-snug" style={{ fontFamily: H, color: 'var(--color-dark)' }}>
                      {item.title}
                    </p>
                    <p className="text-sm leading-relaxed mt-1 w-full" style={{ fontFamily: B, color: 'var(--color-muted)' }}>
                      {item.summary}
                    </p>
                    <p className="text-sm leading-relaxed mt-1 italic w-full" style={{ fontFamily: B, color: 'var(--color-muted)' }}>
                      {item.detail}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>

        <div className="w-full mb-6">
          <hr style={{ borderColor: 'var(--color-border)' }} />
        </div>

        <Footer />
      </main>
    </div>
  );
}
