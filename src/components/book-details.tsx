'use client';

import React, { useEffect } from 'react';
import Book3DRender from './book3D-render';
import { BookStarRating } from './book-star-rating';
import { getTagColor } from '@/lib/book-tag-colors';

export interface Book {
  id: number;
  title: string;
  author?: string;
  genres: string[];
  topics: string[];
  rating: number;
  lastRead: string;
  tldr: string;
  annotations: string;
  imageSrc?: string;
  pages?: number;
  spineColor?: string;
}

interface BookDetailPanelProps {
  book: Book | null;
  isOpen: boolean;
  onClose: () => void;
}

const authorColor = '#404040';
const secondaryMetaColor = '#8b8b8b';

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="text-xs uppercase tracking-widest font-semibold mb-1.5"
      style={{
        fontFamily: 'Satoshi-Bold, Satoshi-Variable, system-ui, sans-serif',
        color: '#9ca3af',
        letterSpacing: '0.12em',
      }}
    >
      {children}
    </p>
  );
}

function Divider() {
  return <div className="w-full h-px bg-gray-100 mt-5 mb-2.5" />;
}

function Tag({ label }: { label: string }) {
  const s = getTagColor(label);
  return (
    <span
      className="inline-block text-xs px-2.5 py-1 rounded-md font-medium border"
      style={{
        fontFamily: 'Sora, system-ui, sans-serif',
        backgroundColor: s.bg,
        color: s.text,
        borderColor: s.border,
      }}
    >
      {label}
    </span>
  );
}

function formatDate(dateString: string) {
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch {
    return dateString;
  }
}

export default function BookDetailPanel({ book, isOpen, onClose }: BookDetailPanelProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!book || !isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/40 z-40 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[400px] z-50 shadow-2xl transform transition-transform duration-300 ease-in-out overflow-y-auto ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ backgroundColor: '#fafafa' }}
      >
        <div className="flex items-center justify-between px-6 pt-6 pb-2">
          <button
            onClick={onClose}
            className="flex items-center gap-2 text-sm transition-opacity hover:opacity-60"
            style={{
              fontFamily: 'Sora, system-ui, sans-serif',
              color: '#6b7280',
            }}
            aria-label="Close panel"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
            <span className="text-xs tracking-wide uppercase">Close</span>
          </button>
        </div>

        <div className="px-6 pb-10">
          <div className="mb-6">
            <Book3DRender book={book} />
          </div>

          <h2
            className="text-xl font-bold leading-snug mb-2"
            style={{
              fontFamily: 'Satoshi-Bold, Satoshi-Variable, system-ui, sans-serif',
              color: '#1a1a1a',
            }}
          >
            {book.title}
          </h2>

          {(book.author || book.pages != null) && (
            <div className="flex justify-between items-baseline gap-4 mb-3">
              <span
                className="text-[0.9375rem] leading-snug flex-1 min-w-0"
                style={{
                  fontFamily: 'Sora, system-ui, sans-serif',
                  color: authorColor,
                }}
              >
                {book.author ? `by ${book.author}` : '\u00a0'}
              </span>
              {book.pages != null && (
                <span
                  className="text-sm whitespace-nowrap shrink-0"
                  style={{
                    fontFamily: 'Sora, system-ui, sans-serif',
                    color: secondaryMetaColor,
                  }}
                >
                  {book.pages.toLocaleString()} pages
                </span>
              )}
            </div>
          )}

          <BookStarRating rating={book.rating} size="panel" className="mb-2" />

          <p
            className="text-sm mb-1"
            style={{
              fontFamily: 'Sora, system-ui, sans-serif',
              color: secondaryMetaColor,
            }}
          >
            Last read: {formatDate(book.lastRead)}
          </p>

          {book.tldr && book.tldr.trim() && (
            <>
              <Divider />
              <SectionLabel>TL;DR</SectionLabel>
              <p
                className="text-sm leading-relaxed whitespace-pre-wrap"
                style={{
                  fontFamily: 'Sora, system-ui, sans-serif',
                  color: '#374151',
                }}
              >
                {book.tldr}
              </p>
            </>
          )}

          {book.annotations && book.annotations.trim() && (
            <>
              <Divider />
              <SectionLabel>Thoughts</SectionLabel>
              <p
                className="text-sm leading-relaxed whitespace-pre-wrap"
                style={{
                  fontFamily: 'Sora, system-ui, sans-serif',
                  color: '#374151',
                }}
              >
                {book.annotations}
              </p>
            </>
          )}

          {(book.genres.length > 0 || book.topics.length > 0) && (
            <>
              <Divider />
              <SectionLabel>Genres & Topics</SectionLabel>
              <div className="flex flex-wrap gap-1.5">
                {[...book.genres, ...book.topics].map((tag, i) => (
                  <Tag key={i} label={tag} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
