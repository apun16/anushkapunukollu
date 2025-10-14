import Link from "next/link";

interface NavbarProps {
  currentPage?: string;
}

export default function Navbar({ currentPage }: NavbarProps) {
  return (
    <nav className="max-w-4xl w-full mx-auto mb-8">
      <div className="flex justify-between items-center">
        <Link 
          href="/" 
          className={`text-xl transition-all duration-200 ${
            currentPage === 'home' || currentPage === undefined
              ? 'underline underline-offset-4 text-[#543787]' 
              : 'hover:underline underline-offset-4 text-[#543787] hover:text-[#D4E0F0]'
          }`}
          style={{ fontFamily: 'Satoshi-Regular, Satoshi-Variable, system-ui, sans-serif' }}
        >
          anushka
        </Link>
        <div className="flex gap-10">
          <Link 
            href="/portfolio" 
            className={`text-xl transition-all duration-200 ${
              currentPage === 'portfolio' 
                ? 'underline underline-offset-4 text-[#543787]' 
                : 'hover:underline underline-offset-4 text-black hover:text-[#D4E0F0]'
            }`}
            style={{ fontFamily: 'Satoshi-Regular, Satoshi-Variable, system-ui, sans-serif' }}
          >
            portfolio
          </Link>
          <Link 
            href="/bookshelf" 
            className={`text-xl transition-all duration-200 ${
              currentPage === 'bookshelf' 
                ? 'underline underline-offset-4 text-[#543787]' 
                : 'hover:underline underline-offset-4 text-black hover:text-[#D4E0F0]'
            }`}
            style={{ fontFamily: 'Satoshi-Regular, Satoshi-Variable, system-ui, sans-serif' }}
          >
            bookshelf
          </Link>
        </div>
      </div>
    </nav>
  );
}