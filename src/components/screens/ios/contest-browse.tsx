"use client";

import { useState } from "react";
import { Clock, Coins, Trophy, Star, BookOpen, User, Sparkles } from "lucide-react";

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
  onClick,
}: {
  image: string;
  title: string;
  prizeChip: React.ReactNode;
  modeChip: React.ReactNode;
  deadline: string;
  onClick?: () => void;
}) {
  return (
    <div
      className="rounded-[5px] overflow-hidden cursor-pointer active:scale-[0.98] transition-transform duration-[120ms]"
      style={{ willChange: "transform", border: "1px solid var(--ios-border-default)", background: "var(--ios-surface-default)", boxShadow: "0px 1px 4px rgba(0,0,0,0.25)" }}
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
          <Chip color="var(--ios-interactive-indigo-bg)" textColor="var(--ios-interactive-primary)" label="Individual" />
        </div>
        <p className="text-[11px] flex items-center gap-1" style={{ color: "var(--ios-text-secondary)" }}>
          <Clock size={10} />
          {deadline}
        </p>
      </div>
    </div>
  );
}

export function ContestBrowse({ onNavigate }: ContestBrowseProps) {
  const [activeFilter, setActiveFilter] = useState("Recommended");
  const filters = ["Recommended", "All Contests", "Upcoming", "Just Ended"];

  return (
    <div className="h-full flex flex-col" style={{ background: "var(--ios-surface-default)", fontFamily: "var(--ios-font)" }}>
      {/* Nav header */}
      <div className="px-4 pt-2 pb-1">
        <div className="flex items-center justify-between mb-3">
          <h1 className="text-[17px] font-semibold" style={{ color: "var(--ios-text-primary)", lineHeight: "22px", letterSpacing: "-0.43px" }}>
            Compete
          </h1>
          <button className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "var(--ios-fill-quaternary)" }}>
            <Clock size={14} color="var(--ios-text-secondary)" />
          </button>
        </div>
        <p className="text-[20px] mb-2.5" style={{ fontWeight: 500, lineHeight: "24px", color: "var(--ios-text-page-title)" }}>Contests</p>

        {/* Filter chips */}
        <div className="flex gap-2 overflow-x-auto pb-1 -mx-4 px-4" style={{ scrollbarWidth: "none" }}>
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className="flex-shrink-0 px-[10px] py-[10px] rounded-[5px] text-[14px] font-semibold transition-all duration-[200ms] active:scale-[0.94]"
              style={
                activeFilter === f
                  ? { background: "var(--ios-primary-container)", color: "var(--ios-on-primary-container)", border: "none" }
                  : { background: "var(--ios-fill-quaternary)", color: "var(--ios-text-vibrant)", border: "none" }
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
        <div className="animate-fade-up" style={{ animationDelay: "0ms" }}>
          <div className="flex items-center gap-1.5 mb-1.5 px-0.5">
            <div
              className="text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full flex items-center gap-1"
              style={{ background: "var(--earn-teal-10)", color: "var(--earn-teal)" }}
            >
              <Sparkles size={9} />
              Recommended
            </div>
          </div>
          <ContestCard
            image="linear-gradient(135deg, #1a6b7a 0%, #0d4a55 100%)"
            title="Diabetic Retinopathy"
            onClick={() => onNavigate("contest-detail-new")}
            prizeChip={
              <span
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold"
                style={{ background: "var(--earn-teal-10)", color: "var(--earn-teal)" }}
              >
                <Coins size={10} />
                $0.03/read
              </span>
            }
            modeChip={
              <span
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold"
                style={{ background: "var(--earn-chip-bg)", color: "var(--earn-chip-fg)", border: "1px solid var(--earn-chip-border)" }}
              >
                <Coins size={10} />
                Earn Mode
              </span>
            }
            deadline="Up to $20.00 · Ends in 10 hours"
          />
        </div>

        {/* Accuracy contest */}
        <div className="animate-fade-up" style={{ animationDelay: "60ms" }}>
          <ContestCard
            image="linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)"
            title="Diabetic Retinopathy"
            prizeChip={
              <Chip color="var(--ios-contest-prize-bg)" textColor="var(--ios-contest-prize)" icon={<Trophy size={10} />} label="$70 Pool" />
            }
            modeChip={
              <Chip color="var(--ios-interactive-primary)" label="Accuracy" />
            }
            deadline="Ends in 10 hours"
          />
        </div>

        {/* Streak contest */}
        <div className="animate-fade-up" style={{ animationDelay: "120ms" }}>
          <ContestCard
            image="linear-gradient(135deg, #1a1a1a 0%, #333 100%)"
            title="Endoscopy (Erosions and Ulcers) Long Contest Title"
            prizeChip={
              <Chip color="var(--ios-contest-prize-bg)" textColor="var(--ios-contest-prize)" icon={<Trophy size={10} />} label="$20 Pool" />
            }
            modeChip={
              <Chip color="var(--ios-contest-prize)" label="Streak" />
            }
            deadline="Ends in 1 day 23 hours"
          />
        </div>

        {/* Earn Mode — exhausted state */}
        <div className="animate-fade-up" style={{ animationDelay: "180ms" }}>
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
                style={{ background: "var(--earn-chip-bg)", color: "var(--earn-chip-fg)", border: "1px solid var(--earn-chip-border)" }}
              >
                <Coins size={10} />
                Earn Mode
              </span>
            }
            deadline="Contest ended · $0.00 remaining"
          />
        </div>
      </div>

      {/* Bottom nav */}
      <div
        className="flex items-center justify-around pt-3 pb-6 border-t"
        style={{ borderColor: "var(--ios-border-default)" }}
      >
        {[
          { icon: <Trophy size={22} />, label: "Compete", active: true },
          { icon: <Star size={22} />, label: "For You", active: false },
          { icon: <BookOpen size={22} />, label: "Learn", active: false },
          { icon: <User size={22} />, label: "Profile", active: false },
        ].map(({ icon, label, active }) => (
          <button key={label} className="flex flex-col items-center gap-1">
            <span style={{ color: active ? "var(--ios-interactive-primary)" : "var(--ios-text-vibrant-control)" }}>{icon}</span>
            <span
              className="text-[10px] font-semibold"
              style={{ color: active ? "var(--ios-interactive-primary)" : "var(--ios-text-vibrant-control)" }}
            >
              {label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
