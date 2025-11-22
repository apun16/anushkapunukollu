import Image from "next/image";

export default function Footer() {
  return (
    <footer className="w-full flex flex-col items-center">
      <a
        style={{ fontFamily: 'Sora, system-ui, sans-serif', color: 'var(--color-foreground)' }}
      >
        last updated: november 22, 2025 🫶🏼
      </a>
    </footer>
  );
}