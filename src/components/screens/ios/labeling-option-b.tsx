"use client";

import { useState } from "react";
import { X, Coins, MessageCircle, Flag, Eye, Check, Info, TrendingDown } from "lucide-react";

interface LabelingOptionBProps {
  onNavigate: (screen: string) => void;
  initialFeedback?: "earned" | "not-earned" | "calibration" | "accuracy-low";
  earnState: "warmup" | "active";
  warmupRemaining: number;
  onWarmupProgress: (remaining: number) => void;
  onThresholdComplete: () => void;
}

type FeedbackState = "none" | "warmup" | "threshold" | "earned" | "not-earned" | "calibration" | "accuracy-low";

export function LabelingOptionB({ onNavigate, initialFeedback, earnState, warmupRemaining, onWarmupProgress, onThresholdComplete }: LabelingOptionBProps) {
  const [feedback, setFeedback] = useState<FeedbackState>(initialFeedback ?? "none");
  const [sessionEarnings, setSessionEarnings] = useState(0);
  const [readCount, setReadCount] = useState(0);
  const [activeCount, setActiveCount] = useState(0);

  function handleEarned() {
    setReadCount((c) => c + 1);

    if (earnState === "warmup") {
      const next = warmupRemaining - 1;
      onWarmupProgress(next);
      setFeedback(next === 0 ? "threshold" : "warmup");
      return;
    }

    const newActive = activeCount + 1;
    setActiveCount(newActive);
    setFeedback("earned");
    setSessionEarnings((e) => Math.round((e + 0.03) * 100) / 100);
  }

  function handleNext() {
    if (feedback === "threshold") onThresholdComplete();
    setFeedback("none");
    if (activeCount >= 5) onNavigate("session-complete");
  }

  return (
    <div className="h-full relative overflow-hidden" style={{ background: "#0a0a0a", fontFamily: "var(--ios-font)" }}>

      {/* ── Full-screen medical image ── */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="w-[340px] h-[340px] rounded-full"
          style={{ background: "radial-gradient(circle, #8b2500 0%, #4a1200 40%, #1a0600 80%, #0a0400 100%)", opacity: 0.85 }}
        />
        {/* Primary annotation box */}
        <div
          className="absolute border-2 rounded"
          style={{ borderColor: "#5DF6EB", top: "28%", left: "22%", width: "48%", height: "32%" }}
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

        {/* Earn Mode HUD */}
        <div className="flex items-center gap-1.5">
          <span
            className="px-2 py-0.5 rounded-full text-[11px] font-bold flex items-center gap-1"
            style={{ background: "rgba(93, 246, 235, 0.12)", color: "#5DF6EB", border: "1px solid rgba(93, 246, 235, 0.35)" }}
          >
            <Coins size={10} />
            Earn
          </span>
          {earnState === "warmup" ? (
            <span className="text-[12px] font-medium" style={{ color: "rgba(255,255,255,0.45)" }}>Qualifying · {warmupRemaining} to go</span>
          ) : (
            <span key={sessionEarnings} className="text-[14px] font-bold text-white animate-earn-tick">${sessionEarnings.toFixed(2)} · {activeCount} qualified</span>
          )}
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
              <div className="flex-1 ml-1">
                <button
                  onClick={handleEarned}
                  className="w-full py-2.5 rounded-2xl text-[12px] font-semibold text-white transition-transform duration-[100ms] active:scale-[0.96]"
                  style={{ background: "var(--ios-interactive-primary)" }}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Feedback bottom sheet (partial — image still visible above) ── */}
      {feedback !== "none" && (
        <div className="absolute bottom-0 left-0 right-0 rounded-t-3xl px-5 pt-4 pb-8 animate-sheet-up" style={{ background: "var(--ios-surface-default)" }}>
          <div className="w-8 h-1 rounded-full mx-auto mb-4" style={{ background: "var(--ios-border-default)" }} />

          {feedback === "warmup" && (
            <>
              <p className="text-[17px] font-bold mb-1" style={{ color: "var(--ios-text-primary)" }}>Not earning yet</p>
              <p className="text-[14px] leading-relaxed mb-5" style={{ color: "var(--ios-text-secondary)" }}>
                {warmupRemaining > 5
                  ? `${warmupRemaining} more cases to complete your qualifying round.`
                  : "Just a few more cases to complete your qualifying round."}
              </p>
            </>
          )}

          {feedback === "threshold" && (
            <>
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center mb-4"
                style={{ background: "var(--earn-teal-10)", color: "var(--earn-teal)" }}
              >
                <Check size={22} strokeWidth={2.5} />
              </div>
              <p className="text-[20px] font-bold mb-2" style={{ color: "var(--ios-text-primary)" }}>You qualified!</p>
              <p className="text-[14px] leading-relaxed mb-5" style={{ color: "var(--ios-text-secondary)" }}>
                Your qualifying round is complete. Every read from here earns $0.03 — keep going.
              </p>
            </>
          )}

          {feedback === "earned" && (
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
              <p className="text-[13px] leading-relaxed mb-5 ml-[42px]" style={{ color: "var(--ios-text-secondary)" }}>
                Your accuracy across recent reads qualifies. Keep going.
              </p>
            </>
          )}

          {feedback === "not-earned" && (
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

          {feedback === "calibration" && (
            <>
              <div className="flex items-center gap-2.5 mb-1">
                <div
                  className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center animate-pop-in"
                  style={{ background: "var(--ios-fill-secondary)", color: "var(--ios-text-secondary)", animationDelay: "120ms" }}
                >
                  <Info size={15} strokeWidth={2} />
                </div>
                <p className="text-[15px] font-semibold" style={{ color: "var(--ios-text-primary)" }}>
                  Calibration case
                </p>
              </div>
              <p className="text-[13px] leading-relaxed mb-5 ml-[42px]" style={{ color: "var(--ios-text-secondary)" }}>
                This case calibrates your accuracy score. It doesn&apos;t count toward earnings.
              </p>
            </>
          )}

          {feedback === "accuracy-low" && (
            <>
              <div className="flex items-center gap-2.5 mb-1">
                <div
                  className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center animate-pop-in"
                  style={{ background: "var(--earn-red-10)", color: "var(--earn-red)", animationDelay: "120ms" }}
                >
                  <TrendingDown size={15} strokeWidth={2.5} />
                </div>
                <p className="text-[15px] font-semibold" style={{ color: "var(--ios-text-primary)" }}>
                  Accuracy below threshold
                </p>
              </div>
              <p className="text-[13px] leading-relaxed mb-5 ml-[42px]" style={{ color: "var(--ios-text-secondary)" }}>
                Your recent accuracy is too low to earn. Keep labeling to improve.
              </p>
            </>
          )}

          <button
            onClick={handleNext}
            className="w-full py-3.5 rounded-2xl text-[15px] font-semibold text-white transition-transform duration-[100ms] active:scale-[0.97]"
            style={{ background: "var(--ios-interactive-primary)" }}
          >
            {feedback === "threshold" ? "Keep going" : feedback === "warmup" ? "Next case" : "Next →"}
          </button>
        </div>
      )}

    </div>
  );
}
