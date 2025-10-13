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

export default function Projects() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProjects = sampleProjects.filter(project =>
    project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.languages.some(lang => lang.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="font-sans min-h-screen p-6 pb-12 sm:p-12">
      <Navbar currentPage="projects" />
      
      <main className="flex flex-col gap-6 items-center sm:items-start max-w-6xl w-full mx-auto">
        <div className="w-full">
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight" style={{ fontFamily: 'Satoshi-Bold, Satoshi-Variable, system-ui, sans-serif' }}>
            projects
          </h1>
        </div>

        {/* Search Bar */}
        <div className="w-full">
          <div className="relative">
            <input
              type="text"
              placeholder="Search languages, projects, etc..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              style={{ fontFamily: 'Space Grotesk, system-ui, sans-serif' }}
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

        <div className="w-full">
          <hr className="border-gray-300" />
        </div>

        <Footer />
      </main>
    </div>
  );
}
