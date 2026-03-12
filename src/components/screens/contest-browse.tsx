"use client";

import { useState } from "react";

interface ContestBrowseProps {
  onNavigate: (screen: string) => void;
}

function Chip({
  color,
  textColor = "white",
  icon,
  label,
}: {
  color: string;
  textColor?: string;
  icon?: React.ReactNode;
  label: string;
}) {
  return (
    <span
      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold"
      style={{ background: color, color: textColor }}
    >
      {icon}
      {label}
    </span>
  );
}

function ContestCard({
  image,
  title,
  prizeChip,
  modeChip,
  deadline,
  isEarnMode,
  onClick,
}: {
  image: string;
  title: string;
  prizeChip: React.ReactNode;
  modeChip: React.ReactNode;
  deadline: string;
  isEarnMode?: boolean;
  onClick?: () => void;
}) {
  return (
    <div
      className="rounded-2xl overflow-hidden border border-gray-100 bg-white cursor-pointer active:scale-[0.99] transition-transform"
      onClick={onClick}
    >
      {/* Hero image */}
      <div className="relative h-[140px] overflow-hidden" style={{ background: image }}>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute bottom-3 left-3 right-3">
          <p className="text-white font-semibold text-[15px] leading-tight">{title}</p>
        </div>
      </div>
      {/* Card body */}
      <div className="px-3 py-2.5">
        <div className="flex flex-wrap gap-1.5 mb-1.5">
          {prizeChip}
          {modeChip}
          <Chip color="#e8e5ff" textColor="#6155f5" label="Individual" />
        </div>
        <p className="text-[11px]" style={{ color: "var(--label-secondary)" }}>
          <span className="mr-1">⏱</span>{deadline}
        </p>
      </div>
    </div>
  );
}

export function ContestBrowse({ onNavigate }: ContestBrowseProps) {
  const [activeFilter, setActiveFilter] = useState("Recommended");
  const filters = ["Recommended", "All Contests", "Upcoming", "Just Ended"];

  return (
    <div className="h-full flex flex-col" style={{ background: "#fff" }}>
      {/* Nav header */}
      <div className="px-4 pt-2 pb-1">
        <div className="flex items-center justify-between mb-3">
          <h1 className="text-[17px] font-semibold" style={{ color: "var(--label-primary)" }}>
            Compete
          </h1>
          <button className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 1a6 6 0 100 12A6 6 0 007 1z" stroke="#666" strokeWidth="1.5"/>
              <path d="M7 4.5v3l2 1" stroke="#666" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
        <p className="text-[20px] font-semibold mb-2.5">Contests</p>

        {/* Filter chips */}
        <div className="flex gap-2 overflow-x-auto pb-1 -mx-4 px-4" style={{ scrollbarWidth: "none" }}>
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className="flex-shrink-0 px-3 py-1 rounded-full text-[13px] font-medium border transition-colors"
              style={
                activeFilter === f
                  ? { background: "var(--earn-teal)", color: "white", borderColor: "transparent" }
                  : { background: "white", color: "var(--label-primary)", borderColor: "var(--gray-5)" }
              }
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Contest list */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
        {/* Earn Mode contest — REDESIGNED */}
        <div>
          <div className="flex items-center gap-1.5 mb-1.5 px-0.5">
            <div
              className="text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full"
              style={{ background: "var(--earn-teal-10)", color: "var(--earn-teal-deep)" }}
            >
              ✦ Recommended
            </div>
          </div>
          <ContestCard
            image="linear-gradient(135deg, #1a6b7a 0%, #0d4a55 100%)"
            title="Diabetic Retinopathy"
            isEarnMode
            onClick={() => onNavigate("contest-detail")}
            prizeChip={
              <span
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold"
                style={{ background: "var(--earn-teal-10)", color: "var(--earn-teal-deep)" }}
              >
                💰 $0.03/read
              </span>
            }
            modeChip={
              <span
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold"
                style={{ background: "var(--earn-teal)", color: "white" }}
              >
                ⚖️ Earn Mode
              </span>
            }
            deadline="Up to $20.00 · Ends in 10 hours"
          />
        </div>

        {/* Accuracy contest */}
        <ContestCard
          image="linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)"
          title="Diabetic Retinopathy"
          prizeChip={
            <Chip color="#f3f3ff" textColor="#6155f5" icon={<span>🏆</span>} label="$70 Pool" />
          }
          modeChip={
            <Chip color="#6155f5" label="Accuracy" />
          }
          deadline="Ends in 10 hours"
        />

        {/* Streak contest */}
        <ContestCard
          image="linear-gradient(135deg, #1a1a1a 0%, #333 100%)"
          title="Endoscopy (Erosions and Ulcers) Long Contest Title"
          prizeChip={
            <Chip color="#fff3e0" textColor="#e65100" icon={<span>🏆</span>} label="$20 Pool" />
          }
          modeChip={
            <Chip color="#FF9500" label="Streak" />
          }
          deadline="Ends in 1 day 23 hours"
        />

        {/* Earn Mode — exhausted state */}
        <ContestCard
          image="linear-gradient(135deg, #4a4a4a 0%, #2a2a2a 100%)"
          title="Chest X-Ray Pathology"
          prizeChip={
            <span
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium"
              style={{ background: "var(--gray-6)", color: "var(--label-secondary)" }}
            >
              Prize claimed
            </span>
          }
          modeChip={
            <span
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold"
              style={{ background: "var(--earn-teal-10)", color: "var(--earn-teal-deep)" }}
            >
              ⚖️ Earn Mode
            </span>
          }
          deadline="Contest ended · $0.00 remaining"
        />
      </div>

      {/* Bottom nav */}
      <div
        className="flex items-center justify-around pt-3 pb-6 border-t"
        style={{ borderColor: "var(--gray-5)" }}
      >
        {[
          { icon: "🏆", label: "Compete", active: true },
          { icon: "⭐", label: "For You", active: false },
          { icon: "📖", label: "Learn", active: false },
          { icon: "👤", label: "Profile", active: false },
        ].map(({ icon, label, active }) => (
          <button key={label} className="flex flex-col items-center gap-1">
            <span className="text-[20px]">{icon}</span>
            <span
              className="text-[10px] font-medium"
              style={{ color: active ? "var(--earn-teal)" : "var(--label-secondary)" }}
            >
              {label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
