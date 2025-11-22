'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import { useTheme } from "../../components/contexts/theme-context";

interface Project {
  id: number;
  title: string;
  description: string;
  languages: string[];
  imageSrc: string;
  githubUrl?: string;
  liveUrl?: string;
}

const sampleProjects: Project[] = [
  {
    id: 1,
    title: "Go Neural Network",
    description: "A full Go-playing AI integrating a dual-head CNN with residual blocks and Monte Carlo Tree Search (MCTS), inspired by AlphaGo. Includes a complete Go engine with rules validation, including ko rule and capture detection, and a CLI for playing against the trained AI.",
    languages: ["Python", "PyTorch", "NumPy", "Monte Carlo Tree Search"],
    imageSrc: "/projects/GoNeuralNetwork.png",
    githubUrl: "https://github.com/apun16/Go-Neural-Network"
  },
  {
    id: 2,
    title: "FakeSeek",
    description: "A deepfake detection tool that helps users spot AI-generated content before it spreads and find if their identity has been compromised. Utilizes Gemini API to analyze images and text, and BeautifulSoup to scrape social media content. Built in 36 hours for TechNova 2025 & placed 3rd overall.",
    languages: ["TypeScript", "Python", "GeminiAPI", "React", "MongoDB", "TailwindCSS"],
    imageSrc: "/projects/fakeseek_logo.png",
    githubUrl: "https://github.com/apun16/FakeSeek.",
    liveUrl: "https://devpost.com/software/fakeseek"
  },
  {
    id: 3,
    title: "SucroSoil",
    description: "SucroSoil synthesizes biodegradable hydrogels from sugarcane bagasse to improve soil health. Using Bayesian regression to model compound ratios which achieved 94% accuracy in optimizing hydrogel performance; secured $30K+ funding from Emergent Ventures and other firms to support R&D.",
    languages: ["Material Science", "Hydrogels", "Python", "scikit-learn", "Experimentation"],
    imageSrc: "/projects/SucroSoil_Thumbnail.png",
    liveUrl: "https://devpost.com/software/sucrosoil"
  },
  {
    id: 4,
    title: "ConnectED",
    description: "ConnectED is a platform that helps FGLI (First-Generation Low-Income) students access higher education resources. Designed a Tinder-style scholarship feed with personalized recommendations in Figma, a financial aid calculator, and a mentor matching system using NLP.",
    languages: ["Python", "Figma", "UI/UX Design", "NLTK", "Scrapy", "Google APIs"],
    imageSrc: "/projects/ConnectED.png",
    githubUrl: "https://github.com/aravM23/ConnectED",
    liveUrl: "https://devpost.com/software/connected-ie5ghl"
  },
  {
    id: 5,
    title: "Flux",
    description: "Flux is an autonomous drone system designed to detect methane leaks from abandoned oil wells. Equipped with methane sensors, infrared cameras, GPS, and LiDAR, each drone scans remote areas and uses ML to analyze leaks to prioritize high-risk wells based on location, age, and nearby emissions. Placed Top 7 @ Moonshot Pirates Climate Challenge.",
    languages: ["Python", "Drones", "LiDAR", "Machine Learning"],
    imageSrc: "/projects/Flux.png",
    liveUrl: "https://app.moonshotpirates.com/vote/flux-1"
  },
  {
    id: 6,
    title: "SeaBloom",
    description: "SeaBloom is a coral reef monitoring system that uses CNNs to classify bleached vs unbleached coral from images with 98% accuracy. The model uses PyTorch and image transformations (ex: grayscale conversion, colour jittering, resizing) to improve the training process. Placed Top 10 @ NFTE World Series of Innovation BMO Challenge.",
    languages: ["Python", "PyTorch", "Computer Vision", "Figma"],
    imageSrc: "/projects/SeaBloom.png",
    githubUrl: "https://github.com/apun16/SeaBloom",
    liveUrl: "https://medium.com/@anushkapun/seabloom-fab26eec2aea"
  },
];

const skillsData = {
  'All': ['Python', 'JavaScript', 'TypeScript', 'Java', 'Swift', 'HTML', 'CSS', 'React', 'Next.js', 'Node.js', 'NestJS', 'Express.js', 'MongoDB', 'PostgreSQL', 'Flask', 'Git', 'Docker', 'AWS', 'Figma', 'MS Excel'],
  'Languages': ['Python', 'JavaScript', 'TypeScript', 'Java', 'Swift', 'HTML', 'CSS'],
  'Frontend': ['React', 'Next.js', 'TypeScript', 'JavaScript', 'SwiftUI', 'HTML', 'CSS'],
  'Backend': ['Python', 'Java', 'Node.js', 'NestJS', 'Express.js', 'MongoDB', 'PostgreSQL', 'Flask'],
  'Tools': ['Git', 'Docker', 'AWS', 'Figma', 'MS Excel']
};

export default function Projects() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { colors } = useTheme();

  const filteredProjects = sampleProjects.filter(project =>
    project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.languages.some(lang => lang.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const getFilteredSkills = () => {
    return skillsData[selectedCategory as keyof typeof skillsData] || [];
  };

  return (
    <div className="min-h-screen geometric-pattern" style={{ backgroundColor: 'var(--color-background, #ffffff)' }}>
      <main className="max-w-3xl mx-auto px-6 py-8">
        <Navbar currentPage="portfolio" />
        
        <div className="mb-8">
          <h2 className="text-5xl font-light mb-4 leading-tight" style={{ fontFamily: 'Satoshi-Light, Satoshi-Variable, system-ui, sans-serif' }}>
            <span className="text-[var(--color-dark)] font-bold">projects</span>
          </h2>
          
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
                  fontFamily: 'Sora, system-ui, sans-serif'
                }}
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none" style={{ color: 'var(--color-muted)' }}>
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredProjects.map((project) => (
              <div key={project.id} className="rounded-lg border p-6 hover:shadow-md hover:scale-105 transition-all duration-200" style={{ backgroundColor: 'var(--color-background-light)', borderColor: 'var(--color-light)', color: 'var(--color-foreground)' }}>
                <div className="relative w-full h-48 rounded-lg mb-4 overflow-hidden" style={{ backgroundColor: 'var(--color-background)' }}>
                  <Image
                    src={project.imageSrc}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-bold" style={{ fontFamily: 'Satoshi-Bold, Satoshi-Variable, system-ui, sans-serif' }}>
                    {project.title}
                  </h3>
                  <div className="flex gap-2">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 rounded-md flex items-center justify-center transition-colors bg-[var(--color-light)] text-[var(--color-primary)] hover:bg-[var(--color-accent)] hover:text-white"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 rounded-md flex items-center justify-center transition-colors bg-[var(--color-light)] text-[var(--color-primary)] hover:bg-[var(--color-accent)] hover:text-white"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-3">
                  {project.languages.map((language, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 rounded-full text-xs font-medium border"
                      style={{ fontFamily: 'Sora, system-ui, sans-serif', backgroundColor: 'var(--color-light)', color: 'var(--color-primary)', borderColor: 'var(--color-secondary)' }}
                    >
                      {language}
                    </span>
                  ))}
                </div>

                <p className="text-sm leading-relaxed" style={{ fontFamily: 'Sora, system-ui, sans-serif', color: 'var(--color-foreground)' }}>
                  {project.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full mb-8">
          <hr style={{ borderColor: 'var(--color-border)' }} />
        </div>

        <div className="mb-8">
          <h2 className="text-5xl font-light mb-4 leading-tight" style={{ fontFamily: 'Satoshi-Light, Satoshi-Variable, system-ui, sans-serif' }}>
            <span className="text-[var(--color-dark)] font-bold">experience</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-lg border p-6 hover:shadow-md transition-all duration-200" style={{ 
              backgroundColor: 'var(--color-background-light)', 
              borderColor: 'var(--color-light)',
              color: 'var(--color-foreground)'
            }}
            onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--color-primary)'}
            onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--color-light)'}>
              <div className="flex items-center gap-3 mb-3">
                <Image src="/Aview_logo.jpeg" alt="Aview International" width={32} height={32} className="w-8 h-8 rounded" />
                <h3 className="text-lg font-bold" style={{ fontFamily: 'Satoshi-Bold, Satoshi-Variable, system-ui, sans-serif' }}>
                  Software Engineering Intern
                </h3>
              </div>
              <p className="text-sm mb-3" style={{ fontFamily: 'Sora, system-ui, sans-serif', color: 'var(--color-muted)' }}>
                Aview International
              </p>
              <p className="text-sm leading-relaxed mb-4" style={{ fontFamily: 'Sora, system-ui, sans-serif', color: 'var(--color-foreground)' }}>
                Built video distribution tools serving 300+ media creators, optimized pipelines to increase throughput by 30%, and automated content publishing, saving over 50 hours per month on post-processing.
              </p>
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="px-3 py-1 bg-[var(--color-light)] text-[var(--color-primary)] rounded-full text-xs font-medium border" style={{ fontFamily: 'Sora, system-ui, sans-serif', borderColor: 'var(--color-secondary)' }}>
                  NestJS
                </span>
                <span className="px-3 py-1 bg-[var(--color-light)] text-[var(--color-primary)] rounded-full text-xs font-medium border" style={{ fontFamily: 'Sora, system-ui, sans-serif', borderColor: 'var(--color-secondary)' }}>
                  TypeScript
                </span>
                <span className="px-3 py-1 bg-[var(--color-light)] text-[var(--color-primary)] rounded-full text-xs font-medium border" style={{ fontFamily: 'Sora, system-ui, sans-serif', borderColor: 'var(--color-secondary)' }}>
                  JavaScript
                </span>
                <span className="px-3 py-1 bg-[var(--color-light)] text-[var(--color-primary)] rounded-full text-xs font-medium border" style={{ fontFamily: 'Sora, system-ui, sans-serif', borderColor: 'var(--color-secondary)' }}>
                  MongoDB
                </span>
                <span className="px-3 py-1 bg-[var(--color-light)] text-[var(--color-primary)] rounded-full text-xs font-medium border" style={{ fontFamily: 'Sora, system-ui, sans-serif', borderColor: 'var(--color-secondary)' }}>
                  Full Stack Development
                </span>
              </div>
              <a 
                href="https://www.aviewint.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center text-[var(--color-primary)] hover:text-[var(--color-secondary)] transition-colors text-sm font-medium"
                style={{ fontFamily: 'Sora, system-ui, sans-serif' }}
              >
                Visit Website
                <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>

            <div className="rounded-lg border p-6 hover:shadow-md transition-all duration-200" style={{ 
              backgroundColor: 'var(--color-background-light)', 
              borderColor: 'var(--color-light)',
              color: 'var(--color-foreground)'
            }}
            onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--color-primary)'}
            onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--color-light)'}>
              <div className="flex items-center gap-3 mb-3">
                <Image src="/Nokia_logo.jpeg" alt="Nokia" width={32} height={32} className="w-8 h-8 rounded" />
                <h3 className="text-lg font-bold" style={{ fontFamily: 'Satoshi-Bold, Satoshi-Variable, system-ui, sans-serif' }}>
                  Software Engineering Intern
                </h3>
              </div>
              <p className="text-sm mb-3" style={{ fontFamily: 'Sora, system-ui, sans-serif', color: 'var(--color-muted)' }}>
                Nokia
              </p>
              <p className="text-sm leading-relaxed mb-4" style={{ fontFamily: 'Sora, system-ui, sans-serif', color: 'var(--color-foreground)' }}>
                Worked on the Network Service Platform&apos;s Analytics team (Future Tech Program), migrating 10,000+ lines of legacy front-end code across 120+ files to improve load times and reduce bug reports.
              </p>
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="px-3 py-1 bg-[var(--color-light)] text-[var(--color-primary)] rounded-full text-xs font-medium border" style={{ fontFamily: 'Sora, system-ui, sans-serif', borderColor: 'var(--color-secondary)' }}>
                  TypeScript
                </span>
                <span className="px-3 py-1 bg-[var(--color-light)] text-[var(--color-primary)] rounded-full text-xs font-medium border" style={{ fontFamily: 'Sora, system-ui, sans-serif', borderColor: 'var(--color-secondary)' }}>
                  JavaScript
                </span>
                <span className="px-3 py-1 bg-[var(--color-light)] text-[var(--color-primary)] rounded-full text-xs font-medium border" style={{ fontFamily: 'Sora, system-ui, sans-serif', borderColor: 'var(--color-secondary)' }}>
                  React
                </span>
                <span className="px-3 py-1 bg-[var(--color-light)] text-[var(--color-primary)] rounded-full text-xs font-medium border" style={{ fontFamily: 'Sora, system-ui, sans-serif', borderColor: 'var(--color-secondary)' }}>
                  State Management
                </span>
                <span className="px-3 py-1 bg-[var(--color-light)] text-[var(--color-primary)] rounded-full text-xs font-medium border" style={{ fontFamily: 'Sora, system-ui, sans-serif', borderColor: 'var(--color-secondary)' }}>
                  Jira
                </span>
                <span className="px-3 py-1 bg-[var(--color-light)] text-[var(--color-primary)] rounded-full text-xs font-medium border" style={{ fontFamily: 'Sora, system-ui, sans-serif', borderColor: 'var(--color-secondary)' }}>
                  Confluence
                </span>
              </div>
              <a 
                href="https://www.nokia.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center text-[var(--color-primary)] hover:text-[var(--color-secondary)] transition-colors text-sm font-medium"
                style={{ fontFamily: 'Sora, system-ui, sans-serif' }}
              >
                Visit Website
                <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>

            <div className="rounded-lg border p-6 hover:shadow-md transition-all duration-200" style={{ 
              backgroundColor: 'var(--color-background-light)', 
              borderColor: 'var(--color-light)',
              color: 'var(--color-foreground)'
            }}
            onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--color-primary)'}
            onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--color-light)'}>
              <div className="flex items-center gap-3 mb-3">
                <Image src="/fuse_logo.jpeg" alt="FUSE Society" width={32} height={32} className="w-8 h-8 rounded" />
                <h3 className="text-lg font-bold" style={{ fontFamily: 'Satoshi-Bold, Satoshi-Variable, system-ui, sans-serif' }}>
                  CEO, Board Member
                </h3>
              </div>
              <p className="text-sm mb-3" style={{ fontFamily: 'Sora, system-ui, sans-serif', color: 'var(--color-muted)' }}>
                FUSE Society
              </p>
              <p className="text-sm leading-relaxed mb-4" style={{ fontFamily: 'Sora, system-ui, sans-serif', color: 'var(--color-foreground)' }}>
                Led a national financial literacy non-profit, reaching 6,000+ students by teaching a case-based business curriculum across 50 schools and hosting competitions in partnership with TD, Binance, and other organizations.              </p>
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="px-3 py-1 bg-[var(--color-light)] text-[var(--color-primary)] rounded-full text-xs font-medium border" style={{ fontFamily: 'Sora, system-ui, sans-serif', borderColor: 'var(--color-secondary)' }}>
                  Leadership
                </span>
                <span className="px-3 py-1 bg-[var(--color-light)] text-[var(--color-primary)] rounded-full text-xs font-medium border" style={{ fontFamily: 'Sora, system-ui, sans-serif', borderColor: 'var(--color-secondary)' }}>
                  KPI Tracking
                </span>
                <span className="px-3 py-1 bg-[var(--color-light)] text-[var(--color-primary)] rounded-full text-xs font-medium border" style={{ fontFamily: 'Sora, system-ui, sans-serif', borderColor: 'var(--color-secondary)' }}>
                  Fundraising
                </span>
                <span className="px-3 py-1 bg-[var(--color-light)] text-[var(--color-primary)] rounded-full text-xs font-medium border" style={{ fontFamily: 'Sora, system-ui, sans-serif', borderColor: 'var(--color-secondary)' }}>
                  Non-Profit Strategy
                </span>
                <span className="px-3 py-1 bg-[var(--color-light)] text-[var(--color-primary)] rounded-full text-xs font-medium border" style={{ fontFamily: 'Sora, system-ui, sans-serif', borderColor: 'var(--color-secondary)' }}>
                  Project Management
                </span>
              </div>
              <a 
                href="http://fusesociety.ca/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center text-[var(--color-primary)] hover:text-[var(--color-secondary)] transition-colors text-sm font-medium"
                style={{ fontFamily: 'Sora, system-ui, sans-serif' }}
              >
                Visit Website
                <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>

            <div className="rounded-lg border p-6 hover:shadow-md transition-all duration-200" style={{ 
              backgroundColor: 'var(--color-background-light)', 
              borderColor: 'var(--color-light)',
              color: 'var(--color-foreground)'
            }}
            onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--color-primary)'}
            onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--color-light)'}>
              <div className="flex items-center gap-3 mb-3">
                <Image src="/TargetAlpha_logo.jpeg" alt="Target Alpha" width={32} height={32} className="w-8 h-8 rounded" />
                <h3 className="text-lg font-bold" style={{ fontFamily: 'Satoshi-Bold, Satoshi-Variable, system-ui, sans-serif' }}>
                  Chief Financial Officer
                </h3>
              </div>
              <p className="text-sm mb-3" style={{ fontFamily: 'Sora, system-ui, sans-serif', color: 'var(--color-muted)' }}>
                Target Alpha Canada
              </p>
              <p className="text-sm leading-relaxed mb-4" style={{ fontFamily: 'Sora, system-ui, sans-serif', color: 'var(--color-foreground)' }}>
                Served as CFO, managing over $10K in funding and building partnerships with sponsors, including the University of Toronto and CPA Ontario; recognized by the Government of Ontario.
              </p>
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="px-3 py-1 bg-[var(--color-light)] text-[var(--color-primary)] rounded-full text-xs font-medium border" style={{ fontFamily: 'Sora, system-ui, sans-serif', borderColor: 'var(--color-secondary)' }}>
                  Financial Planning
                </span>
                <span className="px-3 py-1 bg-[var(--color-light)] text-[var(--color-primary)] rounded-full text-xs font-medium border" style={{ fontFamily: 'Sora, system-ui, sans-serif', borderColor: 'var(--color-secondary)' }}>
                  Microsoft Excel
                </span>
                <span className="px-3 py-1 bg-[var(--color-light)] text-[var(--color-primary)] rounded-full text-xs font-medium border" style={{ fontFamily: 'Sora, system-ui, sans-serif', borderColor: 'var(--color-secondary)' }}>
                  Pitching
                </span>
                <span className="px-3 py-1 bg-[var(--color-light)] text-[var(--color-primary)] rounded-full text-xs font-medium border" style={{ fontFamily: 'Sora, system-ui, sans-serif', borderColor: 'var(--color-secondary)' }}>
                  Sponsorships
                </span>
              </div>
              <a 
                href="https://targetalpha.ca/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center text-[var(--color-primary)] hover:text-[var(--color-secondary)] transition-colors text-sm font-medium"
                style={{ fontFamily: 'Sora, system-ui, sans-serif' }}
              >
                Visit Website
                <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="w-full mb-8">
          <hr className="border-gray-300" />
        </div>

        <div className="mb-8">
          <h2 className="text-5xl font-light mb-4 leading-tight" style={{ fontFamily: 'Satoshi-Light, Satoshi-Variable, system-ui, sans-serif' }}>
            <span className="text-[var(--color-dark)] font-bold">skills & frameworks</span>
          </h2>
          
          <div className="flex flex-wrap gap-2 mb-6">
            {['All', 'Languages', 'Frontend', 'Backend', 'Tools'].map((category) => (
              <button 
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors`}
                style={{
                  backgroundColor: selectedCategory === category ? 'var(--color-primary)' : 'var(--color-light)',
                  color: selectedCategory === category ? '#ffffff' : 'var(--color-primary)',
                  fontFamily: 'Sora, system-ui, sans-serif'
                }}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
            {getFilteredSkills().map((skill, index) => (
              <div 
                key={index}
                className="px-3 py-2 rounded-lg text-sm font-medium text-center transition-colors border"
                style={{ fontFamily: 'Sora, system-ui, sans-serif', backgroundColor: 'var(--color-light)', color: 'var(--color-primary)', borderColor: 'var(--color-secondary)' }}
              >
                {skill}
              </div>
            ))}
          </div>
        </div>

        <div className="w-full mb-8">
          <hr style={{ borderColor: 'var(--color-border)' }} />
        </div>

        <div className="mb-8">
          <h2 className="text-5xl font-light mb-4 leading-tight" style={{ fontFamily: 'Satoshi-Light, Satoshi-Variable, system-ui, sans-serif' }}>
            <span className="text-[var(--color-dark)] font-bold">recognition</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="recognition-card n1 rounded-lg border-2 p-6 hover:shadow-xl transition-all duration-300">
              <h3 className="text-xl font-bold mb-4" style={{ fontFamily: 'Satoshi-Bold, Satoshi-Variable, system-ui, sans-serif', color: 'var(--color-primary)' }}>
                Loran Scholar Finalist
              </h3>
              <div className="space-y-2">
                <p className="text-lg leading-relaxed" style={{ fontFamily: 'Sora, system-ui, sans-serif', color: 'var(--color-foreground)' }}>
                  1 of 90 finalists out of 6,000+ applicants
                </p>
                <p className="text-sm leading-relaxed italic" style={{ fontFamily: 'Sora, system-ui, sans-serif', color: 'var(--color-muted)' }}>
                  Recognized for demonstrated commitment to <span className="font-semibold">character, service, and leadership</span>
                </p>
              </div>
            </div>
            <div className="recognition-card n2 rounded-lg border-2 p-6 hover:shadow-xl transition-all duration-300">
              <h3 className="text-xl font-bold mb-4" style={{ fontFamily: 'Satoshi-Bold, Satoshi-Variable, system-ui, sans-serif', color: 'var(--color-primary)' }}>
                BMO200 William A. Downe Scholar
              </h3>
              <div className="space-y-2">
                <p className="text-lg leading-relaxed" style={{ fontFamily: 'Sora, system-ui, sans-serif', color: 'var(--color-foreground)' }}>
                  Awarded $10,000 in recognition of exceptional performance
                </p>
                <p className="text-sm leading-relaxed italic" style={{ fontFamily: 'Sora, system-ui, sans-serif', color: 'var(--color-muted)' }}>
                  Excellence in <span className="font-semibold">academic achievement, leadership, and community contributions</span>
                </p>
              </div>
            </div>
            <div className="recognition-card n3 rounded-lg border-2 p-6 hover:shadow-xl transition-all duration-300">
              <h3 className="text-xl font-bold mb-4" style={{ fontFamily: 'Satoshi-Bold, Satoshi-Variable, system-ui, sans-serif', color: 'var(--color-primary)' }}>
                EGOI Canadian National Training Camp Qualifier
              </h3>
              <div className="space-y-2">
                <p className="text-lg leading-relaxed" style={{ fontFamily: 'Sora, system-ui, sans-serif', color: 'var(--color-foreground)' }}>
                  Top 10 female competitive programmers out of 10,000+ participants
                </p>
                <p className="text-sm leading-relaxed italic" style={{ fontFamily: 'Sora, system-ui, sans-serif', color: 'var(--color-muted)' }}>
                  Invitational camp based on <span className="font-semibold">Canadian Computing Contest scores</span>
                </p>
              </div>
            </div>
            <div className="recognition-card n4 rounded-lg border-2 p-6 hover:shadow-xl transition-all duration-300">
              <h3 className="text-xl font-bold mb-4" style={{ fontFamily: 'Satoshi-Bold, Satoshi-Variable, system-ui, sans-serif', color: 'var(--color-primary)' }}>
                DECA ICDC - 7th Place Internationally
              </h3>
              <div className="space-y-2">
                <p className="text-lg leading-relaxed" style={{ fontFamily: 'Sora, system-ui, sans-serif', color: 'var(--color-foreground)' }}>
                  Placed 7th internationally out of 10,000+ total competitors
                </p>
                <p className="text-sm leading-relaxed italic" style={{ fontFamily: 'Sora, system-ui, sans-serif', color: 'var(--color-muted)' }}>
                  <span className="font-semibold">Business Finance Series</span> event
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full mb-4">
          <hr style={{ borderColor: 'var(--color-border)' }} />
        </div>

        <Footer />
      </main>
    </div>
  );
}
