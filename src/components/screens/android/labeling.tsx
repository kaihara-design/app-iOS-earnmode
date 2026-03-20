"use client";

import { useState } from "react";

// Android Earn Mode — Labeling (Box Segmentation) screen
// M3 spec: white bg, contained dark image card (#303030, 24dp radius)
// Earn Mode HUD: inline second row beneath progress bar (no card, no border)
// After submit → M3 Modal Bottom Sheet (mirrors iOS approach, no full-page nav)

type FeedbackState = "none" | "earned" | "not-earned" | "calibration" | "warmup" | "threshold";

interface LabelingProps {
  onNavigate: (screen: string) => void;
  initialFeedback?: "earned" | "not-earned" | "calibration" | "warmup" | "threshold";
  initialOption?: "A" | "B";
  initialShowContestEnded?: boolean;
  earnState: "warmup" | "threshold" | "active";
  warmupRemaining: number;
  onWarmupProgress: (remaining: number) => void;
  onThresholdComplete?: () => void;
  onActiveSubmit?: () => void;
  qualifiedCount?: number;
}

const EARNED_SCORE = 74;
const NOT_EARNED_SCORE = 58;
const QUALITY_BAR = 70;

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

// ─── Sheet icons ──────────────────────────────────────────────────────────────

function CheckCircleIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>
    </svg>
  );
}

function XCircleIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><path d="m15 9-6 6M9 9l6 6"/>
    </svg>
  );
}

function InfoIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>
    </svg>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

export function AndroidLabeling({ onNavigate, initialFeedback, initialOption, initialShowContestEnded = false, earnState, warmupRemaining, onWarmupProgress, onThresholdComplete, onActiveSubmit, qualifiedCount = 0 }: LabelingProps) {
  const [mode, setMode] = useState<"draw" | "pan">("draw");
  const [sessionEarnings, setSessionEarnings] = useState(0);
  const [readCount, setReadCount] = useState(0);
  const [activeCount, setActiveCount] = useState(0);
  const [showContestEnded] = useState(initialShowContestEnded);
  const [feedback, setFeedback] = useState<FeedbackState>(initialFeedback ?? "none");
  const [option] = useState<"A" | "B">(initialOption ?? "A");

  const progressPct = (readCount / 5) * 100;
  const isOptionB = option === "B";

  // Warmup subtitle
  const warmupSubtitle = warmupRemaining > 1
    ? `${warmupRemaining} more opinions to qualify.`
    : warmupRemaining === 1
    ? "1 more opinion to qualify."
    : "Just a few more to qualify.";

  function handleSubmitEarned() {
    setReadCount((c) => c + 1);

    if (earnState === "warmup") {
      const next = warmupRemaining - 1;
      onWarmupProgress(next);
      setFeedback(next === 0 ? "threshold" : "warmup");
      return;
    }

    const newActive = activeCount + 1;
    setActiveCount(newActive);
    setSessionEarnings((e) => Math.round((e + 0.03) * 100) / 100);
    onActiveSubmit?.();
    setFeedback("earned");
  }

  function handleNext() {
    if (feedback === "threshold") onThresholdComplete?.();
    setFeedback("none");
    if (activeCount >= 5) onNavigate("android-session-complete");
  }

  const isEarned = feedback === "earned";
  const isNotEarned = feedback === "not-earned";
  const isCalibration = feedback === "calibration";
  const isWarmupFeedback = feedback === "warmup";
  const isThreshold = feedback === "threshold";

  return (
    <div className="flex flex-col h-full" style={{ fontFamily: "'Roboto', system-ui, sans-serif", background: "var(--md-background)" }}>

      {/* ── Top App Bar ── */}
      <div className="flex items-center px-4 shrink-0" style={{ height: "64px", background: "var(--md-background)" }}>
        <p className="flex-1 text-[22px] font-normal leading-7" style={{ color: "var(--md-on-surface)" }}>
          Labeling
        </p>
        <button
          onClick={() => onNavigate("android-contest-detail")}
          className="w-12 h-12 flex items-center justify-center"
          style={{ color: "var(--md-on-surface)" }}
        >
          <CloseIcon />
        </button>
      </div>

      {/* ── Progress + inline Earn Mode HUD ── */}
      <div className="px-4 pb-2 shrink-0">
        {/* Progress row */}
        <div className="flex justify-between mb-1.5">
          <span className="text-[12px]" style={{ color: "var(--md-on-surface)" }}>Question {readCount}/5</span>
        </div>
        <div className="h-1 rounded-full overflow-hidden mb-2" style={{ background: "var(--md-surface-variant)" }}>
          <div
            className="h-full rounded-full transition-all duration-300"
            style={{ width: `${progressPct}%`, background: "var(--md-on-surface-variant)" }}
          />
        </div>

        {/* Earn Mode status — inline, no container */}
        <div className="flex items-center gap-1.5">
          <DollarIcon />
          {earnState === "warmup" ? (
            <span className="text-[12px] font-medium" style={{ color: "var(--md-on-surface-variant)" }}>
              Qualifying · {warmupRemaining} to go
            </span>
          ) : (
            <span key={sessionEarnings} className="text-[14px] font-medium animate-earn-tick" style={{ color: "var(--md-secondary)" }}>
              ${sessionEarnings.toFixed(2)} · {qualifiedCount} qualified
            </span>
          )}
        </div>
      </div>

      {/* ── Image zone — fills all remaining vertical space ── */}
      <div className="flex-1 min-h-0 px-4 pt-1">
        <div
          className="relative overflow-hidden w-full h-full"
          style={{ borderRadius: "24px", background: "#303030" }}
        >
          {/* Medical image */}
          <img
            src="https://images.unsplash.com/photo-1576671081837-49000212a370?w=800&q=80"
            alt=""
            className="w-full h-full object-cover opacity-80"
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
      </div>

      {/* ── Bottom controls panel — sticky below image ── */}
      <div className="shrink-0 px-4 pt-3 pb-5">
        {/* Instruction text */}
        <p
          className="text-center mb-2 text-[16px] leading-snug"
          style={{ color: "var(--md-on-surface)", fontWeight: 500 }}
        >
          Draw a bounding box around all lesions visible in this pathology slide.
        </p>

        {/* Draw / Pan segmented toggle */}
        <div
          className="flex rounded-full mx-auto mb-2.5 p-1"
          style={{ border: "1px solid var(--md-outline-variant)", background: "var(--md-background)", width: "fit-content" }}
        >
          {(["draw", "pan"] as const).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className="flex items-center gap-1.5 px-4 rounded-full"
              style={{
                height: "36px",
                background: mode === m ? "var(--md-surface-container)" : "transparent",
                color: "var(--md-on-surface)",
                transition: "background 0.15s",
              }}
            >
              {m === "draw" ? <PencilIcon /> : <MoveIcon />}
              <span className="text-[14px] font-medium capitalize tracking-[0.1px]">{m}</span>
            </button>
          ))}
        </div>

        {/* Utility row + submit */}
        <div className="flex items-center gap-2">
          <button
            className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
            style={{ border: "1px solid var(--md-outline-variant)", color: "var(--md-on-surface-variant)" }}
          >
            <CommentIcon />
          </button>
          <button
            className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
            style={{ border: "1px solid var(--md-outline-variant)", color: "var(--md-on-surface-variant)" }}
          >
            <FlagIcon />
          </button>

          {/* Submit button */}
          <button
            onClick={handleSubmitEarned}
            className="flex-1 flex items-center justify-center ml-1 rounded-full"
            style={{
              height: "40px",
              background: "var(--md-primary-container)",
              color: "var(--md-on-primary-container)",
              fontSize: "14px",
              fontWeight: 500,
            }}
          >
            Submit
          </button>
        </div>
      </div>

      {/* ── M3 Modal Bottom Sheet ── */}
      {feedback !== "none" && !showContestEnded && (
        <>
          {/* Scrim */}
          <div
            className="absolute inset-0 z-20"
            style={{ background: "rgba(0,0,0,0.32)" }}
            onClick={handleNext}
          />
          {/* Sheet */}
          <div
            className="absolute bottom-0 left-0 right-0 animate-sheet-up z-30 px-5 pt-3 pb-8 overflow-y-auto"
            style={{ background: "var(--md-background)", borderRadius: "28px 28px 0 0", maxHeight: "75%" }}
          >
            {/* Drag handle */}
            <div className="w-[24px] h-[4px] rounded-full mx-auto mb-5" style={{ background: "var(--md-on-surface-variant)" }} />

            {/* ── Score card ── */}
            {isCalibration ? (
              <div className="rounded-[16px] px-5 py-5 mb-4" style={{ background: "var(--md-surface-container)" }}>
                <div className="flex items-start gap-3">
                  <div style={{ color: "var(--md-on-surface-variant)", marginTop: "2px" }}>
                    <InfoIcon />
                  </div>
                  <div className="flex-1">
                    <p className="font-normal text-[22px] leading-7" style={{ color: "var(--md-on-surface)" }}>
                      Calibration case
                    </p>
                    <p className="text-[14px] leading-5 mt-1" style={{ color: "var(--md-on-surface-variant)" }}>
                      This case calibrates your accuracy score. It doesn&apos;t count toward earnings.
                    </p>
                  </div>
                </div>
              </div>
            ) : (isWarmupFeedback || isThreshold) ? (
              <div
                className="rounded-[16px] px-5 py-5 mb-4"
                style={{ background: isThreshold ? "var(--color-secondary-bg)" : "var(--md-surface-container)" }}
              >
                <div className="flex items-start gap-3">
                  <div style={{ color: isThreshold ? "var(--earn-teal)" : "var(--md-on-surface-variant)", marginTop: "2px" }}>
                    {isThreshold ? <CheckCircleIcon /> : <XCircleIcon />}
                  </div>
                  <div className="flex-1">
                    {isThreshold ? (
                      <>
                        <p className="font-normal text-[22px] leading-7" style={{ color: "var(--md-on-surface)" }}>
                          You qualified!
                        </p>
                        <p className="text-[14px] leading-5 mt-1" style={{ color: "var(--md-on-surface-variant)" }}>
                          Qualifying round complete
                        </p>
                      </>
                    ) : (
                      <>
                        <p className="font-normal text-[22px] leading-7" style={{ color: "var(--md-on-surface)" }}>
                          Qualifying
                        </p>
                        <p className="text-[14px] leading-5 mt-1" style={{ color: "var(--md-on-surface-variant)" }}>
                          {warmupSubtitle}
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div
                className="rounded-[16px] px-5 py-5 mb-4"
                style={{ background: isEarned ? "var(--md-secondary)" : "var(--md-error)" }}
              >
                <div className="flex items-start gap-3">
                  <div style={{ color: "rgba(255,255,255,0.9)", marginTop: "2px" }}>
                    {isEarned ? <CheckCircleIcon /> : <XCircleIcon />}
                  </div>
                  <div className="flex-1">
                    {isEarned ? (
                      <>
                        <p className="text-white font-normal text-[22px] leading-7">
                          Earned · +$0.03
                        </p>
                        {!isOptionB ? (
                          <p className="text-[14px] leading-5 mt-1" style={{ color: "rgba(255,255,255,0.85)" }}>
                            Accuracy {EARNED_SCORE}%. Threshold {QUALITY_BAR}%.
                          </p>
                        ) : (
                          <p className="text-[14px] leading-5 mt-1" style={{ color: "rgba(255,255,255,0.85)" }}>
                            Your accuracy qualifies. Keep going.
                          </p>
                        )}
                      </>
                    ) : (
                      <>
                        <p className="text-white font-normal text-[22px] leading-7">
                          Didn&apos;t earn this opinion
                        </p>
                        {!isOptionB ? (
                          <p className="text-[14px] leading-5 mt-1" style={{ color: "rgba(255,255,255,0.85)" }}>
                            Accuracy {NOT_EARNED_SCORE}%. Threshold is {QUALITY_BAR}%.
                          </p>
                        ) : (
                          <p className="text-[14px] leading-5 mt-1" style={{ color: "rgba(255,255,255,0.85)" }}>
                            Your recent accuracy is too low to earn. Keep labeling to improve.
                          </p>
                        )}
                      </>
                    )}
                  </div>
                </div>

                {/* Score bar (Option A not-earned only) */}
                {isNotEarned && !isOptionB && (
                  <div className="mt-4">
                    <div className="relative h-2 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.20)" }}>
                      <div className="absolute left-0 top-0 h-full rounded-l-full" style={{ width: "70%", background: "rgba(255,255,255,0.15)" }} />
                      <div className="absolute top-0 h-full rounded-r-full" style={{ left: "70%", right: 0, background: "rgba(255,255,255,0.35)" }} />
                      <div className="absolute top-0 h-full w-[2px]" style={{ left: "70%", background: "white" }} />
                      <div
                        className="absolute top-1/2 w-3 h-3 rounded-full border-2 border-white -translate-y-1/2 -translate-x-1/2"
                        style={{ left: `${NOT_EARNED_SCORE}%`, background: "var(--md-error)" }}
                      />
                    </div>
                    <div className="flex justify-between mt-1">
                      <span className="text-[11px]" style={{ color: "rgba(255,255,255,0.60)" }}>0</span>
                      <span className="text-[11px] font-medium" style={{ color: "rgba(255,255,255,0.85)", marginLeft: "calc(70% - 16px)" }}>70</span>
                      <span className="text-[11px]" style={{ color: "rgba(255,255,255,0.60)" }}>100</span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ── Body copy ── */}
            {isThreshold ? (
              <p className="text-[14px] leading-relaxed mb-4" style={{ color: "var(--md-on-surface-variant)" }}>
                Your accuracy baseline is set. Every opinion that meets the threshold earns $0.03.
              </p>
            ) : isWarmupFeedback ? (
              <p className="text-[14px] leading-relaxed mb-4" style={{ color: "var(--md-on-surface-variant)" }}>
                Complete your 5 qualifying opinions to set your accuracy baseline. Earnings start after you qualify.
              </p>
            ) : isEarned && !isOptionB ? (
              <p className="text-[14px] leading-relaxed mb-4" style={{ color: "var(--md-on-surface-variant)" }}>
                You&apos;re above the accuracy threshold across your recent opinions. Keep going to keep earning.
              </p>
            ) : isNotEarned && !isOptionB ? (
              <p className="text-[14px] leading-relaxed mb-4" style={{ color: "var(--md-on-surface-variant)" }}>
                Your accuracy across recent opinions is {NOT_EARNED_SCORE}%. The threshold is {QUALITY_BAR}%. Every opinion updates your score. Keep labeling to improve.
              </p>
            ) : null}

            {/* ── Tips (not-earned Option A, active only) ── */}
            {isNotEarned && !isOptionB && (
              <div
                className="rounded-[16px] px-4 py-3 mb-5"
                style={{ background: "var(--md-error-container)", border: "1px solid var(--md-outline-variant)" }}
              >
                <p className="text-[13px] font-medium mb-1.5" style={{ color: "var(--md-error)" }}>Tips to improve your score</p>
                <div className="flex flex-col gap-1.5">
                  {[
                    "Draw tight boxes. Avoid excess space around the lesion.",
                    "Catch all visible lesions, even small ones.",
                    "Avoid marking healthy tissue as lesions.",
                  ].map((tip) => (
                    <p key={tip} className="text-[12px] leading-relaxed" style={{ color: "var(--md-on-surface-variant)" }}>• {tip}</p>
                  ))}
                </div>
              </div>
            )}

            {/* ── CTA ── */}
            <button
              onClick={handleNext}
              className="w-full flex items-center justify-center"
              style={{
                height: "48px",
                borderRadius: "100px",
                background: "var(--md-primary-container)",
                color: "var(--md-on-primary-container)",
              }}
            >
              <span className="text-[16px] font-medium tracking-[0.15px]">
                {isThreshold ? "Keep going" : "Next case"}
              </span>
            </button>
          </div>
        </>
      )}

      {/* ── Contest ended full screen ── */}
      {showContestEnded && (
        <div
          className="absolute inset-0 flex flex-col px-6 pt-16 pb-10 z-50"
          style={{ background: "var(--md-background)", fontFamily: "'Roboto', system-ui, sans-serif" }}
        >
          <div
            className="w-12 h-12 rounded-[16px] flex items-center justify-center mb-5"
            style={{ background: "var(--color-secondary-bg)", color: "var(--md-secondary)" }}
          >
            <DollarIcon />
          </div>

          <h2 className="text-[28px] font-normal mb-3 leading-9" style={{ color: "var(--md-on-surface)" }}>
            This contest has ended
          </h2>
          <p className="text-[15px] leading-relaxed mb-5" style={{ color: "var(--md-on-surface-variant)" }}>
            The prize pool was claimed while you were labeling. Your earnings in this contest are safe.
          </p>

          {/* Earnings summary */}
          <div
            className="rounded-[16px] px-4 py-3 mb-auto"
            style={{ background: "var(--color-secondary-bg)", border: "1px solid var(--md-secondary)" }}
          >
            <p className="text-[16px] font-medium" style={{ color: "var(--md-secondary)" }}>
              ${sessionEarnings.toFixed(2)} earned in this contest
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-2 mt-6">
            <button
              onClick={() => onNavigate("android-contest-detail")}
              className="w-full flex items-center justify-center rounded-full"
              style={{ height: "48px", background: "var(--md-primary-container)", color: "var(--md-on-primary-container)", fontSize: "14px", fontWeight: 500 }}
            >
              View my earnings
            </button>
            <button
              onClick={() => onNavigate("android-compete")}
              className="w-full flex items-center justify-center rounded-full"
              style={{ height: "48px", border: "1px solid var(--md-primary-container)", color: "var(--md-primary-container)", fontSize: "14px", fontWeight: 500 }}
            >
              Browse more contests
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
