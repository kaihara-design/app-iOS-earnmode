"use client";

import { useState } from "react";

// Android Earn Mode — Labeling (Box Segmentation) screen
// M3 spec: white bg, contained dark image card (#303030, 24dp radius)
// Earn Mode HUD: inline row between progress bar and image card
// After submit → navigate to Case Result screen (full screen, not sheet)

interface LabelingProps {
  onNavigate: (screen: string) => void;
  initialShowContestEnded?: boolean;
}

// ─── Icons ────────────────────────────────────────────────────────────────────

function CloseIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 6L6 18M6 6l12 12"/>
    </svg>
  );
}

function PencilIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/>
    </svg>
  );
}

function MoveIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="5 9 2 12 5 15"/><polyline points="9 5 12 2 15 5"/><polyline points="15 19 12 22 9 19"/><polyline points="19 9 22 12 19 15"/><line x1="2" y1="12" x2="22" y2="12"/><line x1="12" y1="2" x2="12" y2="22"/>
    </svg>
  );
}

function CommentIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
    </svg>
  );
}

function FlagIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/>
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M12 5l7 7-7 7"/>
    </svg>
  );
}

function DollarIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><path d="M12 6v12M9 9.5c0-1.4 1.3-2.5 3-2.5s3 1.1 3 2.5-1.3 2.5-3 2.5-3 1.1-3 2.5 1.3 2.5 3 2.5 3-1.1 3-2.5"/>
    </svg>
  );
}

function SparkleIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/>
    </svg>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

const EARNED_SCORE = 74;
const NOT_EARNED_SCORE = 58;
const QUALITY_BAR = 70;

export function AndroidLabeling({ onNavigate, initialShowContestEnded = false }: LabelingProps) {
  const [mode, setMode] = useState<"draw" | "pan">("draw");
  const [sessionEarnings, setSessionEarnings] = useState(0.09);
  const [qualifiedCount, setQualifiedCount] = useState(3);
  const [readCount, setReadCount] = useState(3);
  const [showContestEnded, setShowContestEnded] = useState(initialShowContestEnded);

  const progressPct = (readCount / 5) * 100;

  function handleSubmitEarned() {
    setSessionEarnings((e) => Math.round((e + 0.03) * 100) / 100);
    setQualifiedCount((c) => c + 1);
    setReadCount((c) => c + 1);
    onNavigate("android-case-result-earned");
  }

  function handleSubmitNotEarned() {
    setReadCount((c) => c + 1);
    if (readCount >= 4) {
      setShowContestEnded(true);
    } else {
      onNavigate("android-case-result-not-earned");
    }
  }

  return (
    <div className="flex flex-col h-full" style={{ fontFamily: "'Roboto', system-ui, sans-serif", background: "white" }}>

      {/* ── Top App Bar ── */}
      <div className="flex items-center px-1 shrink-0" style={{ height: "64px", background: "white" }}>
        <div className="w-12 h-12" /> {/* spacer — no back nav on immersive screen */}
        <p className="flex-1 text-[22px] font-normal leading-7 ml-1" style={{ color: "#201922" }}>
          Labeling
        </p>
        <button
          onClick={() => onNavigate("android-contest-detail")}
          className="w-12 h-12 flex items-center justify-center"
          style={{ color: "#201922" }}
        >
          <CloseIcon />
        </button>
      </div>

      {/* ── Progress bar ── */}
      <div className="px-4 pb-2 shrink-0">
        <div className="flex justify-between mb-1">
          <span className="text-[12px]" style={{ color: "#201922" }}>Question {readCount}/5</span>
          <span className="text-[12px]" style={{ color: "#4E4352" }}>{qualifiedCount} qualified</span>
        </div>
        <div className="h-[11px] rounded-[15px] overflow-hidden" style={{ background: "#EEDDF0" }}>
          <div
            className="h-[9px] rounded-[15px] mt-px ml-px transition-all duration-300"
            style={{ width: `calc(${progressPct}% - 2px)`, background: "#4E4352" }}
          />
        </div>
      </div>

      {/* ── Earn Mode HUD — inline, between progress and image ── */}
      <div
        className="mx-4 mb-2 rounded-[12px] flex items-center justify-between px-3 py-2 shrink-0"
        style={{ background: "rgba(56,220,209,0.08)", border: "1px solid rgba(0,106,101,0.25)" }}
      >
        <div className="flex items-center gap-1.5">
          <div
            className="flex items-center gap-1 px-2 rounded-full"
            style={{ height: "22px", background: "rgba(0,106,101,0.12)" }}
          >
            <DollarIcon />
            <span className="text-[10px] font-medium tracking-[0.3px]" style={{ color: "#006A65" }}>Earn Mode</span>
          </div>
          <span className="text-[11px]" style={{ color: "#4E4352" }}>active</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <span className="text-[16px] font-medium" style={{ color: "#006A65" }}>${sessionEarnings.toFixed(2)}</span>
            <span className="text-[11px] ml-1" style={{ color: "#4E4352" }}>earned</span>
          </div>
        </div>
      </div>

      {/* ── Image card (scrollable area wrapper) ── */}
      <div className="flex-1 flex flex-col px-4 min-h-0">

        {/* Contained dark image card */}
        <div
          className="relative overflow-hidden shrink-0"
          style={{ borderRadius: "24px", background: "#303030", height: "240px" }}
        >
          {/* Medical image */}
          <img
            src="https://images.unsplash.com/photo-1576671081837-49000212a370?w=800&q=80"
            alt=""
            className="w-full h-full object-cover opacity-80"
            style={{ borderRadius: "24px" }}
          />
          {/* Annotation box — primary lesion */}
          <div
            className="absolute border-2 rounded"
            style={{ borderColor: "#38DCD1", top: "22%", left: "18%", width: "46%", height: "38%" }}
          />
          {/* Annotation box — secondary */}
          <div
            className="absolute border-2 rounded opacity-70"
            style={{ borderColor: "#FFD060", top: "64%", left: "50%", width: "24%", height: "18%" }}
          />
          {/* Zoom hint */}
          <div className="absolute bottom-2.5 left-0 right-0 flex justify-center">
            <div className="flex items-center gap-1" style={{ color: "rgba(255,255,255,0.55)" }}>
              <SparkleIcon />
              <span className="text-[11px]">Pinch to zoom</span>
            </div>
          </div>
        </div>

        {/* Instruction text */}
        <p
          className="text-center mt-3 mb-2 text-[14px] leading-snug"
          style={{ color: "#201922", fontWeight: 500 }}
        >
          Draw a bounding box around all lesions visible in this pathology slide.
        </p>

        {/* Draw / Pan segmented toggle */}
        <div
          className="flex rounded-full mx-auto mb-3 p-1"
          style={{ border: "1px solid #D2C1D4", background: "white", width: "fit-content" }}
        >
          {(["draw", "pan"] as const).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className="flex items-center gap-1.5 px-4 rounded-full"
              style={{
                height: "36px",
                background: mode === m ? "#F7EAF6" : "transparent",
                color: "#201922",
                transition: "background 0.15s",
              }}
            >
              {m === "draw" ? <PencilIcon /> : <MoveIcon />}
              <span className="text-[14px] font-medium capitalize tracking-[0.1px]">{m}</span>
            </button>
          ))}
        </div>

        {/* Utility row + submit buttons */}
        <div className="flex items-center gap-2">
          {/* Utility icons */}
          <button
            className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
            style={{ border: "1px solid #D2C1D4", color: "#4E4352" }}
          >
            <CommentIcon />
          </button>
          <button
            className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
            style={{ border: "1px solid #D2C1D4", color: "#4E4352" }}
          >
            <FlagIcon />
          </button>

          {/* Submit buttons — two variants for prototype demo */}
          <div className="flex-1 flex gap-1.5 ml-1">
            <button
              onClick={handleSubmitNotEarned}
              className="flex-1 flex items-center justify-center rounded-full"
              style={{
                height: "40px",
                border: "1px solid #D2C1D4",
                color: "#201922",
                fontSize: "12px",
                fontWeight: 500,
              }}
            >
              Score: {NOT_EARNED_SCORE}
            </button>
            <button
              onClick={handleSubmitEarned}
              className="flex-1 flex items-center justify-center gap-1.5 rounded-full"
              style={{
                height: "40px",
                background: "#8D2EBC",
                color: "white",
                fontSize: "12px",
                fontWeight: 500,
              }}
            >
              Score: {EARNED_SCORE} <ArrowRightIcon />
            </button>
          </div>
        </div>

        {/* Full-width Submit CTA (canonical) */}
        <button
          onClick={handleSubmitEarned}
          className="w-full flex items-center justify-center gap-2 mt-2"
          style={{
            height: "48px",
            borderRadius: "100px",
            background: "#8D2EBC",
            color: "white",
          }}
        >
          <span className="text-[14px] font-medium tracking-[0.1px]">Submit No Findings</span>
          <ArrowRightIcon />
        </button>
      </div>

      {/* ── Contest ended bottom sheet ── */}
      {showContestEnded && (
        <div
          className="absolute inset-0 flex items-end z-50"
          style={{ background: "rgba(0,0,0,0.50)" }}
        >
          <div
            className="w-full bg-white px-5 pt-4 pb-10"
            style={{ borderRadius: "28px 28px 0 0" }}
          >
            {/* Handle */}
            <div className="w-8 h-1 rounded-full mx-auto mb-5" style={{ background: "#D2C1D4" }} />

            {/* Icon */}
            <div
              className="w-12 h-12 rounded-[16px] flex items-center justify-center mb-3"
              style={{ background: "rgba(0,106,101,0.10)", color: "#006A65" }}
            >
              <DollarIcon />
            </div>

            <h2 className="text-[22px] font-normal mb-2" style={{ color: "#201922" }}>This contest has ended</h2>
            <p className="text-[14px] leading-relaxed mb-4" style={{ color: "#4E4352" }}>
              The prize pool was claimed while you were reading. Your earnings from this session are safe.
            </p>

            {/* Earnings summary */}
            <div
              className="rounded-[16px] px-4 py-3 mb-5"
              style={{ background: "rgba(56,220,209,0.08)", border: "1px solid rgba(0,106,101,0.20)" }}
            >
              <p className="text-[16px] font-medium" style={{ color: "#006A65" }}>
                ${sessionEarnings.toFixed(2)} earned · {qualifiedCount} qualified reads
              </p>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <button
                onClick={() => onNavigate("android-contest-detail")}
                className="flex-1 flex items-center justify-center rounded-full"
                style={{ height: "48px", border: "1px solid #8D2EBC", color: "#8D2EBC", fontSize: "14px", fontWeight: 500 }}
              >
                My earnings
              </button>
              <button
                onClick={() => onNavigate("android-compete")}
                className="flex-1 flex items-center justify-center rounded-full"
                style={{ height: "48px", background: "#8D2EBC", color: "white", fontSize: "14px", fontWeight: 500 }}
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
