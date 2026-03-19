"use client";

import { useState } from "react";
import { Moon, Sun } from "lucide-react";
import { AndroidPhoneFrame } from "@/components/android-phone-frame";
import { AndroidCompete } from "@/components/screens/android/compete";
import { AndroidContestDetail } from "@/components/screens/android/contest-detail";
import { AndroidLabeling } from "@/components/screens/android/labeling";
import { AndroidCaseResult } from "@/components/screens/android/case-result";
import { AndroidSessionComplete } from "@/components/screens/android/session-complete";

type AndroidScreen =
  | "android-compete"
  | "android-contest-detail"
  | "android-labeling"
  | "android-case-result-earned"
  | "android-case-result-not-earned"
  | "android-feedback-a-earned"
  | "android-feedback-b-earned"
  | "android-feedback-calibration"
  | "android-feedback-a-accuracy-low"
  | "android-feedback-b-accuracy-low"
  | "android-contest-ended"
  | "android-session-complete"
  | "android-max-earned";

const SCREEN_LABELS: Record<AndroidScreen, string> = {
  "android-compete": "Contest Browse",
  "android-contest-detail": "Contest Detail",
  "android-labeling": "Labeling",
  "android-case-result-earned": "Case Result — Earned",
  "android-case-result-not-earned": "Case Result — Not Earned",
  "android-feedback-a-earned": "Earned — A",
  "android-feedback-b-earned": "Earned — B",
  "android-feedback-calibration": "Calibration Case",
  "android-feedback-a-accuracy-low": "Accuracy Too Low — A",
  "android-feedback-b-accuracy-low": "Accuracy Too Low — B",
  "android-contest-ended": "Contest Ended — mid-session",
  "android-session-complete": "Session Complete",
  "android-max-earned": "Max Earned",
};

// Sidebar screens only (case-result-earned/not-earned are in-flow only)
const SIDEBAR_HAPPY: AndroidScreen[] = [
  "android-compete",
  "android-contest-detail",
  "android-labeling",
  "android-feedback-a-earned",
  "android-feedback-b-earned",
  "android-feedback-calibration",
  "android-feedback-a-accuracy-low",
  "android-feedback-b-accuracy-low",
  "android-session-complete",
];

const SIDEBAR_ENDINGS: AndroidScreen[] = [
  "android-max-earned",
  "android-contest-ended",
];

const ALL_SCREENS: AndroidScreen[] = [
  ...SIDEBAR_HAPPY,
  ...SIDEBAR_ENDINGS,
  // in-flow only (URL param support)
  "android-case-result-earned",
  "android-case-result-not-earned",
];

function PlaceholderScreen({ label }: { label: string }) {
  return (
    <div
      className="flex flex-col items-center justify-center h-full gap-3"
      style={{ fontFamily: "'Roboto', system-ui, sans-serif", background: "white" }}
    >
      <div
        className="w-12 h-12 rounded-full flex items-center justify-center"
        style={{ background: "rgba(56,220,209,0.10)" }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#006A65" strokeWidth="2">
          <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M12 8v8M8 12h8"/>
        </svg>
      </div>
      <p className="text-[16px] font-medium text-center px-8" style={{ color: "#201922" }}>
        {label}
      </p>
      <p className="text-[12px] text-center px-8" style={{ color: "#4e4352" }}>
        Coming soon — screen in design
      </p>
    </div>
  );
}

function getInitialScreen(): AndroidScreen {
  if (typeof window !== "undefined") {
    const params = new URLSearchParams(window.location.search);
    const s = params.get("screen") as AndroidScreen;
    if (s && ALL_SCREENS.includes(s)) return s;
  }
  return "android-compete";
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[9px] font-bold uppercase tracking-widest mt-4 mb-1 px-1" style={{ color: "#aaa" }}>
      {children}
    </p>
  );
}

function NavBtn({
  s,
  label,
  current,
  onClick,
}: {
  s: AndroidScreen;
  label: string;
  current: AndroidScreen;
  onClick: (s: AndroidScreen) => void;
}) {
  return (
    <button
      onClick={() => onClick(s)}
      className="text-left px-3 py-2 rounded-lg text-[12px] font-medium transition-colors"
      style={
        current === s
          ? { background: "rgba(56,220,209,0.10)", color: "#006A65", fontWeight: 700 }
          : { color: "#555" }
      }
    >
      {label}
    </button>
  );
}

const WARMUP_TOTAL = 3; // prototype; real app = 10–25 from topic config

export default function AndroidPage() {
  const [screen, setScreen] = useState<AndroidScreen>(getInitialScreen);
  const [darkMode, setDarkMode] = useState(false);
  const [earnState, setEarnState] = useState<"warmup" | "threshold" | "active">("warmup");
  const [warmupRemaining, setWarmupRemaining] = useState(WARMUP_TOTAL);
  const [activeCount, setActiveCount] = useState(0);

  const sidebarScreens = [...SIDEBAR_HAPPY, ...SIDEBAR_ENDINGS];
  const currentIndex = sidebarScreens.indexOf(screen);

  function nav(s: string) {
    setScreen(s as AndroidScreen);
  }

  function renderScreen() {
    switch (screen) {
      case "android-compete":
        return <AndroidCompete onNavigate={nav} />;
      case "android-contest-detail":
        return <AndroidContestDetail onNavigate={nav} />;
      case "android-labeling":
        return (
          <AndroidLabeling
            onNavigate={nav}
            earnState={earnState}
            warmupRemaining={warmupRemaining}
            onWarmupProgress={(remaining) => {
              setWarmupRemaining(remaining);
              if (remaining === 0) setEarnState("threshold");
            }}
            onActiveSubmit={() => setActiveCount((c) => c + 1)}
            qualifiedCount={activeCount}
          />
        );
      case "android-feedback-calibration":
        return (
          <AndroidCaseResult
            onNavigate={nav}
            variant="calibration"
            earnState="active"
            warmupRemaining={0}
            onThresholdComplete={() => {}}
          />
        );
      case "android-feedback-a-accuracy-low":
        return (
          <AndroidCaseResult
            onNavigate={nav}
            variant="accuracy-low"
            option="A"
            earnState="active"
            warmupRemaining={0}
            onThresholdComplete={() => {}}
          />
        );
      case "android-feedback-b-accuracy-low":
        return (
          <AndroidCaseResult
            onNavigate={nav}
            variant="accuracy-low"
            option="B"
            earnState="active"
            warmupRemaining={0}
            onThresholdComplete={() => {}}
          />
        );
      case "android-contest-ended":
        return (
          <AndroidLabeling
            onNavigate={nav}
            initialShowContestEnded={true}
            earnState={earnState}
            warmupRemaining={warmupRemaining}
            onWarmupProgress={(remaining) => {
              setWarmupRemaining(remaining);
              if (remaining === 0) setEarnState("threshold");
            }}
          />
        );
      case "android-case-result-earned":
        return (
          <AndroidCaseResult
            onNavigate={nav}
            variant="earned"
            earnState={earnState}
            warmupRemaining={warmupRemaining}
            onThresholdComplete={() => setEarnState("active")}
            nextCaseScreen={activeCount >= 5 ? "android-session-complete" : "android-labeling"}
          />
        );
      case "android-case-result-not-earned":
        return (
          <AndroidCaseResult
            onNavigate={nav}
            variant="not-earned"
            earnState={earnState}
            warmupRemaining={warmupRemaining}
            onThresholdComplete={() => setEarnState("active")}
            nextCaseScreen={activeCount >= 5 ? "android-session-complete" : "android-labeling"}
          />
        );
      case "android-feedback-a-earned":
        return (
          <AndroidCaseResult
            onNavigate={nav}
            variant="earned"
            option="A"
            earnState="active"
            warmupRemaining={0}
            onThresholdComplete={() => {}}
          />
        );
      case "android-feedback-b-earned":
        return (
          <AndroidCaseResult
            onNavigate={nav}
            variant="earned"
            option="B"
            earnState="active"
            warmupRemaining={0}
            onThresholdComplete={() => {}}
          />
        );
      case "android-session-complete":
        return <AndroidSessionComplete onNavigate={nav} variant="session" />;
      case "android-max-earned":
        return <AndroidSessionComplete onNavigate={nav} variant="max" />;
      default:
        return <PlaceholderScreen label={SCREEN_LABELS[screen]} />;
    }
  }

  return (
    <main className={`android-screen${darkMode ? " android-dark" : ""} min-h-screen flex`} style={{ background: "#f0f0f0" }}>
      {/* Sidebar */}
      <aside
        className="w-56 flex-shrink-0 p-4 flex flex-col border-r overflow-y-auto"
        style={{ background: "white", borderColor: "#e0e0e0" }}
      >
        {/* Header */}
        <div className="mb-3 mt-1">
          <div className="flex items-center justify-between">
            <p className="text-[11px] font-bold uppercase tracking-widest" style={{ color: "#999" }}>
              Earn Mode — Android
            </p>
            <button
              onClick={() => setDarkMode((d) => !d)}
              className="w-7 h-7 rounded-full flex items-center justify-center transition-colors"
              style={{ background: darkMode ? "#1c1c1e" : "#f2f2f7", color: darkMode ? "#5DF6EB" : "#555" }}
              title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {darkMode ? <Sun size={13} /> : <Moon size={13} />}
            </button>
          </div>
          <p className="text-[10px] mt-1" style={{ color: "#bbb" }}>
            Material Design 3 · Roboto
          </p>
        </div>

        {/* ── Happy Path ── */}
        <SectionLabel>Happy Path</SectionLabel>
        {SIDEBAR_HAPPY.map((s) => (
          <NavBtn key={s} s={s} label={SCREEN_LABELS[s]} current={screen} onClick={nav} />
        ))}

        {/* ── Other Endings ── */}
        <SectionLabel>Other Endings</SectionLabel>
        {SIDEBAR_ENDINGS.map((s) => (
          <NavBtn key={s} s={s} label={SCREEN_LABELS[s]} current={screen} onClick={nav} />
        ))}

        {/* Nav links */}
        <div className="mt-4 pt-4 border-t flex flex-col gap-1" style={{ borderColor: "#eee" }}>
          <a
            href="/"
            className="block px-3 py-2 rounded-lg text-[12px] font-medium"
            style={{ color: "#555", textDecoration: "none" }}
          >
            ← iOS Mockup
          </a>
        </div>
      </aside>

      {/* Main area */}
      <div className="flex-1 flex flex-col items-center justify-center py-10 px-6">
        <div className="mb-4 text-center">
          <p className="text-[13px] font-semibold" style={{ color: "#444" }}>
            {SCREEN_LABELS[screen]}
          </p>
          <p className="text-[11px] mt-0.5" style={{ color: "#aaa" }}>
            Android · Material Design 3
          </p>
        </div>

        <AndroidPhoneFrame>
          <div key={screen} className="animate-screen-in h-full">
            {renderScreen()}
          </div>
        </AndroidPhoneFrame>

        <div className="mt-5 flex items-center gap-4">
          <button
            onClick={() => nav(sidebarScreens[currentIndex - 1])}
            disabled={currentIndex <= 0}
            className="px-4 py-2 rounded-lg text-[13px] font-medium border transition-colors disabled:opacity-30"
            style={{ background: "white", borderColor: "#ddd", color: "#333" }}
          >
            ← Prev
          </button>
          <span className="text-[12px]" style={{ color: "#aaa" }}>
            {Math.max(currentIndex + 1, 1)} / {sidebarScreens.length}
          </span>
          <button
            onClick={() => nav(sidebarScreens[currentIndex + 1])}
            disabled={currentIndex >= sidebarScreens.length - 1}
            className="px-4 py-2 rounded-lg text-[13px] font-medium border transition-colors disabled:opacity-30"
            style={{ background: "white", borderColor: "#ddd", color: "#333" }}
          >
            Next →
          </button>
        </div>
      </div>
    </main>
  );
}
