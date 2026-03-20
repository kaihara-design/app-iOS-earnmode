import { ReactNode } from "react";

interface AndroidPhoneFrameProps {
  children: ReactNode;
}

export function AndroidPhoneFrame({ children }: AndroidPhoneFrameProps) {
  return (
    <div className="relative flex-shrink-0" style={{ width: "412px", height: "915px" }}>
      {/* Device shell */}
      <div
        className="absolute inset-0 rounded-[44px] shadow-2xl"
        style={{ background: "#1a1a1a", boxShadow: "0 0 0 2px #3a3a3a, 0 30px 80px rgba(0,0,0,0.5)" }}
      />

      {/* Screen area */}
      <div
        className="absolute overflow-hidden"
        style={{ inset: "10px", borderRadius: "36px", background: "var(--md-background)" }}
      >
        {/* Android status bar */}
        <div
          className="flex items-center justify-between px-6 shrink-0"
          style={{ height: "52px", paddingTop: "12px", paddingBottom: "10px", fontFamily: "'Roboto', sans-serif" }}
        >
          <span className="text-[14px] font-medium tracking-[0.14px]" style={{ color: "#201922" }}>9:30</span>

          {/* Pill hole-punch camera */}
          <div className="absolute left-1/2 -translate-x-1/2" style={{ top: "14px" }}>
            <div className="w-[12px] h-[12px] rounded-full bg-[#1a1a1a]" />
          </div>

          {/* Status icons */}
          <div className="flex items-center gap-[3px]">
            {/* Signal */}
            <svg width="17" height="12" viewBox="0 0 17 12" fill="none">
              <rect x="0" y="7" width="3" height="5" rx="0.5" fill="#201922" opacity="0.4"/>
              <rect x="4.5" y="5" width="3" height="7" rx="0.5" fill="#201922" opacity="0.6"/>
              <rect x="9" y="3" width="3" height="9" rx="0.5" fill="#201922" opacity="0.8"/>
              <rect x="13.5" y="0" width="3" height="12" rx="0.5" fill="#201922"/>
            </svg>
            {/* Wifi */}
            <svg width="17" height="12" viewBox="0 0 17 12" fill="none">
              <path d="M8.5 3C10.6 3 12.5 3.9 13.8 5.3L15.1 4C13.4 2.2 11.1 1.1 8.5 1.1C5.9 1.1 3.6 2.2 1.9 4L3.2 5.3C4.5 3.9 6.4 3 8.5 3Z" fill="#201922"/>
              <path d="M8.5 5.8C9.9 5.8 11.1 6.4 12 7.3L13.3 6C12 4.8 10.3 4 8.5 4C6.7 4 5 4.8 3.7 6L5 7.3C5.9 6.4 7.1 5.8 8.5 5.8Z" fill="#201922"/>
              <circle cx="8.5" cy="10.5" r="1.5" fill="#201922"/>
            </svg>
            {/* Battery */}
            <div className="flex items-center">
              <div className="w-[22px] h-[11px] rounded-[2px] border border-[#201922]/50 flex items-center px-[1px]">
                <div className="bg-[#201922] rounded-[1px] h-[7px]" style={{ width: "75%" }} />
              </div>
              <div className="w-[2px] h-[5px] rounded-r-sm bg-[#201922]/50 -ml-px" />
            </div>
          </div>
        </div>

        {/* Screen content — Roboto font */}
        <div
          className="overflow-y-auto"
          style={{
            height: "calc(100% - 52px - 24px)",
            fontFamily: "'Roboto', 'Roboto Flex', system-ui, sans-serif",
          }}
        >
          {children}
        </div>

        {/* Gesture bar — transparent overlay */}
        <div
          className="absolute bottom-0 left-0 right-0 flex items-center justify-center"
          style={{ height: "24px", background: "transparent" }}
        >
          <div className="w-[108px] h-[4px] rounded-full bg-[#201922]" />
        </div>
      </div>
    </div>
  );
}
