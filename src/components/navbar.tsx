"use client"

import Link from "next/link";
import { CommandMenu } from "./ui/commandmenu";
import { useTheme } from "./contexts/theme-context";

interface NavbarProps {
  currentPage?: string;
}

import { Rabbit } from "lucide-react";

export default function Navbar({ currentPage }: NavbarProps) {
  useTheme();

  return (
    <>
      <nav className="w-full mb-8">
        <div className="flex justify-between items-center flex-nowrap">
          <Link 
            href="/" 
            className={`transition-all duration-200 whitespace-nowrap text-base sm:text-lg md:text-xl lg:text-[1.5rem] ${
              currentPage === 'home' || currentPage === undefined
                ? 'underline underline-offset-4 text-[var(--color-primary)]' 
                : 'hover:underline underline-offset-4 text-[var(--color-primary)] hover:text-[var(--color-light)]'
            }`}
            style={{ fontFamily: 'Satoshi-Regular, Satoshi-Variable, system-ui, sans-serif' }}
          >
            anushka
          </Link>

          <div className="flex items-center gap-6 sm:gap-8 min-w-0">
            <Link 
              href="/portfolio" 
              className={`transition-all duration-200 whitespace-nowrap text-base sm:text-lg md:text-xl lg:text-[1.5rem] ${
                currentPage === 'experiences' 
                  ? 'underline underline-offset-4 text-[var(--color-primary)]' 
                  : 'hover:underline underline-offset-4 text-[var(--color-foreground)] hover:text-[var(--color-light)]'
              }`}
              style={{ fontFamily: 'Satoshi-Regular, Satoshi-Variable, system-ui, sans-serif' }}
            >
              portfolio
            </Link>
            <Link 
              href="/bookshelf" 
              className={`transition-all duration-200 whitespace-nowrap text-base sm:text-lg md:text-xl lg:text-[1.5rem] ${
                currentPage === 'bookshelf' 
                  ? 'underline underline-offset-4 text-[var(--color-primary)]' 
                  : 'hover:underline underline-offset-4 text-[var(--color-foreground)] hover:text-[var(--color-light)]'
              }`}
              style={{ fontFamily: 'Satoshi-Regular, Satoshi-Variable, system-ui, sans-serif' }}
            >
              bookshelf
            </Link>
            <Link 
              href="/rabbit-holes" 
              className={`group flex items-center transition-all duration-200 whitespace-nowrap text-base sm:text-lg md:text-xl lg:text-[1.5rem] ${
                currentPage === 'rabbit-holes' 
                  ? 'underline underline-offset-4 text-[var(--color-primary)]' 
                  : 'hover:underline underline-offset-4 text-[var(--color-foreground)] hover:text-[var(--color-light)]'
              }`}
              style={{ fontFamily: 'Satoshi-Regular, Satoshi-Variable, system-ui, sans-serif' }}
            >
              <Rabbit className="mr-2 h-5 w-5 sm:h-6 w-6 inline-block transition-transform duration-300 group-hover:animate-spin" />
            </Link>

            <button
              className="flex items-center gap-1 px-2 py-1 text-sm sm:text-base md:text-[1.25rem] border border-[var(--color-border)] rounded-lg transition-all duration-200 ease-out hover:scale-105 hover:bg-[var(--color-background-light)] active:scale-[0.98]"
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