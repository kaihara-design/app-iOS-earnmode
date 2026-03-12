"use client";

import { useState } from "react";
import { PhoneFrame } from "@/components/phone-frame";
import { ContestBrowse } from "@/components/screens/contest-browse";
import { ContestDetail } from "@/components/screens/contest-detail";
import { LabelingOptionA } from "@/components/screens/labeling-option-a";
import { LabelingOptionB } from "@/components/screens/labeling-option-b";
import { PostCompete } from "@/components/screens/post-compete";

type Screen =
  | "contest-browse"
  | "contest-detail"
  | "labeling-option-a"
  | "labeling-option-b"
  | "post-compete";

const SCREEN_LABELS: Record<Screen, string> = {
  "contest-browse": "Contest Browse",
  "contest-detail": "Contest Detail",
  "labeling-option-a": "Labeling — Option A (score visible)",
  "labeling-option-b": "Labeling — Option B (pass/fail)",
  "post-compete": "Post-Compete Earnings",
};

const ALL_SCREENS: Screen[] = [
  "contest-browse",
  "contest-detail",
  "labeling-option-a",
  "labeling-option-b",
  "post-compete",
];

export default function Home() {
  const [screen, setScreen] = useState<Screen>("contest-browse");

  function renderScreen() {
    switch (screen) {
      case "contest-browse":
        return <ContestBrowse onNavigate={(s) => setScreen(s as Screen)} />;
      case "contest-detail":
        return <ContestDetail onNavigate={(s) => setScreen(s as Screen)} />;
      case "labeling-option-a":
        return <LabelingOptionA onNavigate={(s) => setScreen(s as Screen)} />;
      case "labeling-option-b":
        return <LabelingOptionB onNavigate={(s) => setScreen(s as Screen)} />;
      case "post-compete":
        return <PostCompete onNavigate={(s) => setScreen(s as Screen)} />;
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
                ? { background: "var(--earn-teal-10)", color: "var(--earn-teal-deep)", fontWeight: 700 }
                : { color: "#555" }
            }
          >
            {SCREEN_LABELS[s]}
          </button>
        ))}

        <div className="mt-4 pt-4 border-t" style={{ borderColor: "#eee" }}>
          <p className="text-[10px] mb-2" style={{ color: "#bbb" }}>PROBLEM</p>
          <div className="space-y-1 text-[11px]" style={{ color: "#888" }}>
            <p>1 → Browse / Detail / Onboarding</p>
            <p>2 → Labeling A/B / Post-compete</p>
            <p>3 → Contest ended (tap Next in labeling)</p>
          </div>
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
          {renderScreen()}
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
