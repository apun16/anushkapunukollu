'use client';

import React, { useRef, useCallback, useState, useEffect, useLayoutEffect } from 'react';
import { Caveat } from 'next/font/google';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';

const scribble = Caveat({ subsets: ['latin'], weight: ['600'] });

const CANVAS_W = 9600;
const CANVAS_H = 9600;
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
  const [rotation, setRotation] = useState(card.rotate);
  const [active, setActive] = useState<'drag' | 'resize' | 'rotate' | null>(null);
  const cornerRef = useRef<Corner>('br');
  const startRef = useRef({ px: 0, py: 0, ox: 0, oy: 0, w: 0, h: 0, rot: 0, cx: 0, cy: 0 });
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
    } else if (active === 'rotate') {
      const rect = cardRef.current!.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const angle = Math.atan2(e.clientY - cy, e.clientX - cx) * (180 / Math.PI);
      const startAngle = Math.atan2(s.py - s.cy, s.px - s.cx) * (180 / Math.PI);
      setRotation(s.rot + (angle - startAngle));
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

  const onRotateDown = useCallback((e: React.PointerEvent) => {
    e.stopPropagation();
    bringToFront();
    const rect = cardRef.current!.getBoundingClientRect();
    startRef.current = { ...startRef.current, px: e.clientX, py: e.clientY, rot: rotation, cx: rect.left + rect.width / 2, cy: rect.top + rect.height / 2 };
    setActive('rotate');
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }, [rotation, bringToFront]);

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
        transform: `rotate(${rotation}deg)`,
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

      <div data-handle="1" className="rotate-handle" onPointerDown={onRotateDown} onPointerMove={onPointerMove} onPointerUp={onPointerUp}>
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path d="M14 4a7 7 0 1 0 .5 5" stroke="var(--color-primary)" strokeWidth="1.5" strokeLinecap="round" fill="none" />
          <path d="M14 1v4h-4" stroke="var(--color-primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </svg>
      </div>
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

  const placeholderBody = (color: string) => (
    <p className="text-[0.65rem] leading-relaxed" style={{ fontFamily: B, color }}>
      PLACEHOLDER
    </p>
  );

  const cards: CardData[] = [
    {
      id: 'dying-languages', x: CARD_OX + 30, y: CARD_OY + 30, w: 260, rotate: -1.5,
      borderColor: 'var(--color-primary)', bg: 'var(--color-background, #fff)',
      anchor: 'tape-center', anchorColor: 'var(--color-accent)',
      children: placeholderBody('var(--color-muted)'),
    },
    {
      id: 'art-forgery', x: CARD_OX + 360, y: CARD_OY + 50, w: 180, rotate: 2.2,
      borderColor: 'var(--color-secondary)', bg: 'var(--color-background, #fff)',
      anchor: 'pin', anchorColor: 'var(--color-dark)',
      children: placeholderBody('var(--color-muted)'),
    },
    {
      id: 'quote-proust', x: CARD_OX + 610, y: CARD_OY + 30, w: 170, rotate: -0.8,
      borderColor: 'var(--color-primary)', bg: 'var(--color-primary)',
      anchor: 'tape-right', anchorColor: 'var(--color-light)',
      children: placeholderBody('#fff'),
    },
    {
      id: 'ethics-progress', x: CARD_OX + 50, y: CARD_OY + 300, w: 185, rotate: 1.2,
      borderColor: 'var(--color-dark)', bg: 'var(--color-background, #fff)',
      anchor: 'tape-left', anchorColor: 'var(--color-secondary)',
      children: placeholderBody('var(--color-muted)'),
    },
    {
      id: 'internet-geography', x: CARD_OX + 320, y: CARD_OY + 280, w: 280, rotate: -1,
      borderColor: 'var(--color-accent)', bg: 'var(--color-background, #fff)',
      anchor: 'pin', anchorColor: 'var(--color-accent)',
      children: placeholderBody('var(--color-muted)'),
    },
    {
      id: 'quote-einstein', x: CARD_OX + 690, y: CARD_OY + 290, w: 165, rotate: -2.2,
      borderColor: 'var(--color-dark)', bg: 'var(--color-dark)',
      anchor: 'pin', anchorColor: 'var(--color-secondary)',
      children: placeholderBody('#fff'),
    },
    {
      id: 'open-source', x: CARD_OX + 40, y: CARD_OY + 540, w: 185, rotate: 1.8,
      borderColor: 'var(--color-secondary)', bg: 'var(--color-background, #fff)',
      anchor: 'tape-both', anchorColor: 'var(--color-light)',
      children: placeholderBody('var(--color-muted)'),
    },
    {
      id: 'evolution-computing', x: CARD_OX + 310, y: CARD_OY + 560, w: 190, rotate: 0.6,
      borderColor: 'var(--color-accent)', bg: 'var(--color-background, #fff)',
      anchor: 'tape-center', anchorColor: 'var(--color-accent)',
      children: placeholderBody('var(--color-muted)'),
    },
    {
      id: 'sisyphus-note', x: CARD_OX + 580, y: CARD_OY + 530, w: 195, rotate: -1.4,
      borderColor: 'var(--color-primary)', bg: 'var(--color-light)',
      anchor: 'tape-left', anchorColor: 'var(--color-primary)',
      children: placeholderBody('var(--color-foreground)'),
    },
    {
      id: 'mythology', x: CARD_OX + 60, y: CARD_OY + 800, w: 280, rotate: 1.5,
      borderColor: 'var(--color-accent)', bg: 'var(--color-background, #fff)',
      anchor: 'tape-both', anchorColor: 'var(--color-accent)',
      children: placeholderBody('var(--color-muted)'),
    },
    {
      id: 'question-wisdom', x: CARD_OX + 440, y: CARD_OY + 820, w: 175, rotate: -0.5,
      borderColor: 'var(--color-primary)', bg: 'var(--color-light)',
      anchor: 'pin', anchorColor: 'var(--color-primary)',
      children: (
        <p className="text-xs font-bold leading-snug" style={{ fontFamily: H, color: 'var(--color-primary)' }}>
          PLACEHOLDER
        </p>
      ),
    },
    {
      id: 'photography', x: CARD_OX + 680, y: CARD_OY + 790, w: 185, rotate: 1,
      borderColor: 'var(--color-dark)', bg: 'var(--color-background, #fff)',
      anchor: 'tape-center', anchorColor: 'var(--color-accent)',
      children: placeholderBody('var(--color-muted)'),
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <div className="max-w-4xl mx-auto px-6 pt-8 pb-4 w-full">
        <Navbar currentPage="rabbit-holes" />
        <div className="mb-4">
          <h1 className="text-3xl font-bold mb-2 leading-tight" style={{ fontFamily: H, color: 'var(--color-dark)' }}>
            rabbit holes
          </h1>
          <p className="text-sm leading-relaxed max-w-lg" style={{ fontFamily: B, color: 'var(--color-muted)' }}>
            rabbit holes!! {' '}
            <kbd className="px-1 py-0.5 rounded border border-[var(--color-border)] text-[0.7rem]">Ctrl</kbd>{' '}
            + .
          </p>
        </div>
      </div>

      <div
        ref={viewportRef}
        className="canvas-viewport pinboard-surface mx-auto mb-6 relative"
        style={{ width: '100%', maxWidth: '56rem', height: '68vh', marginLeft: 'auto', marginRight: 'auto', paddingLeft: '1rem', paddingRight: '1rem' }}
        onPointerDown={onBgDown}
        onPointerMove={onBgMove}
        onPointerUp={onBgUp}
        onPointerLeave={onBgUp}
      >
        <div
          className="rh-zoom-ui absolute top-2 right-2 z-50 flex items-center gap-1 rounded-md border px-1 py-0.5 text-xs"
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
            aria-label="Reset zoom"
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
            100%
          </button>
        </div>
        <div
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

      <div className="max-w-4xl mx-auto px-6 pb-8 w-full">
        <hr style={{ borderColor: 'var(--color-border)' }} className="mb-4" />
        <Footer />
      </div>
    </div>
  );
}
