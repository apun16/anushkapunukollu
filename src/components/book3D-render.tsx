'use client';

import React from 'react';
import Image from 'next/image';
import type { Book } from './book-details';

interface Book3DRenderProps {
  book: Book;
  className?: string;
}

export default function Book3DRender({ book, className = '' }: Book3DRenderProps) {
  if (!book.imageSrc) {
    return (
      <div className={`relative w-full aspect-[3/4] rounded-lg overflow-hidden bg-gray-200 flex items-center justify-center ${className}`}>
        <div className="text-gray-400 text-sm text-center px-4" style={{ fontFamily: 'Sora, system-ui, sans-serif' }}>
          No cover available
        </div>
      </div>
    );
  }

  const bookHeight = 300;
  const coverWidth = 200;
  let spineWidth: number;
  
  if (book.pages) {
    spineWidth = Math.min(80, Math.max(15, Math.round(15 + (book.pages * 0.08))));
  } else {
    spineWidth = 30;
  }
  return (
    <div className={`relative w-full flex items-center justify-center ${className}`} style={{ height: `${bookHeight}px`, minHeight: `${bookHeight}px` }}>
      <svg style={{ position: 'absolute', width: 0, height: 0, visibility: 'hidden' }}>
        <defs>
          <filter id="paper-texture" x="0%" y="0%" width="100%" height="100%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.9"
              numOctaves="8"
              result="noise"
            />
            <feDiffuseLighting
              in="noise"
              lightingColor="white"
              surfaceScale="1"
              result="diffLight"
            >
              <feDistantLight azimuth="45" elevation="35" />
            </feDiffuseLighting>
          </filter>
        </defs>
      </svg>
      <div
        className="relative"
        style={{
          perspective: '1000px',
          WebkitPerspective: '1000px',
          transformStyle: 'preserve-3d',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0px',
        }}
      >
        <div
          className="relative flex items-center justify-center"
          style={{
            width: `${spineWidth}px`,
            height: `${bookHeight}px`,
            backgroundColor: '#2d2d2d',
            color: '#ffffff',
            transformOrigin: 'right center',
            transform: 'translate3d(0, 0, 0) rotateY(-60deg)',
            transformStyle: 'preserve-3d',
            transition: 'all 500ms ease',
            filter: 'brightness(0.7) contrast(1.2)',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,
              pointerEvents: 'none',
              opacity: 0.3,
              filter: 'url(#paper-texture)',
            }}
          />
          <div
            style={{
              writingMode: 'vertical-rl',
              textOrientation: 'mixed',
              fontSize: '10px',
              fontFamily: 'Satoshi-Bold, Satoshi-Variable, system-ui, sans-serif',
              fontWeight: 'bold',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              maxHeight: `${bookHeight - 20}px`,
              padding: '10px 0',
              userSelect: 'none',
            }}
          >
            {book.title}
          </div>
        </div>
        <div
          className="relative overflow-hidden"
          style={{
            width: `${coverWidth}px`,
            height: `${bookHeight}px`,
            transformOrigin: 'left center',
            transform: 'translate3d(0, 0, 0) rotateY(30deg)',
            transformStyle: 'preserve-3d',
            transition: 'all 500ms ease',
            filter: 'brightness(0.9) contrast(1.1)',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,
              pointerEvents: 'none',
              opacity: 0.2,
              filter: 'url(#paper-texture)',
              zIndex: 2,
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              pointerEvents: 'none',
              background: `linear-gradient(to right, 
                rgba(255, 255, 255, 0) 0px, 
                rgba(255, 255, 255, 0.4) 2px, 
                rgba(255, 255, 255, 0.2) 4px, 
                rgba(255, 255, 255, 0.1) 6px, 
                transparent 8px)`,
              zIndex: 1,
            }}
          />
          <Image
            src={book.imageSrc}
            alt={book.title}
            width={coverWidth}
            height={bookHeight}
            className="object-cover"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
            unoptimized
          />
        </div>
        <div
          style={{
            position: 'absolute',
            bottom: '-20px',
            left: '50%',
            transform: 'translateX(-50%) translateZ(-50px)',
            width: `${coverWidth * 0.8}px`,
            height: '20px',
            background: 'radial-gradient(ellipse, rgba(0, 0, 0, 0.3), transparent)',
            borderRadius: '50%',
            filter: 'blur(10px)',
            zIndex: -1,
          }}
        />
      </div>
    </div>
  );
}
