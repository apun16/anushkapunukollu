'use client';

import React, { useState } from 'react';
import Navbar from "../../../components/navbar";
import Footer from "../../../components/footer";
import ProjectTab from "../../../components/ProjectTab";

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
    title: "SucroSoil",
    description: "Transforming agriculture sustainably with biodegradable sugarcane hydrogels, rich in nutrients and eco-friendly. A solution for soil degradation using waste products from sugar production.",
    languages: ["Material Science", "Nanotechnology", "Hydrogels", "Sustainability"],
    imageSrc: "/SucroSoil_Thumbnail.png",
    liveUrl: "https://devpost.com/software/sucrosoil"
  },
  {
    id: 2,
    title: "FakeSeek",
    description: "A deepfake detection tool that helps users spot AI-generated content before it spreads. Built for TechNova 2025 hackathon to combat misinformation and protect digital authenticity.",
    languages: ["TypeScript", "Python", "AI/ML", "Next.js"],
    imageSrc: "/fakeseek_logo.png",
    githubUrl: "https://github.com/apun16/FakeSeek.",
    liveUrl: "https://devpost.com/software/fakeseek"
  },
  {
    id: 3,
    title: "SeaBloom",
    description: "An innovative marine conservation platform that combines technology with ocean health monitoring. Features real-time data analysis and community engagement for protecting marine ecosystems.",
    languages: ["React", "Python", "Data Science", "Marine Biology"],
    imageSrc: "/SeaBloom.png",
    githubUrl: "https://github.com/apun16/SeaBloom",
    liveUrl: "https://medium.com/@anushkapun/seabloom-fab26eec2aea"
  },
  {
    id: 4,
    title: "Flux",
    description: "A dynamic productivity and workflow management application designed to streamline daily tasks and enhance team collaboration. Built for the Moonshot Pirates competition.",
    languages: ["JavaScript", "React", "Productivity", "UI/UX"],
    imageSrc: "/Flux.png",
    liveUrl: "https://app.moonshotpirates.com/vote/flux-1"
  }
];

const skillsData = {
  'Languages': ['Python', 'JavaScript', 'TypeScript', 'Java', 'Swift', 'HTML', 'CSS'],
  'Frontend': ['React', 'Next.js', 'HTML', 'JavaScript', 'TypeScript', 'SwiftUI', 'CSS'],
  'Backend': ['Node.js', 'NestJS', 'Express.js', 'Python', 'Java', 'MongoDB', 'PostgreSQL', 'Flask',],
  'Tools': ['Git', 'Docker', 'AWS', 'Figma'],
  'Other': ['MS Excel']
};

export default function Projects() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredProjects = sampleProjects.filter(project =>
    project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.languages.some(lang => lang.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const getFilteredSkills = () => {
    if (selectedCategory === 'All') {
      return Object.values(skillsData).flat();
    }
    return skillsData[selectedCategory as keyof typeof skillsData] || [];
  };

  return (
    <div className="min-h-screen bg-white">
      <main className="max-w-3xl mx-auto px-6 py-8">
        <Navbar currentPage="portfolio" />
        
        <div className="mb-8">
          <h2 className="text-5xl font-light mb-4 leading-tight" style={{ fontFamily: 'Satoshi-Light, Satoshi-Variable, system-ui, sans-serif' }}>
            <span className="text-[#00674F] font-bold">projects</span>
          </h2>
          
          <div className="mb-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search languages, projects, etc..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-none focus:outline-none focus:ring-2 focus:ring-[#FEB737] focus:border-transparent"
                style={{ fontFamily: 'Sora, system-ui, sans-serif' }}
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
          <hr className="border-gray-300" />
        </div>

        <div className="mb-8">
          <h2 className="text-5xl font-light mb-4 leading-tight" style={{ fontFamily: 'Satoshi-Light, Satoshi-Variable, system-ui, sans-serif' }}>
            <span className="text-[#00674F] font-bold">experience</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white rounded-lg border border-[#D4E0F0] p-6 hover:shadow-md hover:border-[#543787] transition-all duration-200">
              <div className="flex items-center gap-3 mb-3">
                <img src="/Aview_logo.jpeg" alt="Aview International" className="w-8 h-8 rounded" />
                <h3 className="text-lg font-bold" style={{ fontFamily: 'Satoshi-Bold, Satoshi-Variable, system-ui, sans-serif' }}>
                  Software Engineering Intern
                </h3>
              </div>
              <p className="text-sm text-gray-600 mb-3" style={{ fontFamily: 'Sora, system-ui, sans-serif' }}>
                Aview International
              </p>
              <p className="text-sm leading-relaxed text-gray-700 mb-4" style={{ fontFamily: 'Sora, system-ui, sans-serif' }}>
                Built tools for multilingual content distribution for creators. Developed software solutions to help content reach global audiences.
              </p>
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="px-3 py-1 bg-[#D4E0F0] text-[#543787] rounded-full text-xs font-medium" style={{ fontFamily: 'Sora, system-ui, sans-serif' }}>
                  Software Engineering
                </span>
                <span className="px-3 py-1 bg-[#D4E0F0] text-[#543787] rounded-full text-xs font-medium" style={{ fontFamily: 'Sora, system-ui, sans-serif' }}>
                  Multilingual Content
                </span>
                <span className="px-3 py-1 bg-[#D4E0F0] text-[#543787] rounded-full text-xs font-medium" style={{ fontFamily: 'Sora, system-ui, sans-serif' }}>
                  Content Distribution
                </span>
              </div>
              <a 
                href="https://www.aviewint.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center text-[#543787] hover:text-[#7CB8C0] transition-colors text-sm font-medium"
                style={{ fontFamily: 'Sora, system-ui, sans-serif' }}
              >
                Visit Website
                <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>

            <div className="bg-white rounded-lg border border-[#D4E0F0] p-6 hover:shadow-md hover:border-[#543787] transition-all duration-200">
              <div className="flex items-center gap-3 mb-3">
                <img src="/Nokia_logo.jpeg" alt="Nokia" className="w-8 h-8 rounded" />
                <h3 className="text-lg font-bold" style={{ fontFamily: 'Satoshi-Bold, Satoshi-Variable, system-ui, sans-serif' }}>
                  Software Engineering Intern
                </h3>
              </div>
              <p className="text-sm text-gray-600 mb-3" style={{ fontFamily: 'Sora, system-ui, sans-serif' }}>
                Nokia
              </p>
              <p className="text-sm leading-relaxed text-gray-700 mb-4" style={{ fontFamily: 'Sora, system-ui, sans-serif' }}>
                Worked on the Network Service Platform's Analytics team, developing future technologies for telecommunications infrastructure.
              </p>
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="px-3 py-1 bg-[#D4E0F0] text-[#543787] rounded-full text-xs font-medium" style={{ fontFamily: 'Sora, system-ui, sans-serif' }}>
                  Network Analytics
                </span>
                <span className="px-3 py-1 bg-[#D4E0F0] text-[#543787] rounded-full text-xs font-medium" style={{ fontFamily: 'Sora, system-ui, sans-serif' }}>
                  Telecommunications
                </span>
                <span className="px-3 py-1 bg-[#D4E0F0] text-[#543787] rounded-full text-xs font-medium" style={{ fontFamily: 'Sora, system-ui, sans-serif' }}>
                  Future Tech
                </span>
              </div>
              <a 
                href="https://www.nokia.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center text-[#543787] hover:text-[#7CB8C0] transition-colors text-sm font-medium"
                style={{ fontFamily: 'Sora, system-ui, sans-serif' }}
              >
                Visit Website
                <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>

            <div className="bg-white rounded-lg border border-[#D4E0F0] p-6 hover:shadow-md hover:border-[#543787] transition-all duration-200">
              <div className="flex items-center gap-3 mb-3">
                <img src="/fuse_logo.jpeg" alt="FUSE Society" className="w-8 h-8 rounded" />
                <h3 className="text-lg font-bold" style={{ fontFamily: 'Satoshi-Bold, Satoshi-Variable, system-ui, sans-serif' }}>
                  Prev. CEO, Board Member
                </h3>
              </div>
              <p className="text-sm text-gray-600 mb-3" style={{ fontFamily: 'Sora, system-ui, sans-serif' }}>
                FUSE Society
              </p>
              <p className="text-sm leading-relaxed text-gray-700 mb-4" style={{ fontFamily: 'Sora, system-ui, sans-serif' }}>
                Led a national financial literacy non-profit, reaching thousands of high school students and partnering with major organizations.
              </p>
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="px-3 py-1 bg-[#D4E0F0] text-[#543787] rounded-full text-xs font-medium" style={{ fontFamily: 'Sora, system-ui, sans-serif' }}>
                  Leadership
                </span>
                <span className="px-3 py-1 bg-[#D4E0F0] text-[#543787] rounded-full text-xs font-medium" style={{ fontFamily: 'Sora, system-ui, sans-serif' }}>
                  Financial Literacy
                </span>
                <span className="px-3 py-1 bg-[#D4E0F0] text-[#543787] rounded-full text-xs font-medium" style={{ fontFamily: 'Sora, system-ui, sans-serif' }}>
                  Non-profit
                </span>
              </div>
              <a 
                href="http://fusesociety.ca/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center text-[#543787] hover:text-[#7CB8C0] transition-colors text-sm font-medium"
                style={{ fontFamily: 'Sora, system-ui, sans-serif' }}
              >
                Visit Website
                <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>

            <div className="bg-white rounded-lg border border-[#D4E0F0] p-6 hover:shadow-md hover:border-[#543787] transition-all duration-200">
              <div className="flex items-center gap-3 mb-3">
                <img src="/TargetAlpha_logo.jpeg" alt="Target Alpha" className="w-8 h-8 rounded" />
                <h3 className="text-lg font-bold" style={{ fontFamily: 'Satoshi-Bold, Satoshi-Variable, system-ui, sans-serif' }}>
                  Chief Financial Officer
                </h3>
              </div>
              <p className="text-sm text-gray-600 mb-3" style={{ fontFamily: 'Sora, system-ui, sans-serif' }}>
                Target Alpha
              </p>
              <p className="text-sm leading-relaxed text-gray-700 mb-4" style={{ fontFamily: 'Sora, system-ui, sans-serif' }}>
                Co-founded a national financial literacy organization, creating educational programs and building partnerships with major institutions.
              </p>
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="px-3 py-1 bg-[#D4E0F0] text-[#543787] rounded-full text-xs font-medium" style={{ fontFamily: 'Sora, system-ui, sans-serif' }}>
                  Entrepreneurship
                </span>
                <span className="px-3 py-1 bg-[#D4E0F0] text-[#543787] rounded-full text-xs font-medium" style={{ fontFamily: 'Sora, system-ui, sans-serif' }}>
                  Education
                </span>
                <span className="px-3 py-1 bg-[#D4E0F0] text-[#543787] rounded-full text-xs font-medium" style={{ fontFamily: 'Sora, system-ui, sans-serif' }}>
                  Partnerships
                </span>
              </div>
              <a 
                href="https://targetalpha.ca/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center text-[#543787] hover:text-[#7CB8C0] transition-colors text-sm font-medium"
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
            <span className="text-[#00674F] font-bold">skills & frameworks</span>
          </h2>
          
          <div className="flex flex-wrap gap-2 mb-6">
            {['All', 'Languages', 'Frontend', 'Backend', 'Tools'].map((category) => (
              <button 
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-[#543787] text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
                style={{ fontFamily: 'Sora, system-ui, sans-serif' }}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
            {getFilteredSkills().map((skill, index) => (
              <div 
                key={index}
                className="px-3 py-2 rounded-lg text-sm font-medium text-center bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors"
                style={{ fontFamily: 'Sora, system-ui, sans-serif' }}
              >
                {skill}
              </div>
            ))}
          </div>
        </div>

        <div className="w-full mb-8">
          <hr className="border-gray-300" />
        </div>

        <div className="mb-8">
          <h2 className="text-5xl font-light mb-4 leading-tight" style={{ fontFamily: 'Satoshi-Light, Satoshi-Variable, system-ui, sans-serif' }}>
            <span className="text-[#00674F] font-bold">recognition</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
 
             <div className="bg-gradient-to-br from-[#D4E0F0] to-[#7CB8C0] rounded-lg border border-[#543787] p-6 hover:shadow-lg transition-all duration-200">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-[#543787] rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-[#543787]" style={{ fontFamily: 'Satoshi-Bold, Satoshi-Variable, system-ui, sans-serif' }}>
                  Ted Rogers Future Leader Scholar
                </h3>
              </div>
              <p className="text-sm text-gray-700 mb-3" style={{ fontFamily: 'Sora, system-ui, sans-serif' }}>
                University of Waterloo
              </p>
              <p className="text-sm leading-relaxed text-gray-800" style={{ fontFamily: 'Sora, system-ui, sans-serif' }}>
                Prestigious scholarship recognizing exceptional leadership potential and academic excellence in computer science.
              </p>
            </div>

            <div className="bg-gradient-to-br from-[#FEB737] to-[#D4E0F0] rounded-lg border border-[#543787] p-6 hover:shadow-lg transition-all duration-200">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-[#543787] rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-[#543787]" style={{ fontFamily: 'Satoshi-Bold, Satoshi-Variable, system-ui, sans-serif' }}>
                  $30k+ in Funding
                </h3>
              </div>
              <p className="text-sm text-gray-700 mb-3" style={{ fontFamily: 'Sora, system-ui, sans-serif' }}>
                SucroSoil Project
              </p>
              <p className="text-sm leading-relaxed text-gray-800 mb-3" style={{ fontFamily: 'Sora, system-ui, sans-serif' }}>
                Secured funding from Emergent Ventures, 1517 Fund, and Rideau Hall Foundation for sustainable agriculture innovation.
              </p>
              <div className="flex flex-wrap gap-1">
                <span className="px-2 py-1 bg-[#543787] text-white rounded-full text-xs font-medium" style={{ fontFamily: 'Sora, system-ui, sans-serif' }}>
                  Emergent Ventures
                </span>
                <span className="px-2 py-1 bg-[#543787] text-white rounded-full text-xs font-medium" style={{ fontFamily: 'Sora, system-ui, sans-serif' }}>
                  1517 Fund
                </span>
                <span className="px-2 py-1 bg-[#543787] text-white rounded-full text-xs font-medium" style={{ fontFamily: 'Sora, system-ui, sans-serif' }}>
                  Rideau Hall
                </span>
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#7CB8C0] to-[#D4E0F0] rounded-lg border border-[#543787] p-6 hover:shadow-lg transition-all duration-200">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-[#543787] rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-[#543787]" style={{ fontFamily: 'Satoshi-Bold, Satoshi-Variable, system-ui, sans-serif' }}>
                  10,000+ Students Reached
                </h3>
              </div>
              <p className="text-sm text-gray-700 mb-3" style={{ fontFamily: 'Sora, system-ui, sans-serif' }}>
                Financial Literacy Impact
              </p>
              <p className="text-sm leading-relaxed text-gray-800 mb-3" style={{ fontFamily: 'Sora, system-ui, sans-serif' }}>
                Through FUSE Society and Target Alpha programs, created educational content and workshops reaching thousands of high school students nationwide.
              </p>
              <div className="flex flex-wrap gap-1">
                <span className="px-2 py-1 bg-[#543787] text-white rounded-full text-xs font-medium" style={{ fontFamily: 'Sora, system-ui, sans-serif' }}>
                  FUSE Society
                </span>
                <span className="px-2 py-1 bg-[#543787] text-white rounded-full text-xs font-medium" style={{ fontFamily: 'Sora, system-ui, sans-serif' }}>
                  Target Alpha
                </span>
                <span className="px-2 py-1 bg-[#543787] text-white rounded-full text-xs font-medium" style={{ fontFamily: 'Sora, system-ui, sans-serif' }}>
                  National Reach
                </span>
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#D4E0F0] to-[#FEB737] rounded-lg border border-[#543787] p-6 hover:shadow-lg transition-all duration-200">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-[#543787] rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-[#543787]" style={{ fontFamily: 'Satoshi-Bold, Satoshi-Variable, system-ui, sans-serif' }}>
                  Major Partnerships
                </h3>
              </div>
              <p className="text-sm text-gray-700 mb-3" style={{ fontFamily: 'Sora, system-ui, sans-serif' }}>
                Strategic Collaborations
              </p>
              <p className="text-sm leading-relaxed text-gray-800 mb-3" style={{ fontFamily: 'Sora, system-ui, sans-serif' }}>
                Established partnerships with leading organizations including TD Bank, Binance, and University of Toronto to expand program reach and impact.
              </p>
              <div className="flex flex-wrap gap-1">
                <span className="px-2 py-1 bg-[#543787] text-white rounded-full text-xs font-medium" style={{ fontFamily: 'Sora, system-ui, sans-serif' }}>
                  TD Bank
                </span>
                <span className="px-2 py-1 bg-[#543787] text-white rounded-full text-xs font-medium" style={{ fontFamily: 'Sora, system-ui, sans-serif' }}>
                  Binance
                </span>
                <span className="px-2 py-1 bg-[#543787] text-white rounded-full text-xs font-medium" style={{ fontFamily: 'Sora, system-ui, sans-serif' }}>
                  U of T
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full mb-8">
          <hr className="border-gray-300" />
        </div>

        <Footer />
      </main>
    </div>
  );
}
