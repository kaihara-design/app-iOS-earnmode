"use client";

import { useState, useEffect } from "react";
import { X, DollarSign, Check } from "lucide-react";

interface ContestCompleteProps {
  onNavigate: (screen: string) => void;
}

const confettiItems = [
  { tx: "0px",   ty: "-56px", delay: "200ms", color: "var(--earn-teal)" },
  { tx: "40px",  ty: "-40px", delay: "230ms", color: "var(--ios-interactive-primary)" },
  { tx: "56px",  ty: "0px",   delay: "200ms", color: "var(--earn-teal)" },
  { tx: "40px",  ty: "40px",  delay: "250ms", color: "var(--ios-interactive-primary)" },
  { tx: "0px",   ty: "56px",  delay: "210ms", color: "var(--earn-teal)" },
  { tx: "-40px", ty: "40px",  delay: "230ms", color: "var(--ios-interactive-primary)" },
  { tx: "-56px", ty: "0px",   delay: "200ms", color: "var(--earn-teal)" },
  { tx: "-40px", ty: "-40px", delay: "250ms", color: "var(--ios-interactive-primary)" },
];

export function ContestComplete({ onNavigate }: ContestCompleteProps) {
  const earned = 0.12;
  const qualifiedReads = 4;

  const [displayEarned, setDisplayEarned] = useState(0);
  useEffect(() => {
    const duration = 900;
    const startDelay = 320;
    let startTime: number | null = null;
    let raf: number;
    const timeout = setTimeout(() => {
      const tick = (now: number) => {
        if (!startTime) startTime = now;
        const progress = Math.min((now - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 4);
        setDisplayEarned(parseFloat((eased * earned).toFixed(2)));
        if (progress < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, startDelay);
    return () => { clearTimeout(timeout); cancelAnimationFrame(raf); };
  }, []);

  return (
    <div className="h-full flex flex-col" style={{ background: "var(--ios-surface-default)", fontFamily: "var(--ios-font)" }}>

      {/* Nav header */}
      <div
        className="px-4 pt-2 pb-3 border-b flex items-center gap-3"
        style={{ borderColor: "var(--ios-border-default)" }}
      >
        <button
          onClick={() => onNavigate("contest-browse")}
          style={{ color: "var(--ios-interactive-primary)" }}
        >
          <X size={20} />
        </button>
        <h1 className="text-[17px] font-semibold">Session Complete</h1>
      </div>

      {/* Centered body */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">

        {/* Icon — supporting role, with confetti burst */}
        <div className="relative mb-5">
          {confettiItems.map((c, i) => (
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
          <div className="animate-float" style={{ animationDelay: "440ms" }}>
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center animate-pop-in"
              style={{ background: "var(--earn-teal-10)", animationDelay: "60ms" }}
            >
              <DollarSign size={28} color="var(--earn-teal)" />
            </div>
          </div>
        </div>

        {/* Context label */}
        <p
          className="text-[11px] font-semibold tracking-wide mb-2 animate-fade-up"
          style={{ color: "var(--earn-teal)", animationDelay: "200ms", letterSpacing: "0.04em" }}
        >
          EARN MODE · DIABETIC RETINOPATHY
        </p>

        {/* HERO: earnings — this is the headline */}
        <p
          className="text-[48px] font-bold leading-none tabular-nums mb-1.5 animate-fade-up"
          style={{ color: "var(--earn-teal)", animationDelay: "240ms" }}
        >
          ${displayEarned.toFixed(2)}
        </p>
        <p
          className="text-[15px] mb-6 animate-fade-up"
          style={{ color: "var(--ios-text-secondary)", animationDelay: "290ms" }}
        >
          earned this session
        </p>

        {/* Stats row */}
        <div
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-2xl animate-fade-up"
          style={{ background: "var(--earn-teal-10)", animationDelay: "350ms" }}
        >
          <Check size={13} strokeWidth={2.5} style={{ color: "var(--earn-teal)", flexShrink: 0 }} />
          <span className="text-[13px] font-semibold" style={{ color: "var(--earn-teal)" }}>
            {qualifiedReads} qualified
          </span>
        </div>
      </div>

      {/* Sticky CTAs */}
      <div
        className="px-4 pb-8 pt-3 border-t flex flex-col gap-2.5"
        style={{ borderColor: "var(--ios-border-default)" }}
      >
        <button
          onClick={() => onNavigate("contest-detail-post-compete")}
          className="w-full py-3.5 rounded-2xl text-[15px] font-semibold text-white transition-transform duration-[100ms] active:scale-[0.97]"
          style={{ background: "var(--ios-interactive-primary)" }}
        >
          View my earnings
        </button>
        <button
          onClick={() => onNavigate("contest-browse")}
          className="w-full py-3.5 rounded-2xl text-[15px] font-semibold border transition-transform duration-[100ms] active:scale-[0.97]"
          style={{ borderColor: "var(--ios-interactive-primary)", color: "var(--ios-interactive-primary)" }}
        >
          Browse more contests
        </button>
      </div>
    </div>
  );
}
