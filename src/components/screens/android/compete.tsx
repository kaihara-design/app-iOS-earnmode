"use client";

// Android Earn Mode — Compete (Contest Browse) screen
// Based on existing Android Figma: vivKqmZsusL8rqpQYVHjll node 60947:18808
// Earn Mode additions: $0.03/read chip, Earn Mode badge, exhausted state

interface CompeteProps {
  onNavigate: (screen: string) => void;
}

const CONTESTS = [
  {
    id: "drug-types",
    title: "Identify Drug Types from Visual Clues",
    chips: ["Accuracy", "Individual"],
    endsIn: "2 hours",
    pool: "$0.03/read",
    earnMode: true,
    exhausted: false,
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=600&q=80",
  },
  {
    id: "cardiac",
    title: "Diagnose Cardiac Conditions from X-rays",
    chips: ["Classification", "Individual", "Squad"],
    endsIn: "5 hours",
    pool: "$0.03/read",
    earnMode: true,
    exhausted: false,
    image: "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=600&q=80",
  },
  {
    id: "pathology",
    title: "Detect Anomalies in Pathology Slides",
    chips: ["Box Seg", "Individual"],
    endsIn: "1 hour",
    pool: "$0.03/read",
    earnMode: true,
    exhausted: true,
    image: "https://images.unsplash.com/photo-1576671081837-49000212a370?w=600&q=80",
  },
];

function AlarmIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="13" r="8"/><path d="M12 9v4l2 2"/><path d="M5 3 2 6"/><path d="m22 6-3-3"/>
    </svg>
  );
}

function DollarIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><path d="M12 6v12M9 9.5c0-1.4 1.3-2.5 3-2.5s3 1.1 3 2.5-1.3 2.5-3 2.5-3 1.1-3 2.5 1.3 2.5 3 2.5 3-1.1 3-2.5"/>
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
    </svg>
  );
}

function BellIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>
    </svg>
  );
}

function ChecklistIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/><rect x="9" y="3" width="6" height="4" rx="2"/><path d="m9 12 2 2 4-4"/>
    </svg>
  );
}

function PersonIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="4"/><path d="M20 21a8 8 0 1 0-16 0"/>
    </svg>
  );
}

function BookIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
    </svg>
  );
}

function BrainIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"/><path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"/><path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4"/><path d="M17.599 6.5a3 3 0 0 0 .399-1.375"/><path d="M6.003 5.125A3 3 0 0 0 6.401 6.5"/>
    </svg>
  );
}

export function AndroidCompete({ onNavigate }: CompeteProps) {
  return (
    <div className="flex flex-col h-full" style={{ fontFamily: "'Roboto', system-ui, sans-serif", background: "white" }}>
      {/* Top app bar */}
      <div className="flex items-center gap-1 px-1 py-2" style={{ height: "64px", background: "white" }}>
        <div className="w-12 h-12 flex items-center justify-center rounded-full shrink-0" style={{ color: "#201922" }}>
          {/* no back icon on top-level */}
        </div>
        <p className="flex-1 text-[22px] font-normal leading-7" style={{ color: "#201922" }}>
          Compete
        </p>
        <div className="flex">
          <button className="w-12 h-12 flex items-center justify-center" style={{ color: "#201922" }}>
            <SearchIcon />
          </button>
          <button className="w-12 h-12 flex items-center justify-center" style={{ color: "#201922" }}>
            <BellIcon />
          </button>
        </div>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto px-4 pb-4">
        {/* Section label */}
        <p className="text-[11px] font-medium tracking-[0.5px] mb-3" style={{ color: "#4e4352" }}>
          AVAILABLE CONTESTS
        </p>

        {/* Contest cards */}
        <div className="flex flex-col gap-6">
          {CONTESTS.map((contest) => (
            <button
              key={contest.id}
              onClick={() => onNavigate("android-contest-detail")}
              className="text-left w-full overflow-hidden border"
              style={{
                borderRadius: "20px",
                borderColor: "#d2c1d4",
                background: contest.exhausted ? "#fafafa" : "white",
                opacity: contest.exhausted ? 0.7 : 1,
              }}
            >
              {/* Hero image */}
              <div className="relative" style={{ height: "119px" }}>
                <img
                  src={contest.image}
                  alt=""
                  className="w-full h-full object-cover"
                  style={{ borderRadius: "16px 16px 0 0" }}
                />
                {/* Gradient overlay */}
                <div
                  className="absolute inset-0"
                  style={{ background: "linear-gradient(to top, rgba(0,0,0,0.5), transparent)", borderRadius: "16px 16px 0 0" }}
                />
                {contest.exhausted && (
                  <div
                    className="absolute top-2 right-2 px-2 py-0.5 text-[10px] font-medium rounded-full"
                    style={{ background: "rgba(0,0,0,0.6)", color: "white" }}
                  >
                    Contest full
                  </div>
                )}
              </div>

              {/* Card body */}
              <div className="px-4 py-3 flex flex-col gap-2">
                {/* Chips row */}
                <div className="flex flex-wrap gap-1">
                  {/* Earn Mode badge */}
                  {contest.earnMode && (
                    <div
                      className="flex items-center gap-1 px-2 rounded-full"
                      style={{ height: "24px", border: "1px solid #006A65" }}
                    >
                      <DollarIcon />
                      <span className="text-[8px] font-medium tracking-[0.5px]" style={{ color: "#006A65" }}>
                        Earn Mode
                      </span>
                    </div>
                  )}
                  {/* Type chips */}
                  {contest.chips.map((chip) => (
                    <div
                      key={chip}
                      className="flex items-center px-2 rounded-full"
                      style={{ height: "24px", border: "1px solid #d2c1d4" }}
                    >
                      <span className="text-[8px] font-medium tracking-[0.5px]" style={{ color: "#201922" }}>
                        {chip}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Title */}
                <p
                  className="text-[22px] font-normal leading-7 line-clamp-2"
                  style={{ color: "#201922", fontFamily: "'Roboto', system-ui, sans-serif" }}
                >
                  {contest.title}
                </p>

                {/* Meta row */}
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1" style={{ color: "#4e4352" }}>
                    <AlarmIcon />
                    <span className="text-[11px] font-medium tracking-[0.5px]">Ends in {contest.endsIn}</span>
                  </div>
                  <span className="text-[12px]" style={{ color: "#4e4352" }}>·</span>
                  <div className="flex items-center gap-1" style={{ color: "#4e4352" }}>
                    <DollarIcon />
                    <span className="text-[11px] font-medium tracking-[0.5px]">{contest.pool}</span>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Bottom navigation bar */}
      <div
        className="flex items-stretch border-t px-2 shrink-0"
        style={{ borderColor: "#D2C1D4", background: "white", boxShadow: "0 -2px 3px rgba(0,0,0,0.08)", height: "80px" }}
      >
        {[
          { label: "Compete", icon: <ChecklistIcon />, active: true },
          { label: "For You", icon: <BrainIcon />, active: false },
          { label: "Learn", icon: <BookIcon />, active: false },
          { label: "Profile", icon: <PersonIcon />, active: false },
        ].map(({ label, icon, active }) => (
          <div key={label} className="flex-1 flex flex-col items-center justify-center gap-1 py-4">
            <div
              className="flex items-center justify-center"
              style={{
                width: active ? "64px" : "32px",
                height: "32px",
                borderRadius: "16px",
                background: active ? "#8D2EBC" : "transparent",
                color: active ? "white" : "#4e4352",
                transition: "all 0.2s",
              }}
            >
              {icon}
            </div>
            <span
              className="text-[12px] font-medium tracking-[0.5px]"
              style={{ color: active ? "#201922" : "#4e4352" }}
            >
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
