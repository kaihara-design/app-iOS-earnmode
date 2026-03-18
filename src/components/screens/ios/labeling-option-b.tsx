"use client";

import { useState } from "react";
import { X, Coins, DollarSign, MessageCircle, Flag, Eye, Check } from "lucide-react";

interface LabelingOptionBProps {
  onNavigate: (screen: string) => void;
  initialFeedback?: "earned" | "not-earned";
}

type FeedbackState = "none" | "earned" | "not-earned";

export function LabelingOptionB({ onNavigate, initialFeedback }: LabelingOptionBProps) {
  const [feedback, setFeedback] = useState<FeedbackState>(initialFeedback ?? "none");
  const [sessionEarnings, setSessionEarnings] = useState(0.09);
  const [qualifiedCount, setQualifiedCount] = useState(3);
  const [readCount, setReadCount] = useState(3);
  const [showContestEnded, setShowContestEnded] = useState(false);

  function handleEarned() {
    setFeedback("earned");
    setSessionEarnings((e) => Math.round((e + 0.03) * 100) / 100);
    setQualifiedCount((c) => c + 1);
    setReadCount((c) => c + 1);
  }

  function handleNotEarned() {
    setFeedback("not-earned");
    setReadCount((c) => c + 1);
  }

  function handleNext() {
    setFeedback("none");
    if (readCount >= 5) setShowContestEnded(true);
  }

  return (
    <div className="h-full relative overflow-hidden" style={{ background: "#0a0a0a" }}>

      {/* ── Full-screen medical image ── */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="w-[340px] h-[340px] rounded-full"
          style={{ background: "radial-gradient(circle, #8b2500 0%, #4a1200 40%, #1a0600 80%, #0a0400 100%)", opacity: 0.85 }}
        />
        {/* Primary annotation box */}
        <div
          className="absolute border-2 rounded"
          style={{ borderColor: "var(--earn-teal)", top: "28%", left: "22%", width: "48%", height: "32%" }}
        />
        {/* Secondary lesion */}
        <div
          className="absolute border-2 rounded opacity-70"
          style={{ borderColor: "#ffd060", top: "58%", left: "48%", width: "22%", height: "17%" }}
        />
      </div>

      {/* ── Top bar overlay ── */}
      <div
        className="absolute top-0 left-0 right-0 flex items-center justify-between px-3 py-2.5"
        style={{ background: "rgba(0,0,0,0.6)" }}
      >
        {/* Close */}
        <button
          onClick={() => onNavigate("contest-detail-new")}
          className="w-8 h-8 rounded-full flex items-center justify-center"
          style={{ background: "rgba(255,255,255,0.12)" }}
        >
          <X size={14} color="white" />
        </button>

        {/* Progress */}
        <div className="flex flex-col items-center gap-0.5">
          <div className="flex gap-1">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="w-5 h-1.5 rounded-full transition-all duration-[300ms]"
                style={{
                  background: i < readCount
                    ? "var(--earn-teal)"
                    : "rgba(255,255,255,0.22)",
                }}
              />
            ))}
          </div>
          <span className="text-[10px]" style={{ color: "rgba(255,255,255,0.55)" }}>
            {qualifiedCount} qualified
          </span>
        </div>

        {/* Earn Mode HUD */}
        <div className="flex items-center gap-1.5">
          <span
            className="px-2 py-0.5 rounded-full text-[11px] font-bold flex items-center gap-1"
            style={{ background: "var(--earn-teal-10)", color: "var(--earn-teal)" }}
          >
            <Coins size={10} />
            Earn
          </span>
          <span key={sessionEarnings} className="text-[14px] font-bold text-white animate-earn-tick">${sessionEarnings.toFixed(2)}</span>
        </div>
      </div>

      {/* ── Bottom chrome (pre-submission) — always visible ── */}
      {feedback === "none" && (
        <div key={readCount} className="absolute bottom-0 left-0 right-0 animate-fade-up">
          {/* Scrim */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.55) 55%, transparent 100%)" }}
          />
          <div className="relative px-4 pt-10 pb-6">
            {/* Instruction */}
            <p className="text-white text-[13px] leading-snug mb-3">
              Draw a bounding box around all lesions visible in this fundus image.
            </p>
            {/* Utility + action row */}
            <div className="flex items-center gap-2">
              <button
                className="w-9 h-9 rounded-full flex-shrink-0 flex items-center justify-center"
                style={{ background: "rgba(255,255,255,0.13)" }}
              >
                <MessageCircle size={16} color="white" />
              </button>
              <button
                className="w-9 h-9 rounded-full flex-shrink-0 flex items-center justify-center"
                style={{ background: "rgba(255,255,255,0.13)" }}
              >
                <Flag size={16} color="white" />
              </button>
              <button
                className="w-9 h-9 rounded-full flex-shrink-0 flex items-center justify-center"
                style={{ background: "rgba(255,255,255,0.13)" }}
              >
                <Eye size={16} color="white" />
              </button>
              <div className="flex-1 flex gap-1.5 ml-1">
                <button
                  onClick={handleNotEarned}
                  className="flex-1 py-2.5 rounded-2xl text-[12px] font-semibold transition-transform duration-[100ms] active:scale-[0.96]"
                  style={{ background: "rgba(255,255,255,0.13)", color: "white", border: "1px solid rgba(255,255,255,0.18)" }}
                >
                  Simulate miss
                </button>
                <button
                  onClick={handleEarned}
                  className="flex-1 py-2.5 rounded-2xl text-[12px] font-semibold text-white transition-transform duration-[100ms] active:scale-[0.96]"
                  style={{ background: "var(--earn-teal)" }}
                >
                  Simulate hit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Feedback bottom sheet (partial — image still visible above) ── */}
      {feedback !== "none" && !showContestEnded && (
        <div className="absolute bottom-0 left-0 right-0 rounded-t-3xl px-5 pt-4 pb-8 animate-sheet-up" style={{ background: "var(--ios-surface-default)" }}>
          <div className="w-8 h-1 rounded-full mx-auto mb-4" style={{ background: "var(--ios-border-default)" }} />

          {feedback === "earned" ? (
            <>
              <div className="flex items-center gap-2.5 mb-1">
                <div
                  className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center animate-pop-in animate-earned-glow"
                  style={{ background: "var(--earn-teal-10)", color: "var(--earn-teal)", animationDelay: "120ms" }}
                >
                  <Check size={15} strokeWidth={2.5} />
                </div>
                <p className="text-[15px] font-semibold" style={{ color: "var(--earn-teal)" }}>
                  Earned · +$0.03
                </p>
              </div>
              <p className="text-[12px] mb-5 ml-[42px]" style={{ color: "var(--ios-text-secondary)" }}>
                ${sessionEarnings.toFixed(2)} earned this session
              </p>
            </>
          ) : (
            <>
              <div className="flex items-center gap-2.5 mb-1">
                <div
                  className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center animate-pop-in"
                  style={{ background: "var(--earn-red-10)", color: "var(--earn-red)", animationDelay: "120ms" }}
                >
                  <X size={15} strokeWidth={2.5} />
                </div>
                <p className="text-[15px] font-semibold" style={{ color: "var(--ios-text-primary)" }}>
                  This read didn&apos;t earn
                </p>
              </div>
              <p className="text-[12px] mb-5 ml-[42px]" style={{ color: "var(--ios-text-secondary)" }}>
                More precise boxes = higher quality score = earnings.
              </p>
            </>
          )}

          <button
            onClick={handleNext}
            className="w-full py-3.5 rounded-2xl text-[15px] font-semibold text-white transition-transform duration-[100ms] active:scale-[0.97]"
            style={{ background: "var(--ios-interactive-primary)" }}
          >
            Next →
          </button>
        </div>
      )}

      {/* ── Contest ended sheet ── */}
      {showContestEnded && (
        <div className="absolute inset-0 bg-black/40 flex items-end animate-backdrop-in">
          <div className="rounded-t-3xl w-full p-6 pb-10 animate-sheet-up" style={{ background: "var(--ios-surface-default)" }}>
            <div className="w-10 h-1 rounded-full mx-auto mb-5" style={{ background: "var(--ios-border-default)" }} />
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center mb-3"
              style={{ background: "var(--ios-interactive-indigo-bg)", color: "var(--ios-interactive-primary)" }}
            >
              <DollarSign size={24} />
            </div>
            <h2 className="text-[18px] font-bold mb-2">This contest has ended</h2>
            <p className="text-[14px] leading-relaxed mb-4" style={{ color: "var(--ios-text-secondary)" }}>
              The prize pool was claimed while you were reading. Your earnings from this session are safe.
            </p>
            <div className="rounded-xl px-4 py-3 mb-5" style={{ background: "var(--ios-interactive-indigo-bg)" }}>
              <p className="text-[15px] font-bold" style={{ color: "var(--ios-interactive-primary)" }}>
                ${sessionEarnings.toFixed(2)} earned · {qualifiedCount} qualified reads
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => onNavigate("contest-detail-post-compete")}
                className="flex-1 py-3 rounded-2xl text-[14px] font-semibold border transition-transform duration-[100ms] active:scale-[0.97]"
                style={{ borderColor: "var(--ios-interactive-primary)", color: "var(--ios-interactive-primary)" }}
              >
                View my earnings
              </button>
              <button
                onClick={() => onNavigate("contest-browse")}
                className="flex-1 py-3 rounded-2xl text-[14px] font-semibold text-white transition-transform duration-[100ms] active:scale-[0.97]"
                style={{ background: "var(--ios-interactive-primary)" }}
              >
                Browse contests
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
