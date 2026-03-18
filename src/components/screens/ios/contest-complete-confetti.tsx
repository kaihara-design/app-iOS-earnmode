"use client";

import { DollarSign, Check } from "lucide-react";

interface ContestCompleteConfettiProps {
  onNavigate: (screen: string) => void;
}

const FALL_PIECES = Array.from({ length: 40 }, (_, i) => ({
  left: `${2 + (i * 2.45) % 95}%`,
  delay: `${(i * 190) % 3000}ms`,
  duration: `${2200 + (i * 107) % 1400}ms`,
  color: [
    "var(--earn-teal)",
    "var(--ios-interactive-primary)",
    "#FF9500",
    "rgba(0,106,101,0.6)",
    "rgba(97,85,245,0.55)",
    "var(--earn-teal)",
    "#FF9500",
    "var(--ios-interactive-primary)",
  ][i % 8],
  w: i % 2 === 0 ? "8px" : "5px",
  h: i % 2 === 0 ? "5px" : "9px",
}));

export function ContestCompleteConfetti({ onNavigate }: ContestCompleteConfettiProps) {
  return (
    <div className="h-full flex flex-col relative overflow-hidden" style={{ background: "var(--ios-surface-default)" }}>

      {/* Confetti layer */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
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

      {/* Centered content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 text-center relative z-10">

        {/* Icon */}
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center mb-5 animate-pop-in"
          style={{ background: "var(--earn-teal-10)", animationDelay: "80ms" }}
        >
          <DollarSign size={36} color="var(--earn-teal)" />
        </div>

        {/* Context */}
        <p
          className="text-[11px] font-semibold mb-2 animate-fade-up"
          style={{ color: "var(--earn-teal)", animationDelay: "200ms", letterSpacing: "0.04em" }}
        >
          EARN MODE · DIABETIC RETINOPATHY
        </p>

        {/* Hero earnings */}
        <p
          className="text-[52px] font-bold leading-none mb-1.5 animate-fade-up"
          style={{ color: "var(--earn-teal)", animationDelay: "250ms" }}
        >
          $20.00
        </p>
        <p
          className="text-[15px] mb-5 animate-fade-up"
          style={{ color: "var(--ios-text-secondary)", animationDelay: "300ms" }}
        >
          You hit the cap — maximum earned!
        </p>

        {/* Stats pill */}
        <div
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-2xl animate-fade-up"
          style={{ background: "var(--earn-teal-10)", animationDelay: "360ms" }}
        >
          <Check size={13} strokeWidth={2.5} style={{ color: "var(--earn-teal)", flexShrink: 0 }} />
          <span className="text-[13px] font-semibold" style={{ color: "var(--earn-teal)" }}>
            667 qualified
          </span>
          <span className="text-[13px]" style={{ color: "var(--ios-text-tertiary)" }}>
            · 680 total reads
          </span>
        </div>
      </div>

      {/* CTAs */}
      <div
        className="relative z-10 px-4 pb-8 pt-3 border-t flex flex-col gap-2.5"
        style={{ borderColor: "var(--ios-border-default)" }}
      >
        <button
          onClick={() => onNavigate("contest-browse")}
          className="w-full py-3.5 rounded-2xl text-[15px] font-semibold text-white transition-transform duration-[100ms] active:scale-[0.97]"
          style={{ background: "var(--ios-interactive-primary)" }}
        >
          Browse contests
        </button>
        <button
          onClick={() => onNavigate("contest-detail-post-compete")}
          className="w-full py-3.5 rounded-2xl text-[15px] font-semibold border transition-transform duration-[100ms] active:scale-[0.97]"
          style={{ borderColor: "var(--ios-interactive-primary)", color: "var(--ios-interactive-primary)" }}
        >
          Back to contest
        </button>
      </div>
    </div>
  );
}
