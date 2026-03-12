"use client";

import { useState } from "react";

interface LabelingOptionBProps {
  onNavigate: (screen: string) => void;
}

type FeedbackState = "none" | "earned" | "not-earned";

export function LabelingOptionB({ onNavigate }: LabelingOptionBProps) {
  const [feedback, setFeedback] = useState<FeedbackState>("none");
  const [sessionEarnings, setSessionEarnings] = useState(0.09);
  const [qualifiedCount, setQualifiedCount] = useState(3);
  const [readCount, setReadCount] = useState(4);
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
    // Simulate contest ending on 3rd read
    if (readCount >= 6) {
      setShowContestEnded(true);
    }
  }

  return (
    <div className="h-full flex flex-col" style={{ background: "#fff" }}>
      {/* Practice mode banner — shown separately in Option B */}
      {/* Earn Mode HUD */}
      <div
        className="flex items-center justify-between px-4 py-2 border-b"
        style={{ borderColor: "var(--gray-5)" }}
      >
        <div className="flex items-center gap-2">
          <button onClick={() => onNavigate("contest-detail")} className="text-[13px]" style={{ color: "var(--label-secondary)" }}>
            ✕
          </button>
          <span
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold"
            style={{ background: "var(--earn-teal)", color: "white" }}
          >
            💰 Earn Mode
          </span>
        </div>
        <div className="text-right">
          <p className="text-[15px] font-bold" style={{ color: "var(--earn-teal-deep)" }}>
            ${sessionEarnings.toFixed(2)}
          </p>
          <p className="text-[10px]" style={{ color: "var(--label-secondary)" }}>earned</p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="px-4 pt-2 pb-1">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[11px]" style={{ color: "var(--label-secondary)" }}>
            Read {readCount} of 6
          </span>
          <span className="text-[11px]" style={{ color: "var(--label-secondary)" }}>
            · {qualifiedCount} qualified
          </span>
        </div>
        <div className="flex gap-1">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="flex-1 h-1 rounded-full"
              style={{
                background: i < readCount ? "var(--earn-teal)" : "var(--gray-5)",
              }}
            />
          ))}
        </div>
      </div>

      {/* Medical image placeholder */}
      <div
        className="mx-4 rounded-2xl flex-1 flex flex-col items-center justify-center relative overflow-hidden min-h-0"
        style={{ background: "#0f0f0f", minHeight: "240px", maxHeight: "300px" }}
      >
        {/* Simulated fundus image */}
        <div
          className="w-[200px] h-[200px] rounded-full opacity-60"
          style={{ background: "radial-gradient(circle, #8b2500 0%, #4a1200 40%, #1a0600 100%)" }}
        />
        {/* Annotation box */}
        <div
          className="absolute border-2 rounded-lg"
          style={{
            borderColor: "var(--earn-teal)",
            top: "35%",
            left: "30%",
            width: "40%",
            height: "30%",
          }}
        />
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
          <div className="flex gap-2">
            <button className="w-8 h-8 rounded-full bg-black/50 flex items-center justify-center text-white text-[14px]">💬</button>
            <button className="w-8 h-8 rounded-full bg-black/50 flex items-center justify-center text-white text-[14px]">🚩</button>
            <button className="w-8 h-8 rounded-full bg-black/50 flex items-center justify-center text-white text-[14px]">👁</button>
          </div>
        </div>
      </div>

      {/* Task instruction */}
      <div className="px-4 pt-3">
        <p className="text-[13px]" style={{ color: "var(--label-secondary)" }}>
          Draw a bounding box around all lesions visible in this fundus image.
        </p>
      </div>

      {/* Feedback banner — Option B (pass/fail, no score) */}
      {feedback === "not-earned" && (
        <div
          className="mx-4 mt-2 rounded-xl px-3 py-2.5"
          style={{ background: "var(--earn-red-10)", border: "1px solid rgba(255,59,48,0.15)" }}
        >
          <div className="flex items-start gap-2">
            <span style={{ color: "var(--earn-red)" }}>✗</span>
            <div>
              <p className="text-[13px] font-semibold" style={{ color: "var(--earn-red)" }}>
                This read didn&apos;t earn
              </p>
              <p className="text-[12px] mt-0.5" style={{ color: "var(--label-secondary)" }}>
                More precise boxes = higher quality score = earnings.
              </p>
            </div>
          </div>
        </div>
      )}

      {feedback === "earned" && (
        <div
          className="mx-4 mt-2 rounded-xl px-3 py-2.5"
          style={{ background: "var(--earn-teal-10)", border: "1px solid rgba(77,195,208,0.25)" }}
        >
          <div className="flex items-center gap-2">
            <span style={{ color: "var(--earn-teal-deep)" }}>✓</span>
            <p className="text-[13px] font-semibold" style={{ color: "var(--earn-teal-deep)" }}>
              Earned &nbsp;·&nbsp; +$0.03 &nbsp;·&nbsp; ${sessionEarnings.toFixed(2)} this session
            </p>
          </div>
        </div>
      )}

      {/* Action row */}
      <div className="px-4 pt-3 pb-5 flex gap-2">
        {feedback === "none" ? (
          <>
            <button
              onClick={handleNotEarned}
              className="flex-1 py-3 rounded-2xl text-[14px] font-semibold border"
              style={{ borderColor: "var(--gray-5)", color: "var(--label-secondary)" }}
            >
              Simulate: not earned
            </button>
            <button
              onClick={handleEarned}
              className="flex-1 py-3 rounded-2xl text-[14px] font-semibold text-white"
              style={{ background: "var(--earn-teal)" }}
            >
              Simulate: earned
            </button>
          </>
        ) : (
          <button
            onClick={handleNext}
            className="flex-1 py-3 rounded-2xl text-[14px] font-semibold text-white"
            style={{ background: "var(--earn-teal)" }}
          >
            Next →
          </button>
        )}
      </div>

      {/* Contest ended bottom sheet */}
      {showContestEnded && (
        <div className="absolute inset-0 bg-black/40 flex items-end">
          <div className="bg-white rounded-t-3xl w-full p-6 pb-10">
            <div className="w-10 h-1 bg-gray-300 rounded-full mx-auto mb-5" />
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center mb-3"
              style={{ background: "var(--earn-indigo-10)" }}
            >
              <span className="text-2xl">💰</span>
            </div>
            <h2 className="text-[18px] font-bold mb-2">This contest has ended</h2>
            <p className="text-[14px] leading-relaxed mb-4" style={{ color: "var(--label-secondary)" }}>
              The prize pool was claimed while you were reading. Your earnings from this session are safe.
            </p>
            <div
              className="rounded-xl px-4 py-3 mb-5"
              style={{ background: "var(--earn-indigo-10)" }}
            >
              <p className="text-[15px] font-bold" style={{ color: "var(--earn-indigo)" }}>
                ${sessionEarnings.toFixed(2)} earned · {qualifiedCount} qualified reads
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => onNavigate("post-compete")}
                className="flex-1 py-3 rounded-2xl text-[14px] font-semibold border"
                style={{ borderColor: "var(--earn-indigo)", color: "var(--earn-indigo)" }}
              >
                View my earnings
              </button>
              <button
                onClick={() => onNavigate("contest-browse")}
                className="flex-1 py-3 rounded-2xl text-[14px] font-semibold text-white"
                style={{ background: "var(--earn-indigo)" }}
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
