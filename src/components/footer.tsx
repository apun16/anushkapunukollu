import Image from "next/image";

export default function Footer() {
  return (
    <footer className="w-full flex flex-col items-center">
      {/* <div className="flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4 transition-all duration-200"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Resume
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4 transition-all duration-200"
          href="https://github.com/apun16/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Github
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4 transition-all duration-200"
          href="https://www.linkedin.com/in/apunukollu/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          LinkedIn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4 transition-all duration-200"
          href="mailto:anushka.punukollu@uwaterloo.ca"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Email
        </a>
      </div> */}
      <a
        style={{ fontFamily: 'Sora, system-ui, sans-serif', color: 'var(--color-foreground)' }}
      >
        last updated: oct 31, 2025 🫶🏼
      </a>
    </footer>
  );
}