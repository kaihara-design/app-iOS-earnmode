"use client";

import { useState } from "react";

interface ContestDetailProps {
  onNavigate: (screen: string) => void;
}

// Toggle to simulate returning user state
const IS_RETURNING_USER = false;

export function ContestDetail({ onNavigate }: ContestDetailProps) {
  const [showOnboarding, setShowOnboarding] = useState(!IS_RETURNING_USER);
  const [stepsCompleted] = useState(
    IS_RETURNING_USER ? [true, true, true, true] : [true, false, false, false]
  );

  const steps = [
    { label: "Location Requirements", sub: "Required for this contest." },
    { label: "Business Associate Agreement", sub: null, locked: !IS_RETURNING_USER },
    { label: "Instructions — learn how to qualify", sub: null, locked: !IS_RETURNING_USER },
    { label: "Practice Round — see qualifying in action", sub: null, locked: !IS_RETURNING_USER },
  ];

  // Pool state
  const prizePool = 20.0;
  const poolRemaining = 18.5;
  const poolPct = (poolRemaining / prizePool) * 100;
  const userEarned = IS_RETURNING_USER ? 0.12 : 0;
  const userEarnedPct = (userEarned / prizePool) * 100;

  return (
    <div className="h-full flex flex-col relative" style={{ background: "#fff" }}>
      {/* Hero image */}
      <div className="relative h-[200px] flex-shrink-0" style={{ background: "linear-gradient(135deg, #1a6b7a 0%, #0d4a55 100%)" }}>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <button
          onClick={() => onNavigate("contest-browse")}
          className="absolute top-3 left-3 w-8 h-8 rounded-full bg-black/40 flex items-center justify-center"
        >
          <span className="text-white text-sm">←</span>
        </button>
        <button className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 flex items-center justify-center">
          <span className="text-white text-sm">🔔</span>
        </button>
        <div className="absolute bottom-3 left-4 right-4">
          <p className="text-white font-semibold text-[16px] leading-tight">Diabetic Retinopathy</p>
          <p className="text-white/70 text-[12px] mt-0.5">⏱ Ends in 6 hours 34 minutes</p>
        </div>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto pb-20">

        {/* ── Earnings status card (adapted from Accuracy leaderboard progress card) ── */}
        <div className="px-4 pt-4">
          <div
            className="rounded-xl p-3"
            style={{ background: "var(--gray-6)", border: "1px solid var(--gray-5)" }}
          >
            <div className="flex items-start gap-3 mb-3">
              {/* Teal icon — mirrors the circular icon in the Accuracy card */}
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: "var(--earn-teal)", color: "white", fontSize: "16px" }}
              >
                💰
              </div>
              <div className="flex-1 min-w-0">
                {IS_RETURNING_USER ? (
                  <>
                    <p className="text-[14px] font-semibold" style={{ color: "var(--label-primary)" }}>
                      $0.12 earned in this contest
                    </p>
                    <p className="text-[12px] mt-0.5" style={{ color: "var(--label-secondary)" }}>
                      4 qualified reads · ${poolRemaining.toFixed(2)} remaining in pool
                    </p>
                  </>
                ) : (
                  <>
                    <p className="text-[14px] font-semibold" style={{ color: "var(--label-primary)" }}>
                      Earn $0.03 per qualified read
                    </p>
                    <p className="text-[12px] mt-0.5" style={{ color: "var(--label-secondary)" }}>
                      ${poolRemaining.toFixed(2)} of ${prizePool.toFixed(2)} prize pool remaining
                    </p>
                  </>
                )}
              </div>
            </div>

            {/* Progress bar — pool remaining */}
            <div className="relative">
              <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "var(--gray-5)" }}>
                {/* Pool remaining fill */}
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${poolPct}%`,
                    background: "var(--earn-teal)",
                    opacity: 0.35,
                  }}
                />
                {/* User's earnings fill (on top, solid) */}
                {IS_RETURNING_USER && (
                  <div
                    className="h-full rounded-full absolute top-0 left-0"
                    style={{ width: `${userEarnedPct}%`, background: "var(--earn-teal)" }}
                  />
                )}
              </div>
              {/* Labels */}
              <div className="flex justify-between mt-1">
                <span className="text-[10px]" style={{ color: "var(--label-tertiary)" }}>$0</span>
                {IS_RETURNING_USER && (
                  <span
                    className="text-[10px] font-semibold"
                    style={{ color: "var(--earn-teal-deep)", marginLeft: `${userEarnedPct}%`, transform: "translateX(-50%)", position: "absolute" }}
                  >
                    $0.12
                  </span>
                )}
                <span className="text-[10px]" style={{ color: "var(--label-tertiary)" }}>${prizePool.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* About this contest — R&P + Leaderboard combined */}
        <div className="px-4 pt-4">
          <p className="text-[17px] font-semibold mb-2">About this contest</p>
          <div className="rounded-xl border overflow-hidden" style={{ borderColor: "var(--gray-5)" }}>
            {/* Rules and Prizes row */}
            <div className="p-3 flex items-start gap-3">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: "var(--earn-teal-10)" }}
              >
                <span className="text-lg">🏆</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[14px] font-semibold">Rules and Prizes</p>
                <p className="text-[12px] mt-0.5" style={{ color: "var(--earn-teal-deep)", fontWeight: 600 }}>
                  Earn $0.03 per qualified read · up to $20.00
                </p>
              </div>
              <span style={{ color: "var(--label-tertiary)" }}>›</span>
            </div>
            {/* Divider */}
            <div style={{ height: "1px", background: "var(--gray-5)" }} />
            {/* Leaderboard row */}
            <div className="p-3 flex items-center gap-3">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: "var(--earn-indigo-10)" }}
              >
                <span className="text-lg">📊</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[14px] font-semibold">Leaderboard</p>
                <p className="text-[12px] mt-0.5" style={{ color: "var(--label-secondary)" }}>
                  See how your earnings rank this contest
                </p>
              </div>
              <span style={{ color: "var(--label-tertiary)" }}>›</span>
            </div>
          </div>
        </div>

        {/* Steps to start earning */}
        <div className="px-4 pt-4">
          <div className="flex items-center justify-between mb-1">
            <p className="text-[17px] font-semibold">Steps to start earning</p>
            <span className="text-[12px] font-semibold" style={{ color: "var(--earn-indigo)" }}>
              {IS_RETURNING_USER ? "4/4" : "1/4"} Completed
            </span>
          </div>
          <p className="text-[12px] mb-3" style={{ color: "var(--label-secondary)" }}>
            Complete these to unlock your earnings.
          </p>

          <div className="space-y-2">
            {steps.map((step, i) => (
              <div
                key={i}
                className="rounded-xl border p-3 flex items-center gap-3"
                style={{
                  borderColor: !IS_RETURNING_USER && i === 1 ? "var(--earn-indigo)" : "var(--gray-5)",
                  background: !IS_RETURNING_USER && i === 1 ? "var(--earn-indigo-10)" : "white",
                }}
              >
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-[12px] font-bold"
                  style={
                    stepsCompleted[i]
                      ? { background: "var(--earn-teal)", color: "white" }
                      : !IS_RETURNING_USER && i === 1
                      ? { background: "var(--earn-indigo)", color: "white" }
                      : { background: "var(--gray-6)", color: "var(--label-tertiary)" }
                  }
                >
                  {stepsCompleted[i] ? "✓" : i + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <p
                    className="text-[13px] font-medium"
                    style={{ color: step.locked ? "var(--label-tertiary)" : "var(--label-primary)" }}
                  >
                    {step.label}
                  </p>
                  {step.sub && (
                    <p className="text-[11px] mt-0.5" style={{ color: "var(--label-secondary)" }}>
                      {step.sub}
                    </p>
                  )}
                </div>
                {step.locked
                  ? <span style={{ color: "var(--label-tertiary)" }}>🔒</span>
                  : <span style={{ color: "var(--label-tertiary)" }}>›</span>
                }
              </div>
            ))}
          </div>
        </div>

        {/* Prize pool urgency block */}
        <div className="px-4 pt-4 pb-2">
          <div className="flex items-baseline justify-between mb-2">
            <p className="text-[17px] font-semibold">Prize pool</p>
            <p className="text-[12px]" style={{ color: "var(--label-secondary)" }}>
              Claim yours before it&apos;s gone
            </p>
          </div>
          <div
            className="rounded-xl border p-3"
            style={{ borderColor: "var(--gray-5)" }}
          >
            {/* Bar */}
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[13px] font-semibold" style={{ color: "var(--earn-teal-deep)" }}>
                ${poolRemaining.toFixed(2)} remaining
              </span>
              <span className="text-[12px]" style={{ color: "var(--label-tertiary)" }}>
                of ${prizePool.toFixed(2)}
              </span>
            </div>
            <div className="h-2 rounded-full mb-3 overflow-hidden" style={{ background: "var(--gray-5)" }}>
              <div
                className="h-full rounded-full"
                style={{ width: `${poolPct}%`, background: "var(--earn-teal)" }}
              />
            </div>
            {/* Earning now */}
            <div className="flex items-center gap-1.5">
              <span
                className="inline-block w-2 h-2 rounded-full"
                style={{ background: "var(--earn-red)", boxShadow: "0 0 0 3px rgba(255,59,48,0.15)" }}
              />
              <span className="text-[12px] font-medium" style={{ color: "var(--label-secondary)" }}>
                38 earning right now
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="absolute bottom-0 left-0 right-0 px-4 pb-8 pt-3 bg-white border-t" style={{ borderColor: "var(--gray-5)" }}>
        <button
          onClick={() => onNavigate("labeling-option-b")}
          className="w-full py-3.5 rounded-2xl text-[15px] font-semibold text-white"
          style={{ background: "var(--earn-teal)" }}
        >
          Compete
        </button>
      </div>

      {/* First-entry onboarding sheet */}
      {showOnboarding && (
        <div className="absolute inset-0 bg-black/40 flex items-end">
          <div className="bg-white rounded-t-3xl w-full p-6 pb-10">
            <div className="w-10 h-1 bg-gray-300 rounded-full mx-auto mb-5" />
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4"
              style={{ background: "var(--earn-teal-10)" }}
            >
              <span className="text-2xl">💰</span>
            </div>
            <h2 className="text-[20px] font-bold mb-2">Earn Mode</h2>
            <p className="text-[15px] leading-relaxed mb-6" style={{ color: "var(--label-secondary)" }}>
              Earn $0.03 for every qualified read. Your reads are scored — meet the quality bar and you earn. Miss it and you don&apos;t.
            </p>
            <button
              onClick={() => setShowOnboarding(false)}
              className="w-full py-3.5 rounded-2xl text-[15px] font-semibold text-white"
              style={{ background: "var(--earn-teal)" }}
            >
              Got it — show me how
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
