"use client";

import { useState } from "react";

// Android Earn Mode — Contest Detail screen
// M3 spec: outlined cards, full-pill CTA, left-aligned titles
// Earn Mode variant: teal earnings card replaces leaderboard card

interface ContestDetailProps {
  onNavigate: (screen: string) => void;
  userState?: "new" | "post-compete";
}

// ─── Icons ────────────────────────────────────────────────────────────────────

function BackIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 12H5M12 19l-7-7 7-7"/>
    </svg>
  );
}

function BellIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>
    </svg>
  );
}

function AlarmIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="13" r="8"/><path d="M12 9v4l2 2"/><path d="M5 3 2 6"/><path d="m22 6-3-3"/>
    </svg>
  );
}

function DollarIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><path d="M12 6v12M9 9.5c0-1.4 1.3-2.5 3-2.5s3 1.1 3 2.5-1.3 2.5-3 2.5-3 1.1-3 2.5 1.3 2.5 3 2.5 3-1.1 3-2.5"/>
    </svg>
  );
}

function TrophyIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 18l6-6-6-6"/>
    </svg>
  );
}

function ChevronDownIcon({ rotated }: { rotated?: boolean }) {
  return (
    <svg
      width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      style={{ transition: "transform 0.2s", transform: rotated ? "rotate(180deg)" : "rotate(0deg)" }}
    >
      <path d="M6 9l6 6 6-6"/>
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6L9 17l-5-5"/>
    </svg>
  );
}

function LockIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
    </svg>
  );
}

function CoinsIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="8" cy="8" r="6"/><path d="M18.09 10.37A6 6 0 1 1 10.34 18"/><path d="M7 6h1v4"/><path d="m16.71 13.88.7.71-2.82 2.82"/>
    </svg>
  );
}

function FlagIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/>
    </svg>
  );
}

function AwardIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/>
    </svg>
  );
}

function RefreshIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M8 16H3v5"/>
    </svg>
  );
}

function AlertTriangleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/>
    </svg>
  );
}

function InfoIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>
    </svg>
  );
}

function ChevronUpIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 15l-6-6-6 6"/>
    </svg>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

const PERSONAL_CAP = 20.0;

export function AndroidContestDetail({ onNavigate, userState = "new" }: ContestDetailProps) {
  const [showRulesSheet, setShowRulesSheet] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(userState === "new");
  const [stepsExpanded, setStepsExpanded] = useState(true);

  const isNew = userState === "new";
  const userEarned = isNew ? 0 : 20.0;
  const userEarnedPct = (userEarned / PERSONAL_CAP) * 100;

  const steps = [
    { label: "Location Requirements", sub: "Required for this contest.", done: true, locked: false },
    { label: "Business Associate Agreement", sub: null, done: !isNew, locked: isNew },
    { label: "Instructions — learn how to qualify", sub: null, done: !isNew, locked: isNew },
    { label: "Practice Round — see qualifying in action", sub: null, done: !isNew, locked: isNew },
  ];

  return (
    <div className="flex flex-col h-full" style={{ fontFamily: "'Roboto', system-ui, sans-serif", background: "var(--md-background)" }}>

      {/* Top App Bar */}
      <div className="flex items-center px-1 shrink-0" style={{ height: "64px", background: "var(--md-background)", borderBottom: "1px solid var(--md-outline-variant)" }}>
        <button
          onClick={() => onNavigate("android-compete")}
          className="w-12 h-12 flex items-center justify-center rounded-full"
          style={{ color: "var(--md-on-surface)" }}
        >
          <BackIcon />
        </button>
        <p className="flex-1 text-[22px] font-normal leading-7 ml-4" style={{ color: "var(--md-on-surface)" }}>
          Contest Detail
        </p>
        <button className="w-12 h-12 flex items-center justify-center" style={{ color: "var(--md-on-surface)" }}>
          <BellIcon />
        </button>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto">

        {/* Hero image */}
        <div className="relative shrink-0" style={{ height: "180px", background: "linear-gradient(135deg, #0d4a55 0%, #1a6b7a 100%)" }}>
          <img
            src="https://images.unsplash.com/photo-1576671081837-49000212a370?w=800&q=80"
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.1) 60%, transparent 100%)" }} />
          {/* Earn Mode chip on image */}
          <div className="absolute top-3 left-3 flex items-center gap-1 px-2 rounded-full" style={{ height: "24px", background: "var(--md-secondary)" }}>
            <DollarIcon size={11} />
            <span className="text-[8px] font-medium tracking-[0.5px] text-white">Earn Mode</span>
          </div>
          {/* Title + meta at bottom */}
          <div className="absolute bottom-0 left-0 right-0 px-4 pb-4">
            <p className="text-white font-normal text-[18px] leading-snug">Detect Anomalies in Pathology Slides</p>
            <div className="flex items-center gap-1.5 mt-1" style={{ color: "rgba(255,255,255,0.75)" }}>
              <AlarmIcon />
              <span className="text-[11px] font-medium tracking-[0.5px]">Ends in 1 hour</span>
            </div>
          </div>
        </div>

        {/* ── Earnings card ── */}
        <div className="px-4 pt-4">
          <div
            className="rounded-[20px] overflow-hidden"
            style={{ border: "1px solid var(--md-secondary)", background: "var(--color-secondary-bg)" }}
          >
            {/* Card header */}
            <div className="px-4 pt-4 pb-3">
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                  style={{ background: "var(--color-secondary-bg)", color: "var(--md-secondary)" }}
                >
                  <DollarIcon size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  {isNew ? (
                    <>
                      <p className="text-[16px] font-medium leading-snug" style={{ color: "var(--md-on-surface)" }}>
                        Earn $0.03 per qualified opinion
                      </p>
                      <p className="text-[12px] mt-0.5" style={{ color: "var(--md-on-surface-variant)" }}>
                        Up to ${PERSONAL_CAP.toFixed(2)} for you in this contest
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="text-[16px] font-medium leading-snug" style={{ color: "var(--md-on-surface)" }}>
                        ${userEarned.toFixed(2)} earned in this contest
                      </p>
                      <p className="text-[12px] mt-0.5" style={{ color: "var(--md-on-surface-variant)" }}>
                        You&apos;ve reached your $20.00 cap
                      </p>
                    </>
                  )}
                </div>
              </div>

              {/* Personal cap bar */}
              <div
                className="h-[8px] rounded-full overflow-hidden mb-1.5"
                style={{ background: "var(--color-secondary-bg)" }}
              >
                <div
                  className="h-full rounded-full"
                  style={{ width: `${userEarnedPct || 2}%`, background: "var(--md-secondary)", transition: "width 0.6s ease" }}
                />
              </div>
              <div className="flex justify-between">
                <span className="text-[11px]" style={{ color: "var(--md-on-surface-variant)" }}>
                  {isNew ? "$0" : `$${userEarned.toFixed(2)} earned`}
                </span>
                <span className="text-[11px]" style={{ color: "var(--md-on-surface-variant)" }}>
                  ${PERSONAL_CAP.toFixed(0)} cap
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ── About section ── */}
        <div className="px-4 pt-5">
          <p className="text-[14px] font-medium mb-3" style={{ color: "var(--md-on-surface-variant)", letterSpacing: "0.1px" }}>ABOUT THIS CONTEST</p>

          <div className="rounded-[20px] overflow-hidden" style={{ border: "1px solid #D2C1D4" }}>
            {/* Rules & Prizes */}
            <button
              onClick={() => setShowRulesSheet(true)}
              className="w-full flex items-center gap-3 text-left"
              style={{ padding: "16px" }}
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                style={{ background: "var(--color-secondary-bg)", color: "var(--md-secondary)" }}
              >
                <TrophyIcon />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[16px] font-normal leading-snug" style={{ color: "var(--md-on-surface)" }}>Rules &amp; Prizes</p>
                <p className="text-[12px] mt-0.5" style={{ color: "var(--md-on-surface-variant)" }}>
                  See full contest details, rules, and eligibility.
                </p>
              </div>
              <span style={{ color: "var(--md-outline)" }}><ChevronRightIcon /></span>
            </button>

            <div style={{ height: "1px", background: "var(--md-outline-variant)", marginLeft: "64px" }} />

            {/* Contest info (expandable) */}
            <button
              onClick={() => setStepsExpanded(!stepsExpanded)}
              className="w-full flex items-center gap-3 text-left"
              style={{ padding: "16px" }}
            >
              <div className="flex-1">
                <p className="text-[16px] font-normal" style={{ color: "var(--md-on-surface)" }}>Contest Details</p>
                <p className="text-[12px] mt-0.5" style={{ color: "var(--md-on-surface-variant)" }}>Pathology · Box Segmentation · Individual</p>
              </div>
              <span style={{ color: "var(--md-outline)" }}><ChevronDownIcon rotated={stepsExpanded} /></span>
            </button>

            {stepsExpanded && (
              <div className="px-4 pb-4" style={{ borderTop: "1px solid #D2C1D4" }}>
                <div className="pt-3 flex flex-col gap-2">
                  {[
                    { label: "Mode", value: "Accuracy" },
                    { label: "Team type", value: "Individual" },
                    { label: "Specialty", value: "Pathology" },
                    { label: "Task type", value: "Box Segmentation" },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex justify-between">
                      <span className="text-[13px]" style={{ color: "var(--md-on-surface-variant)" }}>{label}</span>
                      <span className="text-[13px] font-medium" style={{ color: "var(--md-on-surface)" }}>{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ── Steps to start earning ── */}
        {userState !== "post-compete" && (
          <div className="px-4 pt-5">
            <div className="flex items-center justify-between mb-1">
              <p className="text-[14px] font-medium" style={{ color: "var(--md-on-surface-variant)", letterSpacing: "0.1px" }}>STEPS TO START EARNING</p>
              <span className="text-[12px] font-medium" style={{ color: "var(--md-primary-container)" }}>
                {isNew ? "1/4" : "4/4"} done
              </span>
            </div>
            <p className="text-[12px] mb-3" style={{ color: "var(--md-on-surface-variant)" }}>Complete these to unlock your earnings.</p>

            <div className="rounded-[20px] overflow-hidden" style={{ border: "1px solid #D2C1D4" }}>
              {steps.map((step, i) => (
                <div key={i}>
                  {i > 0 && <div style={{ height: "1px", background: "var(--md-outline-variant)", marginLeft: "64px" }} />}
                  <div
                    className="flex items-center gap-3"
                    style={{
                      padding: "14px 16px",
                      background: isNew && i === 1 ? "rgba(141,46,188,0.05)" : "var(--md-background)",
                    }}
                  >
                    {/* Step indicator */}
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-[13px] font-medium"
                      style={
                        step.done
                          ? { background: "var(--color-secondary-bg)", color: "var(--md-secondary)" }
                          : isNew && i === 1
                          ? { background: "var(--md-primary-container)", color: "var(--md-on-primary-container)" }
                          : { background: "var(--md-surface-container)", color: "var(--md-outline)" }
                      }
                    >
                      {step.done ? <CheckIcon /> : i + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p
                        className="text-[14px]"
                        style={{
                          color: step.locked ? "var(--md-outline)" : "var(--md-on-surface)",
                          fontWeight: isNew && i === 1 ? 500 : 400,
                        }}
                      >
                        {step.label}
                      </p>
                      {step.sub && (
                        <p className="text-[12px] mt-0.5" style={{ color: "var(--md-on-surface-variant)" }}>{step.sub}</p>
                      )}
                    </div>
                    <span style={{ color: "var(--md-outline)" }}>
                      {step.locked ? <LockIcon /> : <ChevronRightIcon />}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── CTA ── */}
        <div className="px-4 pt-2 pb-8">
          {userState === "post-compete" ? (
            <button
              onClick={() => onNavigate("android-compete")}
              className="w-full flex items-center justify-center"
              style={{ height: "48px", borderRadius: "100px", background: "var(--md-primary-container)", color: "var(--md-on-primary-container)" }}
            >
              <span className="text-[14px] font-medium tracking-[0.1px]">Browse contests</span>
            </button>
          ) : (
            <button
              onClick={() => onNavigate("android-labeling")}
              className="w-full flex items-center justify-center"
              style={{ height: "48px", borderRadius: "100px", background: "var(--md-primary-container)", color: "var(--md-on-primary-container)" }}
            >
              <span className="text-[14px] font-medium tracking-[0.1px]">Compete</span>
            </button>
          )}
        </div>

      </div>

      {/* ── Rules & Prizes bottom sheet — original app copy ── */}
      {showRulesSheet && (
        <div
          className="absolute inset-0 flex items-end z-50"
          style={{ background: "rgba(0,0,0,0.50)" }}
          onClick={() => setShowRulesSheet(false)}
        >
          <div
            className="w-full px-4 pt-4 pb-10 overflow-y-auto"
            style={{ background: "var(--md-surface-container-low)", borderRadius: "28px 28px 0 0", maxHeight: "88%" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Handle */}
            <div className="w-8 h-1 rounded-full mx-auto mb-4" style={{ background: "var(--md-outline-variant)" }} />
            <h2 className="text-[22px] font-normal mb-5" style={{ color: "var(--md-on-surface)" }}>Rules &amp; Prizes</h2>

            {[
              {
                icon: <DollarIcon size={18} />,
                label: "How to Earn",
                body: "You will be shown a series of cases with answers followed by a mixture of cases with and without answers. If your score on the cases with answers is above a certain threshold, then you will earn whenever you submit an opinion for a case without answers. These earnings will convert to a withdrawable earning shortly after the contest ends.",
              },
              {
                icon: <FlagIcon />,
                label: "Deadline",
                body: "This contest starts Mar 17 at 1:00 PM GMT-7 and ends Mar 17 at 5:00 PM GMT-7.",
              },
              {
                icon: <AwardIcon />,
                label: "Prizes",
                body: "$0.03 per qualifying opinion, up to a maximum of $199.99.",
              },
              {
                icon: <RefreshIcon />,
                label: "Data Quality",
                body: "Some cases may be classified incorrectly. Your feedback helps us improve the dataset over time.",
              },
              {
                icon: <AlertTriangleIcon />,
                label: "Code of Ethics",
                body: "This app depends on your integrity and full effort on every case you see. If we suspect that you are anticipating the cases that will not be scored and making less effort on those cases, you may be suspended or banned. It is against our rules to attempt to identify and avoid difficult cases. You cannot copy data from this app (such as by taking screenshots) in an attempt to reproduce any portion of our datasets.",
              },
              {
                icon: <InfoIcon />,
                label: "Additional Information",
                body: "Apple Inc. is not a sponsor of this contest and is not involved in any way with this contest or any DiagnosUs contest. Additional information about rules can be found in the Profile tab by tapping the settings icon in the top-right corner and then tapping the Legal section from the Settings menu, or at https://assets.diagnosus.com/pdf/legal/contests.pdf.",
              },
              {
                icon: <InfoIcon />,
                label: "Medical Information",
                body: "Consult a physician before making medical decisions. Do not rely on information in this app to make medical decisions. Information in this app is not used to diagnose or treat patients.",
              },
            ].map(({ icon, label, body }, i, arr) => (
              <div key={label}>
                <div className="flex items-center justify-between py-3">
                  <div className="flex items-center gap-3">
                    <span style={{ color: "var(--md-on-surface-variant)" }}>{icon}</span>
                    <p className="text-[16px] font-medium" style={{ color: "var(--md-on-surface)" }}>{label}</p>
                  </div>
                  <span style={{ color: "var(--md-outline)" }}><ChevronUpIcon /></span>
                </div>
                <p className="text-[14px] leading-relaxed pb-3" style={{ color: "var(--md-on-surface-variant)" }}>{body}</p>
                {i < arr.length - 1 && <div style={{ height: "1px", background: "var(--md-outline-variant)" }} />}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── First-entry onboarding sheet ── */}
      {showOnboarding && (
        <div className="absolute inset-0 flex items-end z-50" style={{ background: "rgba(0,0,0,0.50)" }}>
          <div
            className="w-full px-5 pt-4 pb-10"
            style={{ borderRadius: "28px 28px 0 0", background: "var(--md-surface-container-low)" }}
          >
            <div className="w-8 h-1 rounded-full mx-auto mb-5" style={{ background: "var(--md-outline-variant)" }} />
            <div
              className="w-12 h-12 rounded-[16px] flex items-center justify-center mb-4"
              style={{ background: "var(--color-secondary-bg)", color: "var(--md-secondary)" }}
            >
              <CoinsIcon />
            </div>
            <h2 className="text-[22px] font-normal mb-2" style={{ color: "var(--md-on-surface)" }}>Earn Mode</h2>
            <p className="text-[15px] leading-relaxed mb-6" style={{ color: "var(--md-on-surface-variant)" }}>
              Earn $0.03 for every qualified opinion. Your accuracy is tracked across recent opinions. Meet the threshold and you earn. Keep your accuracy up to keep earning.
            </p>
            <button
              onClick={() => setShowOnboarding(false)}
              className="w-full flex items-center justify-center"
              style={{ height: "48px", borderRadius: "100px", background: "var(--md-primary-container)", color: "var(--md-on-primary-container)" }}
            >
              <span className="text-[14px] font-medium tracking-[0.1px]">Got it</span>
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
