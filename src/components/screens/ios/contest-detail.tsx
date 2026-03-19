"use client";

import { useState } from "react";
import {
  ChevronLeft, ChevronRight, Bell, DollarSign, Trophy, BarChart2,
  Flag, Award, RefreshCw, AlertTriangle, Info, Check, Coins,
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

export function ContestDetail({ onNavigate, userState = "new", initialShowRules = false }: ContestDetailProps) {
  const [showOnboarding, setShowOnboarding] = useState(userState === "new" && !initialShowRules);
  const [showRulesSheet, setShowRulesSheet] = useState(initialShowRules);
  const steps = [
    { label: "Location Requirements" },
    { label: "Business Associate Agreement" },
    { label: "Instructions — learn how to qualify" },
    { label: "Practice Round — see qualifying in action" },
  ];

  // Pool state
  const personalCap = 20.0;
  const userEarned = userState === "new" ? 0 : SESSION_EARNED;
  const userEarnedPct = (userEarned / personalCap) * 100;

  return (
    <div className="h-full flex flex-col relative" style={{ background: "var(--ios-surface-default)", fontFamily: "var(--ios-font)" }}>
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
      <div className="flex-1 overflow-y-auto pb-20">

        {/* ── Earnings status card ── */}
        <div className="px-4 pt-4">
          <div
            className="rounded-xl p-3"
            style={{ background: "var(--ios-earnings-card-bg)", border: "1px solid var(--ios-earnings-card-border)" }}
          >
            {/* Icon + text row */}
            <div className="flex items-center gap-2 mb-3">
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: "var(--earn-teal-10)", color: "var(--earn-teal)" }}
              >
                <DollarSign size={18} strokeWidth={2.5} />
              </div>
              <div className="flex-1 min-w-0">
                {userState === "post-compete" ? (
                  <>
                    <p className="text-[15px] font-medium" style={{ color: "var(--ios-text-primary)", letterSpacing: "-0.23px" }}>
                      ${SESSION_EARNED.toFixed(2)} earned this session
                    </p>
                    <p className="text-[11px] mt-0.5" style={{ color: "var(--ios-text-secondary)", letterSpacing: "0.06px" }}>
                      {SESSION_QUALIFIED} qualified reads
                    </p>
                  </>
                ) : userState === "returning" ? (
                  <>
                    <p className="text-[15px] font-medium" style={{ color: "var(--ios-text-primary)", letterSpacing: "-0.23px" }}>
                      ${userEarned.toFixed(2)} earned in this contest
                    </p>
                    <p className="text-[11px] mt-0.5" style={{ color: "var(--ios-text-secondary)", letterSpacing: "0.06px" }}>
                      ${(personalCap - userEarned).toFixed(2)} still available for you
                    </p>
                  </>
                ) : (
                  <>
                    <p className="text-[15px] font-medium" style={{ color: "var(--ios-text-primary)", letterSpacing: "-0.23px" }}>
                      Earn $0.03 per qualified read
                    </p>
                    <p className="text-[11px] mt-0.5" style={{ color: "var(--ios-text-secondary)", letterSpacing: "0.06px" }}>
                      Up to $20 for you in this contest
                    </p>
                  </>
                )}
              </div>
            </div>

            {/* Progress bar + labels */}
            <div className="relative h-6">
              {/* Track */}
              <div
                className="absolute top-0 left-0 right-0 rounded-full"
                style={{ height: "4px", background: "var(--ios-fill-quaternary)" }}
              />
              {/* Fill */}
              <div
                className="absolute top-0 left-0 rounded-full transition-all duration-[700ms] ease-out"
                style={{ height: "4px", width: `${userEarnedPct}%`, background: "var(--earn-teal)", boxShadow: "0px 2px 6px rgba(77,195,208,0.17)" }}
              />
              {/* Labels */}
              <span className="absolute left-0 text-[11px]" style={{ top: "10px", color: "var(--ios-text-secondary)", letterSpacing: "0.06px" }}>
                {userState !== "new" ? `$${userEarned.toFixed(2)}` : "$0"}
              </span>
              <span className="absolute right-0 text-[11px] text-right" style={{ top: "10px", color: "var(--ios-text-secondary)", letterSpacing: "0.06px" }}>
                $20
              </span>
            </div>
          </div>
        </div>

        {/* About this contest — two separate cards per Figma */}
        <div className="px-4 pt-4">
          <p className="text-[17px] font-semibold mb-2" style={{ color: "var(--ios-text-primary)" }}>About this contest</p>
          <div className="space-y-2">
            {/* Rules and Prizes card */}
            <button
              onClick={() => setShowRulesSheet(true)}
              className="w-full p-3 flex items-center gap-2 text-left rounded-xl border"
              style={{ borderColor: "var(--ios-border-default)", background: "var(--ios-surface-default)" }}
            >
              <div
                className="w-10 flex-shrink-0 flex items-center justify-center rounded-[4px]"
                style={{ height: "38px", background: "var(--ios-card-icon-bg)", color: "var(--earn-teal)" }}
              >
                <Trophy size={16} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[15px] font-semibold" style={{ color: "var(--ios-text-primary)", letterSpacing: "-0.23px" }}>Rules and Prizes</p>
                <p className="text-[12px] mt-0.5" style={{ color: "var(--ios-text-secondary)" }}>
                  See full contest details, rules, and eligibility.
                </p>
              </div>
              <ChevronRight size={16} style={{ color: "var(--ios-text-tertiary)", flexShrink: 0 }} />
            </button>
            {/* Leaderboard card */}
            <div
              className="w-full p-3 flex items-center gap-2 rounded-xl border"
              style={{ borderColor: "var(--ios-border-default)", background: "var(--ios-surface-default)" }}
            >
              <div
                className="w-10 flex-shrink-0 flex items-center justify-center rounded-[4px]"
                style={{ height: "38px", background: "var(--ios-card-icon-bg)", color: "var(--earn-teal)" }}
              >
                <BarChart2 size={16} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[15px] font-semibold" style={{ color: "var(--ios-text-primary)", letterSpacing: "-0.23px" }}>Leaderboard</p>
                <p className="text-[12px] mt-0.5" style={{ color: "var(--ios-text-secondary)" }}>
                  Check how many users are competing.
                </p>
              </div>
              <ChevronRight size={16} style={{ color: "var(--ios-text-tertiary)", flexShrink: 0 }} />
            </div>
          </div>
        </div>

        {/* Steps to start earning — hidden after competing */}
        {userState !== "post-compete" && (
          <div className="px-4 pt-4">
            <div className="flex items-center justify-between mb-1">
              <p className="text-[17px] font-semibold" style={{ color: "var(--ios-text-primary)" }}>Steps to start earning</p>
              <span className="text-[12px] font-semibold" style={{ color: "var(--ios-interactive-primary)" }}>
                4/4 Completed
              </span>
            </div>
            <p className="text-[12px] mb-3" style={{ color: "var(--ios-text-secondary)" }}>
              Complete these to unlock your earnings.
            </p>

            <div className="space-y-2">
              {steps.map((step, i) => (
                <div
                  key={i}
                  className="rounded-xl border p-3 flex items-center gap-3"
                  style={{ borderColor: "var(--ios-border-default)", background: "var(--ios-surface-default)" }}
                >
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: "var(--earn-teal-10)", color: "var(--earn-teal)" }}
                  >
                    <Check size={13} strokeWidth={2.5} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-medium" style={{ color: "var(--ios-text-primary)" }}>
                      {step.label}
                    </p>
                  </div>
                  <ChevronRight size={16} style={{ color: "var(--ios-text-tertiary)", flexShrink: 0 }} />
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* CTA */}
      <div className="absolute bottom-0 left-0 right-0 px-4 pb-8 pt-3 border-t" style={{ background: "var(--ios-surface-default)", borderColor: "var(--ios-border-default)" }}>
        <button
          onClick={() => onNavigate("labeling")}
          className="w-full py-3.5 rounded-2xl text-[15px] font-semibold text-white transition-transform duration-[100ms] active:scale-[0.97]"
          style={{ background: "var(--ios-interactive-primary)" }}
        >
          Compete
        </button>
      </div>

      {/* Rules & Prizes sheet — original app copy */}
      {showRulesSheet && (
        <div className="absolute inset-0 bg-black/40 flex items-end animate-backdrop-in" onClick={() => setShowRulesSheet(false)}>
          <div className="rounded-t-3xl w-full px-5 pt-4 pb-10 max-h-[88%] overflow-y-auto animate-sheet-up" style={{ background: "var(--ios-surface-default)" }} onClick={(e) => e.stopPropagation()}>
            <div className="w-8 h-1 rounded-full mx-auto mb-1" style={{ background: "var(--ios-border-default)" }} />
            <p className="text-center text-[13px] font-semibold py-3 mb-1" style={{ color: "var(--ios-text-primary)" }}>Rules &amp; Prizes</p>
            <div style={{ height: "1px", background: "var(--ios-border-default)", marginBottom: "16px" }} />

            {[
              {
                icon: <DollarSign size={18} />,
                label: "How to Earn",
                body: "You will be shown a series of cases with answers followed by a mixture of cases with and without answers. If your score on the cases with answers is above a certain threshold, then you will earn whenever you submit an opinion for a case without answers. These earnings will convert to a withdrawable earning shortly after the contest ends.",
              },
              {
                icon: <Flag size={18} />,
                label: "Deadline",
                body: "This contest starts Mar 17 at 1:00 PM GMT-7 and ends Mar 17 at 5:00 PM GMT-7.",
              },
              {
                icon: <Award size={18} />,
                label: "Prizes",
                body: "$0.03 per qualifying opinion, up to a maximum of $199.99.",
              },
              {
                icon: <RefreshCw size={18} />,
                label: "Data Quality",
                body: "Some cases may be classified incorrectly. Your feedback helps us improve the dataset over time.",
              },
              {
                icon: <AlertTriangle size={18} />,
                label: "Code of Ethics",
                body: "This app depends on your integrity and full effort on every case you see. If we suspect that you are anticipating the cases that will not be scored and making less effort on those cases, you may be suspended or banned. It is against our rules to attempt to identify and avoid difficult cases. You cannot copy data from this app (such as by taking screenshots) in an attempt to reproduce any portion of our datasets.",
              },
              {
                icon: <Info size={18} />,
                label: "Additional Information",
                body: "Apple Inc. is not a sponsor of this contest and is not involved in any way with this contest or any DiagnosUs contest. Additional information about rules can be found in the Profile tab by tapping the settings icon in the top-right corner and then tapping the Legal section from the Settings menu, or at https://assets.diagnosus.com/pdf/legal/contests.pdf.",
              },
              {
                icon: <Info size={18} />,
                label: "Medical Information",
                body: "Consult a physician before making medical decisions. Do not rely on information in this app to make medical decisions. Information in this app is not used to diagnose or treat patients.",
              },
            ].map(({ icon, label, body }) => (
              <div key={label} className="mb-5">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span style={{ color: "var(--ios-text-secondary)" }}>{icon}</span>
                    <p className="text-[17px] font-bold" style={{ color: "var(--ios-text-primary)" }}>{label}</p>
                  </div>
                  <ChevronLeft size={16} className="rotate-90" style={{ color: "var(--ios-text-tertiary)" }} />
                </div>
                <p className="text-[15px] leading-relaxed" style={{ color: "var(--ios-text-primary)" }}>{body}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* First-entry onboarding sheet */}
      {showOnboarding && (
        <div className="absolute inset-0 bg-black/40 flex items-end animate-backdrop-in">
          <div className="rounded-t-3xl w-full p-6 pb-10 animate-sheet-up" style={{ background: "var(--ios-surface-default)" }}>
            <div className="w-10 h-1 rounded-full mx-auto mb-5" style={{ background: "var(--ios-border-default)" }} />
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4"
              style={{ background: "var(--earn-teal-10)", color: "var(--earn-teal)" }}
            >
              <Coins size={24} />
            </div>
            <h2 className="text-[20px] font-bold mb-2" style={{ color: "var(--ios-text-primary)" }}>Earn Mode</h2>
            <p className="text-[15px] leading-relaxed mb-6" style={{ color: "var(--ios-text-secondary)" }}>
              Earn $0.03 for every qualified read. Your accuracy is tracked across recent cases. Meet the threshold and you earn. Keep your accuracy up to keep earning.
            </p>
            <button
              onClick={() => setShowOnboarding(false)}
              className="w-full py-3.5 rounded-2xl text-[15px] font-semibold text-white transition-transform duration-[100ms] active:scale-[0.97]"
              style={{ background: "var(--ios-interactive-primary)" }}
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
