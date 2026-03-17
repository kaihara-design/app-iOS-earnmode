"use client";

import { useState } from "react";
import { PhoneFrame } from "@/components/phone-frame";
import { ContestBrowse } from "@/components/screens/contest-browse";
import { ContestDetail } from "@/components/screens/contest-detail";
import { LabelingOptionA } from "@/components/screens/labeling-option-a";
import { LabelingOptionB } from "@/components/screens/labeling-option-b";
import { ContestComplete } from "@/components/screens/contest-complete";
import { ContestCompleteConfetti } from "@/components/screens/contest-complete-confetti";

type Screen =
  | "contest-browse"
  | "contest-detail-new"
  | "labeling-option-a"
  | "labeling-option-b"
  | "labeling-contest-ended"
  | "contest-complete"
  | "contest-complete-confetti"
  | "contest-detail-post-compete";

const SCREEN_LABELS: Record<Screen, string> = {
  "contest-browse": "Contest Browse",
  "contest-detail-new": "Contest Detail — New",
  "labeling-option-a": "Labeling — Option A (score)",
  "labeling-option-b": "Labeling — Option B (pass/fail)",
  "labeling-contest-ended": "Contest Ended (mid-session)",
  "contest-complete": "Session Complete",
  "contest-complete-confetti": "Max Earned — Celebration",
  "contest-detail-post-compete": "Contest Detail — Post-Compete",
};

const ALL_SCREENS: Screen[] = [
  "contest-browse",
  "contest-detail-new",
  "labeling-option-a",
  "labeling-option-b",
  "labeling-contest-ended",
  "contest-complete",
  "contest-complete-confetti",
  "contest-detail-post-compete",
];

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

function getFeedbackParam(): string | null {
  if (typeof window !== "undefined") {
    return new URLSearchParams(window.location.search).get("feedback");
  }
  return null;
}

export default function Home() {
  const [screen, setScreen] = useState<Screen>(getInitialScreen);
  const sheet = getSheetParam();
  const feedback = getFeedbackParam() as "earned" | "not-earned" | null;

  function renderScreen() {
    switch (screen) {
      case "contest-browse":
        return <ContestBrowse onNavigate={(s) => setScreen(s as Screen)} />;
      case "contest-detail-new":
        return <ContestDetail onNavigate={(s) => setScreen(s as Screen)} userState="new" initialShowRules={sheet === "rules"} />;
      case "contest-detail-post-compete":
        return <ContestDetail onNavigate={(s) => setScreen(s as Screen)} userState="post-compete" />;
      case "labeling-option-a":
        return <LabelingOptionA onNavigate={(s) => setScreen(s as Screen)} initialFeedback={feedback ?? undefined} />;
      case "labeling-option-b":
        return <LabelingOptionB onNavigate={(s) => setScreen(s as Screen)} initialFeedback={feedback ?? undefined} />;
      case "labeling-contest-ended":
        return <LabelingOptionA onNavigate={(s) => setScreen(s as Screen)} initialShowContestEnded={true} />;
      case "contest-complete":
        return <ContestComplete onNavigate={(s) => setScreen(s as Screen)} />;
      case "contest-complete-confetti":
        return <ContestCompleteConfetti onNavigate={(s) => setScreen(s as Screen)} />;
    }
  }

  const currentIndex = ALL_SCREENS.indexOf(screen);

  return (
    <main className="min-h-screen flex" style={{ background: "#f0f0f0" }}>
      {/* Sidebar */}
      <aside
        className="w-56 flex-shrink-0 p-4 flex flex-col gap-1 border-r"
        style={{ background: "white", borderColor: "#e0e0e0" }}
      >
        <p className="text-[11px] font-bold uppercase tracking-widest mb-3 mt-1" style={{ color: "#999" }}>
          Earn Mode Mockup
        </p>
        {ALL_SCREENS.map((s) => (
          <button
            key={s}
            onClick={() => setScreen(s)}
            className="text-left px-3 py-2 rounded-lg text-[12px] font-medium transition-colors"
            style={
              screen === s
                ? { background: "var(--earn-teal-10)", color: "var(--earn-teal)", fontWeight: 700 }
                : { color: "#555" }
            }
          >
            {SCREEN_LABELS[s]}
          </button>
        ))}

        <div className="mt-4 pt-4 border-t" style={{ borderColor: "#eee" }}>
          <a
            href="/design-system"
            className="block px-3 py-2 rounded-lg text-[12px] font-medium transition-colors"
            style={{ color: "var(--earn-teal)", background: "var(--earn-teal-10)", textDecoration: "none" }}
          >
            → Design System
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
          <div key={screen} className="animate-screen-in h-full">
            {renderScreen()}
          </div>
        </PhoneFrame>

        <div className="mt-5 flex items-center gap-4">
          <button
            onClick={() => setScreen(ALL_SCREENS[currentIndex - 1])}
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
            onClick={() => setScreen(ALL_SCREENS[currentIndex + 1])}
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
