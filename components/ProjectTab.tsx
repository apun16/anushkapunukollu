import React from 'react';
import Image from 'next/image';

interface ProjectTabProps {
  title: string;
  description: string;
  languages: string[];
  imageSrc: string;
  githubUrl?: string;
  liveUrl?: string;
}

export default function ProjectTab({ 
  title, 
  description, 
  languages, 
  imageSrc, 
  githubUrl, 
  liveUrl 
}: ProjectTabProps) {
  return (
    <div className="bg-white rounded-lg border border-[#D4E0F0] p-6 hover:shadow-md hover:border-[#543787] transition-all duration-200">
      <div className="relative w-full h-48 bg-gray-100 rounded-lg mb-4 overflow-hidden">
        <Image
          src={imageSrc}
          alt={title}
          fill
          className="object-cover"
        />
      </div>

      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-bold" style={{ fontFamily: 'Satoshi-Bold, Satoshi-Variable, system-ui, sans-serif' }}>
          {title}
        </h3>
        <div className="flex gap-2">
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 bg-[#D4E0F0] rounded-md flex items-center justify-center hover:bg-[#FEB737] text-[#543787] hover:text-white transition-colors"
            >
              <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
          )}
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 bg-[#D4E0F0] rounded-md flex items-center justify-center hover:bg-[#FEB737] text-[#543787] hover:text-white transition-colors"
            >
              <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          )}
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-3">
        {languages.map((language, index) => (
          <span
            key={index}
            className="px-3 py-1 bg-[#D4E0F0] text-[#543787] rounded-full text-xs font-medium"
            style={{ fontFamily: 'Sora, system-ui, sans-serif' }}
          >
            {language}
          </span>
        ))}
      </div>

      <p className="text-sm text-gray-600 leading-relaxed" style={{ fontFamily: 'Sora, system-ui, sans-serif' }}>
        {description}
      </p>
    </div>
  );
}
