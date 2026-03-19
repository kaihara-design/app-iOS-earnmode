"use client";

import { useState } from "react";
import { Moon, Sun } from "lucide-react";
import { PhoneFrame } from "@/components/phone-frame";
import { ContestBrowse } from "@/components/screens/ios/contest-browse";
import { ContestDetail } from "@/components/screens/ios/contest-detail";
import { LabelingOptionA } from "@/components/screens/ios/labeling-option-a";
import { LabelingOptionB } from "@/components/screens/ios/labeling-option-b";
import { ContestComplete } from "@/components/screens/ios/contest-complete";
import { ContestCompleteConfetti } from "@/components/screens/ios/contest-complete-confetti";

type Screen =
  | "contest-browse"
  | "contest-detail-new"
  | "labeling"
  | "feedback-a-pass"
  | "feedback-a-fail"
  | "feedback-b-pass"
  | "feedback-b-fail"
  | "session-complete"
  | "max-earned"
  | "contest-ended"
  | "contest-detail-post-compete";

const SCREEN_LABELS: Record<Screen, string> = {
  "contest-browse": "Contest Browse",
  "contest-detail-new": "Contest Detail — New",
  "labeling": "Labeling",
  "feedback-a-pass": "Score Feedback — A · Passed",
  "feedback-a-fail": "Score Feedback — A · Failed",
  "feedback-b-pass": "Score Feedback — B · Passed",
  "feedback-b-fail": "Score Feedback — B · Failed",
  "session-complete": "Session Complete",
  "max-earned": "Max Earned",
  "contest-ended": "Contest Ended — mid-session",
  "contest-detail-post-compete": "Contest Detail — Post-Compete",
};

const ALL_SCREENS: Screen[] = [
  "contest-browse",
  "contest-detail-new",
  "labeling",
  "feedback-a-pass",
  "feedback-a-fail",
  "feedback-b-pass",
  "feedback-b-fail",
  "session-complete",
  "max-earned",
  "contest-ended",
  "contest-detail-post-compete",
];

const WARMUP_TOTAL = 3;

function getInitialScreen(): Screen {
  if (typeof window !== "undefined") {
    const params = new URLSearchParams(window.location.search);
    const s = params.get("screen") as Screen;
    if (s && ALL_SCREENS.includes(s)) return s;
  }
  return "contest-browse";
}

function getSheetParam(): string | null {
  if (typeof window !== "undefined") {
    return new URLSearchParams(window.location.search).get("sheet");
  }
  return null;
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
  s: Screen;
  label: string;
  current: Screen;
  onClick: (s: Screen) => void;
}) {
  return (
    <button
      onClick={() => onClick(s)}
      className="text-left px-3 py-2 rounded-lg text-[12px] font-medium transition-colors"
      style={
        current === s
          ? { background: "var(--earn-teal-10)", color: "var(--earn-teal)", fontWeight: 700 }
          : { color: "#555" }
      }
    >
      {label}
    </button>
  );
}

export default function Home() {
  const [screen, setScreen] = useState<Screen>(getInitialScreen);
  const [darkMode, setDarkMode] = useState(false);
  const [earnState, setEarnState] = useState<"warmup" | "threshold" | "active">("warmup");
  const [warmupRemaining, setWarmupRemaining] = useState(WARMUP_TOTAL);
  const sheet = getSheetParam();

  function nav(s: string) {
    const isLabelingRelated = s === "labeling" || s.startsWith("feedback-");
    if (!isLabelingRelated) {
      setEarnState("warmup");
      setWarmupRemaining(WARMUP_TOTAL);
    }
    setScreen(s as Screen);
  }

  function renderScreen() {
    switch (screen) {
      case "contest-browse":
        return <ContestBrowse onNavigate={nav} />;
      case "contest-detail-new":
        return <ContestDetail onNavigate={nav} userState="new" initialShowRules={sheet === "rules"} />;
      case "contest-detail-post-compete":
        return <ContestDetail onNavigate={nav} userState="post-compete" />;
      case "labeling":
        return (
          <LabelingOptionA
            onNavigate={nav}
            earnState={earnState === "threshold" ? "warmup" : earnState}
            warmupRemaining={warmupRemaining}
            onWarmupProgress={(r) => { setWarmupRemaining(r); if (r === 0) setEarnState("threshold"); }}
            onThresholdComplete={() => setEarnState("active")}
          />
        );
      case "feedback-a-pass":
        return (
          <LabelingOptionA
            onNavigate={nav}
            initialFeedback="earned"
            earnState="active"
            warmupRemaining={0}
            onWarmupProgress={() => {}}
            onThresholdComplete={() => {}}
          />
        );
      case "feedback-a-fail":
        return (
          <LabelingOptionA
            onNavigate={nav}
            initialFeedback="not-earned"
            earnState="active"
            warmupRemaining={0}
            onWarmupProgress={() => {}}
            onThresholdComplete={() => {}}
          />
        );
      case "feedback-b-pass":
        return (
          <LabelingOptionB
            onNavigate={nav}
            initialFeedback="earned"
            earnState="active"
            warmupRemaining={0}
            onWarmupProgress={() => {}}
            onThresholdComplete={() => {}}
          />
        );
      case "feedback-b-fail":
        return (
          <LabelingOptionB
            onNavigate={nav}
            initialFeedback="not-earned"
            earnState="active"
            warmupRemaining={0}
            onWarmupProgress={() => {}}
            onThresholdComplete={() => {}}
          />
        );
      case "contest-ended":
        return (
          <LabelingOptionA
            onNavigate={nav}
            initialShowContestEnded={true}
            earnState="active"
            warmupRemaining={0}
            onWarmupProgress={() => {}}
            onThresholdComplete={() => {}}
          />
        );
      case "session-complete":
        return <ContestComplete onNavigate={nav} />;
      case "max-earned":
        return <ContestCompleteConfetti onNavigate={nav} />;
    }
  }

  const currentIndex = ALL_SCREENS.indexOf(screen);

  return (
    <main className="min-h-screen flex" style={{ background: "#f0f0f0" }}>
      {/* Sidebar */}
      <aside
        className="w-56 flex-shrink-0 p-4 flex flex-col border-r overflow-y-auto"
        style={{ background: "white", borderColor: "#e0e0e0" }}
      >
        <div className="mb-3 mt-1">
          <div className="flex items-center justify-between">
            <p className="text-[11px] font-bold uppercase tracking-widest" style={{ color: "#999" }}>
              Earn Mode — iOS
            </p>
            <button
              onClick={() => setDarkMode((d) => !d)}
              className="w-7 h-7 rounded-full flex items-center justify-center transition-colors"
              style={{ background: darkMode ? "#1c1c1e" : "#f2f2f7", color: darkMode ? "var(--ios-tint-default)" : "#555" }}
              title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {darkMode ? <Sun size={13} /> : <Moon size={13} />}
            </button>
          </div>
          <p className="text-[10px] mt-1" style={{ color: "#bbb" }}>
            Apple HIG · SF Pro
          </p>
        </div>

        {/* ── Happy Path ── */}
        <SectionLabel>Happy Path</SectionLabel>
        <NavBtn s="contest-browse" label="Contest Browse" current={screen} onClick={nav} />
        <NavBtn s="contest-detail-new" label="Contest Detail — New" current={screen} onClick={nav} />
        <NavBtn s="labeling" label="Labeling" current={screen} onClick={nav} />
        <NavBtn s="feedback-a-pass" label="Score Feedback — A · Passed" current={screen} onClick={nav} />
        <NavBtn s="feedback-a-fail" label="Score Feedback — A · Failed" current={screen} onClick={nav} />
        <NavBtn s="feedback-b-pass" label="Score Feedback — B · Passed" current={screen} onClick={nav} />
        <NavBtn s="feedback-b-fail" label="Score Feedback — B · Failed" current={screen} onClick={nav} />
        <NavBtn s="session-complete" label="Session Complete" current={screen} onClick={nav} />

        {/* ── Other Endings ── */}
        <SectionLabel>Other Endings</SectionLabel>
        <NavBtn s="max-earned" label="Max Earned" current={screen} onClick={nav} />
        <NavBtn s="contest-ended" label="Contest Ended — mid-session" current={screen} onClick={nav} />

        <div className="mt-4 pt-4 border-t flex flex-col gap-1" style={{ borderColor: "#eee" }}>
          <a
            href="/android"
            className="block px-3 py-2 rounded-lg text-[12px] font-medium transition-colors"
            style={{ color: "#555", textDecoration: "none" }}
          >
            → Android Mockup
          </a>
        </div>
      </aside>

      {/* Main area */}
      <div className="flex-1 flex flex-col items-center justify-center py-10 px-6">
        <div className="mb-4 text-center">
          <p className="text-[13px] font-semibold" style={{ color: "#444" }}>
            {SCREEN_LABELS[screen]}
          </p>
        </div>

        <PhoneFrame>
          <div key={screen} className={`animate-screen-in h-full${darkMode ? " ios-dark" : ""}`}>
            {renderScreen()}
          </div>
        </PhoneFrame>

        <div className="mt-5 flex items-center gap-4">
          <button
            onClick={() => nav(ALL_SCREENS[currentIndex - 1])}
            disabled={currentIndex === 0}
            className="px-4 py-2 rounded-lg text-[13px] font-medium border transition-colors disabled:opacity-30"
            style={{ background: "white", borderColor: "#ddd", color: "#333" }}
          >
            ← Prev
          </button>
          <span className="text-[12px]" style={{ color: "#aaa" }}>
            {currentIndex + 1} / {ALL_SCREENS.length}
          </span>
          <button
            onClick={() => nav(ALL_SCREENS[currentIndex + 1])}
            disabled={currentIndex === ALL_SCREENS.length - 1}
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
