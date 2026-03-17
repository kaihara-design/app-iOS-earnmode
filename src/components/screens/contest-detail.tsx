"use client";

import { useState } from "react";
import {
  ChevronLeft, ChevronRight, Bell, DollarSign, Trophy, BarChart2,
  Lock, Target, Eye, Check, Coins,
} from "lucide-react";

type UserState = "new" | "post-compete" | "returning";

interface ContestDetailProps {
  onNavigate: (screen: string) => void;
  userState?: UserState;
  initialShowRules?: boolean;
}

// Session data (used in post-compete state)
const SESSION_EARNED = 20.0;
const SESSION_QUALIFIED = 667;
const SESSION_TOTAL = 680;

export function ContestDetail({ onNavigate, userState = "new", initialShowRules = false }: ContestDetailProps) {
  const [showOnboarding, setShowOnboarding] = useState(userState === "new" && !initialShowRules);
  const [showRulesSheet, setShowRulesSheet] = useState(initialShowRules);
  const [stepsCompleted] = useState(
    userState !== "new" ? [true, true, true, true] : [true, false, false, false]
  );

  const isNew = userState === "new";

  const steps = [
    { label: "Location Requirements", sub: "Required for this contest." },
    { label: "Business Associate Agreement", sub: null, locked: isNew },
    { label: "Instructions — learn how to qualify", sub: null, locked: isNew },
    { label: "Practice Round — see qualifying in action", sub: null, locked: isNew },
  ];

  // Pool state
  const personalCap = 20.0;
  const userEarned = userState === "new" ? 0 : SESSION_EARNED;
  const userEarnedPct = (userEarned / personalCap) * 100;

  return (
    <div className="h-full flex flex-col" style={{ background: "#fff" }}>
      {/* Hero image */}
      <div className="relative h-[200px] flex-shrink-0" style={{ background: "linear-gradient(135deg, #1a6b7a 0%, #0d4a55 100%)" }}>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <button
          onClick={() => onNavigate("contest-browse")}
          className="absolute top-3 left-3 w-8 h-8 rounded-full bg-black/40 flex items-center justify-center"
        >
          <ChevronLeft size={18} color="white" />
        </button>
        <button className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 flex items-center justify-center">
          <Bell size={16} color="white" />
        </button>
        <div className="absolute bottom-3 left-4 right-4">
          <p className="text-white font-semibold text-[16px] leading-tight">Diabetic Retinopathy</p>
          <p className="text-white/70 text-[12px] mt-0.5">⏱ Ends in 6 hours 34 minutes</p>
        </div>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto">

        {/* ── Earnings status card ── */}
        <div className="px-4 pt-4">
          <div
            className="rounded-xl p-3"
            style={{ background: "var(--gray-6)", border: "1px solid var(--gray-5)" }}
          >
            <div className="flex items-start gap-3 mb-3">
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: "var(--earn-teal-10)", color: "var(--earn-teal)" }}
              >
                <DollarSign size={18} strokeWidth={2.5} />
              </div>
              <div className="flex-1 min-w-0">
                {userState === "post-compete" ? (
                  <>
                    <p className="text-[14px] font-semibold" style={{ color: "var(--label-primary)" }}>
                      ${SESSION_EARNED.toFixed(2)} earned this session
                    </p>
                    <p className="text-[12px] mt-0.5" style={{ color: "var(--label-secondary)" }}>
                      {SESSION_QUALIFIED} qualified reads · {SESSION_TOTAL} total
                    </p>
                  </>
                ) : userState === "returning" ? (
                  <>
                    <p className="text-[14px] font-semibold" style={{ color: "var(--label-primary)" }}>
                      ${userEarned.toFixed(2)} earned in this contest
                    </p>
                    <p className="text-[12px] mt-0.5" style={{ color: "var(--label-secondary)" }}>
                      ${(personalCap - userEarned).toFixed(2)} still available for you
                    </p>
                  </>
                ) : (
                  <>
                    <p className="text-[14px] font-semibold" style={{ color: "var(--label-primary)" }}>
                      Earn $0.03 per qualified read
                    </p>
                    <p className="text-[12px] mt-0.5" style={{ color: "var(--label-secondary)" }}>
                      Up to ${personalCap.toFixed(2)} for you in this contest
                    </p>
                  </>
                )}
              </div>
            </div>

            {/* Progress bar — personal cap */}
            <div className="h-1.5 rounded-full overflow-hidden mb-1" style={{ background: "var(--gray-5)" }}>
              <div
                className="h-full rounded-full transition-all duration-[700ms] ease-out"
                style={{ width: `${userEarnedPct}%`, background: "var(--earn-teal)" }}
              />
            </div>
            <div className="flex justify-between mb-2.5">
              <span className="text-[10px]" style={{ color: "var(--label-tertiary)" }}>
                {userState !== "new" ? `$${userEarned.toFixed(2)} earned` : "$0"}
              </span>
              <span className="text-[10px]" style={{ color: "var(--label-tertiary)" }}>
                ${personalCap.toFixed(0)} cap
              </span>
            </div>

          </div>
        </div>

        {/* About this contest — R&P + Leaderboard combined */}
        <div className="px-4 pt-4">
          <p className="text-[17px] font-semibold mb-2">About this contest</p>
          <div className="rounded-xl border overflow-hidden" style={{ borderColor: "var(--gray-5)" }}>
            {/* Rules and Prizes row */}
            <button
              onClick={() => setShowRulesSheet(true)}
              className="w-full p-3 flex items-center gap-3 text-left"
            >
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: "var(--earn-teal-10)", color: "var(--earn-teal)" }}
              >
                <Trophy size={18} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[14px] font-semibold">Rules and Prizes</p>
                <p className="text-[12px] mt-0.5" style={{ color: "var(--earn-teal)", fontWeight: 600 }}>
                  Earn $0.03 per qualified read · up to $20.00
                </p>
              </div>
              <ChevronRight size={16} style={{ color: "var(--label-tertiary)", flexShrink: 0 }} />
            </button>
            {/* Divider */}
            <div style={{ height: "1px", background: "var(--gray-5)" }} />
            {/* Leaderboard row */}
            <div className="p-3 flex items-center gap-3">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: "var(--earn-indigo-10)", color: "var(--earn-indigo)" }}
              >
                <BarChart2 size={18} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[14px] font-semibold">Leaderboard</p>
                <p className="text-[12px] mt-0.5" style={{ color: "var(--label-secondary)" }}>
                  See how your earnings rank this contest
                </p>
              </div>
              <ChevronRight size={16} style={{ color: "var(--label-tertiary)", flexShrink: 0 }} />
            </div>
          </div>
        </div>

        {/* Steps to start earning — hidden after competing */}
        {userState !== "post-compete" && (
          <div className="px-4 pt-4">
            <div className="flex items-center justify-between mb-1">
              <p className="text-[17px] font-semibold">Steps to start earning</p>
              <span className="text-[12px] font-semibold" style={{ color: "var(--earn-indigo)" }}>
                {isNew ? "1/4" : "4/4"} Completed
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
                    borderColor: isNew && i === 1 ? "var(--earn-indigo)" : "var(--gray-5)",
                    background: isNew && i === 1 ? "var(--earn-indigo-10)" : "white",
                  }}
                >
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
                    style={
                      stepsCompleted[i]
                        ? { background: "var(--earn-teal-10)", color: "var(--earn-teal)" }
                        : isNew && i === 1
                        ? { background: "var(--earn-indigo)", color: "white" }
                        : { background: "var(--gray-6)", color: "var(--label-tertiary)" }
                    }
                  >
                    {stepsCompleted[i]
                      ? <Check size={13} strokeWidth={2.5} />
                      : <span className="text-[12px] font-bold">{i + 1}</span>
                    }
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
                    ? <Lock size={15} style={{ color: "var(--label-tertiary)", flexShrink: 0 }} />
                    : <ChevronRight size={16} style={{ color: "var(--label-tertiary)", flexShrink: 0 }} />
                  }
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="px-4 pt-4 pb-8">
          <button
            onClick={() => onNavigate(userState === "post-compete" ? "contest-browse" : "labeling-option-b")}
            disabled={userState === "new" && !stepsCompleted.every(Boolean)}
            className="w-full py-3.5 rounded-2xl text-[15px] font-semibold text-white transition-transform duration-[100ms] active:scale-[0.97] disabled:opacity-40 disabled:cursor-not-allowed"
            style={{ background: "var(--earn-indigo)" }}
          >
            {userState === "post-compete" ? "Browse contests" : "Compete"}
          </button>
        </div>

      </div>

      {/* Rules & Prizes / Score Explained sheet */}
      {showRulesSheet && (
        <div className="absolute inset-0 bg-black/40 flex items-end animate-backdrop-in" onClick={() => setShowRulesSheet(false)}>
          <div className="bg-white rounded-t-3xl w-full px-5 pt-4 pb-10 max-h-[88%] overflow-y-auto animate-sheet-up" onClick={(e) => e.stopPropagation()}>
            <div className="w-8 h-1 rounded-full mx-auto mb-4" style={{ background: "var(--gray-5)" }} />
            <h2 className="text-[18px] font-bold mb-4">Rules &amp; Prizes</h2>

            {/* Earnings summary */}
            <div
              className="rounded-xl p-3 flex items-center gap-3 mb-5"
              style={{ background: "var(--earn-teal-10)" }}
            >
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: "var(--earn-teal-10)", color: "var(--earn-teal)" }}
              >
                <DollarSign size={18} strokeWidth={2.5} />
              </div>
              <div>
                <p className="text-[14px] font-semibold" style={{ color: "var(--earn-teal)" }}>
                  $0.03 per qualified read
                </p>
                <p className="text-[12px] mt-0.5" style={{ color: "var(--label-secondary)" }}>
                  Up to $20.00 for you · $2,000 prize pool
                </p>
              </div>
            </div>

            {/* How qualifying works */}
            <p className="text-[14px] font-semibold mb-1">How qualifying works</p>
            <p className="text-[13px] leading-relaxed mb-4" style={{ color: "var(--label-secondary)" }}>
              Every read is scored 0–100 based on annotation quality. Meet the quality bar and you earn. Miss it and you don&apos;t.
            </p>

            {/* Score bar visualization */}
            <div className="rounded-xl p-4 mb-5" style={{ background: "var(--gray-6)", border: "1px solid var(--gray-5)" }}>
              <div className="relative h-3 rounded-full overflow-hidden mb-1" style={{ background: "var(--gray-5)" }}>
                <div className="absolute left-0 top-0 h-full rounded-l-full" style={{ width: "70%", background: "var(--earn-red-10)" }} />
                <div className="absolute top-0 h-full rounded-r-full" style={{ left: "70%", right: 0, background: "var(--earn-teal-10)" }} />
                <div className="absolute top-0 h-full w-0.5" style={{ left: "70%", background: "var(--earn-teal)" }} />
              </div>
              <div className="flex justify-between mb-3">
                <span className="text-[11px]" style={{ color: "var(--label-tertiary)" }}>0</span>
                <span className="text-[11px] font-semibold" style={{ color: "var(--earn-teal)", marginLeft: "calc(70% - 16px)" }}>70</span>
                <span className="text-[11px]" style={{ color: "var(--label-tertiary)" }}>100</span>
              </div>
              <div className="flex gap-3">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: "var(--earn-red)" }} />
                  <span className="text-[12px]" style={{ color: "var(--label-secondary)" }}>Below 70 — not earned</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: "var(--earn-teal)" }} />
                  <span className="text-[12px]" style={{ color: "var(--label-secondary)" }}>70+ — earned</span>
                </div>
              </div>
            </div>

            {/* What affects your score */}
            <p className="text-[14px] font-semibold mb-2">What affects your score</p>
            <div className="space-y-2 mb-6">
              {[
                { icon: <Target size={14} />, text: "Precision of your bounding boxes" },
                { icon: <Eye size={14} />, text: "Coverage of all visible lesions" },
                { icon: <Check size={14} />, text: "Avoiding false positives" },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-2.5">
                  <span className="w-5 flex justify-center flex-shrink-0" style={{ color: "var(--label-tertiary)" }}>{item.icon}</span>
                  <p className="text-[13px]" style={{ color: "var(--label-secondary)" }}>{item.text}</p>
                </div>
              ))}
            </div>

            <button
              onClick={() => setShowRulesSheet(false)}
              className="w-full py-3.5 rounded-2xl text-[15px] font-semibold text-white transition-transform duration-[100ms] active:scale-[0.97]"
              style={{ background: "var(--earn-indigo)" }}
            >
              Got it
            </button>
          </div>
        </div>
      )}

      {/* First-entry onboarding sheet */}
      {showOnboarding && (
        <div className="absolute inset-0 bg-black/40 flex items-end animate-backdrop-in">
          <div className="bg-white rounded-t-3xl w-full p-6 pb-10 animate-sheet-up">
            <div className="w-10 h-1 bg-gray-300 rounded-full mx-auto mb-5" />
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4"
              style={{ background: "var(--earn-teal-10)", color: "var(--earn-teal)" }}
            >
              <Coins size={24} />
            </div>
            <h2 className="text-[20px] font-bold mb-2">Earn Mode</h2>
            <p className="text-[15px] leading-relaxed mb-6" style={{ color: "var(--label-secondary)" }}>
              Earn $0.03 for every qualified read. Your reads are scored — meet the quality bar and you earn. Miss it and you don&apos;t.
            </p>
            <button
              onClick={() => setShowOnboarding(false)}
              className="w-full py-3.5 rounded-2xl text-[15px] font-semibold text-white transition-transform duration-[100ms] active:scale-[0.97]"
              style={{ background: "var(--earn-indigo)" }}
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
