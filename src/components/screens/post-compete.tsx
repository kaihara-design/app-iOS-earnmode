"use client";

import { ChevronLeft, Check, X } from "lucide-react";

interface PostCompeteProps {
  onNavigate: (screen: string) => void;
}

export function PostCompete({ onNavigate }: PostCompeteProps) {
  const earned = 20.0;
  const maxEarnings = 20.0;
  const qualifiedReads = 667;
  const totalReads = 680;
  const progressPct = (earned / maxEarnings) * 100;

  return (
    <div className="h-full flex flex-col" style={{ background: "#fff" }}>
      {/* Nav header */}
      <div className="px-4 pt-2 pb-3 border-b flex items-center gap-3" style={{ borderColor: "var(--gray-5)" }}>
        <button onClick={() => onNavigate("contest-browse")} style={{ color: "var(--earn-indigo)" }}>
          <ChevronLeft size={20} />
        </button>
        <h1 className="text-[17px] font-semibold">My Earnings</h1>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {/* Earnings summary card */}
        <div
          className="rounded-2xl p-4"
          style={{ background: "var(--earn-teal-10)", border: "1px solid rgba(56,220,209,0.2)" }}
        >
          <p className="text-[12px] font-semibold mb-1" style={{ color: "var(--earn-teal)" }}>
            DIABETIC RETINOPATHY · EARN MODE
          </p>
          <div className="flex items-end gap-3 mb-3">
            <div>
              <p className="text-[32px] font-bold" style={{ color: "var(--earn-teal)" }}>
                ${earned.toFixed(2)}
              </p>
              <p className="text-[12px]" style={{ color: "var(--label-secondary)" }}>earned this session</p>
            </div>
            <div className="mb-1">
              <p className="text-[15px] font-semibold" style={{ color: "var(--label-primary)" }}>
                {qualifiedReads} qualified reads
              </p>
              <p className="text-[12px]" style={{ color: "var(--label-secondary)" }}>out of {totalReads} total</p>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mb-1.5">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[11px] font-medium" style={{ color: "var(--earn-teal)" }}>
                ${earned.toFixed(2)} earned
              </span>
              <span className="text-[11px]" style={{ color: "var(--label-secondary)" }}>
                up to ${maxEarnings.toFixed(2)} max
              </span>
            </div>
            <div className="h-2 rounded-full" style={{ background: "rgba(56,220,209,0.20)" }}>
              <div
                className="h-2 rounded-full"
                style={{ background: "var(--earn-teal)", width: `${progressPct}%` }}
              />
            </div>
          </div>
        </div>

        {/* Read quality breakdown */}
        <div>
          <p className="text-[15px] font-semibold mb-2">Recent reads</p>
          <div className="space-y-2">
            {[
              { read: 1, earned: true, amount: 0.03 },
              { read: 2, earned: true, amount: 0.03 },
              { read: 3, earned: false, amount: 0 },
              { read: 4, earned: true, amount: 0.03 },
              { read: 5, earned: true, amount: 0.03 },
            ].map(({ read, earned: didEarn, amount }) => (
              <div
                key={read}
                className="flex items-center justify-between rounded-xl px-3 py-2.5 border"
                style={{ borderColor: "var(--gray-5)" }}
              >
                <div className="flex items-center gap-2.5">
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center"
                    style={
                      didEarn
                        ? { background: "var(--earn-teal-10)", color: "var(--earn-teal)" }
                        : { background: "var(--earn-red-10)", color: "var(--earn-red)" }
                    }
                  >
                    {didEarn ? <Check size={13} strokeWidth={2.5} /> : <X size={13} strokeWidth={2.5} />}
                  </div>
                  <span className="text-[13px]" style={{ color: "var(--label-secondary)" }}>
                    Read {read}
                  </span>
                </div>
                <span
                  className="text-[13px] font-semibold"
                  style={{ color: didEarn ? "var(--earn-teal)" : "var(--label-tertiary)" }}
                >
                  {didEarn ? `+$${amount.toFixed(2)}` : "—"}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* CTA */}
      <div className="px-4 pb-8 pt-3 border-t" style={{ borderColor: "var(--gray-5)" }}>
        <button
          onClick={() => onNavigate("contest-browse")}
          className="w-full py-3.5 rounded-2xl text-[15px] font-semibold text-white"
          style={{ background: "var(--earn-indigo)" }}
        >
          Browse more contests
        </button>
      </div>
    </div>
  );
}
