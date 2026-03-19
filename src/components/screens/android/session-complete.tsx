"use client";

import { useState, useEffect } from "react";

// Android Earn Mode — Session Complete + Max Earned screens
// M3 adaptation: full-pill CTAs, teal/purple confetti, Roboto type scale
// variant: "session" = partial earnings with count-up; "max" = $20 cap with full confetti

interface SessionCompleteProps {
  onNavigate: (screen: string) => void;
  variant?: "session" | "max";
}

// ─── Icons ────────────────────────────────────────────────────────────────────

function CloseIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 6L6 18M6 6l12 12"/>
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6L9 17l-5-5"/>
    </svg>
  );
}

// ─── Confetti ─────────────────────────────────────────────────────────────────

// Burst pieces for Session Complete
const BURST_PIECES = [
  { tx: "0px",   ty: "-64px", delay: "200ms", color: "#38DCD1" },
  { tx: "45px",  ty: "-45px", delay: "230ms", color: "#8D2EBC" },
  { tx: "64px",  ty: "0px",   delay: "200ms", color: "#38DCD1" },
  { tx: "45px",  ty: "45px",  delay: "250ms", color: "#8D2EBC" },
  { tx: "0px",   ty: "64px",  delay: "210ms", color: "#38DCD1" },
  { tx: "-45px", ty: "45px",  delay: "230ms", color: "#8D2EBC" },
  { tx: "-64px", ty: "0px",   delay: "200ms", color: "#38DCD1" },
  { tx: "-45px", ty: "-45px", delay: "250ms", color: "#8D2EBC" },
];

// Falling pieces for Max Earned
const FALL_PIECES = Array.from({ length: 44 }, (_, i) => ({
  left: `${2 + (i * 2.22) % 95}%`,
  delay: `${(i * 180) % 3000}ms`,
  duration: `${2100 + (i * 113) % 1500}ms`,
  color: [
    "#38DCD1", "#8D2EBC", "#FFB300", "rgba(56,220,209,0.55)",
    "rgba(141,46,188,0.55)", "#38DCD1", "#FFB300", "#8D2EBC",
  ][i % 8],
  w: i % 2 === 0 ? "8px" : "5px",
  h: i % 2 === 0 ? "5px" : "9px",
}));

// ─── Component ────────────────────────────────────────────────────────────────

export function AndroidSessionComplete({ onNavigate, variant = "session" }: SessionCompleteProps) {
  const isMax = variant === "max";

  // Count-up for session screen
  const targetEarned = isMax ? 20.0 : 0.12;
  const [displayEarned, setDisplayEarned] = useState(isMax ? 20.0 : 0);

  useEffect(() => {
    if (isMax) return; // max shows static $20
    const duration = 900;
    const startDelay = 380;
    let startTime: number | null = null;
    let raf: number;
    const timeout = setTimeout(() => {
      const tick = (now: number) => {
        if (!startTime) startTime = now;
        const progress = Math.min((now - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 4);
        setDisplayEarned(parseFloat((eased * targetEarned).toFixed(2)));
        if (progress < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, startDelay);
    return () => { clearTimeout(timeout); cancelAnimationFrame(raf); };
  }, [isMax, targetEarned]);

  return (
    <div
      className="h-full flex flex-col relative overflow-hidden"
      style={{ fontFamily: "'Roboto', system-ui, sans-serif", background: "var(--md-background)" }}
    >

      {/* ── Falling confetti (Max Earned only) ── */}
      {isMax && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          {FALL_PIECES.map((p, i) => (
            <div
              key={i}
              className="absolute rounded-sm animate-confetti-fall"
              style={{
                left: p.left,
                top: 0,
                width: p.w,
                height: p.h,
                background: p.color,
                "--delay": p.delay,
                "--dur": p.duration,
              } as React.CSSProperties}
            />
          ))}
        </div>
      )}

      {/* ── Top App Bar ── */}
      <div className="flex items-center px-1 shrink-0 relative z-10" style={{ height: "64px", background: "var(--md-background)" }}>
        <div className="w-12 h-12" />
        <p className="flex-1 text-[22px] font-normal leading-7 ml-4" style={{ color: "var(--md-on-surface)" }}>
          {isMax ? "Max Earned" : "Session Complete"}
        </p>
        <button
          onClick={() => onNavigate("android-compete")}
          className="w-12 h-12 flex items-center justify-center"
          style={{ color: "var(--md-on-surface)" }}
        >
          <CloseIcon />
        </button>
      </div>

      {/* ── Centered body ── */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 text-center relative z-10">

        {/* Icon — with burst confetti on session screen */}
        <div className="relative mb-5">
          {!isMax && BURST_PIECES.map((c, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 rounded-sm animate-confetti-fly pointer-events-none"
              style={{
                top: "50%",
                left: "50%",
                background: c.color,
                animationDelay: c.delay,
                "--tx": c.tx,
                "--ty": c.ty,
              } as React.CSSProperties}
            />
          ))}

          {isMax ? (
            /* Max Earned: larger icon */
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center animate-pop-in"
              style={{ background: "var(--color-secondary-bg)", color: "var(--md-secondary)", animationDelay: "80ms" }}
            >
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/><path d="M12 6v12M9 9.5c0-1.4 1.3-2.5 3-2.5s3 1.1 3 2.5-1.3 2.5-3 2.5-3 1.1-3 2.5 1.3 2.5 3 2.5 3-1.1 3-2.5"/>
              </svg>
            </div>
          ) : (
            /* Session: standard icon */
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center animate-pop-in"
              style={{ background: "var(--color-secondary-bg)", color: "var(--md-secondary)", animationDelay: "60ms" }}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/><path d="M12 6v12M9 9.5c0-1.4 1.3-2.5 3-2.5s3 1.1 3 2.5-1.3 2.5-3 2.5-3 1.1-3 2.5 1.3 2.5 3 2.5 3-1.1 3-2.5"/>
              </svg>
            </div>
          )}
        </div>

        {/* Context label */}
        <p
          className="text-[11px] font-medium tracking-[0.8px] mb-2 animate-fade-up"
          style={{ color: "var(--md-secondary)", animationDelay: "200ms" }}
        >
          EARN MODE · PATHOLOGY SLIDES
        </p>

        {/* Hero earnings */}
        <p
          className="leading-none tabular-nums mb-1.5 animate-fade-up font-normal"
          style={{
            fontSize: isMax ? "56px" : "52px",
            color: "var(--md-secondary)",
            animationDelay: "240ms",
          }}
        >
          ${isMax ? "20.00" : displayEarned.toFixed(2)}
        </p>

        <p
          className="text-[15px] mb-5 animate-fade-up"
          style={{ color: "var(--md-on-surface-variant)", animationDelay: "300ms" }}
        >
          {isMax ? "You hit the cap — maximum earned!" : "earned this session"}
        </p>

        {/* Stats pill */}
        <div
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-full animate-fade-up"
          style={{ background: "var(--color-secondary-bg)", animationDelay: "360ms" }}
        >
          <CheckIcon />
          <span className="text-[13px] font-medium" style={{ color: "var(--md-secondary)" }}>
            {isMax ? "667 qualified" : "4 qualified"}
          </span>
        </div>
      </div>

      {/* ── CTAs ── */}
      <div
        className="relative z-10 px-4 pb-8 pt-3 flex flex-col gap-2 shrink-0"
        style={{ borderTop: "1px solid var(--md-outline-variant)", background: "var(--md-background)" }}
      >
        <>
          <button
            onClick={() => onNavigate("android-contest-detail")}
            className="w-full flex items-center justify-center"
            style={{ height: "48px", borderRadius: "100px", background: "var(--md-primary-container)", color: "var(--md-on-primary-container)" }}
          >
            <span className="text-[14px] font-medium tracking-[0.1px]">View my earnings</span>
          </button>
          <button
            onClick={() => onNavigate("android-compete")}
            className="w-full flex items-center justify-center"
            style={{ height: "48px", borderRadius: "100px", border: "1px solid var(--md-primary-container)", color: "var(--md-primary-container)" }}
          >
            <span className="text-[14px] font-medium tracking-[0.1px]">Browse more contests</span>
          </button>
        </>
      </div>
    </div>
  );
}
