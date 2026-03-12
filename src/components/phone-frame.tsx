import { ReactNode } from "react";

interface PhoneFrameProps {
  children: ReactNode;
  screenTitle?: string;
}

export function PhoneFrame({ children, screenTitle }: PhoneFrameProps) {
  return (
    <div className="relative w-[390px] flex-shrink-0" style={{ height: "844px" }}>
      {/* Device shell */}
      <div
        className="absolute inset-0 rounded-[54px] shadow-2xl"
        style={{ background: "#1a1a1a", boxShadow: "0 0 0 2px #3a3a3a, 0 30px 80px rgba(0,0,0,0.5)" }}
      />

      {/* Screen area */}
      <div
        className="absolute bg-white overflow-hidden"
        style={{ inset: "12px", borderRadius: "44px" }}
      >
        {/* Status bar */}
        <div className="flex items-center justify-between px-6 pt-4 pb-1 text-[12px] font-semibold" style={{ color: "#000" }}>
          <span>9:41</span>
          <div className="absolute left-1/2 -translate-x-1/2 w-[120px] h-[34px] bg-[#1a1a1a] rounded-full" />
          <div className="flex items-center gap-1">
            <svg width="17" height="12" viewBox="0 0 17 12" fill="none">
              <rect x="0" y="3" width="3" height="9" rx="1" fill="currentColor" opacity="0.3"/>
              <rect x="4.5" y="2" width="3" height="10" rx="1" fill="currentColor" opacity="0.5"/>
              <rect x="9" y="0.5" width="3" height="11.5" rx="1" fill="currentColor" opacity="0.7"/>
              <rect x="13.5" y="0" width="3" height="12" rx="1" fill="currentColor"/>
            </svg>
            <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
              <path d="M8 2.4C10.3 2.4 12.3 3.4 13.7 5L15.1 3.6C13.3 1.7 10.8 0.5 8 0.5C5.2 0.5 2.7 1.7 0.9 3.6L2.3 5C3.7 3.4 5.7 2.4 8 2.4Z" fill="currentColor"/>
              <path d="M8 5.2C9.5 5.2 10.9 5.8 11.9 6.8L13.3 5.4C11.9 4.1 10.1 3.3 8 3.3C5.9 3.3 4.1 4.1 2.7 5.4L4.1 6.8C5.1 5.8 6.5 5.2 8 5.2Z" fill="currentColor"/>
              <circle cx="8" cy="10" r="1.5" fill="currentColor"/>
            </svg>
            <div className="flex items-center gap-0.5">
              <div className="w-[25px] h-[12px] rounded-[3px] border border-black/30 flex items-center px-[2px]">
                <div className="bg-black rounded-[1px] h-[8px]" style={{ width: "80%" }} />
              </div>
            </div>
          </div>
        </div>

        {/* Screen content */}
        <div className="h-full overflow-y-auto pb-8" style={{ paddingTop: "8px" }}>
          {children}
        </div>
      </div>

      {/* Home indicator */}
      <div
        className="absolute bottom-[6px] left-1/2 -translate-x-1/2 w-[134px] h-[5px] bg-white/60 rounded-full"
      />
    </div>
  );
}
