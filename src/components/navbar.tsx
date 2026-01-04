"use client"

import Link from "next/link";
import { CommandMenu } from "./ui/commandmenu";
import { useTheme } from "./contexts/theme-context";

interface NavbarProps {
  currentPage?: string;
}

export default function Navbar({ currentPage }: NavbarProps) {
  useTheme();

  return (
    <>
      <nav className="max-w-4xl w-full mx-auto mb-8 px-4">
        <div className="flex justify-between items-center flex-nowrap">
          {/* Logo */}
          <Link 
            href="/" 
            className={`transition-all duration-200 whitespace-nowrap ${
              currentPage === 'home' || currentPage === undefined
                ? 'underline underline-offset-4 text-[var(--color-primary)]' 
                : 'hover:underline underline-offset-4 text-[var(--color-primary)] hover:text-[var(--color-light)]'
            }`}
            style={{ fontFamily: 'Satoshi-Regular, Satoshi-Variable, system-ui, sans-serif', fontSize: '1.25rem' }} // 20px
          >
            anushka
          </Link>

          {/* Links + Command Button */}
          <div className="flex items-center gap-4 sm:gap-6 min-w-0">
            <Link 
              href="/portfolio" 
              className={`transition-all duration-200 whitespace-nowrap text-base sm:text-lg ${
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
              className={`transition-all duration-200 whitespace-nowrap text-base sm:text-lg ${
                currentPage === 'bookshelf' 
                  ? 'underline underline-offset-4 text-[var(--color-primary)]' 
                  : 'hover:underline underline-offset-4 text-[var(--color-foreground)] hover:text-[var(--color-light)]'
              }`}
              style={{ fontFamily: 'Satoshi-Regular, Satoshi-Variable, system-ui, sans-serif' }}
            >
              bookshelf
            </Link>

            <button
              className="flex items-center gap-1 px-2 py-1 text-sm sm:text-base border border-[var(--color-border)] rounded-lg hover:bg-[var(--color-background-light)] transition-colors"
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
              <span>⌘</span>
              <span>+</span>
              <span>K</span>
            </button>
          </div>
        </div>
      </nav>
      <CommandMenu />
    </>
  );
}