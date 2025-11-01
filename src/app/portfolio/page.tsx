'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import ProjectTab from "../../components/ProjectTab";
import { useTheme } from "../../utils/theme-context";

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
    imageSrc: "/GoNeuralNetwork.png",
    githubUrl: "https://github.com/apun16/Go-Neural-Network"
  },
  {
    id: 2,
    title: "FakeSeek",
    description: "A deepfake detection tool that helps users spot AI-generated content before it spreads and find if their identity has been compromised. Built in 36 hours for TechNova 2025 & won 3rd overall.",
    languages: ["TypeScript", "Python", "GeminiAPI", "React", "MongoDB", "TailwindCSS"],
    imageSrc: "/fakeseek_logo.png",
    githubUrl: "https://github.com/apun16/FakeSeek.",
    liveUrl: "https://devpost.com/software/fakeseek"
  },
  {
    id: 3,
    title: "Flux",
    description: "Flux is an autonomous drone system designed to detect methane leaks from abandoned oil wells. Equipped with methane sensors, infrared cameras, GPS, and LiDAR, each drone scans remote areas and uses ML to analyze leaks to prioritize high-risk wells based on location, age, and nearby emissions.",
    languages: ["Python", "Drones", "LiDAR", "Machine Learning"],
    imageSrc: "/Flux.png",
    liveUrl: "https://app.moonshotpirates.com/vote/flux-1"
  },
  {
    id: 4,
    title: "SucroSoil",
    description: "SucroSoil synthesizes biodegradable hydrogels from sugarcane bagasse to improve soil health. Using Bayesian regression to model compound ratios which achieved 94% accuracy in optimizing hydrogel performance; secured $30K+ funding from Emergent Ventures and other firms to support R&D.",
    languages: ["Material Science", "Hydrogels", "Python", "scikit-learn", "Experimentation"],
    imageSrc: "/SucroSoil_Thumbnail.png",
    liveUrl: "https://devpost.com/software/sucrosoil"
  },
  {
    id: 5,
    title: "SeaBloom",
    description: "SeaBloom is a coral reef monitoring system that uses convolutional neural networks to classify bleached vs unbleached coral from images with 98% accuracy. The model utilizes PyTorch and image transformations (ex: grayscale conversion, colour jittering, resizing) to enhance training on a dataset of coral images collected from multiple sources.",
    languages: ["Python", "PyTorch", "Computer Vision"],
    imageSrc: "/SeaBloom.png",
    githubUrl: "https://github.com/apun16/SeaBloom",
    liveUrl: "https://medium.com/@anushkapun/seabloom-fab26eec2aea"
  }
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
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-background, #ffffff)' }}>
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
              <ProjectTab
                key={project.id}
                title={project.title}
                description={project.description}
                languages={project.languages}
                imageSrc={project.imageSrc}
                githubUrl={project.githubUrl}
                liveUrl={project.liveUrl}
              />
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
                <span className="px-3 py-1 bg-[var(--color-light)] text-[var(--color-primary)] rounded-full text-xs font-medium" style={{ fontFamily: 'Sora, system-ui, sans-serif' }}>
                  NestJS
                </span>
                <span className="px-3 py-1 bg-[var(--color-light)] text-[var(--color-primary)] rounded-full text-xs font-medium" style={{ fontFamily: 'Sora, system-ui, sans-serif' }}>
                  TypeScript
                </span>
                <span className="px-3 py-1 bg-[var(--color-light)] text-[var(--color-primary)] rounded-full text-xs font-medium" style={{ fontFamily: 'Sora, system-ui, sans-serif' }}>
                  JavaScript
                </span>
                <span className="px-3 py-1 bg-[var(--color-light)] text-[var(--color-primary)] rounded-full text-xs font-medium" style={{ fontFamily: 'Sora, system-ui, sans-serif' }}>
                  MongoDB
                </span>
                <span className="px-3 py-1 bg-[var(--color-light)] text-[var(--color-primary)] rounded-full text-xs font-medium" style={{ fontFamily: 'Sora, system-ui, sans-serif' }}>
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
                <span className="px-3 py-1 bg-[var(--color-light)] text-[var(--color-primary)] rounded-full text-xs font-medium" style={{ fontFamily: 'Sora, system-ui, sans-serif' }}>
                  TypeScript
                </span>
                <span className="px-3 py-1 bg-[var(--color-light)] text-[var(--color-primary)] rounded-full text-xs font-medium" style={{ fontFamily: 'Sora, system-ui, sans-serif' }}>
                  JavaScript
                </span>
                <span className="px-3 py-1 bg-[var(--color-light)] text-[var(--color-primary)] rounded-full text-xs font-medium" style={{ fontFamily: 'Sora, system-ui, sans-serif' }}>
                  React
                </span>
                <span className="px-3 py-1 bg-[var(--color-light)] text-[var(--color-primary)] rounded-full text-xs font-medium" style={{ fontFamily: 'Sora, system-ui, sans-serif' }}>
                  State Management
                </span>
                <span className="px-3 py-1 bg-[var(--color-light)] text-[var(--color-primary)] rounded-full text-xs font-medium" style={{ fontFamily: 'Sora, system-ui, sans-serif' }}>
                  Jira
                </span>
                <span className="px-3 py-1 bg-[var(--color-light)] text-[var(--color-primary)] rounded-full text-xs font-medium" style={{ fontFamily: 'Sora, system-ui, sans-serif' }}>
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
                <span className="px-3 py-1 bg-[var(--color-light)] text-[var(--color-primary)] rounded-full text-xs font-medium" style={{ fontFamily: 'Sora, system-ui, sans-serif' }}>
                  Leadership
                </span>
                <span className="px-3 py-1 bg-[var(--color-light)] text-[var(--color-primary)] rounded-full text-xs font-medium" style={{ fontFamily: 'Sora, system-ui, sans-serif' }}>
                  KPI Tracking
                </span>
                <span className="px-3 py-1 bg-[var(--color-light)] text-[var(--color-primary)] rounded-full text-xs font-medium" style={{ fontFamily: 'Sora, system-ui, sans-serif' }}>
                  Fundraising
                </span>
                <span className="px-3 py-1 bg-[var(--color-light)] text-[var(--color-primary)] rounded-full text-xs font-medium" style={{ fontFamily: 'Sora, system-ui, sans-serif' }}>
                  Non-Profit Strategy
                </span>
                <span className="px-3 py-1 bg-[var(--color-light)] text-[var(--color-primary)] rounded-full text-xs font-medium" style={{ fontFamily: 'Sora, system-ui, sans-serif' }}>
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
                <span className="px-3 py-1 bg-[var(--color-light)] text-[var(--color-primary)] rounded-full text-xs font-medium" style={{ fontFamily: 'Sora, system-ui, sans-serif' }}>
                  Financial Planning
                </span>
                <span className="px-3 py-1 bg-[var(--color-light)] text-[var(--color-primary)] rounded-full text-xs font-medium" style={{ fontFamily: 'Sora, system-ui, sans-serif' }}>
                  Microsoft Excel
                </span>
                <span className="px-3 py-1 bg-[var(--color-light)] text-[var(--color-primary)] rounded-full text-xs font-medium" style={{ fontFamily: 'Sora, system-ui, sans-serif' }}>
                  Pitching
                </span>
                <span className="px-3 py-1 bg-[var(--color-light)] text-[var(--color-primary)] rounded-full text-xs font-medium" style={{ fontFamily: 'Sora, system-ui, sans-serif' }}>
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
                className="px-3 py-2 rounded-lg text-sm font-medium text-center transition-colors"
                style={{ fontFamily: 'Sora, system-ui, sans-serif', backgroundColor: 'var(--color-light)', color: 'var(--color-primary)' }}
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
