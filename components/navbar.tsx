"use client"

import Link from "next/link";
import { CommandMenu } from "./CommandMenu";
import { useTheme } from "../src/contexts/ThemeContext";

interface NavbarProps {
  currentPage?: string;
}

export default function Navbar({ currentPage }: NavbarProps) {
  useTheme();

  return (
    <>
      <nav className="max-w-4xl w-full mx-auto mb-8">
        <div className="flex justify-between items-center">
          <Link 
            href="/" 
            className={`text-xl transition-all duration-200 ${
              currentPage === 'home' || currentPage === undefined
                ? 'underline underline-offset-4 text-[var(--color-primary)]' 
                : 'hover:underline underline-offset-4 text-[var(--color-primary)] hover:text-[var(--color-light)]'
            }`}
            style={{ fontFamily: 'Satoshi-Regular, Satoshi-Variable, system-ui, sans-serif' }}
          >
            anushka
          </Link>
          <div className="flex gap-6 items-center">
            <Link 
              href="/portfolio" 
              className={`text-xl transition-all duration-200 ${
                currentPage === 'portfolio' 
                  ? 'underline underline-offset-4 text-[var(--color-primary)]' 
                  : 'hover:underline underline-offset-4 text-[var(--color-foreground)] hover:text-[var(--color-light)]'
              }`}
              style={{ fontFamily: 'Satoshi-Regular, Satoshi-Variable, system-ui, sans-serif' }}
            >
              portfolio
            </Link>
            <Link 
              href="/bookshelf" 
              className={`text-xl transition-all duration-200 ${
                currentPage === 'bookshelf' 
                  ? 'underline underline-offset-4 text-[var(--color-primary)]' 
                  : 'hover:underline underline-offset-4 text-[var(--color-foreground)] hover:text-[var(--color-light)]'
              }`}
              style={{ fontFamily: 'Satoshi-Regular, Satoshi-Variable, system-ui, sans-serif' }}
            >
              bookshelf
            </Link>
            {/* Dark/Light toggle removed as requested */}
            <button
              className="flex items-center gap-2 px-3 py-1.5 text-sm border border-[var(--color-border)] rounded-lg hover:bg-[var(--color-background-light)] transition-colors"
              onClick={() => {
                const event = new KeyboardEvent('keydown', {
                  key: 'k',
                  metaKey: true,
                  ctrlKey: true
                });
                document.dispatchEvent(event);
              }}
              style={{ color: 'var(--color-foreground)' }}
            >
              <span className="text-[var(--color-muted)]">⌘</span>
              <span className="text-[var(--color-muted)]">K</span>
            </button>
          </div>
        </div>
      </nav>
      <CommandMenu />
    </>
  );
}