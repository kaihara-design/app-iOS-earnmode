"use client";

import {
  Coins, DollarSign, Trophy, BarChart2, Lock, ChevronRight, ChevronLeft,
  X, Check, Target, MessageCircle, Flag, Eye, Clock, Star, BookOpen,
  User, Sparkles, Bell, Check as CheckIcon,
} from "lucide-react";

// ─── Primitives ────────────────────────────────────────────────────────────

function SectionHeader({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2
      id={id}
      className="text-[22px] font-bold mb-6 pb-3"
      style={{ color: "var(--label-primary)", borderBottom: "1px solid var(--gray-5)" }}
    >
      {children}
    </h2>
  );
}

function SubHeader({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-[13px] font-bold uppercase tracking-widest mb-4" style={{ color: "var(--label-secondary)" }}>
      {children}
    </h3>
  );
}

function TokenLabel({ name, value }: { name: string; value: string }) {
  return (
    <div>
      <p className="text-[12px] font-semibold" style={{ color: "var(--label-primary)" }}>{name}</p>
      <p className="text-[11px] font-mono mt-0.5" style={{ color: "var(--label-secondary)" }}>{value}</p>
    </div>
  );
}

// ─── Color Swatch ──────────────────────────────────────────────────────────

function Swatch({ bg, border, name, hex, dark }: { bg: string; border?: string; name: string; hex: string; dark?: boolean }) {
  return (
    <div className="flex flex-col gap-2">
      <div
        className="h-14 rounded-xl w-full"
        style={{ background: bg, border: border || "1px solid rgba(0,0,0,0.06)" }}
      />
      <TokenLabel name={name} value={hex} />
    </div>
  );
}

// ─── Type Specimen ─────────────────────────────────────────────────────────

function TypeRow({ size, weight, lh, tracking, label, sample }: {
  size: string; weight: string; lh: string; tracking: string; label: string; sample: string;
}) {
  return (
    <div
      className="flex items-start gap-6 py-3"
      style={{ borderBottom: "1px solid var(--gray-5)" }}
    >
      <div className="w-44 flex-shrink-0 pt-0.5">
        <p className="text-[12px] font-semibold" style={{ color: "var(--label-primary)" }}>{label}</p>
        <p className="text-[11px] font-mono mt-0.5" style={{ color: "var(--label-secondary)" }}>
          {size} · {weight} · lh {lh} · ls {tracking}
        </p>
      </div>
      <p style={{ fontSize: size, lineHeight: lh, letterSpacing: tracking, fontWeight: weight === "Regular" ? 400 : 590 }}>
        {sample}
      </p>
    </div>
  );
}

// ─── Component previews ────────────────────────────────────────────────────

function ComponentBlock({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mb-8">
      <p className="text-[11px] font-bold uppercase tracking-widest mb-3" style={{ color: "var(--label-secondary)" }}>{label}</p>
      <div
        className="rounded-2xl p-6 flex flex-wrap gap-4 items-start"
        style={{ background: "#f9f9f9", border: "1px solid var(--gray-5)" }}
      >
        {children}
      </div>
    </div>
  );
}

// ─── NAV ───────────────────────────────────────────────────────────────────

const NAV_ITEMS = [
  { id: "colors", label: "Colors" },
  { id: "typography", label: "Typography" },
  { id: "spacing-radius", label: "Spacing & Radius" },
  { id: "buttons", label: "Buttons" },
  { id: "cards", label: "Cards" },
  { id: "chips", label: "Chips & Badges" },
  { id: "progress", label: "Progress Bars" },
  { id: "sheets", label: "Bottom Sheets" },
  { id: "navigation", label: "Navigation" },
  { id: "earn-mode", label: "Earn Mode" },
  { id: "icons", label: "Icons" },
];

// ─── PAGE ──────────────────────────────────────────────────────────────────

export default function DesignSystem() {
  return (
    <div className="min-h-screen flex" style={{ background: "#fafafa", fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro', sans-serif" }}>

      {/* Sidebar */}
      <aside
        className="w-52 flex-shrink-0 sticky top-0 h-screen overflow-y-auto py-8 px-5 flex flex-col gap-1"
        style={{ background: "white", borderRight: "1px solid var(--gray-5)" }}
      >
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-1">
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center"
              style={{ background: "var(--earn-teal-10)" }}
            >
              <Coins size={14} style={{ color: "var(--earn-teal-deep)" }} />
            </div>
            <span className="text-[13px] font-bold" style={{ color: "var(--label-primary)" }}>DiagnosUs iOS</span>
          </div>
          <p className="text-[11px] pl-9" style={{ color: "var(--label-secondary)" }}>Design System</p>
        </div>

        {NAV_ITEMS.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className="block px-3 py-1.5 rounded-lg text-[13px] font-medium transition-colors hover:bg-gray-50"
            style={{ color: "var(--label-secondary)", textDecoration: "none" }}
          >
            {item.label}
          </a>
        ))}

        <div className="mt-auto pt-6">
          <a
            href="/"
            className="text-[11px] flex items-center gap-1 hover:opacity-80"
            style={{ color: "var(--earn-teal-deep)", textDecoration: "none" }}
          >
            <ChevronLeft size={12} />
            Back to mockup
          </a>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 max-w-4xl px-12 py-10 overflow-y-auto">

        {/* Page header */}
        <div className="mb-12">
          <p className="text-[12px] font-semibold uppercase tracking-widest mb-2" style={{ color: "var(--earn-teal-deep)" }}>
            iOS · DiagnosUs
          </p>
          <h1 className="text-[36px] font-bold mb-3" style={{ color: "var(--label-primary)" }}>Design System</h1>
          <p className="text-[15px] leading-relaxed max-w-xl" style={{ color: "var(--label-secondary)" }}>
            Tokens, typography, components, and patterns for the DiagnosUs iOS app.
            Earn Mode sub-theme included. Reference this doc during any iOS implementation.
          </p>
        </div>

        {/* ── COLORS ── */}
        <section id="colors" className="mb-16">
          <SectionHeader id="colors">Colors</SectionHeader>

          <SubHeader>iOS System Labels</SubHeader>
          <div className="grid grid-cols-3 gap-4 mb-8">
            <Swatch bg="#000000" name="Labels / Primary" hex="#000000" />
            <Swatch bg="rgba(60,60,67,0.60)" name="Labels / Secondary" hex="rgba(60,60,67,0.60)" />
            <Swatch bg="rgba(60,60,67,0.30)" name="Labels / Tertiary" hex="rgba(60,60,67,0.30)" />
          </div>

          <SubHeader>iOS System Fills & Grays</SubHeader>
          <div className="grid grid-cols-4 gap-4 mb-8">
            <Swatch bg="rgba(116,116,128,0.08)" name="Fills / Quaternary" hex="rgba(116,116,128,0.08)" />
            <Swatch bg="#e5e5ea" name="Grays / Gray 5" hex="#e5e5ea" />
            <Swatch bg="#f2f2f7" name="Grays / Gray 6" hex="#f2f2f7" />
            <Swatch bg="#ffffff" name="Grays / White" hex="#ffffff" />
          </div>

          <SubHeader>DiagnosUs Brand — Teal (Earn Mode)</SubHeader>
          <div className="grid grid-cols-4 gap-4 mb-8">
            <Swatch bg="#4DC3D0" name="Earn Teal" hex="#4DC3D0 (--earn-teal)" />
            <Swatch bg="#00c3d0" name="Earn Teal Deep" hex="#00c3d0 (--earn-teal-deep)" />
            <Swatch bg="rgba(77,195,208,0.10)" name="Earn Teal 10%" hex="rgba(77,195,208,0.10) (--earn-teal-10)" />
            <div />
          </div>

          <SubHeader>DiagnosUs Brand — Indigo (App Primary)</SubHeader>
          <div className="grid grid-cols-4 gap-4 mb-8">
            <Swatch bg="#6155f5" name="Earn Indigo" hex="#6155f5 (--earn-indigo)" />
            <Swatch bg="#f3f3ff" name="Earn Indigo 10%" hex="#f3f3ff (--earn-indigo-10)" />
            <Swatch bg="#cdc9ff" name="Earn Indigo 30%" hex="#cdc9ff (--earn-indigo-30)" />
            <div />
          </div>

          <SubHeader>Feedback States</SubHeader>
          <div className="grid grid-cols-4 gap-4 mb-8">
            <Swatch bg="#FF3B30" name="Earn Red" hex="#FF3B30 (--earn-red)" />
            <Swatch bg="rgba(255,59,48,0.08)" name="Earn Red 10%" hex="rgba(255,59,48,0.08) (--earn-red-10)" />
            <Swatch bg="#34c759" name="Accents / Green" hex="#34c759" />
            <Swatch bg="#ebf9ee" name="Green 10%" hex="#ebf9ee" />
          </div>

          <SubHeader>Contest Mode Colors</SubHeader>
          <div className="grid grid-cols-4 gap-4">
            <Swatch bg="#4DC3D0" name="Earn Mode" hex="#4DC3D0" />
            <Swatch bg="#6155f5" name="Accuracy" hex="#6155f5" />
            <Swatch bg="#FF9500" name="Streak" hex="#FF9500" />
            <Swatch bg="#F5A623" name="Prize" hex="#F5A623" />
          </div>
        </section>

        {/* ── TYPOGRAPHY ── */}
        <section id="typography" className="mb-16">
          <SectionHeader id="typography">Typography</SectionHeader>

          <div
            className="text-[12px] font-semibold px-3 py-2 rounded-lg mb-6"
            style={{ background: "var(--earn-indigo-10)", color: "var(--earn-indigo)" }}
          >
            Font: SF Pro · Use <code>-apple-system, BlinkMacSystemFont</code> as web fallback. Weight 590 = Semibold in SF Pro.
          </div>

          <div style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro', sans-serif" }}>
            <TypeRow label="Large Title" size="34px" weight="Bold" lh="41px" tracking="+0.37px" sample="All available cases read" />
            <TypeRow label="Title 1" size="28px" weight="Bold" lh="34px" tracking="+0.36px" sample="Contest Complete" />
            <TypeRow label="Title 2" size="22px" weight="Bold" lh="28px" tracking="+0.35px" sample="You've read them all" />
            <TypeRow label="Headline / Body Emphasized" size="17px" weight="Semibold" lh="22px" tracking="-0.43px" sample="Diabetic Retinopathy · Earn Mode" />
            <TypeRow label="Body" size="17px" weight="Regular" lh="22px" tracking="-0.43px" sample="Draw a bounding box around all lesions visible." />
            <TypeRow label="Subheadline Emphasized" size="15px" weight="Semibold" lh="20px" tracking="-0.23px" sample="Earned · Score: 74" />
            <TypeRow label="Subheadline" size="15px" weight="Regular" lh="20px" tracking="-0.23px" sample="More precise boxes = higher quality score" />
            <TypeRow label="Footnote" size="13px" weight="Regular" lh="18px" tracking="-0.08px" sample="4 qualified reads out of 5 total" />
            <TypeRow label="Caption 1 Regular" size="12px" weight="Regular" lh="16px" tracking="0px" sample="See full contest details, rules, and eligibility." />
            <TypeRow label="Caption 2 Emphasized" size="11px" weight="Semibold" lh="13px" tracking="+0.06px" sample="EARN MODE · 4/4 COMPLETED" />
            <TypeRow label="Caption 2 Regular" size="11px" weight="Regular" lh="13px" tracking="+0.06px" sample="Answer 53 more questions to qualify." />
          </div>
        </section>

        {/* ── SPACING & RADIUS ── */}
        <section id="spacing-radius" className="mb-16">
          <SectionHeader id="spacing-radius">Spacing & Border Radius</SectionHeader>

          <SubHeader>Spacing Scale (8pt grid)</SubHeader>
          <div className="flex items-end gap-6 mb-10">
            {[
              { label: "xs", pt: "4pt", h: "h-1" },
              { label: "sm", pt: "8pt", h: "h-2" },
              { label: "md", pt: "12pt", h: "h-3" },
              { label: "lg", pt: "16pt", h: "h-4" },
              { label: "xl", pt: "20pt", h: "h-5" },
              { label: "2xl", pt: "24pt", h: "h-6" },
              { label: "3xl", pt: "32pt", h: "h-8" },
            ].map(({ label, pt, h }) => (
              <div key={label} className="flex flex-col items-center gap-2">
                <div className={`w-6 ${h} rounded-sm`} style={{ background: "var(--earn-teal)" }} />
                <p className="text-[11px] font-semibold" style={{ color: "var(--label-primary)" }}>{label}</p>
                <p className="text-[10px] font-mono" style={{ color: "var(--label-secondary)" }}>{pt}</p>
              </div>
            ))}
          </div>

          <SubHeader>Border Radius</SubHeader>
          <div className="grid grid-cols-4 gap-6">
            {[
              { label: "CTA button", r: "8pt", style: "rounded-lg" },
              { label: "Card / Step", r: "12pt", style: "rounded-xl" },
              { label: "Featured card", r: "16pt", style: "rounded-2xl" },
              { label: "Bottom sheet", r: "24pt (top only)", style: "rounded-t-3xl" },
              { label: "Pill / Chip", r: "9999pt", style: "rounded-full" },
              { label: "Icon bubble", r: "9999pt (circle)", style: "rounded-full" },
              { label: "Icon tile", r: "8–12pt", style: "rounded-lg" },
              { label: "Progress bar", r: "9999pt", style: "rounded-full" },
            ].map(({ label, r, style }) => (
              <div key={label} className="flex flex-col gap-2">
                <div
                  className={`h-12 w-full ${style}`}
                  style={{ background: "var(--earn-indigo-10)", border: "2px solid var(--earn-indigo-30)" }}
                />
                <p className="text-[12px] font-semibold" style={{ color: "var(--label-primary)" }}>{label}</p>
                <p className="text-[11px] font-mono" style={{ color: "var(--label-secondary)" }}>{r}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── BUTTONS ── */}
        <section id="buttons" className="mb-16">
          <SectionHeader id="buttons">Buttons</SectionHeader>

          <ComponentBlock label="Primary CTA — Earn Mode (teal)">
            <button
              className="px-8 py-3 rounded-2xl text-[15px] font-semibold text-white"
              style={{ background: "var(--earn-teal)" }}
            >
              View my earnings
            </button>
            <button
              className="px-8 py-3 rounded-2xl text-[15px] font-semibold text-white"
              style={{ background: "var(--earn-teal)", opacity: 0.3 }}
            >
              Disabled
            </button>
          </ComponentBlock>

          <ComponentBlock label="Primary CTA — App (indigo)">
            <button
              className="px-8 py-3 rounded-2xl text-[15px] font-semibold text-white"
              style={{ background: "var(--earn-indigo)" }}
            >
              Compete
            </button>
            <button
              className="px-8 py-3 rounded-2xl text-[15px] font-semibold text-white"
              style={{ background: "var(--earn-indigo)", opacity: 0.3 }}
            >
              Disabled
            </button>
          </ComponentBlock>

          <ComponentBlock label="Secondary Outline">
            <button
              className="px-8 py-3 rounded-2xl text-[15px] font-semibold border"
              style={{ borderColor: "var(--earn-teal)", color: "var(--earn-teal-deep)" }}
            >
              Browse contests
            </button>
            <button
              className="px-8 py-3 rounded-2xl text-[15px] font-semibold border"
              style={{ borderColor: "var(--earn-indigo)", color: "var(--earn-indigo)" }}
            >
              View my earnings
            </button>
          </ComponentBlock>

          <ComponentBlock label="Ghost / Utility Icon Buttons (dark context)">
            <div className="flex gap-3 p-4 rounded-xl" style={{ background: "#0a0a0a" }}>
              {[MessageCircle, Flag, Eye].map((Icon, i) => (
                <button
                  key={i}
                  className="w-9 h-9 rounded-full flex items-center justify-center"
                  style={{ background: "rgba(255,255,255,0.13)" }}
                >
                  <Icon size={16} color="white" />
                </button>
              ))}
            </div>
          </ComponentBlock>

          <ComponentBlock label="Filter Pills">
            <button
              className="px-3 py-1 rounded-full text-[13px] font-medium"
              style={{ background: "var(--earn-teal)", color: "white" }}
            >
              Recommended
            </button>
            <button
              className="px-3 py-1 rounded-full text-[13px] font-medium border"
              style={{ background: "white", color: "var(--label-primary)", borderColor: "var(--gray-5)" }}
            >
              All Contests
            </button>
            <button
              className="px-3 py-1 rounded-full text-[13px] font-medium border"
              style={{ background: "white", color: "var(--label-primary)", borderColor: "var(--gray-5)" }}
            >
              Upcoming
            </button>
          </ComponentBlock>
        </section>

        {/* ── CARDS ── */}
        <section id="cards" className="mb-16">
          <SectionHeader id="cards">Cards</SectionHeader>

          <ComponentBlock label="Standard Content Card (tappable row)">
            <div
              className="w-full rounded-xl p-3 flex items-center gap-3 border"
              style={{ background: "white", borderColor: "var(--gray-5)" }}
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: "var(--earn-teal-10)", color: "var(--earn-teal-deep)" }}
              >
                <Trophy size={18} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[15px] font-semibold" style={{ color: "var(--label-primary)" }}>Rules and Prizes</p>
                <p className="text-[12px]" style={{ color: "var(--label-secondary)" }}>See full contest details, rules, and eligibility.</p>
              </div>
              <ChevronRight size={16} style={{ color: "var(--label-tertiary)", flexShrink: 0 }} />
            </div>
          </ComponentBlock>

          <ComponentBlock label="Featured Tinted Card — Earnings Summary">
            <div
              className="w-full rounded-2xl p-4"
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
                  <p className="text-[26px] font-bold leading-none" style={{ color: "var(--earn-teal-deep)" }}>$0.12</p>
                  <p className="text-[12px] mt-0.5" style={{ color: "var(--label-secondary)" }}>earned this session</p>
                </div>
              </div>
              <div
                className="flex items-center gap-2 pt-3"
                style={{ borderTop: "1px solid rgba(77,195,208,0.2)" }}
              >
                <Trophy size={14} style={{ color: "var(--earn-teal-deep)" }} />
                <p className="text-[13px] font-semibold" style={{ color: "var(--earn-teal-deep)" }}>
                  4 qualified reads <span className="font-normal" style={{ color: "var(--label-secondary)" }}>out of 5 total</span>
                </p>
              </div>
            </div>
          </ComponentBlock>

          <ComponentBlock label="Step Cards — Locked / Completed">
            <div className="w-full flex flex-col gap-1">
              {/* Completed */}
              <div
                className="rounded-xl p-3 flex items-center gap-4 border"
                style={{ background: "white", borderColor: "var(--gray-5)" }}
              >
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: "#ebf9ee", color: "#34c759" }}
                >
                  <Check size={13} strokeWidth={2.5} />
                </div>
                <p className="text-[15px] font-semibold" style={{ color: "var(--label-primary)" }}>Location Requirements</p>
              </div>
              {/* Locked */}
              <div
                className="rounded-xl p-3 flex items-center gap-4 border"
                style={{ background: "var(--earn-indigo-10)", borderColor: "var(--earn-indigo-30)" }}
              >
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: "var(--earn-indigo)", color: "white" }}
                >
                  <p className="text-[12px] font-semibold leading-none">2</p>
                </div>
                <div className="flex-1">
                  <p className="text-[15px] font-semibold" style={{ color: "var(--label-primary)" }}>Business Associate Agreement</p>
                  <p className="text-[12px]" style={{ color: "var(--label-secondary)" }}>Step Description</p>
                </div>
                <ChevronRight size={16} style={{ color: "var(--label-tertiary)" }} />
              </div>
            </div>
          </ComponentBlock>

          <ComponentBlock label="Contest Browse Card">
            <div className="rounded-xl overflow-hidden border w-72" style={{ borderColor: "var(--gray-5)" }}>
              <div
                className="relative h-[140px] flex flex-col justify-end px-3 pb-3"
                style={{ background: "linear-gradient(135deg, #1a6b7a 0%, #0d4a55 100%)" }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <p className="relative text-white font-semibold text-[15px] leading-tight">Diabetic Retinopathy</p>
              </div>
              <div className="px-3 py-2.5 bg-white">
                <div className="flex flex-wrap gap-1.5 mb-1.5">
                  <span
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold"
                    style={{ background: "var(--earn-teal-10)", color: "var(--earn-teal-deep)" }}
                  >
                    <Coins size={10} />$0.03/read
                  </span>
                  <span
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold"
                    style={{ background: "var(--earn-teal)", color: "white" }}
                  >
                    <Coins size={10} />Earn Mode
                  </span>
                </div>
                <p className="text-[11px] flex items-center gap-1" style={{ color: "var(--label-secondary)" }}>
                  <Clock size={10} />Up to $20.00 · Ends in 10 hours
                </p>
              </div>
            </div>
          </ComponentBlock>
        </section>

        {/* ── CHIPS ── */}
        <section id="chips" className="mb-16">
          <SectionHeader id="chips">Chips & Badges</SectionHeader>

          <ComponentBlock label="Mode Chips (filled)">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold" style={{ background: "var(--earn-teal)", color: "white" }}>
              <Coins size={10} />Earn Mode
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold" style={{ background: "var(--earn-indigo)", color: "white" }}>
              Accuracy
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold" style={{ background: "#FF9500", color: "white" }}>
              Streak
            </span>
          </ComponentBlock>

          <ComponentBlock label="Status / Info Badges (tinted)">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold" style={{ background: "var(--earn-indigo-10)", color: "var(--earn-indigo)" }}>
              4/4 Completed
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold" style={{ background: "var(--earn-teal-10)", color: "var(--earn-teal-deep)" }}>
              <Sparkles size={9} />Recommended
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold" style={{ background: "var(--earn-teal-10)", color: "var(--earn-teal-deep)" }}>
              <Coins size={10} />$0.03/read
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium" style={{ background: "#f2f2f7", color: "var(--label-secondary)" }}>
              Prize claimed
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold" style={{ background: "#f3f3ff", color: "var(--earn-indigo)" }}>
              Individual
            </span>
          </ComponentBlock>

          <ComponentBlock label="Icon Bubbles">
            {[
              { bg: "var(--earn-teal-10)", color: "var(--earn-teal-deep)", icon: <Check size={15} strokeWidth={2.5} />, label: "Earned" },
              { bg: "var(--earn-red-10)", color: "var(--earn-red)", icon: <X size={15} strokeWidth={2.5} />, label: "Not earned" },
              { bg: "#ebf9ee", color: "#34c759", icon: <Check size={13} strokeWidth={2.5} />, label: "Completed" },
              { bg: "var(--earn-indigo)", color: "white", icon: <p className="text-[12px] font-semibold leading-none">2</p>, label: "Step number" },
              { bg: "var(--earn-teal)", color: "white", icon: <Check size={18} strokeWidth={2.5} />, label: "CTA icon" },
            ].map(({ bg, color, icon, label }) => (
              <div key={label} className="flex flex-col items-center gap-2">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ background: bg, color }}
                >
                  {icon}
                </div>
                <p className="text-[11px]" style={{ color: "var(--label-secondary)" }}>{label}</p>
              </div>
            ))}
          </ComponentBlock>
        </section>

        {/* ── PROGRESS BARS ── */}
        <section id="progress" className="mb-16">
          <SectionHeader id="progress">Progress Bars</SectionHeader>

          <ComponentBlock label="Session Progress — Teal (Earn Mode)">
            <div className="w-full space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-[11px] font-semibold" style={{ color: "var(--earn-teal-deep)" }}>$0.12 earned</span>
                  <span className="text-[11px]" style={{ color: "var(--label-secondary)" }}>up to $20.00 max</span>
                </div>
                <div className="h-2 rounded-full" style={{ background: "rgba(77,195,208,0.2)" }}>
                  <div className="h-2 rounded-full" style={{ background: "var(--earn-teal)", width: "0.6%" }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-[11px] font-semibold" style={{ color: "var(--earn-teal-deep)" }}>$9.50 earned</span>
                  <span className="text-[11px]" style={{ color: "var(--label-secondary)" }}>up to $20.00 max</span>
                </div>
                <div className="h-2 rounded-full" style={{ background: "rgba(77,195,208,0.2)" }}>
                  <div className="h-2 rounded-full" style={{ background: "var(--earn-teal)", width: "47.5%" }} />
                </div>
              </div>
            </div>
          </ComponentBlock>

          <ComponentBlock label="Milestone Progress — Indigo">
            <div className="w-full">
              <div className="flex items-center gap-2 mb-2">
                <Trophy size={14} style={{ color: "var(--earn-indigo)" }} />
                <p className="text-[14px] font-semibold" style={{ color: "var(--earn-indigo)" }}>Milestone: 100 qualified reads</p>
              </div>
              <div className="flex justify-between mb-1.5">
                <span className="text-[12px]" style={{ color: "var(--label-secondary)" }}>4 / 100 qualified reads</span>
                <span className="text-[12px] font-semibold" style={{ color: "var(--earn-indigo)" }}>$5 bonus</span>
              </div>
              <div className="h-1.5 rounded-full" style={{ background: "var(--earn-indigo-30)" }}>
                <div className="h-1.5 rounded-full" style={{ background: "var(--earn-indigo)", width: "4%" }} />
              </div>
            </div>
          </ComponentBlock>

          <ComponentBlock label="Score Bar — Quality Threshold">
            <div className="w-full">
              <div className="flex justify-between mb-2">
                <span className="text-[11px] font-semibold" style={{ color: "var(--earn-teal-deep)" }}>Quality score</span>
                <span className="text-[11px] font-semibold" style={{ color: "var(--label-secondary)" }}>Earn at 70+</span>
              </div>
              <div className="relative h-3 rounded-full overflow-hidden">
                <div className="absolute inset-0 rounded-full" style={{ background: "rgba(255,59,48,0.25)", width: "70%" }} />
                <div className="absolute top-0 bottom-0 rounded-r-full" style={{ background: "rgba(77,195,208,0.35)", left: "70%", right: 0 }} />
                {/* threshold */}
                <div className="absolute top-0 bottom-0 w-0.5" style={{ left: "70%", background: "var(--label-tertiary)" }} />
                {/* score dot */}
                <div className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 border-white" style={{ left: "calc(74% - 6px)", background: "var(--earn-teal)" }} />
              </div>
              <div className="flex justify-between mt-1">
                <span className="text-[10px]" style={{ color: "var(--label-secondary)" }}>0</span>
                <span className="text-[10px] font-semibold" style={{ color: "var(--label-secondary)", marginLeft: "65%" }}>70</span>
                <span className="text-[10px]" style={{ color: "var(--label-secondary)" }}>100</span>
              </div>
              <div className="flex gap-4 mt-2">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: "rgba(255,59,48,0.5)" }} />
                  <span className="text-[11px]" style={{ color: "var(--label-secondary)" }}>Below 70 — not earned</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: "var(--earn-teal)" }} />
                  <span className="text-[11px]" style={{ color: "var(--label-secondary)" }}>70+ — earned</span>
                </div>
              </div>
            </div>
          </ComponentBlock>
        </section>

        {/* ── BOTTOM SHEETS ── */}
        <section id="sheets" className="mb-16">
          <SectionHeader id="sheets">Bottom Sheets</SectionHeader>

          <ComponentBlock label="Partial Sheet — Feedback (over image)">
            <div className="relative w-72 h-64 rounded-2xl overflow-hidden" style={{ background: "radial-gradient(circle, #8b2500 0%, #1a0600 80%)" }}>
              <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl px-5 pt-4 pb-6">
                <div className="w-8 h-1 rounded-full mx-auto mb-4" style={{ background: "var(--gray-5)" }} />
                <div className="flex items-center gap-2.5 mb-1">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "var(--earn-teal-10)", color: "var(--earn-teal-deep)" }}>
                    <Check size={15} strokeWidth={2.5} />
                  </div>
                  <p className="text-[15px] font-semibold" style={{ color: "var(--earn-teal-deep)" }}>Earned · +$0.03</p>
                </div>
                <p className="text-[12px] mb-4 ml-[42px]" style={{ color: "var(--label-secondary)" }}>$0.12 earned this session</p>
                <button className="w-full py-3 rounded-2xl text-[14px] font-semibold text-white" style={{ background: "var(--earn-teal)" }}>
                  Next →
                </button>
              </div>
            </div>
          </ComponentBlock>

          <ComponentBlock label="Full Modal Sheet — with backdrop">
            <div className="relative w-72 h-64 rounded-2xl overflow-hidden" style={{ background: "#1a1a2e" }}>
              <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.5)" }} />
              <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl p-5">
                <div className="w-8 h-1 rounded-full mx-auto mb-3" style={{ background: "var(--gray-5)" }} />
                <div className="flex justify-between items-center">
                  <p className="text-[17px] font-semibold">Score Education</p>
                  <button className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: "var(--gray-6)" }}>
                    <X size={14} style={{ color: "var(--label-secondary)" }} />
                  </button>
                </div>
                <p className="text-[12px] mt-1" style={{ color: "var(--label-secondary)" }}>Sheet content scrolls here…</p>
              </div>
            </div>
          </ComponentBlock>
        </section>

        {/* ── NAVIGATION ── */}
        <section id="navigation" className="mb-16">
          <SectionHeader id="navigation">Navigation</SectionHeader>

          <ComponentBlock label="Navigation Bar — Light (standard)">
            <div className="w-full">
              <div className="px-4 pt-2 pb-3 border-b flex items-center gap-3 bg-white" style={{ borderColor: "var(--gray-5)" }}>
                <button style={{ color: "var(--earn-indigo)" }}>
                  <ChevronLeft size={20} />
                </button>
                <h1 className="text-[17px] font-semibold">My Earnings</h1>
              </div>
            </div>
          </ComponentBlock>

          <ComponentBlock label="Navigation Bar — Earn Mode (teal back)">
            <div className="w-full">
              <div className="px-4 pt-2 pb-3 border-b flex items-center gap-3 bg-white" style={{ borderColor: "var(--gray-5)" }}>
                <button style={{ color: "var(--earn-teal-deep)" }}>
                  <X size={20} />
                </button>
                <h1 className="text-[17px] font-semibold">Contest Complete</h1>
              </div>
            </div>
          </ComponentBlock>

          <ComponentBlock label="Tab Bar">
            <div className="w-full border-t pt-3 pb-6 flex items-center justify-around bg-white" style={{ borderColor: "var(--gray-5)" }}>
              {[
                { icon: <Trophy size={22} />, label: "Compete", active: true },
                { icon: <Star size={22} />, label: "For You", active: false },
                { icon: <BookOpen size={22} />, label: "Learn", active: false },
                { icon: <User size={22} />, label: "Profile", active: false },
              ].map(({ icon, label, active }) => (
                <button key={label} className="flex flex-col items-center gap-1">
                  <span style={{ color: active ? "var(--earn-teal)" : "var(--label-secondary)" }}>{icon}</span>
                  <span className="text-[10px] font-medium" style={{ color: active ? "var(--earn-teal)" : "var(--label-secondary)" }}>{label}</span>
                </button>
              ))}
            </div>
          </ComponentBlock>
        </section>

        {/* ── EARN MODE ── */}
        <section id="earn-mode" className="mb-16">
          <SectionHeader id="earn-mode">Earn Mode Sub-Theme</SectionHeader>

          <div
            className="rounded-xl p-4 mb-6 text-[13px] leading-relaxed"
            style={{ background: "var(--earn-teal-10)", border: "1px solid rgba(77,195,208,0.2)", color: "var(--earn-teal-deep)" }}
          >
            Earn Mode uses teal as its primary accent in place of the app&apos;s default indigo.
            Teal = &ldquo;you can earn here.&rdquo; Never mix teal and indigo accents on the same screen.
            Positive feedback in Earn Mode is <strong>teal</strong>, not system green.
          </div>

          <ComponentBlock label="Earn HUD Chip (labeling screen top bar)">
            <div className="flex gap-4 items-center p-3 rounded-xl" style={{ background: "#0a0a0a" }}>
              <div className="flex items-center gap-1.5">
                <span className="px-2 py-0.5 rounded-full text-[11px] font-bold flex items-center gap-1" style={{ background: "var(--earn-teal)", color: "white" }}>
                  <Coins size={10} />Earn
                </span>
                <span className="text-[14px] font-bold text-white">$0.12</span>
              </div>
            </div>
          </ComponentBlock>

          <ComponentBlock label="Progress Dots (labeling screen)">
            <div className="flex gap-1 p-3 rounded-xl items-center" style={{ background: "#0a0a0a" }}>
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="w-5 h-1.5 rounded-full"
                  style={{ background: i < 3 ? "var(--earn-teal)" : "rgba(255,255,255,0.22)" }}
                />
              ))}
            </div>
          </ComponentBlock>

          <ComponentBlock label="Feedback States — Earned / Not Earned">
            {/* Earned */}
            <div className="flex-1 min-w-[200px] bg-white rounded-2xl px-5 pt-4 pb-5 border" style={{ borderColor: "var(--gray-5)" }}>
              <div className="w-8 h-1 rounded-full mx-auto mb-4" style={{ background: "var(--gray-5)" }} />
              <div className="flex items-center gap-2.5 mb-1">
                <div className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center" style={{ background: "var(--earn-teal-10)", color: "var(--earn-teal-deep)" }}>
                  <Check size={15} strokeWidth={2.5} />
                </div>
                <p className="text-[15px] font-semibold" style={{ color: "var(--earn-teal-deep)" }}>Earned · +$0.03</p>
              </div>
              <p className="text-[12px] ml-[42px]" style={{ color: "var(--label-secondary)" }}>$0.12 earned this session</p>
            </div>
            {/* Not earned */}
            <div className="flex-1 min-w-[200px] bg-white rounded-2xl px-5 pt-4 pb-5 border" style={{ borderColor: "var(--gray-5)" }}>
              <div className="w-8 h-1 rounded-full mx-auto mb-4" style={{ background: "var(--gray-5)" }} />
              <div className="flex items-center gap-2.5 mb-1">
                <div className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center" style={{ background: "var(--earn-red-10)", color: "var(--earn-red)" }}>
                  <X size={15} strokeWidth={2.5} />
                </div>
                <p className="text-[15px] font-semibold" style={{ color: "var(--label-primary)" }}>This read didn&apos;t earn</p>
              </div>
              <p className="text-[12px] ml-[42px]" style={{ color: "var(--label-secondary)" }}>More precise boxes = higher quality score = earnings.</p>
            </div>
          </ComponentBlock>

          <ComponentBlock label="Earn Mode Overrides vs App Default">
            <div className="w-full overflow-x-auto">
              <table className="w-full text-[12px] border-collapse">
                <thead>
                  <tr style={{ borderBottom: "2px solid var(--gray-5)" }}>
                    <th className="text-left py-2 pr-4 font-semibold" style={{ color: "var(--label-primary)" }}>Element</th>
                    <th className="text-left py-2 pr-4 font-semibold" style={{ color: "var(--earn-indigo)" }}>App Default (Indigo)</th>
                    <th className="text-left py-2 font-semibold" style={{ color: "var(--earn-teal-deep)" }}>Earn Mode Override (Teal)</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Primary CTA", "--earn-indigo #6155f5", "--earn-teal #4DC3D0"],
                    ["Active filter chip", "--earn-indigo", "--earn-teal"],
                    ["Progress bar fill", "--earn-indigo", "--earn-teal"],
                    ["Nav accent (back/link)", "--earn-indigo", "--earn-teal-deep"],
                    ["Tinted card bg", "--earn-indigo-10 #f3f3ff", "--earn-teal-10 rgba(77,195,208,0.10)"],
                    ["Positive feedback icon", "system green #34c759", "--earn-teal #4DC3D0"],
                  ].map(([el, app, earn]) => (
                    <tr key={el} style={{ borderBottom: "1px solid var(--gray-5)" }}>
                      <td className="py-2 pr-4 font-medium" style={{ color: "var(--label-primary)" }}>{el}</td>
                      <td className="py-2 pr-4 font-mono" style={{ color: "var(--earn-indigo)" }}>{app}</td>
                      <td className="py-2 font-mono" style={{ color: "var(--earn-teal-deep)" }}>{earn}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </ComponentBlock>
        </section>

        {/* ── ICONS ── */}
        <section id="icons" className="mb-16">
          <SectionHeader id="icons">Icon System</SectionHeader>

          <div
            className="rounded-xl p-4 mb-6 text-[13px]"
            style={{ background: "var(--earn-indigo-10)", border: "1px solid var(--earn-indigo-30)", color: "var(--earn-indigo)" }}
          >
            All icons use <strong>Lucide React</strong> — no emojis, no SF Symbols in the prototype.
            Key distinction: <strong>Coins</strong> = Earn Mode brand mark (not for generic money).
            <strong> DollarSign</strong> = financial summaries, earnings cards, post-session.
          </div>

          <div className="grid grid-cols-4 gap-3">
            {[
              { icon: <Coins size={22} />, name: "Coins", use: "Earn Mode brand mark, HUD chip" },
              { icon: <DollarSign size={22} />, name: "DollarSign", use: "Earnings cards, session summary" },
              { icon: <Trophy size={22} />, name: "Trophy", use: "Rules & Prizes, milestone, Compete tab" },
              { icon: <BarChart2 size={22} />, name: "BarChart2", use: "Leaderboard row icon" },
              { icon: <Lock size={22} />, name: "Lock", use: "Locked contest steps" },
              { icon: <ChevronRight size={22} />, name: "ChevronRight", use: "Row drill, unlocked steps" },
              { icon: <ChevronLeft size={22} />, name: "ChevronLeft", use: "Back navigation" },
              { icon: <X size={22} />, name: "X", use: "Close / dismiss / not-earned" },
              { icon: <Check size={22} />, name: "Check", use: "Earned, completed step, success" },
              { icon: <Target size={22} />, name: "Target", use: "Score precision factor" },
              { icon: <MessageCircle size={22} />, name: "MessageCircle", use: "Labeling: comment" },
              { icon: <Flag size={22} />, name: "Flag", use: "Labeling: flag case" },
              { icon: <Eye size={22} />, name: "Eye", use: "Labeling: view original" },
              { icon: <Clock size={22} />, name: "Clock", use: "Contest deadline, time remaining" },
              { icon: <Star size={22} />, name: "Star", use: "For You tab" },
              { icon: <BookOpen size={22} />, name: "BookOpen", use: "Learn tab" },
              { icon: <User size={22} />, name: "User", use: "Profile tab" },
              { icon: <Sparkles size={22} />, name: "Sparkles", use: "Recommended badge" },
              { icon: <Bell size={22} />, name: "Bell", use: "Contest notification" },
            ].map(({ icon, name, use }) => (
              <div
                key={name}
                className="flex flex-col gap-2 p-3 rounded-xl border"
                style={{ background: "white", borderColor: "var(--gray-5)" }}
              >
                <span style={{ color: "var(--label-primary)" }}>{icon}</span>
                <p className="text-[12px] font-semibold" style={{ color: "var(--label-primary)" }}>{name}</p>
                <p className="text-[11px]" style={{ color: "var(--label-secondary)" }}>{use}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 mt-4" style={{ borderTop: "1px solid var(--gray-5)" }}>
          <p className="text-[12px]" style={{ color: "var(--label-tertiary)" }}>
            DiagnosUs iOS Design System · Figma source: <code>BvtitRNTy7kUjbkLrXsB2h</code> · Android system coming separately
          </p>
        </footer>

      </main>
    </div>
  );
}
