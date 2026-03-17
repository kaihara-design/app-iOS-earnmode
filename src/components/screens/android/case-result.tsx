"use client";

// Android Earn Mode — Case Result screen (full screen, not sheet)
// A1 decision (2026-03-17): extend existing Case Result with Earn Mode score card variants
// Every Earn Mode case has an inherited score — no contribution/no-score variant
// Variant: "earned" (teal card, score ≥ 70), "not-earned" (error red card, score < 70)

interface CaseResultProps {
  onNavigate: (screen: string) => void;
  variant?: "earned" | "not-earned";
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


// ─── Variant config ───────────────────────────────────────────────────────────

const EARNED_SCORE = 74;
const NOT_EARNED_SCORE = 58;
const QUALITY_BAR = 70;
const SESSION_EARNINGS = 0.12;
const SESSION_QUALIFIED = 4;

// ─── Component ────────────────────────────────────────────────────────────────

export function AndroidCaseResult({ onNavigate, variant = "earned" }: CaseResultProps) {
  const isEarned = variant === "earned";
  const isNotEarned = variant === "not-earned";

  return (
    <div className="flex flex-col h-full" style={{ fontFamily: "'Roboto', system-ui, sans-serif", background: "white" }}>

      {/* ── Top App Bar ── */}
      <div className="flex items-center px-1 shrink-0" style={{ height: "64px", background: "white" }}>
        <div className="w-12 h-12" />
        <p className="flex-1 text-[22px] font-normal leading-7 ml-1" style={{ color: "#201922" }}>
          Case Result
        </p>
        <button
          onClick={() => onNavigate("android-labeling")}
          className="w-12 h-12 flex items-center justify-center"
          style={{ color: "#201922" }}
        >
          <CloseIcon />
        </button>
      </div>

      {/* ── Progress bar ── */}
      <div className="px-4 pb-3 shrink-0">
        <div className="flex justify-between mb-1">
          <span className="text-[12px]" style={{ color: "#201922" }}>Question 4/5</span>
          <span className="text-[12px]" style={{ color: "#4E4352" }}>{SESSION_QUALIFIED} qualified</span>
        </div>
        <div className="h-[11px] rounded-[15px] overflow-hidden" style={{ background: "#EEDDF0" }}>
          <div
            className="h-[9px] rounded-[15px] mt-px ml-px"
            style={{ width: "calc(80% - 2px)", background: "#4E4352" }}
          />
        </div>
      </div>

      {/* ── Scrollable content ── */}
      <div className="flex-1 overflow-y-auto px-4 pb-6">

        {/* ── Score card ── */}
        <div
          className="rounded-[24px] px-5 py-5 mb-5"
          style={{
            background: isEarned ? "#006A65" : "#B3261E",
          }}
        >
            <div className="flex items-start gap-3">
              {/* Icon */}
              <div style={{ color: "rgba(255,255,255,0.9)", marginTop: "2px" }}>
                {isEarned ? <CheckCircleIcon /> : <XCircleIcon />}
              </div>
              <div className="flex-1">
                {isEarned ? (
                  <>
                    <p className="text-white font-medium text-[22px] leading-7">
                      Earned · +$0.03
                    </p>
                    <p className="text-[14px] mt-0.5" style={{ color: "rgba(255,255,255,0.85)" }}>
                      Score: {EARNED_SCORE} · Qualified read
                    </p>
                    <p className="text-[12px] mt-1.5" style={{ color: "rgba(255,255,255,0.70)" }}>
                      Session total: ${SESSION_EARNINGS.toFixed(2)} earned · {SESSION_QUALIFIED} qualified
                    </p>
                  </>
                ) : (
                  <>
                    <p className="text-white font-medium text-[22px] leading-7">
                      Not earned this read
                    </p>
                    <p className="text-[14px] mt-0.5" style={{ color: "rgba(255,255,255,0.85)" }}>
                      Score: {NOT_EARNED_SCORE} · Below threshold ({QUALITY_BAR})
                    </p>
                    <p className="text-[12px] mt-1.5" style={{ color: "rgba(255,255,255,0.70)" }}>
                      More precise annotations = higher score = earnings.
                    </p>
                  </>
                )}
              </div>
            </div>

            {/* Score bar (not-earned only — shows where you landed) */}
            {isNotEarned && (
              <div className="mt-4">
                <div className="relative h-2 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.20)" }}>
                  {/* Not-earned zone */}
                  <div className="absolute left-0 top-0 h-full rounded-l-full" style={{ width: "70%", background: "rgba(255,255,255,0.15)" }} />
                  {/* Earned zone */}
                  <div className="absolute top-0 h-full rounded-r-full" style={{ left: "70%", right: 0, background: "rgba(255,255,255,0.35)" }} />
                  {/* Threshold line */}
                  <div className="absolute top-0 h-full w-[2px]" style={{ left: "70%", background: "white" }} />
                  {/* Score marker */}
                  <div
                    className="absolute top-1/2 w-3 h-3 rounded-full border-2 border-white -translate-y-1/2 -translate-x-1/2"
                    style={{ left: `${NOT_EARNED_SCORE}%`, background: "#B3261E" }}
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

        {/* ── Standard result copy ── */}
        <p className="text-[22px] font-normal mb-2 leading-7" style={{ color: "#201922" }}>
          Thanks! Your response is submitted!
        </p>

        {isEarned ? (
          <p className="text-[14px] leading-relaxed mb-5" style={{ color: "#4E4352" }}>
            Your annotation hit the quality threshold. Visit the case again to see the expert reference response.
          </p>
        ) : (
          <p className="text-[14px] leading-relaxed mb-5" style={{ color: "#4E4352" }}>
            Your score of {NOT_EARNED_SCORE} was {QUALITY_BAR - NOT_EARNED_SCORE} points below the earn threshold. Visit the case to see where you can improve.
          </p>
        )}

        {/* Earn Mode tip (not earned only) */}
        {isNotEarned && (
          <div
            className="rounded-[16px] px-4 py-3 mb-5"
            style={{ background: "#FFF8F7", border: "1px solid #F2B8B5" }}
          >
            <p className="text-[13px] font-medium mb-1" style={{ color: "#B3261E" }}>Tips to improve your score</p>
            <div className="flex flex-col gap-1">
              {[
                "Tight boxes — avoid excess space around the lesion",
                "Catch all visible lesions, even small ones",
                "Avoid marking healthy tissue as lesions",
              ].map((tip) => (
                <p key={tip} className="text-[12px] leading-relaxed" style={{ color: "#4E4352" }}>• {tip}</p>
              ))}
            </div>
          </div>
        )}

        {/* Action buttons */}
        <div className="flex flex-col gap-2">
          <button
            className="flex items-center justify-center gap-2 rounded-full"
            style={{ height: "40px", border: "1px solid #D2C1D4", color: "#201922" }}
          >
            <SearchIcon />
            <span className="text-[14px] font-medium tracking-[0.1px]">Check your answer</span>
            <ArrowRightIcon />
          </button>
          <button
            className="flex items-center justify-center gap-2 rounded-full"
            style={{ height: "40px", border: "1px solid #D2C1D4", color: "#201922" }}
          >
            <FlagIcon />
            <span className="text-[14px] font-medium tracking-[0.1px]">Flag this case</span>
            <ArrowRightIcon />
          </button>
        </div>
      </div>

      {/* ── Next Case CTA ── */}
      <div
        className="px-4 pb-6 pt-3 shrink-0"
        style={{ borderTop: "1px solid #f0e8f0", background: "white" }}
      >
        <button
          onClick={() => onNavigate("android-labeling")}
          className="w-full flex items-center justify-center"
          style={{ height: "48px", borderRadius: "100px", background: "#8D2EBC", color: "white" }}
        >
          <span className="text-[16px] font-medium tracking-[0.15px]">Next Case</span>
        </button>
      </div>
    </div>
  );
}
