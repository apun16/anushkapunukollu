export default function Footer() {
  const labelClass =
    "inline-block max-w-0 overflow-hidden whitespace-nowrap opacity-0 -translate-x-1 transition-[max-width,opacity,transform] duration-1000 ease-[cubic-bezier(0.1,0,0.1,1)] group-hover:max-w-[100px] group-hover:opacity-100 group-hover:translate-x-0";

  return (
    <footer
      className="w-full flex flex-col items-center leading-tight"
      style={{ fontFamily: "Sora, system-ui, sans-serif", color: "var(--color-foreground)" }}
    >
      <span className="text-sm mt-1 mb-3 opacity-80">last updated: february 12th, 2026 🫶🏼 </span>
      <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
        <div className="flex items-center gap-2 text-[var(--color-primary)]">
          <a
            href={`https://cs.uwatering.com/#https://anushkapunukollu.com/?nav=prev`}
            className="hover:underline"
          >
            ←
          </a>
          <a
            href={`https://cs.uwatering.com/#https://anushkapunukollu.com/`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="CS Webring"
            className="inline-block w-6 h-6 shrink-0 opacity-90"
          >
            <span className="sr-only">CS Webring</span>
          </a>
          <a
            href={`https://cs.uwatering.com/#https://anushkapunukollu.com/?nav=next`}
            className="hover:underline"
          >
            →
          </a>
        </div>
      </div>
    </footer>
  );
}