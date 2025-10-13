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
          className="text-base hover:underline underline-offset-4 transition-all duration-200"
          style={{ fontFamily: 'Satoshi-Regular, Satoshi-Variable, system-ui, sans-serif' }}
        >
          anushka
        </Link>
        <div className="flex gap-8">
          <Link 
            href="/projects" 
            className={`text-base transition-all duration-200 ${
              currentPage === 'projects' 
                ? 'underline underline-offset-4' 
                : 'hover:underline underline-offset-4'
            }`}
            style={{ fontFamily: 'Satoshi-Regular, Satoshi-Variable, system-ui, sans-serif' }}
          >
            projects
          </Link>
          <Link 
            href="/bookshelf" 
            className={`text-base transition-all duration-200 ${
              currentPage === 'bookshelf' 
                ? 'underline underline-offset-4' 
                : 'hover:underline underline-offset-4'
            }`}
            style={{ fontFamily: 'Satoshi-Regular, Satoshi-Variable, system-ui, sans-serif' }}
          >
            bookshelf
          </Link>
          <Link 
            href="/rabbit-holes" 
            className={`text-base transition-all duration-200 ${
              currentPage === 'rabbit-holes' 
                ? 'underline underline-offset-4' 
                : 'hover:underline underline-offset-4'
            }`}
            style={{ fontFamily: 'Satoshi-Regular, Satoshi-Variable, system-ui, sans-serif' }}
          >
            rabbit holes
          </Link>
        </div>
      </div>
    </nav>
  );
}