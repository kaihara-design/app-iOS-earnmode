"use client";

// Android Earn Mode — Case Result screen (full screen, not sheet)
// A1 decision (2026-03-17): extend existing Case Result with Earn Mode score card variants
// Every Earn Mode case has an inherited score — no contribution/no-score variant
// Variant: "earned" (teal card, score ≥ 70), "not-earned" (error red card, score < 70)

interface CaseResultProps {
  onNavigate: (screen: string) => void;
  variant?: "earned" | "not-earned" | "calibration" | "accuracy-low";
  earnState?: "warmup" | "threshold" | "active";
  warmupRemaining?: number;
  onThresholdComplete?: () => void;
  option?: "A" | "B";
  nextCaseScreen?: string;
}

// ─── Icons ────────────────────────────────────────────────────────────────────

function CloseIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 6L6 18M6 6l12 12"/>
    </svg>
  );
}

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


function SearchIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
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

function InfoIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>
    </svg>
  );
}

function TrendingDownIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 18 13.5 8.5 8.5 13.5 1 6"/><polyline points="17 18 23 18 23 12"/>
    </svg>
  );
}


// ─── Variant config ───────────────────────────────────────────────────────────

const EARNED_SCORE = 74;
const NOT_EARNED_SCORE = 58;
const QUALITY_BAR = 70;
const SESSION_QUALIFIED = 4;

// ─── Component ────────────────────────────────────────────────────────────────

export function AndroidCaseResult({ onNavigate, variant = "earned", earnState = "active", warmupRemaining = 0, onThresholdComplete, option = "A", nextCaseScreen = "android-labeling" }: CaseResultProps) {
  const isEarned = variant === "earned";
  const isNotEarned = variant === "not-earned";
  const isCalibration = variant === "calibration";
  const isAccuracyLow = variant === "accuracy-low";
  const isWarmup = earnState === "warmup";
  const isThreshold = earnState === "threshold";
  const isOptionB = option === "B";

  return (
    <div className="flex flex-col h-full" style={{ fontFamily: "'Roboto', system-ui, sans-serif", background: "var(--md-background)" }}>

      {/* ── Top App Bar ── */}
      <div className="flex items-center px-1 shrink-0" style={{ height: "64px", background: "var(--md-background)" }}>
        <div className="w-12 h-12" />
        <p className="flex-1 text-[22px] font-normal leading-7 ml-4" style={{ color: "var(--md-on-surface)" }}>
          Case Result
        </p>
        <button
          onClick={() => onNavigate(nextCaseScreen)}
          className="w-12 h-12 flex items-center justify-center"
          style={{ color: "var(--md-on-surface)" }}
        >
          <CloseIcon />
        </button>
      </div>

      {/* ── Progress bar ── */}
      <div className="px-4 pb-3 shrink-0">
        <div className="flex justify-between mb-1">
          <span className="text-[12px]" style={{ color: "var(--md-on-surface)" }}>Question 4/5</span>
          <span className="text-[12px]" style={{ color: "var(--md-on-surface-variant)" }}>{SESSION_QUALIFIED} qualified</span>
        </div>
        <div className="h-[11px] rounded-[15px] overflow-hidden" style={{ background: "var(--md-surface-variant)" }}>
          <div
            className="h-[9px] rounded-[15px] mt-px ml-px"
            style={{ width: "calc(80% - 2px)", background: "var(--md-on-surface-variant)" }}
          />
        </div>
      </div>

      {/* ── Scrollable content ── */}
      <div className="flex-1 overflow-y-auto px-4 pb-6">

        {/* ── Score card — warmup, threshold, calibration, accuracy-low, or active variant ── */}
        {isCalibration ? (
          <div className="rounded-[24px] px-5 py-5 mb-4" style={{ background: "var(--md-surface-container)" }}>
            <div className="flex items-start gap-3">
              <div style={{ color: "var(--md-on-surface-variant)", marginTop: "2px" }}>
                <InfoIcon />
              </div>
              <div className="flex-1">
                <p className="font-medium text-[22px] leading-7" style={{ color: "var(--md-on-surface)" }}>
                  Calibration case
                </p>
                <p className="text-[14px] mt-0.5" style={{ color: "var(--md-on-surface-variant)" }}>
                  Doesn&apos;t count toward earnings
                </p>
              </div>
            </div>
          </div>
        ) : isAccuracyLow ? (
          <div className="rounded-[24px] px-5 py-5 mb-4" style={{ background: "var(--md-error)" }}>
            <div className="flex items-start gap-3">
              <div style={{ color: "rgba(255,255,255,0.9)", marginTop: "2px" }}>
                <TrendingDownIcon />
              </div>
              <div className="flex-1">
                <p className="text-white font-medium text-[22px] leading-7">Accuracy below threshold</p>
                {!isOptionB && (
                  <p className="text-[14px] mt-0.5" style={{ color: "rgba(255,255,255,0.85)" }}>
                    {NOT_EARNED_SCORE}% · Earn at {QUALITY_BAR}%
                  </p>
                )}
              </div>
            </div>
          </div>
        ) : (isWarmup || isThreshold) ? (
          <div
            className="rounded-[24px] px-5 py-5 mb-4"
            style={{ background: isThreshold ? "rgba(0,106,101,0.12)" : "var(--md-surface-container)" }}
          >
            <div className="flex items-start gap-3">
              <div style={{ color: isThreshold ? "var(--earn-teal)" : "var(--md-on-surface-variant)", marginTop: "2px" }}>
                {isThreshold ? <CheckCircleIcon /> : <XCircleIcon />}
              </div>
              <div className="flex-1">
                {isThreshold ? (
                  <>
                    <p className="font-medium text-[22px] leading-7" style={{ color: "var(--md-on-surface)" }}>
                      You qualified!
                    </p>
                    <p className="text-[14px] mt-0.5" style={{ color: "var(--md-on-surface-variant)" }}>
                      Qualifying round complete
                    </p>
                  </>
                ) : (
                  <>
                    <p className="font-medium text-[22px] leading-7" style={{ color: "var(--md-on-surface)" }}>
                      Not earning yet
                    </p>
                    <p className="text-[14px] mt-0.5" style={{ color: "var(--md-on-surface-variant)" }}>
                      {warmupRemaining > 5
                        ? `${warmupRemaining} more cases to complete your qualifying round.`
                        : "Just a few more cases to complete your qualifying round."}
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div
            className="rounded-[24px] px-5 py-5 mb-4"
            style={{ background: isEarned ? "var(--md-secondary)" : "var(--md-error)" }}
          >
            <div className="flex items-start gap-3">
              <div style={{ color: "rgba(255,255,255,0.9)", marginTop: "2px" }}>
                {isEarned ? <CheckCircleIcon /> : <XCircleIcon />}
              </div>
              <div className="flex-1">
                {isEarned ? (
                  <>
                    <p className="text-white font-medium text-[22px] leading-7">
                      Earned · +$0.03
                    </p>
                    {!isOptionB && (
                      <p className="text-[14px] mt-0.5" style={{ color: "rgba(255,255,255,0.85)" }}>
                        {EARNED_SCORE}% · Threshold {QUALITY_BAR}%
                      </p>
                    )}
                  </>
                ) : (
                  <>
                    <p className="text-white font-medium text-[22px] leading-7">
                      Not earned this opinion
                    </p>
                    {!isOptionB && (
                      <p className="text-[14px] mt-0.5" style={{ color: "rgba(255,255,255,0.85)" }}>
                        Score: {NOT_EARNED_SCORE} · Below threshold ({QUALITY_BAR})
                      </p>
                    )}
                    <p className="text-[12px] mt-1.5" style={{ color: "rgba(255,255,255,0.70)" }}>
                      More precise annotations = higher score = earnings.
                    </p>
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

        {/* ── Result copy ── */}
        {isThreshold ? (
          <>
            <p className="text-[22px] font-normal mb-1.5 leading-7" style={{ color: "var(--md-on-surface)" }}>
              Your qualifying round is complete.
            </p>
            <p className="text-[14px] leading-relaxed mb-4" style={{ color: "var(--md-on-surface-variant)" }}>
              Every opinion from here earns $0.03. Keep going.
            </p>
          </>
        ) : isWarmup ? (
          <>
            <p className="text-[22px] font-normal mb-1.5 leading-7" style={{ color: "var(--md-on-surface)" }}>
              Thanks! Your response is submitted.
            </p>
            <p className="text-[14px] leading-relaxed mb-4" style={{ color: "var(--md-on-surface-variant)" }}>
              You&apos;re still in your qualifying round. Complete a few more cases to start earning.
            </p>
          </>
        ) : (
          <>
            <p className="text-[22px] font-normal mb-1.5 leading-7" style={{ color: "var(--md-on-surface)" }}>
              Thanks! Your response is submitted!
            </p>
            {isEarned ? (
              <p className="text-[14px] leading-relaxed mb-4" style={{ color: "var(--md-on-surface-variant)" }}>
                {isOptionB
                  ? "Your accuracy across recent opinions qualifies. Keep going."
                  : `Your accuracy across recent opinions is ${EARNED_SCORE}%. Threshold is ${QUALITY_BAR}%.`}
              </p>
            ) : isCalibration ? (
              <p className="text-[14px] leading-relaxed mb-4" style={{ color: "var(--md-on-surface-variant)" }}>
                This case calibrates your accuracy score. It doesn&apos;t count toward earnings.
              </p>
            ) : isAccuracyLow ? (
              <p className="text-[14px] leading-relaxed mb-4" style={{ color: "var(--md-on-surface-variant)" }}>
                {isOptionB
                  ? "Your recent accuracy is too low to earn. Keep labeling to improve."
                  : `Your accuracy average is ${NOT_EARNED_SCORE}%. You need ${QUALITY_BAR}% to earn. Keep labeling to improve.`}
              </p>
            ) : (
              <p className="text-[14px] leading-relaxed mb-4" style={{ color: "var(--md-on-surface-variant)" }}>
                Your score of {NOT_EARNED_SCORE} was {QUALITY_BAR - NOT_EARNED_SCORE} points below the earn threshold. Visit the case to see where you can improve.
              </p>
            )}
          </>
        )}

        {/* Earn Mode tip (Option A, not earned + active only) */}
        {isNotEarned && !isWarmup && !isThreshold && !isCalibration && !isAccuracyLow && !isOptionB && (
          <div
            className="rounded-[16px] px-4 py-3 mb-5"
            style={{ background: "var(--md-error-container)", border: "1px solid var(--md-outline-variant)" }}
          >
            <p className="text-[13px] font-medium mb-1" style={{ color: "var(--md-error)" }}>Tips to improve your score</p>
            <div className="flex flex-col gap-1">
              {[
                "Tight boxes — avoid excess space around the lesion",
                "Catch all visible lesions, even small ones",
                "Avoid marking healthy tissue as lesions",
              ].map((tip) => (
                <p key={tip} className="text-[12px] leading-relaxed" style={{ color: "var(--md-on-surface-variant)" }}>• {tip}</p>
              ))}
            </div>
          </div>
        )}

        {/* Action buttons (active earned/not-earned only) */}
        {!isWarmup && !isThreshold && !isCalibration && !isAccuracyLow && (
          <>
            <div className="mb-3" style={{ height: "1px", background: "var(--md-outline-variant)" }} />
            <div className="flex flex-col gap-2">
            <button
              className="flex items-center justify-between px-4 rounded-full"
              style={{ height: "40px", border: "1px solid var(--md-outline-variant)", color: "var(--md-on-surface)" }}
            >
              <div className="flex items-center gap-2">
                <SearchIcon />
                <span className="text-[14px] font-medium tracking-[0.1px]">Check your answer</span>
              </div>
              <ArrowRightIcon />
            </button>
            <button
              className="flex items-center justify-between px-4 rounded-full"
              style={{ height: "40px", border: "1px solid var(--md-outline-variant)", color: "var(--md-on-surface)" }}
            >
              <div className="flex items-center gap-2">
                <FlagIcon />
                <span className="text-[14px] font-medium tracking-[0.1px]">Flag this case</span>
              </div>
              <ArrowRightIcon />
            </button>
          </div>
          </>
        )}
      </div>

      {/* ── CTA ── */}
      <div
        className="px-4 pb-6 pt-3 shrink-0"
        style={{ borderTop: "1px solid var(--md-outline-variant)", background: "var(--md-background)" }}
      >
        {isThreshold ? (
          <button
            onClick={() => { onThresholdComplete?.(); onNavigate(nextCaseScreen); }}
            className="w-full flex items-center justify-center"
            style={{ height: "48px", borderRadius: "100px", background: "var(--md-primary-container)", color: "var(--md-on-primary-container)" }}
          >
            <span className="text-[16px] font-medium tracking-[0.15px]">Keep going</span>
          </button>
        ) : (
          <button
            onClick={() => onNavigate(nextCaseScreen)}
            className="w-full flex items-center justify-center"
            style={{ height: "48px", borderRadius: "100px", background: "var(--md-primary-container)", color: "var(--md-on-primary-container)" }}
          >
            <span className="text-[16px] font-medium tracking-[0.15px]">
              {isWarmup ? "Next case" : "Next Case"}
            </span>
          </button>
        )}
      </div>
    </div>
  );
}
