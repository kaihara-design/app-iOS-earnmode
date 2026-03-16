"use client";

import { X, DollarSign, Check, Trophy } from "lucide-react";

interface ContestCompleteProps {
  onNavigate: (screen: string) => void;
}

export function ContestComplete({ onNavigate }: ContestCompleteProps) {
  const earned = 0.12;
  const qualifiedReads = 4;
  const totalReads = 5;

  return (
    <div className="h-full flex flex-col" style={{ background: "#fff" }}>

      {/* Nav header */}
      <div
        className="px-4 pt-2 pb-3 border-b flex items-center gap-3"
        style={{ borderColor: "var(--gray-5)" }}
      >
        <button
          onClick={() => onNavigate("contest-browse")}
          style={{ color: "var(--earn-teal-deep)" }}
        >
          <X size={20} />
        </button>
        <h1 className="text-[17px] font-semibold">Contest Complete</h1>
      </div>

      {/* Scrollable body */}
      <div className="flex-1 overflow-y-auto flex flex-col items-center justify-center px-6 text-center py-10">

        {/* Completion icon */}
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center mb-5"
          style={{ background: "var(--earn-teal-10)" }}
        >
          <DollarSign size={36} style={{ color: "var(--earn-teal-deep)" }} />
        </div>

        {/* Headline */}
        <h2 className="text-[22px] font-bold mb-2" style={{ color: "var(--label-primary)" }}>
          You&apos;ve read them all
        </h2>
        <p className="text-[14px] leading-relaxed mb-6" style={{ color: "var(--label-secondary)" }}>
          You&apos;ve completed all available cases in this contest. New cases may appear as more are added.
        </p>

        {/* Earnings summary card */}
        <div
          className="w-full rounded-2xl p-4 text-left"
          style={{ background: "var(--earn-teal-10)", border: "1px solid rgba(77,195,208,0.2)" }}
        >
          <p className="text-[11px] font-semibold mb-2" style={{ color: "var(--earn-teal-deep)" }}>
            DIABETIC RETINOPATHY · EARN MODE
          </p>

          <div className="flex items-center gap-3 mb-3">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: "var(--earn-teal)", color: "white" }}
            >
              <Check size={18} strokeWidth={2.5} />
            </div>
            <div>
              <p className="text-[26px] font-bold leading-none" style={{ color: "var(--earn-teal-deep)" }}>
                ${earned.toFixed(2)}
              </p>
              <p className="text-[12px] mt-0.5" style={{ color: "var(--label-secondary)" }}>
                earned this session
              </p>
            </div>
          </div>

          <div
            className="flex items-center gap-2 pt-3"
            style={{ borderTop: "1px solid rgba(77,195,208,0.2)" }}
          >
            <Trophy size={14} style={{ color: "var(--earn-teal-deep)", flexShrink: 0 }} />
            <p className="text-[13px] font-semibold" style={{ color: "var(--earn-teal-deep)" }}>
              {qualifiedReads} qualified reads&nbsp;
              <span className="font-normal" style={{ color: "var(--label-secondary)" }}>
                out of {totalReads} total
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Sticky CTAs */}
      <div
        className="px-4 pb-8 pt-3 border-t flex flex-col gap-2.5"
        style={{ borderColor: "var(--gray-5)" }}
      >
        <button
          onClick={() => onNavigate("post-compete")}
          className="w-full py-3.5 rounded-2xl text-[15px] font-semibold text-white"
          style={{ background: "var(--earn-teal)" }}
        >
          View my earnings
        </button>
        <button
          onClick={() => onNavigate("contest-browse")}
          className="w-full py-3.5 rounded-2xl text-[15px] font-semibold border"
          style={{ borderColor: "var(--earn-teal)", color: "var(--earn-teal-deep)" }}
        >
          Browse contests
        </button>
      </div>
    </div>
  );
}
