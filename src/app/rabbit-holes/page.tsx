'use client';

import { useRef, useCallback, useState, useEffect, useLayoutEffect } from 'react';
import { Caveat } from 'next/font/google';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';

const scribble = Caveat({ subsets: ['latin'], weight: ['600'] });

const CANVAS_W = 7600;
const CANVAS_H = 7600;
const CARD_OX = 4000;
const CARD_OY = 4100;
const SCRIBBLE_LEFT = CARD_OX + 650;
const SCRIBBLE_TOP = CARD_OY + 205;
const MIN_ZOOM = 0.35;
const MAX_ZOOM = 1;
const H = 'Satoshi-Bold, Satoshi-Variable, system-ui, sans-serif';
const B = 'Sora, system-ui, sans-serif';

type Anchor = 'tape-center' | 'tape-left' | 'tape-right' | 'tape-both' | 'pin';

interface CardData {
  id: string;
  x: number;
  y: number;
  w: number;
  rotate: number;
  borderColor: string;
  bg: string;
  anchor: Anchor;
  anchorColor: string;
  children: React.ReactNode;
}

function RhTopic({
  title,
  body,
  titleColor,
  bodyColor,
}: {
  title: string;
  body: string;
  titleColor: string;
  bodyColor: string;
}) {
  return (
    <>
      <p
        className="text-[0.7rem] font-bold leading-tight mb-1.5 tracking-tight"
        style={{ fontFamily: H, color: titleColor }}
      >
        {title}
      </p>
      <p className="text-[0.62rem] leading-relaxed" style={{ fontFamily: B, color: bodyColor }}>
        {body}
      </p>
    </>
  );
}

function RhQuote({
  quote,
  attribution,
  textColor,
}: {
  quote: string;
  attribution: string;
  textColor: string;
}) {
  return (
    <>
      <p className="text-[0.62rem] italic leading-relaxed mb-1" style={{ fontFamily: B, color: textColor }}>
        &ldquo;{quote}&rdquo;
      </p>
      <p className="text-[0.55rem] opacity-90" style={{ fontFamily: B, color: textColor }}>
        — {attribution}
      </p>
    </>
  );
}

function ExploreScribbleHint() {
  return (
    <div
      className={scribble.className}
      style={{
        position: 'absolute',
        left: SCRIBBLE_LEFT,
        top: SCRIBBLE_TOP,
        transform: 'rotate(-2.2deg)',
        zIndex: 0,
        color: 'var(--color-dark)',
        userSelect: 'none',
        pointerEvents: 'none',
        fontSize: '1.7rem',
        lineHeight: 1.05,
      }}
      aria-hidden
    >
      P.S. scroll to explore more!!
    </div>
  );
}

function CardAnchor({ anchor, color }: { anchor: Anchor; color: string }) {
  if (anchor === 'pin') {
    return <div className="card-pin" style={{ backgroundColor: color }} />;
  }
  const tapes: React.ReactNode[] = [];
  if (anchor === 'tape-center') {
    tapes.push(<div key="c" className="card-tape" style={{ backgroundColor: color, width: '84px', left: '50%', transform: 'translateX(-50%)' }} />);
  }
  if (anchor === 'tape-left' || anchor === 'tape-both') {
    tapes.push(<div key="l" className="card-tape" style={{ backgroundColor: color, width: '76px', left: '8px', transform: 'rotate(-5deg)' }} />);
  }
  if (anchor === 'tape-right' || anchor === 'tape-both') {
    tapes.push(<div key="r" className="card-tape" style={{ backgroundColor: color, width: '76px', right: '8px', left: 'auto', transform: 'rotate(4deg)' }} />);
  }
  return <>{tapes}</>;
}

type Corner = 'tl' | 'tr' | 'bl' | 'br';

function InteractiveCard({
  card,
  stackZ,
  bringToFront,
  zoom,
}: {
  card: CardData;
  stackZ: number | undefined;
  bringToFront: () => void;
  zoom: number;
}) {
  const [pos, setPos] = useState({ x: card.x, y: card.y });
  const [size, setSize] = useState<{ w: number; h: number } | null>(null);
  const [active, setActive] = useState<'drag' | 'resize' | null>(null);
  const cornerRef = useRef<Corner>('br');
  const startRef = useRef({ px: 0, py: 0, ox: 0, oy: 0, w: 0, h: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const clamp = useCallback((nx: number, ny: number, cw?: number, ch?: number) => {
    const el = cardRef.current;
    if (!el) return { x: nx, y: ny };
    const w = cw ?? (size ? size.w : el.offsetWidth);
    const h = ch ?? (size ? size.h : el.offsetHeight);
    return {
      x: Math.max(0, Math.min(nx, CANVAS_W - w)),
      y: Math.max(0, Math.min(ny, CANVAS_H - h)),
    };
  }, [size]);

  const onCardDown = useCallback((e: React.PointerEvent) => {
    if ((e.target as HTMLElement).closest('[data-handle]')) return;
    e.stopPropagation();
    bringToFront();
    setActive('drag');
    startRef.current = { ...startRef.current, px: e.clientX, py: e.clientY, ox: pos.x, oy: pos.y };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  }, [pos, bringToFront]);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!active) return;
    const s = startRef.current;
    const z = zoom || 1;
    const dx = (e.clientX - s.px) / z;
    const dy = (e.clientY - s.py) / z;

    if (active === 'drag') {
      setPos(clamp(s.ox + dx, s.oy + dy));
    } else if (active === 'resize') {
      const c = cornerRef.current;
      let nw = s.w, nh = s.h, nox = s.ox, noy = s.oy;
      if (c === 'br') { nw = s.w + dx; nh = s.h + dy; }
      else if (c === 'bl') { nw = s.w - dx; nh = s.h + dy; nox = s.ox + dx; }
      else if (c === 'tr') { nw = s.w + dx; nh = s.h - dy; noy = s.oy + dy; }
      else if (c === 'tl') { nw = s.w - dx; nh = s.h - dy; nox = s.ox + dx; noy = s.oy + dy; }
      nw = Math.max(80, nw);
      nh = Math.max(40, nh);
      setSize({ w: nw, h: nh });
      if (c !== 'br') setPos(clamp(nox, noy, nw, nh));
    }
  }, [active, clamp, zoom]);

  const onPointerUp = useCallback(() => setActive(null), []);

  const onResizeDown = useCallback((corner: Corner) => (e: React.PointerEvent) => {
    e.stopPropagation();
    bringToFront();
    const el = cardRef.current!;
    cornerRef.current = corner;
    startRef.current = { ...startRef.current, px: e.clientX, py: e.clientY, w: el.offsetWidth, h: el.offsetHeight, ox: pos.x, oy: pos.y };
    setActive('resize');
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }, [pos, bringToFront]);

  const isActive = active !== null;

  return (
    <div
      ref={cardRef}
      className={`sketch-card${isActive ? ' sketch-card--active' : ''}`}
      onPointerDown={onCardDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      style={{
        position: 'absolute',
        left: pos.x,
        top: pos.y,
        width: size ? size.w : card.w,
        height: size ? size.h : undefined,
        transform: `rotate(${card.rotate}deg)`,
        borderColor: card.borderColor,
        backgroundColor: card.bg,
        zIndex: stackZ ?? 1,
        pointerEvents: 'auto',
      }}
    >
      <CardAnchor anchor={card.anchor} color={card.anchorColor} />
      <div className={`sketch-card-clip${size ? ' sketch-card-clip--fill' : ''}`}>
        <div className="px-2.5 py-2">{card.children}</div>
      </div>

      <div data-handle="1" className="corner-handle tl" onPointerDown={onResizeDown('tl')} onPointerMove={onPointerMove} onPointerUp={onPointerUp} />
      <div data-handle="1" className="corner-handle tr" onPointerDown={onResizeDown('tr')} onPointerMove={onPointerMove} onPointerUp={onPointerUp} />
      <div data-handle="1" className="corner-handle bl" onPointerDown={onResizeDown('bl')} onPointerMove={onPointerMove} onPointerUp={onPointerUp} />
      <div data-handle="1" className="corner-handle br" onPointerDown={onResizeDown('br')} onPointerMove={onPointerMove} onPointerUp={onPointerUp} />

    </div>
  );
}

export default function RabbitHoles() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const didInitPan = useRef(false);
  const [isPanning, setIsPanning] = useState(false);
  const panStart = useRef({ px: 0, py: 0, ox: 0, oy: 0 });
  const nextStackZ = useRef(10);
  const [zMap, setZMap] = useState<Record<string, number>>({});
  const viewRef = useRef({ pan: { x: 0, y: 0 }, zoom: 1 });
  viewRef.current = { pan, zoom };

  const bringToFront = useCallback((id: string) => {
    nextStackZ.current += 1;
    setZMap((prev) => ({ ...prev, [id]: nextStackZ.current }));
  }, []);

  const clampPanPair = useCallback((nx: number, ny: number, z: number) => {
    if (!viewportRef.current) return { x: nx, y: ny };
    const vw = viewportRef.current.offsetWidth;
    const vh = viewportRef.current.offsetHeight;
    const sw = CANVAS_W * z;
    const sh = CANVAS_H * z;
    const minX = sw >= vw ? -(sw - vw) : 0;
    const maxX = sw >= vw ? 0 : vw - sw;
    const minY = sh >= vh ? -(sh - vh) : 0;
    const maxY = sh >= vh ? 0 : vh - sh;
    return {
      x: Math.max(minX, Math.min(maxX, nx)),
      y: Math.max(minY, Math.min(maxY, ny)),
    };
  }, []);

  const onBgDown = useCallback((e: React.PointerEvent) => {
    if ((e.target as HTMLElement).closest('.sketch-card, .rh-zoom-ui')) return;
    setIsPanning(true);
    panStart.current = { px: e.clientX, py: e.clientY, ox: pan.x, oy: pan.y };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  }, [pan]);

  const onBgMove = useCallback((e: React.PointerEvent) => {
    if (!isPanning) return;
    setPan(clampPanPair(
      panStart.current.ox + (e.clientX - panStart.current.px),
      panStart.current.oy + (e.clientY - panStart.current.py),
      zoom,
    ));
  }, [isPanning, clampPanPair, zoom]);

  const onBgUp = useCallback(() => setIsPanning(false), []);

  useLayoutEffect(() => {
    if (didInitPan.current || !viewportRef.current) return;
    const el = viewportRef.current;
    const vw = el.clientWidth;
    const vh = el.clientHeight;
    const focusX = CARD_OX + 450;
    const focusY = CARD_OY + 520;
    const p = clampPanPair(vw / 2 - focusX, vh / 2 - focusY, 1);
    setPan(p);
    didInitPan.current = true;
  }, [clampPanPair]);

  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      const isZoom = e.ctrlKey || e.metaKey;
      if (isZoom) {
        e.preventDefault();
        const { pan: p, zoom: z } = viewRef.current;
        const factor = Math.exp(-e.deltaY * 0.0012);
        const nextZ = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, z * factor));
        if (Math.abs(nextZ - z) < 1e-9) return;
        const vw = el.clientWidth;
        const vh = el.clientHeight;
        const cx = vw / 2;
        const cy = vh / 2;
        const worldX = (cx - p.x) / z;
        const worldY = (cy - p.y) / z;
        const nx = cx - worldX * nextZ;
        const ny = cy - worldY * nextZ;
        setZoom(nextZ);
        setPan(clampPanPair(nx, ny, nextZ));
        return;
      }
      e.preventDefault();
      setPan((prev) => {
        const { zoom: z } = viewRef.current;
        const dx = e.shiftKey ? e.deltaY : e.deltaX;
        const dy = e.shiftKey ? 0 : e.deltaY;
        return clampPanPair(prev.x - dx, prev.y - dy, z);
      });
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, [clampPanPair]);

  const applyZoom = useCallback(
    (targetZ: number) => {
      const el = viewportRef.current;
      const { pan: p, zoom: prevZ } = viewRef.current;
      const z = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, targetZ));
      if (!el || Math.abs(z - prevZ) < 1e-9) return;
      const vw = el.clientWidth;
      const vh = el.clientHeight;
      const cx = vw / 2;
      const cy = vh / 2;
      const worldX = (cx - p.x) / prevZ;
      const worldY = (cy - p.y) / prevZ;
      setZoom(z);
      setPan(clampPanPair(cx - worldX * z, cy - worldY * z, z));
    },
    [clampPanPair],
  );

  const cards: CardData[] = [
    {
      id: 'dying-languages', x: CARD_OX + 30, y: CARD_OY + 30, w: 260, rotate: -1.5,
      borderColor: 'var(--color-primary)', bg: 'var(--color-background, #fff)',
      anchor: 'tape-center', anchorColor: 'var(--color-accent)',
      children: (
        <RhTopic
          title="Endangered languages"
          body="Each fading language carries metaphors and stories that rarely translate. Linguistic diversity is a map of how humans have thought in different keys."
          titleColor="var(--color-primary)"
          bodyColor="var(--color-muted)"
        />
      ),
    },
    {
      id: 'art-forgery', x: CARD_OX + 360, y: CARD_OY + 50, w: 200, rotate: 2.2,
      borderColor: 'var(--color-secondary)', bg: 'var(--color-background, #fff)',
      anchor: 'pin', anchorColor: 'var(--color-dark)',
      children: (
        <RhTopic
          title="Art & forgery"
          body="Pigment chemistry, X-ray, and provenance trails—how experts catch fakes, and why the market’s obsession with authenticity is its own story."
          titleColor="var(--color-dark)"
          bodyColor="var(--color-muted)"
        />
      ),
    },
    {
      id: 'quote-proust', x: CARD_OX + 610, y: CARD_OY + 30, w: 188, rotate: -0.8,
      borderColor: 'var(--color-primary)', bg: 'var(--color-primary)',
      anchor: 'tape-right', anchorColor: 'var(--color-light)',
      children: (
        <RhQuote
          quote="The real voyage of discovery consists not in seeking new landscapes, but in having new eyes."
          attribution="Marcel Proust"
          textColor="#fff"
        />
      ),
    },
    {
      id: 'ethics-progress', x: CARD_OX + 50, y: CARD_OY + 300, w: 200, rotate: 1.2,
      borderColor: 'var(--color-dark)', bg: 'var(--color-background, #fff)',
      anchor: 'tape-left', anchorColor: 'var(--color-secondary)',
      children: (
        <RhTopic
          title="Ethics of progress"
          body="When does moving fast break things that matter? I keep returning to trade-offs between speed, care, and who gets heard."
          titleColor="var(--color-dark)"
          bodyColor="var(--color-muted)"
        />
      ),
    },
    {
      id: 'internet-geography', x: CARD_OX + 320, y: CARD_OY + 280, w: 288, rotate: -1,
      borderColor: 'var(--color-accent)', bg: 'var(--color-background, #fff)',
      anchor: 'pin', anchorColor: 'var(--color-accent)',
      children: (
        <RhTopic
          title="Internet geography"
          body="Cables on seabeds, exchange points in cities—the net isn’t weightless. Physical maps of data still shape latency, power, and politics."
          titleColor="var(--color-dark)"
          bodyColor="var(--color-muted)"
        />
      ),
    },
    {
      id: 'quote-einstein', x: CARD_OX + 690, y: CARD_OY + 290, w: 178, rotate: -2.2,
      borderColor: 'var(--color-dark)', bg: 'var(--color-dark)',
      anchor: 'pin', anchorColor: 'var(--color-secondary)',
      children: (
        <RhQuote
          quote="The important thing is not to stop questioning. Curiosity has its own reason for existing."
          attribution="Albert Einstein"
          textColor="#fff"
        />
      ),
    },
    {
      id: 'open-source', x: CARD_OX + 40, y: CARD_OY + 540, w: 198, rotate: 1.8,
      borderColor: 'var(--color-secondary)', bg: 'var(--color-background, #fff)',
      anchor: 'tape-both', anchorColor: 'var(--color-light)',
      children: (
        <RhTopic
          title="Open source"
          body="Communities maintaining code in public—governance, burnout, and the strange kindness of strangers reviewing your PRs."
          titleColor="var(--color-secondary)"
          bodyColor="var(--color-muted)"
        />
      ),
    },
    {
      id: 'evolution-computing', x: CARD_OX + 310, y: CARD_OY + 560, w: 205, rotate: 0.6,
      borderColor: 'var(--color-accent)', bg: 'var(--color-background, #fff)',
      anchor: 'tape-center', anchorColor: 'var(--color-accent)',
      children: (
        <RhTopic
          title="Evolution × computing"
          body="Genetic algorithms, neural scaling, and biological inspiration—when should systems imitate life, and when is that a distraction?"
          titleColor="var(--color-dark)"
          bodyColor="var(--color-muted)"
        />
      ),
    },
    {
      id: 'sisyphus-note', x: CARD_OX + 580, y: CARD_OY + 530, w: 210, rotate: -1.4,
      borderColor: 'var(--color-primary)', bg: 'var(--color-light)',
      anchor: 'tape-left', anchorColor: 'var(--color-primary)',
      children: (
        <RhTopic
          title="Sisyphus, happily"
          body="Camus on the myth: the struggle itself is enough to fill a heart. A useful counterweight to hustle culture and infinite optimization."
          titleColor="var(--color-primary)"
          bodyColor="var(--color-foreground, #1a1a1a)"
        />
      ),
    },
    {
      id: 'mythology', x: CARD_OX + 60, y: CARD_OY + 800, w: 288, rotate: 1.5,
      borderColor: 'var(--color-accent)', bg: 'var(--color-background, #fff)',
      anchor: 'tape-both', anchorColor: 'var(--color-accent)',
      children: (
        <RhTopic
          title="Myth across cultures"
          body="Same narrative shapes, different names—creation, tricksters, floods. Comparative myth is a back door into how groups encode values."
          titleColor="var(--color-dark)"
          bodyColor="var(--color-muted)"
        />
      ),
    },
    {
      id: 'question-wisdom', x: CARD_OX + 440, y: CARD_OY + 820, w: 195, rotate: -0.5,
      borderColor: 'var(--color-primary)', bg: 'var(--color-light)',
      anchor: 'pin', anchorColor: 'var(--color-primary)',
      children: (
        <RhTopic
          title="What is wisdom now?"
          body="With endless information and shallow certainty, what would it mean to be wise—not just well-read?"
          titleColor="var(--color-primary)"
          bodyColor="var(--color-foreground, #1a1a1a)"
        />
      ),
    },
    {
      id: 'photography', x: CARD_OX + 680, y: CARD_OY + 790, w: 198, rotate: 1,
      borderColor: 'var(--color-dark)', bg: 'var(--color-background, #fff)',
      anchor: 'tape-center', anchorColor: 'var(--color-accent)',
      children: (
        <RhTopic
          title="Light & frame"
          body="Photography as editing reality in milliseconds—what you exclude is as loud as what you include."
          titleColor="var(--color-dark)"
          bodyColor="var(--color-muted)"
        />
      ),
    },
  ];

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: 'var(--color-background, #ffffff)' }}
    >
      <main className="max-w-5xl mx-auto px-6 py-8 w-full">
        <Navbar currentPage="rabbit-holes" />
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 leading-tight" style={{ fontFamily: H, color: 'var(--color-dark)' }}>
            rabbit holes
          </h1>
          <p className="text-sm leading-relaxed w-full mb-3" style={{ fontFamily: B, color: 'var(--color-muted)' }}>
            art, topics, and quotes I&apos;ve found interesting
          </p>
        </div>

        <div
          ref={viewportRef}
          className="canvas-viewport pinboard-surface w-full mb-6 relative"
          style={{ height: '68vh' }}
          onPointerDown={onBgDown}
          onPointerMove={onBgMove}
          onPointerUp={onBgUp}
          onPointerLeave={onBgUp}
        >
          <div
            className="rh-zoom-ui absolute top-2 left-2 z-50 flex items-center gap-1 rounded-md border px-1 py-0.5 text-xs"
            style={{
              fontFamily: B,
              backgroundColor: 'var(--color-background, #fff)',
              borderColor: 'var(--color-border)',
              color: 'var(--color-foreground)',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              pointerEvents: 'auto',
            }}
            onPointerDown={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="px-2 py-1 rounded hover:opacity-80"
              aria-label="Zoom out"
              onPointerDown={(e) => e.stopPropagation()}
              onClick={(e) => {
                e.stopPropagation();
                applyZoom(zoom / 1.15);
              }}
            >
              −
            </button>
            <span className="min-w-[3rem] text-center tabular-nums opacity-80">{Math.round(zoom * 100)}%</span>
            <button
              type="button"
              className="px-2 py-1 rounded hover:opacity-80 disabled:opacity-35 disabled:pointer-events-none"
              aria-label="Zoom in"
              disabled={zoom >= MAX_ZOOM - 1e-6}
              onPointerDown={(e) => e.stopPropagation()}
              onClick={(e) => {
                e.stopPropagation();
                applyZoom(zoom * 1.15);
              }}
            >
              +
            </button>
            <button
              type="button"
              className="px-1.5 py-1 ml-0.5 rounded text-[0.65rem] hover:opacity-80"
              aria-label="Reset"
              onPointerDown={(e) => e.stopPropagation()}
              onClick={(e) => {
                e.stopPropagation();
                setZoom(1);
                if (viewportRef.current) {
                  const el = viewportRef.current;
                  const vw = el.offsetWidth;
                  const vh = el.offsetHeight;
                  const focusX = CARD_OX + 450;
                  const focusY = CARD_OY + 520;
                  setPan(clampPanPair(vw / 2 - focusX, vh / 2 - focusY, 1));
                }
              }}
            >
              Reset
            </button>
          </div>
          <div
            className="rh-cork-canvas"
            style={{
              position: 'relative',
              width: CANVAS_W,
              height: CANVAS_H,
              transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
              transformOrigin: '0 0',
              willChange: 'transform',
              pointerEvents: 'none',
            }}
          >
            <ExploreScribbleHint />
            {cards.map((card) => (
              <InteractiveCard
                key={card.id}
                card={card}
                stackZ={zMap[card.id]}
                bringToFront={() => bringToFront(card.id)}
                zoom={zoom}
              />
            ))}
          </div>
        </div>

        <div className="w-full mb-4">
          <hr style={{ borderColor: 'var(--color-border)' }} />
        </div>
        <Footer />
      </main>
    </div>
  );
}
