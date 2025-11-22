'use client';

import React, { useEffect } from 'react';
import Book3DRender from './book3D-render';

export interface Book {
  id: number;
  title: string;
  author?: string;
  genres: string[];
  topics: string[];
  rating: number;
  lastRead: string;
  eli5: string;
  annotations: string;
  imageSrc?: string;
  pages?: number;
}

interface BookDetailPanelProps {
  book: Book | null;
  isOpen: boolean;
  onClose: () => void;
  getTagColor: (tag: string) => { bg: string; text: string; border: string };
  renderStars: (rating: number) => string;
}

export default function BookDetailPanel({
  book,
  isOpen,
  onClose,
  getTagColor,
  renderStars,
}: BookDetailPanelProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
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

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    } catch {
      return dateString;
    }
  };

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-96 md:max-w-md bg-white z-50 shadow-2xl transform transition-transform duration-300 ease-in-out overflow-y-auto ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ backgroundColor: 'var(--color-background, #ffffff)' }}
      >
        <div
          className="sticky top-0 z-10 flex items-center justify-between p-6 border-b"
          style={{
            backgroundColor: 'var(--color-background, #ffffff)',
            borderColor: 'var(--color-border, #e5e7eb)',
          }}
        >
          <h2
            className="text-2xl font-bold pr-4"
            style={{
              fontFamily: 'Satoshi-Bold, Satoshi-Variable, system-ui, sans-serif',
              color: 'var(--color-dark, #2d2d2d)',
            }}
          >
            {book.title}
          </h2>
          <button
            onClick={onClose}
            className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-md hover:bg-gray-100 transition-colors"
            style={{ color: 'var(--color-foreground, #2d2d2d)' }}
            aria-label="Close panel"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="p-6 space-y-6">
          <Book3DRender book={book} />
          <div className="flex items-center justify-between">
            <div>
              <p
                className="text-sm mb-1"
                style={{
                  fontFamily: 'Sora, system-ui, sans-serif',
                  color: 'var(--color-muted, #6b7280)',
                }}
              >
                Rating
              </p>
              <div
                className="text-yellow-500 text-lg"
                style={{ fontFamily: 'Sora, system-ui, sans-serif' }}
              >
                {renderStars(book.rating)}
              </div>
            </div>
            <div className="text-right">
              <p
                className="text-sm mb-1"
                style={{
                  fontFamily: 'Sora, system-ui, sans-serif',
                  color: 'var(--color-muted, #6b7280)',
                }}
              >
                Last Read
              </p>
              <p
                className="text-sm font-medium"
                style={{
                  fontFamily: 'Sora, system-ui, sans-serif',
                  color: 'var(--color-foreground, #2d2d2d)',
                }}
              >
                {formatDate(book.lastRead)}
              </p>
            </div>
          </div>
          {book.genres.length > 0 && (
            <div>
              <h3
                className="text-sm font-bold mb-2"
                style={{
                  fontFamily: 'Satoshi-Bold, Satoshi-Variable, system-ui, sans-serif',
                  color: 'var(--color-dark, #2d2d2d)',
                }}
              >
                Genres
              </h3>
              <div className="flex flex-wrap gap-2">
                {book.genres.map((genre, index) => {
                  const tagStyle = getTagColor(genre);
                  return (
                    <span
                      key={index}
                      className="px-3 py-1 rounded-md text-xs font-medium border"
                      style={{
                        backgroundColor: tagStyle.bg,
                        color: tagStyle.text,
                        borderColor: 'var(--color-secondary)',
                        fontFamily: 'Sora, system-ui, sans-serif',
                      }}
                    >
                      {genre}
                    </span>
                  );
                })}
              </div>
            </div>
          )}
          {book.topics.length > 0 && (
            <div>
              <h3
                className="text-sm font-bold mb-2"
                style={{
                  fontFamily: 'Satoshi-Bold, Satoshi-Variable, system-ui, sans-serif',
                  color: 'var(--color-dark, #2d2d2d)',
                }}
              >
                Topics
              </h3>
              <div className="flex flex-wrap gap-2">
                {book.topics.map((topic, index) => {
                  const tagStyle = getTagColor(topic);
                  return (
                    <span
                      key={index}
                      className="px-3 py-1 rounded-md text-xs font-medium border"
                      style={{
                        backgroundColor: tagStyle.bg,
                        color: tagStyle.text,
                        borderColor: 'var(--color-secondary)',
                        fontFamily: 'Sora, system-ui, sans-serif',
                      }}
                    >
                      {topic}
                    </span>
                  );
                })}
              </div>
            </div>
          )}
          {book.eli5 && book.eli5.trim() && (
            <div>
              <h3
                className="text-sm font-bold mb-2"
                style={{
                  fontFamily: 'Satoshi-Bold, Satoshi-Variable, system-ui, sans-serif',
                  color: 'var(--color-dark, #2d2d2d)',
                }}
              >
                ELI5
              </h3>
              <div
                className="text-sm leading-snug whitespace-pre-wrap"
                style={{
                  fontFamily: 'Sora, system-ui, sans-serif',
                  color: 'var(--color-foreground, #2d2d2d)',
                }}
              >
                {book.eli5}
              </div>
            </div>
          )}
          {book.annotations && book.annotations.trim() && (
            <div>
              <h3
                className="text-sm font-bold mb-2"
                style={{
                  fontFamily: 'Satoshi-Bold, Satoshi-Variable, system-ui, sans-serif',
                  color: 'var(--color-dark, #2d2d2d)',
                }}
              >
                Thoughts
              </h3>
              <div
                className="text-sm leading-relaxed whitespace-pre-wrap"
                style={{
                  fontFamily: 'Sora, system-ui, sans-serif',
                  color: 'var(--color-foreground, #2d2d2d)',
                }}
              >
                {book.annotations}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

